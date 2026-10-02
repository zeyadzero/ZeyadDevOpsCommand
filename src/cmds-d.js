// ماكرو الخيارات المشتركة <<NAME>> وقوائم الاختيار @@NAME
window.MAC={
KNS:"-n {ns=default}|Namespace|النطاق (Namespace)¶-A|All namespaces|كل النطاقات¶--context {ctx=my-cluster}|Context|السياق",
KOUT:"-o wide|Wide|موسع¶-o yaml|YAML|YAML¶-o json|JSON|JSON¶-o name|Names only|الأسماء فقط¶-l {selector=app=web}|Label selector|محدد الوسوم¶--field-selector {fsel=status.phase=Running}|Field selector|محدد الحقول¶-w|Watch|مراقبة¶--show-labels|Show labels|إظهار الوسوم¶--sort-by={sortby=.metadata.creationTimestamp}|Sort by|ترتيب حسب¶--no-headers|No headers|بدون ترويسة",
KDRY:"--dry-run={mode=@client,server,none}|Dry run|تجربة بدون تنفيذ¶-o yaml|YAML output|إخراج YAML"};
window.OPTS={
RES:["pods","deployments","services","nodes","namespaces","configmaps","secrets","ingress","pv","pvc","statefulsets","daemonsets","jobs","cronjobs","replicasets","events","endpoints","hpa","networkpolicies","serviceaccounts","roles","rolebindings","clusterroles","clusterrolebindings","storageclasses","crd","all"],
OCRES:["pods","deployments","deploymentconfigs","services","routes","buildconfigs","builds","imagestreams","projects","nodes","configmaps","secrets","pvc","events","all"]};

