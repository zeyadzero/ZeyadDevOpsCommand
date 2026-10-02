T(["net","🌐","Networking|الشبكات","Interfaces, routing, DNS, diagnostics, capture and NetworkManager|الواجهات والتوجيه و DNS والتشخيص والالتقاط و NetworkManager","net","all",[["Install net tools","تثبيت أدوات الشبكة","sudo apt install -y iproute2 iputils-ping traceroute mtr-tiny dnsutils nmap tcpdump curl wget netcat-openbsd iperf3 ethtool whois net-tools","sudo dnf install -y iproute iputils traceroute mtr bind-utils nmap tcpdump curl wget nmap-ncat iperf3 ethtool whois net-tools"]]],`
#Interfaces & addresses|الواجهات والعناوين
1§Show IP addresses§عرض العناوين§ip {*} addr show {dev?}§-br|Brief|مختصر¶-4|IPv4 only|IPv4 فقط¶-6|IPv6 only|IPv6 فقط¶-s|Statistics|إحصائيات¶-c|Colors|ألوان
1§Add IP address§إضافة عنوان§ip addr add {cidr=192.168.1.50/24} dev {dev=eth0}
2§Delete IP address§حذف عنوان§ip addr del {cidr=192.168.1.50/24} dev {dev=eth0}
1§Link status§حالة الواجهات§ip {*} link show {dev?}§-s|Statistics|إحصائيات¶-br|Brief|مختصر
1§Bring link up/down§رفع / خفض واجهة§ip link set {dev=eth0} {state=@up,down}
2§Set MTU§ضبط MTU§ip link set {dev=eth0} mtu {mtu=1500}
3§Create VLAN§إنشاء VLAN§ip link add link {dev=eth0} name {dev}.{vid=10} type vlan id {vid}
3§Create bridge§إنشاء bridge§ip link add name {br=br0} type bridge && ip link set {dev=eth0} master {br}
#Routing & neighbors|التوجيه والجيران
1§Show routes§عرض المسارات§ip route {*}§show|Show|عرض¶get {ip=8.8.8.8}|Route to IP|المسار إلى IP¶show table all|All tables|كل الجداول
2§Add route§إضافة مسار§ip route add {net=10.1.0.0/16} via {gw=192.168.1.1} {*}§dev {dev=eth0}|Device|الواجهة¶metric {metric=100}|Metric|المقياس
2§Default gateway§البوابة الافتراضية§ip route {mode=@add,replace,del} default via {gw=192.168.1.1}
2§ARP / neighbors§جدول ARP§ip neigh {*}§show|Show|عرض¶flush all|Flush|مسح
3§Policy rules§قواعد السياسة§ip rule {mode=@show,add from 10.0.0.0/24 table 100,del from 10.0.0.0/24 table 100}
3§Enable IP forwarding§تفعيل التوجيه§sysctl -w net.ipv4.ip_forward={val=@1,0}
#Sockets & ports|المنافذ والاتصالات
1§Listening ports§المنافذ المفتوحة§ss {*}§-t|TCP|TCP¶-u|UDP|UDP¶-l|Listening|الاستماع¶-n|Numeric|أرقام¶-p|Process|العملية¶-a|All|الكل¶-4|IPv4|IPv4¶-6|IPv6|IPv6¶-s|Summary|ملخص¶state established|Established|قائمة¶'( sport = :{port=80} )'|Filter port|تصفية منفذ
2§Connections by state§الاتصالات حسب الحالة§ss -tan | awk 'NR>1 {print $1}' | sort | uniq -c
2§Legacy netstat§netstat القديم§netstat {*}§-tulnp|Listening + process|الاستماع مع العملية¶-r|Routing table|جدول التوجيه¶-i|Interfaces|الواجهات¶-s|Statistics|إحصائيات
#Connectivity & DNS|الاتصال و DNS
1§Ping§اختبار الاتصال§ping {*} {host=8.8.8.8}§-c {count=4}|Count|العدد¶-i {sec=1}|Interval|الفاصل¶-s {size=56}|Packet size|حجم الحزمة¶-W {sec=2}|Timeout|المهلة¶-4|IPv4|IPv4¶-6|IPv6|IPv6¶-D|Timestamps|الوقت
1§Trace route§تتبع المسار§traceroute {*} {host=google.com}§-n|No DNS|بدون DNS¶-I|ICMP|ICMP¶-T -p {port=443}|TCP port|TCP على منفذ¶-m {hops=30}|Max hops|أقصى قفزات
2§Combined ping+trace§تتبع مستمر§mtr {*} {host=google.com}§-r|Report mode|وضع التقرير¶-w|Wide report|تقرير واسع¶-c {count=10}|Cycles|الدورات¶-n|No DNS|بدون DNS¶-T|TCP|TCP
1§DNS lookup§استعلام DNS§dig {*} {name=example.com} {type=@A,AAAA,MX,NS,TXT,CNAME,SOA,PTR,ANY}§+short|Short answer|إجابة مختصرة¶@{server=8.8.8.8}|Use DNS server|استخدام خادم¶+trace|Trace delegation|تتبع التفويض¶+noall +answer|Answer only|الإجابة فقط¶-x {ip=8.8.8.8}|Reverse lookup|بحث عكسي¶+dnssec|DNSSEC|DNSSEC
1§nslookup§nslookup§nslookup {*} {name=example.com} {server?}§-type={type=MX}|Record type|نوع السجل
1§Host lookup§host§host {*} {name=example.com}§-t {type=MX}|Type|النوع¶-a|All|الكل
2§Reverse DNS§بحث DNS عكسي§dig -x {ip=8.8.8.8} +short
2§Domain info§معلومات النطاق§whois {domain=example.com}
2§Check TCP port§فحص منفذ TCP§nc {*} {host=example.com} {port=443}§-z|Scan only|فحص فقط¶-v|Verbose|تفصيل¶-w {sec=3}|Timeout|المهلة¶-u|UDP|UDP
2§Listen on port§الاستماع على منفذ§nc -l {*} {port=9000}§-k|Keep listening|استمرار¶-v|Verbose|تفصيل
2§Telnet check§اختبار telnet§timeout 5 bash -c 'cat < /dev/null > /dev/tcp/{host=example.com}/{port=443}' && echo open || echo closed
#HTTP & downloads|HTTP والتحميل
1§HTTP request§طلب HTTP§curl {*} {url=https://example.com}§-s|Silent|صامت¶-S|Show errors|إظهار الأخطاء¶-L|Follow redirects|اتباع التحويل¶-I|Headers only|الترويسات فقط¶-v|Verbose|تفصيل¶-k|Insecure TLS|تجاهل شهادة TLS¶-o {file=out.html}|Save to file|حفظ في ملف¶-O|Remote filename|اسم الملف الأصلي¶-X {method=POST}|Method|الطريقة¶-H '{header=Content-Type: application/json}'|Header|ترويسة¶-d '{data=key=value}'|Body|المحتوى¶-u {user:pass=user:pass}|Basic auth|مصادقة أساسية¶-A '{agent=Mozilla/5.0}'|User agent|وكيل المستخدم¶--max-time {secs=10}|Max time|أقصى وقت¶--retry {n=3}|Retries|إعادة المحاولة¶-x {proxy=http://proxy:3128}|Proxy|بروكسي¶--resolve {host=example.com}:443:{ip=1.2.3.4}|Force IP|فرض IP¶-w '%{http_code}\\n'|HTTP code|كود الرد
2§HTTP timing breakdown§تفصيل زمن الطلب§curl -o /dev/null -s -w 'dns:%{time_namelookup} connect:%{time_connect} tls:%{time_appconnect} ttfb:%{time_starttransfer} total:%{time_total}\\n' {url=https://example.com}
1§Download file§تحميل ملف§wget {*} {url=https://example.com/file.zip}§-c|Resume|استكمال¶-O {file=file.zip}|Output name|اسم الملف¶-q|Quiet|صامت¶-r -np|Recursive mirror|نسخ متداخل¶--limit-rate={rate=1m}|Limit speed|تحديد السرعة¶--no-check-certificate|Skip TLS check|تجاهل TLS¶-P {dir=.}|Save in dir|مجلد الحفظ¶--header='{h=Authorization: Bearer TOKEN}'|Header|ترويسة
2§TLS certificate check§فحص شهادة TLS§openssl s_client -connect {host=example.com}:{port=443} -servername {host} </dev/null 2>/dev/null | openssl x509 -noout -dates -subject -issuer
#Capture & scan|الالتقاط والفحص
2§Capture packets§التقاط الحزم§tcpdump {*}§-i {iface=any}|Interface|الواجهة¶-nn|No name resolution|بدون أسماء¶-c {count=100}|Packet count|عدد الحزم¶-w {file=capture.pcap}|Write file|حفظ في ملف¶-r {file=capture.pcap}|Read file|قراءة ملف¶-A|ASCII|ASCII¶-X|Hex+ASCII|Hex+ASCII¶-v|Verbose|تفصيل¶port {port=80}|Port filter|تصفية منفذ¶host {host=1.2.3.4}|Host filter|تصفية مضيف¶tcp|TCP only|TCP فقط¶udp|UDP only|UDP فقط
3§Wireshark CLI§tshark§tshark {*}§-i {iface=eth0}|Interface|الواجهة¶-f '{capfilter=tcp port 443}'|Capture filter|فلتر الالتقاط¶-Y '{display=http.request}'|Display filter|فلتر العرض¶-c {count=100}|Count|العدد¶-w {file=out.pcapng}|Write|حفظ¶-r {file=out.pcapng}|Read|قراءة
2§Scan network (nmap)§فحص الشبكة§nmap {*} {target=192.168.1.0/24}§-sn|Ping sweep|اكتشاف الأجهزة¶-sV|Service versions|إصدارات الخدمات¶-sS|SYN scan|SYN scan¶-sU|UDP scan|UDP scan¶-p {ports=1-1024}|Ports|المنافذ¶-p-|All ports|كل المنافذ¶-A|Aggressive|شامل¶-O|OS detection|اكتشاف النظام¶-T4|Faster|أسرع¶-Pn|Skip host discovery|تخطي الاكتشاف¶--script {script=vuln}|NSE script|سكربت NSE¶-oN {file=scan.txt}|Save output|حفظ النتيجة
2§Bandwidth test§اختبار السرعة§iperf3 {*}§-s|Server mode|وضع الخادم¶-c {host=192.168.1.10}|Client to host|عميل إلى مضيف¶-t {secs=10}|Duration|المدة¶-P {streams=4}|Parallel streams|تدفقات متوازية¶-R|Reverse|عكسي¶-u|UDP|UDP
3§Live bandwidth per host§استهلاك الشبكة لكل مضيف§iftop {*}§-i {iface=eth0}|Interface|الواجهة¶-n|No DNS|بدون DNS¶-P|Show ports|إظهار المنافذ
3§Bandwidth per process§استهلاك الشبكة لكل عملية§nethogs {iface=eth0}
2§NIC details§تفاصيل كرت الشبكة§ethtool {*} {iface=eth0}§-S|Statistics|إحصائيات¶-i|Driver info|معلومات التعريف¶-k|Offloads|ميزات الـ offload¶-s {iface} speed {speed=1000} duplex full autoneg off|Force speed|فرض السرعة
#NetworkManager|NetworkManager
1§Connections§الاتصالات§nmcli {*} connection show§--active|Active only|النشطة فقط
1§Device status§حالة الأجهزة§nmcli device status
1§Bring connection up/down§تشغيل / إيقاف اتصال§nmcli connection {mode=@up,down} {con=eth0}
2§Static IP§عنوان ثابت§nmcli connection modify {con=eth0} ipv4.method manual ipv4.addresses {cidr=192.168.1.50/24} ipv4.gateway {gw=192.168.1.1} ipv4.dns '{dns=8.8.8.8 1.1.1.1}' && nmcli connection up {con}
2§DHCP§إعداد DHCP§nmcli connection modify {con=eth0} ipv4.method auto ipv4.addresses '' ipv4.gateway '' && nmcli connection up {con}
2§Add ethernet connection§إضافة اتصال§nmcli connection add type ethernet ifname {dev=eth0} con-name {con=lan} {*}§ipv4.method manual ipv4.addresses {cidr=192.168.1.50/24}|Static IPv4|IPv4 ثابت¶ipv4.gateway {gw=192.168.1.1}|Gateway|البوابة¶ipv4.dns {dns=8.8.8.8}|DNS|DNS
2§Delete connection§حذف اتصال§nmcli connection delete {con}
2§Wi-Fi§الواي فاي§nmcli {*} device wifi {mode=@list,rescan,connect}§--ask|Ask password|اسأل كلمة المرور
2§Connect Wi-Fi§الاتصال بشبكة§nmcli device wifi connect '{ssid=MyWiFi}' password '{password=secret}'
2§Radio on/off§تشغيل / إيقاف الراديو§nmcli radio {mode=@all,wifi} {state=@on,off}
2§Reload NM§إعادة تحميل NM§nmcli connection reload
#Netplan (Ubuntu/Debian)|Netplan (أوبنتو)
2§Apply netplan§تطبيق netplan§netplan {mode=@apply,try,generate,get,status}
2§Edit netplan file§تعديل ملف netplan§nano /etc/netplan/{file=01-netcfg}.yaml
`);

