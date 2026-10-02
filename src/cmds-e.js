window.MAC.AN="-i {inv=inventory.ini}|Inventory|ملف الجرد¶-u {user=ubuntu}|Remote user|المستخدم البعيد¶-b|Become (sudo)|رفع الصلاحيات¶-K|Ask become password|اسأل كلمة sudo¶-k|Ask SSH password|اسأل كلمة SSH¶--private-key {key=~/.ssh/id_ed25519}|SSH key|مفتاح SSH¶-l {limit=web}|Limit hosts|تحديد الأجهزة¶-e {extra=key=value}|Extra vars|متغيرات إضافية¶-f {forks=20}|Forks|العمليات المتوازية¶-v|Verbose|تفصيل¶-vvv|Very verbose|تفصيل كبير¶-C|Check mode|وضع الفحص¶-D|Show diff|إظهار الفروق¶-T {secs=30}|Timeout|المهلة";

T(["ansible","🅰️","Ansible|Ansible","Ad-hoc commands, playbooks, roles, Galaxy, Vault, inventory and lint|أوامر ad-hoc و playbooks و roles و Galaxy و Vault والجرد والفحص","iac","all",[["Install Ansible","تثبيت Ansible","sudo apt update && sudo apt install -y ansible ansible-lint sshpass","sudo dnf install -y epel-release && sudo dnf install -y ansible-core ansible-lint sshpass"],["Install via pip","تثبيت عبر pip","python3 -m pip install --user ansible ansible-lint","python3 -m pip install --user ansible ansible-lint"],["Common collections","collections شائعة","ansible-galaxy collection install ansible.posix community.general community.docker kubernetes.core amazon.aws","ansible-galaxy collection install ansible.posix community.general community.docker kubernetes.core amazon.aws"]]],`
#Ad-hoc commands|الأوامر المباشرة
1§Ping hosts§اختبار الاتصال§ansible {pattern=all} -m ping {*}§<<AN>>
1§Run shell command§تنفيذ أمر§ansible {pattern=all} -m {module=@shell,command,raw} -a '{cmd=uptime}' {*}§<<AN>>
1§Gather facts§جمع الحقائق§ansible {pattern=all} -m setup {*}§-a 'filter={filter=ansible_distribution*}'|Filter|تصفية¶<<AN>>
2§Install package§تثبيت حزمة§ansible {pattern=all} -m {module=@package,apt,dnf,yum} -a 'name={pkg=nginx} state={state=@present,latest,absent}' {*}§<<AN>>
2§Manage service§إدارة خدمة§ansible {pattern=all} -m service -a 'name={svc=nginx} state={state=@started,stopped,restarted,reloaded} enabled={en=@yes,no}' {*}§<<AN>>
2§Copy file§نسخ ملف§ansible {pattern=all} -m copy -a 'src={src=./file} dest={dst=/tmp/file} mode={mode=0644}' {*}§<<AN>>
2§Fetch file§جلب ملف§ansible {pattern=all} -m fetch -a 'src={src=/etc/hosts} dest={dst=./fetched/}' {*}§<<AN>>
2§Create user§إنشاء مستخدم§ansible {pattern=all} -m user -a 'name={user=bob} groups={groups=sudo} shell=/bin/bash state=present' {*}§<<AN>>
2§Edit a line in file§تعديل سطر في ملف§ansible {pattern=all} -m lineinfile -a 'path={path=/etc/hosts} line="{line=10.0.0.5 db}" state=present' {*}§<<AN>>
2§Create directory§إنشاء مجلد§ansible {pattern=all} -m file -a 'path={path=/opt/app} state=directory mode=0755 owner={owner=root}' {*}§<<AN>>
2§Reboot hosts§إعادة تشغيل§ansible {pattern=all} -m reboot {*}§<<AN>>
2§Git checkout§سحب من Git§ansible {pattern=all} -m git -a 'repo={repo=https://github.com/user/repo.git} dest={dst=/opt/app} version={ver=main}' {*}§<<AN>>
2§Run script§تشغيل سكربت§ansible {pattern=all} -m script -a '{script=./script.sh}' {*}§<<AN>>
2§Unarchive§فك أرشيف§ansible {pattern=all} -m unarchive -a 'src={src=app.tar.gz} dest={dst=/opt/}' {*}§<<AN>>
2§Run any module§تشغيل أي module§ansible {pattern=all} -m {module=ansible.builtin.debug} -a '{args=msg=hello}' {*}§<<AN>>
#Playbooks|الـ Playbooks
1§Run playbook§تشغيل playbook§ansible-playbook {playbook=site.yml} {*}§<<AN>>¶--tags {tags=nginx}|Only tags|تاجات محددة¶--skip-tags {tags=slow}|Skip tags|تخطي تاجات¶--start-at-task '{task=Install nginx}'|Start at task|ابدأ من مهمة¶--step|Step by step|خطوة بخطوة¶--syntax-check|Syntax check|فحص الصياغة¶--list-tasks|List tasks|عرض المهام¶--list-hosts|List hosts|عرض الأجهزة¶--list-tags|List tags|عرض التاجات¶--ask-vault-pass|Ask vault password|اسأل كلمة Vault¶--vault-password-file {file=.vault_pass}|Vault pass file|ملف كلمة Vault¶-e @{varsfile=vars.yml}|Vars file|ملف متغيرات¶--force-handlers|Force handlers|إجبار الـ handlers¶--flush-cache|Flush fact cache|مسح الكاش
1§Dry run with diff§تجربة مع الفروق§ansible-playbook {playbook=site.yml} --check --diff {*}§-i {inv=inventory.ini}|Inventory|ملف الجرد¶-l {limit=web}|Limit|تحديد
2§Syntax check§فحص الصياغة§ansible-playbook {playbook=site.yml} --syntax-check
2§Lint playbook§فحص الجودة§ansible-lint {*} {playbook=site.yml}§-p|Parseable|مختصر¶--fix|Auto-fix|إصلاح تلقائي¶-x {rule=yaml}|Skip rule|تخطي قاعدة
2§Run from Git (pull mode)§تشغيل من Git§ansible-pull -U {repo=https://github.com/user/repo.git} {*} {playbook=site.yml}§-C {branch=main}|Branch|الفرع¶-i localhost,|Local only|محلي فقط¶--purge|Purge checkout|حذف النسخة¶-f|Force|إجبار
3§Playbook debugger / strategy§تصحيح أخطاء§ANSIBLE_STRATEGY=debug ansible-playbook {playbook=site.yml}
3§Profile task time§قياس زمن المهام§ANSIBLE_CALLBACKS_ENABLED=profile_tasks ansible-playbook {playbook=site.yml}
#Inventory & config|الجرد والإعدادات
1§Show inventory§عرض الجرد§ansible-inventory -i {inv=inventory.ini} {*}§--list|JSON list|قائمة JSON¶--graph|Graph|رسم¶-y|YAML|YAML¶--host {host=web1}|One host|جهاز واحد
2§List hosts matching§الأجهزة المطابقة§ansible {pattern=web} -i {inv=inventory.ini} --list-hosts
2§Show config§عرض الإعدادات§ansible-config {mode=@dump --only-changed,list,view,init --disabled -t all}
2§Dynamic inventory graph§جرد ديناميكي§ansible-inventory -i {plugin=aws_ec2.yml} --graph
2§Version§الإصدار§ansible --version
#Roles & Galaxy|الـ Roles و Galaxy
1§Init role§إنشاء role§ansible-galaxy role init {*} {role=myrole}§--offline|Offline|بدون اتصال¶--init-path {dir=roles}|Path|المسار
1§Install role§تثبيت role§ansible-galaxy role install {*} {role=geerlingguy.nginx}§-p {path=roles}|Install path|مسار التثبيت¶--force|Force|إجبار¶-r {file=requirements.yml}|From requirements|من requirements
1§Install collection§تثبيت collection§ansible-galaxy collection install {*} {col=community.general}§-r {file=requirements.yml}|From requirements|من requirements¶-p {path=collections}|Path|المسار¶--upgrade|Upgrade|ترقية¶--force|Force|إجبار
2§List installed§قائمة المثبت§ansible-galaxy {type=@role,collection} list
2§Search Galaxy§بحث في Galaxy§ansible-galaxy search {keyword=nginx} {*}§--author {author=geerlingguy}|Author|المؤلف¶--platforms {platform=EL}|Platform|المنصة
3§Build / publish collection§بناء ونشر collection§ansible-galaxy collection {mode=@build,publish mynamespace-mycoll-1.0.0.tar.gz --api-key=TOKEN}
3§Molecule testing§اختبار Molecule§molecule {mode=@init scenario,create,converge,verify,test,destroy,login,lint,list}
#Vault & docs|Vault والتوثيق
1§Encrypt file§تشفير ملف§ansible-vault encrypt {file=secrets.yml} {*}§--vault-password-file {pwfile=.vault_pass}|Password file|ملف كلمة المرور¶--vault-id {id=prod@prompt}|Vault ID|معرف Vault¶--output {out=secrets.enc.yml}|Output|الإخراج
1§Decrypt / view / edit§فك / عرض / تعديل§ansible-vault {mode=@decrypt,view,edit,rekey} {file=secrets.yml} {*}§--vault-password-file {pwfile=.vault_pass}|Password file|ملف كلمة المرور
2§Encrypt a string§تشفير نص§ansible-vault encrypt_string '{value=secret}' --name '{var=db_password}' {*}§--vault-password-file {pwfile=.vault_pass}|Password file|ملف كلمة المرور
2§Module documentation§توثيق module§ansible-doc {*} {module=ansible.builtin.copy}§-s|Snippet|مقتطف¶-l|List all|عرض الكل¶-t {type=@module,lookup,filter,callback,connection}|Plugin type|نوع الإضافة¶-F|Show file path|مسار الملف
2§Console REPL§الكونسول§ansible-console {*}§-i {inv=inventory.ini}|Inventory|الجرد¶-b|Become|رفع الصلاحيات
2§Window facts quick§الحقائق السريعة§ansible {host=localhost} -m debug -a 'var=hostvars[inventory_hostname]' {*}§-i {inv=inventory.ini}|Inventory|الجرد
`);

