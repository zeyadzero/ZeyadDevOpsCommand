const {contextBridge,ipcRenderer}=require('electron');
contextBridge.exposeInMainWorld('api',{
  osFamily:()=>ipcRenderer.invoke('os'),home:()=>ipcRenderer.invoke('home'),
  ptyStart:(id,cols,rows,cwd)=>ipcRenderer.invoke('pty:start',{id,cols,rows,cwd}),
  ptyWrite:(id,data)=>ipcRenderer.send('pty:write',{id,data}),
  ptyResize:(id,cols,rows)=>ipcRenderer.send('pty:resize',{id,cols,rows}),
  ptyKill:id=>ipcRenderer.send('pty:kill',{id}),ptyClose:id=>ipcRenderer.send('pty:close',{id}),
  onPtyData:cb=>ipcRenderer.on('pty:data',(_e,d)=>cb(d)),onPtyExit:cb=>ipcRenderer.on('pty:exit',(_e,d)=>cb(d)),
  external:c=>ipcRenderer.send('ext',c),clipWrite:t=>ipcRenderer.invoke('clip:write',t),clipRead:()=>ipcRenderer.invoke('clip:read'),
  saveFile:(n,t)=>ipcRenderer.invoke('save',n,t),writeDir:(n,t)=>ipcRenderer.invoke('writeDir',n,t)});
