// صيغة السطر:  المستوى§English§عربي§القالب§الخيارات
// المستوى: 1 أساسي · 2 متوسط · 3 متقدم   |  {key} {key=default} {key?} {key=@a,b,c} {*}=مكان الخيارات
// الخيار: flag|English|عربي   (يفصل بين الخيارات ¶)
window.RAW=window.RAW||[];window.T=(m,t)=>RAW.push([m,t]);

T(["linux","🐧","Linux Core|أساسيات لينكس","Everyday shell commands: files, text, processes, archives, system info|أوامر الشل اليومية: الملفات والنصوص والعمليات والأرشفة ومعلومات النظام","sys","all",[]],`
#Files & directories|الملفات والمجلدات
1§List files§عرض الملفات§ls {*} {path?}§-l|Long listing|تفاصيل كاملة¶-a|Show hidden|إظهار المخفي¶-h|Human sizes|أحجام مقروءة¶-t|Sort by time|ترتيب بالوقت¶-S|Sort by size|ترتيب بالحجم¶-r|Reverse|عكس الترتيب¶-R|Recursive|متداخل¶-d|Directory itself|المجلد نفسه¶-i|Show inode|رقم inode¶-Z|SELinux context|سياق SELinux¶--color=auto|Colors|ألوان
1§Print working directory§المجلد الحالي§pwd {*}§-P|Physical path|المسار الفعلي
1§Change directory§تغيير المجلد§cd {path=~}
1§Make directory§إنشاء مجلد§mkdir {*} {dir=newdir}§-p|Create parents|إنشاء الآباء¶-m {mode=755}|Set mode|تحديد الصلاحيات¶-v|Verbose|تفصيل
1§Create empty file / update time§إنشاء ملف فارغ§touch {*} {file=file.txt}§-c|Do not create|لا تنشئ¶-a|Access time only|وقت الوصول فقط¶-m|Modify time only|وقت التعديل فقط¶-d {date=2026-01-01}|Set date|تحديد تاريخ
1§Copy§نسخ§cp {*} {src} {dst}§-r|Recursive|متداخل¶-a|Archive (preserve all)|أرشفة مع الحفاظ على كل شيء¶-v|Verbose|تفصيل¶-i|Prompt before overwrite|اسأل قبل الكتابة¶-n|Never overwrite|لا تكتب فوق¶-u|Only newer|الأحدث فقط¶-p|Preserve attrs|حفظ الخصائص¶--backup=numbered|Backup existing|نسخة احتياطية
1§Move / rename§نقل أو إعادة تسمية§mv {*} {src} {dst}§-i|Prompt|اسأل¶-n|No overwrite|لا تكتب فوق¶-v|Verbose|تفصيل¶-u|Only newer|الأحدث فقط¶-b|Backup|نسخة احتياطية
1§Remove files§حذف ملفات§rm {*} {path}§-r|Recursive|متداخل¶-f|Force|إجبار¶-i|Prompt|اسأل¶-v|Verbose|تفصيل¶-d|Remove empty dirs|حذف المجلدات الفارغة
1§Remove empty directory§حذف مجلد فارغ§rmdir {*} {dir}§-p|Remove parents|حذف الآباء¶-v|Verbose|تفصيل
2§Create link§إنشاء رابط§ln {*} {target} {link}§-s|Symbolic link|رابط رمزي¶-f|Force|إجبار¶-v|Verbose|تفصيل
1§Directory tree§شجرة المجلدات§tree {*} {path=.}§-L {depth=2}|Max depth|أقصى عمق¶-a|Show hidden|إظهار المخفي¶-d|Directories only|مجلدات فقط¶-h|Human sizes|أحجام مقروءة¶--du|Directory sizes|حجم المجلدات¶-I '{ignore=node_modules}'|Ignore pattern|تجاهل نمط
2§File status§حالة الملف§stat {*} {file}§-c '%A %U %s %y'|Custom format|صيغة مخصصة
2§Detect file type§معرفة نوع الملف§file {*} {file}§-i|MIME type|نوع MIME¶-b|Brief|مختصر
2§Resolve real path§المسار الحقيقي§realpath {*} {path}§-s|No symlink resolve|لا تحل الروابط
#Disk usage|استهلاك القرص
1§Free disk space§المساحة الفارغة§df {*}§-h|Human sizes|أحجام مقروءة¶-T|Show fs type|نوع النظام¶-i|Inodes|الـ inodes¶-x tmpfs|Exclude tmpfs|استبعاد tmpfs
1§Directory size§حجم مجلد§du {*} {path=.}§-h|Human sizes|أحجام مقروءة¶-s|Summary|ملخص¶-a|Include files|مع الملفات¶-c|Grand total|الإجمالي¶--max-depth={depth=1}|Depth|العمق¶-x|Stay on one fs|نظام ملفات واحد
2§Biggest items§أكبر العناصر§du -ah {path=.} 2>/dev/null | sort -rh | head -n {n=20}
2§Interactive disk usage§تحليل المساحة تفاعلياً§ncdu {*} {path=/}§-x|One filesystem|نظام ملفات واحد
#Search|البحث
1§Find files§البحث عن ملفات§find {path=.} {*}§-type f|Files only|ملفات فقط¶-type d|Dirs only|مجلدات فقط¶-name '{pattern=*.log}'|Name (case-sensitive)|الاسم¶-iname '{pattern=*.log}'|Name (ignore case)|الاسم بدون حساسية¶-size +{size=100M}|Larger than|أكبر من¶-mtime -{days=7}|Modified in last N days|عُدّل خلال أيام¶-mmin -{mins=60}|Modified in last N min|عُدّل خلال دقائق¶-user {user}|Owned by|المالك¶-perm {mode=644}|Permissions|الصلاحيات¶-maxdepth {depth=2}|Max depth|أقصى عمق¶-empty|Empty|فارغ¶-exec {cmd=ls -l} {} +|Run command|تنفيذ أمر¶-delete|Delete matches|حذف النتائج
1§Search text in files§البحث عن نص§grep {*} '{text}' {path=.}§-r|Recursive|متداخل¶-n|Line numbers|أرقام الأسطر¶-i|Ignore case|تجاهل الحالة¶-v|Invert match|عكس¶-w|Whole word|كلمة كاملة¶-l|Only file names|أسماء الملفات فقط¶-c|Count|عدّ¶-E|Extended regex|Regex موسع¶-A {n=2}|Lines after|أسطر بعد¶-B {n=2}|Lines before|أسطر قبل¶--include='{glob=*.conf}'|File pattern|نمط الملفات¶--color=auto|Colors|ألوان
2§Locate (indexed search)§بحث سريع بالفهرس§locate {*} {name}§-i|Ignore case|تجاهل الحالة¶-c|Count|عدّ¶-n {n=20}|Limit|حد النتائج
1§Where is a command§مكان أمر§which {*} {cmd=ls}§-a|All matches|كل النتائج
2§Command type§نوع الأمر§type {*} {cmd=ls}§-a|All|الكل
#View & edit text|عرض وتعديل النصوص
1§Print file§عرض ملف§cat {*} {file}§-n|Number lines|ترقيم الأسطر¶-A|Show all chars|إظهار كل الرموز¶-s|Squeeze blank lines|دمج الأسطر الفارغة
1§Page through file§تصفح ملف§less {*} {file}§-N|Line numbers|ترقيم¶-S|No wrap|بدون التفاف¶-R|Raw colors|ألوان خام¶+F|Follow|متابعة
1§First lines§أول الأسطر§head {*} {file}§-n {n=10}|Lines|عدد الأسطر¶-c {bytes=100}|Bytes|بايتات
1§Last lines / follow§آخر الأسطر / متابعة§tail {*} {file}§-n {n=50}|Lines|عدد الأسطر¶-f|Follow|متابعة حية¶-F|Follow + retry|متابعة مع إعادة المحاولة¶-c {bytes=100}|Bytes|بايتات
1§Count lines/words§عدّ الأسطر والكلمات§wc {*} {file}§-l|Lines|أسطر¶-w|Words|كلمات¶-c|Bytes|بايتات¶-m|Chars|حروف
2§Sort§ترتيب§sort {*} {file}§-r|Reverse|عكس¶-n|Numeric|رقمي¶-h|Human numbers|أرقام مقروءة¶-u|Unique|فريد¶-k {col=1}|By column|حسب عمود¶-t '{sep=:}'|Separator|الفاصل
2§Unique lines§إزالة التكرار§sort {file} | uniq {*}§-c|Count|عدّ¶-d|Only duplicates|المكرر فقط¶-u|Only unique|الفريد فقط
2§Cut columns§قص أعمدة§cut {*} {file}§-d '{sep=:}'|Delimiter|الفاصل¶-f {fields=1}|Fields|الحقول¶-c {chars=1-10}|Characters|الحروف
2§Translate / delete chars§تحويل حروف§tr {*} '{from=a-z}' '{to=A-Z}'§-d|Delete|حذف¶-s|Squeeze repeats|دمج المكرر¶-c|Complement|عكس المجموعة
2§Stream edit (sed)§تعديل نصوص (sed)§sed {*} '{expr=s/old/new/g}' {file}§-i|Edit in place|تعديل الملف نفسه¶-n|Quiet|صامت¶-E|Extended regex|Regex موسع¶-i.bak|In place with backup|تعديل مع نسخة احتياطية
2§Column extract (awk)§استخراج أعمدة (awk)§awk {*} '{print $1}' {file}§-F '{sep=:}'|Field separator|الفاصل
3§Run command per line (xargs)§تنفيذ أمر لكل سطر§xargs {*} {cmd=echo}§-n {n=1}|Args per run|عدد الوسائط¶-P {jobs=4}|Parallel jobs|عمليات متوازية¶-I {}|Replace string|رمز الاستبدال¶-r|Skip if empty|تخطّى إن فارغ¶-0|NUL separated|مفصول بـ NUL
2§Tee (write + show)§كتابة وعرض§{cmd=ls} | tee {*} {file=out.txt}§-a|Append|إلحاق
2§Compare files§مقارنة ملفات§diff {*} {a} {b}§-u|Unified|موحد¶-r|Recursive|متداخل¶-q|Brief|مختصر¶-y|Side by side|جنباً لجنب¶--color=auto|Colors|ألوان
2§JSON processor§معالجة JSON§jq {*} '{filter=.}' {file}§-r|Raw output|إخراج خام¶-c|Compact|مضغوط¶-S|Sort keys|ترتيب المفاتيح
2§Format as columns§تنسيق أعمدة§column {*} {file}§-t|Table|جدول¶-s '{sep=,}'|Separator|الفاصل
#Permissions & ownership|الصلاحيات والملكية
1§Change permissions§تغيير الصلاحيات§chmod {*} {mode=644} {path}§-R|Recursive|متداخل¶-v|Verbose|تفصيل¶-c|Report changes|إظهار التغيير
1§Change owner§تغيير المالك§chown {*} {owner=user:group} {path}§-R|Recursive|متداخل¶-v|Verbose|تفصيل¶-h|Affect symlink|الرابط نفسه
2§Change group§تغيير المجموعة§chgrp {*} {group} {path}§-R|Recursive|متداخل
2§Default permission mask§قناع الصلاحيات الافتراضي§umask {mask?}
3§Set ACL§ضبط ACL§setfacl {*} {acl=u:user:rwx} {path}§-R|Recursive|متداخل¶-d|Default ACL|ACL افتراضي¶-x|Remove entry|حذف مدخل¶-b|Remove all|حذف الكل
3§Show ACL§عرض ACL§getfacl {*} {path}§-R|Recursive|متداخل
3§Immutable attribute§خاصية عدم التعديل§chattr {mode=+i} {file}
3§List attributes§عرض الخصائص§lsattr {*} {path}§-R|Recursive|متداخل¶-a|All|الكل
#Archive & compress|الأرشفة والضغط
1§Create tar archive§إنشاء أرشيف tar§tar {*} {archive=backup.tar.gz} {path}§-c|Create|إنشاء¶-z|gzip|ضغط gzip¶-j|bzip2|ضغط bzip2¶-J|xz|ضغط xz¶-v|Verbose|تفصيل¶-f|File|ملف¶--exclude='{pattern=*.log}'|Exclude|استبعاد¶-p|Preserve perms|حفظ الصلاحيات¶--xattrs|Keep xattrs|حفظ xattrs
1§Extract tar archive§فك أرشيف tar§tar {*} {archive=backup.tar.gz}§-x|Extract|فك¶-z|gzip|gzip¶-j|bzip2|bzip2¶-J|xz|xz¶-v|Verbose|تفصيل¶-f|File|ملف¶-C {dest=.}|Target directory|مجلد الوجهة¶--strip-components={n=1}|Strip leading dirs|حذف مستويات
1§List tar contents§محتوى أرشيف tar§tar -tf {archive=backup.tar.gz} {*}§-v|Verbose|تفصيل
1§Gzip§ضغط gzip§gzip {*} {file}§-k|Keep original|إبقاء الأصل¶-9|Best compression|أقصى ضغط¶-v|Verbose|تفصيل¶-r|Recursive|متداخل
1§Gunzip§فك gzip§gunzip {*} {file=file.gz}§-k|Keep original|إبقاء الأصل¶-v|Verbose|تفصيل
1§Zip§ضغط zip§zip {*} {archive=a.zip} {path}§-r|Recursive|متداخل¶-e|Encrypt|تشفير¶-9|Best compression|أقصى ضغط¶-x '{pattern=*.log}'|Exclude|استبعاد
1§Unzip§فك zip§unzip {*} {archive=a.zip}§-l|List only|عرض فقط¶-d {dest=.}|Target directory|مجلد الوجهة¶-o|Overwrite|الكتابة فوق¶-q|Quiet|صامت
2§XZ compress§ضغط xz§xz {*} {file}§-k|Keep original|إبقاء الأصل¶-9|Best compression|أقصى ضغط¶-T0|All threads|كل الأنوية¶-d|Decompress|فك
2§7-Zip§ضغط 7z§7z {mode=@a,x,l} {archive=a.7z} {path?}
#Processes|العمليات
1§List processes§عرض العمليات§ps {*}§aux|All users, detailed|كل العمليات¶-ef|Full format|صيغة كاملة¶--sort=-%mem|Sort by memory|ترتيب بالذاكرة¶--sort=-%cpu|Sort by CPU|ترتيب بالمعالج¶-u {user}|By user|حسب المستخدم¶-C {name=nginx}|By command name|حسب الاسم¶--forest|Tree|شجرة
1§Live process viewer§مراقب العمليات§top {*}§-u {user}|By user|حسب المستخدم¶-o %MEM|Sort by memory|ترتيب بالذاكرة¶-H|Show threads|إظهار الخيوط¶-b -n 1|Batch one-shot|لقطة واحدة
1§Interactive viewer (htop)§مراقب تفاعلي (htop)§htop {*}§-u {user}|By user|حسب المستخدم¶-t|Tree|شجرة¶-d {tenths=10}|Refresh delay|فترة التحديث
1§Find process by name§البحث عن عملية بالاسم§pgrep {*} {name}§-a|Show cmdline|إظهار الأمر¶-l|Show name|إظهار الاسم¶-u {user}|By user|حسب المستخدم¶-f|Match full cmdline|مطابقة الأمر كامل
1§Terminate process§إنهاء عملية§kill {*} {pid}§-15|SIGTERM (graceful)|إنهاء لطيف¶-9|SIGKILL (force)|إنهاء إجباري¶-HUP|SIGHUP (reload)|إعادة تحميل¶-STOP|Pause|إيقاف مؤقت¶-CONT|Continue|استكمال
1§Kill by name§إنهاء بالاسم§pkill {*} {name}§-9|SIGKILL|إجباري¶-f|Full cmdline|الأمر كامل¶-u {user}|By user|حسب المستخدم¶-x|Exact match|مطابقة تامة
2§Kill all by name§إنهاء كل العمليات بالاسم§killall {*} {name}§-9|SIGKILL|إجباري¶-i|Interactive|تفاعلي¶-u {user}|By user|حسب المستخدم
2§Run with priority§تشغيل بأولوية§nice -n {level=10} {cmd}
2§Change priority§تغيير أولوية§renice -n {level=5} -p {pid}
2§Run detached from terminal§تشغيل منفصل عن الطرفية§nohup {cmd} > {log=out.log} 2>&1 &
2§Open files / ports (lsof)§الملفات والمنافذ المفتوحة§lsof {*}§-i :{port=80}|By port|حسب المنفذ¶-p {pid}|By PID|حسب العملية¶-u {user}|By user|حسب المستخدم¶-nP|No DNS/port names|بدون أسماء¶+D {dir=/var/log}|Directory|مجلد
3§Trace system calls§تتبع system calls§strace {*} {cmd?}§-p {pid}|Attach to PID|ربط بعملية¶-f|Follow forks|تتبع الفروع¶-tt|Timestamps|الوقت¶-e trace={calls=open,read}|Filter calls|تصفية¶-c|Summary|ملخص¶-o {out=trace.txt}|Output file|ملف الإخراج
2§Repeat a command§تكرار أمر§watch {*} '{cmd=df -h}'§-n {sec=2}|Interval|الفاصل بالثواني¶-d|Highlight changes|إبراز التغييرات
2§Time-limit a command§تحديد وقت لأمر§timeout {*} {secs=30} {cmd}§-s KILL|Send KILL|إرسال KILL¶-k {grace=5}|Kill after grace|قتل بعد مهلة
2§Measure runtime§قياس زمن التنفيذ§time {cmd}
#System info|معلومات النظام
1§Kernel & OS§النواة والنظام§uname {*}§-a|All|الكل¶-r|Kernel release|إصدار النواة¶-m|Architecture|المعمارية¶-n|Hostname|الاسم
1§OS release§إصدار التوزيعة§cat /etc/os-release
1§Uptime & load§مدة التشغيل والحمل§uptime {*}§-p|Pretty|مقروء¶-s|Since|منذ
1§Memory usage§استهلاك الذاكرة§free {*}§-h|Human|مقروء¶-m|MB|ميجا¶-g|GB|جيجا¶-s {sec=2}|Repeat|تكرار
1§CPU info§معلومات المعالج§lscpu {*}§-e|Extended table|جدول موسع
2§Block devices§الأقراص§lsblk {*}§-f|Filesystems|نظم الملفات¶-a|All|الكل¶-p|Full paths|المسارات الكاملة¶-o NAME,SIZE,TYPE,MOUNTPOINT|Custom columns|أعمدة مخصصة
2§PCI / USB devices§أجهزة PCI و USB§lspci {*}§-v|Verbose|تفصيل¶-k|Kernel drivers|تعريفات النواة¶-nn|Numeric IDs|أرقام المعرفات
2§Hardware summary§ملخص العتاد§lshw {*}§-short|Short|مختصر¶-class {class=network}|By class|حسب الفئة¶-html|HTML|HTML
3§BIOS / hardware DMI§بيانات BIOS§dmidecode {*}§-t {type=memory}|Table type|نوع الجدول¶-s system-serial-number|Serial|الرقم التسلسلي
2§Kernel messages§رسائل النواة§dmesg {*}§-T|Human time|وقت مقروء¶-w|Follow|متابعة¶-l err,warn|Levels|المستويات¶--ctime|ctime|ctime
1§Current user§المستخدم الحالي§whoami
1§User & groups ids§معرفات المستخدم§id {*} {user?}§-u|UID|UID¶-g|GID|GID¶-Gn|Group names|أسماء المجموعات
1§Who is logged in§المتصلون§w {*}§-h|No header|بدون ترويسة
2§Login history§سجل الدخول§last {*}§-n {n=20}|Count|العدد¶-x|Include shutdowns|مع الإغلاق¶-F|Full times|الوقت كامل
2§Failed logins§محاولات الدخول الفاشلة§lastb {*}§-n {n=20}|Count|العدد
1§Date & time§التاريخ والوقت§date {*}§+%F_%H-%M-%S|Filename-safe|صالح لأسماء الملفات¶-u|UTC|UTC¶-d '{when=yesterday}'|Other date|تاريخ آخر¶-I|ISO 8601|ISO 8601
1§Environment variables§متغيرات البيئة§printenv {name?}
1§Set variable§تعريف متغير§export {var=NAME}={value=value}
2§Command history§تاريخ الأوامر§history {*}§-c|Clear|مسح¶-w|Write to file|حفظ في الملف
1§Manual page§صفحة الدليل§man {*} {cmd=ls}§-k|Search keyword|بحث بكلمة¶-f|Short description|وصف مختصر¶{section=@1,2,3,4,5,6,7,8}|Section|القسم
2§Create alias§إنشاء اختصار§alias {name=ll}='{value=ls -lah}'
#Hashing & encoding|التجزئة والترميز
2§SHA-256 checksum§بصمة SHA-256§sha256sum {*} {file}§-c|Verify from file|تحقق من ملف¶-b|Binary|ثنائي
2§MD5 checksum§بصمة MD5§md5sum {*} {file}§-c|Verify|تحقق
2§Base64 encode/decode§ترميز Base64§base64 {*} {file}§-d|Decode|فك الترميز¶-w0|No wrapping|بدون التفاف
2§Random password§كلمة مرور عشوائية§openssl rand {fmt=@-base64,-hex} {len=24}
2§Generate UUID§توليد UUID§uuidgen {*}§-r|Random|عشوائي¶-t|Time-based|حسب الوقت
#Scheduling|الجدولة
1§Edit cron jobs§تعديل مهام cron§crontab {*}§-e|Edit|تعديل¶-l|List|عرض¶-r|Remove all|حذف الكل¶-u {user}|For user|لمستخدم
2§One-time job (at)§مهمة مرة واحدة§echo '{cmd=date}' | at {when=now + 5 minutes}
2§List one-time jobs§عرض مهام at§atq
2§Pause§انتظار§sleep {secs=5}
`);