T(["terraform","🏗️","Terraform · OpenTofu|Terraform و OpenTofu","Infrastructure as Code: init, plan, apply, state, workspaces, modules, tooling|البنية كتعليمات برمجية: التهيئة والخطة والتطبيق والـ state والـ workspaces والـ modules والأدوات","iac","all",[["Install Terraform","تثبيت Terraform","wget -O- https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor --yes -o /usr/share/keyrings/hashicorp-archive-keyring.gpg && echo \"deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main\" | sudo tee /etc/apt/sources.list.d/hashicorp.list && sudo apt update && sudo apt install -y terraform","sudo dnf install -y dnf-plugins-core && sudo dnf config-manager --add-repo https://rpm.releases.hashicorp.com/RHEL/hashicorp.repo && sudo dnf install -y terraform"],["Install OpenTofu","تثبيت OpenTofu","curl --proto '=https' --tlsv1.2 -fsSL https://get.opentofu.org/install-opentofu.sh | sudo sh -s -- --install-method deb","curl --proto '=https' --tlsv1.2 -fsSL https://get.opentofu.org/install-opentofu.sh | sudo sh -s -- --install-method rpm"],["Autocomplete","الإكمال التلقائي","terraform -install-autocomplete","terraform -install-autocomplete"]]],`
#Core workflow|الدورة الأساسية
1§Initialize§تهيئة§terraform init {*}§-upgrade|Upgrade providers|ترقية providers¶-reconfigure|Reconfigure backend|إعادة ضبط الـ backend¶-migrate-state|Migrate state|نقل الـ state¶-backend-config={kv=bucket=my-state}|Backend config|إعداد backend¶-backend=false|Skip backend|بدون backend¶-input=false|No prompts|بدون أسئلة¶-lockfile=readonly|Readonly lockfile|قفل للقراءة فقط
1§Format code§تنسيق الكود§terraform fmt {*}§-recursive|Recursive|متداخل¶-check|Check only|فحص فقط¶-diff|Show diff|إظهار الفروق
1§Validate§فحص§terraform validate {*}§-json|JSON|JSON
1§Plan§الخطة§terraform plan {*}§-out={file=tfplan}|Save plan|حفظ الخطة¶-var '{kv=region=us-east-1}'|Variable|متغير¶-var-file={file=prod.tfvars}|Var file|ملف متغيرات¶-target={res=aws_instance.web}|Target resource|مورد محدد¶-destroy|Plan destroy|خطة حذف¶-refresh=false|Skip refresh|بدون refresh¶-refresh-only|Refresh only|refresh فقط¶-replace={res=aws_instance.web}|Force replace|إجبار الاستبدال¶-parallelism={n=10}|Parallelism|التوازي¶-lock=false|No lock|بدون قفل¶-detailed-exitcode|Detailed exit code|كود خروج مفصل¶-compact-warnings|Compact warnings|تحذيرات مختصرة
1§Apply§التطبيق§terraform apply {*} {planfile?}§-auto-approve|Auto approve|موافقة تلقائية¶-var '{kv=region=us-east-1}'|Variable|متغير¶-var-file={file=prod.tfvars}|Var file|ملف متغيرات¶-target={res=aws_instance.web}|Target|مورد محدد¶-replace={res=aws_instance.web}|Replace|استبدال¶-parallelism={n=10}|Parallelism|التوازي¶-lock-timeout={t=60s}|Lock timeout|مهلة القفل¶-refresh=false|Skip refresh|بدون refresh
1§Destroy§الحذف§terraform destroy {*}§-auto-approve|Auto approve|موافقة تلقائية¶-target={res=aws_instance.web}|Target|مورد محدد¶-var-file={file=prod.tfvars}|Var file|ملف متغيرات
1§Show outputs§المخرجات§terraform output {*} {name?}§-json|JSON|JSON¶-raw|Raw value|قيمة خام
1§Show state / plan§عرض الـ state أو الخطة§terraform show {*} {file?}§-json|JSON|JSON¶-no-color|No colors|بدون ألوان
2§Refresh state§تحديث الـ state§terraform apply -refresh-only {*}§-auto-approve|Auto approve|موافقة تلقائية
2§Version§الإصدار§terraform version {*}§-json|JSON|JSON
2§Providers§الـ providers§terraform providers {*}§lock -platform=linux_amd64 -platform=darwin_arm64|Lock for platforms|قفل لمنصات¶schema -json|Schema|المخطط¶mirror {dir=./mirror}|Mirror|نسخة محلية
2§Get modules§تحميل الـ modules§terraform get {*}§-update|Update|تحديث
2§Interactive console§الكونسول§terraform console {*}§-var-file={file=prod.tfvars}|Var file|ملف متغيرات
2§Dependency graph§رسم الاعتماديات§terraform graph | dot -Tsvg > {out=graph.svg}
2§Login to Terraform Cloud§دخول Terraform Cloud§terraform {mode=@login,logout}
#State management|إدارة الـ State
2§List resources in state§موارد الـ state§terraform state list {*} {filter?}
2§Show resource in state§عرض مورد§terraform state show {res=aws_instance.web}
2§Move resource§نقل مورد§terraform state mv {src=aws_instance.old} {dst=aws_instance.new}
2§Remove from state§إزالة من الـ state§terraform state rm {res=aws_instance.web}
2§Pull / push state§سحب / رفع الـ state§terraform state {mode=@pull > terraform.tfstate,push terraform.tfstate}
2§Import existing resource§استيراد مورد موجود§terraform import {*} {addr=aws_instance.web} {id=i-0123456789abcdef0}§-var-file={file=prod.tfvars}|Var file|ملف متغيرات¶-var '{kv=region=us-east-1}'|Variable|متغير
2§Mark tainted§وسم كتالف§terraform {mode=@taint,untaint} {res=aws_instance.web}
3§Force unlock§فك قفل إجباري§terraform force-unlock {*} {lockid}§-force|No prompt|بدون سؤال
3§Replace provider in state§استبدال provider§terraform state replace-provider {from=registry.terraform.io/-/aws} {to=registry.terraform.io/hashicorp/aws}
3§Generate config from import§توليد إعداد من import§terraform plan -generate-config-out={file=generated.tf}
#Workspaces|الـ Workspaces
1§Workspaces§الـ workspaces§terraform workspace {mode=@list,show,new dev,select dev,delete dev} {*}§-force|Force delete|حذف إجباري
#Environment variables|متغيرات البيئة
2§Enable logging§تفعيل السجلات§TF_LOG={lvl=@DEBUG,TRACE,INFO,WARN,ERROR} TF_LOG_PATH={file=terraform.log} terraform {cmd=plan}
2§Pass variable by env§تمرير متغير بالبيئة§TF_VAR_{name=region}={value=us-east-1} terraform {cmd=plan}
2§Disable prompts (CI)§بدون أسئلة (CI)§TF_IN_AUTOMATION=1 TF_INPUT=0 terraform {cmd=plan}
2§Plugin cache§كاش الـ plugins§export TF_PLUGIN_CACHE_DIR={dir=$HOME/.terraform.d/plugin-cache} && mkdir -p {dir}
#Related tools|أدوات مرتبطة
2§tflint§tflint§tflint {*}§--init|Install plugins|تثبيت الإضافات¶--recursive|Recursive|متداخل¶-f {fmt=@default,json,sarif}|Format|الصيغة
2§tfsec / trivy config§فحص أمني§tfsec {*} {dir=.}§--minimum-severity {sev=@MEDIUM,LOW,HIGH,CRITICAL}|Min severity|أقل خطورة¶--format {fmt=@default,json,sarif}|Format|الصيغة
2§Checkov§Checkov§checkov -d {dir=.} {*}§--framework terraform|Terraform only|Terraform فقط¶--quiet|Quiet|صامت¶--compact|Compact|مختصر
2§terraform-docs§terraform-docs§terraform-docs {fmt=@markdown table,json,yaml} {dir=.} {*}§--output-file README.md|Write file|كتابة ملف¶--output-mode inject|Inject|حقن
2§Infracost§Infracost§infracost breakdown --path {dir=.} {*}§--format {fmt=@table,json,html}|Format|الصيغة
3§Terragrunt§Terragrunt§terragrunt {mode=@run-all plan,run-all apply,plan,apply,init,validate-inputs,graph-dependencies} {*}§--terragrunt-non-interactive|Non-interactive|بدون أسئلة¶--terragrunt-working-dir {dir=.}|Working dir|مجلد العمل
2§OpenTofu equivalents§مقابلات OpenTofu§tofu {cmd=@init,plan,apply,destroy,validate,fmt,state list,output} {*}§-auto-approve|Auto approve|موافقة تلقائية
`);