T(["ufw","🧱","UFW Firewall (Debian/Ubuntu)|جدار UFW (ديبيان)","Uncomplicated Firewall — rules, profiles, logging|جدار ناري مبسط: القواعد والبروفايلات والسجلات","net","deb",[["Install UFW","تثبيت UFW","sudo apt install -y ufw",""]]],`
#State|الحالة
1§Status§الحالة§ufw status {*}§verbose|Verbose|تفصيل¶numbered|Numbered rules|قواعد مرقمة
1§Enable / disable§تفعيل / تعطيل§ufw {mode=@enable,disable}
2§Reload§إعادة تحميل§ufw reload
2§Default policy§السياسة الافتراضية§ufw default {policy=@deny,allow,reject} {dir=@incoming,outgoing,routed}
2§Logging§التسجيل§ufw logging {level=@on,off,low,medium,high,full}
3§Reset to defaults§إعادة الضبط§ufw --force reset
#Rules|القواعد
1§Allow a port§السماح بمنفذ§ufw allow {port=80}{proto=@,/tcp,/udp}
1§Allow a service§السماح بخدمة§ufw allow {service=ssh}
1§Deny a port§منع منفذ§ufw deny {port=23}{proto=@,/tcp,/udp}
2§Reject a port§رفض منفذ§ufw reject {port=25}{proto=@,/tcp,/udp}
2§Allow from IP§السماح من IP§ufw allow from {ip=203.0.113.4} {*}§to any port {port=22}|To port|إلى منفذ¶proto {proto=tcp}|Protocol|البروتوكول
2§Deny from IP§منع IP§ufw deny from {ip=203.0.113.4}
2§Allow subnet§السماح لشبكة فرعية§ufw allow from {cidr=192.168.1.0/24} to any port {port=22} proto tcp
2§Port range§نطاق منافذ§ufw allow {from=6000}:{to=6007}/tcp
2§Rate limit (anti brute-force)§تحديد المحاولات§ufw limit {service=ssh}
2§Allow on interface§السماح على واجهة§ufw allow in on {iface=eth0} to any port {port=80}
2§Delete rule§حذف قاعدة§ufw {mode=@delete,delete allow,delete deny} {rule=2}
2§Insert rule at position§إدراج قاعدة بموضع§ufw insert {pos=1} {action=@allow,deny} from {ip=1.2.3.4}
3§App profiles§بروفايلات التطبيقات§ufw app {mode=@list,info 'Nginx Full',update all}
3§Allow forwarding / NAT§إعادة التوجيه§sed -i 's/^DEFAULT_FORWARD_POLICY=.*/DEFAULT_FORWARD_POLICY="ACCEPT"/' /etc/default/ufw && ufw reload
`);

