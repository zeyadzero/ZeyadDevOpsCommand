T(["git","🌿","Git|Git","Version control: from first commit to advanced history surgery|التحكم في الإصدارات من أول commit لعمليات التاريخ المتقدمة","vcs","all",[["Install Git","تثبيت Git","sudo apt install -y git git-lfs","sudo dnf install -y git git-lfs"],["Identity","ضبط الهوية","git config --global user.name 'Your Name' && git config --global user.email 'you@example.com' && git config --global init.defaultBranch main",""]]],`
#Setup & config|الإعداد
1§Set identity§ضبط الهوية§git config --global {key=@user.name,user.email,core.editor,init.defaultBranch,pull.rebase,push.autoSetupRemote,credential.helper,color.ui} '{value=value}'
1§Show config§عرض الإعدادات§git config {*} --list§--global|Global|عام¶--local|Repo|المستودع¶--show-origin|Show file|مكان الملف
2§Create alias§إنشاء اختصار§git config --global alias.{alias=st} '{value=status -sb}'
2§Cache credentials§حفظ بيانات الدخول§git config --global credential.helper '{helper=@cache --timeout=3600,store,manager}'
1§Init repository§إنشاء مستودع§git init {*} {dir?}§-b {branch=main}|Initial branch|الفرع الأولي¶--bare|Bare repo|مستودع bare
1§Clone repository§نسخ مستودع§git clone {*} {url=https://github.com/user/repo.git} {dir?}§-b {branch=main}|Branch|الفرع¶--depth {n=1}|Shallow clone|نسخ سطحي¶--recurse-submodules|With submodules|مع submodules¶--single-branch|Single branch|فرع واحد¶--filter=blob:none|Partial clone|نسخ جزئي¶--mirror|Mirror|مرآة
#Stage & commit|التجهيز والحفظ
1§Status§الحالة§git status {*}§-s|Short|مختصر¶-b|Branch info|معلومات الفرع¶--ignored|Show ignored|إظهار المتجاهل
1§Stage changes§تجهيز التغييرات§git add {*} {path=.}§-A|All changes|كل التغييرات¶-p|Interactive hunks|تفاعلي¶-u|Tracked only|المتتبعة فقط¶-n|Dry run|تجربة¶-f|Force ignored|إجبار المتجاهل
1§Commit§حفظ التغييرات§git commit {*}§-m '{msg=update}'|Message|الرسالة¶-a|Stage tracked|تجهيز المتتبع¶--amend|Amend last|تعديل آخر commit¶--no-edit|Keep message|إبقاء الرسالة¶-S|GPG sign|توقيع GPG¶--allow-empty|Allow empty|السماح بفارغ¶--no-verify|Skip hooks|تجاوز الـ hooks¶--author='{author=Name <mail@x.com>}'|Author|المؤلف
1§Show changes§عرض التغييرات§git diff {*} {path?}§--staged|Staged|المجهز¶--stat|Summary|ملخص¶--name-only|File names|أسماء الملفات¶-w|Ignore whitespace|تجاهل المسافات¶--word-diff|Word diff|فرق الكلمات¶{a=main}..{b=feature}|Between refs|بين فرعين
1§Unstage / restore file§إلغاء التجهيز / استعادة§git restore {*} {path=.}§--staged|Unstage|إلغاء التجهيز¶--source={ref=HEAD~1}|From commit|من commit¶-p|Interactive|تفاعلي
1§Remove tracked file§حذف ملف متتبع§git rm {*} {path}§--cached|Keep on disk|إبقاؤه على القرص¶-r|Recursive|متداخل¶-f|Force|إجبار
1§Move / rename file§نقل أو تسمية ملف§git mv {src} {dst}
#History|التاريخ
1§Commit log§سجل الـ commits§git log {*}§--oneline|One line|سطر واحد¶--graph|Graph|رسم¶--all|All branches|كل الفروع¶--decorate|Show refs|إظهار المراجع¶-n {n=10}|Limit|حد¶--author='{author=bob}'|Author|المؤلف¶--since='{since=2 weeks ago}'|Since|منذ¶--until='{until=yesterday}'|Until|حتى¶--grep='{text=fix}'|Message grep|بحث في الرسائل¶-p|Patches|التغييرات¶--stat|Stats|إحصائيات¶-S'{text=function}'|Code search|بحث في الكود¶--follow {file=README.md}|Follow file|تتبع ملف¶--pretty=format:'%h %an %ar %s'|Custom format|صيغة مخصصة
1§Show a commit§عرض commit§git show {*} {ref=HEAD}§--stat|Stats|إحصائيات¶--name-only|Names|الأسماء¶--format=fuller|Full info|معلومات كاملة
2§Who changed each line§من عدّل كل سطر§git blame {*} {file}§-L {range=1,20}|Line range|نطاق الأسطر¶-w|Ignore whitespace|تجاهل المسافات
2§Search in code§بحث في الكود§git grep {*} '{text}'§-n|Line numbers|أرقام الأسطر¶-i|Ignore case|تجاهل الحالة¶-c|Count|عدّ
2§Contributors summary§ملخص المساهمين§git shortlog {*}§-sn|Commits per author|عدد لكل مؤلف¶--all|All branches|كل الفروع
2§Reference log§سجل المراجع§git reflog {*}§-n {n=20}|Limit|حد
2§Describe commit§وصف commit§git describe {*} {ref?}§--tags|Use tags|استخدام الوسوم¶--always|Always|دائماً
2§List files tracked§الملفات المتتبعة§git ls-files {*}§-m|Modified|المعدّلة¶-o|Untracked|غير المتتبعة¶--others --exclude-standard|Untracked (clean)|غير متتبعة (منظف)
#Branches|الفروع
1§List branches§عرض الفروع§git branch {*}§-a|All|الكل¶-r|Remote|البعيدة¶-vv|Verbose + tracking|تفصيل وتتبع¶--merged|Merged|المدموجة¶--no-merged|Not merged|غير المدموجة¶--sort=-committerdate|Newest first|الأحدث أولاً
1§Create & switch branch§إنشاء فرع والانتقال§git switch {*} {branch=feature/x}§-c|Create|إنشاء¶--track|Track remote|تتبع البعيد¶-|Previous branch|الفرع السابق
2§Checkout (legacy)§checkout القديم§git checkout {*} {ref=main}§-b|New branch|فرع جديد¶--|Files from index|ملفات من الفهرس
1§Rename branch§إعادة تسمية فرع§git branch -m {old=old} {new=new}
1§Delete branch§حذف فرع§git branch {mode=@-d,-D} {branch}
2§Delete remote branch§حذف فرع بعيد§git push {remote=origin} --delete {branch}
2§Set upstream§ضبط التتبع§git branch --set-upstream-to={remote=origin}/{branch=main}
#Merge & rebase|الدمج وإعادة التأسيس
1§Merge branch§دمج فرع§git merge {*} {branch=feature/x}§--no-ff|Always create merge commit|دائماً commit دمج¶--squash|Squash|ضغط¶--ff-only|Fast-forward only|تقديم سريع فقط¶--abort|Abort|إلغاء¶-m '{msg=merge}'|Message|الرسالة¶-X theirs|Prefer theirs|تفضيل الطرف الآخر¶-X ours|Prefer ours|تفضيل الحالي
2§Rebase§إعادة التأسيس§git rebase {*} {onto=main}§-i|Interactive|تفاعلي¶--continue|Continue|متابعة¶--abort|Abort|إلغاء¶--skip|Skip|تخطي¶--autosquash|Autosquash|دمج تلقائي¶--onto {newbase=main}|Onto|على قاعدة جديدة¶--rebase-merges|Keep merges|إبقاء الدمج
2§Interactive rebase last N§rebase تفاعلي لآخر N§git rebase -i HEAD~{n=5}
2§Cherry-pick§اختيار commit§git cherry-pick {*} {commit}§-x|Add source note|إضافة مصدر¶-n|No commit|بدون commit¶--continue|Continue|متابعة¶--abort|Abort|إلغاء
2§Resolve conflicts (list)§الصراعات§git diff --name-only --diff-filter=U
2§Merge tool§أداة الدمج§git mergetool {*}§--tool={tool=vimdiff}|Tool|الأداة
#Remotes & sync|المستودعات البعيدة
1§List remotes§عرض البعيد§git remote -v
1§Add remote§إضافة بعيد§git remote add {name=origin} {url=https://github.com/user/repo.git}
2§Change remote URL§تغيير رابط البعيد§git remote set-url {name=origin} {url}
2§Remove remote§حذف بعيد§git remote remove {name=origin}
1§Fetch§جلب§git fetch {*} {remote?}§--all|All remotes|كل البعيد¶--prune|Prune|تنظيف¶--tags|Tags|الوسوم¶--depth={n=1}|Shallow|سطحي
1§Pull§سحب§git pull {*} {remote?} {branch?}§--rebase|Rebase|إعادة تأسيس¶--ff-only|Fast-forward only|تقديم سريع فقط¶--no-rebase|Merge|دمج¶--autostash|Autostash|stash تلقائي
1§Push§رفع§git push {*} {remote=origin} {branch=main}§-u|Set upstream|ضبط التتبع¶--force-with-lease|Safe force|إجبار آمن¶--force|Force|إجبار¶--tags|Tags|الوسوم¶--all|All branches|كل الفروع¶--delete|Delete|حذف¶--dry-run|Dry run|تجربة¶--no-verify|Skip hooks|تجاوز الـ hooks
2§Remote branches info§معلومات فروع بعيدة§git ls-remote {*} {remote=origin}§--heads|Branches|الفروع¶--tags|Tags|الوسوم
#Stash|الإخفاء المؤقت
1§Stash changes§إخفاء التغييرات§git stash push {*}§-m '{msg=wip}'|Message|الرسالة¶-u|Include untracked|مع غير المتتبعة¶-a|Include ignored|مع المتجاهلة¶-p|Interactive|تفاعلي
1§Stash list§قائمة المخبأ§git stash list
1§Apply / pop stash§تطبيق المخبأ§git stash {mode=@pop,apply,drop,show -p,branch newbranch,clear} {ref?}
#Undo|التراجع
1§Reset§إعادة الضبط§git reset {*} {ref=HEAD~1}§--soft|Keep staged|إبقاء المجهز¶--mixed|Keep working tree|إبقاء الملفات¶--hard|Discard all|تجاهل كل شيء
2§Revert commit§عكس commit§git revert {*} {commit=HEAD}§--no-edit|Keep message|إبقاء الرسالة¶-n|No commit|بدون commit¶-m 1|Merge parent 1|والد الدمج 1
2§Clean untracked§تنظيف غير المتتبع§git clean {*}§-n|Dry run|تجربة¶-f|Force|إجبار¶-d|Directories|المجلدات¶-x|Ignored too|مع المتجاهل
3§Find bad commit (bisect)§البحث عن commit معيب§git bisect {mode=@start,good,bad,reset,skip,run ./test.sh,log} {ref?}
3§Recover lost commit§استرجاع commit مفقود§git reflog && git branch recover {commit=abc1234}
3§Remove file from all history§حذف ملف من كل التاريخ§git filter-repo --invert-paths --path {path=secret.txt}
#Tags|الوسوم
1§List tags§عرض الوسوم§git tag {*}§-l '{pattern=v1.*}'|Pattern|نمط¶-n|With messages|مع الرسائل¶--sort=-v:refname|Version sort|ترتيب الإصدارات
1§Create tag§إنشاء وسم§git tag {*} {tag=v1.0.0} {commit?}§-a|Annotated|موصوف¶-m '{msg=release}'|Message|الرسالة¶-s|Signed|موقّع¶-f|Force|إجبار
1§Delete tag§حذف وسم§git tag -d {tag}
2§Push tag(s)§رفع الوسوم§git push {remote=origin} {what=@--tags,v1.0.0}
#Advanced|متقدم
3§Submodule§submodule§git submodule {mode=@update --init --recursive,add,status,sync,foreach git pull} {url?}
3§Worktree§worktree§git worktree {mode=@list,add ../wt,remove ../wt,prune} {branch?}
3§Archive§أرشفة§git archive --format={fmt=@tar.gz,zip} -o {out=release.tar.gz} {ref=HEAD}
3§Garbage collect§تنظيف المستودع§git gc {*}§--aggressive|Aggressive|مكثف¶--prune=now|Prune now|حذف فوري
3§Verify integrity§فحص السلامة§git fsck {*}§--full|Full|كامل¶--lost-found|Lost & found|المفقود
3§Repo size§حجم المستودع§git count-objects -vH
3§LFS track§تتبع LFS§git lfs {mode=@install,track '*.psd',ls-files,pull,status}
3§Sparse checkout§checkout جزئي§git sparse-checkout {mode=@init --cone,set src,list,disable}
3§Hooks directory§مجلد الـ hooks§ls .git/hooks && chmod +x .git/hooks/{hook=pre-commit}
3§Ignore file patterns§ملف التجاهل§echo '{pattern=node_modules/}' >> .gitignore
3§Untrack ignored files§إيقاف تتبع المتجاهل§git rm -r --cached . && git add . && git commit -m 'untrack ignored files'
`);