T(["jenkins","🤵","Jenkins|جنكنز","Server install, CLI, REST API, pipelines, agents, backup and troubleshooting|التثبيت و CLI و REST API وخطوط الـ pipelines والـ agents والنسخ الاحتياطي وحل المشاكل","cicd","all",[["Install Jenkins (LTS)","تثبيت Jenkins","sudo apt update && sudo apt install -y fontconfig openjdk-21-jre && sudo wget -O /etc/apt/keyrings/jenkins-keyring.asc https://pkg.jenkins.io/debian-stable/jenkins.io-2026.key && echo \"deb [signed-by=/etc/apt/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/\" | sudo tee /etc/apt/sources.list.d/jenkins.list && sudo apt update && sudo apt install -y jenkins && sudo systemctl enable --now jenkins","sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/rpm-stable/jenkins.repo && sudo rpm --import https://pkg.jenkins.io/rpm-stable/jenkins.io-2026.key && sudo dnf install -y fontconfig java-21-openjdk jenkins && sudo systemctl daemon-reload && sudo systemctl enable --now jenkins"],["Initial admin password","كلمة المرور الأولى","sudo cat /var/lib/jenkins/secrets/initialAdminPassword","sudo cat /var/lib/jenkins/secrets/initialAdminPassword"],["Open firewall 8080","فتح المنفذ 8080","sudo ufw allow 8080/tcp","sudo firewall-cmd --permanent --add-port=8080/tcp && sudo firewall-cmd --reload"],["Jenkins in Docker","Jenkins في Docker","docker run -d --name jenkins -p 8080:8080 -p 50000:50000 -v jenkins_home:/var/jenkins_home jenkins/jenkins:lts","docker run -d --name jenkins -p 8080:8080 -p 50000:50000 -v jenkins_home:/var/jenkins_home jenkins/jenkins:lts"]]],`
#Service & files|الخدمة والملفات
1§Service control§التحكم بالخدمة§systemctl {mode=@status,start,stop,restart,enable --now,disable} jenkins
1§Live logs§السجلات الحية§journalctl -u jenkins {*}§-f|Follow|متابعة¶-n {n=200}|Last N|آخر N¶--since '{since=1 hour ago}'|Since|منذ
1§Log file§ملف السجل§tail {*} /var/log/jenkins/jenkins.log§-f|Follow|متابعة¶-n {n=200}|Last N|آخر N
2§Change HTTP port§تغيير المنفذ§systemctl edit jenkins   # [Service] Environment="JENKINS_PORT={port=9090}"
2§Java options (memory)§خيارات Java§systemctl edit jenkins   # [Service] Environment="JAVA_OPTS=-Xmx{mem=2g} -Djava.awt.headless=true"
2§Jenkins home§مجلد jenkins§ls -la /var/lib/jenkins/ && du -sh /var/lib/jenkins/*
2§Backup JENKINS_HOME§نسخ احتياطي§tar czf {file=jenkins-backup.tgz} {*} /var/lib/jenkins§--exclude=workspace|Skip workspaces|بدون workspace¶--exclude=caches|Skip caches|بدون caches¶--exclude=builds|Skip build history|بدون سجل البناء
2§Restore backup§استرجاع§systemctl stop jenkins && tar xzf {file=jenkins-backup.tgz} -C / && chown -R jenkins:jenkins /var/lib/jenkins && systemctl start jenkins
2§Installed version§الإصدار§java -jar /usr/share/java/jenkins.war --version
2§Update Jenkins§تحديث Jenkins§apt update && apt install --only-upgrade -y jenkins
2§Disable setup wizard§تعطيل معالج الإعداد§systemctl edit jenkins   # Environment="JAVA_OPTS=-Djenkins.install.runSetupWizard=false"
#Jenkins CLI|Jenkins CLI
1§Download CLI jar§تحميل CLI§wget {*} {url=http://localhost:8080}/jnlpJars/jenkins-cli.jar§-O {file=jenkins-cli.jar}|Output|الإخراج
1§CLI command§أمر CLI§java -jar {jar=jenkins-cli.jar} -s {url=http://localhost:8080}/ -auth {user=admin}:{token=APITOKEN} {cmd=@who-am-i,version,list-jobs,list-plugins,help,get-node,list-credentials,quiet-down,cancel-quiet-down,safe-restart,reload-configuration,clear-queue}
1§Build a job§بناء job§java -jar {jar=jenkins-cli.jar} -s {url=http://localhost:8080}/ -auth {user=admin}:{token=APITOKEN} build {job=my-job} {*}§-s|Wait for start|انتظار البدء¶-v|Show output|إظهار الإخراج¶-f|Follow|متابعة¶-p {param=ENV=prod}|Parameter|بارامتر¶-w|Wait complete|انتظار الاكتمال
2§Create / get / delete job§إدارة job§java -jar {jar=jenkins-cli.jar} -s {url=http://localhost:8080}/ -auth {user=admin}:{token=APITOKEN} {mode=@create-job my-job < job.xml,get-job my-job > job.xml,update-job my-job < job.xml,delete-job my-job,enable-job my-job,disable-job my-job,copy-job my-job new-job}
2§Install plugin§تثبيت plugin§java -jar {jar=jenkins-cli.jar} -s {url=http://localhost:8080}/ -auth {user=admin}:{token=APITOKEN} install-plugin {plugin=git workflow-aggregator docker-workflow} {*}§-deploy|Deploy now|تفعيل فوراً¶-restart|Restart after|إعادة تشغيل بعدها
2§Console output§ناتج الكونسول§java -jar {jar=jenkins-cli.jar} -s {url=http://localhost:8080}/ -auth {user=admin}:{token=APITOKEN} console {job=my-job} {*}§-f|Follow|متابعة¶-n {n=100}|Last N lines|آخر N سطر
3§Run Groovy script§تشغيل Groovy§java -jar {jar=jenkins-cli.jar} -s {url=http://localhost:8080}/ -auth {user=admin}:{token=APITOKEN} groovy = < {file=script.groovy}
3§Lint Jenkinsfile§فحص Jenkinsfile§java -jar {jar=jenkins-cli.jar} -s {url=http://localhost:8080}/ -auth {user=admin}:{token=APITOKEN} declarative-linter < {file=Jenkinsfile}
3§Plugin Manager Tool§أداة الـ plugins§jenkins-plugin-cli {*} --plugins {plugins=git:latest workflow-aggregator:latest}§--plugin-file {file=plugins.txt}|From file|من ملف¶--verbose|Verbose|تفصيل¶--latest true|Latest|الأحدث
#REST API|REST API
1§Trigger build§تشغيل بناء§curl -X POST -u {user=admin}:{token=APITOKEN} {*} {url=http://localhost:8080}/job/{job=my-job}/build§--data-urlencode json='{}'|With JSON|مع JSON¶-v|Verbose|تفصيل
1§Build with parameters§بناء ببارامترات§curl -X POST -u {user=admin}:{token=APITOKEN} '{url=http://localhost:8080}/job/{job=my-job}/buildWithParameters?{params=ENV=prod&VERSION=1.0}'
2§Last build result§نتيجة آخر بناء§curl -s -u {user=admin}:{token=APITOKEN} {url=http://localhost:8080}/job/{job=my-job}/lastBuild/api/json | jq '{result,number,building,duration,url}'
2§Console text§نص الكونسول§curl -s -u {user=admin}:{token=APITOKEN} {url=http://localhost:8080}/job/{job=my-job}/{build=lastBuild}/consoleText
2§Queue status§حالة الطابور§curl -s -u {user=admin}:{token=APITOKEN} {url=http://localhost:8080}/queue/api/json | jq '.items[].why'
2§Get CSRF crumb§الحصول على crumb§curl -s -u {user=admin}:{token=APITOKEN} '{url=http://localhost:8080}/crumbIssuer/api/json'
2§List all jobs§كل الـ jobs§curl -s -u {user=admin}:{token=APITOKEN} '{url=http://localhost:8080}/api/json?tree=jobs[name,color]' | jq -r '.jobs[]|"\\(.name) \\(.color)"'
2§Stop a build§إيقاف بناء§curl -X POST -u {user=admin}:{token=APITOKEN} {url=http://localhost:8080}/job/{job=my-job}/{build=1}/stop
2§Restart Jenkins§إعادة تشغيل§curl -X POST -u {user=admin}:{token=APITOKEN} {url=http://localhost:8080}/{mode=@safeRestart,restart,quietDown,cancelQuietDown}
2§Reload configuration§إعادة تحميل الإعداد§curl -X POST -u {user=admin}:{token=APITOKEN} {url=http://localhost:8080}/reload
#Agents|الـ Agents
2§Start inbound agent§تشغيل agent§java -jar agent.jar -url {url=http://localhost:8080}/ -secret {secret} -name {node=agent1} -webSocket {*}§-workDir {dir=/home/jenkins}|Work dir|مجلد العمل
2§Agent as systemd service§agent كخدمة§printf '[Unit]\\nDescription=Jenkins Agent\\nAfter=network.target\\n[Service]\\nUser={user=jenkins}\\nExecStart=/usr/bin/java -jar /opt/agent.jar -url {url=http://localhost:8080}/ -secret {secret} -name {node=agent1} -webSocket -workDir /home/{user}\\nRestart=always\\n[Install]\\nWantedBy=multi-user.target\\n' > /etc/systemd/system/jenkins-agent.service && systemctl enable --now jenkins-agent
2§Add Jenkins user to docker§إضافة jenkins لـ docker§usermod -aG docker jenkins && systemctl restart jenkins
2§Give jenkins sudo (no password)§sudo لـ jenkins§echo 'jenkins ALL=(ALL) NOPASSWD:ALL' > /etc/sudoers.d/jenkins && chmod 440 /etc/sudoers.d/jenkins
#Reverse proxy & TLS|البروكسي و TLS
2§Nginx reverse proxy§بروكسي Nginx§certbot --nginx -d {domain=jenkins.example.com} && nginx -t && systemctl reload nginx
3§Run Jenkins on HTTPS directly§HTTPS مباشر§systemctl edit jenkins   # Environment="JENKINS_HTTPS_PORT=8443" "JENKINS_HTTPS_KEYSTORE={ks=/etc/jenkins/jenkins.jks}"
3§Create keystore§إنشاء keystore§keytool -genkey -keyalg RSA -alias jenkins -keystore {file=jenkins.jks} -storepass {password} -keysize 2048 -validity 365
#Pipeline syntax reference|مرجع صياغة الـ Pipeline
2§Declarative skeleton§هيكل Declarative§echo 'pipeline { agent any; stages { stage("Build") { steps { sh "make build" } } stage("Test") { steps { sh "make test" } } } }'
2§Shared library import§استيراد مكتبة مشتركة§echo '@Library("{lib=my-shared-lib}@{ver=main}") _'
2§Credentials in pipeline§الأسرار في الـ pipeline§echo 'withCredentials([string(credentialsId: "{id=my-secret}", variable: "TOKEN")]) { sh "echo using token" }'
`);