T(["kubectl","☸️","Kubernetes (kubectl · kubeadm)|كوبرنيتس (kubectl و kubeadm)","Full cluster operations: workloads, networking, config, RBAC, nodes, debugging, cluster setup|إدارة العنقود كاملة: الأحمال والشبكات والإعدادات والصلاحيات والعقد والتشخيص وبناء العنقود","orch","all",[["Install kubectl","تثبيت kubectl","curl -LO \"https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl\" && sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl","curl -LO \"https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl\" && sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl"],["Install kubeadm + kubelet","تثبيت kubeadm و kubelet","sudo apt install -y kubelet kubeadm kubectl && sudo apt-mark hold kubelet kubeadm kubectl","sudo dnf install -y kubelet kubeadm kubectl --disableexcludes=kubernetes && sudo systemctl enable --now kubelet"],["Bash completion + alias","الإكمال التلقائي والاختصار","echo 'source <(kubectl completion bash); alias k=kubectl; complete -o default -F __start_kubectl k' >> ~/.bashrc && source ~/.bashrc","echo 'source <(kubectl completion bash); alias k=kubectl; complete -o default -F __start_kubectl k' >> ~/.bashrc && source ~/.bashrc"]]],`
#Cluster & context|العنقود والسياق
1§Cluster info§معلومات العنقود§kubectl cluster-info {*}§dump|Dump all|تفريغ كامل
1§Client/server version§الإصدارات§kubectl version {*}§--short|Short|مختصر¶-o yaml|YAML|YAML
1§List contexts§قائمة السياقات§kubectl config get-contexts
1§Switch context§تبديل السياق§kubectl config use-context {ctx=my-cluster}
1§Current context§السياق الحالي§kubectl config current-context
2§Set default namespace§ضبط الـ namespace الافتراضي§kubectl config set-context --current --namespace={ns=default}
2§Show kubeconfig§عرض kubeconfig§kubectl config view {*}§--minify|Current only|الحالي فقط¶--flatten|Flatten|دمج¶--raw|Raw (with secrets)|خام مع الأسرار
2§Merge kubeconfigs§دمج ملفات kubeconfig§KUBECONFIG={files=~/.kube/config:~/.kube/other} kubectl config view --flatten > {out=merged.yaml}
2§API resources§موارد الـ API§kubectl api-resources {*}§--namespaced=true|Namespaced|ضمن namespace¶--api-group={group=apps}|API group|مجموعة API¶-o wide|Wide|موسع
2§API versions§إصدارات الـ API§kubectl api-versions
2§Explain a field§شرح حقل§kubectl explain {path=pod.spec.containers} {*}§--recursive|Recursive|متداخل
#Get & describe|العرض والوصف
1§Get resources§عرض الموارد§kubectl get {res=@@RES} {*} {name?}§<<KNS>>¶<<KOUT>>
1§Describe resource§وصف مورد§kubectl describe {res=@@RES} {name} {*}§<<KNS>>
1§Get all in namespace§كل شيء في الـ namespace§kubectl get all {*}§<<KNS>>¶-o wide|Wide|موسع
1§Cluster events§أحداث العنقود§kubectl get events {*}§<<KNS>>¶--sort-by=.lastTimestamp|By time|بالوقت¶--field-selector type=Warning|Warnings only|التحذيرات فقط¶-w|Watch|مراقبة
2§Custom columns§أعمدة مخصصة§kubectl get pods -o custom-columns=NAME:.metadata.name,NODE:.spec.nodeName,STATUS:.status.phase {*}§<<KNS>>
2§Extract field (jsonpath)§استخراج حقل§kubectl get {res=pods} {name?} -o jsonpath='{.items[*].metadata.name}' {*}§<<KNS>>
2§Images used in cluster§الصور المستخدمة§kubectl get pods -A -o jsonpath='{.items[*].spec.containers[*].image}' | tr ' ' '\\n' | sort -u
2§Pods not running§الـ pods غير العاملة§kubectl get pods -A --field-selector=status.phase!=Running
2§Pods on a node§الـ pods على عقدة§kubectl get pods -A -o wide --field-selector spec.nodeName={node}
#Create & apply|الإنشاء والتطبيق
1§Apply manifest§تطبيق مانيفست§kubectl apply -f {file=manifest.yaml} {*}§<<KNS>>¶-R|Recursive dir|مجلد متداخل¶--prune -l {selector=app=web}|Prune|حذف الزائد¶--server-side|Server-side apply|تطبيق من الخادم¶--force|Force|إجبار¶<<KDRY>>
1§Apply directory / URL§تطبيق مجلد أو رابط§kubectl apply {mode=@-f,-k} {target=./k8s/} {*}§<<KNS>>
1§Create from manifest§إنشاء من مانيفست§kubectl create -f {file=manifest.yaml} {*}§<<KNS>>¶--save-config|Save config|حفظ الإعداد
1§Delete resource§حذف مورد§kubectl delete {res=@@RES} {name} {*}§<<KNS>>¶--force --grace-period=0|Force now|حذف فوري¶--all|All|الكل¶-l {selector=app=web}|By label|بالوسم¶--wait=false|Do not wait|بدون انتظار¶--cascade={mode=@background,foreground,orphan}|Cascade|الحذف المتسلسل
1§Delete by file§حذف عبر ملف§kubectl delete -f {file=manifest.yaml} {*}§<<KNS>>¶--ignore-not-found|Ignore missing|تجاهل غير الموجود
2§Replace resource§استبدال مورد§kubectl replace {*} -f {file=manifest.yaml}§--force|Delete & recreate|حذف وإعادة إنشاء
2§Edit live resource§تعديل مباشر§kubectl edit {res=deployment} {name} {*}§<<KNS>>
2§Patch resource§ترقيع مورد§kubectl patch {res=deployment} {name} {*} -p '{patch={"spec":{"replicas":2}}}'§<<KNS>>¶--type=merge|Merge patch|دمج¶--type=json|JSON patch|JSON patch
2§Diff before apply§مقارنة قبل التطبيق§kubectl diff -f {file=manifest.yaml} {*}§<<KNS>>
2§Wait for condition§انتظار حالة§kubectl wait {*} {res=pod/web}§--for=condition=Ready|Ready|جاهز¶--for=condition=Available|Available|متاح¶--for=delete|Deleted|محذوف¶--timeout={t=60s}|Timeout|المهلة¶<<KNS>>
2§Label resource§إضافة وسم§kubectl label {res=pod} {name} {label=env=prod} {*}§--overwrite|Overwrite|الكتابة فوق¶<<KNS>>
2§Annotate resource§إضافة annotation§kubectl annotate {res=pod} {name} {note=owner=team-a} {*}§--overwrite|Overwrite|الكتابة فوق¶<<KNS>>
#Workloads|أحمال العمل
1§Create deployment§إنشاء deployment§kubectl create deployment {name=web} --image={image=nginx} {*}§--replicas={n=3}|Replicas|النسخ¶--port={port=80}|Port|المنفذ¶<<KNS>>¶<<KDRY>>
1§Run a pod§تشغيل pod§kubectl run {name=tmp} --image={image=busybox} {*}§-it|Interactive|تفاعلي¶--rm|Remove on exit|حذف عند الخروج¶--restart=Never|No restart|بدون إعادة تشغيل¶--port={port=80}|Port|المنفذ¶--env={env=KEY=value}|Env|متغير¶--labels={labels=app=web}|Labels|وسوم¶<<KNS>>¶-- {cmd=sh}|Command|الأمر
1§Scale§تغيير عدد النسخ§kubectl scale {res=deployment/web} --replicas={n=3} {*}§<<KNS>>
2§Autoscale (HPA)§توسع تلقائي§kubectl autoscale deployment {name=web} --min={min=2} --max={max=10} --cpu-percent={cpu=70} {*}§<<KNS>>
1§Update image§تحديث الصورة§kubectl set image {res=deployment/web} {container=nginx}={image=nginx:1.27} {*}§<<KNS>>¶--record|Record|تسجيل
2§Set env vars§ضبط المتغيرات§kubectl set env {res=deployment/web} {env=KEY=value} {*}§<<KNS>>¶--from=configmap/{cm=app-config}|From ConfigMap|من ConfigMap¶--from=secret/{secret=app-secret}|From Secret|من Secret
2§Set resources§ضبط الموارد§kubectl set resources {res=deployment/web} {*}§--requests=cpu={cpu=100m},memory={mem=128Mi}|Requests|الطلب¶--limits=cpu={cpu=500m},memory={mem=256Mi}|Limits|الحد¶<<KNS>>
1§Rollout status§حالة النشر§kubectl rollout status {res=deployment/web} {*}§<<KNS>>¶--timeout={t=120s}|Timeout|المهلة
1§Rollout history§تاريخ النشر§kubectl rollout history {res=deployment/web} {*}§--revision={rev=2}|Revision|المراجعة¶<<KNS>>
1§Rollback§التراجع§kubectl rollout undo {res=deployment/web} {*}§--to-revision={rev=2}|To revision|إلى مراجعة¶<<KNS>>
1§Restart rollout§إعادة تشغيل النشر§kubectl rollout restart {res=deployment/web} {*}§<<KNS>>
2§Pause / resume rollout§إيقاف / استكمال النشر§kubectl rollout {mode=@pause,resume} {res=deployment/web} {*}§<<KNS>>
2§Expose as service§كشف كخدمة§kubectl expose {res=deployment/web} --port={port=80} {*}§--target-port={tport=8080}|Target port|منفذ الهدف¶--type={type=@ClusterIP,NodePort,LoadBalancer}|Type|النوع¶--name={name=web-svc}|Service name|اسم الخدمة¶<<KNS>>
2§Create job§إنشاء Job§kubectl create job {name=myjob} --image={image=busybox} {*}§--from=cronjob/{cj=mycron}|From CronJob|من CronJob¶<<KNS>>¶-- {cmd=echo hello}|Command|الأمر
2§Create CronJob§إنشاء CronJob§kubectl create cronjob {name=mycron} --image={image=busybox} --schedule='{sched=*/5 * * * *}' {*}§<<KNS>>¶-- {cmd=date}|Command|الأمر
2§Suspend CronJob§إيقاف CronJob§kubectl patch cronjob {name=mycron} -p '{"spec":{"suspend":{val=@true,false}}}' {*}§<<KNS>>
#Config & secrets|الإعدادات والأسرار
1§Create ConfigMap§إنشاء ConfigMap§kubectl create configmap {name=app-config} {*}§--from-literal={kv=KEY=value}|From literal|من قيمة¶--from-file={file=app.conf}|From file|من ملف¶--from-env-file={envfile=.env}|From env file|من ملف env¶<<KNS>>¶<<KDRY>>
1§Create generic secret§إنشاء Secret§kubectl create secret generic {name=app-secret} {*}§--from-literal={kv=password=changeme}|From literal|من قيمة¶--from-file={file=key.pem}|From file|من ملف¶--from-env-file={envfile=.env}|From env file|من ملف env¶<<KNS>>¶<<KDRY>>
2§Create TLS secret§إنشاء TLS Secret§kubectl create secret tls {name=web-tls} --cert={crt=tls.crt} --key={key=tls.key} {*}§<<KNS>>
2§Create registry secret§Secret للـ registry§kubectl create secret docker-registry {name=regcred} --docker-server={server=registry.example.com} --docker-username={user} --docker-password={password} {*}§--docker-email={email=me@example.com}|Email|البريد¶<<KNS>>
2§Decode secret value§فك قيمة Secret§kubectl get secret {name=app-secret} -o jsonpath='{.data.password}' {*}§<<KNS>>
2§Create namespace§إنشاء namespace§kubectl create namespace {ns=dev}
2§Resource quota§حصة الموارد§kubectl create quota {name=team-quota} --hard=cpu={cpu=4},memory={mem=8Gi},pods={pods=20} {*}§<<KNS>>
#Services & networking|الخدمات والشبكات
1§List services & endpoints§الخدمات والـ endpoints§kubectl get svc,endpoints,ingress {*}§<<KNS>>¶-o wide|Wide|موسع
1§Port forward§تمرير منفذ§kubectl port-forward {res=svc/web} {lport=8080}:{rport=80} {*}§--address {addr=0.0.0.0}|Listen address|عنوان الاستماع¶<<KNS>>
2§Create ingress§إنشاء Ingress§kubectl create ingress {name=web} --rule='{host=app.example.com}/*={svc=web}:80' {*}§--class={class=nginx}|Ingress class|فئة الـ Ingress¶<<KNS>>
2§Proxy API server§وكيل الـ API§kubectl proxy {*}§--port={port=8001}|Port|المنفذ¶--address={addr=127.0.0.1}|Address|العنوان
2§DNS test inside cluster§اختبار DNS داخل العنقود§kubectl run dnsutils --rm -it --restart=Never --image=registry.k8s.io/e2e-test-images/jessie-dnsutils:1.3 -- nslookup {name=kubernetes.default}
#Logs, exec & debug|السجلات والتنفيذ والتشخيص
1§Pod logs§سجلات pod§kubectl logs {pod} {*}§-f|Follow|متابعة¶--tail={n=100}|Last N|آخر N¶-c {container=app}|Container|الحاوية¶--previous|Previous instance|النسخة السابقة¶--since={since=1h}|Since|منذ¶-l {selector=app=web}|By label|بالوسم¶--all-containers|All containers|كل الحاويات¶--timestamps|Timestamps|الوقت¶<<KNS>>
1§Exec in pod§تنفيذ داخل pod§kubectl exec {*} {pod} -- {cmd=sh}§-it|Interactive|تفاعلي¶-c {container=app}|Container|الحاوية¶<<KNS>>
2§Copy files§نسخ ملفات§kubectl cp {src=./file.txt} {pod}:{dst=/tmp/file.txt} {*}§-c {container=app}|Container|الحاوية¶<<KNS>>
2§Debug with ephemeral container§تشخيص بحاوية مؤقتة§kubectl debug -it {pod} --image={image=busybox} {*}§--target={container=app}|Target container|الحاوية الهدف¶--copy-to={name=debug-copy}|Copy pod|نسخة من الـ pod¶<<KNS>>
3§Debug a node§تشخيص عقدة§kubectl debug node/{node} -it --image={image=ubuntu}
2§Resource usage§استهلاك الموارد§kubectl top {what=@pods,nodes} {*}§--containers|Per container|لكل حاوية¶--sort-by={key=@cpu,memory}|Sort|ترتيب¶<<KNS>>
2§Why is the pod failing§لماذا يفشل الـ pod§kubectl describe pod {pod} | sed -n '/Events:/,$p'
#Nodes & scheduling|العقد والجدولة
1§Nodes§العقد§kubectl get nodes {*}§-o wide|Wide|موسع¶--show-labels|Labels|الوسوم
2§Cordon / uncordon§منع / السماح بالجدولة§kubectl {mode=@cordon,uncordon} {node}
2§Drain node§تفريغ عقدة§kubectl drain {node} {*}§--ignore-daemonsets|Ignore DaemonSets|تجاهل DaemonSets¶--delete-emptydir-data|Delete emptyDir|حذف emptyDir¶--force|Force|إجبار¶--grace-period={secs=30}|Grace period|مهلة¶--timeout={t=5m}|Timeout|المهلة
2§Taint node§وصم عقدة§kubectl taint nodes {node} {taint=key=value:NoSchedule}
2§Remove taint§إزالة وصمة§kubectl taint nodes {node} {key=key}:NoSchedule-
2§Label node§وسم عقدة§kubectl label node {node} {label=disktype=ssd}
3§Delete node§حذف عقدة§kubectl delete node {node}
#RBAC & security|الصلاحيات والأمان
1§Can I do this?§هل أملك الصلاحية؟§kubectl auth can-i {verb=create} {res=pods} {*}§--as {user=jane}|As user|كمستخدم¶--as-group {group=dev}|As group|كمجموعة¶-n {ns=default}|Namespace|النطاق¶--list|List all|عرض الكل
2§Create service account§إنشاء ServiceAccount§kubectl create serviceaccount {name=app-sa} {*}§<<KNS>>
2§Create SA token§إنشاء توكن§kubectl create token {sa=app-sa} {*}§--duration={d=1h}|Duration|المدة¶<<KNS>>
2§Create role§إنشاء Role§kubectl create role {name=pod-reader} --verb={verbs=get,list,watch} --resource={res=pods} {*}§<<KNS>>
2§Bind role§ربط Role§kubectl create rolebinding {name=read-pods} --role={role=pod-reader} {*}§--user={user=jane}|User|المستخدم¶--serviceaccount={sa=default:app-sa}|ServiceAccount|ServiceAccount¶--group={group=dev}|Group|المجموعة¶<<KNS>>
2§Cluster role binding§ربط ClusterRole§kubectl create clusterrolebinding {name=admins} --clusterrole={role=cluster-admin} {*}§--user={user=jane}|User|المستخدم¶--group={group=admins}|Group|المجموعة¶--serviceaccount={sa=kube-system:admin}|ServiceAccount|ServiceAccount
3§Pending CSRs§طلبات الشهادات§kubectl get csr && kubectl certificate {mode=@approve,deny} {csr}
#Maintenance & customize|الصيانة و Kustomize
2§Kustomize build§بناء Kustomize§kubectl kustomize {dir=overlays/prod}
2§Apply kustomization§تطبيق Kustomize§kubectl apply -k {dir=overlays/prod}
2§Metrics server§تثبيت metrics-server§kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
3§Kubectl plugins§إضافات kubectl§kubectl krew {mode=@list,search,install ctx,install ns,update}
3§Quick context/ns switch§تبديل سريع§kubectx {ctx?}; kubens {ns?}
3§Terminal UI§واجهة طرفية§k9s {*}§-n {ns=default}|Namespace|النطاق¶--context {ctx=my-cluster}|Context|السياق¶--readonly|Read only|قراءة فقط
3§Multi-pod logs§سجلات متعددة§stern {pattern=web} {*}§-n {ns=default}|Namespace|النطاق¶--since {since=10m}|Since|منذ¶-c {container=app}|Container|الحاوية
#kubeadm & cluster setup|kubeadm وبناء العنقود
2§Prepare node: disable swap§تجهيز العقدة: إيقاف swap§swapoff -a && sed -i '/ swap / s/^/#/' /etc/fstab
2§Kernel modules & sysctl§وحدات النواة§modprobe overlay && modprobe br_netfilter && printf 'net.bridge.bridge-nf-call-iptables=1\\nnet.bridge.bridge-nf-call-ip6tables=1\\nnet.ipv4.ip_forward=1\\n' > /etc/sysctl.d/k8s.conf && sysctl --system
2§Init control plane§تهيئة الـ control plane§kubeadm init {*}§--pod-network-cidr={cidr=10.244.0.0/16}|Pod CIDR|شبكة الـ pods¶--apiserver-advertise-address={ip=192.168.1.10}|API address|عنوان الـ API¶--control-plane-endpoint={ep=k8s.example.com:6443}|HA endpoint|نقطة HA¶--kubernetes-version={ver=v1.34.0}|K8s version|إصدار K8s¶--upload-certs|Upload certs|رفع الشهادات¶--config {file=kubeadm.yaml}|Config file|ملف إعداد
2§Setup kubeconfig for user§تجهيز kubeconfig§mkdir -p $HOME/.kube && sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config && sudo chown $(id -u):$(id -g) $HOME/.kube/config
2§Install Flannel CNI§تثبيت Flannel§kubectl apply -f https://github.com/flannel-io/flannel/releases/latest/download/kube-flannel.yml
2§Install Calico CNI§تثبيت Calico§kubectl apply -f https://raw.githubusercontent.com/projectcalico/calico/{ver=v3.28.0}/manifests/calico.yaml
2§Print join command§أمر الانضمام§kubeadm token create --print-join-command
2§Join worker§انضمام worker§kubeadm join {endpoint=192.168.1.10:6443} --token {token} --discovery-token-ca-cert-hash sha256:{hash}
3§Upgrade plan / apply§خطة وترقية§kubeadm upgrade {mode=@plan,apply v1.34.0,node}
3§Certificates§الشهادات§kubeadm certs {mode=@check-expiration,renew all}
3§Reset node§إعادة ضبط العقدة§kubeadm reset {*}§-f|Force|إجبار
3§etcd snapshot§لقطة etcd§ETCDCTL_API=3 etcdctl snapshot save {file=snapshot.db} --endpoints=https://127.0.0.1:2379 --cacert=/etc/kubernetes/pki/etcd/ca.crt --cert=/etc/kubernetes/pki/etcd/server.crt --key=/etc/kubernetes/pki/etcd/server.key
3§etcd restore§استرجاع etcd§ETCDCTL_API=3 etcdctl snapshot restore {file=snapshot.db} --data-dir={dir=/var/lib/etcd-restore}
3§Container runtime (crictl)§crictl§crictl {mode=@ps,images,pods,logs,inspect,stats,pull} {id?}
3§Kubelet logs§سجلات kubelet§journalctl -u kubelet {*}§-f|Follow|متابعة¶-n {n=100}|Last N|آخر N
`);