T(["firewalld","🔥","firewalld (RedHat)|جدار firewalld (ريدهات)","Zones, services, rich rules, forwarding|المناطق والخدمات والقواعد الغنية والتوجيه","net","rpm",[["Install & enable","تثبيت وتفعيل","","sudo dnf install -y firewalld && sudo systemctl enable --now firewalld"]]],`
#State & zones|الحالة والمناطق
1§State§الحالة§firewall-cmd --state
1§List everything§عرض كل شيء§firewall-cmd {*} --list-all§--zone={zone=public}|Zone|المنطقة¶--permanent|Permanent|دائم
1§Active zones§المناطق النشطة§firewall-cmd --get-active-zones
2§All zones§كل المناطق§firewall-cmd {mode=@--get-zones,--list-all-zones,--get-default-zone}
2§Set default zone§المنطقة الافتراضية§firewall-cmd --set-default-zone={zone=public}
2§Zone of interface§منطقة الواجهة§firewall-cmd --get-zone-of-interface={iface=eth0}
2§Move interface to zone§نقل واجهة لمنطقة§firewall-cmd --permanent --zone={zone=internal} --change-interface={iface=eth0}
2§Reload§إعادة التحميل§firewall-cmd {mode=@--reload,--complete-reload}
2§Save runtime to permanent§حفظ الحالية كدائمة§firewall-cmd --runtime-to-permanent
#Services & ports|الخدمات والمنافذ
1§Open service§فتح خدمة§firewall-cmd {*} --add-service={service=http}§--permanent|Permanent|دائم¶--zone={zone=public}|Zone|المنطقة¶--timeout={secs=300}|Temporary|مؤقت
1§Close service§إغلاق خدمة§firewall-cmd {*} --remove-service={service=http}§--permanent|Permanent|دائم¶--zone={zone=public}|Zone|المنطقة
1§Open port§فتح منفذ§firewall-cmd {*} --add-port={port=8080}/{proto=@tcp,udp}§--permanent|Permanent|دائم¶--zone={zone=public}|Zone|المنطقة
1§Close port§إغلاق منفذ§firewall-cmd {*} --remove-port={port=8080}/{proto=@tcp,udp}§--permanent|Permanent|دائم¶--zone={zone=public}|Zone|المنطقة
2§List services / ports§قائمة الخدمات والمنافذ§firewall-cmd {mode=@--get-services,--list-services,--list-ports} {*}§--zone={zone=public}|Zone|المنطقة
#Rules & NAT|القواعد والـ NAT
2§Allow source IP/subnet§السماح لمصدر§firewall-cmd --permanent --zone={zone=trusted} --add-source={cidr=192.168.1.0/24}
2§Block IP (rich rule)§منع IP§firewall-cmd --permanent --add-rich-rule="rule family='ipv4' source address='{ip=1.2.3.4}' reject"
2§Allow port from subnet§منفذ لشبكة محددة§firewall-cmd --permanent --add-rich-rule="rule family='ipv4' source address='{cidr=10.0.0.0/24}' port port='{port=22}' protocol='tcp' accept"
2§List rich rules§القواعد الغنية§firewall-cmd --list-rich-rules {*}§--zone={zone=public}|Zone|المنطقة
2§Masquerade (NAT)§تفعيل NAT§firewall-cmd --permanent --zone={zone=public} --add-masquerade
2§Port forward§توجيه منفذ§firewall-cmd --permanent --add-forward-port=port={port=80}:proto=tcp:toport={toport=8080}:toaddr={ip=10.0.0.5}
3§Emergency panic mode§وضع الطوارئ§firewall-cmd {mode=@--panic-on,--panic-off,--query-panic}
3§Direct iptables rule§قاعدة iptables مباشرة§firewall-cmd --permanent --direct --add-rule ipv4 filter INPUT 0 -p tcp --dport {port=22} -j ACCEPT
`);