T(["monitor","📈","Monitoring & Logging|المراقبة والسجلات","Prometheus, Grafana, Alertmanager, Loki, ELK, exporters|Prometheus و Grafana و Alertmanager و Loki و ELK والـ exporters","mon","all",[["Install Prometheus stack","تثبيت Prometheus","sudo apt install -y prometheus prometheus-node-exporter prometheus-alertmanager grafana","sudo dnf install -y golang-github-prometheus golang-github-prometheus-node-exporter"],["Run Prometheus + Grafana in Docker","تشغيلها بـ Docker","docker run -d -p 9090:9090 --name prometheus prom/prometheus && docker run -d -p 3000:3000 --name grafana grafana/grafana","docker run -d -p 9090:9090 --name prometheus prom/prometheus && docker run -d -p 3000:3000 --name grafana grafana/grafana"]]],`
#Prometheus|Prometheus
1§Check config§فحص الإعداد§promtool check config {file=prometheus.yml}
1§Check rules§فحص القواعد§promtool check rules {file=alerts.yml}
2§Reload config§إعادة تحميل الإعداد§curl -X POST {url=http://localhost:9090}/-/reload
2§Run Prometheus§تشغيل Prometheus§prometheus --config.file={file=prometheus.yml} {*}§--storage.tsdb.retention.time={ret=15d}|Retention|مدة الاحتفاظ¶--web.listen-address={addr=:9090}|Listen|عنوان الاستماع¶--web.enable-lifecycle|Enable reload API|تفعيل API الـ reload¶--storage.tsdb.path={dir=./data}|Data path|مسار البيانات
2§Instant query via API§استعلام عبر API§curl -s '{url=http://localhost:9090}/api/v1/query' --data-urlencode 'query={q=up}' | jq .
2§Range query via API§استعلام نطاق§curl -s '{url=http://localhost:9090}/api/v1/query_range' --data-urlencode 'query={q=rate(http_requests_total[5m])}' --data-urlencode 'start={start=2026-01-01T00:00:00Z}' --data-urlencode 'end={end=2026-01-01T01:00:00Z}' --data-urlencode 'step={step=60}'
2§Targets status§حالة الأهداف§curl -s {url=http://localhost:9090}/api/v1/targets | jq '.data.activeTargets[] | {job:.labels.job, health:.health, url:.scrapeUrl}'
2§Query with promtool§استعلام بـ promtool§promtool query instant {url=http://localhost:9090} '{q=up}'
3§TSDB analyze§تحليل TSDB§promtool tsdb analyze {dir=./data}
3§Create TSDB snapshot§لقطة TSDB§curl -X POST {url=http://localhost:9090}/api/v1/admin/tsdb/snapshot
2§Useful PromQL: CPU %§PromQL: المعالج§echo '100 - (avg by(instance)(rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)'
2§Useful PromQL: memory %§PromQL: الذاكرة§echo '(1 - node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes) * 100'
2§Useful PromQL: disk %§PromQL: القرص§echo '(1 - node_filesystem_avail_bytes{fstype!~"tmpfs|overlay"} / node_filesystem_size_bytes) * 100'
2§Useful PromQL: request rate§PromQL: معدل الطلبات§echo 'sum by(job)(rate(http_requests_total[5m]))'
#Exporters|الـ Exporters
1§Node exporter metrics§مقاييس node exporter§curl -s {url=http://localhost:9100}/metrics {*}§| grep {filter=node_load}|Filter|تصفية
2§Install node exporter manually§تثبيت node exporter§curl -LO https://github.com/prometheus/node_exporter/releases/download/v{ver=1.8.2}/node_exporter-{ver}.linux-amd64.tar.gz && tar xzf node_exporter-{ver}.linux-amd64.tar.gz && sudo mv node_exporter-{ver}.linux-amd64/node_exporter /usr/local/bin/
2§cAdvisor§cAdvisor§docker run -d --name cadvisor -p {port=8081}:8080 -v /:/rootfs:ro -v /var/run:/var/run:ro -v /sys:/sys:ro -v /var/lib/docker/:/var/lib/docker:ro gcr.io/cadvisor/cadvisor
2§Blackbox probe§فحص Blackbox§curl -s '{url=http://localhost:9115}/probe?target={target=https://example.com}&module={module=http_2xx}'
#Alertmanager|Alertmanager
2§Check config§فحص الإعداد§amtool check-config {file=alertmanager.yml}
2§Active alerts§التنبيهات النشطة§amtool alert {*} --alertmanager.url={url=http://localhost:9093}§-o extended|Extended|موسع¶-q|Query|استعلام
2§Create silence§إنشاء silence§amtool silence add {matcher=alertname=HighCPU} --duration={d=2h} --comment='{comment=maintenance}' --alertmanager.url={url=http://localhost:9093}
2§List / expire silences§إدارة الـ silences§amtool silence {mode=@query,expire ID} --alertmanager.url={url=http://localhost:9093}
#Grafana|Grafana
2§Service§الخدمة§systemctl {mode=@status,restart,enable --now} grafana-server
2§Reset admin password§تصفير كلمة admin§grafana-cli admin reset-admin-password {password}
2§Plugins§الإضافات§grafana-cli plugins {mode=@list-remote,ls,install grafana-piechart-panel,update-all,uninstall NAME}
2§Create API token (service account)§توكن API§curl -s -X POST -H 'Content-Type: application/json' -u {user=admin}:{password=admin} {url=http://localhost:3000}/api/serviceaccounts -d '{"name":"ci","role":"Editor"}'
2§Export dashboard§تصدير dashboard§curl -s -H 'Authorization: Bearer {token}' {url=http://localhost:3000}/api/dashboards/uid/{uid} | jq .dashboard > {out=dashboard.json}
#Loki & ELK|Loki و ELK
2§Query Loki§استعلام Loki§logcli query '{q={app="web"}}' {*}§--addr={addr=http://localhost:3100}|Address|العنوان¶--since={since=1h}|Since|منذ¶--limit={n=100}|Limit|الحد¶-o raw|Raw|خام
2§Check Promtail config§فحص Promtail§promtail -config.file={file=promtail.yml} {*}§-dry-run|Dry run|تجربة
2§Elasticsearch health§صحة Elasticsearch§curl -s {url=http://localhost:9200}/_cluster/health?pretty
2§List indices§الفهارس§curl -s '{url=http://localhost:9200}/_cat/indices?v&s=store.size:desc'
2§Search Elasticsearch§بحث§curl -s -H 'Content-Type: application/json' {url=http://localhost:9200}/{index=my-index}/_search?pretty -d '{"query":{"match":{"message":"{text=error}"}}}'
2§Delete old index§حذف فهرس§curl -s -X DELETE {url=http://localhost:9200}/{index=my-index}
2§Filebeat§Filebeat§filebeat {mode=@test config,test output,modules list,setup} {*}§-e|Log to stderr|السجل للشاشة
2§Logstash pipeline test§اختبار Logstash§logstash -f {file=pipeline.conf} {*}§--config.test_and_exit|Test config|فحص الإعداد¶--config.reload.automatic|Auto reload|إعادة تحميل تلقائية
2§Fluent Bit§Fluent Bit§fluent-bit -c {file=fluent-bit.conf} {*}§--dry-run|Dry run|تجربة
2§Zabbix agent§Zabbix agent§zabbix_agentd {*} -t {key=system.cpu.load}§-c {file=/etc/zabbix/zabbix_agentd.conf}|Config|الإعداد
2§Netdata install§تثبيت Netdata§curl -fsSL https://get.netdata.cloud/kickstart.sh | sh
`);