T(["helm","⎈","Helm · Minikube · kind · k3s|Helm و Minikube و kind و k3s","Package manager for Kubernetes and local clusters|مدير حزم Kubernetes والعناقيد المحلية","orch","all",[["Install Helm","تثبيت Helm","curl -fsSL https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash","curl -fsSL https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash"],["Install minikube","تثبيت minikube","curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 && sudo install minikube-linux-amd64 /usr/local/bin/minikube","curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 && sudo install minikube-linux-amd64 /usr/local/bin/minikube"],["Install kind","تثبيت kind","curl -Lo ./kind https://kind.sigs.k8s.io/dl/latest/kind-linux-amd64 && chmod +x kind && sudo mv kind /usr/local/bin/","curl -Lo ./kind https://kind.sigs.k8s.io/dl/latest/kind-linux-amd64 && chmod +x kind && sudo mv kind /usr/local/bin/"],["Install k3s","تثبيت k3s","curl -sfL https://get.k3s.io | sh -","curl -sfL https://get.k3s.io | sh -"]]],`
#Repositories|المستودعات
1§Add repo§إضافة مستودع§helm repo add {name=bitnami} {url=https://charts.bitnami.com/bitnami}
1§Update repos§تحديث المستودعات§helm repo update
1§List / remove repos§عرض / حذف§helm repo {mode=@list,remove} {name?}
1§Search repo§بحث في المستودع§helm search repo {keyword=nginx} {*}§--versions|All versions|كل الإصدارات¶-l|Long|مفصل
2§Search Artifact Hub§بحث في Artifact Hub§helm search hub {keyword=nginx}
#Install & manage releases|تثبيت وإدارة الإصدارات
1§Install chart§تثبيت chart§helm install {release=myrelease} {chart=bitnami/nginx} {*}§-n {ns=default}|Namespace|النطاق¶--create-namespace|Create namespace|إنشاء النطاق¶-f {values=values.yaml}|Values file|ملف القيم¶--set {kv=replicaCount=2}|Set value|تعيين قيمة¶--set-string {kv=image.tag=1.0}|Set string|قيمة نصية¶--version {ver=1.2.3}|Chart version|إصدار الـ chart¶--wait|Wait ready|انتظار الجاهزية¶--timeout {t=5m}|Timeout|المهلة¶--atomic|Rollback on failure|تراجع عند الفشل¶--dry-run|Dry run|تجربة¶--debug|Debug|تصحيح¶--generate-name|Generate name|توليد اسم
1§Upgrade or install§ترقية أو تثبيت§helm upgrade --install {release=myrelease} {chart=bitnami/nginx} {*}§-n {ns=default}|Namespace|النطاق¶--create-namespace|Create namespace|إنشاء النطاق¶-f {values=values.yaml}|Values file|ملف القيم¶--set {kv=image.tag=2.0}|Set value|تعيين قيمة¶--reuse-values|Reuse values|إعادة استخدام القيم¶--reset-values|Reset values|تصفير القيم¶--version {ver=1.2.3}|Version|الإصدار¶--wait|Wait|انتظار¶--atomic|Atomic|ذري¶--force|Force|إجبار¶--history-max {n=10}|History max|أقصى تاريخ
1§List releases§عرض الإصدارات§helm list {*}§-A|All namespaces|كل النطاقات¶-n {ns=default}|Namespace|النطاق¶--failed|Failed|الفاشلة¶--pending|Pending|المعلقة¶-o {fmt=@json,yaml,table}|Format|الصيغة
1§Release status§حالة الإصدار§helm status {release} {*}§-n {ns=default}|Namespace|النطاق
1§History§التاريخ§helm history {release} {*}§-n {ns=default}|Namespace|النطاق
1§Rollback§التراجع§helm rollback {release} {rev=1} {*}§-n {ns=default}|Namespace|النطاق¶--wait|Wait|انتظار
1§Uninstall§حذف§helm uninstall {release} {*}§-n {ns=default}|Namespace|النطاق¶--keep-history|Keep history|إبقاء التاريخ
2§Get release info§معلومات الإصدار§helm get {what=@values,manifest,notes,hooks,all} {release} {*}§-n {ns=default}|Namespace|النطاق¶--revision {rev=1}|Revision|المراجعة
#Inspect & develop charts|فحص وتطوير الـ charts
1§Show chart info§معلومات الـ chart§helm show {what=@values,chart,readme,all} {chart=bitnami/nginx} {*}§--version {ver=1.2.3}|Version|الإصدار
2§Render templates§عرض القوالب§helm template {release=myrelease} {chart=./mychart} {*}§-f {values=values.yaml}|Values|القيم¶--set {kv=key=value}|Set|تعيين¶-n {ns=default}|Namespace|النطاق¶--include-crds|Include CRDs|مع CRDs¶--debug|Debug|تصحيح
2§Lint chart§فحص chart§helm lint {chart=./mychart} {*}§--strict|Strict|صارم¶-f {values=values.yaml}|Values|القيم
2§Create chart§إنشاء chart§helm create {name=mychart}
2§Package chart§تغليف chart§helm package {chart=./mychart} {*}§--version {ver=1.0.0}|Version|الإصدار¶--app-version {appver=1.0}|App version|إصدار التطبيق¶-d {dest=.}|Destination|الوجهة
2§Chart dependencies§اعتماديات chart§helm dependency {mode=@update,build,list} {chart=./mychart}
2§Pull chart locally§تحميل chart§helm pull {chart=bitnami/nginx} {*}§--untar|Extract|فك الضغط¶--version {ver=1.2.3}|Version|الإصدار¶-d {dest=.}|Destination|الوجهة
3§Push to OCI registry§رفع لـ OCI registry§helm push {file=mychart-1.0.0.tgz} oci://{registry=registry.example.com/charts}
3§Registry login§تسجيل دخول registry§helm registry login {registry=registry.example.com} {*}§-u {user}|User|المستخدم¶--password-stdin|Password stdin|كلمة المرور من stdin
3§Run chart tests§اختبارات chart§helm test {release} {*}§--logs|Show logs|إظهار السجلات
3§Diff plugin§إضافة diff§helm diff upgrade {release} {chart} {*}§-f {values=values.yaml}|Values|القيم
3§Helmfile§Helmfile§helmfile {mode=@diff,apply,sync,template,destroy,lint} {*}§-f {file=helmfile.yaml}|File|الملف¶-e {env=prod}|Environment|البيئة
#Minikube|Minikube
1§Start cluster§تشغيل العنقود§minikube start {*}§--driver={driver=@docker,podman,kvm2,virtualbox}|Driver|المشغل¶--cpus={cpus=4}|CPUs|المعالج¶--memory={mem=8192}|Memory MB|الذاكرة MB¶--disk-size={disk=40g}|Disk|القرص¶--kubernetes-version={ver=v1.34.0}|K8s version|إصدار K8s¶-p {profile=dev}|Profile|البروفايل¶--nodes={n=3}|Nodes|العقد
1§Status / stop / delete§الحالة / إيقاف / حذف§minikube {mode=@status,stop,pause,unpause,delete,delete --all,ip,dashboard,logs} {*}§-p {profile=minikube}|Profile|البروفايل
2§Addons§الإضافات§minikube addons {mode=@list,enable ingress,enable metrics-server,enable dashboard,disable ingress}
2§Expose service§كشف خدمة§minikube service {svc=web} {*}§--url|Print URL|عرض الرابط¶-n {ns=default}|Namespace|النطاق
2§Load image into cluster§تحميل صورة للعنقود§minikube image load {image=myapp:1.0}
2§SSH into node§الدخول للعقدة§minikube ssh {*}§-p {profile=minikube}|Profile|البروفايل
2§Tunnel (LoadBalancer)§نفق للـ LoadBalancer§minikube tunnel
#kind & k3s|kind و k3s
1§Create kind cluster§إنشاء عنقود kind§kind create cluster {*}§--name {name=dev}|Name|الاسم¶--config {file=kind.yaml}|Config|الإعداد¶--image {image=kindest/node:v1.34.0}|Node image|صورة العقدة¶--wait {t=60s}|Wait|انتظار
1§kind clusters§عناقيد kind§kind {mode=@get clusters,get nodes,delete cluster,export kubeconfig} {*}§--name {name=dev}|Name|الاسم
2§Load image into kind§تحميل صورة في kind§kind load docker-image {image=myapp:1.0} {*}§--name {name=dev}|Name|الاسم
2§k3s service§خدمة k3s§systemctl {mode=@status,restart,stop} k3s
2§k3s kubectl§kubectl في k3s§k3s kubectl {cmd=get nodes}
2§k3s agent join§انضمام عقدة k3s§curl -sfL https://get.k3s.io | K3S_URL=https://{server=192.168.1.10}:6443 K3S_TOKEN={token} sh -
2§k3s node token§توكن k3s§cat /var/lib/rancher/k3s/server/node-token
3§k3s uninstall§حذف k3s§/usr/local/bin/{script=@k3s-uninstall.sh,k3s-agent-uninstall.sh}
`);