T(["iptables","🧰","iptables & nftables|iptables و nftables","Low-level packet filtering and NAT|تصفية الحزم و NAT منخفض المستوى","net","all",[["Persist rules","حفظ القواعد","sudo apt install -y iptables-persistent && sudo netfilter-persistent save","sudo dnf install -y iptables-services && sudo service iptables save"]]],`
#iptables|iptables
1§List rules§عرض القواعد§iptables {*} -L§-n|Numeric|أرقام¶-v|Verbose|تفصيل¶--line-numbers|Line numbers|أرقام الأسطر¶-t {table=nat}|Table|الجدول
1§Allow incoming port§السماح بمنفذ وارد§iptables -A INPUT -p {proto=@tcp,udp} --dport {port=80} -j ACCEPT
1§Block IP§منع IP§iptables -A INPUT -s {ip=1.2.3.4} -j DROP
2§Allow established§السماح بالاتصالات القائمة§iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
2§Insert rule at top§إدراج قاعدة في الأعلى§iptables -I INPUT {pos=1} -p tcp --dport {port=22} -j ACCEPT
2§Delete rule by number§حذف قاعدة برقمها§iptables -D {chain=INPUT} {num=1}
2§Default policy§السياسة الافتراضية§iptables -P {chain=@INPUT,FORWARD,OUTPUT} {policy=@DROP,ACCEPT}
2§Rate limit SSH§تحديد محاولات SSH§iptables -A INPUT -p tcp --dport 22 -m conntrack --ctstate NEW -m limit --limit {rate=3/min} --limit-burst {burst=5} -j ACCEPT
3§NAT masquerade§NAT للخروج§iptables -t nat -A POSTROUTING -o {iface=eth0} -j MASQUERADE
3§Port forward (DNAT)§توجيه منفذ (DNAT)§iptables -t nat -A PREROUTING -p tcp --dport {port=80} -j DNAT --to-destination {ip=10.0.0.5}:{toport=8080}
3§Log dropped packets§تسجيل المحظور§iptables -A INPUT -j LOG --log-prefix '{prefix=DROP: }' --log-level 4
2§Flush rules§مسح القواعد§iptables -F {chain?}
2§Save / restore§حفظ / استرجاع§iptables-{mode=@save > /etc/iptables.rules,restore < /etc/iptables.rules}
#nftables|nftables
2§List ruleset§عرض القواعد§nft list ruleset
2§Create table + chain§إنشاء جدول وسلسلة§nft add table inet filter && nft add chain inet filter input '{ type filter hook input priority 0; policy drop; }'
2§Allow port§السماح بمنفذ§nft add rule inet filter input {proto=@tcp,udp} dport {port=22} accept
2§Allow established§السماح بالقائم§nft add rule inet filter input ct state established,related accept
3§Load rules file§تحميل ملف قواعد§nft -f {file=/etc/nftables.conf}
3§Flush all§مسح الكل§nft flush ruleset
3§Delete rule by handle§حذف قاعدة بالمعرف§nft delete rule inet filter input handle {handle=5}
`);