T(["cloud","☁️","Cloud CLIs (AWS · Azure · GCP)|أدوات السحابة (AWS و Azure و GCP)","Core commands for the three major clouds|الأوامر الأساسية للسحابات الكبرى","cloud","all",[["Install AWS CLI v2","تثبيت AWS CLI","curl 'https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip' -o awscliv2.zip && unzip -q awscliv2.zip && sudo ./aws/install","curl 'https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip' -o awscliv2.zip && unzip -q awscliv2.zip && sudo ./aws/install"],["Install Azure CLI","تثبيت Azure CLI","curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash","sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc && sudo dnf install -y https://packages.microsoft.com/config/rhel/9/packages-microsoft-prod.rpm && sudo dnf install -y azure-cli"],["Install gcloud CLI","تثبيت gcloud","curl -sSL https://sdk.cloud.google.com | bash","curl -sSL https://sdk.cloud.google.com | bash"]]],`
#AWS — setup & identity|AWS — الإعداد والهوية
1§Configure credentials§ضبط الاعتماد§aws configure {*}§--profile {profile=default}|Profile|البروفايل¶sso|SSO|SSO¶list|Show config|عرض الإعداد
1§Who am I§من أنا§aws sts get-caller-identity {*}§--profile {profile=default}|Profile|البروفايل
2§SSO login§دخول SSO§aws sso login --profile {profile=default}
2§Use profile / region§تحديد البروفايل والمنطقة§export AWS_PROFILE={profile=default} AWS_DEFAULT_REGION={region=us-east-1}
#AWS — compute & storage|AWS — الحوسبة والتخزين
1§List EC2 instances§عرض سيرفرات EC2§aws ec2 describe-instances --query 'Reservations[].Instances[].[InstanceId,State.Name,InstanceType,PublicIpAddress]' --output {out=@table,json,text} {*}§--region {region=us-east-1}|Region|المنطقة¶--filters Name=instance-state-name,Values=running|Running only|العاملة فقط
2§Launch instance§تشغيل سيرفر§aws ec2 run-instances --image-id {ami=ami-0abcdef1234567890} --instance-type {type=t3.micro} --key-name {key=mykey} {*}§--count {n=1}|Count|العدد¶--security-group-ids {sg=sg-123}|Security group|مجموعة الأمان¶--subnet-id {subnet=subnet-123}|Subnet|الشبكة الفرعية¶--user-data file://{file=init.sh}|User data|بيانات التشغيل¶--tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=web}]'|Tag Name|وسم الاسم
2§Start / stop / terminate§تشغيل / إيقاف / حذف§aws ec2 {mode=@start-instances,stop-instances,reboot-instances,terminate-instances} --instance-ids {id=i-0123456789abcdef0}
2§Security group rule§قاعدة مجموعة أمان§aws ec2 authorize-security-group-ingress --group-id {sg=sg-123} --protocol tcp --port {port=22} --cidr {cidr=0.0.0.0/0}
1§S3 list§عرض S3§aws s3 ls {*} {path?}§--recursive|Recursive|متداخل¶--human-readable|Human sizes|أحجام مقروءة¶--summarize|Summary|ملخص
1§S3 copy§نسخ S3§aws s3 cp {src} {dst} {*}§--recursive|Recursive|متداخل¶--acl {acl=private}|ACL|الصلاحية¶--exclude '{pattern=*.tmp}'|Exclude|استبعاد¶--storage-class {class=STANDARD_IA}|Storage class|فئة التخزين
1§S3 sync§مزامنة S3§aws s3 sync {src=./dir} {dst=s3://my-bucket/dir} {*}§--delete|Delete extra|حذف الزائد¶--exclude '{pattern=*.log}'|Exclude|استبعاد¶--dryrun|Dry run|تجربة
2§S3 bucket ops§عمليات الـ bucket§aws s3 {mode=@mb s3://my-bucket,rb s3://my-bucket --force,presign s3://my-bucket/file --expires-in 3600}
2§ECR login§دخول ECR§aws ecr get-login-password --region {region=us-east-1} | docker login --username AWS --password-stdin {account=123456789012}.dkr.ecr.{region}.amazonaws.com
2§EKS kubeconfig§kubeconfig لـ EKS§aws eks update-kubeconfig --name {cluster=my-cluster} --region {region=us-east-1}
2§Lambda invoke§تشغيل Lambda§aws lambda invoke --function-name {fn=my-func} {*} {out=out.json}§--payload '{"key":"value"}' --cli-binary-format raw-in-base64-out|Payload|البيانات
2§CloudFormation deploy§نشر CloudFormation§aws cloudformation deploy --template-file {file=template.yaml} --stack-name {stack=my-stack} {*}§--capabilities CAPABILITY_IAM|Allow IAM|السماح بـ IAM¶--parameter-overrides {kv=Env=prod}|Parameters|البارامترات
2§Tail CloudWatch logs§متابعة CloudWatch§aws logs tail {group=/aws/lambda/my-func} {*}§--follow|Follow|متابعة¶--since {since=1h}|Since|منذ¶--filter-pattern '{pattern=ERROR}'|Filter|تصفية
2§SSM session§جلسة SSM§aws ssm start-session --target {id=i-0123456789abcdef0}
2§IAM users / keys§المستخدمون والمفاتيح§aws iam {mode=@list-users,list-roles,list-access-keys,list-policies --scope Local}
2§Route53 records§سجلات Route53§aws route53 list-resource-record-sets --hosted-zone-id {zone=Z123}
2§RDS instances§قواعد RDS§aws rds describe-db-instances --query 'DBInstances[].[DBInstanceIdentifier,DBInstanceStatus,Engine]' --output table
#Azure|Azure
1§Login§تسجيل الدخول§az login {*}§--use-device-code|Device code|رمز الجهاز¶--tenant {tenant}|Tenant|المستأجر¶--service-principal -u {appid} -p {secret}|Service principal|Service principal
1§Subscriptions§الاشتراكات§az account {mode=@list -o table,show,set --subscription SUB_ID}
1§Resource group§مجموعة الموارد§az group {mode=@list -o table,create -n myrg -l westeurope,delete -n myrg --yes} 
2§Create VM§إنشاء VM§az vm create -g {rg=myrg} -n {name=myvm} --image {image=Ubuntu2204} --size {size=Standard_B2s} {*}§--admin-username {user=azureuser}|Admin user|المستخدم¶--generate-ssh-keys|Generate SSH keys|توليد مفاتيح SSH¶--public-ip-sku Standard|Standard IP|IP قياسي¶--location {loc=westeurope}|Location|الموقع
2§VM list / start / stop§إدارة الـ VMs§az vm {mode=@list -d -o table,start -g myrg -n myvm,stop -g myrg -n myvm,deallocate -g myrg -n myvm,delete -g myrg -n myvm --yes}
2§AKS credentials§بيانات AKS§az aks get-credentials -g {rg=myrg} -n {cluster=my-aks} {*}§--overwrite-existing|Overwrite|الكتابة فوق
2§AKS create / scale§إنشاء وتوسيع AKS§az aks {mode=@create -g myrg -n my-aks --node-count 3 --generate-ssh-keys,scale -g myrg -n my-aks --node-count 5,upgrade -g myrg -n my-aks --kubernetes-version 1.30.0}
2§ACR login / build§ACR§az acr {mode=@login -n myacr,build -t app:1 -r myacr .,repository list -n myacr}
2§Storage account§حساب التخزين§az storage {mode=@account list -o table,container list --account-name myacct,blob list -c mycontainer --account-name myacct}
2§Open port on VM§فتح منفذ§az vm open-port -g {rg=myrg} -n {name=myvm} --port {port=80}
2§Key Vault secret§سر في Key Vault§az keyvault secret {mode=@set --vault-name myvault --name mysecret --value 'v',show --vault-name myvault --name mysecret,list --vault-name myvault}
#Google Cloud|Google Cloud
1§Login & project§الدخول والمشروع§gcloud {mode=@auth login,auth application-default login,config set project my-project,config list,projects list,info}
2§Compute instances§سيرفرات Compute§gcloud compute instances {mode=@list,create vm1 --zone=us-central1-a --machine-type=e2-medium --image-family=ubuntu-2204-lts --image-project=ubuntu-os-cloud,start vm1,stop vm1,delete vm1,ssh vm1 --zone=us-central1-a} {*}§--zone={zone=us-central1-a}|Zone|المنطقة
2§GKE credentials§بيانات GKE§gcloud container clusters get-credentials {cluster=my-gke} --zone {zone=us-central1-a} --project {project=my-project}
2§GKE create cluster§إنشاء عنقود GKE§gcloud container clusters create {cluster=my-gke} --num-nodes {n=3} --zone {zone=us-central1-a} {*}§--machine-type {type=e2-standard-4}|Machine type|نوع الجهاز¶--enable-autoscaling --min-nodes 1 --max-nodes 5|Autoscaling|توسع تلقائي
2§Cloud Storage§Cloud Storage§gsutil {mode=@ls,cp file gs://bucket/,rsync -r ./dir gs://bucket/dir,mb gs://my-bucket,rm -r gs://my-bucket/dir}
2§Cloud Run deploy§نشر Cloud Run§gcloud run deploy {svc=my-service} --image {image=gcr.io/my-project/app} --region {region=us-central1} {*}§--allow-unauthenticated|Public|عام¶--port {port=8080}|Port|المنفذ
2§IAM bindings§صلاحيات IAM§gcloud projects {mode=@get-iam-policy my-project,add-iam-policy-binding my-project --member=user:me@example.com --role=roles/viewer}
2§Logs§السجلات§gcloud logging read '{filter=severity>=ERROR}' --limit {n=20} {*}§--freshness={t=1h}|Freshness|الحداثة¶--format=json|JSON|JSON
#Other IaC / platform tools|أدوات أخرى
2§Pulumi§Pulumi§pulumi {mode=@up,preview,destroy,stack ls,stack init dev,config set key value,refresh} {*}§--yes|No prompt|بدون سؤال
2§DigitalOcean§DigitalOcean§doctl compute {mode=@droplet list,droplet create web --image ubuntu-22-04-x64 --size s-1vcpu-1gb --region fra1,domain list,ssh-key list}
`);