T(["oc","🔴","OpenShift (oc)|أوبن شيفت (oc)","Projects, apps, builds, routes, SCC, operators, nodes and cluster administration|المشاريع والتطبيقات والبناء والـ routes و SCC والـ operators والعقد وإدارة العنقود","orch","all",[["Install oc client","تثبيت oc","curl -LO https://mirror.openshift.com/pub/openshift-v4/clients/ocp/stable/openshift-client-linux.tar.gz && tar xzf openshift-client-linux.tar.gz oc kubectl && sudo mv oc kubectl /usr/local/bin/","curl -LO https://mirror.openshift.com/pub/openshift-v4/clients/ocp/stable/openshift-client-linux.tar.gz && tar xzf openshift-client-linux.tar.gz oc kubectl && sudo mv oc kubectl /usr/local/bin/"],["Install openshift-install","تثبيت openshift-install","curl -LO https://mirror.openshift.com/pub/openshift-v4/clients/ocp/stable/openshift-install-linux.tar.gz && tar xzf openshift-install-linux.tar.gz openshift-install && sudo mv openshift-install /usr/local/bin/","curl -LO https://mirror.openshift.com/pub/openshift-v4/clients/ocp/stable/openshift-install-linux.tar.gz && tar xzf openshift-install-linux.tar.gz openshift-install && sudo mv openshift-install /usr/local/bin/"],["Local cluster (CRC)","عنقود محلي (CRC)","crc setup && crc start","crc setup && crc start"]]],`
#Login & projects|الدخول والمشاريع
1§Login§تسجيل الدخول§oc login {server=https://api.cluster.example.com:6443} {*}§-u {user=developer}|Username|المستخدم¶-p {password}|Password|كلمة المرور¶--token={token}|Token|التوكن¶--insecure-skip-tls-verify|Skip TLS verify|تجاهل TLS
1§Who am I§من أنا§oc whoami {*}§--show-token|Token|التوكن¶--show-server|Server|الخادم¶--show-console|Console URL|رابط الكونسول
1§Logout§تسجيل الخروج§oc logout
1§Create project§إنشاء مشروع§oc new-project {name=myproject} {*}§--display-name='{dn=My Project}'|Display name|اسم العرض¶--description='{desc=demo}'|Description|الوصف
1§Switch project§تبديل المشروع§oc project {name=myproject}
1§List projects§عرض المشاريع§oc projects
1§Delete project§حذف مشروع§oc delete project {name}
1§Cluster status summary§ملخص الحالة§oc status {*}§-v|Verbose|تفصيل¶--suggest|Suggestions|اقتراحات
#Apps & builds|التطبيقات والبناء
1§New app from image§تطبيق من صورة§oc new-app {image=quay.io/redhattraining/hello-world-nginx} {*}§--name={name=hello}|Name|الاسم¶-e {env=KEY=value}|Env|متغير¶-l {label=app=hello}|Label|وسم¶--as-deployment-config|Use DeploymentConfig|DeploymentConfig¶--allow-missing-images|Allow missing|السماح بالناقص
1§New app from Git (S2I)§تطبيق من Git (S2I)§oc new-app {builder=python}~{repo=https://github.com/user/repo.git} {*}§--name={name=myapp}|Name|الاسم¶--context-dir={dir=src}|Context dir|مجلد الكود¶--strategy={strategy=@source,docker,pipeline}|Strategy|الاستراتيجية¶-e {env=KEY=value}|Env|متغير
1§New app from template§تطبيق من قالب§oc new-app --template={template=postgresql-persistent} {*}§-p {param=POSTGRESQL_USER=app}|Parameter|بارامتر¶--name={name=db}|Name|الاسم
2§New binary build§بناء ثنائي جديد§oc new-build --name={name=myapp} --binary --strategy={strategy=@docker,source} {*}§--to={to=myapp:latest}|Output image|صورة الإخراج
1§Start build§بدء بناء§oc start-build {bc=myapp} {*}§--follow|Follow logs|متابعة السجل¶--from-dir={dir=.}|From dir|من مجلد¶--from-file={file=app.jar}|From file|من ملف¶--from-repo={repo=.}|From repo|من مستودع¶--wait|Wait|انتظار
1§Build logs§سجلات البناء§oc logs {*} bc/{bc=myapp}§-f|Follow|متابعة¶--version={v=1}|Build number|رقم البناء
2§Builds & configs§البناءات والإعدادات§oc get {res=@builds,buildconfigs,imagestreams,imagestreamtags} {*}§-o wide|Wide|موسع
2§Cancel build§إلغاء بناء§oc cancel-build {build=myapp-1}
2§Set build webhook / triggers§مشغلات البناء§oc set triggers bc/{bc=myapp} {*}§--from-github|GitHub|GitHub¶--from-image={image=myapp:latest}|Image change|تغيير صورة¶--from-config|Config change|تغيير إعداد¶--remove-all|Remove all|حذف الكل
#Resources|الموارد
1§Get resources§عرض الموارد§oc get {res=@@OCRES} {*} {name?}§-n {ns=myproject}|Namespace|النطاق¶-A|All namespaces|كل النطاقات¶-o wide|Wide|موسع¶-o yaml|YAML|YAML¶-o json|JSON|JSON¶-l {selector=app=hello}|Label|وسم¶-w|Watch|مراقبة¶--show-labels|Labels|الوسوم
1§Describe§وصف§oc describe {res=@@OCRES} {name} {*}§-n {ns=myproject}|Namespace|النطاق
1§Apply / create manifest§تطبيق مانيفست§oc {mode=@apply -f,create -f,replace -f,delete -f} {file=manifest.yaml} {*}§-n {ns=myproject}|Namespace|النطاق
1§Delete resource§حذف مورد§oc delete {res=@@OCRES} {name} {*}§--all|All|الكل¶-l {selector=app=hello}|By label|بالوسم¶--force --grace-period=0|Force|إجبار¶-n {ns=myproject}|Namespace|النطاق
1§Delete app by label§حذف تطبيق بالوسم§oc delete all -l app={app=hello}
2§Edit / patch§تعديل / ترقيع§oc {mode=@edit,patch} {res=deployment/hello} {*}§-p '{patch={"spec":{"replicas":2}}}'|Patch JSON|ترقيع JSON¶-n {ns=myproject}|Namespace|النطاق
2§Process template§معالجة قالب§oc process {*} -f {file=template.yaml}§-p {param=NAME=value}|Parameter|بارامتر¶--parameters|List parameters|عرض البارامترات¶| oc apply -f -|Apply result|تطبيق الناتج
2§Available templates§القوالب المتاحة§oc get templates -n openshift
2§Explain resource§شرح مورد§oc explain {path=route.spec}
2§API resources§موارد الـ API§oc api-resources {*}§--namespaced=true|Namespaced|ضمن namespace¶--api-group={group=route.openshift.io}|API group|المجموعة
#Deployments & scaling|النشر والتوسع
1§Deploy status§حالة النشر§oc rollout status {res=deployment/hello} {*}§-n {ns=myproject}|Namespace|النطاق
1§Rollout latest / retry / undo§إعادة النشر / تراجع§oc rollout {mode=@latest dc/hello,retry dc/hello,undo dc/hello,restart deployment/hello,history deployment/hello,pause deployment/hello,resume deployment/hello}
1§Scale§تغيير العدد§oc scale {res=deployment/hello} --replicas={n=3} {*}§-n {ns=myproject}|Namespace|النطاق
2§Autoscale§توسع تلقائي§oc autoscale {res=deployment/hello} --min={min=2} --max={max=10} --cpu-percent={cpu=70}
2§Set env§ضبط المتغيرات§oc set env {res=deployment/hello} {*} {env=KEY=value}§--list|List|عرض¶--from=secret/{secret=app-secret}|From Secret|من Secret¶--from=configmap/{cm=app-config}|From ConfigMap|من ConfigMap¶--prefix={prefix=APP_}|Prefix|بادئة
2§Set resources§ضبط الموارد§oc set resources {res=deployment/hello} {*}§--requests=cpu={cpu=100m},memory={mem=128Mi}|Requests|الطلب¶--limits=cpu={cpu=500m},memory={mem=512Mi}|Limits|الحد
2§Set probe§ضبط الـ probes§oc set probe {res=deployment/hello} {*}§--readiness --get-url=http://:{port=8080}/{path=health}|Readiness|الجاهزية¶--liveness --get-url=http://:{port=8080}/{path=health}|Liveness|الحياة¶--initial-delay-seconds={secs=10}|Initial delay|التأخير الأولي
2§Add volume§إضافة volume§oc set volume {res=deployment/hello} --add --name={name=data} {*}§--type=pvc --claim-size={size=1Gi}|New PVC|PVC جديد¶--mount-path={path=/data}|Mount path|مسار الربط¶--claim-name={claim=mypvc}|Existing claim|PVC موجود¶--type=emptyDir|emptyDir|emptyDir¶--type=configmap --configmap-name={cm=app-config}|ConfigMap|ConfigMap¶--type=secret --secret-name={secret=app-secret}|Secret|Secret
2§Change image§تغيير الصورة§oc set image {res=deployment/hello} {container=hello}={image=quay.io/user/app:2.0}
2§Set image lookup§تفعيل البحث في ImageStream§oc set image-lookup {is=hello}
#Routes & services|الـ Routes والخدمات
1§Expose service as route§كشف خدمة كـ route§oc expose service/{svc=hello} {*}§--hostname={host=hello.apps.example.com}|Hostname|الدومين¶--name={name=hello}|Route name|اسم الـ route¶--port={port=8080}|Port|المنفذ¶--path={path=/api}|Path|المسار
1§Expose deployment as service§كشف deployment كخدمة§oc expose deployment/{name=hello} --port={port=8080} {*}§--name={svc=hello}|Service name|اسم الخدمة¶--target-port={tport=8080}|Target port|منفذ الهدف
1§Get routes§عرض الـ routes§oc get routes {*}§-o wide|Wide|موسع¶-o jsonpath='{.items[*].spec.host}'|Hosts|الدومينات
2§Edge TLS route§route بـ TLS edge§oc create route edge {name=hello} --service={svc=hello} {*}§--hostname={host=hello.apps.example.com}|Hostname|الدومين¶--cert={crt=tls.crt}|Certificate|الشهادة¶--key={key=tls.key}|Key|المفتاح¶--insecure-policy={policy=@Redirect,Allow,None}|HTTP policy|سياسة HTTP
2§Passthrough route§route passthrough§oc create route passthrough {name=hello} --service={svc=hello} {*}§--hostname={host=hello.apps.example.com}|Hostname|الدومين
2§Re-encrypt route§route re-encrypt§oc create route reencrypt {name=hello} --service={svc=hello} --dest-ca-cert={ca=ca.crt} {*}§--hostname={host=hello.apps.example.com}|Hostname|الدومين
2§Route annotations (timeout etc.)§إعدادات الـ route§oc annotate route/{name=hello} {annotation=haproxy.router.openshift.io/timeout=60s} {*}§--overwrite|Overwrite|الكتابة فوق
#Pods, logs & debug|الـ Pods والسجلات والتشخيص
1§Pod logs§سجلات§oc logs {res=@pod/hello,deployment/hello,dc/hello,bc/hello} {*}§-f|Follow|متابعة¶--tail={n=100}|Last N|آخر N¶-c {container=app}|Container|الحاوية¶--previous|Previous|السابقة¶--since={since=1h}|Since|منذ
1§Remote shell§شل بعيد§oc rsh {*} {pod}§-c {container=app}|Container|الحاوية
1§Execute command§تنفيذ أمر§oc exec {*} {pod} -- {cmd=ls /}§-it|Interactive|تفاعلي¶-c {container=app}|Container|الحاوية
2§Debug pod/deployment§تشخيص§oc debug {res=deployment/hello} {*}§--as-root|As root|كـ root¶--image={image=registry.access.redhat.com/ubi9/ubi}|Image|الصورة¶-- {cmd=sh}|Command|الأمر
3§Debug node§تشخيص عقدة§oc debug node/{node} -- chroot /host {cmd=bash}
2§Copy files (cp)§نسخ ملفات§oc cp {src=./file} {pod}:{dst=/tmp/file} {*}§-c {container=app}|Container|الحاوية
2§Sync directory (rsync)§مزامنة مجلد§oc rsync {src=./dir/} {pod}:{dst=/data/} {*}§--delete|Delete extra|حذف الزائد¶--progress|Progress|التقدم¶-c {container=app}|Container|الحاوية
2§Port forward§تمرير منفذ§oc port-forward {pod} {lport=8080}:{rport=8080}
2§Events§الأحداث§oc get events {*}§--sort-by=.lastTimestamp|By time|بالوقت¶-w|Watch|مراقبة¶--field-selector type=Warning|Warnings|التحذيرات
2§Resource usage§الاستهلاك§oc adm top {what=@pods,nodes,pod --containers} {*}§-n {ns=myproject}|Namespace|النطاق
#Images & registry|الصور والـ registry
2§Import external image§استيراد صورة خارجية§oc import-image {is=hello} --from={image=quay.io/user/app} {*}§--confirm|Create if missing|إنشاء إن لم يوجد¶--all|All tags|كل الوسوم¶--scheduled|Scheduled|مجدول
2§Tag image stream§وسم ImageStream§oc tag {src=hello:latest} {dst=hello:prod}
2§Image stream tags§وسوم الصور§oc get is,istag {*}§-o wide|Wide|موسع
2§Registry login§دخول الـ registry§oc registry login
2§Default registry route§مسار الـ registry§oc get route default-route -n openshift-image-registry -o jsonpath='{.spec.host}'
3§Mirror images§نسخ الصور§oc image mirror {src=quay.io/org/img:tag} {dst=registry.example.com/org/img:tag} {*}§--insecure|Insecure|غير آمن¶--filter-by-os={os=linux/amd64}|OS filter|تصفية النظام
3§Release info§معلومات الإصدار§oc adm release info {*} {ver=4.16.0}§--pullspecs|Pull specs|روابط الصور¶--commits|Commits|الـ commits
3§Mirror with oc-mirror§نسخ بـ oc-mirror§oc mirror --config={file=imageset-config.yaml} docker://{registry=registry.example.com}
#Config, secrets & storage|الإعدادات والأسرار والتخزين
1§Create secret§إنشاء Secret§oc create secret {type=@generic,docker-registry,tls} {name=app-secret} {*}§--from-literal={kv=key=value}|From literal|من قيمة¶--from-file={file=file.txt}|From file|من ملف
1§Create ConfigMap§إنشاء ConfigMap§oc create configmap {name=app-config} {*}§--from-literal={kv=key=value}|From literal|من قيمة¶--from-file={file=app.conf}|From file|من ملف
2§Link pull secret§ربط pull secret§oc secrets link {sa=default} {secret=regcred} --for=pull
2§Persistent volume claims§الـ PVC§oc get pvc,pv {*}§-o wide|Wide|موسع
2§Default storage class§الـ storage class§oc get sc && oc patch sc {sc=gp3-csi} -p '{"metadata":{"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'
#Access control & SCC|الصلاحيات و SCC
1§Add role to user§إضافة دور لمستخدم§oc adm policy add-role-to-user {role=@admin,edit,view,basic-user,system:image-puller} {user=developer} {*}§-n {ns=myproject}|Namespace|النطاق
2§Add role to group§إضافة دور لمجموعة§oc adm policy add-role-to-group {role=@admin,edit,view} {group=dev-team} {*}§-n {ns=myproject}|Namespace|النطاق
2§Cluster role to user§دور عنقودي لمستخدم§oc adm policy add-cluster-role-to-user {role=@cluster-admin,cluster-reader,self-provisioner} {user=developer}
2§Remove role§إزالة دور§oc adm policy {mode=@remove-role-from-user,remove-cluster-role-from-user} {role=edit} {user=developer}
2§Who can do X§من يستطيع§oc adm policy who-can {verb=get} {res=pods} {*}§-n {ns=myproject}|Namespace|النطاق
2§Role bindings§ربط الأدوار§oc get rolebindings,clusterrolebindings {*}§-n {ns=myproject}|Namespace|النطاق
2§Service accounts§حسابات الخدمة§oc create sa {name=app-sa} && oc get sa
2§Grant SCC to service account§منح SCC لحساب خدمة§oc adm policy add-scc-to-user {scc=@anyuid,privileged,nonroot,restricted-v2,hostnetwork} -z {sa=default} {*}§-n {ns=myproject}|Namespace|النطاق
2§List SCCs§قائمة الـ SCC§oc get scc {*}§-o wide|Wide|موسع
3§Which SCC allows pod§أي SCC تسمح للـ pod§oc get pod {pod} -o jsonpath='{.metadata.annotations.openshift\\.io/scc}'
3§Create group / add users§إنشاء مجموعة§oc adm groups new {group=dev-team} {users=alice bob}
3§HTPasswd identity provider§مزود هوية htpasswd§htpasswd -c -B -b {file=users.htpasswd} {user=admin} {password} && oc create secret generic htpass-secret --from-file=htpasswd={file} -n openshift-config
3§Remove kubeadmin§حذف kubeadmin§oc delete secret kubeadmin -n kube-system
#Cluster administration|إدارة العنقود
1§Nodes§العقد§oc get nodes {*}§-o wide|Wide|موسع¶--show-labels|Labels|الوسوم¶-l node-role.kubernetes.io/worker=|Workers|الـ workers
2§Cluster operators§الـ cluster operators§oc get clusteroperators {*}§-o wide|Wide|موسع¶-w|Watch|مراقبة
2§Cluster version§إصدار العنقود§oc get clusterversion {*}§-o yaml|Details|تفاصيل
2§Cluster upgrade§ترقية العنقود§oc adm upgrade {*}§--to={ver=4.16.5}|To version|إلى إصدار¶--to-latest|Latest|الأحدث¶--force|Force|إجبار
3§Change update channel§تغيير قناة التحديث§oc patch clusterversion version --type merge -p '{"spec":{"channel":"{channel=stable-4.16}"}}'
2§Cordon / uncordon / drain§منع / تفريغ العقدة§oc adm {mode=@cordon,uncordon,drain} {node} {*}§--ignore-daemonsets|Ignore DaemonSets|تجاهل DaemonSets¶--delete-emptydir-data|Delete emptyDir|حذف emptyDir¶--force|Force|إجبار
2§Node logs§سجلات العقدة§oc adm node-logs {node} {*}§-u {unit=kubelet}|Unit|الوحدة¶--tail={n=100}|Last N|آخر N
2§Pending CSRs§طلبات الشهادات§oc get csr && oc adm certificate approve {csr}
3§Approve all pending CSRs§اعتماد كل الطلبات§oc get csr -o go-template='{{range .items}}{{if not .status}}{{.metadata.name}}{{"\\n"}}{{end}}{{end}}' | xargs oc adm certificate approve
3§Machine config pools§MachineConfigPools§oc get mcp {*}§-w|Watch|مراقبة
3§Machine sets§MachineSets§oc get machinesets -n openshift-machine-api && oc scale machineset {ms} --replicas={n=3} -n openshift-machine-api
3§Must-gather§must-gather§oc adm must-gather {*}§--dest-dir={dir=./must-gather}|Destination|الوجهة¶--image={image=registry.redhat.io/odf4/odf-must-gather-rhel9}|Custom image|صورة مخصصة
3§Inspect namespace§فحص namespace§oc adm inspect ns/{ns=openshift-etcd} --dest-dir={dir=inspect}
3§etcd backup§نسخة etcd§oc debug node/{master} -- chroot /host /usr/local/bin/cluster-backup.sh /home/core/assets/backup
3§Taint / label node§وصم / وسم عقدة§oc {mode=@adm taint nodes,label node} {node} {kv=key=value:NoSchedule}
3§Get cluster console URL§رابط الكونسول§oc whoami --show-console
3§Kubeadmin password§كلمة مرور kubeadmin§cat {dir=./auth}/kubeadmin-password
#Operators & OLM|الـ Operators
2§Available operators§الـ operators المتاحة§oc get packagemanifests -n openshift-marketplace {*}§| grep {filter=postgres}|Filter|تصفية
2§Installed operators§المثبتة§oc get csv {*}§-A|All namespaces|كل النطاقات¶-n {ns=openshift-operators}|Namespace|النطاق
2§Subscriptions§الاشتراكات§oc get subscriptions,installplans {*}§-A|All namespaces|كل النطاقات
2§Approve install plan§اعتماد install plan§oc patch installplan {ip} -n {ns=openshift-operators} --type merge -p '{"spec":{"approved":true}}'
3§Catalog sources§الـ catalogs§oc get catalogsource -n openshift-marketplace
3§Disable default catalogs§تعطيل الـ catalogs§oc patch OperatorHub cluster --type json -p '[{"op":"add","path":"/spec/disableAllDefaultSources","value":true}]'
#Install & local|التثبيت والمحلي
3§Create install config§إنشاء install-config§openshift-install create install-config {*}§--dir={dir=mycluster}|Directory|المجلد¶--log-level={lvl=@info,debug}|Log level|مستوى السجل
3§Create manifests / ignition§إنشاء manifests و ignition§openshift-install create {what=@manifests,ignition-configs,cluster} --dir={dir=mycluster} --log-level=info
3§Wait for install§انتظار انتهاء التثبيت§openshift-install wait-for {what=@bootstrap-complete,install-complete} --dir={dir=mycluster} --log-level=info
3§Destroy cluster§حذف العنقود§openshift-install destroy cluster --dir={dir=mycluster} --log-level=info
2§CRC local cluster§عنقود CRC المحلي§crc {mode=@setup,start,status,stop,delete,console --credentials,ip,cleanup}
2§odo developer CLI§odo للمطورين§odo {mode=@init,dev,deploy,list,delete component,logs}
2§Pipelines (tkn)§خطوط Tekton§tkn {mode=@pipeline list,pipeline start,pipelinerun list,pipelinerun logs -f,task list,clustertask list}
2§Virtualization§الأجهزة الافتراضية§oc get vm,vmi -A && virtctl {mode=@start,stop,console,ssh,migrate} {vm}
`);