T(["apt","📦","APT & dpkg (Debian/Ubuntu)|APT و dpkg (ديبيان/أوبنتو)","Complete package management on Debian-based systems|إدارة الحزم الكاملة على أنظمة ديبيان","pkg","deb",[["Install build tools","تثبيت أدوات البناء","sudo apt update && sudo apt install -y build-essential curl wget gnupg ca-certificates software-properties-common",""],["Enable universe/multiverse","تفعيل المستودعات الإضافية","sudo add-apt-repository -y universe && sudo add-apt-repository -y multiverse && sudo apt update",""]]],`
#Update & upgrade|التحديث والترقية
1§Refresh package lists§تحديث قوائم الحزم§apt update
1§Upgrade installed packages§ترقية الحزم§apt {mode=@upgrade,full-upgrade,dist-upgrade} {*}§-y|Assume yes|موافقة تلقائية¶-s|Simulate only|محاكاة فقط¶--only-upgrade|Do not install new|بدون تثبيت جديد¶--with-new-pkgs|Allow new deps|السماح بحزم جديدة¶-V|Show versions|إظهار الإصدارات
2§Upgrade one package only§ترقية حزمة واحدة§apt install --only-upgrade {pkg=nginx} {*}§-y|Assume yes|موافقة تلقائية
2§List upgradable§الحزم القابلة للترقية§apt list --upgradable
2§Release upgrade§ترقية إصدار التوزيعة§do-release-upgrade {*}§-d|Development release|إصدار تطويري¶-c|Check only|فحص فقط
2§Automatic security updates§التحديثات الأمنية التلقائية§apt install -y unattended-upgrades && dpkg-reconfigure -plow unattended-upgrades
#Install & remove|التثبيت والحذف
1§Install package§تثبيت حزمة§apt install {*} {pkg=nginx}§-y|Assume yes|موافقة تلقائية¶--no-install-recommends|No recommends|بدون الموصى بها¶--install-suggests|Install suggests|مع المقترحة¶--reinstall|Reinstall|إعادة تثبيت¶-f|Fix broken|إصلاح المكسور¶-s|Simulate|محاكاة¶--allow-downgrades|Allow downgrade|السماح بالرجوع لإصدار أقدم¶-t {release=stable}|Target release|الإصدار المستهدف¶-d|Download only|تحميل فقط
2§Install specific version§تثبيت إصدار محدد§apt install {pkg=nginx}={version=1.24.0-1} {*}§-y|Assume yes|موافقة تلقائية¶--allow-downgrades|Allow downgrade|السماح بالرجوع
1§Remove package§حذف حزمة§apt remove {*} {pkg}§-y|Assume yes|موافقة تلقائية¶-s|Simulate|محاكاة
1§Purge package + config§حذف الحزمة مع إعداداتها§apt purge {*} {pkg}§-y|Assume yes|موافقة تلقائية¶-s|Simulate|محاكاة
1§Remove unused dependencies§حذف الاعتماديات غير المستخدمة§apt autoremove {*}§-y|Assume yes|موافقة تلقائية¶--purge|Purge configs|مع الإعدادات
1§Clean package cache§تنظيف الكاش§apt {mode=@clean,autoclean}
2§Install local .deb§تثبيت ملف deb محلي§apt install {*} ./{file=package.deb}§-y|Assume yes|موافقة تلقائية
2§Fix broken dependencies§إصلاح الاعتماديات المكسورة§apt --fix-broken install {*}§-y|Assume yes|موافقة تلقائية
#Search & inspect|البحث والاستعلام
1§Search packages§بحث عن حزم§apt search {*} {keyword}§--names-only|Names only|الأسماء فقط
1§Show package info§معلومات حزمة§apt show {pkg=nginx}
1§List packages§قائمة الحزم§apt list {*}§--installed|Installed|المثبتة¶--upgradable|Upgradable|القابلة للترقية¶--all-versions|All versions|كل الإصدارات¶{pattern?}|Pattern|نمط
2§Package policy / candidates§سياسة الحزمة والإصدارات§apt-cache policy {pkg=nginx}
2§Dependencies§الاعتماديات§apt-cache depends {pkg=nginx} {*}§--recurse|Recursive|متداخل¶--installed|Only installed|المثبتة فقط
2§Reverse dependencies§من يعتمد على الحزمة§apt-cache rdepends {pkg=nginx} {*}§--installed|Only installed|المثبتة فقط
2§Why installed§لماذا هذه الحزمة مثبتة§aptitude why {pkg}
2§Download .deb without install§تحميل deb بدون تثبيت§apt download {pkg=nginx}
2§Download source§تحميل الكود المصدري§apt source {pkg=nginx}
3§Build dependencies§اعتماديات البناء§apt build-dep {pkg=nginx} {*}§-y|Assume yes|موافقة تلقائية
2§Which package has a file (installed)§أي حزمة تملك الملف§dpkg -S {file=/bin/ls}
2§Which package has a file (any)§أي حزمة تملك الملف (غير مثبتة)§apt-file search {file=bin/ls}
#Package state|حالة الحزم
2§Hold package§تجميد حزمة§apt-mark hold {pkg}
2§Unhold package§فك التجميد§apt-mark unhold {pkg}
2§Show held packages§الحزم المجمدة§apt-mark showhold
2§Manual / auto marks§علامات يدوي / تلقائي§apt-mark {mode=@showmanual,showauto,manual,auto} {pkg?}
#dpkg|أوامر dpkg
1§Install .deb§تثبيت deb§dpkg {*} {file=package.deb}§-i|Install|تثبيت¶--force-depends|Ignore deps|تجاهل الاعتماديات
1§List installed§المثبت§dpkg -l {pattern?}
2§Package status§حالة حزمة§dpkg -s {pkg=nginx}
2§Files in package§ملفات الحزمة§dpkg -L {pkg=nginx}
2§Inspect .deb§فحص ملف deb§dpkg {mode=@-I,-c,-x} {file=package.deb} {dest?}
2§Remove / purge via dpkg§حذف عبر dpkg§dpkg {mode=@-r,-P} {pkg}
2§Reconfigure package§إعادة إعداد حزمة§dpkg-reconfigure {pkg=tzdata}
3§Finish interrupted install§إكمال تثبيت مقطوع§dpkg --configure -a
2§Selections export§تصدير قائمة الحزم§dpkg --get-selections > {file=pkgs.txt}
3§Package architectures§معماريات النظام§dpkg --print-architecture && dpkg --print-foreign-architectures
3§Add architecture§إضافة معمارية§dpkg --add-architecture {arch=i386}
2§Verify package integrity§فحص سلامة الحزم§debsums {*}§-s|Only errors|الأخطاء فقط¶-c|Changed files|الملفات المتغيرة
#Repositories & keys|المستودعات والمفاتيح
1§Add PPA repository§إضافة مستودع PPA§add-apt-repository {*} ppa:{ppa=ondrej/php}§-y|Assume yes|موافقة تلقائية¶-r|Remove|حذف¶-s|Add source|إضافة المصدر
2§Edit sources§تعديل المصادر§apt edit-sources
2§List enabled sources§المصادر المفعلة§grep -rhE '^(deb|Types|URIs)' /etc/apt/sources.list /etc/apt/sources.list.d/
2§Add signing key (keyring)§إضافة مفتاح توقيع§curl -fsSL {url=https://example.com/key.gpg} | gpg --dearmor -o /etc/apt/keyrings/{name=example}.gpg
2§Add repo entry§إضافة مدخل مستودع§echo 'deb [signed-by=/etc/apt/keyrings/{name=example}.gpg] {url=https://example.com/apt} {suite=stable} {component=main}' | tee /etc/apt/sources.list.d/{name=example}.list
3§Alternatives system§نظام البدائل§update-alternatives {*} {name=editor}§--list|List|عرض¶--config|Choose interactively|اختيار تفاعلي¶--display|Display|إظهار¶--set {name} {path}|Set path|ضبط المسار
3§Apt history / logs§سجلات الحزم§grep {action=@install,upgrade,remove} /var/log/dpkg.log
3§Which services need restart§الخدمات التي تحتاج إعادة تشغيل§needrestart {*}§-r a|Auto restart|إعادة تلقائية¶-b|Batch|دفعة¶-l|List only|عرض فقط
3§Orphan libraries§مكتبات يتيمة§deborphan {*}§-a|All|الكل¶--guess-all|Guess|تخمين
2§Snap packages§حزم Snap§snap {mode=@list,install,remove,refresh,info,find} {name?}
2§Release info§معلومات الإصدار§lsb_release -a
`);