T(["web","🕸️","Web Servers & Databases|خوادم الويب وقواعد البيانات","Nginx, Apache, HAProxy, MySQL/MariaDB, PostgreSQL, MongoDB, Redis, queues|Nginx و Apache و HAProxy و MySQL و PostgreSQL و MongoDB و Redis والطوابير","web","all",[["Web stack","حزمة الويب","sudo apt install -y nginx apache2 haproxy","sudo dnf install -y nginx httpd haproxy"],["Databases","قواعد البيانات","sudo apt install -y mariadb-server postgresql redis-server","sudo dnf install -y mariadb-server postgresql-server redis && sudo postgresql-setup --initdb"]]],`
#Nginx|Nginx
1§Test config§فحص الإعداد§nginx {*} -t§-c {file=/etc/nginx/nginx.conf}|Config file|ملف الإعداد¶-T|Dump full config|عرض الإعداد كاملاً
1§Reload / reopen§إعادة تحميل§nginx -s {sig=@reload,reopen,stop,quit}
1§Service§الخدمة§systemctl {mode=@status,restart,reload,enable --now} nginx
2§Enable site (Debian)§تفعيل موقع (ديبيان)§ln -s /etc/nginx/sites-available/{site=example.conf} /etc/nginx/sites-enabled/ && nginx -t && systemctl reload nginx
2§Logs§السجلات§tail -f /var/log/nginx/{log=@access.log,error.log}
2§Top IPs in access log§أكثر الـ IPs§awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -rn | head -{n=10}
2§Status codes count§عدد أكواد الرد§awk '{print $9}' /var/log/nginx/access.log | sort | uniq -c | sort -rn
2§Version & modules§الإصدار والوحدات§nginx -V 2>&1 | tr ' ' '\\n' | grep -E 'with|version'
#Apache|Apache
1§Test config§فحص الإعداد§{bin=@apachectl,httpd} configtest
2§Enable / disable module (Debian)§تفعيل وحدة (ديبيان)§{cmd=@a2enmod,a2dismod,a2ensite,a2dissite,a2enconf,a2disconf} {name=rewrite} && systemctl reload apache2
2§Service§الخدمة§systemctl {mode=@status,restart,reload,enable --now} {svc=@apache2,httpd}
2§Loaded modules§الوحدات المحملة§{bin=@apachectl,httpd} -M
2§Virtual hosts§المضيفات الافتراضية§{bin=@apachectl,httpd} -S
2§Logs§السجلات§tail -f {file=@/var/log/apache2/error.log,/var/log/httpd/error_log}
2§Benchmark§اختبار الحمل§ab -n {n=1000} -c {c=50} {url=http://localhost/}
#HAProxy|HAProxy
2§Validate config§فحص الإعداد§haproxy -c -f {file=/etc/haproxy/haproxy.cfg}
2§Reload§إعادة تحميل§systemctl reload haproxy
2§Runtime stats socket§إحصائيات§echo 'show stat' | socat stdio /var/run/haproxy.sock | cut -d, -f1,2,18 | column -s, -t
#MySQL / MariaDB|MySQL و MariaDB
1§Secure installation§تأمين التثبيت§mysql_secure_installation
1§Connect§الاتصال§mysql {*}§-u {user=root}|User|المستخدم¶-p|Ask password|اسأل كلمة المرور¶-h {host=127.0.0.1}|Host|المضيف¶-P {port=3306}|Port|المنفذ¶-D {db=mydb}|Database|قاعدة البيانات¶-e '{sql=SHOW DATABASES;}'|Run SQL|تنفيذ SQL
2§Create database & user§إنشاء قاعدة ومستخدم§mysql -u root -p -e "CREATE DATABASE {db=mydb} CHARACTER SET utf8mb4; CREATE USER '{user=app}'@'{host=%}' IDENTIFIED BY '{password=ChangeMe}'; GRANT ALL ON {db}.* TO '{user}'@'{host}'; FLUSH PRIVILEGES;"
2§Dump database§نسخ قاعدة§mysqldump {*} -u {user=root} -p {db=mydb} > {file=backup.sql}§--single-transaction|Consistent (InnoDB)|متسق (InnoDB)¶--routines --triggers|With routines|مع الدوال¶--all-databases|All databases|كل القواعد¶--no-data|Schema only|الهيكل فقط
2§Restore dump§استرجاع§mysql -u {user=root} -p {db=mydb} < {file=backup.sql}
2§Show processes / status§العمليات والحالة§mysql -u root -p -e "{sql=@SHOW FULL PROCESSLIST,SHOW STATUS,SHOW VARIABLES,SHOW ENGINE INNODB STATUS\\G,SHOW SLAVE STATUS\\G};"
2§Check / repair tables§فحص وإصلاح§mysqlcheck -u root -p {*} {db=--all-databases}§--auto-repair|Auto repair|إصلاح تلقائي¶--optimize|Optimize|تحسين
2§Service§الخدمة§systemctl {mode=@status,restart,enable --now} {svc=@mariadb,mysql,mysqld}
#PostgreSQL|PostgreSQL
1§Connect (psql)§الاتصال§psql {*}§-U {user=postgres}|User|المستخدم¶-h {host=localhost}|Host|المضيف¶-p {port=5432}|Port|المنفذ¶-d {db=postgres}|Database|قاعدة البيانات¶-c '{sql=SELECT version();}'|Run SQL|تنفيذ SQL¶-f {file=script.sql}|Run file|تنفيذ ملف¶-W|Ask password|اسأل كلمة المرور
2§Switch to postgres user§التبديل لمستخدم postgres§sudo -u postgres psql
2§Create user & db§إنشاء مستخدم وقاعدة§sudo -u postgres psql -c "CREATE USER {user=app} WITH PASSWORD '{password=ChangeMe}';" -c "CREATE DATABASE {db=appdb} OWNER {user};"
2§psql meta-commands§أوامر psql الداخلية§echo '\\l databases · \\c db connect · \\dt tables · \\d+ table · \\du roles · \\dn schemas · \\df functions · \\x expanded · \\timing · \\q quit'
2§Dump database§نسخ قاعدة§pg_dump {*} -U {user=postgres} {db=mydb} > {file=backup.sql}§-Fc|Custom format|صيغة مخصصة¶-Fd -j {jobs=4}|Directory parallel|مجلد متوازي¶--schema-only|Schema only|الهيكل فقط¶--data-only|Data only|البيانات فقط¶-t {table=users}|One table|جدول واحد
2§Dump all databases§نسخ كل القواعد§pg_dumpall -U postgres > {file=all.sql}
2§Restore dump§استرجاع§{tool=@pg_restore -d mydb backup.dump,psql -d mydb -f backup.sql} -U {user=postgres}
2§Active queries§الاستعلامات النشطة§sudo -u postgres psql -c "SELECT pid,usename,state,now()-query_start AS age,left(query,80) FROM pg_stat_activity WHERE state<>'idle' ORDER BY age DESC;"
2§Database sizes§أحجام القواعد§sudo -u postgres psql -c "SELECT datname,pg_size_pretty(pg_database_size(datname)) FROM pg_database ORDER BY pg_database_size(datname) DESC;"
3§Allow remote connections§السماح بالاتصال البعيد§echo "host all all {cidr=10.0.0.0/24} scram-sha-256" | sudo tee -a /etc/postgresql/{ver=16}/main/pg_hba.conf && sudo systemctl reload postgresql
2§Vacuum / analyze§تنظيف وتحليل§vacuumdb -U postgres {*} {db=--all}§--analyze|Analyze|تحليل¶--full|Full|كامل¶--verbose|Verbose|تفصيل
2§Service§الخدمة§systemctl {mode=@status,restart,reload,enable --now} postgresql
#MongoDB & Redis|MongoDB و Redis
2§Mongo shell§شل Mongo§mongosh {*} {uri=mongodb://localhost:27017}§--eval '{js=db.stats()}'|Evaluate|تنفيذ¶-u {user}|User|المستخدم¶-p|Ask password|اسأل كلمة المرور
2§Mongo dump / restore§نسخ واسترجاع Mongo§{tool=@mongodump --out ./backup,mongorestore ./backup} --uri={uri=mongodb://localhost:27017}
1§Redis CLI§Redis CLI§redis-cli {*}§-h {host=127.0.0.1}|Host|المضيف¶-p {port=6379}|Port|المنفذ¶-a {password}|Password|كلمة المرور¶-n {db=0}|Database|القاعدة¶--scan --pattern '{pattern=*}'|Scan keys|فحص المفاتيح¶--latency|Latency|التأخير¶--bigkeys|Big keys|المفاتيح الكبيرة¶monitor|Monitor|مراقبة
2§Redis info§معلومات Redis§redis-cli info {section=@all,memory,stats,replication,clients,keyspace,persistence}
2§Redis save / flush§حفظ / مسح§redis-cli {cmd=@BGSAVE,SAVE,FLUSHDB,FLUSHALL,CONFIG REWRITE,PING,DBSIZE}
2§RabbitMQ§RabbitMQ§rabbitmqctl {mode=@status,list_queues,list_users,add_user USER PASS,list_vhosts,cluster_status}
2§Kafka topics§مواضيع Kafka§kafka-topics.sh --bootstrap-server {server=localhost:9092} {*}§--list|List|عرض¶--create --topic {topic=my-topic} --partitions {n=3} --replication-factor {r=1}|Create|إنشاء¶--describe --topic {topic=my-topic}|Describe|وصف¶--delete --topic {topic=my-topic}|Delete|حذف
`);

