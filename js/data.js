// ============================================
// PORTFOLIO DATA - All Projects & Info
// ============================================
window.PORTFOLIO_DATA = {
    projects: [
        // ===== COMPLETED =====
        {
            id: 'p1', name: 'Custom Domain Setup', status: 'done',
            category: 'server', icon: '🌐',
            desc: 'Configured abhilashkar.tech with DNS nameservers (ns1 & ns2). Set up reverse proxy for multiple sites.',
            tags: ['DNS', 'Nginx', 'Reverse Proxy', 'SSL'],
            level: 'Junior SysAdmin Level',
            details: ['Custom domain: abhilashkar.tech', 'DNS ns1 & ns2 configuration', 'Nginx reverse proxy for multiple sites', 'SSL certificate installation', 'Load balancer setup', 'Backup server configured']
        },
        {
            id: 'p2', name: 'WireGuard VPN Server', status: 'done',
            category: 'security', icon: '🔐',
            desc: 'Full WireGuard VPN setup with mobile client config, key pair generation and secure remote access.',
            tags: ['VPN', 'WireGuard', 'Network Security', 'Cryptography'],
            level: 'Real Cybersecurity Lab',
            details: ['WireGuard server deployment', 'Mobile client configuration', 'Key pair generation', 'Secure remote connection', 'Network routing setup']
        },
        {
            id: 'p3', name: 'Network Traffic Monitor', status: 'done',
            category: 'security', icon: '📡',
            desc: 'Wireshark-based packet capture and analysis on phone WiFi. Inspected HTTP/HTTPS traffic patterns.',
            tags: ['Wireshark', 'Packet Analysis', 'Network Monitoring'],
            level: 'Security Research',
            details: ['Phone WiFi traffic capture', 'Packet inspection', 'Protocol analysis', 'HTTP/HTTPS request tracking']
        },
        {
            id: 'p4', name: 'WordPress Hosting & Deployment', status: 'done',
            category: 'web', icon: '💻',
            desc: 'Complete WordPress installation, domain linking and production deployment on personal VPS.',
            tags: ['WordPress', 'Web Hosting', 'VPS', 'Nginx'],
            level: 'Web Developer',
            details: ['WordPress installation', 'Domain linking to VPS', 'Website deployment', 'Performance optimization']
        },
        {
            id: 'p5', name: 'ESP8266 IoT Module', status: 'done',
            category: 'embedded', icon: '🔧',
            desc: 'Learned ESP8266 microcontroller programming, WiFi communication, and IoT cloud connectivity basics.',
            tags: ['ESP8266', 'IoT', 'WiFi', 'Embedded'],
            level: 'Embedded Systems',
            details: ['ESP8266 programming basics', 'WiFi module interfacing', 'IoT communication protocols', 'Sensor data transmission']
        },

        // ===== ONGOING =====
        {
            id: 'p6', name: 'WhatsApp AI Bot', status: 'ongoing',
            category: 'ai', icon: '🤖',
            desc: 'Personal AI auto-reply system on Windows server. Integrating WhatsApp Business API with custom persona manifest.',
            tags: ['AI', 'WhatsApp API', 'Python', 'Automation'],
            level: 'Advanced (Final Year Level)',
            details: ['AI auto-reply system', 'Windows server deployment', 'WhatsApp Business API research', 'Persona manifest system', 'Webhook integration']
        },
        {
            id: 'p7', name: 'Web Chat Application', status: 'ongoing',
            category: 'web', icon: '💬',
            desc: 'Real-time chat application hosted on personal VPS. Full stack with backend integration, potential Final Year Project.',
            tags: ['WebSockets', 'Node.js', 'Real-time', 'VPS'],
            level: 'Final Year Project Candidate',
            details: ['Hosted on personal VPS', 'UI & backend integration', 'Real-time messaging', 'WebSocket implementation']
        },
        {
            id: 'p8', name: 'Ethical Hacking Lab', status: 'ongoing',
            category: 'security', icon: '🧠',
            desc: 'Azure VM as target, personal PC as attacker. Full penetration testing lab environment at home.',
            tags: ['PenTest', 'Azure', 'Kali Linux', 'Metasploit'],
            level: 'Home Security Lab',
            details: ['Azure VM as attack target', 'Personal PC as attacker', 'Penetration testing practice', 'Vulnerability exploitation']
        },
        {
            id: 'p9', name: 'Game Reverse Engineering', status: 'ongoing',
            category: 'reverse', icon: '🎮',
            desc: 'Unity/GameMaker data.win analysis, texture extraction and file structure reverse engineering.',
            tags: ['Reverse Engineering', 'Unity', 'GameMaker', 'Forensics'],
            level: 'Reverse Engineering / Forensics',
            details: ['data.win binary analysis', 'Texture extraction', 'File format reverse engineering', 'Memory structure analysis']
        },

        // ===== UPCOMING =====
        {
            id: 'p10', name: 'Vulnerable Web App (Hack Target)', status: 'upcoming',
            category: 'security', icon: '🎯',
            desc: 'Build a purposely vulnerable web app for practicing SQL injection, XSS, and authentication bypass.',
            tags: ['Web Security', 'SQLi', 'XSS', 'Python'],
            priority: 1,
            details: ['SQL injection vulnerabilities', 'XSS attack surfaces', 'Authentication bypass', 'File upload attacks']
        },
        {
            id: 'p11', name: 'Python Port Scanner', status: 'upcoming',
            category: 'tools', icon: '🔍',
            desc: 'Custom Nmap-like port scanner in Python with service detection and HTML report generation.',
            tags: ['Python', 'Networking', 'Sockets', 'Security Tools'],
            priority: 1,
            details: ['Multi-threaded scanning', 'Service version detection', 'Banner grabbing', 'HTML report export']
        },
        {
            id: 'p12', name: 'AI WhatsApp Assistant (Full)', status: 'upcoming',
            category: 'ai', icon: '🤖',
            desc: 'Complete AI-powered WhatsApp assistant with custom personas, memory, and automation workflows.',
            tags: ['AI', 'WhatsApp', 'Python', 'NLP'],
            priority: 3,
            details: ['Full AI conversation system', 'Custom persona engine', 'Memory and context', 'Multi-task automation']
        },
        {
            id: 'p13', name: 'Self-Hosted Cloud Storage', status: 'upcoming',
            category: 'server', icon: '☁',
            desc: 'Personal cloud storage (like Google Drive) hosted on VPS with web interface and mobile access.',
            tags: ['Nextcloud', 'VPS', 'Storage', 'Self-hosted'],
            priority: 3,
            details: ['Nextcloud deployment', 'Web interface', 'Mobile app integration', 'Encrypted storage']
        },
    ],

    skills: [
        {
            category: 'System Administration',
            icon: '🖥',
            color: 'green',
            items: [
                { name: 'VPS Management', level: 80 },
                { name: 'Nginx Web Server', level: 75 },
                { name: 'SSL/TLS Certificates', level: 80 },
                { name: 'DNS Configuration', level: 85 },
                { name: 'Load Balancing', level: 65 },
                { name: 'Reverse Proxy', level: 75 },
            ]
        },
        {
            category: 'Networking',
            icon: '📡',
            color: 'cyan',
            items: [
                { name: 'TCP/IP Protocols', level: 70 },
                { name: 'DNS & DHCP', level: 80 },
                { name: 'VPN (WireGuard)', level: 70 },
                { name: 'Wireshark', level: 55 },
                { name: 'Network Routing', level: 65 },
                { name: 'Subnetting', level: 60 },
            ]
        },
        {
            category: 'Cybersecurity',
            icon: '🔐',
            color: 'red',
            items: [
                { name: 'Penetration Testing', level: 45 },
                { name: 'Network Security', level: 55 },
                { name: 'Ethical Hacking', level: 45 },
                { name: 'Vulnerability Analysis', level: 50 },
                { name: 'Security Monitoring', level: 60 },
            ]
        },
        {
            category: 'Web Development',
            icon: '🌐',
            color: 'yellow',
            items: [
                { name: 'HTML/CSS', level: 80 },
                { name: 'JavaScript', level: 60 },
                { name: 'WordPress', level: 70 },
                { name: 'Web Hosting', level: 80 },
                { name: 'REST APIs', level: 50 },
            ]
        },
        {
            category: 'Programming',
            icon: '💻',
            color: 'purple',
            items: [
                { name: 'Python', level: 55 },
                { name: 'Bash / Shell', level: 60 },
                { name: 'JavaScript', level: 60 },
            ]
        },
        {
            category: 'Embedded / IoT',
            icon: '🔧',
            color: 'orange',
            items: [
                { name: 'ESP8266', level: 50 },
                { name: 'IoT Protocols', level: 40 },
                { name: 'WiFi Communication', level: 55 },
            ]
        },
    ],

    studyPlan: [
        {
            phase: 'Phase 1 — Foundation (NOW)',
            status: 'active',
            period: 'Days 1–30',
            tasks: [
                'Finish Web Chat Application',
                'Build Python Port Scanner (mini-Nmap)',
                'Create Vulnerable Login Website',
                'Start Bug Bounty basics (HackTheBox)',
            ]
        },
        {
            phase: 'Phase 2 — Cybersecurity Core',
            status: 'upcoming',
            period: 'Month 2–3',
            tasks: [
                'Networking Fundamentals (TCP/IP, ports, routing, NAT)',
                'Linux Mastery (permissions, SSH, cron, iptables)',
                'Web Attacks (SQLi, XSS, File Upload, Auth Bypass)',
                'Tools: Nmap, Burp Suite basics',
            ]
        },
        {
            phase: 'Phase 3 — Offensive Security',
            status: 'upcoming',
            period: 'Month 4–6',
            tasks: [
                'Metasploit Framework',
                'Privilege escalation techniques',
                'CTF competitions (TryHackMe, HTB)',
                'Python scripting for hacking tools',
                'Keylogger + Password Cracker (lab use)',
            ]
        },
        {
            phase: 'Phase 4 — Specialization',
            status: 'planned',
            period: 'Month 7–12',
            tasks: [
                'Bug Bounty Hunting (HackerOne, Bugcrowd)',
                'Reverse Engineering (Ghidra, IDA Free)',
                'AI WhatsApp Assistant (complete)',
                'IoT Smart Device (ESP8266 web-controlled)',
                'Network Intrusion Detection',
            ]
        },
        {
            phase: 'Phase 5 — Final Year Project',
            status: 'planned',
            period: 'Year 2',
            tasks: [
                'Self-hosted Cloud Storage platform',
                'AI-integrated Security Monitoring System',
                'Full penetration testing writeups',
                'Internship / Bug Bounty earnings',
            ]
        },
    ],

    certifications: [
        {
            name: 'Introduction to Ethical Hacking Principles (ID: QFPOEB2AB8ZZ)',
            issuer: 'Skillup.co',
            date: 'Dec 2025',
            status: 'earned',
            link: 'https://www.coursera.org/account/accomplishments/records/QFPOEB2AB8ZZ',
        },
        {
            name: 'Play It Safe: Manage Security Risks (ID: K9XMCOW3OYKA)',
            issuer: 'Google',
            date: 'Jan 2026',
            status: 'earned',
            link: '#',
        },
        {
            name: 'Ethical Hacking with Kali Linux (ID: 0W9JKNIRJB4P)',
            issuer: 'IBM',
            date: 'Dec 2025',
            status: 'earned',
            link: '#',
        },
        {
            name: 'Foundations of Cybersecurity (ID: JEEY5BWZU8UU)',
            issuer: 'Google',
            date: 'Dec 2025',
            status: 'earned',
            link: '#',
        },
        {
            name: 'Google Workspace with Gemini Specialization (ID: PQBLOHCD2PM7)',
            issuer: 'Google Cloud Skills Boost',
            date: 'Dec 2025',
            status: 'earned',
            link: '#',
        },
        {
            name: 'Developing Back-End Apps with Node.js and Express (ID: 21XIKWXBDU4S)',
            issuer: 'IBM',
            date: 'Dec 2025',
            status: 'earned',
            link: '#',
        },
        {
            name: 'Developing Front-End Apps with React (ID: 8GS2ZTABWQZX)',
            issuer: 'IBM',
            date: 'Dec 2025',
            status: 'earned',
            link: '#',
        },
        {
            name: 'Getting Started with Git and GitHub (ID: DS7HP6AYM30I)',
            issuer: 'IBM',
            date: 'Nov 2025',
            status: 'earned',
            link: '#',
        },
        {
            name: 'Introduction to Web Development with HTML, CSS, JavaScript (ID: XUYKB9G824OE)',
            issuer: 'IBM',
            date: 'Nov 2025',
            status: 'earned',
            link: '#',
        },
        {
            name: 'Introduction to Microsoft Excel (ID: C30078X46POW)',
            issuer: 'Coursera',
            date: 'Nov 2025',
            status: 'earned',
            link: '#',
        },
        {
            name: 'Getting Started with Microsoft PowerPoint (ID: B5O2XUN3B2W4)',
            issuer: 'Coursera',
            date: 'Nov 2025',
            status: 'earned',
            link: '#',
        },
        {
            name: 'The Origins II: CSS',
            issuer: 'Codedex',
            date: 'Nov 2024',
            status: 'earned',
            link: '#',
        },
        {
            name: 'The Origins I: HTML',
            issuer: 'Codedex',
            date: 'Aug 2024',
            status: 'earned',
            link: '#',
        },
    ]
};