T(["docker","🐳","Docker|Docker","Containers, images, networks, volumes, Compose, Swarm and registry|الحاويات والصور والشبكات والـ volumes و Compose و Swarm والـ registry","cont","all",[["Install Docker Engine","تثبيت Docker Engine","sudo apt update && sudo apt install -y ca-certificates curl gnupg && curl -fsSL https://get.docker.com | sudo sh","sudo dnf install -y dnf-plugins-core && sudo dnf config-manager --add-repo https://download.docker.com/linux/rhel/docker-ce.repo && sudo dnf install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin"],["Start + enable","تشغيل وتفعيل","sudo systemctl enable --now docker","sudo systemctl enable --now docker"],["Run without sudo","التشغيل بدون sudo","sudo usermod -aG docker $USER && newgrp docker","sudo usermod -aG docker $USER && newgrp docker"],["Verify","التحقق","docker --version && docker compose version && docker run --rm hello-world","docker --version && docker compose version && docker run --rm hello-world"]]],`
#Run containers|تشغيل الحاويات
1§Run a container§تشغيل حاوية§docker run {*} {image=nginx:latest} {cmd?}§-d|Detached (background)|في الخلفية¶-it|Interactive TTY|تفاعلي مع طرفية¶--rm|Remove on exit|حذف عند الخروج¶--name {name=web}|Container name|اسم الحاوية¶-p {ports=8080:80}|Publish port host:container|نشر منفذ¶-P|Publish all exposed|نشر كل المنافذ¶-v {volume=mydata:/data}|Volume / bind mount|volume أو مجلد¶-e {env=KEY=value}|Environment variable|متغير بيئة¶--env-file {envfile=.env}|Env file|ملف متغيرات¶--network {network=bridge}|Network|الشبكة¶--restart {policy=@no,always,unless-stopped,on-failure}|Restart policy|سياسة إعادة التشغيل¶--memory {mem=512m}|Memory limit|حد الذاكرة¶--cpus {cpus=1.5}|CPU limit|حد المعالج¶-u {user=1000:1000}|Run as user|المستخدم¶-w {workdir=/app}|Working dir|مجلد العمل¶--entrypoint {entry=/bin/sh}|Override entrypoint|تغيير نقطة الدخول¶--hostname {hostname=web01}|Hostname|اسم المضيف¶--privileged|Privileged|صلاحيات كاملة¶--cap-add {cap=NET_ADMIN}|Add capability|إضافة capability¶--cap-drop {cap=ALL}|Drop capability|حذف capability¶--read-only|Read-only rootfs|نظام قراءة فقط¶--add-host {host=db:10.0.0.5}|Add hosts entry|إضافة مدخل hosts¶--dns {dns=8.8.8.8}|DNS server|خادم DNS¶--pull {pull=@always,missing,never}|Pull policy|سياسة السحب¶--platform {platform=linux/amd64}|Platform|المنصة¶--gpus all|All GPUs|كل كروت GPU¶-l {label=app=web}|Label|وسم¶--health-cmd '{hcmd=curl -f http://localhost/}'|Health check|فحص الصحة¶--log-driver {driver=json-file}|Log driver|مشغل السجلات¶--init|Use init|استخدام init¶--shm-size {shm=1g}|Shared memory|الذاكرة المشتركة¶--tmpfs {tmpfs=/tmp}|tmpfs mount|tmpfs¶--ulimit nofile={n=65535}|Open files limit|حد الملفات¶--ip {ip=172.18.0.10}|Static IP|IP ثابت¶--pid host|Host PID ns|PID المضيف
1§Create without starting§إنشاء بدون تشغيل§docker create {*} {image=nginx}§--name {name=web}|Name|الاسم¶-p {ports=8080:80}|Port|المنفذ¶-v {volume=mydata:/data}|Volume|الـ volume
1§Quick throwaway shell§شل مؤقت§docker run --rm -it {image=alpine} {shell=@sh,bash}
#Manage containers|إدارة الحاويات
1§List containers§عرض الحاويات§docker ps {*}§-a|All (incl. stopped)|الكل مع المتوقفة¶-q|IDs only|المعرفات فقط¶-s|Show sizes|إظهار الأحجام¶-l|Latest|الأحدث¶-n {n=5}|Last N|آخر N¶--no-trunc|Full IDs|معرفات كاملة¶--filter {filter=status=exited}|Filter|تصفية¶--format '{{.Names}}\\t{{.Status}}\\t{{.Ports}}'|Format|صيغة
1§Start container§تشغيل حاوية§docker start {*} {name=web}§-a|Attach|ربط¶-i|Interactive|تفاعلي
1§Stop container§إيقاف حاوية§docker stop {*} {name=web}§-t {secs=10}|Timeout|المهلة
1§Restart container§إعادة تشغيل§docker restart {*} {name=web}§-t {secs=10}|Timeout|المهلة
2§Pause / unpause§إيقاف مؤقت§docker {mode=@pause,unpause} {name=web}
2§Kill container§قتل حاوية§docker kill {*} {name=web}§-s {signal=SIGKILL}|Signal|الإشارة
1§Remove container§حذف حاوية§docker rm {*} {name=web}§-f|Force|إجبار¶-v|With volumes|مع الـ volumes¶-l {link=link}|Remove link|حذف الرابط
2§Rename container§إعادة تسمية§docker rename {old=web} {new=web2}
2§Update limits§تحديث الحدود§docker update {*} {name=web}§--memory {mem=1g}|Memory|الذاكرة¶--cpus {cpus=2}|CPUs|المعالج¶--restart {policy=@always,no,unless-stopped,on-failure}|Restart policy|إعادة التشغيل
2§Wait for exit§انتظار الخروج§docker wait {name=web}
2§Attach to running§الاتصال بحاوية§docker attach {*} {name=web}§--no-stdin|No stdin|بدون إدخال¶--sig-proxy=false|No signal proxy|بدون تمرير الإشارات
1§Execute in container§تنفيذ داخل حاوية§docker exec {*} {name=web} {cmd=sh}§-it|Interactive TTY|تفاعلي¶-u {user=root}|User|المستخدم¶-w {workdir=/app}|Working dir|مجلد العمل¶-e {env=KEY=value}|Env var|متغير¶-d|Detached|في الخلفية¶--privileged|Privileged|صلاحيات كاملة
1§Container logs§سجلات الحاوية§docker logs {*} {name=web}§-f|Follow|متابعة¶--tail {n=100}|Last N lines|آخر N سطر¶--since {since=10m}|Since|منذ¶--until {until=5m}|Until|حتى¶-t|Timestamps|الوقت¶--details|Details|تفاصيل
1§Live resource usage§استهلاك الموارد§docker stats {*} {name?}§--no-stream|One snapshot|لقطة واحدة¶-a|All|الكل¶--format 'table {{.Name}}\\t{{.CPUPerc}}\\t{{.MemUsage}}'|Format|صيغة
2§Processes in container§عمليات الحاوية§docker top {name=web}
2§Port mappings§المنافذ§docker port {name=web} {port?}
1§Inspect§فحص§docker inspect {*} {name=web}§-f '{{.State.Status}}'|State|الحالة¶-f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}'|IP address|عنوان IP¶-f '{{json .Config.Env}}'|Env as JSON|المتغيرات JSON¶-f '{{.HostConfig.RestartPolicy.Name}}'|Restart policy|سياسة الإعادة¶--type {type=container}|Object type|نوع الكائن¶-s|Sizes|الأحجام
2§Filesystem changes§تغييرات الملفات§docker diff {name=web}
1§Copy files§نسخ الملفات§docker cp {src=./file.txt} {name=web}:{dst=/tmp/}
2§Copy files out§نسخ ملفات للخارج§docker cp {name=web}:{src=/etc/nginx/nginx.conf} {dst=.}
2§Commit container to image§حفظ الحاوية كصورة§docker commit {*} {name=web} {image=myimage:v1}§-m '{msg=changes}'|Message|الرسالة¶-a '{author=me}'|Author|المؤلف¶-p|Pause during commit|إيقاف أثناء الحفظ
2§Export / import filesystem§تصدير / استيراد§docker export {name=web} -o {file=web.tar}
2§Events stream§أحداث Docker§docker events {*}§--since {since=1h}|Since|منذ¶--filter {filter=type=container}|Filter|تصفية
1§Remove stopped containers§حذف المتوقفة§docker container prune {*}§-f|No prompt|بدون سؤال¶--filter {filter=until=24h}|Filter|تصفية
#Images|الصور
1§List images§عرض الصور§docker images {*} {name?}§-a|All|الكل¶-q|IDs only|المعرفات فقط¶--digests|Digests|البصمات¶--filter dangling=true|Dangling|المعلقة¶--format '{{.Repository}}:{{.Tag}} {{.Size}}'|Format|صيغة
1§Pull image§تحميل صورة§docker pull {*} {image=nginx:latest}§-a|All tags|كل الوسوم¶--platform {platform=linux/arm64}|Platform|المنصة¶-q|Quiet|صامت
1§Push image§رفع صورة§docker push {*} {image=registry.example.com/app:1.0}§-a|All tags|كل الوسوم
1§Tag image§وسم صورة§docker tag {src=app:latest} {dst=registry.example.com/app:1.0}
1§Build image§بناء صورة§docker build {*} {context=.}§-t {tag=app:1.0}|Tag|الوسم¶-f {file=Dockerfile}|Dockerfile|ملف Dockerfile¶--build-arg {arg=VER=1.0}|Build arg|وسيط بناء¶--target {stage=prod}|Target stage|مرحلة محددة¶--no-cache|No cache|بدون كاش¶--pull|Always pull base|سحب القاعدة دائماً¶--platform {platform=linux/amd64}|Platform|المنصة¶--progress=plain|Plain output|إخراج نصي¶--label {label=version=1.0}|Label|وسم¶-q|Quiet|صامت¶--network {network=host}|Build network|شبكة البناء¶--secret id={id=mysecret},src={src=secret.txt}|Secret|سر¶--squash|Squash|ضغط الطبقات
2§Build multi-arch & push§بناء متعدد المعماريات§docker buildx build --platform {platforms=linux/amd64,linux/arm64} -t {tag=registry/app:1.0} {*} {context=.}§--push|Push|رفع¶--load|Load locally|تحميل محلياً¶--cache-from type=registry,ref={ref=registry/app:cache}|Cache from|كاش من
2§Create buildx builder§إنشاء builder§docker buildx create --name {name=mybuilder} --use
2§Image history§تاريخ الصورة§docker history {*} {image=nginx}§--no-trunc|Full|كامل¶-H|Human|مقروء
1§Remove image§حذف صورة§docker rmi {*} {image}§-f|Force|إجبار¶--no-prune|Keep untagged|إبقاء غير الموسومة
1§Prune images§تنظيف الصور§docker image prune {*}§-a|All unused|كل غير المستخدم¶-f|No prompt|بدون سؤال¶--filter {filter=until=24h}|Filter|تصفية
2§Save image to tar§حفظ صورة في ملف§docker save -o {file=image.tar} {image=nginx}
2§Load image from tar§تحميل صورة من ملف§docker load -i {file=image.tar}
2§Import from tarball§استيراد من أرشيف§docker import {file=rootfs.tar} {image=myimage:v1}
1§Search Docker Hub§بحث في Docker Hub§docker search {*} {term=nginx}§--limit {n=10}|Limit|الحد¶--filter is-official=true|Official only|الرسمية فقط¶--filter stars={stars=100}|Min stars|أدنى نجوم
2§Scan image vulnerabilities§فحص ثغرات الصورة§docker scout cves {image=nginx:latest}
#Networks|الشبكات
1§List networks§عرض الشبكات§docker network ls {*}§--filter driver=bridge|Bridge|bridge¶--no-trunc|Full IDs|معرفات كاملة
1§Create network§إنشاء شبكة§docker network create {*} {name=mynet}§-d {driver=@bridge,overlay,macvlan,host}|Driver|المشغل¶--subnet {subnet=172.20.0.0/16}|Subnet|الشبكة الفرعية¶--gateway {gw=172.20.0.1}|Gateway|البوابة¶--ip-range {range=172.20.240.0/20}|IP range|نطاق IP¶--internal|Internal only|داخلية فقط¶--attachable|Attachable|قابلة للربط¶--ipv6|IPv6|IPv6
1§Inspect network§فحص شبكة§docker network inspect {name=bridge}
1§Connect container§ربط حاوية بشبكة§docker network connect {*} {network=mynet} {name=web}§--ip {ip=172.20.0.10}|Static IP|IP ثابت¶--alias {alias=db}|Alias|اسم بديل
1§Disconnect container§فصل حاوية§docker network disconnect {network=mynet} {name=web}
1§Remove / prune networks§حذف الشبكات§docker network {mode=@rm,prune -f} {name?}
#Volumes|الـ Volumes
1§List volumes§عرض الـ volumes§docker volume ls {*}§-q|Names only|الأسماء فقط¶--filter dangling=true|Unused|غير المستخدمة
1§Create volume§إنشاء volume§docker volume create {*} {name=mydata}§--driver {driver=local}|Driver|المشغل¶--label {label=env=prod}|Label|وسم¶-o type=nfs -o o=addr={addr=10.0.0.5},rw -o device=:{export=/srv/share}|NFS volume|volume على NFS
1§Inspect volume§فحص volume§docker volume inspect {name=mydata}
1§Remove volume§حذف volume§docker volume rm {*} {name}§-f|Force|إجبار
1§Prune volumes§تنظيف الـ volumes§docker volume prune {*}§-f|No prompt|بدون سؤال¶-a|All unused|كل غير المستخدم
2§Backup volume to tar§نسخ احتياطي لـ volume§docker run --rm -v {volume=mydata}:/data -v $PWD:/backup alpine tar czf /backup/{file=mydata.tar.gz} -C /data .
2§Restore volume from tar§استرجاع volume§docker run --rm -v {volume=mydata}:/data -v $PWD:/backup alpine tar xzf /backup/{file=mydata.tar.gz} -C /data
#System & registry|النظام والـ registry
1§Docker info§معلومات Docker§docker info
1§Docker version§إصدار Docker§docker version {*}§--format '{{.Server.Version}}'|Server version|إصدار الخادم
1§Disk usage§استهلاك المساحة§docker system df {*}§-v|Verbose|تفصيل
1§System prune§تنظيف النظام§docker system prune {*}§-a|All unused images|كل الصور غير المستخدمة¶--volumes|Include volumes|مع الـ volumes¶-f|No prompt|بدون سؤال¶--filter {filter=until=72h}|Filter|تصفية
1§Login to registry§تسجيل الدخول§docker login {*} {registry?}§-u {user=myuser}|Username|المستخدم¶-p {password=secret}|Password (insecure)|كلمة المرور (غير آمن)¶--password-stdin|Password from stdin|كلمة المرور من stdin
1§Logout§تسجيل الخروج§docker logout {registry?}
2§Contexts (remote hosts)§السياقات (أجهزة بعيدة)§docker context {mode=@ls,create remote --docker host=ssh://user@host,use remote,rm remote,inspect}
2§Daemon config§إعداد الـ daemon§nano /etc/docker/daemon.json && systemctl restart docker
2§Run private registry§تشغيل registry خاص§docker run -d -p {port=5000}:5000 --restart=always --name registry {*} registry:2§-v registry-data:/var/lib/registry|Persist data|حفظ البيانات
2§Rootless setup§تثبيت rootless§dockerd-rootless-setuptool.sh install
#Docker Compose|Docker Compose
1§Compose up§تشغيل Compose§docker compose {cf?} up {*} {svc?}§-d|Detached|في الخلفية¶--build|Rebuild images|إعادة بناء الصور¶--force-recreate|Force recreate|إعادة إنشاء إجبارية¶--no-deps|No dependencies|بدون اعتماديات¶--scale {svc=web}={n=3}|Scale|تكبير العدد¶--remove-orphans|Remove orphans|حذف اليتيمة¶--pull {pull=@always,missing,never}|Pull policy|سياسة السحب¶--wait|Wait healthy|انتظار الصحة¶--profile {profile=dev}|Profile|بروفايل¶--abort-on-container-exit|Stop all on exit|إيقاف الكل عند الخروج
1§Compose down§إيقاف Compose§docker compose {cf?} down {*}§-v|Remove volumes|حذف الـ volumes¶--rmi {what=@all,local}|Remove images|حذف الصور¶--remove-orphans|Remove orphans|حذف اليتيمة¶-t {secs=10}|Timeout|المهلة
1§Compose status§حالة الخدمات§docker compose {cf?} ps {*}§-a|All|الكل¶--services|Names only|الأسماء فقط¶--format json|JSON|JSON
1§Compose logs§سجلات Compose§docker compose {cf?} logs {*} {svc?}§-f|Follow|متابعة¶--tail {n=100}|Last N|آخر N¶-t|Timestamps|الوقت¶--since {since=10m}|Since|منذ
1§Compose exec§تنفيذ في خدمة§docker compose {cf?} exec {*} {svc=web} {cmd=sh}§-u {user=root}|User|المستخدم¶-e {env=KEY=value}|Env|متغير¶-T|No TTY|بدون طرفية
2§Compose run one-off§تشغيل مؤقت§docker compose {cf?} run {*} {svc=web} {cmd?}§--rm|Remove after|حذف بعد التنفيذ¶-e {env=KEY=value}|Env|متغير¶--no-deps|No deps|بدون اعتماديات¶--service-ports|Publish ports|نشر المنافذ¶-d|Detached|في الخلفية
1§Compose build§بناء Compose§docker compose {cf?} build {*} {svc?}§--no-cache|No cache|بدون كاش¶--pull|Pull base|سحب القاعدة¶--build-arg {arg=VER=1}|Build arg|وسيط بناء
1§Compose pull / push§سحب / رفع§docker compose {cf?} {mode=@pull,push} {svc?}
1§Start / stop / restart§تشغيل / إيقاف / إعادة§docker compose {cf?} {mode=@start,stop,restart,pause,unpause,kill} {svc?}
2§Validate & show config§فحص وعرض الإعداد§docker compose {cf?} config {*}§-q|Validate only|فحص فقط¶--services|Services|الخدمات¶--volumes|Volumes|الـ volumes¶--images|Images|الصور
2§List projects§قائمة المشاريع§docker compose ls {*}§-a|All|الكل
2§Copy files§نسخ ملفات§docker compose {cf?} cp {src=web:/app/file} {dst=.}
2§Images / top§الصور / العمليات§docker compose {cf?} {mode=@images,top,port web 80,events}
2§Remove stopped§حذف المتوقفة§docker compose {cf?} rm {*} {svc?}§-f|Force|إجبار¶-v|With volumes|مع الـ volumes¶-s|Stop first|إيقاف أولاً
3§Watch for changes§مراقبة التغييرات§docker compose {cf?} watch
#Swarm|Swarm
2§Init swarm§بدء Swarm§docker swarm init {*}§--advertise-addr {ip=192.168.1.10}|Advertise address|عنوان الإعلان
2§Join token§توكن الانضمام§docker swarm join-token {role=@worker,manager}
2§Join swarm§الانضمام لـ Swarm§docker swarm join --token {token} {host=192.168.1.10}:2377
2§Leave swarm§مغادرة Swarm§docker swarm leave {*}§--force|Force|إجبار
2§List nodes§عرض العقد§docker node {mode=@ls,inspect self,promote node1,demote node1,rm node1} {*}§--pretty|Pretty|منسق
2§Create service§إنشاء خدمة§docker service create {*} {image=nginx}§--name {name=web}|Name|الاسم¶--replicas {n=3}|Replicas|النسخ¶-p {ports=80:80}|Publish|نشر منفذ¶--network {network=mynet}|Network|الشبكة¶--mount type=volume,src={vol=data},dst={dst=/data}|Mount|ربط¶-e {env=KEY=value}|Env|متغير¶--constraint 'node.role==worker'|Worker nodes only|عقد worker فقط¶--limit-memory {mem=256M}|Memory limit|حد الذاكرة¶--update-delay {delay=10s}|Update delay|فاصل التحديث¶--secret {secret=db_pw}|Secret|سر¶--mode global|Global mode|وضع global
2§Services overview§عرض الخدمات§docker service {mode=@ls,ps web,inspect --pretty web,logs -f web}
2§Scale service§تغيير عدد النسخ§docker service scale {svc=web}={n=5}
2§Update service§تحديث خدمة§docker service update {*} {svc=web}§--image {image=nginx:1.27}|New image|صورة جديدة¶--replicas {n=3}|Replicas|النسخ¶--force|Force rolling restart|إعادة تشغيل إجبارية¶--env-add {env=KEY=value}|Add env|إضافة متغير¶--rollback|Rollback|تراجع
2§Remove service§حذف خدمة§docker service rm {svc=web}
2§Deploy stack§نشر Stack§docker stack deploy {*} -c {file=stack.yml} {stack=mystack}§--with-registry-auth|Registry auth|مصادقة registry¶--prune|Prune|حذف القديم
2§Stack commands§أوامر Stack§docker stack {mode=@ls,ps mystack,services mystack,rm mystack}
2§Secrets & configs§الأسرار والإعدادات§docker {mode=@secret ls,secret create db_pw -,config ls,config create app_conf ./app.conf}
`);

