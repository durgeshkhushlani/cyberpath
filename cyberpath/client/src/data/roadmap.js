export const roadmapData = {
  deep_dive: {
    totalTasks: 56, // Roughly 1 task group per day for tracking
    weeks: [
      {
        weekNumber: 1,
        title: "Networking & Security Foundations",
        days: [
          {
            day: 1,
            title: "TCP/IP, OSI Model, Subnetting",
            topics: ["OSI model", "TCP/IP suite", "Subnetting"],
            resources: [
              { label: "Professor Messer Network+", url: "https://www.professormesser.com/network-plus/n10-009/n10-009-video/n10-009-training-course/" },
              { label: "Cisco Networking Basics", url: "https://skillsforall.com/course/networking-basics" },
              { label: "Subnetting Practice", url: "https://subnetipv4.com/" },
              { label: "TryHackMe Pre-Security Path", url: "https://tryhackme.com/path/outline/presecurity" },
              { label: "ipcalc online", url: "https://jodies.de/ipcalc" }
            ],
            tools: ["Cisco Packet Tracer", "ipcalc"],
            tasks: [
              { id: "dd-w1d1-t1", text: "Write OSI model layer-by-layer notes: function + protocol per layer" },
              { id: "dd-w1d1-t2", text: "Practice subnetting: calculate network/broadcast for 10 CIDR blocks" },
              { id: "dd-w1d1-t3", text: "Set up Cisco Packet Tracer and build a simple LAN topology" },
              { id: "dd-w1d1-t4", text: "TryHackMe: Complete 'What is Networking?' room" }
            ],
            tip: "Subnetting appears in almost every SOC/network analyst interview. Practice until it is instinctive."
          },
          {
            day: 2,
            title: "Network Protocols & Packet Analysis",
            topics: ["DNS, HTTP, ARP, ICMP"],
            resources: [
              { label: "Wireshark Official Docs", url: "https://www.wireshark.org/docs/wsug_html/" },
              { label: "Chris Greer YouTube", url: "https://www.youtube.com/@ChrisGreer" },
              { label: "TryHackMe Wireshark Basics", url: "https://tryhackme.com/room/wiresharkthebasics" },
              { label: "tcpdump tutorial", url: "https://danielmiessler.com/study/tcpdump/" }
            ],
            tools: ["Wireshark", "tcpdump"],
            tasks: [
              { id: "dd-w1d2-t1", text: "Analyze an HTTP Request/Response via Wireshark" }
            ],
            tip: "Filters save time in Wireshark!"
          },
          {
            day: 3,
            title: "Linux CLI for Security",
            topics: ["file system, permissions, grep, awk, bash"],
            resources: [
              { label: "OverTheWire Bandit", url: "https://overthewire.org/wargames/bandit/" },
              { label: "TryHackMe Linux Fundamentals", url: "https://tryhackme.com/room/linuxfundamentals1" },
              { label: "ExplainShell", url: "https://explainshell.com/" }
            ],
            tools: ["Kali Linux VM", "VirtualBox"],
            tasks: [
              { id: "dd-w1d3-t1", text: "Complete OverTheWire Bandit Levels 0-5" }
            ],
            tip: "Use ExplainShell for any confusing bash combinations."
          },
          {
            day: 4,
            title: "Windows Security",
            topics: ["Active Directory basics, Registry, Event Logs"],
            resources: [
              { label: "TryHackMe Windows Fun 1", url: "https://tryhackme.com/room/windowsfundamentals1xbx" },
              { label: "Sysinternals Suite", url: "https://learn.microsoft.com/en-us/sysinternals/downloads/sysinternals-suite" }
            ],
            tools: ["Windows Event Viewer", "Sysinternals"],
            tasks: [
              { id: "dd-w1d4-t1", text: "Explore Windows Event Viewer Event ID 4624" }
            ],
            tip: "Learn Event ID 4624 (Logon) and 4625 (Failed Logon) by heart."
          },
          {
            day: 5,
            title: "Cryptography",
            topics: ["hashing, symmetric/asymmetric, PKI, TLS handshake"],
            resources: [
              { label: "TryHackMe Crypto Intro", url: "https://tryhackme.com/room/cryptographyintro" },
              { label: "CyberChef", url: "https://gchq.github.io/CyberChef/" }
            ],
            tools: ["CyberChef", "OpenSSL"],
            tasks: [
              { id: "dd-w1d5-t1", text: "Decode a Base64 string and identify MD5 hash formats using CyberChef" }
            ],
            tip: "Base64 is NOT encryption! It's encoding."
          },
          {
            day: 6,
            title: "Web Application Security Basics",
            topics: ["OWASP Top 10, HTTP, cookies, sessions"],
            resources: [
              { label: "OWASP Top 10", url: "https://owasp.org/www-project-top-ten/" },
              { label: "PortSwigger Web Security", url: "https://portswigger.net/web-security" }
            ],
            tools: ["Burp Suite CE", "OWASP ZAP"],
            tasks: [
              { id: "dd-w1d6-t1", text: "Set up Burp Suite Proxy and intercept a browser request" }
            ],
            tip: "Understand CSRF compared to XSS deeply."
          },
          {
            day: 7,
            title: "Threat Landscape",
            topics: ["MITRE ATT&CK, Cyber Kill Chain, APTs"],
            resources: [
              { label: "MITRE ATT&CK Framework", url: "https://attack.mitre.org/" },
              { label: "Lockheed Martin Kill Chain", url: "https://www.lockheedmartin.com/en-us/capabilities/cyber/cyber-kill-chain.html" }
            ],
            tools: ["ATT&CK Navigator", "VirusTotal"],
            tasks: [
              { id: "dd-w1d7-t1", text: "Map an APT group report to the MITRE ATT&CK Framework" }
            ],
            tip: "Threat hunting revolves entirely around MITRE ATT&CK."
          }
        ]
      },
      {
        weekNumber: 2,
        title: "Offensive & Defensive Security",
        days: [
          {
            day: 8,
            title: "Reconnaissance & OSINT",
            topics: ["passive information gathering"],
            resources: [{ label: "OSINT Framework", url: "https://osintframework.com/" }],
            tools: ["Maltego CE", "theHarvester", "Shodan"],
            tasks: [{ id: "dd-w2d8-t1", text: "Use Shodan to identify an open service without interacting with it directly" }],
            tip: "Never perform active scans without permission."
          },
          {
            day: 9,
            title: "Vulnerability Scanning",
            topics: ["CVE, CVSS scoring"],
            resources: [{ label: "NVD NIST", url: "https://nvd.nist.gov/" }],
            tools: ["Nessus Essentials", "OpenVAS"],
            tasks: [{ id: "dd-w2d9-t1", text: "Run a Nessus credentials scan against Metasploitable" }]
          },
          {
            day: 10,
            title: "Exploitation Fundamentals",
            topics: ["Metasploit, privilege escalation concepts"],
            resources: [{ label: "Metasploit Unleashed", url: "https://www.offsec.com/metasploit-unleashed/" }],
            tools: ["Metasploit Framework"],
            tasks: [{ id: "dd-w2d10-t1", text: "Gain a Meterpreter shell on vsftpd 2.3.4 locally" }]
          },
          {
            day: 11,
            title: "Web Application Attacks",
            topics: ["SQLi, XSS, CSRF, IDOR"],
            resources: [{ label: "PortSwigger SQLi Labs", url: "https://portswigger.net/web-security/sql-injection" }],
            tools: ["Burp Suite", "DVWA", "SQLmap"],
            tasks: [{ id: "dd-w2d11-t1", text: "Exploit a boolean-based blind SQL injection natively" }]
          },
          {
            day: 12,
            title: "Defensive Security",
            topics: ["firewalls, IDS/IPS, network segmentation"],
            resources: [{ label: "Snort Official Docs", url: "https://www.snort.org/documents" }],
            tools: ["Snort", "Security Onion"],
            tasks: [{ id: "dd-w2d12-t1", text: "Write a Snort rule to detect an ICMP sweep" }]
          },
          {
            day: 13,
            title: "Log Analysis & SIEM Introduction",
            topics: ["Splunk fundamentals, BOTS dataset"],
            resources: [{ label: "Splunk Fundamentals 1", url: "https://www.splunk.com/en_us/training/free-courses/splunk-fundamentals-1.html" }],
            tools: ["Splunk", "ELK Stack"],
            tasks: [{ id: "dd-w2d13-t1", text: "Index the BOTS dataset and write a query to find brute force failures" }]
          },
          {
            day: 14,
            title: "Incident Response Process",
            topics: ["NIST SP 800-61 lifecycle"],
            resources: [{ label: "NIST SP 800-61r2", url: "https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final" }],
            tools: ["Autopsy", "Volatility"],
            tasks: [{ id: "dd-w2d14-t1", text: "Map a simulated breach to the 4 phases of IR" }]
          }
        ]
      },
      {
        weekNumber: 3,
        title: "Deep Tool Dives",
        days: [
          {
            day: 15,
            title: "Wireshark Advanced",
            topics: ["display filters, malware traffic"],
            resources: [{ label: "Malware Traffic Analysis", url: "https://www.malware-traffic-analysis.net/" }],
            tools: ["Wireshark", "NetworkMiner"],
            tasks: [{ id: "dd-w3d15-t1", text: "Extract an executable from HTTP streams via Wireshark" }]
          },
          {
            day: 16,
            title: "Nmap & Network Discovery",
            topics: ["scan types, NSE scripts, OS detection"],
            resources: [{ label: "Nmap Scripting Engine", url: "https://nmap.org/nsedoc/" }],
            tools: ["Nmap", "Masscan"],
            tasks: [{ id: "dd-w3d16-t1", text: "Write an Nmap command using aggressive scanning and specific NSE scripts" }]
          },
          {
            day: 17,
            title: "Burp Suite Techniques",
            topics: ["Repeater, Intruder, JWT decode"],
            resources: [{ label: "JWT.io", url: "https://jwt.io/" }],
            tools: ["Burp Suite CE", "FoxyProxy"],
            tasks: [{ id: "dd-w3d17-t1", text: "Use Intruder's Sniper attack to brute force a parameter" }]
          },
          {
            day: 18,
            title: "Metasploit Advanced & Post-Exploitation",
            topics: ["meterpreter, hashdump"],
            resources: [{ label: "Meterpreter Basics", url: "https://tryhackme.com/room/meterpreter" }],
            tools: ["Metasploit"],
            tasks: [{ id: "dd-w3d18-t1", text: "Migrate processes and dump hashes using smart post modules" }]
          },
          {
            day: 19,
            title: "Splunk SIEM Lab",
            topics: ["SPL queries, dashboard building"],
            resources: [{ label: "Splunk BOTS v1", url: "https://github.com/splunk/botsv1" }],
            tools: ["Splunk", "Elastic SIEM"],
            tasks: [{ id: "dd-w3d19-t1", text: "Create a visual geographic map dashboard of IP sources" }]
          },
          {
            day: 20,
            title: "Digital Forensics",
            topics: ["memory analysis, disk forensics"],
            resources: [{ label: "Volatility 3 Docs", url: "https://volatility3.readthedocs.io/" }],
            tools: ["Volatility 3", "Autopsy"],
            tasks: [{ id: "dd-w3d20-t1", text: "Use the windows.pslist plugin to identify rogue processes in a memory dump" }]
          },
          {
            day: 21,
            title: "Threat Intelligence",
            topics: ["IOC analysis, STIX/TAXII"],
            resources: [{ label: "ThreatFox", url: "https://threatfox.abuse.ch/" }],
            tools: ["VirusTotal", "AlienVault"],
            tasks: [{ id: "dd-w3d21-t1", text: "Consume an IOC feed and script importing to a text file" }]
          }
        ]
      },
      {
        weekNumber: 4,
        title: "Advanced Topics I",
        days: [
          {
            day: 22,
            title: "Cloud Security Fundamentals",
            topics: ["AWS IAM, S3 misconfigs, shared responsibility"],
            resources: [{ label: "flaws.cloud", url: "http://flaws.cloud/" }],
            tools: ["AWS CLI", "ScoutSuite"],
            tasks: [{ id: "dd-w4d22-t1", text: "Identify the flawed IAM permissions in flaws.cloud Stage 4" }]
          },
          {
            day: 23,
            title: "Active Directory Attacks & Defence",
            topics: ["Kerberoasting, Pass-the-Hash, BloodHound"],
            resources: [{ label: "TryHackMe Attacktive Directory", url: "https://tryhackme.com/room/attacktivedirectory" }],
            tools: ["BloodHound CE", "Impacket"],
            tasks: [{ id: "dd-w4d23-t1", text: "Map an Active Directory environment with BloodHound visually" }]
          },
          {
            day: 24,
            title: "Malware Analysis Basics",
            topics: ["static and dynamic analysis, sandboxing"],
            resources: [{ label: "ANY.RUN", url: "https://app.any.run/" }],
            tools: ["Ghidra", "PEStudio"],
            tasks: [{ id: "dd-w4d24-t1", text: "Examine PE headers of a suspicious executable in PEStudio" }]
          },
          {
            day: 25,
            title: "CTF Practice Day",
            topics: ["Red/Blue team challenges"],
            resources: [{ label: "PicoCTF", url: "https://picoctf.org/" }],
            tools: ["Kali Tools"],
            tasks: [{ id: "dd-w4d25-t1", text: "Complete 3 PicoCTF challenges of intermediate difficulty" }]
          },
          {
            day: 26,
            title: "Network Forensics & Traffic Analysis",
            topics: ["PCAP triage"],
            resources: [{ label: "Netresec PCAP Files", url: "https://www.netresec.com/?page=PcapFiles" }],
            tools: ["Zeek", "NetworkMiner"],
            tasks: [{ id: "dd-w4d26-t1", text: "Extract user credentials from plaintext FTP traffic capturing" }]
          },
          {
            day: 27,
            title: "Web Application Penetration Testing",
            topics: ["full methodology"],
            resources: [{ label: "OWASP Testing Guide", url: "https://owasp.org/www-project-web-security-testing-guide/" }],
            tools: ["Nikto", "OWASP ZAP"],
            tasks: [{ id: "dd-w4d27-t1", text: "Execute an automated scan against an authorized target environment" }]
          },
          {
            day: 28,
            title: "SIEM Threat Hunting",
            topics: ["advanced SPL, detection rules"],
            resources: [{ label: "Sigma Rules GitHub", url: "https://github.com/SigmaHQ/sigma" }],
            tools: ["Splunk"],
            tasks: [{ id: "dd-w4d28-t1", text: "Convert a threat intelligence IOC to a Sigma Rule" }]
          }
        ]
      },
      {
        weekNumber: 5,
        title: "Advanced Topics II",
        days: [
          { day: 29, title: "Scripting for Security", topics: ["Python basics for security automation"], tools: ["Python", "Scapy"], tasks: [{ id: "dd-529", text: "Write a short Python port scanner" }], resources: [{label: "Real Python", url: "https://realpython.com/"}] },
          { day: 30, title: "Security Frameworks Deep Dive", topics: ["NIST CSF, ISO 27001, SOC 2"], tools: [], tasks: [{ id: "dd-530", text: "Identify exactly where incident response lives within NIST CSF" }], resources: [{label: "NIST Guidelines", url: "https://www.nist.gov/cyberframework"}] },
          { day: 31, title: "Reverse Engineering Introduction", topics: ["assembly, strings analysis"], tools: ["Ghidra", "IDA Free"], tasks: [{ id: "dd-531", text: "Extract strings from a compiled executable to find a hidden flag" }], resources: [{label: "TryHackMe x86-64", url: "https://tryhackme.com/room/introtox8664"}] },
          { day: 32, title: "Social Engineering & Phishing", topics: ["Phishing Analysis"], tools: ["GoPhish", "PhishTool"], tasks: [{ id: "dd-532", text: "Analyze hidden routing data in raw email headers" }], resources: [{label: "PhishTool Community", url: "https://app.phishtool.com/"}] },
          { day: 33, title: "Container & Docker Security", topics: ["Docker, image scanning"], tools: ["Docker", "Trivy"], tasks: [{ id: "dd-533", text: "Use Trivy to scan a known vulnerable container" }], resources: [{label: "Trivy GitHub", url: "https://github.com/aquasecurity/trivy"}] },
          { day: 34, title: "Wireless Network Security", topics: ["WPA2, evil twin, deauth"], tools: ["Aircrack-ng"], tasks: [{ id: "dd-534", text: "Conceptually map a WPA2 4-way handshake capture" }], resources: [{label: "Aircrack docs", url: "https://www.aircrack-ng.org"}] },
          { day: 35, title: "Security Monitoring & SOAR concepts", topics: ["Automation mapping"], tools: [], tasks: [{ id: "dd-535", text: "Draft a playbook logic layout for phishing response automation" }], resources: [{label: "SANS SOC Survey", url: "https://www.sans.org/white-papers/"}] }
        ]
      },
      {
        weekNumber: 6,
        title: "Specialisation Deep Dives",
        days: [
          { day: 36, title: "Advanced Web Attacks", topics: ["SSRF, XXE, deserialization"], tools: ["Burp Suite"], tasks: [{ id: "dd-636", text: "Exploit XML external entities safely on a testing node" }], resources: [{label: "PortSwigger XXE Labs", url: "https://portswigger.net/web-security/xxe"}] },
          { day: 37, title: "Privilege Escalation — Linux", topics: ["Linux PrivEsc"], tools: ["LinPEAS"], tasks: [{ id: "dd-637", text: "Execute SUID bit exploitation in a controlled environment" }], resources: [{label: "GTFOBins", url: "https://gtfobins.github.io/"}] },
          { day: 38, title: "Privilege Escalation — Windows", topics: ["Windows PrivEsc"], tools: ["WinPEAS"], tasks: [{ id: "dd-638", text: "Enumerate unquoted service paths using WinPEAS" }], resources: [{label: "LOLBAS", url: "https://lolbas-project.github.io/"}] },
          { day: 39, title: "Threat Actor Profiling & CTI", topics: ["Reports mapping"], tools: ["MISP"], tasks: [{ id: "dd-639", text: "Create an intel summary from a Mandiant public report" }], resources: [{label: "MISP Project", url: "https://www.misp-project.org/"}] },
          { day: 40, title: "Digital Forensics — Email & Browser", topics: ["Forensics"], tools: ["Autopsy"], tasks: [{ id: "dd-640", text: "Locate hidden browsing history artifacts manually" }], resources: [{label: "Autopsy Tutorials", url: "https://www.autopsy.com/support/training/"}] },
          { day: 41, title: "Vulnerability Management Program", topics: ["Lifecycle"], tools: [], tasks: [{ id: "dd-641", text: "Build an executive-level CVSS overview report architecture" }], resources: [{label: "CVSS Scoring", url: "https://nvd.nist.gov/vuln-metrics/cvss"}] },
          { day: 42, title: "OSCP Prep Intro", topics: ["Buffer Overflow"], tools: [], tasks: [{ id: "dd-642", text: "Review immunity debugger setup concepts" }], resources: [{label: "Buffer Prep", url: "https://tryhackme.com/room/bufferoverflowprep"}] }
        ]
      },
      {
        weekNumber: 7,
        title: "Interview & Certification Prep",
        days: [
          { day: 43, title: "CompTIA Security+ Domain 1 & 2", topics: ["Sec+"], tools: [], tasks: [{ id: "dd-743", text: "Complete Security+ Practice Test 1" }], resources: [{label: "Messer Sec+", url: "https://www.professormesser.com"}] },
          { day: 44, title: "CompTIA Security+ Domain 3 & 4", topics: ["Sec+"], tools: [], tasks: [{ id: "dd-744", text: "Review key cryptographic terms" }], resources: [{label: "Messer Sec+", url: "https://www.professormesser.com"}] },
          { day: 45, title: "CompTIA Security+ Domain 5", topics: ["Sec+"], tools: [], tasks: [{ id: "dd-745", text: "Take a full-length mock simulation exam" }], resources: [{label: "ExamCompass", url: "https://www.examcompass.com/"}] },
          { day: 46, title: "SOC Analyst Technical Round", topics: ["Interviews"], tools: [], tasks: [{ id: "dd-746", text: "Formulate answers for 'How to handle a phishing alert'" }], resources: [{label: "Cyber Interview", url: "https://github.com/nickapic/cybersecurity-interview-questions"}] },
          { day: 47, title: "Incident Response Tabletop", topics: ["Tabletop"], tools: [], tasks: [{ id: "dd-747", text: "Execute a verbal tabletop simulation of ransomware containment" }], resources: [{label: "CISA Tabletop", url: "https://www.cisa.gov/resources-tools/services/cisa-tabletop-exercise-packages"}] },
          { day: 48, title: "CTF Day 2 — Intermediate", topics: ["CTF"], tools: [], tasks: [{ id: "dd-748", text: "Complete an intermediate HTB box" }], resources: [{label: "HackTheBox", url: "https://app.hackthebox.com"}] },
          { day: 49, title: "Resume, LinkedIn, Portfolio", topics: ["Career Prep"], tools: [], tasks: [{ id: "dd-749", text: "Tailor your resume exclusively using the STAR method format" }], resources: [{label: "SANS Careers", url: "https://www.sans.org/cybersecurity-careers/"}] }
        ]
      },
      {
        weekNumber: 8,
        title: "Final Preparation",
        days: [
          { day: 50, title: "Mock Technical Interview — Day 1", topics: ["Mock Interview"], tools: [], tasks: [{ id: "dd-850", text: "Record yourself answering 5 technical queries" }], resources: [{label: "Daniel Miessler Questions", url: "https://danielmiessler.com/study/infosec_interview_questions/"}] },
          { day: 51, title: "Mock Technical Interview — Day 2", topics: ["Mock Interview"], tools: [], tasks: [{ id: "dd-851", text: "Identify weaknesses from Day 1 and study them" }], resources: [{label: "Pramp", url: "https://www.pramp.com"}] },
          { day: 52, title: "HR & Behavioural Interview Prep", topics: ["HR"], tools: [], tasks: [{ id: "dd-852", text: "Write out 3 STAR formatted stories for behavioral challenges" }], resources: [{label: "Indeed STAR Method", url: "https://www.indeed.com/career-advice/interviewing/how-to-use-the-star-interview-response-technique"}] },
          { day: 53, title: "Company Research & Job Application", topics: ["Applications"], tools: [], tasks: [{ id: "dd-853", text: "Apply thoroughly to 10 targeted roles" }], resources: [{label: "LinkedIn Jobs", url: "https://linkedin.com/jobs"}] },
          { day: 54, title: "Certification Roadmap Planning", topics: ["Certs"], tools: [], tasks: [{ id: "dd-854", text: "Draft a 6-month budget and plan for your next 3 certs" }], resources: [{label: "CompTIA", url: "https://www.comptia.org"}] },
          { day: 55, title: "Professional Community Setup", topics: ["Community"], tools: [], tasks: [{ id: "dd-855", text: "Join 3 crucial community discord groups and introduce yourself" }], resources: [{label: "OWASP", url: "https://owasp.org/membership/"}] },
          { day: 56, title: "Final Review", topics: ["Celebrate"], tools: [], tasks: [{ id: "dd-856", text: "Set goals for 90 days out and celebrate!" }], resources: [{label: "Darknet Diaries", url: "https://darknetdiaries.com"}] }
        ]
      }
    ]
  },
  standard: {
    totalTasks: 30,
    weeks: [
      {
        weekNumber: 1,
        title: "Accelerated Foundations",
        days: [
          { day: 1, title: "Networking & Linux CLI", topics: ["TCP/IP", "Bash"], tools: ["Wireshark"], tasks: [{ id: "std-11", text: "Review OSI Layers" }], resources: [{label: "Prof Messer", url: "https://professormesser.com"}] },
          { day: 2, title: "Windows Security + Cryptography", topics: ["Active Directory", "Crypto"], tools: ["CyberChef"], tasks: [{ id: "std-12", text: "Decode hashes" }], resources: [{label: "CyberChef", url: "https://gchq.github.io/CyberChef"}] },
          { day: 3, title: "Web Security & Threat Frameworks", topics: ["OWASP", "MITRE"], tools: ["Burp"], tasks: [{ id: "std-13", text: "Review OWASP Top 10" }], resources: [{label: "OWASP", url: "https://owasp.org"}] },
          { day: 4, title: "OSINT & Reconnaissance", topics: ["OSINT"], tools: ["Maltego"], tasks: [{ id: "std-14", text: "Perform basic Shodan OSINT" }], resources: [{label: "Shodan", url: "https://shodan.io"}] },
          { day: 5, title: "Vulnerability Scanning", topics: ["Nessus"], tools: ["Nessus"], tasks: [{ id: "std-15", text: "Scan a localized VM" }], resources: [{label: "NVD", url: "https://nvd.nist.gov"}] },
          { day: 6, title: "Exploitation Basics", topics: ["Metasploit"], tools: ["Metasploit"], tasks: [{ id: "std-16", text: "Run a basic remote exploit execution" }], resources: [{label: "Metasploit", url: "https://www.offsec.com/metasploit-unleashed/"}] },
          { day: 7, title: "Defensive Security + IDS/IPS", topics: ["Snort"], tools: ["Snort"], tasks: [{ id: "std-17", text: "Structure a single alert rule" }], resources: [{label: "Security Onion", url: "https://securityonion.net"}] }
        ]
      },
      {
        weekNumber: 2,
        title: "Core Tools",
        days: [
          { day: 8, title: "Wireshark full session", topics: ["PCAP"], tools: ["Wireshark"], tasks: [{ id: "std-28", text: "Trace an HTTP conversation" }], resources: [{label: "Wireshark Docs", url: "https://wireshark.org"}] },
          { day: 9, title: "Nmap full session", topics: ["Nmap"], tools: ["Nmap"], tasks: [{ id: "std-29", text: "Execute an aggressive NSE profile scan" }], resources: [{label: "Nmap", url: "https://nmap.org"}] },
          { day: 10, title: "Burp Suite full session", topics: ["Burp"], tools: ["Burp Suite"], tasks: [{ id: "std-210", text: "Modify a raw HTTP header parameter" }], resources: [{label: "PortSwigger", url: "https://portswigger.net"}] },
          { day: 11, title: "Splunk SIEM", topics: ["SPL Queries"], tools: ["Splunk"], tasks: [{ id: "std-211", text: "Index small BOTS sample" }], resources: [{label: "Splunk", url: "https://splunk.com"}] },
          { day: 12, title: "Log Analysis & IR", topics: ["Incident Response"], tools: [], tasks: [{ id: "std-212", text: "Structure a simulated IR playbook step" }], resources: [{label: "NIST IR", url: "https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final"}] },
          { day: 13, title: "Digital Forensics", topics: ["Memory/Disk"], tools: ["Volatility"], tasks: [{ id: "std-213", text: "Acquire basic volatility structures" }], resources: [{label: "Volatility", url: "https://volatilityfoundation.org"}] },
          { day: 14, title: "Threat Intelligence", topics: ["IOCs"], tools: ["VirusTotal"], tasks: [{ id: "std-214", text: "Assess a URL score actively" }], resources: [{label: "VirusTotal", url: "https://virustotal.com"}] }
        ]
      },
      {
        weekNumber: 3,
        title: "Advanced Optionals",
        days: [
          { day: 15, title: "Cloud Security", topics: ["AWS"], tools: ["AWS CLI"], tasks: [{ id: "std-315", text: "Run flaws.cloud basics" }], resources: [{label: "Flaws", url: "http://flaws.cloud"}] },
          { day: 16, title: "Active Directory Attacks", topics: ["BloodHound"], tools: ["BloodHound"], tasks: [{ id: "std-316", text: "Identify ACL logic issues" }], resources: [{label: "BloodHound", url: "https://github.com/SpecterOps/BloodHound"}] },
          { day: 17, title: "Malware Analysis Basics", topics: ["PEStudio"], tools: ["ANY.RUN"], tasks: [{ id: "std-317", text: "Check a hash via ANY.RUN" }], resources: [{label: "ANY.RUN", url: "https://any.run"}] },
          { day: 18, title: "Web App Pentesting", topics: ["SSRF, SQLi"], tools: ["Burp Suite"], tasks: [{ id: "std-318", text: "Walkthrough SQLi blind logic" }], resources: [{label: "PortSwigger SQLi", url: "https://portswigger.net/web-security/sql-injection"}] },
          { day: 19, title: "SOC Analyst Workflow", topics: ["Splunk"], tools: ["Splunk"], tasks: [{ id: "std-319", text: "Hunt for standard web injection patterns across logs" }], resources: [{label: "BOTS", url: "https://github.com/splunk/botsv1"}] },
          { day: 20, title: "CTF Day", topics: ["PicoCTF"], tools: [], tasks: [{ id: "std-320", text: "Solve 2 PicoCTF puzzles" }], resources: [{label: "PicoCTF", url: "https://picoctf.org"}] },
          { day: 21, title: "Security+ Study", topics: ["Sec+"], tools: [], tasks: [{ id: "std-321", text: "Take general tech practice exam" }], resources: [{label: "Messer", url: "https://professormesser.com"}] }
        ]
      },
      {
        weekNumber: 4,
        title: "Job Readiness",
        days: [
          { day: 22, title: "Security+ Study 2", topics: ["Sec+"], tools: [], tasks: [{ id: "std-422", text: "Drill on missed subjects" }], resources: [{label: "Messer", url: "https://professormesser.com"}] },
          { day: 23, title: "Top 50 SOC Questions", topics: ["Interview"], tools: [], tasks: [{ id: "std-423", text: "Write out 5 deep network answers" }], resources: [{label: "SOC Interivew", url: "https://tcm-sec.com/so-you-want-to-be-a-soc-analyst/"}] },
          { day: 24, title: "Incident Response Tabletop", topics: ["Tabletop"], tools: [], tasks: [{ id: "std-424", text: "Orally complete a mock IR event" }], resources: [{label: "CISA", url: "https://cisa.gov"}] },
          { day: 25, title: "Threat Hunting", topics: ["Splunk"], tools: [], tasks: [{ id: "std-425", text: "Create one robust detection model" }], resources: [{label: "Splunk", url: "https://splunk.com"}] },
          { day: 26, title: "Resume + GitHub", topics: ["Portfolio"], tools: [], tasks: [{ id: "std-426", text: "Tidy up GitHub commits for visibility" }], resources: [{label: "GitHub", url: "https://github.com"}] },
          { day: 27, title: "HR & Behavioural", topics: ["STAR Format"], tools: [], tasks: [{ id: "std-427", text: "Record STAR answers" }], resources: [{label: "Indeed", url: "https://indeed.com"}] },
          { day: 28, title: "Mock Technical Interview", topics: ["Mock Interview"], tools: [], tasks: [{ id: "std-428", text: "Do a full 1h technical assessment internally" }], resources: [{label: "Pramp", url: "https://pramp.com"}] },
          { day: 29, title: "Targeted Application Sprint", topics: ["Careers"], tools: [], tasks: [{ id: "std-429", text: "Ship 10 finely-tuned resumes" }], resources: [{label: "LinkedIn", url: "https://linkedin.com/jobs"}] },
          { day: 30, title: "Final Certification Prep", topics: ["Certs"], tools: [], tasks: [{ id: "std-430", text: "Schedule your exam window!" }], resources: [{label: "CompTIA", url: "https://comptia.org"}] }
        ]
      }
    ]
  },
  intensive: {
    totalTasks: 14,
    weeks: [
      {
        weekNumber: 1,
        title: "Intensive Bootcamp Mode 1",
        days: [
          { day: 1, title: "Wireshark + Nmap", topics: ["Network"], tools: ["Nmap"], tasks: [{id: "int-11", text: "Run intensive scan logs"}], resources: [{label: "Nmap", url: "https://nmap.org"}] },
          { day: 2, title: "Burp + OWASP", topics: ["Web"], tools: ["Burp Suite"], tasks: [{id: "int-12", text: "Execute repeater payloads"}], resources: [{label: "PortSwigger", url: "https://portswigger.net"}] },
          { day: 3, title: "Splunk SIEM", topics: ["Logs"], tools: ["Splunk"], tasks: [{id: "int-13", text: "Detect brute forces"}], resources: [{label: "Splunk", url: "https://splunk.com"}] },
          { day: 4, title: "MITRE + Intel", topics: ["CTI"], tools: ["VirusTotal"], tasks: [{id: "int-14", text: "Assess domain reports"}], resources: [{label: "VirusTotal", url: "https://virustotal.com"}] },
          { day: 5, title: "IR Lifecycles", topics: ["IR"], tools: [], tasks: [{id: "int-15", text: "Define containment protocols"}], resources: [{label: "NIST", url: "https://csrc.nist.gov"}] },
          { day: 6, title: "Digital Forensics", topics: ["Disk"], tools: ["Autopsy"], tasks: [{id: "int-16", text: "Search strings on disks"}], resources: [{label: "Autopsy", url: "https://autopsy.com"}] },
          { day: 7, title: "AD + Cloud Sec", topics: ["AWS", "Kerberos"], tools: ["AWS CLI"], tasks: [{id: "int-17", text: "Identify open IAM roles"}], resources: [{label: "Flaws", url: "http://flaws.cloud"}] }
        ]
      },
      {
        weekNumber: 2,
        title: "Intensive Bootcamp Mode 2",
        days: [
          { day: 8, title: "Top 50 SOC Questions Part 1", topics: ["Review"], tools: [], tasks: [{id: "int-28", text: "Draft answers completely"}], resources: [{label: "Questions", url: "https://github.com"}] },
          { day: 9, title: "Top 50 SOC Questions Part 2", topics: ["Review"], tools: [], tasks: [{id: "int-29", text: "Draft responses orally"}], resources: [{label: "TCM", url: "https://tcm-sec.com"}] },
          { day: 10, title: "CTF Marathon", topics: ["CyberDefenders"], tools: ["Kali"], tasks: [{id: "int-210", text: "Solve one complex blue team room"}], resources: [{label: "HackTheBox", url: "https://app.hackthebox.com"}] },
          { day: 11, title: "Resume + GitHub Sprint", topics: ["Portfolio"], tools: [], tasks: [{id: "int-211", text: "Overhaul descriptions"}], resources: [{label: "LinkedIn", url: "https://linkedin.com"}] },
          { day: 12, title: "HR & Behavioural", topics: ["STAR"], tools: [], tasks: [{id: "int-212", text: "Simulate pressure rounds"}], resources: [{label: "Indeed", url: "https://indeed.com"}] },
          { day: 13, title: "Mock Technical Interview", topics: ["Sim"], tools: [], tasks: [{id: "int-213", text: "Record 60 minute session completely"}], resources: [{label: "Pramp", url: "https://pramp.com"}] },
          { day: 14, title: "Cert Roadmap + Applications", topics: ["Jobs"], tools: [], tasks: [{id: "int-214", text: "Apply relentlessly to 15 roles"}], resources: [{label: "CompTIA", url: "https://comptia.org"}] }
        ]
      }
    ]
  }
};
