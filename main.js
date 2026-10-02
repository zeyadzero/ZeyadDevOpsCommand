const {app,BrowserWindow,ipcMain,dialog,shell,clipboard,Menu}=require('electron');
const {spawn,execSync}=require('child_process');
const path=require('path'),fs=require('fs'),os=require('os');
app.commandLine.appendSwitch('no-sandbox');
let win;const sessions=new Map();
const PYHELPER=`
import os,pty,sys,select,struct,fcntl,termios,signal
cols,rows,cwd=int(sys.argv[1]),int(sys.argv[2]),sys.argv[3]
shell=os.environ.get('SHELL') or '/bin/bash'
pid,fd=pty.fork()
if pid==0:
    try: os.chdir(cwd)
    except Exception: pass
    os.execvp(shell,[shell,'-i'])
def sz(c,r):
    try: fcntl.ioctl(fd,termios.TIOCSWINSZ,struct.pack('HHHH',r,c,0,0))
    except Exception: pass
sz(cols,rows)
buf=b''
while True:
    try: r,_,_=select.select([0,fd,3],[],[])
    except InterruptedError: continue
    if 0 in r:
        d=os.read(0,65536)
        if not d: break
        os.write(fd,d)
    if fd in r:
        try: d=os.read(fd,65536)
        except OSError: break
        if not d: break
        os.write(1,d)
    if 3 in r:
        d=os.read(3,256)
        if not d: continue
        buf+=d
        while b'\\n' in buf:
            l,buf=buf.split(b'\\n',1)
            p=l.split()
            try:
                if p[0]==b'size': sz(int(p[1]),int(p[2]))
                elif p[0]==b'kill':
                    g=os.tcgetpgrp(fd)
                    if g!=pid: os.killpg(g,signal.SIGKILL)
            except Exception: pass
try: os.kill(pid,signal.SIGHUP)
except Exception: pass
try: os.waitpid(pid,0)
except Exception: pass
`;
function fam(){try{const t=fs.readFileSync('/etc/os-release','utf8').toLowerCase();return /(rhel|fedora|centos|rocky|alma)/.test(t)?'rpm':'deb'}catch(e){return 'deb'}}
function cleanEnv(){const e={...process.env};['LD_LIBRARY_PATH','LD_PRELOAD','PYTHONHOME','PYTHONPATH','APPDIR','APPIMAGE','ARGV0','OWD','ELECTRON_RUN_AS_NODE','CHROME_DESKTOP'].forEach(k=>delete e[k]);
  e.TERM='xterm-256color';e.COLORTERM='truecolor';if(!e.LANG)e.LANG='C.UTF-8';return e}
function has(b){try{execSync('command -v '+b,{stdio:'ignore'});return true}catch(_){return false}}
function create(){
  Menu.setApplicationMenu(null);
  win=new BrowserWindow({width:1380,height:880,minWidth:900,minHeight:600,title:'Zeyad DevOps Command',backgroundColor:'#0f1419',autoHideMenuBar:true,icon:path.join(__dirname,'build','icon.png'),
    webPreferences:{preload:path.join(__dirname,'preload.js'),contextIsolation:true,nodeIntegration:false}});
  win.loadFile(path.join(__dirname,'src','index.html'));
  win.webContents.setWindowOpenHandler(({url})=>{shell.openExternal(url);return{action:'deny'}});
}
app.whenReady().then(create);
app.on('window-all-closed',()=>{for(const s of sessions.values())try{s.p.kill('SIGHUP')}catch(_){}app.quit()});
ipcMain.handle('os',()=>fam());
ipcMain.handle('home',()=>os.homedir());
// ---- PTY sessions
ipcMain.handle('pty:start',(e,{id,cols,rows,cwd})=>{
  try{
    const dir=(cwd&&fs.existsSync(cwd))?cwd:os.homedir();const env=cleanEnv();let p,usePy=has('python3');
    if(usePy){p=spawn('python3',['-u','-c',PYHELPER,String(cols||80),String(rows||24),dir],{env,stdio:['pipe','pipe','pipe','pipe']})}
    else if(has('script')){p=spawn('script',['-qfc',(env.SHELL||'/bin/bash')+' -i','/dev/null'],{env,cwd:dir,stdio:['pipe','pipe','pipe']})}
    else return 'ERR: python3 or script (util-linux) is required for the terminal';
    p.stdout.setEncoding('utf8');p.stderr.setEncoding('utf8');
    p.stdout.on('data',d=>{try{e.sender.send('pty:data',{id,data:d})}catch(_){}});
    p.stderr.on('data',d=>{try{e.sender.send('pty:data',{id,data:d.replace(/\n/g,'\r\n')})}catch(_){}});
    p.on('close',code=>{sessions.delete(id);try{e.sender.send('pty:exit',{id,code})}catch(_){}});
    p.on('error',err=>{try{e.sender.send('pty:data',{id,data:'\r\n[error] '+err.message+'\r\n'})}catch(_){}});
    p.stdin.on('error',()=>{});
    sessions.set(id,{p,usePy});return 'ok';
  }catch(err){return 'ERR: '+err.message}
});
ipcMain.on('pty:write',(e,{id,data})=>{const s=sessions.get(id);if(s&&s.p.stdin.writable)s.p.stdin.write(Buffer.from(data,'utf8'))});
ipcMain.on('pty:resize',(e,{id,cols,rows})=>{const s=sessions.get(id);if(s&&s.usePy&&s.p.stdio[3]&&s.p.stdio[3].writable)s.p.stdio[3].write('size '+cols+' '+rows+'\n')});
ipcMain.on('pty:kill',(e,{id})=>{const s=sessions.get(id);if(s&&s.usePy&&s.p.stdio[3]&&s.p.stdio[3].writable)s.p.stdio[3].write('kill\n')});
ipcMain.on('pty:close',(e,{id})=>{const s=sessions.get(id);if(s){try{s.p.kill('SIGHUP')}catch(_){}}});
// ---- misc
ipcMain.on('ext',(e,cmd)=>{
  const terms=[['x-terminal-emulator','-e'],['gnome-terminal','--'],['konsole','-e'],['xfce4-terminal','-e'],['xterm','-e']];
  const line=(cmd||'bash')+'; echo; read -rp "Press Enter to close"';
  for(const [t,flag] of terms){if(has(t)){spawn(t,[flag,'bash','-c',line],{detached:true,stdio:'ignore',env:cleanEnv()}).unref();return}}
});
ipcMain.handle('clip:write',(e,t)=>{clipboard.writeText(String(t));return true});
ipcMain.handle('clip:read',()=>clipboard.readText());
ipcMain.handle('save',async(e,name,text)=>{
  const r=await dialog.showSaveDialog(win,{defaultPath:path.join(os.homedir(),name)});
  if(!r.canceled&&r.filePath){fs.writeFileSync(r.filePath,text);return r.filePath}return null});
ipcMain.handle('writeDir',async(e,name,text)=>{
  const r=await dialog.showOpenDialog(win,{properties:['openDirectory','createDirectory'],defaultPath:os.homedir()});
  if(r.canceled||!r.filePaths[0])return null;
  try{const f=path.join(r.filePaths[0],name);fs.mkdirSync(path.dirname(f),{recursive:true});fs.writeFileSync(f,text);return f}catch(err){return 'ERR: '+err.message}});