T(["podman","🦭","Podman · Buildah · Skopeo|Podman و Buildah و Skopeo","Daemonless containers (default on RedHat), pods, Quadlet, image tools|حاويات بدون daemon (الافتراضي في ريدهات) والـ pods و Quadlet وأدوات الصور","cont","all",[["Install","التثبيت","sudo apt install -y podman buildah skopeo podman-compose","sudo dnf install -y podman buildah skopeo podman-compose"],["Rootless prerequisites","متطلبات rootless","sudo apt install -y uidmap slirp4netns fuse-overlayfs","sudo dnf install -y shadow-utils slirp4netns fuse-overlayfs"]]],`
#Containers|الحاويات
1§Run container§تشغيل حاوية§podman run {*} {image=docker.io/library/nginx}§-d|Detached|في الخلفية¶-it|Interactive|تفاعلي¶--rm|Remove on exit|حذف عند الخروج¶--name {name=web}|Name|الاسم¶-p {ports=8080:80}|Publish port|نشر منفذ¶-v {volume=./data:/data:Z}|Volume (:Z relabels SELinux)|volume (:Z لـ SELinux)¶-e {env=KEY=value}|Env|متغير¶--pod {pod=mypod}|Join pod|الانضمام لـ pod¶--network {network=podman}|Network|الشبكة¶--restart {policy=@always,no,on-failure,unless-stopped}|Restart policy|إعادة التشغيل¶--userns=keep-id|Keep UID|إبقاء UID¶--security-opt label=disable|Disable SELinux label|تعطيل وسم SELinux¶--memory {mem=512m}|Memory|الذاكرة¶--cpus {cpus=1}|CPUs|المعالج
1§List containers§عرض الحاويات§podman ps {*}§-a|All|الكل¶-q|IDs only|المعرفات فقط¶--format '{{.Names}} {{.Status}}'|Format|صيغة¶--pod|Show pods|إظهار الـ pods
1§Start / stop / restart / rm§تشغيل / إيقاف / حذف§podman {mode=@start,stop,restart,rm,rm -f,kill,pause,unpause} {name=web}
1§Exec in container§تنفيذ داخل حاوية§podman exec {*} {name=web} {cmd=sh}§-it|Interactive|تفاعلي¶-u {user=root}|User|المستخدم
1§Container logs§سجلات§podman logs {*} {name=web}§-f|Follow|متابعة¶--tail {n=100}|Last N|آخر N¶-t|Timestamps|الوقت
2§Inspect / stats / top§فحص / استهلاك§podman {mode=@inspect,stats --no-stream,top,port} {name=web}
2§Copy files§نسخ ملفات§podman cp {src=./file} {name=web}:{dst=/tmp/}
2§Run as user systemd service§تشغيل كخدمة systemd§podman generate systemd --new --files --name {name=web}
#Pods & Kubernetes YAML|الـ Pods و YAML
2§Create pod§إنشاء pod§podman pod create {*} --name {pod=mypod}§-p {ports=8080:80}|Publish port|نشر منفذ¶--network {network=podman}|Network|الشبكة
2§Manage pods§إدارة الـ pods§podman pod {mode=@ls,ps,start,stop,restart,rm -f,inspect} {pod=mypod}
2§Export to Kubernetes YAML§تصدير YAML لـ Kubernetes§podman generate kube {*} {name=web}§-s|Include Service|مع Service¶> {file=web.yaml}|Save to file|حفظ في ملف
2§Play Kubernetes YAML§تشغيل YAML§podman kube play {*} {file=web.yaml}§--down|Tear down|إيقاف وحذف¶--build|Build images|بناء الصور¶--replace|Replace existing|استبدال
#Images|الصور
1§List / pull / push§عرض / سحب / رفع§podman {mode=@images,pull,push,rmi,tag,history,inspect,search} {image=nginx}
1§Build image§بناء صورة§podman build {*} {context=.}§-t {tag=app:1.0}|Tag|الوسم¶-f {file=Containerfile}|File|الملف¶--no-cache|No cache|بدون كاش¶--platform {platform=linux/amd64}|Platform|المنصة¶--build-arg {arg=VER=1}|Build arg|وسيط بناء
1§Login§تسجيل الدخول§podman login {*} {registry=quay.io}§-u {user}|User|المستخدم¶--tls-verify=false|Skip TLS|تجاهل TLS
2§Prune§تنظيف§podman system prune {*}§-a|All|الكل¶--volumes|Volumes|الـ volumes¶-f|No prompt|بدون سؤال
2§Save / load§حفظ / تحميل§podman {mode=@save -o image.tar,load -i image.tar} {image?}
2§Volumes & networks§الـ volumes والشبكات§podman {mode=@volume ls,volume create data,network ls,network create mynet,secret ls}
#Skopeo & Buildah|Skopeo و Buildah
2§Inspect remote image§فحص صورة بعيدة§skopeo inspect {*} docker://{image=docker.io/library/nginx:latest}§--raw|Raw manifest|manifest خام¶--config|Config|الإعدادات
2§Copy between registries§نسخ بين الـ registries§skopeo copy {*} docker://{src=docker.io/library/nginx:latest} docker://{dst=registry.example.com/nginx:latest}§--all|All architectures|كل المعماريات¶--src-creds {creds=user:pass}|Source creds|بيانات المصدر¶--dest-creds {creds=user:pass}|Dest creds|بيانات الوجهة¶--dest-tls-verify=false|No dest TLS|بدون TLS للوجهة
2§List tags§عرض الوسوم§skopeo list-tags docker://{image=docker.io/library/nginx}
3§Buildah from base§بناء بـ Buildah§c=$(buildah from {base=alpine}) && buildah run $c -- {cmd=apk add curl} && buildah commit $c {image=myimage:1.0}
3§Buildah mount§ربط ملفات الصورة§buildah mount {container}
#Quadlet (systemd)|Quadlet
3§Create Quadlet unit§إنشاء وحدة Quadlet§mkdir -p ~/.config/containers/systemd && printf '[Container]\\nImage={image=docker.io/library/nginx}\\nPublishPort={ports=8080:80}\\n[Install]\\nWantedBy=default.target\\n' > ~/.config/containers/systemd/{name=web}.container && systemctl --user daemon-reload && systemctl --user start {name}
3§Auto-update containers§تحديث تلقائي§podman auto-update {*}§--dry-run|Dry run|تجربة¶--rollback|Rollback|تراجع
3§Enable linger (user services)§تفعيل linger§loginctl enable-linger {user}
`);