T(["users","👤","Users, SSH & Access|المستخدمون و SSH والوصول","Accounts, groups, sudo, SSH keys, transfers and tunnels|الحسابات والمجموعات و sudo ومفاتيح SSH والنقل والأنفاق","sec","all",[]],`
#Users & groups|المستخدمون والمجموعات
1§Add user (Debian)§إضافة مستخدم (ديبيان)§adduser {*} {user=bob}§--disabled-password|No password|بدون كلمة مرور¶--shell /bin/bash|Bash shell|شل bash¶--home {home=/home/bob}|Home dir|المجلد الرئيسي¶--ingroup {group=developers}|Primary group|المجموعة الأساسية
1§Add user (generic)§إضافة مستخدم§useradd {*} {user=bob}§-m|Create home|إنشاء المجلد الرئيسي¶-s {shell=/bin/bash}|Shell|الشل¶-G {groups=sudo}|Extra groups|مجموعات إضافية¶-g {group=users}|Primary group|المجموعة الأساسية¶-d {home=/home/bob}|Home|المجلد الرئيسي¶-u {uid=1500}|UID|UID¶-c '{comment=Bob Smith}'|Comment|وصف¶-e {expire=2026-12-31}|Expire date|تاريخ الانتهاء¶-r|System account|حساب نظام
1§Set password§تعيين كلمة المرور§passwd {*} {user}§-l|Lock|قفل¶-u|Unlock|فتح¶-e|Force change at login|إجبار التغيير¶-d|Delete password|حذف كلمة المرور¶-S|Status|الحالة
2§Modify user§تعديل مستخدم§usermod {*} {user}§-aG {groups=sudo}|Append to groups|إضافة لمجموعات¶-s {shell=/bin/zsh}|Shell|الشل¶-d {home=/home/new} -m|Move home|نقل المجلد¶-l {newname=newname}|Rename|إعادة تسمية¶-L|Lock|قفل¶-U|Unlock|فتح¶-e {expire=2026-12-31}|Expire|تاريخ الانتهاء
1§Delete user§حذف مستخدم§userdel {*} {user}§-r|Remove home|حذف المجلد الرئيسي¶-f|Force|إجبار
1§Add group§إضافة مجموعة§groupadd {*} {group=developers}§-g {gid=2000}|GID|GID¶-r|System group|مجموعة نظام
2§Add/remove user in group§إضافة / حذف مستخدم من مجموعة§gpasswd {mode=@-a,-d} {user=bob} {group=developers}
1§Show groups§عرض المجموعات§groups {user?}
1§Switch user§تبديل المستخدم§su {*} {user=root}§-|Login shell|شل تسجيل دخول¶-c '{cmd=whoami}'|Run command|تنفيذ أمر
1§Run as root§تنفيذ كـ root§sudo {*} {cmd=whoami}§-u {user=postgres}|As user|كمستخدم¶-i|Login shell|شل تسجيل دخول¶-s|Shell|شل¶-l|List privileges|عرض الصلاحيات¶-k|Forget cached auth|مسح التوثيق
2§Edit sudoers safely§تعديل sudoers§visudo {*}§-c|Check syntax|فحص الصياغة¶-f /etc/sudoers.d/{file=custom}|Edit drop-in|تعديل ملف إضافي
2§Passwordless sudo§sudo بدون كلمة مرور§echo '{user=bob} ALL=(ALL) NOPASSWD:ALL' | tee /etc/sudoers.d/{user} && chmod 440 /etc/sudoers.d/{user}
2§Password aging§انتهاء كلمة المرور§chage {*} {user}§-l|List|عرض¶-M {days=90}|Max days|أقصى مدة¶-m {days=7}|Min days|أدنى مدة¶-W {days=14}|Warn days|أيام التنبيه¶-E {date=2026-12-31}|Expire account|انتهاء الحساب¶-d 0|Force change|إجبار التغيير
2§Last login per user§آخر دخول لكل مستخدم§lastlog {*}§-u {user}|User|مستخدم¶-t {days=7}|Within days|خلال أيام
2§List all users§قائمة كل المستخدمين§getent passwd {*}§{user?}|One user|مستخدم محدد
3§Lock root account§قفل حساب root§passwd -l root
#SSH client|عميل SSH
1§Connect§الاتصال§ssh {*} {user=root}@{host=192.168.1.10}§-p {port=22}|Port|المنفذ¶-i {key=~/.ssh/id_ed25519}|Identity file|ملف المفتاح¶-v|Verbose|تفصيل¶-X|X11 forwarding|تمرير X11¶-A|Agent forwarding|تمرير الـ agent¶-J {jump=jump@bastion}|Jump host|مضيف وسيط¶-o StrictHostKeyChecking=no|Skip host check|تجاهل فحص المضيف¶-o ServerAliveInterval={secs=60}|Keepalive|إبقاء الاتصال¶-t|Force TTY|فرض طرفية¶-C|Compression|ضغط¶{cmd?}|Remote command|أمر عن بعد
2§Local port forward§تمرير منفذ محلي§ssh -N -L {lport=8080}:{rhost=localhost}:{rport=80} {user=root}@{host=192.168.1.10} {*}§-f|Background|في الخلفية¶-p {port=22}|SSH port|منفذ SSH¶-i {key=~/.ssh/id_ed25519}|Key|المفتاح
2§Remote port forward§تمرير منفذ عكسي§ssh -N -R {rport=9000}:localhost:{lport=3000} {user=root}@{host=192.168.1.10} {*}§-f|Background|في الخلفية
2§SOCKS proxy tunnel§نفق SOCKS§ssh -N -D {port=1080} {user=root}@{host=192.168.1.10} {*}§-f|Background|في الخلفية¶-C|Compression|ضغط
1§Generate SSH key§توليد مفتاح SSH§ssh-keygen {*}§-t {type=ed25519}|Key type|نوع المفتاح¶-b {bits=4096}|Bits (rsa)|الحجم¶-C '{comment=me@host}'|Comment|تعليق¶-f {file=~/.ssh/id_ed25519}|File|الملف¶-N '{pass?}'|Passphrase|عبارة المرور
1§Copy key to server§نسخ المفتاح للسيرفر§ssh-copy-id {*} {user=root}@{host=192.168.1.10}§-i {key=~/.ssh/id_ed25519.pub}|Key file|ملف المفتاح¶-p {port=22}|Port|المنفذ
2§Key fingerprint§بصمة المفتاح§ssh-keygen -lf {file=~/.ssh/id_ed25519.pub}
2§Change key passphrase§تغيير عبارة المرور§ssh-keygen -p -f {file=~/.ssh/id_ed25519}
2§Remove old host key§حذف مفتاح مضيف قديم§ssh-keygen -R {host=192.168.1.10}
2§SSH agent§SSH agent§eval $(ssh-agent -s) && ssh-add {key=~/.ssh/id_ed25519}
2§Scan host keys§جلب مفاتيح المضيف§ssh-keyscan {*} {host=github.com}§-t ed25519|ed25519 only|ed25519 فقط¶-p {port=22}|Port|المنفذ
#File transfer|نقل الملفات
1§Secure copy§نسخ آمن§scp {*} {src=file.txt} {user=root}@{host=192.168.1.10}:{dst=/tmp/}§-r|Recursive|متداخل¶-P {port=22}|Port|المنفذ¶-i {key=~/.ssh/id_ed25519}|Key|المفتاح¶-C|Compression|ضغط¶-p|Preserve times|حفظ الأوقات¶-l {kbps=1000}|Limit speed|تحديد السرعة
1§Rsync sync§مزامنة rsync§rsync {*} {src=./dir/} {user=root}@{host=192.168.1.10}:{dst=/backup/}§-a|Archive|أرشفة¶-v|Verbose|تفصيل¶-z|Compress|ضغط¶-h|Human sizes|أحجام مقروءة¶--progress|Progress|التقدم¶--delete|Delete extra on dest|حذف الزائد في الوجهة¶-n|Dry run|تجربة فقط¶--exclude='{pattern=*.log}'|Exclude|استبعاد¶-e 'ssh -p {port=22}'|SSH options|خيارات SSH¶--bwlimit={kbps=1000}|Bandwidth limit|حد السرعة¶--partial|Keep partial|إبقاء الجزئي¶-u|Skip newer|تخطي الأحدث
2§Rsync local backup§نسخ احتياطي محلي§rsync -aH --delete --info=progress2 {src=/data/} {dst=/backup/data/}
2§SFTP session§جلسة SFTP§sftp {*} {user=root}@{host=192.168.1.10}§-P {port=22}|Port|المنفذ¶-i {key=~/.ssh/id_ed25519}|Key|المفتاح
2§Mount remote dir§ربط مجلد بعيد§sshfs {user=root}@{host=192.168.1.10}:{remote=/data} {mnt=/mnt/remote} {*}§-o allow_other|Allow others|السماح للآخرين¶-p {port=22}|Port|المنفذ
#SSH server|خادم SSH
2§Test sshd config§فحص إعداد sshd§sshd -t {*}§-T|Dump config|عرض الإعدادات
2§Edit sshd config§تعديل إعداد sshd§nano /etc/ssh/sshd_config
2§Disable root login§منع دخول root§sed -i 's/^#*PermitRootLogin.*/PermitRootLogin {val=@no,prohibit-password}/' /etc/ssh/sshd_config
2§Disable password login§منع كلمة المرور§sed -i 's/^#*PasswordAuthentication.*/PasswordAuthentication {val=@no,yes}/' /etc/ssh/sshd_config
2§Change SSH port§تغيير منفذ SSH§sed -i 's/^#*Port .*/Port {port=2222}/' /etc/ssh/sshd_config
2§Restart sshd§إعادة تشغيل sshd§systemctl restart {svc=@ssh,sshd}
`);

