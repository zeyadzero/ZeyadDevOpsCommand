<div align="center">

# ⚙️ Zeyad DevOps Command

**مركز أوامر DevOps و Linux بواجهة ثنائية اللغة (عربي / English) وترمنال حقيقي مدمج.**
1,341 أمر من الأساسي للمتقدم · Debian و RedHat · اختار الخيارات وسمّي اللي تحبه واضغط تشغيل.

[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
![Platform](https://img.shields.io/badge/platform-Linux%20x86__64-informational)
![Electron](https://img.shields.io/badge/built%20with-Electron-47848f)
![Commands](https://img.shields.io/badge/commands-1341-0d9488)
![Templates](https://img.shields.io/badge/file%20templates-89-0d9488)

[English](README.md) · **العربية**

<img src="docs/screenshots/arabic.png" alt="Zeyad DevOps Command" width="900">

</div>

---

<div dir="rtl">

## ليه المشروع ده؟

الـ cheat sheets ثابتة، لكن الشغل الحقيقي مش ثابت: محتاج اسم الـ container بتاعك، والـ namespace بتاعك، وflag زيادة بتستخدمه مرتين في السنة.

البرنامج بيحوّل كل أمر لـ **منشئ أوامر** صغير: تختار الخيارات اللي محتاجها، تكتب أسماءك، تشوف الأمر النهائي بيتحدث لحظياً، وتشغّله في الترمنال المدمج بضغطة واحدة — من غير نسخ ولصق ولا إعادة كتابة.

## المميزات

- **1,341 أمر في 27 أداة** عليها مستوى: 🟢 أساسي (398) · 🟠 متوسط (781) · 🔴 متقدم (162).
- **Debian و RedHat معاً**: APT/dpkg وDNF/rpm وUFW وfirewalld وAppArmor وSELinux وnetplan وNetworkManager، كل واحد في قسمه الكامل، مع فلتر Debian / RedHat.
- **منشئ أوامر** لكل أمر:
  - **متغيرات** بتسمّيها بنفسك (اسم الحاوية، المنفذ، الـ namespace، الملف…).
  - **خيارات** بتفعّلها وتقفلها (`-d`, `--restart`, `--memory`, `-n <namespace>`…) وليها حقول للقيمة.
  - **تكملة الأمر:** `sudo`، وسائط إضافية، `| pipe`، `> حفظ في ملف`، `&` في الخلفية.
  - المتغير الناقص بيتلوّن ويمنع التشغيل لحد ما تملاه.
- **ترمنال حقيقي (PTY)** مدمج: ألوان وتبويبات وتغيير حجم ونسخ ولصق.
- **اضغط على الأمر يشتغل فوراً** في الترمنال من غير Enter.
- **زرار إيقاف شغال**: `■ إيقاف` بيبعت Ctrl+C، و`☠ قتل إجباري` بيقتل حتى العملية اللي بتتجاهل Ctrl+C.
- **حماية**: الأوامر الخطيرة (`rm -r` و`prune` و`--force` و`drop` و`destroy`…) بتطلب تأكيد قبل التنفيذ.
- **مولّد ملفات**: 89 قالب (Dockerfile وCompose وYAML لـ Kubernetes/OpenShift/Argo وAnsible وTerraform وJenkinsfile وGitHub Actions وsystemd وNginx…) بحقول تتعبى ومعاينة لحظية وحفظ على القرص.
- **واجهة ثنائية اللغة**: English (الافتراضية) وعربي بـ RTL صحيح، وكل عنوان أمر ووصف خيار مترجم. البحث بيشتغل باللغتين.
- **بحث في كل حاجة** (`Ctrl+K`)، ومفضلة (تصدير كملف `.sh`)، وآخر ما شغّلته، وثيم فاتح/داكن.
- **أوامر تثبيت لكل أداة** منفصلة لـ Debian ولـ RedHat.
- **أوفلاين وخصوصية**: مفيش telemetry ومفيش اتصالات شبكة من البرنامج نفسه.

## لقطات الشاشة

| منشئ الأوامر | الترمنال المدمج |
|---|---|
| <img src="docs/screenshots/builder.png" alt="Command builder"> | <img src="docs/screenshots/terminal.png" alt="Terminal"> |

## التثبيت والتشغيل

حمّل آخر ملف `Zeyad-DevOps-Command-<version>-x86_64.AppImage` من صفحة [**Releases**](../../releases):

```bash
chmod +x Zeyad-DevOps-Command-*-x86_64.AppImage
./Zeyad-DevOps-Command-*-x86_64.AppImage
```

**المتطلبات**

| المتطلب | ملاحظات |
|---|---|
| Linux **x86_64** بسطح مكتب | اتبنى واتجرب على عائلة Debian، وعائلة RedHat المفروض تشتغل بنفس الشكل |
| **FUSE 2** لتشغيل الـ AppImage | شوف تحت لو ظهرت رسالة `libfuse.so.2` |
| `python3` **أو** `script` (util-linux) | بيستخدمهم الترمنال المدمج، وموجودين تقريباً على كل توزيعة |

**لو ظهرت `dlopen(): error loading libfuse.so.2`:**

```bash
# Ubuntu 24.04+ / Debian 13+
sudo apt install -y libfuse2t64
# أوبنتو / ديبيان الأقدم
sudo apt install -y libfuse2
# RedHat / Rocky / Alma / Fedora
sudo dnf install -y fuse fuse-libs
```

أو شغّله من غير FUSE:

```bash
./Zeyad-DevOps-Command-*-x86_64.AppImage --appimage-extract-and-run
```

## محتويات البرنامج

| الأداة | التوزيعة | عدد الأوامر | التغطية |
|---|---|---:|---|
| 🐧 أساسيات لينكس | Debian + RedHat | 101 | أوامر الشل اليومية: الملفات والنصوص والعمليات والأرشفة ومعلومات النظام |
| 📦 APT و dpkg (ديبيان/أوبنتو) | Debian | 53 | إدارة الحزم الكاملة على أنظمة ديبيان |
| 🎩 DNF و RPM (ريدهات) | RedHat | 54 | إدارة الحزم الكاملة على أنظمة ريدهات |
| ⚙️ systemd والسجلات | Debian + RedHat | 35 | الخدمات والـ targets والمؤقتات والسجلات وتحليل الإقلاع |
| 🌐 الشبكات | Debian + RedHat | 52 | الواجهات والتوجيه و DNS والتشخيص والالتقاط و NetworkManager |
| 🧱 جدار UFW (ديبيان) | Debian | 20 | جدار ناري مبسط: القواعد والبروفايلات والسجلات |
| 🔥 جدار firewalld (ريدهات) | RedHat | 22 | المناطق والخدمات والقواعد الغنية والتوجيه |
| 🧰 iptables و nftables | Debian + RedHat | 20 | تصفية الحزم و NAT منخفض المستوى |
| 👤 المستخدمون و SSH والوصول | Debian + RedHat | 38 | الحسابات والمجموعات و sudo ومفاتيح SSH والنقل والأنفاق |
| 🛡️ الأمان والتحصين | Debian + RedHat | 60 | SELinux و AppArmor والتدقيق و OpenSSL و GPG وفحص الثغرات |
| 💾 الأقراص و LVM ونظم الملفات | Debian + RedHat | 53 | التقسيم ونظم الملفات والـ mount و LVM و RAID والتشفير والـ swap و NFS |
| 🌿 Git | Debian + RedHat | 66 | التحكم في الإصدارات من أول commit لعمليات التاريخ المتقدمة |
| 🐳 Docker | Debian + RedHat | 93 | الحاويات والصور والشبكات والـ volumes و Compose و Swarm والـ registry |
| 🦭 Podman و Buildah و Skopeo | Debian + RedHat | 26 | حاويات بدون daemon (الافتراضي في ريدهات) والـ pods و Quadlet وأدوات الصور |
| ☸️ كوبرنيتس (kubectl و kubeadm) | Debian + RedHat | 103 | إدارة العنقود كاملة: الأحمال والشبكات والإعدادات والصلاحيات والعقد والتشخيص وبناء العنقود |
| ⎈ Helm و Minikube و kind و k3s | Debian + RedHat | 40 | مدير حزم Kubernetes والعناقيد المحلية |
| 🔴 أوبن شيفت (oc) | Debian + RedHat | 111 | المشاريع والتطبيقات والبناء والـ routes و SCC والـ operators والعقد وإدارة العنقود |
| 🐙 Argo CD و Rollouts و Workflows | Debian + RedHat | 50 | تسليم GitOps والنشر التدريجي ومحرك الـ workflows |
| 🅰️ Ansible | Debian + RedHat | 40 | أوامر ad-hoc و playbooks و roles و Galaxy و Vault والجرد والفحص |
| 🏗️ Terraform و OpenTofu | Debian + RedHat | 37 | البنية كتعليمات برمجية: التهيئة والخطة والتطبيق والـ state والـ workspaces والـ modules والأدوات |
| 🤵 جنكنز | Debian + RedHat | 40 | التثبيت و CLI و REST API وخطوط الـ pipelines والـ agents والنسخ الاحتياطي وحل المشاكل |
| 📈 المراقبة والسجلات | Debian + RedHat | 38 | Prometheus و Grafana و Alertmanager و Loki و ELK والـ exporters |
| ☁️ أدوات السحابة (AWS و Azure و GCP) | Debian + RedHat | 42 | الأوامر الأساسية للسحابات الكبرى |
| 🕸️ خوادم الويب وقواعد البيانات | Debian + RedHat | 45 | Nginx و Apache و HAProxy و MySQL و PostgreSQL و MongoDB و Redis والطوابير |
| 🔁 أدوات CI/CD وأدوات DevOps | Debian + RedHat | 41 | GitHub CLI و GitLab و Flux و Tekton و Packer و Kustomize و Skaffold و SonarQube و Nexus |
| 🖥️ الأجهزة الافتراضية (KVM و Vagrant و LXC) | Debian + RedHat | 24 | libvirt و QEMU و VirtualBox و Vagrant و cloud-init و LXD |
| 📜 برمجة Bash | Debian + RedHat | 37 | المتغيرات والشروط والحلقات والدوال ومعالجة الأخطاء وأنماط السكربتات |

**الإجمالي: 27 أداة · 1,341 أمر.**

بالإضافة لـ **89 قالب ملف**: Dockerfiles (Node وPython وGo وJava وPHP و.NET وRust وRuby وNginx)، وCompose وSwarm، وملفات Kubernetes الأساسية (Deployment وService وIngress وConfigMap وSecret وPVC وStatefulSet وDaemonSet وJob وCronJob وHPA وNetworkPolicy وRBAC وKustomize…)، وHelm، وOpenShift (Route وBuildConfig وDeploymentConfig وSCC)، وArgo، وAnsible، وTerraform (AWS وAzure وGCP)، وCI/CD، وLinux (systemd وNginx وApache وHAProxy وcloud-init)، وسكربتات Bash، وإعدادات Prometheus.

## طريقة الاستخدام

**شغّل أمر بضغطة.** اضغط على أي أمر (أو زرار **▶ تشغيل**) وهيتنفذ في الترمنال فوراً.

**خصّصه قبل التشغيل.** اضغط **⚙** على الكارت:

1. املأ **المتغيرات** باسم الحاوية والمنفذ والـ namespace بتاعك.
2. فعّل **الخيارات** اللي محتاجها. اللي ليه قيمة بيظهر له حقل تحته.
3. زوّد **التكملة**: `sudo` أو وسائط إضافية أو pipe أو redirect أو تشغيل في الخلفية.
4. الأمر بيتحدث لحظياً (الأصفر = قيمك، والسماوي = الخيارات). اضغط **▶ تشغيل** أو **⎘ نسخ** أو **↳ لصق** (يحطه في الترمنال من غير ما ينفذه).

**الترمنال:** زرار `⌨ الترمنال` (أو ``Ctrl+` ``). اسحب حافته العلوية لتغيير الحجم، و**＋** لتبويب جديد.

| الإجراء | الطريقة |
|---|---|
| إيقاف البرنامج الشغال | زرار `■ إيقاف` أو `Ctrl+C` |
| قتل إجباري لبرنامج عالق | زرار `☠ قتل إجباري` |
| نسخ / لصق في الترمنال | `Ctrl+Shift+C` / `Ctrl+Shift+V` أو كليك يمين |
| فتح ترمنال خارجي | `↗ نافذة خارجية` |

**الاختصارات:** `Ctrl+K` للبحث · ``Ctrl+` `` لإظهار/إخفاء الترمنال · `Esc` لمسح البحث أو إغلاق النافذة.

**الفلاتر:** من الشريط العلوي: Debian / RedHat، والمستوى (أساسي / متوسط / متقدم). زرار **EN / عربي** بيبدّل اللغة، والبرنامج بيبدأ بالإنجليزي.

## البناء من المصدر

المتطلبات: Node.js 20+ و npm.

```bash
git clone https://github.com/zeyadzero/ZeyadDevOpsCommand.git
cd zeyad-devops-command
npm install

npm start            # تشغيل للتطوير
npm run validate     # فحص كل الأوامر والقوالب (bash -n على كل أمر)
npm run dist         # بناء الـ AppImage داخل ./dist
```

أمر `npm run validate` بيحلل كل أمر، وبيبنيه بالقيم الافتراضية وبكل الخيارات مفعّلة، وبيفحص صياغته بـ `bash -n`. شغّله قبل أي Pull Request.

## هيكل المشروع

```text
.
├── main.js                 # عملية Electron الرئيسية: النافذة وجلسات PTY
├── preload.js              # جسر آمن بين الواجهة والعملية الرئيسية
├── scripts/validate.js     # فحص صياغة كل الأوامر والقوالب
├── docs/screenshots/
└── src/
    ├── index.html          # الواجهة والتنسيق
    ├── app.js              # التنقل والكروت والترمنال والمولّد والترجمة
    ├── engine.js           # محلل وباني الأوامر (بدون DOM)
    ├── cmds-a.js … cmds-e.js   # تعريفات الأوامر (البيانات)
    ├── gen.js, gen2.js     # قوالب المولّد
    └── vendor/             # xterm.js (مضمّن، يشتغل أوفلاين)
```

## إضافة أوامر (للمساهمين)

الأوامر نصوص عادية في `src/cmds-*.js`. كل سطر = أمر:

```text
المستوى§English title§العنوان بالعربي§قالب الأمر§خيار1¶خيار2¶…
```

| الجزء | المعنى |
|---|---|
| المستوى | `1` أساسي · `2` متوسط · `3` متقدم |
| `{key}` | متغير مطلوب (يمنع التشغيل لحد ما يتملي) |
| `{key=default}` | متغير بقيمة افتراضية |
| `{key?}` | متغير اختياري (يتحذف لو فاضي) |
| `{key=@a,b,c}` | قايمة اختيار، والأول هو الافتراضي |
| `{*}` | مكان إدراج الخيارات المفعّلة |
| `<<NAME>>` | مجموعة خيارات مشتركة من `window.MAC` |
| `flag\|English\|عربي` | خيار واحد، ويقدر يحتوي متغيراته |
| `#English\|عربي` | بداية قسم جديد |

مثال:

```text
1§Run a container§تشغيل حاوية§docker run {*} {image=nginx}§-d|Detached|في الخلفية¶--name {name=web}|Container name|اسم الحاوية¶-p {ports=8080:80}|Publish port|نشر منفذ
```

ملاحظات: كل أمر لازم يبقى له عنوان بالإنجليزي والعربي، وكل خيار له وصف باللغتين. و`${VAR}` و`%{x}` مش بتتحسب متغيرات. وشغّل `npm run validate` قبل ما ترفع التعديل.

**إضافة قالب ملف:** ضيف في `src/gen2.js`:

```js
add("Category", "Name in English|الاسم بالعربي", "filename.yaml", ["name","port"], v => `...${v.name}...`);
```

## ملاحظات أمان

- الترمنال بينفذ الأوامر **بصلاحيات حسابك**. وباسورد `sudo` بيتسأل في الترمنال نفسه والبرنامج مش بيخزنه.
- الأوامر الخطيرة بتطلب تأكيد، لكن **اقرأ أي أمر قبل ما تشغّله**. القيم الافتراضية أمثلة مش توصيات.
- أوامر التثبيت بتشير لروابط الشركات الرسمية وقت الكتابة، راجعها قبل التشغيل على سيرفر إنتاج.
- البرنامج أوفلاين ومبيعملش اتصالات شبكة بنفسه.
- مفتاح sandbox بتاع Chromium متعطل (`--no-sandbox`) عشان الـ AppImage يشتغل من غير SUID helper، والبرنامج بيحمّل ملفاته المحلية المضمّنة بس.

## المساهمة

1. اعمل Fork وفرع جديد.
2. عدّل الأوامر (`src/cmds-*.js`) أو القوالب (`src/gen*.js`).
3. شغّل `npm run validate`.
4. افتح Pull Request بوصف التعديل.

لو لقيت flag غلط أو أمر تثبيت مش شغال، افتح [Issue](../../issues) واكتب الأمر ونسخة التوزيعة.

## الترخيص

[MIT](LICENSE) © 2026 Zeyad Hossam

*أسماء Docker وKubernetes وRed Hat وOpenShift وAnsible وTerraform وJenkins وArgo وغيرها علامات تجارية لأصحابها. المشروع مستقل وغير تابع لهم.*

</div>