T(["cicd","🔁","CI/CD & DevOps Tools|أدوات CI/CD وأدوات DevOps","GitHub CLI, GitLab, Flux, Tekton, Packer, Kustomize, Skaffold, SonarQube, Nexus|GitHub CLI و GitLab و Flux و Tekton و Packer و Kustomize و Skaffold و SonarQube و Nexus","cicd","all",[["GitHub CLI","تثبيت GitHub CLI","sudo apt install -y gh","sudo dnf install -y gh"],["GitLab Runner","تثبيت GitLab Runner","curl -L https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.deb.sh | sudo bash && sudo apt install -y gitlab-runner","curl -L https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.rpm.sh | sudo bash && sudo dnf install -y gitlab-runner"],["Flux CLI","تثبيت Flux","curl -s https://fluxcd.io/install.sh | sudo bash","curl -s https://fluxcd.io/install.sh | sudo bash"],["Packer","تثبيت Packer","sudo apt install -y packer","sudo dnf install -y packer"]]],`
#GitHub CLI|GitHub CLI
1§Login§تسجيل الدخول§gh auth {mode=@login,status,logout,refresh,token}
1§Repo operations§عمليات المستودع§gh repo {mode=@clone OWNER/REPO,create my-repo --public --clone,fork --clone,view --web,list,delete OWNER/REPO --yes,sync}
1§Pull requests§الـ PRs§gh pr {mode=@create --fill,list,view --web,checkout 123,merge 123 --squash --delete-branch,review 123 --approve,checks 123,close 123,diff 123}
1§Issues§الـ Issues§gh issue {mode=@create --title 'Bug' --body 'details',list,view 1,close 1,comment 1 --body 'text'}
2§Workflows & runs§الـ workflows§gh {mode=@workflow list,workflow run ci.yml,run list,run watch,run view --log,run rerun --failed}
2§Secrets & variables§الأسرار والمتغيرات§gh {mode=@secret set NAME,secret list,variable set NAME --body value,variable list}
2§Releases§الإصدارات§gh release {mode=@create v1.0.0 --generate-notes,list,download v1.0.0,upload v1.0.0 file.zip,delete v1.0.0}
2§API call§استدعاء API§gh api {endpoint=repos/OWNER/REPO} {*}§--paginate|Paginate|كل الصفحات¶-X {method=POST}|Method|الطريقة¶-f {field=key=value}|Field|حقل¶--jq '{jq=.name}'|jq filter|فلتر jq
2§Run workflow locally (act)§تشغيل محلي (act)§act {*}§-j {job=build}|Job|الوظيفة¶-l|List|عرض¶-n|Dry run|تجربة¶--secret-file {file=.secrets}|Secrets file|ملف الأسرار
#GitLab|GitLab
2§Register runner§تسجيل runner§gitlab-runner register {*} --url {url=https://gitlab.com} --token {token}§--executor {exec=docker}|Executor|المنفذ¶--docker-image {image=alpine:latest}|Default image|الصورة الافتراضية¶--non-interactive|Non-interactive|بدون أسئلة¶--description '{desc=my-runner}'|Description|الوصف
2§Runner service§خدمة الـ runner§gitlab-runner {mode=@status,start,stop,restart,list,verify,unregister --all-runners}
2§Lint .gitlab-ci.yml§فحص ملف CI§glab ci lint {*}§{file=.gitlab-ci.yml}|File|الملف
2§glab CLI§glab§glab {mode=@auth login,mr create --fill,mr list,issue list,pipeline list,ci status,ci trace,repo clone GROUP/REPO}
2§Run a pipeline job locally§تشغيل job محلياً§gitlab-runner exec docker {job=build}
#Flux CD|Flux CD
2§Check cluster§فحص العنقود§flux check {*}§--pre|Pre-install checks|فحص قبل التثبيت
2§Bootstrap with GitHub§تهيئة مع GitHub§flux bootstrap github --owner={owner} --repository={repo=fleet-infra} --branch={branch=main} --path={path=clusters/prod} {*}§--personal|Personal repo|مستودع شخصي¶--private=false|Public repo|مستودع عام
2§Get resources§عرض الموارد§flux get {what=@all,sources git,kustomizations,helmreleases,sources helm} {*}§-A|All namespaces|كل النطاقات
2§Reconcile now§مزامنة الآن§flux reconcile {what=@source git,kustomization,helmrelease} {name} {*}§--with-source|With source|مع المصدر¶-n {ns=flux-system}|Namespace|النطاق
2§Create git source§إنشاء مصدر Git§flux create source git {name=app} --url={url=https://github.com/user/repo} --branch={branch=main} --interval={t=1m}
2§Create kustomization§إنشاء kustomization§flux create kustomization {name=app} --source=GitRepository/{src=app} --path={path=./k8s} --prune=true --interval={t=5m}
2§Suspend / resume§إيقاف / استكمال§flux {mode=@suspend,resume} {what=kustomization} {name}
2§Logs§السجلات§flux logs {*}§--follow|Follow|متابعة¶--level={lvl=error}|Level|المستوى¶--kind={kind=Kustomization}|Kind|النوع
3§Uninstall Flux§حذف Flux§flux uninstall --silent
#Tekton & Packer & more|Tekton و Packer وغيرها
2§Tekton pipelines§خطوط Tekton§tkn {mode=@pipeline list,pipeline start NAME --showlog,pipelinerun list,pipelinerun logs -f -L,task list,taskrun logs -f -L,clustertask list}
2§Packer build§بناء Packer§packer build {*} {template=.}§-var '{kv=region=us-east-1}'|Variable|متغير¶-var-file={file=vars.pkrvars.hcl}|Var file|ملف متغيرات¶-only='{only=amazon-ebs.ubuntu}'|Only source|مصدر محدد¶-force|Force|إجبار¶-on-error={mode=@ask,cleanup,abort}|On error|عند الخطأ
2§Packer init / validate / fmt§أوامر Packer§packer {mode=@init .,validate .,fmt .,inspect .} 
2§Kustomize§Kustomize§kustomize {mode=@build overlays/prod,edit set image app=app:2.0,edit add resource deployment.yaml,create --autodetect}
2§Skaffold§Skaffold§skaffold {mode=@dev,run,build,deploy,debug,delete,render,diagnose,init} {*}§-p {profile=dev}|Profile|البروفايل¶--port-forward|Port forward|تمرير المنافذ¶-n {ns=default}|Namespace|النطاق
2§Tilt§Tilt§tilt {mode=@up,down,ci,trigger NAME}
2§pre-commit hooks§hooks قبل الـ commit§pre-commit {mode=@install,run --all-files,autoupdate,uninstall}
2§Make targets§أهداف make§make {*} {target=build}§-j{jobs=4}|Parallel|متوازي¶-n|Dry run|تجربة¶-B|Force rebuild|إعادة بناء¶-C {dir=.}|Directory|المجلد¶VAR={val=value}|Variable|متغير
2§Semantic release§إصدار تلقائي§npx semantic-release {*}§--dry-run|Dry run|تجربة
#Artifacts & quality|الحزم والجودة
2§SonarQube (Docker)§SonarQube§docker run -d --name sonarqube -p {port=9000}:9000 sonarqube:community
2§SonarScanner§SonarScanner§sonar-scanner -Dsonar.projectKey={key=myproject} -Dsonar.sources={src=.} -Dsonar.host.url={url=http://localhost:9000} -Dsonar.token={token}
2§Nexus (Docker)§Nexus§docker run -d --name nexus -p {port=8081}:8081 -v nexus-data:/nexus-data sonatype/nexus3
2§Harbor registry§Harbor§./install.sh {*}§--with-trivy|Trivy scanner|فاحص Trivy¶--with-chartmuseum|Charts|الـ charts
2§Gitea (Docker)§Gitea§docker run -d --name gitea -p {port=3000}:3000 -p 2222:22 -v gitea:/data gitea/gitea
2§Trivy image scan§فحص صورة بـ Trivy§trivy image {*} {image=nginx:latest}§--severity HIGH,CRITICAL|High & critical|عالية وحرجة¶--ignore-unfixed|Ignore unfixed|تجاهل غير المصلح¶--exit-code 1|Fail on findings|فشل عند الوجود¶-f {fmt=@table,json,sarif}|Format|الصيغة¶-o {out=report.json}|Output|الإخراج
2§Trivy filesystem / config§فحص ملفات وإعدادات§trivy {mode=@fs,config,k8s,repo} {target=.}
2§Hadolint Dockerfile§فحص Dockerfile§hadolint {*} {file=Dockerfile}§--ignore {rule=DL3008}|Ignore rule|تجاهل قاعدة¶-f {fmt=@tty,json}|Format|الصيغة
2§yamllint / kubeconform§فحص YAML§{tool=@yamllint,kubeconform -strict -summary} {file=.}
`);