T(["argo","🐙","Argo CD · Rollouts · Workflows|Argo CD و Rollouts و Workflows","GitOps delivery, progressive rollouts and workflow engine|تسليم GitOps والنشر التدريجي ومحرك الـ workflows","cicd","all",[["Install Argo CD CLI","تثبيت argocd CLI","curl -sSL -o argocd https://github.com/argoproj/argo-cd/releases/latest/download/argocd-linux-amd64 && sudo install -m 555 argocd /usr/local/bin/argocd && rm argocd","curl -sSL -o argocd https://github.com/argoproj/argo-cd/releases/latest/download/argocd-linux-amd64 && sudo install -m 555 argocd /usr/local/bin/argocd && rm argocd"],["Install Argo CD in cluster","تثبيت Argo CD في العنقود","kubectl create namespace argocd && kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml","kubectl create namespace argocd && kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml"],["Install Rollouts plugin","تثبيت plugin الـ Rollouts","curl -LO https://github.com/argoproj/argo-rollouts/releases/latest/download/kubectl-argo-rollouts-linux-amd64 && chmod +x kubectl-argo-rollouts-linux-amd64 && sudo mv kubectl-argo-rollouts-linux-amd64 /usr/local/bin/kubectl-argo-rollouts","curl -LO https://github.com/argoproj/argo-rollouts/releases/latest/download/kubectl-argo-rollouts-linux-amd64 && chmod +x kubectl-argo-rollouts-linux-amd64 && sudo mv kubectl-argo-rollouts-linux-amd64 /usr/local/bin/kubectl-argo-rollouts"],["Install Argo Workflows CLI","تثبيت argo CLI","curl -sLO https://github.com/argoproj/argo-workflows/releases/latest/download/argo-linux-amd64.gz && gunzip argo-linux-amd64.gz && chmod +x argo-linux-amd64 && sudo mv argo-linux-amd64 /usr/local/bin/argo","curl -sLO https://github.com/argoproj/argo-workflows/releases/latest/download/argo-linux-amd64.gz && gunzip argo-linux-amd64.gz && chmod +x argo-linux-amd64 && sudo mv argo-linux-amd64 /usr/local/bin/argo"]]],`
#Access & login|الدخول
1§Initial admin password§كلمة مرور admin الأولية§argocd admin initial-password -n {ns=argocd}
1§Port-forward UI§فتح الواجهة§kubectl port-forward svc/argocd-server -n {ns=argocd} {port=8080}:443
1§Login§تسجيل الدخول§argocd login {server=localhost:8080} {*}§--username {user=admin}|Username|المستخدم¶--password {password}|Password|كلمة المرور¶--insecure|Skip TLS|تجاهل TLS¶--grpc-web|gRPC-web|gRPC-web¶--sso|SSO|SSO
1§Change password§تغيير كلمة المرور§argocd account update-password
2§Accounts / tokens§الحسابات والتوكنات§argocd account {mode=@list,get-user-info,generate-token --account admin,can-i sync applications '*'}
2§Version / contexts§الإصدار والسياقات§argocd {mode=@version,context,logout localhost:8080}
#Applications|التطبيقات
1§Create application§إنشاء تطبيق§argocd app create {name=myapp} {*} --repo {repo=https://github.com/user/repo.git} --path {path=k8s} --dest-server {server=https://kubernetes.default.svc} --dest-namespace {ns=default}§--revision {rev=main}|Revision|المراجعة¶--project {project=default}|Project|المشروع¶--sync-policy automated|Auto sync|مزامنة تلقائية¶--auto-prune|Auto prune|حذف تلقائي¶--self-heal|Self heal|إصلاح ذاتي¶--sync-option CreateNamespace=true|Create namespace|إنشاء النطاق¶--helm-set {kv=image.tag=1.0}|Helm value|قيمة Helm¶--values {file=values.yaml}|Helm values file|ملف قيم Helm¶--directory-recurse|Recurse dir|مجلد متداخل¶--upsert|Upsert|تحديث إن وُجد
1§List applications§عرض التطبيقات§argocd app list {*}§-o {fmt=@wide,json,yaml,name}|Format|الصيغة¶-p {project=default}|Project|المشروع¶-l {selector=env=prod}|Selector|المحدد¶--status {status=OutOfSync}|Sync status|حالة المزامنة
1§Application details§تفاصيل تطبيق§argocd app get {name=myapp} {*}§--refresh|Refresh|تحديث¶--hard-refresh|Hard refresh|تحديث كامل¶-o {fmt=@wide,json,yaml,tree}|Format|الصيغة¶--show-params|Show params|إظهار البارامترات
1§Sync application§مزامنة تطبيق§argocd app sync {name=myapp} {*}§--prune|Prune|حذف الزائد¶--force|Force|إجبار¶--dry-run|Dry run|تجربة¶--async|Don't wait|بدون انتظار¶--revision {rev=main}|Revision|المراجعة¶--resource {res=apps:Deployment:web}|Specific resource|مورد محدد¶--retry-limit {n=3}|Retries|المحاولات
1§Wait for health§انتظار الصحة§argocd app wait {name=myapp} {*}§--health|Healthy|سليم¶--sync|Synced|متزامن¶--timeout {secs=300}|Timeout|المهلة
1§Diff vs Git§مقارنة مع Git§argocd app diff {name=myapp} {*}§--refresh|Refresh|تحديث¶--local {dir=./k8s}|Local dir|مجلد محلي
1§Delete application§حذف تطبيق§argocd app delete {name=myapp} {*}§--cascade|Delete resources|حذف الموارد¶--cascade=false|Keep resources|إبقاء الموارد¶-y|No prompt|بدون سؤال
2§History & rollback§التاريخ والتراجع§argocd app {mode=@history,rollback} {name=myapp} {id?}
2§Set parameters§ضبط البارامترات§argocd app set {name=myapp} {*}§--revision {rev=main}|Revision|المراجعة¶--sync-policy automated|Auto sync|مزامنة تلقائية¶--sync-policy none|Manual sync|مزامنة يدوية¶--auto-prune|Auto prune|حذف تلقائي¶--self-heal|Self heal|إصلاح ذاتي¶--helm-set {kv=image.tag=2.0}|Helm value|قيمة Helm¶--kustomize-image {img=nginx=nginx:1.27}|Kustomize image|صورة Kustomize
2§Application logs§سجلات التطبيق§argocd app logs {name=myapp} {*}§--follow|Follow|متابعة¶--tail {n=100}|Last N|آخر N¶--container {c=app}|Container|الحاوية¶--kind {kind=Deployment}|Kind|النوع
2§Resources of app§موارد التطبيق§argocd app resources {name=myapp}
2§Actions (restart…)§إجراءات (إعادة تشغيل)§argocd app actions run {name=myapp} restart --kind Deployment --resource-name {res=web}
2§Terminate running sync§إيقاف مزامنة جارية§argocd app terminate-op {name=myapp}
2§Manifests§المانيفست§argocd app manifests {name=myapp} {*}§--source live|Live|الحي¶--source git|Git|من Git
2§Ignore differences§تجاهل الاختلافات§argocd app patch {name=myapp} --patch '{"spec":{"ignoreDifferences":[{"group":"apps","kind":"Deployment","jsonPointers":["/spec/replicas"]}]}}' --type merge
#Projects, repos & clusters|المشاريع والمستودعات والعناقيد
2§Create project§إنشاء مشروع§argocd proj create {name=team-a} {*}§-d {dest=https://kubernetes.default.svc,team-a}|Destination|الوجهة¶-s {src=https://github.com/user/*}|Source repo|مستودع المصدر¶--description '{desc=Team A}'|Description|الوصف
2§Project commands§أوامر المشروع§argocd proj {mode=@list,get team-a,delete team-a,add-source team-a URL,add-destination team-a https://kubernetes.default.svc dev,allow-cluster-resource team-a '*' '*'}
2§Add repository§إضافة مستودع§argocd repo add {url=https://github.com/user/repo.git} {*}§--username {user}|Username|المستخدم¶--password {password}|Token/password|التوكن¶--ssh-private-key-path {key=~/.ssh/id_ed25519}|SSH key|مفتاح SSH¶--type helm --name {name=charts}|Helm repo|مستودع Helm¶--enable-oci|OCI|OCI¶--insecure-skip-server-verification|Skip TLS|تجاهل TLS
2§List repos§عرض المستودعات§argocd repo list
2§Add cluster§إضافة عنقود§argocd cluster add {ctx=my-context} {*}§--name {name=prod}|Name|الاسم¶--yes|No prompt|بدون سؤال¶--namespace {ns=argocd}|Namespace|النطاق
2§List clusters§عرض العناقيد§argocd cluster list
2§Certificates / GPG§الشهادات و GPG§argocd {mode=@cert list,gpg list,proj role list team-a}
3§RBAC check§فحص الصلاحيات§argocd admin settings rbac can {role=role:admin} {action=sync} {res=applications} '{obj=*/*}' --policy-file {file=policy.csv}
3§Export / import config§تصدير / استيراد§argocd admin {mode=@export > argocd-backup.yaml,import - < argocd-backup.yaml}
3§ApplicationSets§الـ ApplicationSets§argocd appset {mode=@list,get NAME,create appset.yaml,delete NAME}
#Argo Rollouts|Argo Rollouts
1§Watch rollout§مراقبة الـ rollout§kubectl argo rollouts get rollout {name=web} {*}§-w|Watch|مراقبة¶-n {ns=default}|Namespace|النطاق
1§List rollouts§عرض الـ rollouts§kubectl argo rollouts list rollouts {*}§-A|All namespaces|كل النطاقات¶-n {ns=default}|Namespace|النطاق
1§Promote§ترقية للمرحلة التالية§kubectl argo rollouts promote {name=web} {*}§--full|Skip all steps|تخطي كل الخطوات¶-n {ns=default}|Namespace|النطاق
1§Abort§إلغاء§kubectl argo rollouts abort {name=web} {*}§-n {ns=default}|Namespace|النطاق
2§Retry / restart§إعادة المحاولة / التشغيل§kubectl argo rollouts {mode=@retry rollout,restart,undo} {name=web} {*}§-n {ns=default}|Namespace|النطاق
2§Set image§تغيير الصورة§kubectl argo rollouts set image {name=web} {container=web}={image=nginx:1.27} {*}§-n {ns=default}|Namespace|النطاق
2§Pause / resume§إيقاف / استكمال§kubectl argo rollouts {mode=@pause,resume} {name=web} {*}§-n {ns=default}|Namespace|النطاق
2§Dashboard§لوحة التحكم§kubectl argo rollouts dashboard {*}§-p {port=3100}|Port|المنفذ
2§Lint manifest§فحص المانيفست§kubectl argo rollouts lint {*}§-f {file=rollout.yaml}|File|الملف
2§Analysis runs§تشغيلات التحليل§kubectl get analysisrun,analysistemplate {*}§-n {ns=default}|Namespace|النطاق
#Argo Workflows|Argo Workflows
1§Submit workflow§تشغيل workflow§argo submit {file=workflow.yaml} {*}§-n {ns=argo}|Namespace|النطاق¶--watch|Watch|مراقبة¶--log|Stream logs|بث السجل¶-p {param=message=hello}|Parameter|بارامتر¶--serviceaccount {sa=argo}|Service account|ServiceAccount¶--generate-name {prefix=run-}|Name prefix|بادئة الاسم
1§List workflows§عرض الـ workflows§argo list {*}§-n {ns=argo}|Namespace|النطاق¶--running|Running|العاملة¶--completed|Completed|المنتهية¶--status {status=Failed}|Status|الحالة¶--since {since=1d}|Since|منذ
1§Get workflow§تفاصيل workflow§argo get {name=@latest} {*}§-n {ns=argo}|Namespace|النطاق¶-o {fmt=@yaml,json,name}|Format|الصيغة
1§Workflow logs§سجلات§argo logs {name=@latest} {*}§-n {ns=argo}|Namespace|النطاق¶-f|Follow|متابعة¶-c {container=main}|Container|الحاوية
2§Stop / terminate§إيقاف / إنهاء§argo {mode=@stop,terminate,suspend,resume,retry,resubmit} {name=@latest} {*}§-n {ns=argo}|Namespace|النطاق
1§Delete workflows§حذف§argo delete {name?} {*}§-n {ns=argo}|Namespace|النطاق¶--all|All|الكل¶--completed|Completed|المنتهية¶--older {age=7d}|Older than|أقدم من
2§Cron workflows§الـ Cron workflows§argo cron {mode=@list,create cron.yaml,delete NAME,suspend NAME,resume NAME} {*}§-n {ns=argo}|Namespace|النطاق
2§Workflow templates§القوالب§argo template {mode=@list,create tpl.yaml,get NAME,delete NAME} {*}§-n {ns=argo}|Namespace|النطاق
2§Lint workflow§فحص§argo lint {file=workflow.yaml}
`);