T(["secure","🛡️","Security & Hardening|الأمان والتحصين","SELinux, AppArmor, audit, OpenSSL, GPG, Let's Encrypt, scanners|SELinux و AppArmor والتدقيق و OpenSSL و GPG وفحص الثغرات","sec","all",[["Install security tools","تثبيت أدوات الأمان","sudo apt install -y fail2ban auditd lynis rkhunter clamav certbot apparmor-utils gnupg openssl","sudo dnf install -y epel-release && sudo dnf install -y fail2ban audit lynis rkhunter clamav certbot policycoreutils-python-utils setools-console gnupg2 openssl"]]],`
#SELinux (RedHat)|SELinux (ريدهات)
1§SELinux mode§وضع SELinux§getenforce
1§Detailed status§حالة مفصلة§sestatus {*}§-v|Verbose|تفصيل¶-b|Booleans|القيم المنطقية
1§Set mode (runtime)§تغيير الوضع مؤقتاً§setenforce {mode=@0,1}
2§Set mode permanently§تغيير الوضع دائماً§sed -i 's/^SELINUX=.*/SELINUX={mode=@enforcing,permissive,disabled}/' /etc/selinux/config
2§Booleans§القيم المنطقية§getsebool -a {*}§| grep {filter=httpd}|Filter|تصفية
2§Set boolean§ضبط قيمة منطقية§setsebool -P {bool=httpd_can_network_connect} {val=@on,off}
2§Show contexts§عرض السياقات§ls -Z {*} {path=/var/www}§-d|Directory itself|المجلد نفسه¶-R|Recursive|متداخل
2§Process contexts§سياقات العمليات§ps -eZ {*}§| grep {name=httpd}|Filter|تصفية
2§Restore default context§استعادة السياق الافتراضي§restorecon {*} {path=/var/www/html}§-R|Recursive|متداخل¶-v|Verbose|تفصيل¶-F|Force|إجبار
2§Set file context rule§قاعدة سياق ملفات§semanage fcontext -a -t {type=httpd_sys_content_t} '{path=/srv/web}(/.*)?' && restorecon -Rv {path}
2§Allow port§السماح بمنفذ§semanage port -a -t {type=http_port_t} -p {proto=@tcp,udp} {port=8080}
2§List port types§قائمة أنواع المنافذ§semanage port -l {*}§| grep {type=http}|Filter|تصفية
3§Change context temporarily§تغيير سياق مؤقت§chcon {*} -t {type=httpd_sys_content_t} {path}§-R|Recursive|متداخل
3§Recent denials§الرفض الأخير§ausearch -m avc -ts {when=@recent,today,boot}
3§Explain denial§شرح سبب الرفض§ausearch -m avc -ts recent | audit2why
3§Generate policy module§توليد وحدة سياسة§ausearch -m avc -ts recent | audit2allow -M {name=mypolicy} && semodule -i {name}.pp
3§Troubleshoot GUI report§تقرير تشخيص§sealert -a /var/log/audit/audit.log
3§Container volume label§وسم مجلد للحاويات§chcon -Rt container_file_t {path=/data}
#AppArmor (Debian/Ubuntu)|AppArmor (ديبيان)
1§AppArmor status§حالة AppArmor§aa-status
2§Enforce profile§تفعيل بروفايل§aa-enforce {profile=/etc/apparmor.d/usr.sbin.nginx}
2§Complain mode§وضع الشكوى§aa-complain {profile=/etc/apparmor.d/usr.sbin.nginx}
2§Disable profile§تعطيل بروفايل§aa-disable {profile=/etc/apparmor.d/usr.sbin.nginx}
2§Reload profile§إعادة تحميل بروفايل§apparmor_parser -r {profile=/etc/apparmor.d/usr.sbin.nginx}
3§Generate profile§توليد بروفايل§aa-genprof {binary=/usr/bin/myapp}
3§Update from logs§تحديث من السجلات§aa-logprof
3§Denials§حالات الرفض§dmesg | grep -i apparmor
#Audit|التدقيق
2§Watch a file§مراقبة ملف§auditctl -w {path=/etc/passwd} -p {perm=@wa,rwxa,r,w,x,a} -k {key=passwd_changes}
2§List audit rules§قواعد التدقيق§auditctl -l
2§Search audit log§البحث في سجل التدقيق§ausearch {*}§-k {key=passwd_changes}|By key|بالمفتاح¶-m {type=USER_LOGIN}|Message type|نوع الرسالة¶-ui {uid=1000}|By user id|بالمستخدم¶-ts {when=today}|Since|منذ¶-i|Interpret|تفسير
2§Audit summary report§تقرير ملخص§aureport {mode=@--summary,--auth,--login,--failed,--executable,--file,--anomaly}
#OpenSSL & certificates|OpenSSL والشهادات
1§Generate private key§توليد مفتاح خاص§openssl genrsa -out {file=server.key} {bits=@2048,4096}
2§Create CSR§إنشاء CSR§openssl req -new -key {key=server.key} -out {csr=server.csr} -subj '{subj=/C=EG/O=MyOrg/CN=example.com}'
2§Self-signed certificate§شهادة ذاتية§openssl req -x509 -newkey rsa:{bits=4096} -nodes -keyout {key=server.key} -out {crt=server.crt} -days {days=365} -subj '{subj=/CN=example.com}' {*}§-addext "subjectAltName=DNS:{dns=example.com}"|Add SAN|إضافة SAN
2§Inspect certificate§فحص شهادة§openssl x509 -in {crt=server.crt} -noout {*}§-text|Full text|النص كاملاً¶-dates|Dates|التواريخ¶-subject|Subject|الموضوع¶-issuer|Issuer|الجهة المصدرة¶-fingerprint -sha256|SHA-256 fingerprint|البصمة¶-enddate|Expiry|الانتهاء
2§Verify certificate chain§فحص سلسلة الشهادات§openssl verify -CAfile {ca=ca.crt} {crt=server.crt}
2§Check key matches cert§تطابق المفتاح مع الشهادة§openssl x509 -noout -modulus -in {crt=server.crt} | openssl md5; openssl rsa -noout -modulus -in {key=server.key} | openssl md5
2§Create PKCS#12§إنشاء PKCS#12§openssl pkcs12 -export -in {crt=server.crt} -inkey {key=server.key} -out {out=server.p12}
2§Hash a file§بصمة ملف§openssl dgst -{alg=@sha256,sha512,md5,sha1} {file}
2§Encrypt a file§تشفير ملف§openssl enc -aes-256-cbc -pbkdf2 -salt {*} -in {file} -out {out=file.enc}§-a|Base64 output|إخراج Base64¶-d|Decrypt|فك التشفير
#GPG|GPG
2§Generate key pair§توليد زوج مفاتيح§gpg --full-generate-key
2§List keys§عرض المفاتيح§gpg {mode=@--list-keys,--list-secret-keys}
2§Encrypt file§تشفير ملف§gpg {*} --encrypt --recipient {rcpt=user@example.com} {file}§--armor|ASCII armor|صيغة نصية¶-o {out=file.gpg}|Output|الإخراج
2§Symmetric encrypt§تشفير بكلمة مرور§gpg --symmetric {*} {file}§--cipher-algo AES256|AES-256|AES-256¶--armor|ASCII armor|صيغة نصية
2§Decrypt§فك التشفير§gpg {*} --decrypt {file=file.gpg}§-o {out=file}|Output|الإخراج
2§Sign / verify§توقيع / تحقق§gpg {mode=@--detach-sign,--verify,--clearsign} {file}
2§Export / import key§تصدير / استيراد مفتاح§gpg {mode=@--export -a,--export-secret-keys -a,--import} {id=user@example.com}
#Let's Encrypt|Let's Encrypt
2§Issue certificate (standalone)§إصدار شهادة§certbot certonly --standalone -d {domain=example.com} {*}§--agree-tos -m {email=admin@example.com}|Accept TOS + email|موافقة وبريد¶--non-interactive|Non-interactive|بدون أسئلة¶--dry-run|Dry run|تجربة
2§Issue with nginx§إصدار مع nginx§certbot --nginx -d {domain=example.com} {*}§--redirect|Force HTTPS|تحويل HTTPS¶--staging|Staging|بيئة تجريبية
2§Issue with apache§إصدار مع apache§certbot --apache -d {domain=example.com}
2§Wildcard (DNS challenge)§شهادة wildcard§certbot certonly --manual --preferred-challenges dns -d '*.{domain=example.com}'
2§Renew§تجديد§certbot renew {*}§--dry-run|Dry run|تجربة¶--force-renewal|Force|إجبار
2§List certificates§قائمة الشهادات§certbot certificates
#Scanners & intrusion|الفحص والحماية
2§Fail2ban status§حالة fail2ban§fail2ban-client {*} status {jail?}
2§Unban IP§فك حظر IP§fail2ban-client set {jail=sshd} unbanip {ip=1.2.3.4}
2§Ban IP§حظر IP§fail2ban-client set {jail=sshd} banip {ip=1.2.3.4}
2§Reload fail2ban§إعادة تحميل§fail2ban-client reload
3§Security audit (Lynis)§تدقيق أمني Lynis§lynis audit system {*}§--quick|Quick|سريع¶--pentest|Pentest mode|وضع الاختبار
3§Rootkit scan§فحص rootkit§rkhunter {*} --check§--sk|Skip keypress|بدون انتظار¶--rwo|Only warnings|التحذيرات فقط
3§Update + scan antivirus§تحديث وفحص مضاد الفيروسات§freshclam && clamscan -r {*} {path=/home}§--infected|Show infected only|المصابة فقط¶--remove|Remove infected|حذف المصابة¶--log={log=/var/log/clamav/scan.log}|Log|السجل
2§Strong random password§كلمة مرور قوية§openssl rand -base64 {len=24}
`);