T(["virt","🖥️","Virtualization (KVM · Vagrant · LXC)|الأجهزة الافتراضية (KVM و Vagrant و LXC)","libvirt, QEMU, VirtualBox, Vagrant, cloud-init, LXD|libvirt و QEMU و VirtualBox و Vagrant و cloud-init و LXD","misc","all",[["Install KVM stack","تثبيت KVM","sudo apt install -y qemu-kvm libvirt-daemon-system libvirt-clients virtinst virt-manager bridge-utils && sudo usermod -aG libvirt,kvm $USER","sudo dnf install -y qemu-kvm libvirt virt-install virt-manager libguestfs-tools && sudo systemctl enable --now libvirtd && sudo usermod -aG libvirt $USER"],["Install Vagrant","تثبيت Vagrant","sudo apt install -y vagrant virtualbox","sudo dnf install -y vagrant VirtualBox"],["Check virtualization support","فحص دعم المحاكاة","egrep -c '(vmx|svm)' /proc/cpuinfo && lsmod | grep kvm","egrep -c '(vmx|svm)' /proc/cpuinfo && lsmod | grep kvm"]]],`
#virsh (libvirt)|virsh
1§List VMs§عرض الأجهزة§virsh list {*}§--all|All|الكل¶--inactive|Inactive|المتوقفة¶--name|Names only|الأسماء فقط
1§Start / shutdown / reboot§تشغيل / إيقاف§virsh {mode=@start,shutdown,reboot,destroy,suspend,resume,autostart} {vm}
1§VM info§معلومات الجهاز§virsh {mode=@dominfo,domiflist,domblklist,vcpuinfo,dumpxml,domifaddr} {vm}
1§Console§الكونسول§virsh console {vm}
2§Create VM§إنشاء جهاز§virt-install --name {name=vm1} --memory {mem=2048} --vcpus {cpus=2} --disk size={disk=20} --os-variant {os=ubuntu22.04} {*}§--cdrom {iso=/path/os.iso}|Install from ISO|تثبيت من ISO¶--location {url=http://archive.ubuntu.com/ubuntu/dists/jammy/main/installer-amd64/}|Install from URL|تثبيت من رابط¶--network bridge={br=br0}|Bridge network|شبكة bridge¶--graphics none --extra-args 'console=ttyS0'|Headless|بدون واجهة¶--import|Import existing disk|استيراد قرص موجود¶--cloud-init|Cloud-init|cloud-init
2§Edit / define / undefine§تعديل وتعريف وحذف§virsh {mode=@edit,define file.xml,undefine --remove-all-storage,setmem --size 4G --config,setvcpus --count 4 --config --maximum} {vm}
2§Snapshots§اللقطات§virsh snapshot-{mode=@create-as,list,revert,delete} {vm} {name?}
2§Clone VM§نسخ جهاز§virt-clone --original {vm} --name {new=vm-clone} --auto-clone
2§Networks & pools§الشبكات والمخازن§virsh {mode=@net-list --all,net-start default,net-autostart default,pool-list --all,vol-list default}
2§Attach disk§إضافة قرص§virsh attach-disk {vm} {src=/var/lib/libvirt/images/disk2.qcow2} {dev=vdb} --persistent
2§Live migrate§ترحيل مباشر§virsh migrate --live --verbose {vm} qemu+ssh://{host}/system
2§Disk image tools§أدوات صور الأقراص§qemu-img {mode=@create -f qcow2 disk.qcow2 20G,info disk.qcow2,resize disk.qcow2 +10G,convert -O qcow2 in.vmdk out.qcow2,snapshot -l disk.qcow2}
2§Edit guest filesystem§تعديل ملفات الضيف§virt-customize -a {img=disk.qcow2} {*}§--root-password password:{pw=secret}|Root password|كلمة مرور root¶--install {pkgs=qemu-guest-agent}|Install packages|تثبيت حزم¶--run-command '{cmd=systemctl enable ssh}'|Run command|تنفيذ أمر
#Vagrant|Vagrant
1§Init & up§تهيئة وتشغيل§vagrant init {box=ubuntu/jammy64} && vagrant up {*}§--provider={prov=@virtualbox,libvirt}|Provider|المزود¶--provision|Re-provision|إعادة التهيئة¶--no-provision|Skip provision|بدون تهيئة
1§Control machine§التحكم بالجهاز§vagrant {mode=@ssh,halt,reload,suspend,resume,destroy -f,status,global-status,provision,port,ssh-config} {name?}
2§Boxes§الـ boxes§vagrant box {mode=@list,add ubuntu/jammy64,remove ubuntu/jammy64,update,outdated,prune}
2§Snapshots§اللقطات§vagrant snapshot {mode=@save,restore,list,delete,push,pop} {name?}
2§Plugins§الإضافات§vagrant plugin {mode=@list,install vagrant-libvirt,uninstall vagrant-libvirt,update}
2§Validate Vagrantfile§فحص Vagrantfile§vagrant validate
#VirtualBox & cloud-init|VirtualBox و cloud-init
2§VBoxManage§VBoxManage§VBoxManage {mode=@list vms,list runningvms,startvm VM --type headless,controlvm VM poweroff,snapshot VM take snap1,showvminfo VM}
2§cloud-init status§حالة cloud-init§cloud-init {mode=@status --wait,clean --logs,schema --system,collect-logs}
2§cloud-init logs§سجلات cloud-init§tail -f /var/log/cloud-init-output.log
#LXC / LXD|LXC و LXD
2§LXD containers§حاويات LXD§lxc {mode=@launch ubuntu:22.04 c1,list,exec c1 -- bash,stop c1,delete c1 --force,snapshot c1 s1,config show c1,info c1}
2§Proxmox CLI§Proxmox§{cmd=@qm list,pct list,pvesm status,pvecm status,pvesh get /nodes,qm start 100,qm stop 100,pct enter 101}
`);

T(["bash","📜","Bash Scripting|برمجة Bash","Variables, conditions, loops, functions, error handling and script patterns|المتغيرات والشروط والحلقات والدوال ومعالجة الأخطاء وأنماط السكربتات","sys","all",[]],`
#Basics|الأساسيات
1§Shebang + strict mode§بداية السكربت§printf '#!/usr/bin/env bash\\nset -euo pipefail\\nIFS=$'"'"'\\n\\t'"'"'\\n' > {file=script.sh} && chmod +x {file}
1§Run a script§تشغيل سكربت§bash {*} {file=script.sh}§-x|Debug trace|تتبع للتصحيح¶-n|Syntax check only|فحص الصياغة فقط¶-e|Exit on error|توقف عند الخطأ¶-u|Error on unset var|خطأ عند متغير غير معرّف
1§Make executable§جعله قابلاً للتنفيذ§chmod +x {file=script.sh} && ./{file}
1§Lint a script§فحص سكربت§shellcheck {*} {file=script.sh}§-x|Follow sources|تتبع source¶-s {shell=bash}|Shell dialect|نوع الشل¶-f {fmt=@tty,json,gcc,diff}|Format|الصيغة
2§Format a script§تنسيق سكربت§shfmt {*} {file=script.sh}§-w|Write in place|كتابة في الملف¶-i {n=2}|Indent|المسافة¶-d|Show diff|إظهار الفروق
#Syntax cheat sheet|ملخص الصياغة
1§Variables§المتغيرات§echo 'NAME="world"; echo "Hello $NAME"; echo "\${NAME:-default}"; echo "\${#NAME}"; echo "\${NAME^^}"'
1§Read input§قراءة مدخلات§echo 'read -rp "Name: " NAME; read -rsp "Password: " PW'
1§Conditions§الشروط§echo 'if [[ -f file && $X -gt 3 ]]; then echo yes; elif [[ -z $Y ]]; then echo empty; else echo no; fi'
1§File tests§اختبارات الملفات§echo '-e exists · -f file · -d dir · -r readable · -w writable · -x executable · -s non-empty · -L symlink · -z empty string · -n non-empty string'
1§Number / string compare§مقارنة الأرقام والنصوص§echo 'numbers: -eq -ne -gt -ge -lt -le · strings: == != < > =~ (regex)'
1§For loop§حلقة for§echo 'for i in {1..5}; do echo $i; done; for f in *.log; do echo "$f"; done'
1§While loop§حلقة while§echo 'while read -r line; do echo "$line"; done < file.txt'
1§Case§case§echo 'case $1 in start) run;; stop) halt;; *) echo "usage";; esac'
1§Functions§الدوال§echo 'greet() { local name=$1; echo "Hi $name"; return 0; }; greet Bob'
2§Arrays§المصفوفات§echo 'arr=(a b c); echo \${arr[0]} \${arr[@]} \${#arr[@]}; arr+=(d); declare -A map=([k]=v); echo \${map[k]}'
2§Command substitution§تعويض الأمر§echo 'NOW=$(date +%F); COUNT=$(wc -l < file)'
2§Arithmetic§العمليات الحسابية§echo 'echo $((3+4*2)); ((i++)); let x=5*3'
2§Redirection§إعادة التوجيه§echo 'cmd > out; cmd >> out; cmd 2> err; cmd &> all; cmd 2>&1 | tee log; cmd < in; cmd <<< "string"'
2§Heredoc§Heredoc§echo "cat <<'EOF' > file.txt"; echo 'text with $literal'; echo EOF
2§Positional args§الوسائط§echo '$0 script · $1..$9 args · $# count · $@ all · $? exit code · $$ PID · $! last bg PID'
2§getopts§getopts§echo 'while getopts "a:bc" opt; do case $opt in a) A=$OPTARG;; b) B=1;; esac; done'
#Robust scripts|سكربتات متينة
2§Trap cleanup§التنظيف عند الخروج§echo 'cleanup() { rm -f "$TMP"; }; trap cleanup EXIT; TMP=$(mktemp)'
2§Error handler§معالج الأخطاء§echo 'trap '"'"'echo "Error on line $LINENO" >&2'"'"' ERR'
2§Logging function§دالة تسجيل§echo 'log() { printf "[%s] %s\\n" "$(date +%T)" "$*" >&2; }'
2§Check root§التأكد من root§echo '[ "$(id -u)" -eq 0 ] || { echo "Run as root" >&2; exit 1; }'
2§Require command§التأكد من وجود أمر§echo 'command -v docker >/dev/null || { echo "docker missing"; exit 1; }'
2§Detect distro family§اكتشاف نوع التوزيعة§echo '. /etc/os-release; case "$ID $ID_LIKE" in *debian*|*ubuntu*) PM=apt;; *rhel*|*fedora*|*centos*) PM=dnf;; esac'
2§Retry loop§إعادة المحاولة§echo 'for i in 1 2 3 4 5; do cmd && break || sleep $((i*2)); done'
2§Lock file (single instance)§قفل لمنع التشغيل المزدوج§echo 'exec 9>/var/lock/myscript.lock; flock -n 9 || { echo "already running"; exit 1; }'
2§Parallel jobs§مهام متوازية§echo 'for h in $(cat hosts); do ssh "$h" uptime & done; wait'
2§Debug mode§وضع التصحيح§echo 'set -x   # trace on · set +x   # off · PS4="+ \${BASH_SOURCE}:\${LINENO}: "'
2§Read config .env§قراءة ملف .env§echo 'set -a; source .env; set +a'
#Shell setup|إعداد الشل
1§Add to PATH§إضافة لـ PATH§echo 'export PATH="$HOME/bin:$PATH"' >> ~/.bashrc && source ~/.bashrc
2§Custom prompt§تخصيص الـ prompt§echo 'export PS1="\\u@\\h:\\w\\$ "' >> ~/.bashrc
2§Bash completion§الإكمال التلقائي§source /usr/share/bash-completion/bash_completion
2§Reload bashrc§إعادة تحميل bashrc§source ~/.bashrc
2§Useful shortcuts§اختصارات مفيدة§echo 'Ctrl+R history search · Ctrl+A/E line start/end · Ctrl+W delete word · Ctrl+L clear · Ctrl+C stop · Ctrl+Z suspend · !! last cmd · !$ last arg · Alt+. last arg'
`);
