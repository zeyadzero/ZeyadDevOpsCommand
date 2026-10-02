(function(){
'use strict';
const A=window.api||null;
const $=(s,r)=>(r||document).querySelector(s);
const $$=(s,r)=>[...(r||document).querySelectorAll(s)];
const el=(tag,cls,txt)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e};
const LS={get(k,d){try{const v=localStorage.getItem('zdc.'+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem('zdc.'+k,JSON.stringify(v))}catch(e){}}};
const S={lang:LS.get('lang','en'),theme:LS.get('theme','auto'),dist:LS.get('dist','all'),lvl:LS.get('lvl',0),fav:LS.get('fav',[]),recent:LS.get('recent',[]),th:LS.get('th',320),host:'deb'};
const save=k=>LS.set(k,S[k]);

// ================= i18n =================
const I={
ar:{ph:'ابحث في كل الأوامر… (مثلاً: docker run, firewall, pod, ssh)',all:'الكل',lvl0:'كل المستويات',lvl1:'🟢 أساسي',lvl2:'🟠 متوسط',lvl3:'🔴 متقدم',home:'الرئيسية',fav:'المفضلة',gen:'مولّد الملفات',term:'الترمنال',
hello:'مركز أوامر DevOps و Linux',sub:'كل الأوامر من الأساسي للمتقدم لـ Debian و RedHat — اختار الخيارات وسمّي اللي تحبه، واضغط تشغيل ينفّذ في الترمنال فوراً.',tools:'أداة',cmds:'أمر',tpls:'قالب ملف',recent:'آخر ما شغّلته',tools_h:'الأدوات',
install:'التثبيت والتجهيز',deb:'Debian / Ubuntu',rpm:'RedHat / Rocky / Alma / Fedora',opts:'الخيارات',params:'المتغيرات (سمّي اللي تحبه)',flags:'خصائص إضافية (اختار اللي تحتاجه)',more:'تكملة الأمر',sudo:'تشغيل بـ sudo',extra:'وسائط إضافية',extraPh:'مثال: --verbose',pipe:'تمرير لأمر (|)',pipePh:'مثال: grep error',redir:'حفظ الناتج في ملف (>)',redirPh:'out.txt',bg:'تشغيل في الخلفية (&)',reset:'إعادة الضبط',
run:'▶ تشغيل',copy:'نسخ',paste:'لصق بدون تنفيذ',copied:'تم النسخ ✓',sent:'تم الإرسال للترمنال ✓',fill:'املأ الحقول: ',confirmT:'⚠ أمر قد يكون خطيراً',confirmM:'الأمر ده ممكن يحذف أو يغيّر حاجات مهمة. تأكد قبل التنفيذ:',cancel:'إلغاء',runAnyway:'نفّذ على مسؤوليتي',noRes:'مفيش نتائج مطابقة.',
stop:'■ إيقاف (Ctrl+C)',kill:'☠ قتل إجباري',clear:'مسح',ext:'↗ نافذة خارجية',needDesktop:'الترمنال متاح في نسخة AppImage — اتنسخ الأمر.',noFav:'لسه مفيش مفضلة. اضغط ★ على أي أمر.',
genT:'مولّد الملفات',genS:'اختار قالب، عدّل القيم، والملف يتولد فوراً. تقدر تعدّل النص قبل النسخ أو الحفظ.',saveAs:'💾 حفظ كملف',writeDir:'📂 حفظ في مجلد…',savedTo:'تم الحفظ: ',lvlh:'المستوى',other:'بحث',exportFav:'⬇ تصدير المفضلة',favT:'الأوامر المفضلة',results:'نتيجة',hostTag:'نظامك',selected:'مختار',shell:'ترمنال',theme:'الثيم'},
en:{ph:'Search every command… (e.g. docker run, firewall, pod, ssh)',all:'All',lvl0:'All levels',lvl1:'🟢 Basic',lvl2:'🟠 Intermediate',lvl3:'🔴 Advanced',home:'Home',fav:'Favorites',gen:'File generator',term:'Terminal',
hello:'DevOps & Linux Command Center',sub:'Every command from basic to advanced for Debian & RedHat — pick the options, name things your way, and click Run to execute right in the terminal.',tools:'tools',cmds:'commands',tpls:'file templates',recent:'Recently run',tools_h:'Tools',
install:'Install & setup',deb:'Debian / Ubuntu',rpm:'RedHat / Rocky / Alma / Fedora',opts:'Options',params:'Variables (name them as you like)',flags:'Extra options (tick what you need)',more:'Command extras',sudo:'Run with sudo',extra:'Extra arguments',extraPh:'e.g. --verbose',pipe:'Pipe into (|)',pipePh:'e.g. grep error',redir:'Save output to file (>)',redirPh:'out.txt',bg:'Run in background (&)',reset:'Reset',
run:'▶ Run',copy:'Copy',paste:'Paste without running',copied:'Copied ✓',sent:'Sent to terminal ✓',fill:'Fill in: ',confirmT:'⚠ Potentially dangerous command',confirmM:'This command may delete or change important things. Double-check before running:',cancel:'Cancel',runAnyway:'Run it anyway',noRes:'No matching results.',
stop:'■ Stop (Ctrl+C)',kill:'☠ Force kill',clear:'Clear',ext:'↗ External window',needDesktop:'The terminal is available in the AppImage — command copied instead.',noFav:'No favorites yet. Click ★ on any command.',
genT:'File generator',genS:'Pick a template, tweak the values and the file is generated instantly. Edit the text before copying or saving.',saveAs:'💾 Save as file',writeDir:'📂 Save to folder…',savedTo:'Saved: ',lvlh:'Level',other:'Search',exportFav:'⬇ Export favorites',favT:'Favorite commands',results:'results',hostTag:'your system',selected:'selected',shell:'Terminal',theme:'Theme'}};
const t=k=>I[S.lang][k]||k;
const L=p=>p?(S.lang==='ar'?p[1]:p[0]):'';
const CATS=[['sys',['Core & System','النظام الأساسي']],['pkg',['Package managers','مدراء الحزم']],['net',['Networking & Firewalls','الشبكات والجدران']],['sec',['Security & Access','الأمان والوصول']],['store',['Storage','التخزين']],['vcs',['Version control','التحكم بالإصدارات']],['cont',['Containers','الحاويات']],['orch',['Orchestration','التنسيق']],['iac',['Infrastructure as Code','البنية ككود']],['cicd',['CI/CD','التكامل والتسليم']],['mon',['Monitoring','المراقبة']],['cloud',['Cloud','السحابة']],['web',['Web & Databases','الويب وقواعد البيانات']],['misc',['Virtualization','الأجهزة الافتراضية']]];
const PD={name:['Name','الاسم'],image:['Image','الصورة'],container:['Container','الحاوية'],ports:['Ports host:container','المنافذ'],port:['Port','المنفذ'],path:['Path','المسار'],file:['File','الملف'],dir:['Directory','المجلد'],host:['Host','المضيف'],user:['User','المستخدم'],pkg:['Package','الحزمة'],svc:['Service','الخدمة'],ns:['Namespace','النطاق (Namespace)'],pod:['Pod','الـ Pod'],node:['Node','العقدة'],res:['Resource','المورد'],label:['Label','الوسم'],tag:['Tag','الوسم'],repo:['Repository','المستودع'],url:['URL','الرابط'],branch:['Branch','الفرع'],msg:['Message','الرسالة'],ver:['Version','الإصدار'],version:['Version','الإصدار'],cmd:['Command','الأمر'],mode:['Action','الإجراء'],n:['Number','العدد'],secs:['Seconds','الثواني'],size:['Size','الحجم'],mem:['Memory','الذاكرة'],cpu:['CPU','المعالج'],cpus:['CPUs','المعالجات'],env:['Variable KEY=value','متغير KEY=value'],kv:['key=value','مفتاح=قيمة'],ctx:['Context','السياق'],cf:['Compose options (-f file -p name)','خيارات Compose (-f ملف -p اسم)'],src:['Source','المصدر'],dst:['Destination','الوجهة'],dev:['Device','الجهاز'],mnt:['Mount point','نقطة الربط'],iface:['Interface','الواجهة'],ip:['IP address','عنوان IP'],cidr:['CIDR / address','العنوان / CIDR'],gw:['Gateway','البوابة'],dns:['DNS','DNS'],domain:['Domain','الدومين'],password:['Password','كلمة المرور'],token:['Token','التوكن'],key:['Key','المفتاح'],vol:['Volume','الـ Volume'],volume:['Volume','الـ Volume'],network:['Network','الشبكة'],release:['Release','اسم الإصدار'],chart:['Chart','الـ Chart'],values:['Values file','ملف القيم'],playbook:['Playbook','الـ Playbook'],inv:['Inventory','ملف الجرد'],pattern:['Pattern','النمط'],module:['Module','الوحدة'],args:['Arguments','الوسائط'],job:['Job','الـ Job'],group:['Group','المجموعة'],groups:['Groups','المجموعات'],shell:['Shell','الشل'],home:['Home dir','المجلد الرئيسي'],mode_:['Mode','الصلاحيات'],owner:['Owner','المالك'],keyword:['Keyword','كلمة البحث'],text:['Text','النص'],filter:['Filter','التصفية'],type:['Type','النوع'],pid:['PID','رقم العملية'],db:['Database','قاعدة البيانات'],table:['Table','الجدول'],region:['Region','المنطقة'],profile:['Profile','البروفايل'],project:['Project','المشروع'],cluster:['Cluster','العنقود'],server:['Server','الخادم'],rev:['Revision','المراجعة'],id:['ID','المعرف'],pw:['Password','كلمة المرور'],email:['Email','البريد'],out:['Output file','ملف الإخراج'],sec:['Seconds','الثواني'],since:['Since','منذ'],until:['Until','حتى'],lvl:['Level','المستوى'],level:['Level','المستوى'],time:['Time','الوقت'],days:['Days','الأيام'],selector:['Label selector','محدد الوسوم'],container_:['Container','الحاوية'],registry:['Registry','الـ Registry'],stream:['Stream (e.g. :20)','التدفق (مثل :20)'],secret:['Secret','السر'],cm:['ConfigMap','ConfigMap'],sa:['ServiceAccount','ServiceAccount'],role:['Role','الدور'],verb:['Verb','الفعل'],ing:['Ingress','Ingress'],hostname:['Hostname','اسم المضيف'],ssid:['Wi-Fi name','اسم الشبكة'],hash:['Hash','البصمة'],endpoint:['Endpoint','النقطة'],csr:['CSR name','اسم الـ CSR'],plugin:['Plugin','الإضافة'],script:['Script','السكربت'],tool:['Tool','الأداة'],crt:['Certificate','الشهادة'],bits:['Bits','الحجم بالبت'],days_:['Days','الأيام']};
const plabel=k=>{const p=PD[k];return p?L(p):k.replace(/_/g,' ')};

// ================= data =================
const TOOLS=RAW.map(([m,x])=>ENG.parseTool(m,x));
const TBY={};TOOLS.forEach(x=>TBY[x.id]=x);
const CBY={};TOOLS.forEach(x=>x.cmds.forEach(c=>CBY[c.id]=c));
const TOTAL=TOOLS.reduce((n,x)=>n+x.cmds.length,0);
const CS={};
const stOf=c=>CS[c.id]||(CS[c.id]={vals:{},fl:new Set(),sudo:false,extra:'',pipe:'',redir:'',bg:false});
const visTool=x=>S.dist==='all'||x.distro==='all'||x.distro===S.dist;
const visCmd=c=>!S.lvl||c.lvl===S.lvl;

// ================= helpers =================
let toastT;
function toast(msg){const e=$('#toast');e.textContent=msg;e.classList.add('s');clearTimeout(toastT);toastT=setTimeout(()=>e.classList.remove('s'),1600)}
async function copyText(text){try{if(A)await A.clipWrite(text);else await navigator.clipboard.writeText(text)}catch(e){const ta=document.createElement('textarea');ta.value=text;document.body.appendChild(ta);ta.select();try{document.execCommand('copy')}catch(_){}ta.remove()}toast(t('copied'))}
function confirmDanger(text){return new Promise(res=>{$('#mt').textContent=t('confirmT');$('#mm').textContent=t('confirmM');$('#mc').textContent=text;$('#mno').textContent=t('cancel');$('#myes').textContent=t('runAnyway');$('#modal').classList.add('on');
  const done=v=>{$('#modal').classList.remove('on');$('#mno').onclick=$('#myes').onclick=null;res(v)};$('#mno').onclick=()=>done(false);$('#myes').onclick=()=>done(true)})}
function renderSegs(pre,segs){pre.textContent='';segs.forEach(s=>{if(s.k){const sp=el('span','k'+s.k,s.s);pre.appendChild(sp)}else pre.appendChild(document.createTextNode(s.s))})}
function pushRecent(text){S.recent=[{text,ts:Date.now()},...S.recent.filter(r=>r.text!==text)].slice(0,30);save('recent')}

// ================= terminal =================
const TM={sess:[],act:null,seq:0};
const tAct=()=>TM.sess.find(s=>s.id===TM.act);
function fitActive(){const s=tAct();if(!s||!$('#term').classList.contains('on'))return;try{s.fit.fit()}catch(e){}}
function renderTabs(){const tabs=$('#tabs');tabs.textContent='';TM.sess.forEach(s=>{const d=el('div','tab'+(s.id===TM.act?' on':''));d.append(el('span',null,'⌨ '+s.title));const x=el('i',null,'✕');x.onclick=e=>{e.stopPropagation();closeTab(s.id)};d.append(x);d.onclick=()=>activate(s.id);tabs.appendChild(d)})}
function activate(id){TM.act=id;TM.sess.forEach(s=>s.pane.classList.toggle('on',s.id===id));renderTabs();requestAnimationFrame(()=>{fitActive();const s=tAct();if(s)s.term.focus()})}
function closeTab(id){const i=TM.sess.findIndex(s=>s.id===id);if(i<0)return;const s=TM.sess[i];try{A&&A.ptyClose(id)}catch(e){}try{s.term.dispose()}catch(e){}s.pane.remove();TM.sess.splice(i,1);
  if(!TM.sess.length){hideTerm()}else{activate(TM.sess[Math.max(0,i-1)].id)}renderTabs()}
async function newTab(){
  if(!A){const m=$('#tmsg');m.style.display='grid';m.textContent=t('needDesktop');return null}
  $('#tmsg').style.display='none';
  const id='t'+(++TM.seq);const pane=el('div','tpane');$('#tbody').appendChild(pane);
  const term=new Terminal({fontFamily:'ui-monospace,"SF Mono",Menlo,Consolas,"DejaVu Sans Mono",monospace',fontSize:13,cursorBlink:true,scrollback:8000,allowProposedApi:true,theme:{background:'#0b0f14',foreground:'#d7f7e6',cursor:'#2dd4bf',selectionBackground:'#134e4a',black:'#1b2430',brightBlack:'#475569'}});
  const fit=new FitAddon.FitAddon();term.loadAddon(fit);
  try{term.loadAddon(new WebLinksAddon.WebLinksAddon())}catch(e){}
  term.open(pane);
  const s={id,pane,term,fit,title:'bash '+TM.seq,ready:false,q:[]};TM.sess.push(s);activate(id);
  try{fit.fit()}catch(e){}
  term.attachCustomKeyEventHandler(ev=>{
    if(ev.type!=='keydown')return true;
    if(ev.ctrlKey&&ev.shiftKey&&ev.code==='KeyC'){const sel=term.getSelection();if(sel)A.clipWrite(sel);return false}
    if(ev.ctrlKey&&ev.shiftKey&&ev.code==='KeyV'){A.clipRead().then(x=>term.paste(x));return false}
    if(ev.ctrlKey&&!ev.shiftKey&&ev.code==='KeyC'&&term.hasSelection()){A.clipWrite(term.getSelection());term.clearSelection();return false}
    return true});
  pane.addEventListener('contextmenu',e=>{e.preventDefault();const sel=term.getSelection();if(sel){A.clipWrite(sel);term.clearSelection()}else A.clipRead().then(x=>term.paste(x))});
  term.onData(d=>A.ptyWrite(id,d));
  term.onResize(({cols,rows})=>A.ptyResize(id,cols,rows));
  const r=await A.ptyStart(id,term.cols||80,term.rows||24,null);
  if(r!=='ok')term.write('\r\n\x1b[31m'+r+'\x1b[0m\r\n');
  return s}
async function openTerm(){$('#term').classList.add('on');document.body.classList.add('tm');$('#tbl').textContent=t('term');
  if(!TM.sess.length)await newTab();else{fitActive();const s=tAct();if(s)s.term.focus()}}
function hideTerm(){$('#term').classList.remove('on');document.body.classList.remove('tm')}
async function runInTerm(text,enter){
  if(!A){copyText(text);toast(t('needDesktop'));return}
  await openTerm();const s=tAct();if(!s)return;
  const payload=text+(enter?'\r':'');if(s.ready)A.ptyWrite(s.id,payload);else s.q.push(payload);s.term.focus();toast(enter?t('sent'):t('sent'))}
if(A){A.onPtyData(({id,data})=>{const s=TM.sess.find(x=>x.id===id);if(!s)return;s.term.write(data);if(!s.ready){s.ready=true;setTimeout(()=>{s.q.splice(0).forEach(x=>A.ptyWrite(s.id,x))},150)}});A.onPtyExit(({id})=>closeTab(id));A.osFamily().then(f=>{S.host=f;render()})}
$('#tnew').onclick=()=>{$('#term').classList.add('on');document.body.classList.add('tm');newTab()};
$('#tstop').onclick=()=>{const s=tAct();if(s&&A){A.ptyWrite(s.id,'\x03');s.term.focus()}};
$('#tkill').onclick=()=>{const s=tAct();if(s&&A){A.ptyWrite(s.id,'\x03');A.ptyKill(s.id);s.term.focus()}};
$('#tclr').onclick=()=>{const s=tAct();if(s){s.term.clear();s.term.focus()}};
$('#text').onclick=()=>{if(A)A.external('bash')};
$('#thide').onclick=hideTerm;
$('#tbtn').onclick=()=>$('#term').classList.contains('on')?hideTerm():openTerm();
(function(){const d=$('#tdrag');let drag=false;d.addEventListener('mousedown',e=>{drag=true;e.preventDefault()});
  window.addEventListener('mousemove',e=>{if(!drag)return;S.th=Math.max(160,Math.min(window.innerHeight-170,window.innerHeight-e.clientY));document.documentElement.style.setProperty('--th',S.th+'px')});
  window.addEventListener('mouseup',()=>{if(drag){drag=false;save('th');fitActive()}})})();
let rz;new ResizeObserver(()=>{clearTimeout(rz);rz=setTimeout(fitActive,80)}).observe($('#tbody'));

// ================= command execution =================
async function execute(cmd,st,forcePaste){
  const b=ENG.build(cmd,st);
  if(b.missing.length&&!forcePaste){toast(t('fill')+b.missing.map(plabel).join('، '));return {missing:b.missing}}
  if(forcePaste){runInTerm(b.plain,false);return}
  if(ENG.DANGER.test(b.plain)&&!(await confirmDanger(b.plain)))return;
  pushRecent(b.plain);runInTerm(b.plain,true)}

// ================= cards =================
function inputFor(cmd,st,key,onchange){
  const p=cmd.params[key];const wrap=el('label');wrap.append(plabel(key)+(p.optional?' ('+(S.lang==='ar'?'اختياري':'optional')+')':''));
  let inp;const cur=st.vals[key]!==undefined?st.vals[key]:p.def;
  if(p.opts){inp=el('select');p.opts.forEach(o=>{const op=el('option',null,o===''?'—':o);op.value=o;if(o===cur)op.selected=true;inp.appendChild(op)})}
  else{inp=el('input');inp.type=key==='password'||key==='pw'?'text':'text';inp.value=cur;inp.placeholder=p.optional?'':'…';inp.spellcheck=false}
  inp.dataset.k=key;const h=()=>{st.vals[key]=inp.value;inp.classList.remove('miss');onchange()};inp.addEventListener('input',h);inp.addEventListener('change',h);
  wrap.appendChild(inp);return wrap}
function flagLabel(f){return f.tokens.map(tk=>tk.t==='text'?tk.v:'‹'+plabel(tk.key)+'›').join('')}
function buildOpt(cmd,st,card,upd){
  const box=el('div','opt');
  if(cmd.tplKeys.length){box.append(el('h5',null,t('params')));const g=el('div','pg');cmd.tplKeys.forEach(k=>g.appendChild(inputFor(cmd,st,k,upd)));box.appendChild(g)}
  if(cmd.flags.length){box.append(el('h5',null,t('flags')));const fl=el('div','fl');
    cmd.flags.forEach((f,i)=>{const row=el('div','fr'+(st.fl.has(i)?' on':''));
      const cb=el('input');cb.type='checkbox';cb.checked=st.fl.has(i);
      const code=el('code',null,flagLabel(f));const d=el('span','d',L([f.en,f.ar]));
      row.append(cb,code,d);
      const keys=[...new Set(f.tokens.filter(x=>x.t==='param').map(x=>x.key))].filter(k=>!cmd.tplKeys.includes(k));
      if(keys.length){const fv=el('div','fv');keys.forEach(k=>fv.appendChild(inputFor(cmd,st,k,upd)));row.appendChild(fv)}
      cb.onchange=()=>{if(cb.checked)st.fl.add(i);else st.fl.delete(i);row.classList.toggle('on',cb.checked);upd()};
      code.onclick=d.onclick=()=>{cb.checked=!cb.checked;cb.onchange()};
      fl.appendChild(row)});box.appendChild(fl)}
  box.append(el('h5',null,t('more')));const m=el('div','more');
  const mk=(lbl,type,key,ph)=>{const w=el('label');if(type==='checkbox'){w.className='ck';const c=el('input');c.type='checkbox';c.checked=!!st[key];c.onchange=()=>{st[key]=c.checked;upd()};w.append(c,lbl)}else{w.append(lbl);const i=el('input');i.value=st[key]||'';i.placeholder=ph||'';i.oninput=()=>{st[key]=i.value;upd()};w.appendChild(i)}return w};
  m.append(mk(t('sudo'),'checkbox','sudo'),mk(t('bg'),'checkbox','bg'),mk(t('extra'),'text','extra',t('extraPh')),mk(t('pipe'),'text','pipe',t('pipePh')),mk(t('redir'),'text','redir',t('redirPh')));
  box.appendChild(m);
  const rb=el('button','ib',t('reset'));rb.style.marginTop='10px';rb.onclick=()=>{delete CS[cmd.id];card.replaceWith(createCard(cmd))};box.appendChild(rb);
  return box}
function createCard(cmd){
  const st=stOf(cmd);const card=el('div','card');
  const head=el('div','ch');head.appendChild(el('span','lv lv'+cmd.lvl));
  const ti=el('div','ct1');ti.append(L([cmd.en,cmd.ar]));head.appendChild(ti);
  const ab=el('div','ab');
  const fav=el('button','fav'+(S.fav.includes(cmd.id)?' on':''),'★');
  const nopt=cmd.tplKeys.length+cmd.flags.length;
  const opb=nopt?el('button','opb','⚙ '+nopt):null;
  const cp=el('button',null,'⎘');cp.title=t('copy');
  const ps=el('button',null,'↳');ps.title=t('paste');
  const run=el('button','run',t('run'));
  ab.append(fav);if(opb)ab.append(opb);ab.append(cp,ps,run);head.appendChild(ab);
  const pre=el('pre','cmd');pre.title=t('run');
  let optBox=null;
  const upd=()=>{const b=ENG.build(cmd,st);renderSegs(pre,b.segs);return b};
  upd();
  card.append(head,pre);
  const openOpt=()=>{if(!optBox){optBox=buildOpt(cmd,st,card,upd);card.appendChild(optBox)}card.classList.add('open');opb&&opb.classList.add('on')};
  if(opb)opb.onclick=()=>{if(card.classList.contains('open')){card.classList.remove('open');opb.classList.remove('on')}else openOpt()};
  const go=async()=>{const r=await execute(cmd,st);if(r&&r.missing){openOpt();r.missing.forEach(k=>{const i=optBox.querySelector('[data-k="'+k+'"]');if(i)i.classList.add('miss')});const f=optBox.querySelector('.miss');if(f)f.focus()}};
  run.onclick=go;pre.onclick=go;
  cp.onclick=()=>copyText(ENG.build(cmd,st).plain);
  ps.onclick=()=>execute(cmd,st,true);
  fav.onclick=()=>{const i=S.fav.indexOf(cmd.id);if(i<0)S.fav.push(cmd.id);else S.fav.splice(i,1);save('fav');fav.classList.toggle('on',i<0);if(view.type==='fav')render()};
  return card}

// ================= views =================
const view={type:'home',id:null};
const main=$('#main');
function go(type,id){view.type=type;view.id=id||null;render();main.scrollTop=0;$('#nav').classList.remove('open')}
function renderNav(){
  const nav=$('#nav');nav.textContent='';
  const add=(type,id,icon,name,count)=>{const b=el('button',(view.type===type&&view.id===(id||null))?'on':'');b.append(el('span','ic',icon),el('span','nm',name));if(count!=null)b.append(el('span','ct',count));b.onclick=()=>go(type,id);nav.appendChild(b)};
  add('home',null,'🏠',t('home'));add('fav',null,'⭐',t('fav'),S.fav.length||null);add('gen',null,'🧱',t('gen'),TPL.length);
  CATS.forEach(([cid,cn])=>{const list=TOOLS.filter(x=>x.cat===cid&&visTool(x));if(!list.length)return;nav.appendChild(el('h4',null,L(cn)));list.forEach(x=>{
    const b=el('button',(view.type==='tool'&&view.id===x.id)?'on':'');b.append(el('span','ic',x.icon),el('span','nm',L(x.name)));
    if(x.distro!=='all'&&S.dist==='all')b.append(el('span','ct',x.distro==='deb'?'DEB':'RPM'));else b.append(el('span','ct',x.cmds.length));
    b.onclick=()=>go('tool',x.id);nav.appendChild(b)})})}
function homeView(){
  const w=el('div','wrap');const hero=el('div','hero');hero.append(el('h1',null,t('hello')),el('p',null,t('sub')));
  const st=el('div','stats');[TOOLS.length+' '+t('tools'),TOTAL+' '+t('cmds'),TPL.length+' '+t('tpls'),'Debian · RedHat'].forEach(x=>st.appendChild(el('span',null,x)));hero.appendChild(st);w.appendChild(hero);
  if(S.recent.length){w.appendChild(el('h2','sec','🕘 '+t('recent')));S.recent.slice(0,8).forEach(r=>{const pre=el('pre','cmd',r.text);pre.style.marginInline='0';pre.onclick=()=>runInTerm(r.text,true);w.appendChild(pre)})}
  w.appendChild(el('h2','sec','🧰 '+t('tools_h')));
  const g=el('div','grid');TOOLS.filter(visTool).forEach(x=>{const c=el('button','tcard');c.append(el('div','i',x.icon),el('b',null,L(x.name)),el('small',null,L(x.desc)),el('em',null,x.cmds.length+' '+t('cmds')));c.onclick=()=>go('tool',x.id);g.appendChild(c)});w.appendChild(g);return w}
function toolView(x){
  const w=el('div','wrap');const h=el('div','thead');h.append(el('div','i',x.icon));const hd=el('div');hd.append(el('h1',null,L(x.name)),el('p',null,L(x.desc)));h.appendChild(hd);w.appendChild(h);
  const ins=x.ins.filter(i=>(S.dist!=='rpm'&&i.deb)||(S.dist!=='deb'&&i.rpm));
  if(ins.length&&!S.lvl){const p=el('div','panel');p.appendChild(el('h3',null,'📥 '+t('install')));
    ins.forEach(i=>{const t0=el('div',null);t0.style.marginBottom='10px';t0.appendChild(el('div','t',L([i.en,i.ar])));const g=el('div','inst');
      [['deb',t('deb'),i.deb],['rpm',t('rpm'),i.rpm]].forEach(([k,lab,c])=>{if(!c||(S.dist!=='all'&&S.dist!==k))return;const d=el('div');d.appendChild(el('div','t','▸ '+lab+(S.host===k?' ★ '+t('hostTag'):'')));const pre=el('pre','cmd',c);pre.onclick=async()=>{if(ENG.DANGER.test(c)&&!(await confirmDanger(c)))return;pushRecent(c);runInTerm(c,true)};const bar=el('div','rowb');bar.style.margin='4px 0 0';const cb=el('button','ib',t('copy'));cb.onclick=()=>copyText(c);const rb=el('button','ib on',t('run'));rb.onclick=pre.onclick;bar.append(rb,cb);d.append(pre,bar);g.appendChild(d)});
      t0.appendChild(g);p.appendChild(t0)});w.appendChild(p)}
  let shown=0;x.sections.forEach(sec=>{const cs=sec.cmds.filter(visCmd);if(!cs.length)return;w.appendChild(el('h2','sec',L(sec.title)+' · '+cs.length));cs.forEach(c=>{w.appendChild(createCard(c));shown++})});
  if(!shown)w.appendChild(el('div','empty',t('noRes')));return w}
function favView(){
  const w=el('div','wrap');const h=el('div','thead');h.append(el('div','i','⭐'));const hd=el('div');hd.append(el('h1',null,t('favT')));h.appendChild(hd);
  const ex=el('button','ib',t('exportFav'));ex.style.marginInlineStart='auto';ex.onclick=()=>{let o='#!/bin/bash\n';S.fav.forEach(id=>{const c=CBY[id];if(c)o+='\n# '+c.en+'\n'+ENG.build(c,stOf(c)).plain+'\n'});const name='favorites.sh';if(A)A.saveFile(name,o);else{const a=document.createElement('a');a.href='data:text/plain;charset=utf-8,'+encodeURIComponent(o);a.download=name;a.click()}};h.appendChild(ex);w.appendChild(h);
  const list=S.fav.map(id=>CBY[id]).filter(Boolean);if(!list.length)w.appendChild(el('div','empty',t('noFav')));list.forEach(c=>w.appendChild(createCard(c)));return w}
function searchView(q){
  const w=el('div','wrap');const toks=q.toLowerCase().split(/\s+/).filter(Boolean);let n=0;const out=[];
  TOOLS.filter(visTool).forEach(x=>{x.cmds.forEach(c=>{if(!visCmd(c))return;
    const hay=(x.name.join(' ')+' '+c.en+' '+c.ar+' '+c.tpl+' '+c.flags.map(f=>f.text+' '+f.en+' '+f.ar).join(' ')).toLowerCase();
    if(toks.every(tk=>hay.includes(tk)))out.push([x,c])})});
  w.appendChild(el('h2','sec','🔎 '+out.length+' '+t('results')));
  if(!out.length)w.appendChild(el('div','empty',t('noRes')));
  let last=null;out.slice(0,150).forEach(([x,c])=>{if(last!==x.id){last=x.id;const hh=el('div',null,x.icon+'  '+L(x.name));hh.style.cssText='margin:16px 2px 0;font-weight:700;color:var(--ac2)';w.appendChild(hh)}w.appendChild(createCard(c))});
  return w}
// ----- generator
const GEN_EN={name:'App name',image:'Image',port:'Port',replicas:'Replicas',ns:'Namespace',host:'Domain',env:'Environment',repo:'Git URL',path:'Manifests path',branch:'Branch',cpu:'CPU limit',mem:'Memory limit',size:'Size',sched:'Cron schedule',ver:'Version',user:'User',pkg:'Package',region:'Region',itype:'Instance type',dbpw:'DB password',cmd:'Start command',reg:'Registry',bucket:'Bucket',cidr:'CIDR',dir:'Directory'};
let gi=0;const gv={};
const gname=tp=>{const a=tp.n.split('|');return S.lang==='ar'?(a[1]||a[0]):a[0]};
function genView(){
  const w=el('div','wrap');const h=el('div','thead');h.append(el('div','i','🧱'));const hd=el('div');hd.append(el('h1',null,t('genT')+' ('+TPL.length+')'),el('p',null,t('genS')));h.appendChild(hd);w.appendChild(h);
  const p=el('div','panel');const sel=el('select','gsel');sel.style.cssText='width:100%;padding:8px';
  [...new Set(TPL.map(x=>x.c))].forEach(cn=>{const og=el('optgroup');og.label=cn;TPL.forEach((tp,i)=>{if(tp.c===cn){const o=el('option',null,gname(tp)+'  ('+tp.f+')');o.value=i;if(i===gi)o.selected=true;og.appendChild(o)}});sel.appendChild(og)});
  const fields=el('div','fld');fields.style.marginTop='10px';
  const ta=el('textarea');ta.id='gout';ta.spellcheck=false;
  const gen=()=>{const tp=TPL[gi];const v={};Object.keys(TPLF).forEach(k=>v[k]=gv[k]!==undefined?gv[k]:TPLF[k][1]);ta.value=tp.g(v);fn.textContent='📄 '+tp.f};
  const fn=el('div');fn.style.cssText='font-weight:600;margin:12px 2px 6px;direction:ltr;text-align:left';
  const draw=()=>{fields.textContent='';TPL[gi].k.forEach(k=>{const l=el('label');l.append(S.lang==='ar'?TPLF[k][0]:(GEN_EN[k]||k));const i=el('input');i.value=gv[k]!==undefined?gv[k]:TPLF[k][1];i.oninput=()=>{gv[k]=i.value;gen()};l.appendChild(i);fields.appendChild(l)});gen()};
  sel.onchange=()=>{gi=+sel.value;draw()};
  p.append(sel,fields);w.appendChild(p);w.appendChild(fn);
  const bar=el('div','rowb');const mkb=(txt,fnc,cls)=>{const b=el('button','ib '+(cls||''),txt);b.onclick=fnc;bar.appendChild(b)};
  mkb('⎘ '+t('copy'),()=>copyText(ta.value));
  mkb(t('saveAs'),async()=>{const nm=TPL[gi].f.split('/').pop();if(A){const r=await A.saveFile(nm,ta.value);if(r)toast(t('savedTo')+r)}else{const a=document.createElement('a');a.href='data:text/plain;charset=utf-8,'+encodeURIComponent(ta.value);a.download=nm;a.click()}});
  mkb(t('writeDir'),async()=>{if(!A){toast(t('needDesktop'));return}const r=await A.writeDir(TPL[gi].f,ta.value);if(r)toast(t('savedTo')+r)});
  w.appendChild(bar);w.appendChild(ta);draw();return w}

function render(){
  renderNav();main.textContent='';
  const q=$('#q').value.trim();
  if(q){main.appendChild(searchView(q));return}
  if(view.type==='home')main.appendChild(homeView());
  else if(view.type==='tool'){const x=TBY[view.id];if(x)main.appendChild(toolView(x))}
  else if(view.type==='fav')main.appendChild(favView());
  else if(view.type==='gen')main.appendChild(genView())}

// ================= chrome =================
function applyLang(){
  document.documentElement.lang=S.lang;document.documentElement.dir=S.lang==='ar'?'rtl':'ltr';
  $('#q').placeholder=t('ph');$('#dist button[data-d=all]').textContent=t('all');
  const lv=$('#lvl');lv.textContent='';[0,1,2,3].forEach(i=>{const o=el('option',null,t('lvl'+i));o.value=i;if(i===S.lvl)o.selected=true;lv.appendChild(o)});
  $('#lang').textContent=S.lang==='ar'?'EN':'عربي';$('#tbl').textContent=t('term');
  $('#tstop').textContent=t('stop');$('#tkill').textContent=t('kill');$('#tclr').textContent=t('clear');$('#text').textContent=t('ext')}
function applyTheme(){const d=document.documentElement;if(S.theme==='auto'){d.dataset.theme=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}else d.dataset.theme=S.theme}
function applyDist(){$$('#dist button').forEach(b=>b.classList.toggle('on',b.dataset.d===S.dist))}
$('#dist').onclick=e=>{const b=e.target.closest('button');if(!b)return;S.dist=b.dataset.d;save('dist');applyDist();if(view.type==='tool'&&!visTool(TBY[view.id]))view.type='home';render()};
$('#lvl').onchange=e=>{S.lvl=+e.target.value;save('lvl');render()};
$('#lang').onclick=()=>{S.lang=S.lang==='ar'?'en':'ar';save('lang');applyLang();render();renderTabs()};
$('#theme').onclick=()=>{S.theme=document.documentElement.dataset.theme==='dark'?'light':'dark';save('theme');applyTheme()};
$('#menu').onclick=()=>$('#nav').classList.toggle('open');
let qt;$('#q').addEventListener('input',()=>{clearTimeout(qt);qt=setTimeout(()=>{render();main.scrollTop=0},140)});
document.addEventListener('keydown',e=>{
  if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();$('#q').focus();$('#q').select()}
  else if(e.ctrlKey&&(e.key==='`'||e.code==='Backquote')){e.preventDefault();$('#tbtn').click()}
  else if(e.key==='Escape'){if($('#modal').classList.contains('on'))$('#mno').click();else if(document.activeElement===$('#q')){$('#q').value='';render()}}});
document.documentElement.style.setProperty('--th',S.th+'px');
applyTheme();applyLang();applyDist();render();
window.__zdc={S,TOOLS,TM,CS,CBY,ENG,render,go,runInTerm,openTerm,newTab,execute,createCard,view};
})();
