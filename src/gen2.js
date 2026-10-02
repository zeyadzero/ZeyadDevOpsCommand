(function(){const T=window.TPL;
const add=(c,n,f,k,g)=>T.push({c,n,f,k,g});
add("Docker","docker-compose.yml — WordPress + MariaDB","docker-compose.yml",["name","port","dbpw"],v=>`services:
  wordpress:
    image: wordpress:latest
    restart: unless-stopped
    ports: ["${v.port}:80"]
    environment:
      WORDPRESS_DB_HOST: db
      WORDPRESS_DB_USER: wp
      WORDPRESS_DB_PASSWORD: ${v.dbpw}
      WORDPRESS_DB_NAME: ${v.name}
    volumes: [wp_data:/var/www/html]
    depends_on: [db]
  db:
    image: mariadb:11
    restart: unless-stopped
    environment:
      MARIADB_DATABASE: ${v.name}
      MARIADB_USER: wp
      MARIADB_PASSWORD: ${v.dbpw}
      MARIADB_ROOT_PASSWORD: ${v.dbpw}
    volumes: [db_data:/var/lib/mysql]
volumes:
  wp_data:
  db_data:
`);
add("Docker","docker-compose.yml — Prometheus + Grafana + Node Exporter","docker-compose.yml",[],v=>`services:
  prometheus:
    image: prom/prometheus
    ports: ["9090:9090"]
    volumes: ["./prometheus.yml:/etc/prometheus/prometheus.yml:ro", "prom_data:/prometheus"]
  grafana:
    image: grafana/grafana
    ports: ["3000:3000"]
    volumes: [grafana_data:/var/lib/grafana]
  node-exporter:
    image: prom/node-exporter
    ports: ["9100:9100"]
volumes:
  prom_data:
  grafana_data:
`);
add("Docker","docker-compose.yml — Jenkins + Docker-in-Docker","docker-compose.yml",["port"],v=>`services:
  jenkins:
    image: jenkins/jenkins:lts
    restart: unless-stopped
    ports: ["${v.port}:8080", "50000:50000"]
    volumes:
      - jenkins_home:/var/jenkins_home
      - /var/run/docker.sock:/var/run/docker.sock
    user: root
volumes:
  jenkins_home:
`);
add("Docker","Dockerfile — .NET (multi-stage)","Dockerfile",["name","port"],v=>`FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY *.csproj ./
RUN dotnet restore
COPY . .
RUN dotnet publish -c Release -o /out

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /out .
EXPOSE ${v.port}
ENV ASPNETCORE_URLS=http://+:${v.port}
ENTRYPOINT ["dotnet","${v.name}.dll"]
`);
add("Docker","Dockerfile — Rust (multi-stage)","Dockerfile",["name","port"],v=>`FROM rust:1.80 AS build
WORKDIR /src
COPY . .
RUN cargo build --release

FROM debian:bookworm-slim
COPY --from=build /src/target/release/${v.name} /usr/local/bin/${v.name}
EXPOSE ${v.port}
CMD ["${v.name}"]
`);
add("Docker","Dockerfile — Ruby on Rails","Dockerfile",["port"],v=>`FROM ruby:3.3-slim
RUN apt-get update && apt-get install -y build-essential libpq-dev nodejs && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY Gemfile* ./
RUN bundle install
COPY . .
EXPOSE ${v.port}
CMD ["rails","server","-b","0.0.0.0","-p","${v.port}"]
`);
add("Kubernetes","PersistentVolume (hostPath / NFS)","pv.yaml",["name","size"],v=>`apiVersion: v1
kind: PersistentVolume
metadata:
  name: ${v.name}-pv
spec:
  capacity: {storage: ${v.size}}
  accessModes: [ReadWriteMany]
  persistentVolumeReclaimPolicy: Retain
  storageClassName: manual
  nfs:
    server: 10.0.0.10
    path: /srv/share
  # hostPath: {path: /mnt/data}
`);
add("Kubernetes","LimitRange","limitrange.yaml",["ns","cpu","mem"],v=>`apiVersion: v1
kind: LimitRange
metadata: {name: defaults, namespace: ${v.ns}}
spec:
  limits:
    - type: Container
      default: {cpu: ${v.cpu}, memory: ${v.mem}}
      defaultRequest: {cpu: 100m, memory: 128Mi}
`);
add("Kubernetes","Deployment + Service + Ingress (all in one)","app.yaml",["name","image","port","replicas","ns","host"],v=>`apiVersion: apps/v1
kind: Deployment
metadata: {name: ${v.name}, namespace: ${v.ns}}
spec:
  replicas: ${v.replicas}
  selector: {matchLabels: {app: ${v.name}}}
  template:
    metadata: {labels: {app: ${v.name}}}
    spec:
      containers:
        - name: ${v.name}
          image: ${v.image}
          ports: [{containerPort: ${v.port}}]
---
apiVersion: v1
kind: Service
metadata: {name: ${v.name}, namespace: ${v.ns}}
spec:
  selector: {app: ${v.name}}
  ports: [{port: 80, targetPort: ${v.port}}]
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata: {name: ${v.name}, namespace: ${v.ns}}
spec:
  ingressClassName: nginx
  rules:
    - host: ${v.host}
      http:
        paths:
          - {path: /, pathType: Prefix, backend: {service: {name: ${v.name}, port: {number: 80}}}}
`);
add("Terraform","Azure VM (Linux)","azure.tf",["name","region"],v=>`provider "azurerm" { features {} }

resource "azurerm_resource_group" "rg" {
  name     = "${v.name}-rg"
  location = "westeurope"
}
resource "azurerm_virtual_network" "vnet" {
  name                = "${v.name}-vnet"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
}
`);
add("Terraform","Google Cloud Compute instance","gcp.tf",["name","region"],v=>`provider "google" {
  project = "my-project"
  region  = "${v.region}"
}
resource "google_compute_instance" "${v.name}" {
  name         = "${v.name}"
  machine_type = "e2-medium"
  zone         = "${v.region}-a"
  boot_disk { initialize_params { image = "ubuntu-os-cloud/ubuntu-2204-lts" } }
  network_interface { network = "default" access_config {} }
}
`);
add("Ansible","Playbook — Nginx with template + handler","nginx.yml",["host"],v=>`---
- hosts: web
  become: true
  vars:
    server_name: ${v.host}
  tasks:
    - name: Install nginx
      ansible.builtin.package: {name: nginx, state: present}
    - name: Deploy vhost
      ansible.builtin.template:
        src: vhost.conf.j2
        dest: /etc/nginx/conf.d/{{ server_name }}.conf
      notify: Reload nginx
    - name: Ensure running
      ansible.builtin.service: {name: nginx, state: started, enabled: true}
  handlers:
    - name: Reload nginx
      ansible.builtin.service: {name: nginx, state: reloaded}
`);
add("Ansible","Playbook — Install Kubernetes node prerequisites","k8s-prereq.yml",[],v=>`---
- hosts: k8s
  become: true
  tasks:
    - name: Disable swap
      ansible.builtin.command: swapoff -a
    - name: Comment swap in fstab
      ansible.builtin.replace: {path: /etc/fstab, regexp: '^([^#].*swap.*)$', replace: '# \\1'}
    - name: Load kernel modules
      community.general.modprobe: {name: "{{ item }}", state: present}
      loop: [overlay, br_netfilter]
    - name: Sysctl for k8s
      ansible.posix.sysctl: {name: "{{ item }}", value: "1", sysctl_set: true, reload: true}
      loop: [net.bridge.bridge-nf-call-iptables, net.ipv4.ip_forward]
`);
add("CI/CD","Jenkinsfile — Kubernetes agent pod (Kaniko)","Jenkinsfile",["name","reg"],v=>`pipeline {
  agent {
    kubernetes {
      yaml '''
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: kaniko
    image: gcr.io/kaniko-project/executor:debug
    command: [sleep]
    args: [infinity]
'''
    }
  }
  stages {
    stage('Build & push') {
      steps {
        container('kaniko') {
          sh '/kaniko/executor --context $WORKSPACE --destination ${v.reg}/${v.name}:$BUILD_NUMBER'
        }
      }
    }
  }
}
`);
add("CI/CD","GitHub Actions — Deploy to Kubernetes","deploy.yml",["name","ns"],v=>`name: Deploy
on:
  workflow_dispatch:
  push: {tags: ['v*']}
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: azure/setup-kubectl@v4
      - run: echo "\${{ secrets.KUBECONFIG }}" | base64 -d > kubeconfig
      - run: kubectl --kubeconfig kubeconfig -n ${v.ns} rollout restart deploy/${v.name}
`);
add("Linux","SSH client config (~/.ssh/config)","config",["host","user"],v=>`Host prod
    HostName ${v.host}
    User ${v.user}
    IdentityFile ~/.ssh/id_ed25519
    ServerAliveInterval 60

Host *.internal
    ProxyJump bastion
    User ${v.user}
`);
add("Linux","Dockerfile-less: Podman Quadlet (.container)","app.container",["name","image","port"],v=>`[Unit]
Description=${v.name}

[Container]
Image=${v.image}
PublishPort=${v.port}:${v.port}
AutoUpdate=registry

[Service]
Restart=always

[Install]
WantedBy=default.target
`);
})();