T(["dnf","🎩","DNF / RPM (RedHat · Rocky · Alma · Fedora)|DNF و RPM (ريدهات)","Complete package management on RHEL-based systems|إدارة الحزم الكاملة على أنظمة ريدهات",  "pkg","rpm",[["Enable EPEL + tools","تفعيل EPEL والأدوات","","sudo dnf install -y epel-release dnf-plugins-core && sudo dnf makecache"],["Enable CRB/PowerTools","تفعيل CRB","","sudo dnf config-manager --set-enabled crb || sudo dnf config-manager --set-enabled powertools"]]],`
#Update & upgrade|التحديث والترقية
1§Check for updates§فحص التحديثات§dnf check-update {*}§--security|Security only|الأمنية فقط
1§Upgrade packages§ترقية الحزم§dnf upgrade {*}§-y|Assume yes|موافقة تلقائية¶--security|Security only|الأمنية فقط¶--bugfix|Bugfix only|إصلاح الأخطاء فقط¶--refresh|Refresh metadata|تحديث البيانات¶--skip-broken|Skip broken|تخطي المكسور¶--exclude={pkg=kernel*}|Exclude|استبعاد
2§Upgrade one package§ترقية حزمة واحدة§dnf upgrade {*} {pkg=nginx}§-y|Assume yes|موافقة تلقائية
2§Upgrade to new release§ترقية إصدار النظام§dnf system-upgrade {mode=@download,reboot} --releasever={ver=40}
2§Auto updates§تحديثات تلقائية§dnf install -y dnf-automatic && systemctl enable --now dnf-automatic.timer
2§Needs restart?§هل يحتاج إعادة تشغيل§needs-restarting {*}§-r|Reboot required?|إعادة تشغيل النظام؟¶-s|Services|الخدمات
#Install & remove|التثبيت والحذف
1§Install package§تثبيت حزمة§dnf install {*} {pkg=nginx}§-y|Assume yes|موافقة تلقائية¶--nogpgcheck|Skip GPG check|بدون فحص GPG¶--enablerepo={repo=epel}|Enable repo|تفعيل مستودع¶--disablerepo={repo=*}|Disable repo|تعطيل مستودع¶--allowerasing|Allow erasing|السماح بالإزالة¶--best|Best version|أفضل إصدار¶--skip-broken|Skip broken|تخطي المكسور¶--setopt=install_weak_deps=False|No weak deps|بدون اعتماديات ضعيفة¶--downloadonly|Download only|تحميل فقط
2§Install specific version§تثبيت إصدار محدد§dnf install {*} {pkg=nginx}-{version=1.24.0}§-y|Assume yes|موافقة تلقائية
1§Install local RPM§تثبيت RPM محلي§dnf install {*} ./{file=package.rpm}§-y|Assume yes|موافقة تلقائية¶--nogpgcheck|Skip GPG check|بدون فحص GPG
1§Remove package§حذف حزمة§dnf remove {*} {pkg}§-y|Assume yes|موافقة تلقائية¶--noautoremove|Keep deps|إبقاء الاعتماديات
1§Autoremove unused§حذف غير المستخدم§dnf autoremove {*}§-y|Assume yes|موافقة تلقائية
2§Reinstall§إعادة تثبيت§dnf reinstall {*} {pkg}§-y|Assume yes|موافقة تلقائية
2§Downgrade§الرجوع لإصدار أقدم§dnf downgrade {*} {pkg}§-y|Assume yes|موافقة تلقائية
2§Sync to repo versions§مزامنة مع المستودع§dnf distro-sync {*}§-y|Assume yes|موافقة تلقائية
#Search & inspect|البحث والاستعلام
1§Search§بحث§dnf search {*} {keyword}§--all|Also descriptions|مع الوصف
1§Package info§معلومات حزمة§dnf info {pkg=nginx}
1§List packages§قائمة الحزم§dnf list {mode=@installed,available,updates,extras,recent,all} {pattern?}
1§Which package provides§أي حزمة توفر§dnf provides {path=*/bin/ls}
2§Query repo§استعلام المستودع§dnf repoquery {*} {pkg=nginx}§--requires|Requires|يتطلب¶--whatrequires|Required by|مطلوب من¶--list|Files|الملفات¶--info|Info|معلومات¶--installed|Installed only|المثبت فقط¶--upgrades|Upgrades|الترقيات
2§Dependency list§الاعتماديات§dnf deplist {pkg=nginx}
#Groups & modules|المجموعات والوحدات
1§List groups§قائمة المجموعات§dnf group list {*}§--hidden|Hidden|المخفية¶-v|Verbose|تفصيل
1§Install group§تثبيت مجموعة§dnf group install {*} '{group=Development Tools}'§-y|Assume yes|موافقة تلقائية¶--with-optional|With optional|مع الاختياري
2§Remove group§حذف مجموعة§dnf group remove '{group=Development Tools}'
2§Module streams§تدفقات الوحدات§dnf module {mode=@list,info,enable,disable,reset,install} {module=nodejs}{stream?}
#History & undo|السجل والتراجع
2§Transaction history§سجل العمليات§dnf history {mode=@list,info,undo,redo,rollback} {id?}
#Repositories|المستودعات
1§List repos§قائمة المستودعات§dnf repolist {*}§--all|All|الكل¶--enabled|Enabled|المفعلة¶--disabled|Disabled|المعطلة¶-v|Verbose|تفصيل
2§Add repo from URL§إضافة مستودع من رابط§dnf config-manager --add-repo {url=https://example.com/example.repo}
2§Enable / disable repo§تفعيل / تعطيل مستودع§dnf config-manager {mode=@--set-enabled,--set-disabled} {repo=crb}
2§Import GPG key§استيراد مفتاح GPG§rpm --import {url=https://example.com/RPM-GPG-KEY}
2§Rebuild cache§إعادة بناء الكاش§dnf makecache {*}§--refresh|Force refresh|تحديث إجباري
1§Clean§تنظيف§dnf clean {what=@all,packages,metadata,dbcache,expire-cache}
2§Version lock§تثبيت إصدار§dnf versionlock {mode=@add,delete,list,clear} {pkg?}
3§Show DNF config§إعدادات DNF§dnf config-manager --dump
3§Download RPM only§تحميل RPM فقط§dnf download {*} {pkg=nginx}§--resolve|With deps|مع الاعتماديات¶--source|Source RPM|المصدر¶--destdir={dir=.}|Destination|الوجهة
#rpm|أوامر rpm
1§List all installed§كل المثبت§rpm -qa {*}§--last|Sort by install time|ترتيب بوقت التثبيت¶--qf '%{NAME}\\n'|Names only|الأسماء فقط
1§Package info§معلومات حزمة§rpm -qi {pkg=nginx}
1§Package files§ملفات الحزمة§rpm {mode=@-ql,-qc,-qd} {pkg=nginx}
2§Which package owns file§أي حزمة تملك الملف§rpm -qf {file=/bin/ls}
2§Package dependencies§اعتماديات الحزمة§rpm {mode=@-qR,--whatrequires,--whatprovides} {pkg=nginx}
2§Query RPM file§فحص ملف rpm§rpm -qp{mode=@i,l,R} {file=package.rpm}
2§Install / upgrade RPM§تثبيت أو ترقية RPM§rpm {*} {file=package.rpm}§-ivh|Install|تثبيت¶-Uvh|Upgrade|ترقية¶-Fvh|Freshen|تحديث المثبت فقط¶--nodeps|Ignore deps|تجاهل الاعتماديات¶--force|Force|إجبار¶--test|Test only|اختبار فقط
2§Erase package§حذف حزمة§rpm -e {*} {pkg}§--nodeps|Ignore deps|تجاهل الاعتماديات¶--test|Test only|اختبار فقط
2§Verify installed files§فحص الملفات المثبتة§rpm {mode=@-V,-Va} {pkg?}
2§Check signature§فحص التوقيع§rpm --checksig {file=package.rpm}
3§Rebuild rpm DB§إعادة بناء قاعدة rpm§rpm --rebuilddb
3§Extract RPM contents§فك محتوى rpm§rpm2cpio {file=package.rpm} | cpio -idmv
3§Show scripts§سكربتات الحزمة§rpm -q --scripts {pkg=nginx}
#Packaging & subscriptions|البناء والاشتراكات
3§Set up rpmbuild tree§تجهيز شجرة rpmbuild§rpmdev-setuptree
3§Build RPM§بناء RPM§rpmbuild {mode=@-ba,-bb,-bs} {spec=~/rpmbuild/SPECS/app.spec}
3§Create local repo§إنشاء مستودع محلي§createrepo_c {*} {dir=/srv/repo}§--update|Update|تحديث
2§Register system (RHEL)§تسجيل النظام (RHEL)§subscription-manager register {*}§--username={user}|Username|المستخدم¶--password={password}|Password|كلمة المرور¶--auto-attach|Auto attach|ربط تلقائي¶--org={org}|Organization|المؤسسة¶--activationkey={key}|Activation key|مفتاح التفعيل
2§Subscription status§حالة الاشتراك§subscription-manager {mode=@status,list --consumed,list --available,repos --list,unregister,refresh}
2§Set RHEL release§تثبيت إصدار RHEL§subscription-manager release --set={ver=9.4}
2§Legacy yum§أوامر yum القديمة§yum {action=@install,update,remove,search,info,list,repolist,clean all} {pkg?}
`);