T(["storage","💾","Disks, LVM & Filesystems|الأقراص و LVM ونظم الملفات","Partitioning, filesystems, mounts, LVM, RAID, encryption, swap, NFS|التقسيم ونظم الملفات والـ mount و LVM و RAID والتشفير والـ swap و NFS","store","all",[["Install storage tools","تثبيت أدوات التخزين","sudo apt install -y lvm2 mdadm cryptsetup xfsprogs nfs-common nfs-kernel-server smartmontools parted","sudo dnf install -y lvm2 mdadm cryptsetup xfsprogs nfs-utils smartmontools parted"]]],`
#Inspect|الفحص
1§List block devices§عرض الأقراص§lsblk {*}§-f|Filesystems|نظم الملفات¶-p|Full paths|المسارات الكاملة¶-o NAME,SIZE,FSTYPE,MOUNTPOINT,UUID|Custom columns|أعمدة مخصصة¶-d|Disks only|الأقراص فقط
1§Partition table§جدول التقسيم§fdisk -l {dev?}
2§UUID & labels§UUID والتسميات§blkid {dev?}
2§Mounted filesystems§نظم الملفات المركبة§findmnt {*}§-t {type=ext4}|By type|حسب النوع¶--df|With usage|مع الاستخدام¶-T {path=/}|For path|لمسار
2§Disk health (SMART)§صحة القرص§smartctl {*} {dev=/dev/sda}§-a|All info|كل المعلومات¶-H|Health|الصحة¶-t short|Short self-test|فحص قصير¶-t long|Long self-test|فحص طويل
2§Disk speed test§اختبار سرعة القرص§hdparm -Tt {dev=/dev/sda}
3§IO stats§إحصائيات IO§iostat {*} {interval=1}§-x|Extended|موسع¶-d|Devices only|الأقراص فقط¶-h|Human|مقروء
#Partition & format|التقسيم والتهيئة
2§Partition (interactive)§تقسيم تفاعلي§fdisk {dev=/dev/sdb}
2§Create GPT partition§إنشاء قسم GPT§parted -s {dev=/dev/sdb} mklabel gpt mkpart primary {fs=ext4} 0% 100%
2§Format ext4§تهيئة ext4§mkfs.ext4 {*} {dev=/dev/sdb1}§-L {label=data}|Label|التسمية¶-F|Force|إجبار¶-m {pct=1}|Reserved %|نسبة محجوزة
2§Format XFS§تهيئة XFS§mkfs.xfs {*} {dev=/dev/sdb1}§-L {label=data}|Label|التسمية¶-f|Force|إجبار
2§Format FAT32§تهيئة FAT32§mkfs.vfat {*} {dev=/dev/sdb1}§-F 32|FAT32|FAT32¶-n {label=USB}|Label|التسمية
3§Wipe signatures§مسح التواقيع§wipefs {*} {dev=/dev/sdb}§-a|Erase all|مسح الكل
2§Check filesystem§فحص نظام الملفات§fsck {*} {dev=/dev/sdb1}§-f|Force|إجبار¶-y|Auto yes|موافقة تلقائية¶-n|Dry run|بدون تغيير
3§Repair XFS§إصلاح XFS§xfs_repair {*} {dev=/dev/sdb1}§-n|No modify|بدون تعديل
3§ext4 tuning§ضبط ext4§tune2fs {*} {dev=/dev/sdb1}§-l|List|عرض¶-L {label=data}|Label|التسمية¶-m {pct=1}|Reserved %|نسبة محجوزة
#Mount|الربط
1§Mount§ربط§mount {*} {dev=/dev/sdb1} {mnt=/mnt/data}§-t {type=ext4}|Filesystem type|نوع النظام¶-o {opts=ro}|Options|خيارات¶-U {uuid}|By UUID|بالـ UUID¶--bind|Bind mount|ربط مجلد
1§Unmount§فك الربط§umount {*} {mnt=/mnt/data}§-l|Lazy|كسول¶-f|Force|إجبار¶-R|Recursive|متداخل
2§Remount read-write§إعادة ربط للكتابة§mount -o remount,{mode=@rw,ro} {mnt=/}
2§Persistent mount (fstab)§ربط دائم§echo 'UUID={uuid} {mnt=/data} {type=ext4} {opts=defaults} 0 2' | tee -a /etc/fstab && mount -a
2§Who is using the mount§من يستخدم نقطة الربط§fuser -vm {mnt=/mnt/data}
2§Mount ISO§ربط ملف ISO§mount -o loop,ro {iso=disk.iso} {mnt=/mnt/iso}
#LVM|LVM
2§Create physical volume§إنشاء PV§pvcreate {dev=/dev/sdb}
2§Create volume group§إنشاء VG§vgcreate {vg=vg0} {dev=/dev/sdb}
2§Create logical volume§إنشاء LV§lvcreate {*} {vg=vg0}§-n {lv=data}|Name|الاسم¶-L {size=10G}|Size|الحجم¶-l {extents=100%FREE}|Extents|الامتدادات
2§Show LVM§عرض LVM§{mode=@pvs,vgs,lvs,pvdisplay,vgdisplay,lvdisplay}
2§Extend LV + filesystem§توسيع LV مع النظام§lvextend -r -L +{size=5G} /dev/{vg=vg0}/{lv=data}
2§Extend LV to all free§توسيع لكل المساحة§lvextend -r -l +100%FREE /dev/{vg=vg0}/{lv=data}
2§Add disk to VG§إضافة قرص لـ VG§vgextend {vg=vg0} {dev=/dev/sdc}
3§Shrink LV (ext4)§تصغير LV§lvreduce -r -L {size=5G} /dev/{vg=vg0}/{lv=data}
3§Snapshot§لقطة§lvcreate -s -n {snap=snap1} -L {size=1G} /dev/{vg=vg0}/{lv=data}
3§Remove LV / VG / PV§حذف LV / VG / PV§{mode=@lvremove,vgremove,pvremove} {target}
3§Move data off PV§نقل البيانات من PV§pvmove {dev=/dev/sdb}
2§Resize filesystem§تغيير حجم نظام الملفات§{mode=@resize2fs,xfs_growfs} {target=/dev/vg0/data}
#RAID & encryption|RAID والتشفير
3§Create RAID§إنشاء RAID§mdadm --create /dev/{md=md0} --level={level=@1,0,5,6,10} --raid-devices={n=2} {devs=/dev/sdb /dev/sdc}
3§RAID status§حالة RAID§cat /proc/mdstat && mdadm --detail /dev/{md=md0}
3§Save RAID config§حفظ إعداد RAID§mdadm --detail --scan | tee -a /etc/mdadm/mdadm.conf
3§Fail / remove / add disk§إدارة قرص RAID§mdadm /dev/{md=md0} {mode=@--fail,--remove,--add} {dev=/dev/sdb}
3§LUKS format§تشفير LUKS§cryptsetup luksFormat {dev=/dev/sdb1}
3§LUKS open / close§فتح / غلق LUKS§cryptsetup {mode=@open,close} {dev=/dev/sdb1} {name=secure}
3§LUKS info§معلومات LUKS§cryptsetup luksDump {dev=/dev/sdb1}
#Swap|الـ Swap
2§Create swap file§إنشاء ملف swap§fallocate -l {size=2G} {file=/swapfile} && chmod 600 {file} && mkswap {file} && swapon {file}
2§Swap status§حالة الـ swap§swapon --show; free -h
2§Disable swap§تعطيل الـ swap§swapoff {target=-a}
2§Swappiness§ضبط swappiness§sysctl vm.swappiness={val=10}
#NFS|NFS
2§Export directory§تصدير مجلد§echo '{dir=/srv/share} {net=192.168.1.0/24}(rw,sync,no_subtree_squash)' | tee -a /etc/exports && exportfs -ra
2§Show exports§عرض التصدير§exportfs -v
2§Show remote exports§عرض تصدير جهاز بعيد§showmount -e {host=192.168.1.10}
2§Mount NFS§ربط NFS§mount -t nfs {*} {host=192.168.1.10}:{export=/srv/share} {mnt=/mnt/nfs}§-o ro|Read-only|قراءة فقط¶-o vers=4.2|NFS v4.2|NFS v4.2
#Disk quotas & copy|الحصص والنسخ
3§Raw disk copy§نسخ القرص الخام§dd if={src=/dev/sda} of={dst=disk.img} bs={bs=4M} status=progress
3§Write ISO to USB§كتابة ISO على USB§dd if={iso=file.iso} of={dev=/dev/sdX} bs=4M status=progress oflag=sync
3§Set user quota§حصة مستخدم§edquota -u {user}
3§Quota report§تقرير الحصص§repquota -a
`);
