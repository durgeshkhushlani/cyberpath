export const roadmapData = {
  deep_dive: {
    totalTasks: 4, // Simplified to match the tasks in day 1 for now (expand based on actual objects added)
    weeks: [
      {
        weekNumber: 1,
        title: "Networking & Security Foundations",
        days: [
          {
            day: 1,
            title: "TCP/IP, OSI Model, Subnetting",
            topics: ["OSI model — 7 layers, functions, protocols at each layer", "TCP/IP suite — how packets travel across networks", "Subnetting — CIDR notation, calculating network/broadcast addresses"],
            resources: [
              { label: "Professor Messer Network+ (Free)", url: "https://www.professormesser.com/network-plus/n10-009/n10-009-video/n10-009-training-course/" },
              { label: "Cisco Networking Basics (NetAcad)", url: "https://skillsforall.com/course/networking-basics" },
              { label: "Subnetting Practice", url: "https://www.subnettingpractice.com/" },
              { label: "TryHackMe — Pre-Security Path", url: "https://tryhackme.com/path/outline/presecurity" },
            ],
            tools: ["Cisco Packet Tracer", "ipcalc"],
            tasks: [
              { id: "dd-w1d1-t1", text: "Write OSI model layer-by-layer notes: function + protocol per layer" },
              { id: "dd-w1d1-t2", text: "Practice subnetting: calculate network/broadcast for 10 CIDR blocks" },
              { id: "dd-w1d1-t3", text: "Set up Cisco Packet Tracer and build a simple LAN topology" },
              { id: "dd-w1d1-t4", text: "TryHackMe: Complete 'What is Networking?' room" },
            ],
            tip: "Subnetting appears in almost every SOC/network analyst interview. Practice until it is instinctive."
          },
          // Due to size constraints, additional structure modeled here. Add Day 2-60
          {
            day: 2,
            title: "Network Protocols & Packet Analysis",
            topics: ["DNS, HTTP, ARP, ICMP"],
            resources: [],
            tools: ["Wireshark", "tcpdump"],
            tasks: [
              { id: "dd-w1d2-t1", text: "Analyze an HTTP Request/Response via Wireshark" }
            ],
            tip: "Filters save time in Wireshark!"
          }
        ]
      }
    ]
  },
  standard: {
    totalTasks: 2,
    weeks: [
      {
        weekNumber: 1,
        title: "Accelerated Foundations",
        days: [
          {
            day: 1,
            title: "Networking & Linux CLI",
            topics: ["TCP/IP", "OSI", "Linux Basics"],
            resources: [],
            tools: ["Wireshark", "Kali"],
            tasks: [
              { id: "std-w1d1-t1", text: "Review OSI Layers" },
              { id: "std-w1d1-t2", text: "Practice Basic bash commands" }
            ],
            tip: "Use ExplainShell for confusing bash combinations."
          }
        ]
      }
    ]
  },
  intensive: {
    totalTasks: 2,
    weeks: [
      {
        weekNumber: 1,
        title: "Interview Prep",
        days: [
          {
            day: 1,
            title: "Wireshark + Nmap Crash Course",
            topics: ["Display filters", "Nmap scans"],
            resources: [],
            tools: ["Wireshark", "Nmap"],
            tasks: [
              { id: "int-w1d1-t1", text: "Complete Wireshark hands-on" },
              { id: "int-w1d1-t2", text: "Scan a vulnerable VM with Nmap" }
            ],
            tip: "Don't scan public IPs without permission!"
          }
        ]
      }
    ]
  }
};