T(["systemd","⚙️","systemd & Logs|systemd والسجلات","Services, targets, timers, journal and boot analysis|الخدمات والـ targets والمؤقتات والسجلات وتحليل الإقلاع","sys","all",[]],`
#Services|الخدمات
1§Service status§حالة خدمة§systemctl status {*} {svc=nginx}§-l|Full lines|الأسطر كاملة¶--no-pager|No pager|بدون صفحات¶-n {lines=30}|Log lines|أسطر السجل
1§Start service§تشغيل خدمة§systemctl start {svc=nginx}
1§Stop service§إيقاف خدمة§systemctl stop {svc=nginx}
1§Restart service§إعادة تشغيل خدمة§systemctl restart {svc=nginx}
1§Reload config§إعادة تحميل الإعداد§systemctl {mode=@reload,reload-or-restart,try-restart} {svc=nginx}
1§Enable at boot§تفعيل عند الإقلاع§systemctl enable {*} {svc=nginx}§--now|Also start now|وتشغيل الآن¶--force|Overwrite links|الكتابة فوق الروابط
1§Disable at boot§تعطيل عند الإقلاع§systemctl disable {*} {svc=nginx}§--now|Also stop now|وإيقاف الآن
2§Is active / enabled?§هل تعمل / مفعلة؟§systemctl {mode=@is-active,is-enabled,is-failed} {svc=nginx}
2§Mask / unmask§حجب / رفع الحجب§systemctl {mode=@mask,unmask} {svc=nginx}
1§List units§قائمة الوحدات§systemctl list-units {*}§--type=service|Services|الخدمات¶--state=running|Running|العاملة¶--state=failed|Failed|الفاشلة¶--all|All|الكل¶--no-pager|No pager|بدون صفحات
1§Failed units§الوحدات الفاشلة§systemctl --failed
2§Unit files§ملفات الوحدات§systemctl list-unit-files {*}§--state=enabled|Enabled|المفعلة¶--type=service|Services|الخدمات
2§Show unit file§عرض ملف الوحدة§systemctl cat {svc=nginx}
2§Show properties§خصائص الوحدة§systemctl show {svc=nginx} {*}§-p {prop=MainPID}|Property|خاصية
2§Dependencies§الاعتماديات§systemctl list-dependencies {svc=multi-user.target} {*}§--reverse|Reverse|عكسي¶--all|All|الكل
2§Edit override§تعديل override§systemctl edit {*} {svc=nginx}§--full|Edit full unit|تعديل الملف كاملاً
2§Reload systemd§إعادة تحميل systemd§systemctl daemon-reload
2§Reset failed state§تصفير حالة الفشل§systemctl reset-failed {svc?}
3§Default target§الـ target الافتراضي§systemctl {mode=@get-default,set-default multi-user.target,set-default graphical.target}
3§Switch target§التبديل إلى target§systemctl isolate {target=@rescue.target,multi-user.target,graphical.target,emergency.target}
2§Power control§التحكم بالطاقة§systemctl {mode=@reboot,poweroff,suspend,hibernate,halt}
3§Run transient unit§تشغيل وحدة مؤقتة§systemd-run {*} {cmd=/usr/bin/sleep 60}§--unit={name=myjob}|Unit name|اسم الوحدة¶--on-active={delay=30m}|Run after delay|تشغيل بعد مهلة¶--on-calendar='{cal=daily}'|On schedule|حسب جدول¶--scope|Scope|scope¶-p MemoryMax={mem=500M}|Memory limit|حد الذاكرة¶-p CPUQuota={cpu=50%}|CPU limit|حد المعالج
2§Timers§المؤقتات§systemctl list-timers {*}§--all|All|الكل
3§Verify unit file§فحص ملف وحدة§systemd-analyze verify {file=/etc/systemd/system/app.service}
#Journal & logs|السجلات
1§Show logs§عرض السجلات§journalctl {*}§-u {svc=nginx}|For unit|لوحدة¶-f|Follow|متابعة¶-n {lines=100}|Last N lines|آخر أسطر¶-b|This boot|هذا الإقلاع¶-b -1|Previous boot|الإقلاع السابق¶-k|Kernel|النواة¶-p {level=err}|Priority|الأولوية¶--since '{since=1 hour ago}'|Since|منذ¶--until '{until=now}'|Until|حتى¶-r|Newest first|الأحدث أولاً¶-o {fmt=json-pretty}|Output format|صيغة الإخراج¶--no-pager|No pager|بدون صفحات¶-g '{grep=error}'|Grep|بحث¶-x|Add explanations|مع الشرح
2§Journal disk usage§حجم السجلات§journalctl --disk-usage
2§Clean journal§تنظيف السجلات§journalctl {mode=@--vacuum-time=7d,--vacuum-size=500M,--vacuum-files=5}
2§List boots§قائمة الإقلاعات§journalctl --list-boots
#Boot, time, host|الإقلاع والوقت والجهاز
2§Boot time analysis§تحليل وقت الإقلاع§systemd-analyze {mode=@,blame,critical-chain,plot > boot.svg}
1§Time & NTP§الوقت و NTP§timedatectl {*}§status|Status|الحالة¶set-timezone {tz=Africa/Cairo}|Set timezone|ضبط المنطقة¶set-ntp {ntp=@true,false}|NTP on/off|تفعيل NTP¶list-timezones|List zones|قائمة المناطق
1§Hostname§اسم الجهاز§hostnamectl {*}§status|Status|الحالة¶set-hostname {hostname=server01}|Set hostname|ضبط الاسم
2§Locale§اللغة§localectl {*}§status|Status|الحالة¶set-locale LANG={lang=en_US.UTF-8}|Set locale|ضبط اللغة¶set-keymap {keymap=us}|Keymap|لوحة المفاتيح
2§Login sessions§جلسات الدخول§loginctl {mode=@list-sessions,list-users,show-session,terminate-session} {id?}
3§Core dumps§ملفات core§coredumpctl {mode=@list,info,debug,dump} {pid?}
2§DNS resolver§محلل DNS§resolvectl {mode=@status,query,flush-caches,statistics} {name?}
`);
