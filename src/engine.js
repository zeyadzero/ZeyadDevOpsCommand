(function(g){
const KEYRE=/^\{([A-Za-z_]\w*)(?:(=)|(\?)|(\}))/;
// يحلل نص القالب إلى tokens: text | param | flags
function scan(str){
  const out=[];let buf='';let i=0;
  const flush=()=>{if(buf){out.push({t:'text',v:buf});buf=''}};
  while(i<str.length){
    const c=str[i];
    if(c==='{'){
      if(str[i+1]==='*'&&str[i+2]==='}'){flush();out.push({t:'flags'});i+=3;continue}
      const prev=str[i-1];
      if(prev!=='$'&&prev!=='%'&&prev!=='{'){
        const m=KEYRE.exec(str.slice(i,i+80));
        if(m){
          const key=m[1];let def='',optional=false,end;
          if(m[2]){let d=1,k=i+m[0].length;while(k<str.length&&d>0){if(str[k]==='{')d++;else if(str[k]==='}')d--;k++}
            def=str.slice(i+m[0].length,k-1);end=k}
          else if(m[3]){if(str[i+m[0].length]==='}'){optional=true;end=i+m[0].length+1}else{buf+=c;i++;continue}}
          else{end=i+m[0].length}
          flush();out.push({t:'param',key,def,optional:optional||(m[2]&&def==='')});i=end;continue;
        }
      }
    }
    buf+=c;i++;
  }
  flush();return out;
}
function parseFlags(s){
  const flags=[];if(!s)return flags;
  const MAC=g.MAC||{};
  const pieces=[];
  s.split('¶').forEach(p=>{const m=/^<<(\w+)>>$/.exec(p.trim());if(m&&MAC[m[1]])MAC[m[1]].split('¶').forEach(x=>pieces.push(x));else if(p.trim())pieces.push(p)});
  pieces.forEach(p=>{const parts=p.split('|');const ar=parts.pop(),en=parts.pop();const text=parts.join('|').trim();
    if(text)flags.push({text,tokens:scan(text),en:en||'',ar:ar||''})});
  return flags;
}
function resolveParam(tk){
  const OPTS=g.OPTS||{};let def=tk.def,opts=null;
  if(def.startsWith('@@'))opts=(OPTS[def.slice(2)]||[]).slice();
  else if(def.startsWith('@'))opts=def.slice(1).split(',');
  if(opts){def=opts[0];}
  return {key:tk.key,def,opts,optional:tk.optional||(opts&&opts[0]==='')};
}
function parseCmd(line){
  const p=line.split('§');if(p.length<4)return null;
  const [lvl,en,ar,tpl,fl]=p;
  const tokens=scan(tpl);const flags=parseFlags(fl);
  const params={};const order=[];
  const reg=tk=>{if(tk.t==='param'&&!params[tk.key]){params[tk.key]=resolveParam(tk);order.push(tk.key)}};
  tokens.forEach(reg);flags.forEach(f=>f.tokens.forEach(reg));
  const tplKeys=tokens.filter(t=>t.t==='param').map(t=>t.key);
  return {lvl:+lvl,en,ar,tpl,tokens,flags,params,order,tplKeys:[...new Set(tplKeys)]};
}
function parseTool(m,text){
  const [id,icon,name,desc,cat,distro,ins]=m;
  const sp=s=>{const a=s.split('|');return [a[0],a[1]||a[0]]};
  const tool={id,icon,name:sp(name),desc:sp(desc),cat,distro,ins:(ins||[]).map(i=>({en:i[0],ar:i[1],deb:i[2]||'',rpm:i[3]||''})),sections:[],cmds:[]};
  let sec=null;
  text.split('\n').forEach(line=>{
    if(!line.trim())return;
    if(line[0]==='#'){sec={title:sp(line.slice(1)),cmds:[]};tool.sections.push(sec);return}
    const c=parseCmd(line);if(!c)return;
    c.id=id+':'+tool.cmds.length;c.tool=id;tool.cmds.push(c);
    if(!sec){sec={title:['General','عام'],cmds:[]};tool.sections.push(sec)}
    sec.cmds.push(c);
  });
  return tool;
}
// st: {vals:{},fl:Set,sudo,extra,pipe,redir,bg}
function build(cmd,st){
  st=st||{};const vals=st.vals||{},fl=st.fl||new Set();
  const missing=[];const segs=[];let trim=false;
  const push=(s,k)=>{if(s==='')return;if(trim){s=s.replace(/^ +/,'');trim=false;if(!s)return}segs.push({s,k})};
  const val=key=>{const p=cmd.params[key];let v=vals[key];if(v===undefined)v=p.def;return v};
  const emitParam=tk=>{const v=val(tk.key);const p=cmd.params[tk.key];
    if(v===''||v==null){if(p.optional){trim=true;const last=segs[segs.length-1];if(last&&/ $/.test(last.s)&&last.k===0)last.s=last.s.replace(/ +$/,' ');return}
      missing.push(tk.key);push('<'+tk.key+'>',3)}else push(String(v),1)};
  const emitTokens=(tokens,k)=>tokens.forEach(tk=>{if(tk.t==='text')push(tk.v,k);else if(tk.t==='param')emitParam(tk)});
  const selected=cmd.flags.filter((f,i)=>fl.has(i));
  const emitFlags=()=>selected.forEach((f,i)=>{if(i>0||(segs.length&&!/ $/.test(segs[segs.length-1].s)))push(' ',0);emitTokens(f.tokens,2)});
  let hasFlagsTok=false;
  cmd.tokens.forEach(tk=>{if(tk.t==='flags'){hasFlagsTok=true;if(selected.length)emitFlags();else trim=true}else if(tk.t==='text')push(tk.v,0);else emitParam(tk)});
  if(!hasFlagsTok&&selected.length){push(' ',0);selected.forEach((f,i)=>{if(i>0)push(' ',0);emitTokens(f.tokens,2)})}
  // نظافة المسافات
  let out=segs.map(s=>({s:s.s,k:s.k}));
  if(out.length){out[0].s=out[0].s.replace(/^ +/,'');const l=out[out.length-1];l.s=l.s.replace(/ +$/,'')}
  out=out.filter(x=>x.s!=='');
  if(st.sudo)out.unshift({s:'sudo ',k:2});
  if(st.extra&&st.extra.trim())out.push({s:' '+st.extra.trim(),k:2});
  if(st.pipe&&st.pipe.trim())out.push({s:' | '+st.pipe.trim(),k:2});
  if(st.redir&&st.redir.trim())out.push({s:' > '+st.redir.trim(),k:2});
  if(st.bg)out.push({s:' &',k:2});
  return {plain:out.map(x=>x.s).join(''),segs:out,missing:[...new Set(missing)]};
}
const DANGER=/(\brm\s+(-[a-zA-Z]*[rf]|--recursive|--force)|\bmkfs|\bdd\s+if=|\bwipefs|\bshred\b|\bfdisk\b|\bparted\b|\bdestroy\b|\bprune\b|\bdrain\b|reset\s+--hard|git\s+clean|\bdelete\b|\bkill\s+-9|\bkillall\b|\bpkill\b|\breboot\b|\bpoweroff\b|\bhalt\b|\bshutdown\b|\bswapoff\b|\blvremove|\bvgremove|\bpvremove|\buserdel\b|\bflushall|\bflushdb|\bterraform\s+apply|\bhelm\s+uninstall|kubeadm\s+reset|iptables\s+-F|nft\s+flush|ufw\s+--force\s+reset|\bumount\s+-f|chmod\s+-R|chown\s+-R|--force\b|\buninstall\b|\bpurge\b|\bremove\b|\bautoremove\b|\bdrop\s+(table|database)|DROP\s|--rmi|\bterminate-instances|\brb\s)/i;
g.ENG={scan,parseCmd,parseTool,build,DANGER};
})(typeof window!=='undefined'?window:globalThis);
