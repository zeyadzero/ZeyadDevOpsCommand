const F={
name:["اسم التطبيق","myapp"],image:["الصورة (image)","nginx:1.27"],port:["المنفذ","8080"],replicas:["عدد النسخ","3"],ns:["Namespace","default"],host:["الدومين","app.example.com"],
env:["البيئة","production"],repo:["رابط Git","https://github.com/USER/REPO.git"],path:["مسار المانيفست","k8s"],branch:["الفرع","main"],
cpu:["CPU limit","500m"],mem:["Memory limit","256Mi"],size:["الحجم","1Gi"],sched:["الجدولة cron","0 2 * * *"],ver:["الإصدار","1.0.0"],
user:["المستخدم","deploy"],pkg:["الحزمة","nginx"],region:["Region","us-east-1"],itype:["نوع السيرفر","t3.micro"],dbpw:["كلمة مرور DB","ChangeMe123"],
cmd:["أمر التشغيل","/usr/local/bin/app"],reg:["Registry","registry.example.com"],bucket:["Bucket","my-tf-state"],cidr:["CIDR","10.0.0.0/16"],dir:["المجلد","/var/www/html"]};
const T=[
// ---------- Docker
{c:"Docker",n:"Dockerfile — Node.js",f:"Dockerfile",k:["name","port","ver"],g:v=>`FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production PORT=${v.port}
COPY --from=deps /app/node_modules ./node_modules
COPY . .
USER node
EXPOSE ${v.port}
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost:${v.port}/ || exit 1
LABEL app="${v.name}" version="${v.ver}"
CMD ["node","server.js"]
`},
{c:"Docker",n:"Dockerfile — Python (Flask/FastAPI)",f:"Dockerfile",k:["name","port"],g:v=>`FROM python:3.12-slim
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
RUN useradd -m app && chown -R app /app
USER app
EXPOSE ${v.port}
CMD ["gunicorn","-w","4","-b","0.0.0.0:${v.port}","app:app"]
`},
{c:"Docker",n:"Dockerfile — Go (multi-stage)",f:"Dockerfile",k:["name","port"],g:v=>`FROM golang:1.22 AS build
WORKDIR /src
COPY go.* ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -ldflags="-s -w" -o /out/${v.name} .

FROM gcr.io/distroless/static:nonroot
COPY --from=build /out/${v.name} /${v.name}
EXPOSE ${v.port}
ENTRYPOINT ["/${v.name}"]
`},
{c:"Docker",n:"Dockerfile — Java Spring (Maven)",f:"Dockerfile",k:["name","port"],g:v=>`FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn -q dependency:go-offline
COPY src ./src
RUN mvn -q package -DskipTests

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE ${v.port}
ENTRYPOINT ["java","-XX:MaxRAMPercentage=75","-jar","app.jar"]
`},
{c:"Docker",n:"Dockerfile — Nginx static site",f:"Dockerfile",k:[],g:v=>`FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY ./dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
`},
{c:"Docker",n:"Dockerfile — PHP + Apache",f:"Dockerfile",k:[],g:v=>`FROM php:8.3-apache
RUN docker-php-ext-install pdo_mysql opcache && a2enmod rewrite
COPY . /var/www/html/
RUN chown -R www-data:www-data /var/www/html
EXPOSE 80
`},
{c:"Docker",n:".dockerignore",f:".dockerignore",k:[],g:v=>`.git
node_modules
*.log
.env
.vscode
Dockerfile
docker-compose*.yml
README.md
`},
{c:"Docker",n:"docker-compose.yml — App + PostgreSQL + Redis",f:"docker-compose.yml",k:["name","image","port","dbpw"],g:v=>`services:
  ${v.name}:
    image: ${v.image}
    container_name: ${v.name}
    restart: unless-stopped
    ports: ["${v.port}:${v.port}"]
    environment:
      DATABASE_URL: postgres://app:${v.dbpw}@db:5432/app
      REDIS_URL: redis://cache:6379
    depends_on:
      db: {condition: service_healthy}
      cache: {condition: service_started}
    networks: [backend]
  db:
    image: postgres:16-alpine
    restart: unless-stopped
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: ${v.dbpw}
      POSTGRES_DB: app
    volumes: [dbdata:/var/lib/postgresql/data]
    healthcheck:
      test: ["CMD-SHELL","pg_isready -U app"]
      interval: 10s
      retries: 5
    networks: [backend]
  cache:
    image: redis:7-alpine
    restart: unless-stopped
    networks: [backend]
volumes:
  dbdata:
networks:
  backend:
`},
{c:"Docker",n:"docker-compose.yml — Nginx + App (reverse proxy)",f:"docker-compose.yml",k:["name","image","port"],g:v=>`services:
  proxy:
    image: nginx:alpine
    ports: ["80:80","443:443"]
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf:ro
    depends_on: [${v.name}]
  ${v.name}:
    image: ${v.image}
    expose: ["${v.port}"]
    restart: always
`},
{c:"Docker",n:"Docker Swarm stack",f:"stack.yml",k:["name","image","port","replicas"],g:v=>`version: "3.9"
services:
  ${v.name}:
    image: ${v.image}
    ports: ["${v.port}:${v.port}"]
    deploy:
      replicas: ${v.replicas}
      update_config: {parallelism: 1, delay: 10s}
      restart_policy: {condition: on-failure}
      resources:
        limits: {cpus: "0.5", memory: 256M}
`},
// ---------- Kubernetes
{c:"Kubernetes",n:"Namespace + ResourceQuota",f:"namespace.yaml",k:["ns"],g:v=>`apiVersion: v1
kind: Namespace
metadata:
  name: ${v.ns}
---
apiVersion: v1
kind: ResourceQuota
metadata:
  name: quota
  namespace: ${v.ns}
spec:
  hard:
    requests.cpu: "4"
    requests.memory: 8Gi
    limits.cpu: "8"
    limits.memory: 16Gi
    pods: "30"
`},
{c:"Kubernetes",n:"Deployment (with probes & resources)|Deployment (مع probes وresources)",f:"deployment.yaml",k:["name","image","port","replicas","ns","cpu","mem"],g:v=>`apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${v.name}
  namespace: ${v.ns}
  labels: {app: ${v.name}}
spec:
  replicas: ${v.replicas}
  strategy:
    type: RollingUpdate
    rollingUpdate: {maxSurge: 1, maxUnavailable: 0}
  selector:
    matchLabels: {app: ${v.name}}
  template:
    metadata:
      labels: {app: ${v.name}}
    spec:
      containers:
        - name: ${v.name}
          image: ${v.image}
          ports: [{containerPort: ${v.port}}]
          envFrom:
            - configMapRef: {name: ${v.name}-config}
          resources:
            requests: {cpu: 100m, memory: 128Mi}
            limits: {cpu: ${v.cpu}, memory: ${v.mem}}
          readinessProbe:
            httpGet: {path: /, port: ${v.port}}
            initialDelaySeconds: 5
            periodSeconds: 10
          livenessProbe:
            httpGet: {path: /, port: ${v.port}}
            initialDelaySeconds: 15
            periodSeconds: 20
          securityContext:
            allowPrivilegeEscalation: false
            runAsNonRoot: true
`},
{c:"Kubernetes",n:"Service",f:"service.yaml",k:["name","port","ns"],g:v=>`apiVersion: v1
kind: Service
metadata:
  name: ${v.name}
  namespace: ${v.ns}
spec:
  type: ClusterIP   # NodePort | LoadBalancer
  selector: {app: ${v.name}}
  ports:
    - name: http
      port: 80
      targetPort: ${v.port}
`},
{c:"Kubernetes",n:"Ingress (nginx + TLS)",f:"ingress.yaml",k:["name","host","port","ns"],g:v=>`apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ${v.name}
  namespace: ${v.ns}
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
spec:
  ingressClassName: nginx
  tls:
    - hosts: [${v.host}]
      secretName: ${v.name}-tls
  rules:
    - host: ${v.host}
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service: {name: ${v.name}, port: {number: 80}}
`},
{c:"Kubernetes",n:"ConfigMap",f:"configmap.yaml",k:["name","ns","env"],g:v=>`apiVersion: v1
kind: ConfigMap
metadata:
  name: ${v.name}-config
  namespace: ${v.ns}
data:
  APP_ENV: "${v.env}"
  LOG_LEVEL: "info"
`},
{c:"Kubernetes",n:"Secret",f:"secret.yaml",k:["name","ns","dbpw"],g:v=>`apiVersion: v1
kind: Secret
metadata:
  name: ${v.name}-secret
  namespace: ${v.ns}
type: Opaque
stringData:
  DB_PASSWORD: "${v.dbpw}"
`},
{c:"Kubernetes",n:"PersistentVolumeClaim",f:"pvc.yaml",k:["name","ns","size"],g:v=>`apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: ${v.name}-data
  namespace: ${v.ns}
spec:
  accessModes: [ReadWriteOnce]
  resources:
    requests: {storage: ${v.size}}
  # storageClassName: standard
`},
{c:"Kubernetes",n:"StatefulSet (database)|StatefulSet (قاعدة بيانات)",f:"statefulset.yaml",k:["name","image","port","replicas","ns","size"],g:v=>`apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: ${v.name}
  namespace: ${v.ns}
spec:
  serviceName: ${v.name}
  replicas: ${v.replicas}
  selector:
    matchLabels: {app: ${v.name}}
  template:
    metadata:
      labels: {app: ${v.name}}
    spec:
      containers:
        - name: ${v.name}
          image: ${v.image}
          ports: [{containerPort: ${v.port}}]
          volumeMounts: [{name: data, mountPath: /data}]
  volumeClaimTemplates:
    - metadata: {name: data}
      spec:
        accessModes: [ReadWriteOnce]
        resources: {requests: {storage: ${v.size}}}
---
apiVersion: v1
kind: Service
metadata: {name: ${v.name}, namespace: ${v.ns}}
spec:
  clusterIP: None
  selector: {app: ${v.name}}
  ports: [{port: ${v.port}}]
`},
{c:"Kubernetes",n:"DaemonSet",f:"daemonset.yaml",k:["name","image","ns"],g:v=>`apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: ${v.name}
  namespace: ${v.ns}
spec:
  selector:
    matchLabels: {app: ${v.name}}
  template:
    metadata:
      labels: {app: ${v.name}}
    spec:
      tolerations:
        - operator: Exists
      containers:
        - name: ${v.name}
          image: ${v.image}
`},
{c:"Kubernetes",n:"Job",f:"job.yaml",k:["name","image","ns"],g:v=>`apiVersion: batch/v1
kind: Job
metadata:
  name: ${v.name}
  namespace: ${v.ns}
spec:
  backoffLimit: 3
  ttlSecondsAfterFinished: 600
  template:
    spec:
      restartPolicy: Never
      containers:
        - name: ${v.name}
          image: ${v.image}
          command: ["sh","-c","echo done"]
`},
{c:"Kubernetes",n:"CronJob",f:"cronjob.yaml",k:["name","image","ns","sched"],g:v=>`apiVersion: batch/v1
kind: CronJob
metadata:
  name: ${v.name}
  namespace: ${v.ns}
spec:
  schedule: "${v.sched}"
  concurrencyPolicy: Forbid
  successfulJobsHistoryLimit: 3
  jobTemplate:
    spec:
      template:
        spec:
          restartPolicy: OnFailure
          containers:
            - name: ${v.name}
              image: ${v.image}
              command: ["sh","-c","date"]
`},
{c:"Kubernetes",n:"HorizontalPodAutoscaler",f:"hpa.yaml",k:["name","ns"],g:v=>`apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: ${v.name}
  namespace: ${v.ns}
spec:
  scaleTargetRef: {apiVersion: apps/v1, kind: Deployment, name: ${v.name}}
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target: {type: Utilization, averageUtilization: 70}
`},
{c:"Kubernetes",n:"NetworkPolicy (deny all + allow)",f:"networkpolicy.yaml",k:["name","ns","port"],g:v=>`apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny
  namespace: ${v.ns}
spec:
  podSelector: {}
  policyTypes: [Ingress, Egress]
---
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-${v.name}
  namespace: ${v.ns}
spec:
  podSelector:
    matchLabels: {app: ${v.name}}
  policyTypes: [Ingress]
  ingress:
    - ports: [{port: ${v.port}}]
`},
{c:"Kubernetes",n:"RBAC (ServiceAccount + Role + Binding)",f:"rbac.yaml",k:["name","ns"],g:v=>`apiVersion: v1
kind: ServiceAccount
metadata: {name: ${v.name}, namespace: ${v.ns}}
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata: {name: ${v.name}-role, namespace: ${v.ns}}
rules:
  - apiGroups: [""]
    resources: [pods, pods/log, services]
    verbs: [get, list, watch]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata: {name: ${v.name}-rb, namespace: ${v.ns}}
subjects: [{kind: ServiceAccount, name: ${v.name}, namespace: ${v.ns}}]
roleRef: {kind: Role, name: ${v.name}-role, apiGroup: rbac.authorization.k8s.io}
`},
{c:"Kubernetes",n:"Simple Pod|Pod بسيط",f:"pod.yaml",k:["name","image","port","ns"],g:v=>`apiVersion: v1
kind: Pod
metadata:
  name: ${v.name}
  namespace: ${v.ns}
  labels: {app: ${v.name}}
spec:
  containers:
    - name: ${v.name}
      image: ${v.image}
      ports: [{containerPort: ${v.port}}]
`},
{c:"Kubernetes",n:"PodDisruptionBudget",f:"pdb.yaml",k:["name","ns"],g:v=>`apiVersion: policy/v1
kind: PodDisruptionBudget
metadata: {name: ${v.name}, namespace: ${v.ns}}
spec:
  minAvailable: 1
  selector:
    matchLabels: {app: ${v.name}}
`},
{c:"Kubernetes",n:"kustomization.yaml",f:"kustomization.yaml",k:["name","ns"],g:v=>`apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
namespace: ${v.ns}
resources:
  - deployment.yaml
  - service.yaml
  - ingress.yaml
commonLabels:
  app: ${v.name}
images:
  - name: ${v.name}
    newTag: latest
`},
{c:"Kubernetes",n:"ClusterIssuer (cert-manager)",f:"clusterissuer.yaml",k:[],g:v=>`apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata: {name: letsencrypt}
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: admin@example.com
    privateKeySecretRef: {name: letsencrypt-key}
    solvers:
      - http01: {ingress: {class: nginx}}
`},
// ---------- Helm
{c:"Helm",n:"Chart.yaml + values.yaml",f:"Chart.yaml",k:["name","image","port","replicas","ver"],g:v=>`# ===== Chart.yaml =====
apiVersion: v2
name: ${v.name}
description: Helm chart for ${v.name}
type: application
version: ${v.ver}
appVersion: "${v.ver}"

# ===== values.yaml =====
replicaCount: ${v.replicas}
image:
  repository: ${v.image.split(":")[0]}
  tag: "${v.image.split(":")[1]||"latest"}"
  pullPolicy: IfNotPresent
service:
  type: ClusterIP
  port: ${v.port}
ingress:
  enabled: false
  hostname: app.example.com
resources:
  limits: {cpu: 500m, memory: 256Mi}
  requests: {cpu: 100m, memory: 128Mi}
autoscaling:
  enabled: false
`},
// ---------- OpenShift
{c:"OpenShift",n:"Route (TLS edge)",f:"route.yaml",k:["name","host","ns"],g:v=>`apiVersion: route.openshift.io/v1
kind: Route
metadata:
  name: ${v.name}
  namespace: ${v.ns}
spec:
  host: ${v.host}
  to: {kind: Service, name: ${v.name}, weight: 100}
  port: {targetPort: http}
  tls:
    termination: edge
    insecureEdgeTerminationPolicy: Redirect
`},
{c:"OpenShift",n:"BuildConfig (S2I) + ImageStream",f:"build.yaml",k:["name","repo","branch","ns"],g:v=>`apiVersion: image.openshift.io/v1
kind: ImageStream
metadata: {name: ${v.name}, namespace: ${v.ns}}
---
apiVersion: build.openshift.io/v1
kind: BuildConfig
metadata: {name: ${v.name}, namespace: ${v.ns}}
spec:
  source:
    type: Git
    git: {uri: ${v.repo}, ref: ${v.branch}}
  strategy:
    type: Source
    sourceStrategy:
      from: {kind: ImageStreamTag, name: "nodejs:18-ubi8", namespace: openshift}
  output:
    to: {kind: ImageStreamTag, name: "${v.name}:latest"}
  triggers:
    - type: ConfigChange
    - type: GitHub
      github: {secret: CHANGE_ME}
`},
{c:"OpenShift",n:"DeploymentConfig",f:"dc.yaml",k:["name","port","replicas","ns"],g:v=>`apiVersion: apps.openshift.io/v1
kind: DeploymentConfig
metadata: {name: ${v.name}, namespace: ${v.ns}}
spec:
  replicas: ${v.replicas}
  selector: {app: ${v.name}}
  strategy: {type: Rolling}
  triggers:
    - type: ConfigChange
    - type: ImageChange
      imageChangeParams:
        automatic: true
        containerNames: [${v.name}]
        from: {kind: ImageStreamTag, name: "${v.name}:latest"}
  template:
    metadata: {labels: {app: ${v.name}}}
    spec:
      containers:
        - name: ${v.name}
          ports: [{containerPort: ${v.port}}]
`},
{c:"OpenShift",n:"Template (oc process)",f:"template.yaml",k:["name","image","port"],g:v=>`apiVersion: template.openshift.io/v1
kind: Template
metadata: {name: ${v.name}-template}
parameters:
  - {name: APP_NAME, value: ${v.name}}
  - {name: IMAGE, value: "${v.image}"}
objects:
  - apiVersion: v1
    kind: Service
    metadata: {name: "\${APP_NAME}"}
    spec:
      selector: {app: "\${APP_NAME}"}
      ports: [{port: ${v.port}}]
`},
{c:"OpenShift",n:"SecurityContextConstraints (SCC)",f:"scc.yaml",k:["name"],g:v=>`apiVersion: security.openshift.io/v1
kind: SecurityContextConstraints
metadata: {name: ${v.name}-scc}
allowPrivilegedContainer: false
runAsUser: {type: MustRunAsNonRoot}
seLinuxContext: {type: MustRunAs}
fsGroup: {type: MustRunAs}
volumes: [configMap, secret, emptyDir, persistentVolumeClaim]
`},
// ---------- Argo
{c:"Argo CD",n:"Application",f:"application.yaml",k:["name","repo","path","branch","ns"],g:v=>`apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: ${v.name}
  namespace: argocd
spec:
  project: default
  source:
    repoURL: ${v.repo}
    targetRevision: ${v.branch}
    path: ${v.path}
  destination:
    server: https://kubernetes.default.svc
    namespace: ${v.ns}
  syncPolicy:
    automated: {prune: true, selfHeal: true}
    syncOptions: [CreateNamespace=true]
`},
{c:"Argo CD",n:"AppProject",f:"appproject.yaml",k:["name","repo"],g:v=>`apiVersion: argoproj.io/v1alpha1
kind: AppProject
metadata: {name: ${v.name}, namespace: argocd}
spec:
  sourceRepos: ["${v.repo}"]
  destinations:
    - {server: https://kubernetes.default.svc, namespace: "*"}
  clusterResourceWhitelist:
    - {group: "*", kind: "*"}
`},
{c:"Argo CD",n:"ApplicationSet",f:"applicationset.yaml",k:["name","repo","branch"],g:v=>`apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata: {name: ${v.name}, namespace: argocd}
spec:
  generators:
    - list:
        elements:
          - {env: dev}
          - {env: prod}
  template:
    metadata: {name: "${v.name}-{{env}}"}
    spec:
      project: default
      source: {repoURL: ${v.repo}, targetRevision: ${v.branch}, path: "overlays/{{env}}"}
      destination: {server: https://kubernetes.default.svc, namespace: "${v.name}-{{env}}"}
      syncPolicy: {automated: {prune: true}}
`},
{c:"Argo CD",n:"Argo Rollout (Canary)",f:"rollout.yaml",k:["name","image","port","replicas"],g:v=>`apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata: {name: ${v.name}}
spec:
  replicas: ${v.replicas}
  selector:
    matchLabels: {app: ${v.name}}
  template:
    metadata: {labels: {app: ${v.name}}}
    spec:
      containers:
        - {name: ${v.name}, image: "${v.image}", ports: [{containerPort: ${v.port}}]}
  strategy:
    canary:
      steps:
        - setWeight: 20
        - pause: {duration: 1m}
        - setWeight: 50
        - pause: {duration: 1m}
`},
{c:"Argo CD",n:"Argo Workflow",f:"workflow.yaml",k:["name","image"],g:v=>`apiVersion: argoproj.io/v1alpha1
kind: Workflow
metadata:
  generateName: ${v.name}-
spec:
  entrypoint: main
  templates:
    - name: main
      steps:
        - - {name: build, template: run}
        - - {name: test, template: run}
    - name: run
      container:
        image: ${v.image}
        command: [sh, -c]
        args: ["echo running"]
`},
// ---------- Ansible
{c:"Ansible",n:"Playbook — install & start a service (Debian+RedHat)|Playbook — تثبيت وتشغيل خدمة (Debian+RedHat)",f:"site.yml",k:["pkg"],g:v=>`---
- name: Install and start ${v.pkg}
  hosts: all
  become: true
  tasks:
    - name: Update cache (Debian)
      ansible.builtin.apt:
        update_cache: true
      when: ansible_os_family == "Debian"

    - name: Install ${v.pkg}
      ansible.builtin.package:
        name: ${v.pkg}
        state: present

    - name: Enable and start ${v.pkg}
      ansible.builtin.service:
        name: ${v.pkg}
        state: started
        enabled: true

    - name: Open firewall (RedHat)
      ansible.posix.firewalld:
        service: http
        permanent: true
        state: enabled
        immediate: true
      when: ansible_os_family == "RedHat"
`},
{c:"Ansible",n:"Inventory (INI)",f:"inventory.ini",k:["user"],g:v=>`[web]
web1 ansible_host=10.0.0.11
web2 ansible_host=10.0.0.12

[db]
db1 ansible_host=10.0.0.21

[all:vars]
ansible_user=${v.user}
ansible_ssh_private_key_file=~/.ssh/id_ed25519
ansible_python_interpreter=/usr/bin/python3
`},
{c:"Ansible",n:"Inventory (YAML)",f:"inventory.yml",k:["user"],g:v=>`all:
  vars:
    ansible_user: ${v.user}
  children:
    web:
      hosts:
        web1: {ansible_host: 10.0.0.11}
        web2: {ansible_host: 10.0.0.12}
    db:
      hosts:
        db1: {ansible_host: 10.0.0.21}
`},
{c:"Ansible",n:"ansible.cfg",f:"ansible.cfg",k:[],g:v=>`[defaults]
inventory = inventory.ini
host_key_checking = False
forks = 20
retry_files_enabled = False
stdout_callback = yaml

[privilege_escalation]
become = True
become_method = sudo
`},
{c:"Ansible",n:"Role — tasks/main.yml",f:"tasks/main.yml",k:["pkg"],g:v=>`---
- name: Install ${v.pkg}
  ansible.builtin.package: {name: "{{ ${v.pkg}_package | default('${v.pkg}') }}", state: present}
- name: Deploy config
  ansible.builtin.template: {src: ${v.pkg}.conf.j2, dest: /etc/${v.pkg}/${v.pkg}.conf, mode: "0644"}
  notify: restart ${v.pkg}
- name: Start service
  ansible.builtin.service: {name: ${v.pkg}, state: started, enabled: true}
`},
{c:"Ansible",n:"Playbook — create user + SSH hardening|Playbook — إنشاء مستخدم + SSH hardening",f:"harden.yml",k:["user"],g:v=>`---
- hosts: all
  become: true
  tasks:
    - name: Create user
      ansible.builtin.user: {name: ${v.user}, groups: "{{ 'sudo' if ansible_os_family=='Debian' else 'wheel' }}", shell: /bin/bash}
    - name: Authorize key
      ansible.posix.authorized_key: {user: ${v.user}, key: "{{ lookup('file','~/.ssh/id_ed25519.pub') }}"}
    - name: Harden sshd
      ansible.builtin.lineinfile:
        path: /etc/ssh/sshd_config
        regexp: "{{ item.r }}"
        line: "{{ item.l }}"
      loop:
        - {r: '^#?PermitRootLogin', l: 'PermitRootLogin no'}
        - {r: '^#?PasswordAuthentication', l: 'PasswordAuthentication no'}
      notify: restart sshd
  handlers:
    - name: restart sshd
      ansible.builtin.service: {name: "{{ 'ssh' if ansible_os_family=='Debian' else 'sshd' }}", state: restarted}
`},
{c:"Ansible",n:"Playbook — deploy Docker + a container|Playbook — نشر Docker + حاوية",f:"docker.yml",k:["name","image","port"],g:v=>`---
- hosts: all
  become: true
  tasks:
    - name: Install Docker
      ansible.builtin.package: {name: "{{ 'docker.io' if ansible_os_family=='Debian' else 'docker-ce' }}", state: present}
    - name: Start Docker
      ansible.builtin.service: {name: docker, state: started, enabled: true}
    - name: Run container
      community.docker.docker_container:
        name: ${v.name}
        image: ${v.image}
        state: started
        restart_policy: always
        published_ports: ["${v.port}:${v.port}"]
`},
// ---------- Terraform
{c:"Terraform",n:"AWS EC2 + Security Group",f:"main.tf",k:["name","region","itype","cidr"],g:v=>`terraform {
  required_version = ">= 1.5"
  required_providers {
    aws = { source = "hashicorp/aws", version = "~> 5.0" }
  }
}

provider "aws" { region = "${v.region}" }

data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]
  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }
}

resource "aws_security_group" "${v.name}" {
  name = "${v.name}-sg"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["${v.cidr}"]
  }
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "${v.name}" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = "${v.itype}"
  vpc_security_group_ids = [aws_security_group.${v.name}.id]
  tags = { Name = "${v.name}" }
}

output "public_ip" { value = aws_instance.${v.name}.public_ip }
`},
{c:"Terraform",n:"Backend S3 + DynamoDB lock",f:"backend.tf",k:["bucket","region","name"],g:v=>`terraform {
  backend "s3" {
    bucket         = "${v.bucket}"
    key            = "${v.name}/terraform.tfstate"
    region         = "${v.region}"
    dynamodb_table = "terraform-locks"
    encrypt        = true
  }
}
`},
{c:"Terraform",n:"variables.tf + terraform.tfvars",f:"variables.tf",k:["region","itype","env"],g:v=>`# ===== variables.tf =====
variable "region"        { type = string }
variable "instance_type" { type = string }
variable "environment"   { type = string }

# ===== terraform.tfvars =====
region        = "${v.region}"
instance_type = "${v.itype}"
environment   = "${v.env}"
`},
{c:"Terraform",n:"VPC module",f:"vpc.tf",k:["name","cidr","region"],g:v=>`module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 5.0"

  name = "${v.name}-vpc"
  cidr = "${v.cidr}"
  azs             = ["${v.region}a", "${v.region}b"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24"]
  enable_nat_gateway = true
  single_nat_gateway = true
}
`},
{c:"Terraform",n:"Kubernetes provider (Deployment)",f:"k8s.tf",k:["name","image","replicas","ns"],g:v=>`provider "kubernetes" { config_path = "~/.kube/config" }

resource "kubernetes_deployment" "${v.name}" {
  metadata { name = "${v.name}" namespace = "${v.ns}" }
  spec {
    replicas = ${v.replicas}
    selector { match_labels = { app = "${v.name}" } }
    template {
      metadata { labels = { app = "${v.name}" } }
      spec {
        container {
          name  = "${v.name}"
          image = "${v.image}"
        }
      }
    }
  }
}
`},
// ---------- CI/CD
{c:"CI/CD",n:"Jenkinsfile (Build → Test → Docker → Deploy K8s)",f:"Jenkinsfile",k:["name","reg","ns"],g:v=>`pipeline {
  agent any
  environment {
    IMAGE = "${v.reg}/${v.name}"
    TAG   = "\${env.BUILD_NUMBER}"
  }
  options { timestamps(); timeout(time: 30, unit: 'MINUTES') }
  stages {
    stage('Checkout') { steps { checkout scm } }
    stage('Test')     { steps { sh 'make test' } }
    stage('Build')    { steps { sh 'docker build -t $IMAGE:$TAG .' } }
    stage('Push') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'registry', usernameVariable: 'U', passwordVariable: 'P')]) {
          sh 'echo $P | docker login ${v.reg} -u $U --password-stdin && docker push $IMAGE:$TAG'
        }
      }
    }
    stage('Deploy') {
      when { branch 'main' }
      steps { sh 'kubectl -n ${v.ns} set image deploy/${v.name} ${v.name}=$IMAGE:$TAG' }
    }
  }
  post {
    success { echo 'OK' }
    failure { echo 'FAILED' }
    always  { cleanWs() }
  }
}
`},
{c:"CI/CD",n:"GitHub Actions — CI + Docker push",f:".github/workflows/ci.yml",k:["name","branch","reg"],g:v=>`name: CI
on:
  push: {branches: [${v.branch}]}
  pull_request:
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Test
        run: make test
      - uses: docker/setup-buildx-action@v3
      - uses: docker/login-action@v3
        with:
          registry: ${v.reg}
          username: \${{ secrets.REG_USER }}
          password: \${{ secrets.REG_PASS }}
      - uses: docker/build-push-action@v5
        with:
          push: \${{ github.ref == 'refs/heads/${v.branch}' }}
          tags: ${v.reg}/${v.name}:\${{ github.sha }}
`},
{c:"CI/CD",n:"GitLab CI — .gitlab-ci.yml",f:".gitlab-ci.yml",k:["name","ns"],g:v=>`stages: [test, build, deploy]

variables:
  IMAGE: $CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA

test:
  stage: test
  image: node:20
  script: [npm ci, npm test]

build:
  stage: build
  image: docker:27
  services: [docker:27-dind]
  script:
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
    - docker build -t $IMAGE .
    - docker push $IMAGE

deploy:
  stage: deploy
  image: bitnami/kubectl
  script: [kubectl -n ${v.ns} set image deploy/${v.name} ${v.name}=$IMAGE]
  only: [main]
`},
{c:"CI/CD",n:"Tekton Pipeline + Task",f:"pipeline.yaml",k:["name","repo"],g:v=>`apiVersion: tekton.dev/v1
kind: Task
metadata: {name: ${v.name}-build}
spec:
  steps:
    - name: build
      image: alpine
      script: echo "building"
---
apiVersion: tekton.dev/v1
kind: Pipeline
metadata: {name: ${v.name}-pipeline}
spec:
  tasks:
    - name: build
      taskRef: {name: ${v.name}-build}
`},
// ---------- Linux / Services
{c:"Linux",n:"systemd service",f:"app.service",k:["name","cmd","user"],g:v=>`[Unit]
Description=${v.name}
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=${v.user}
WorkingDirectory=/opt/${v.name}
ExecStart=${v.cmd}
Restart=always
RestartSec=5
Environment=NODE_ENV=production
NoNewPrivileges=true

[Install]
WantedBy=multi-user.target
`},
{c:"Linux",n:"systemd timer + service",f:"job.timer",k:["name","cmd"],g:v=>`# ===== ${v.name}.service =====
[Unit]
Description=${v.name} job
[Service]
Type=oneshot
ExecStart=${v.cmd}

# ===== ${v.name}.timer =====
[Unit]
Description=Run ${v.name} daily
[Timer]
OnCalendar=daily
Persistent=true
[Install]
WantedBy=timers.target
`},
{c:"Linux",n:"Nginx — reverse proxy + SSL",f:"nginx.conf",k:["host","port"],g:v=>`server {
    listen 80;
    server_name ${v.host};
    return 301 https://$host$request_uri;
}
server {
    listen 443 ssl http2;
    server_name ${v.host};
    ssl_certificate     /etc/letsencrypt/live/${v.host}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${v.host}/privkey.pem;
    location / {
        proxy_pass http://127.0.0.1:${v.port};
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
`},
{c:"Linux",n:"Nginx — load balancer",f:"lb.conf",k:["port"],g:v=>`upstream backend {
    least_conn;
    server 10.0.0.11:${v.port};
    server 10.0.0.12:${v.port};
    server 10.0.0.13:${v.port} backup;
}
server {
    listen 80;
    location / { proxy_pass http://backend; }
}
`},
{c:"Linux",n:"Apache VirtualHost",f:"site.conf",k:["host","dir"],g:v=>`<VirtualHost *:80>
    ServerName ${v.host}
    DocumentRoot ${v.dir}
    <Directory ${v.dir}>
        AllowOverride All
        Require all granted
    </Directory>
    ErrorLog \${APACHE_LOG_DIR}/${v.host}-error.log
    CustomLog \${APACHE_LOG_DIR}/${v.host}-access.log combined
</VirtualHost>
`},
{c:"Linux",n:"HAProxy",f:"haproxy.cfg",k:["port"],g:v=>`global
    log /dev/log local0
    maxconn 4096
defaults
    mode http
    timeout connect 5s
    timeout client 30s
    timeout server 30s
frontend web
    bind *:80
    default_backend app
backend app
    balance roundrobin
    option httpchk GET /
    server s1 10.0.0.11:${v.port} check
    server s2 10.0.0.12:${v.port} check
`},
{c:"Linux",n:"logrotate",f:"app.logrotate",k:["name"],g:v=>`/var/log/${v.name}/*.log {
    daily
    rotate 14
    compress
    delaycompress
    missingok
    notifempty
    copytruncate
}
`},
{c:"Linux",n:"cloud-init",f:"user-data.yml",k:["user","pkg"],g:v=>`#cloud-config
users:
  - name: ${v.user}
    groups: sudo
    shell: /bin/bash
    sudo: ALL=(ALL) NOPASSWD:ALL
    ssh_authorized_keys:
      - ssh-ed25519 AAAA... me@host
package_update: true
packages: [${v.pkg}, git, curl]
runcmd:
  - systemctl enable --now ${v.pkg}
`},
{c:"Linux",n:"Vagrantfile",f:"Vagrantfile",k:["name"],g:v=>`Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/jammy64"
  config.vm.hostname = "${v.name}"
  config.vm.network "private_network", ip: "192.168.56.10"
  config.vm.provider "virtualbox" do |vb|
    vb.memory = 2048
    vb.cpus = 2
  end
  config.vm.provision "shell", inline: "apt-get update && apt-get install -y git curl"
end
`},
{c:"Linux",n:"Makefile",f:"Makefile",k:["name","reg","ver"],g:v=>`IMAGE := ${v.reg}/${v.name}
TAG   := ${v.ver}

.PHONY: build push run test deploy
build:
	docker build -t $(IMAGE):$(TAG) .
push: build
	docker push $(IMAGE):$(TAG)
run:
	docker run --rm -p 8080:8080 $(IMAGE):$(TAG)
test:
	@echo "run tests"
deploy:
	kubectl apply -f k8s/
`},
// ---------- Bash
{c:"Bash",n:"Backup script (with rotation)|سكربت Backup (مع تدوير)",f:"backup.sh",k:["name","dir"],g:v=>`#!/usr/bin/env bash
set -euo pipefail
SRC="${v.dir}"
DEST="/backup/${v.name}"
KEEP=7
STAMP=$(date +%F_%H%M)

mkdir -p "$DEST"
tar czf "$DEST/${v.name}-$STAMP.tar.gz" "$SRC"
find "$DEST" -name '*.tar.gz' -mtime +$KEEP -delete
echo "[$(date)] backup done: $DEST/${v.name}-$STAMP.tar.gz"
`},
{c:"Bash",n:"Docker install script (Debian + RedHat)|سكربت تثبيت Docker (Debian + RedHat)",f:"install-docker.sh",k:[],g:v=>`#!/usr/bin/env bash
set -euo pipefail
[ "$(id -u)" -eq 0 ] || { echo "run as root"; exit 1; }
. /etc/os-release
case "$ID $ID_LIKE" in
  *debian*|*ubuntu*)
    apt-get update && apt-get install -y ca-certificates curl gnupg
    curl -fsSL https://get.docker.com | sh ;;
  *rhel*|*fedora*|*centos*)
    dnf install -y dnf-plugins-core
    dnf config-manager --add-repo https://download.docker.com/linux/rhel/docker-ce.repo
    dnf install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin ;;
  *) echo "unsupported OS"; exit 1 ;;
esac
systemctl enable --now docker
echo "Docker installed: $(docker --version)"
`},
{c:"Bash",n:"Simple deploy script|سكربت Deploy بسيط",f:"deploy.sh",k:["name","image","port"],g:v=>`#!/usr/bin/env bash
set -euo pipefail
NAME=${v.name}
IMAGE=\${1:-${v.image}}

docker pull "$IMAGE"
docker rm -f "$NAME" 2>/dev/null || true
docker run -d --name "$NAME" --restart unless-stopped -p ${v.port}:${v.port} "$IMAGE"
sleep 3
curl -fsS http://localhost:${v.port}/ >/dev/null && echo "✔ $NAME is up" || { echo "✘ failed"; docker logs "$NAME"; exit 1; }
`},
{c:"Bash",n:"Resource monitoring script|سكربت مراقبة الموارد",f:"monitor.sh",k:[],g:v=>`#!/usr/bin/env bash
CPU=$(top -bn1 | awk '/Cpu/ {print 100-$8}')
MEM=$(free | awk '/Mem/ {printf "%.1f", $3/$2*100}')
DISK=$(df / | awk 'NR==2 {print $5}' | tr -d %)
echo "CPU: $CPU%  MEM: $MEM%  DISK: $DISK%"
[ "$DISK" -gt 85 ] && echo "WARNING: disk usage high"
`},
// ---------- Monitoring
{c:"Monitoring",n:"prometheus.yml",f:"prometheus.yml",k:["port"],g:v=>`global:
  scrape_interval: 15s
rule_files: [alerts.yml]
alerting:
  alertmanagers: [{static_configs: [{targets: ['localhost:9093']}]}]
scrape_configs:
  - job_name: prometheus
    static_configs: [{targets: ['localhost:9090']}]
  - job_name: node
    static_configs: [{targets: ['localhost:9100']}]
  - job_name: app
    metrics_path: /metrics
    static_configs: [{targets: ['localhost:${v.port}']}]
`},
{c:"Monitoring",n:"alerts.yml (Prometheus rules)",f:"alerts.yml",k:[],g:v=>`groups:
  - name: node
    rules:
      - alert: InstanceDown
        expr: up == 0
        for: 2m
        labels: {severity: critical}
        annotations: {summary: "{{ $labels.instance }} is down"}
      - alert: HighCPU
        expr: 100 - avg(rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100 > 85
        for: 10m
        labels: {severity: warning}
      - alert: DiskAlmostFull
        expr: (node_filesystem_avail_bytes / node_filesystem_size_bytes) * 100 < 10
        for: 5m
        labels: {severity: warning}
`},
{c:"Monitoring",n:"ServiceMonitor (Prometheus Operator)",f:"servicemonitor.yaml",k:["name","ns"],g:v=>`apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata: {name: ${v.name}, namespace: ${v.ns}}
spec:
  selector:
    matchLabels: {app: ${v.name}}
  endpoints:
    - {port: http, path: /metrics, interval: 15s}
`}
];
window.TPL=T;window.TPLF=F;
