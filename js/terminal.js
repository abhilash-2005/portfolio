// ============================================
// TERMINAL ENGINE
// Interactive hacker terminal
// ============================================

class HackerTerminal {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.options = {
            interactive: options.interactive || false,
            autoRun: options.autoRun || [],
            typingSpeed: options.typingSpeed || 35,
            promptUser: options.promptUser || 'abhilash@portfolio:~$ ',
        };

        this.outputEl = this.container.querySelector('.terminal-body');
        this.inputEl = this.container.querySelector('.terminal-input');
        this.history = [];
        this.historyIndex = -1;
        this.commandQueue = [];
        this.running = false;

        if (this.inputEl) this._bindInput();
        if (this.options.autoRun.length > 0) this._autoRunCommands();
    }

    // === Auto-run a sequence of commands with delays ===
    async _autoRunCommands() {
        for (const item of this.options.autoRun) {
            if (item.delay) await this._sleep(item.delay);
            if (item.cmd !== undefined) {
                await this._typeCommand(item.cmd);
                if (item.output) this._printLines(item.output);
            } else if (item.print) {
                this._printLines(item.print);
            }
            await this._sleep(300);
        }
        // Blinking cursor at end
        this._addCursorLine();
    }

    async _typeCommand(cmd) {
        const line = document.createElement('div');
        line.className = 't-line t-prompt';
        line.innerHTML = `<span class="t-cmd-text"></span>`;
        this.outputEl.appendChild(line);

        const textEl = line.querySelector('.t-cmd-text');
        for (let i = 0; i <= cmd.length; i++) {
            textEl.textContent = cmd.substring(0, i);
            this.scrollToBottom();
            await this._sleep(this.options.typingSpeed);
        }
    }

    _printLines(lines) {
        lines.forEach((l, idx) => {
            setTimeout(() => {
                const line = document.createElement('div');
                line.className = 't-line';

                if (typeof l === 'string') {
                    line.innerHTML = l;
                    line.className = 't-line t-output';
                } else {
                    line.className = `t-line ${l.class || 't-output'}`;
                    line.innerHTML = l.text || l;
                }

                this.outputEl.appendChild(line);
                this.scrollToBottom();
            }, idx * 50);
        });
    }

    _addCursorLine() {
        setTimeout(() => {
            const line = document.createElement('div');
            line.className = 't-line t-prompt';
            line.innerHTML = `<span class="cursor"></span>`;
            this.outputEl.appendChild(line);
            this.scrollToBottom();
        }, 500);
    }

    // === Interactive input ===
    _bindInput() {
        this.inputEl.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = this.inputEl.value.trim();
                this.inputEl.value = '';
                if (cmd) {
                    this.history.unshift(cmd);
                    this.historyIndex = -1;
                    this._echoCommand(cmd);
                    this._processCommand(cmd);
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (this.historyIndex < this.history.length - 1) {
                    this.historyIndex++;
                    this.inputEl.value = this.history[this.historyIndex] || '';
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (this.historyIndex > 0) {
                    this.historyIndex--;
                    this.inputEl.value = this.history[this.historyIndex] || '';
                } else {
                    this.historyIndex = -1;
                    this.inputEl.value = '';
                }
            } else if (e.ctrlKey && e.key === 'l') {
                e.preventDefault();
                this.clear();
            }
        });

        // Focus on click anywhere in terminal
        this.container.addEventListener('click', () => {
            if (this.inputEl) this.inputEl.focus();
        });
    }

    _echoCommand(cmd) {
        const line = document.createElement('div');
        line.className = 't-line t-prompt';
        line.innerHTML = `<span style="color:var(--green)">${this._escHtml(cmd)}</span>`;
        this.outputEl.appendChild(line);
        this.scrollToBottom();
    }

    _processCommand(cmd) {
        const parts = cmd.toLowerCase().split(' ');
        const base = parts[0];
        const args = parts.slice(1);

        const commands = {
            help: () => this._cmdHelp(),
            ls: () => this._cmdLs(args),
            cat: () => this._cmdCat(args),
            whoami: () => this._cmdWhoami(),
            projects: () => this._cmdProjects(args),
            skills: () => this._cmdSkills(),
            status: () => this._cmdStatus(),
            clear: () => this.clear(),
            cls: () => this.clear(),
            uname: () => this._cmdUname(),
            pwd: () => this._printLine('t-success', '/home/abhilash/portfolio'),
            date: () => this._printLine('t-output', new Date().toString()),
            ping: () => this._cmdPing(args),
            nmap: () => this._cmdNmap(args),
            sudo: () => this._printLine('t-error', '[sudo] password for abhilash: Sorry, try again.'),
        };

        if (commands[base]) {
            commands[base]();
        } else if (base === '') {
            // empty
        } else {
            this._printLine('t-error', `bash: ${this._escHtml(base)}: command not found. Type <span class="t-info">help</span> for available commands.`);
        }
        this.scrollToBottom();
    }

    _cmdHelp() {
        this._printLines([
            { class: 't-info', text: '╔══════════════════════════════════════╗' },
            { class: 't-info', text: '║     ABHILASH PORTFOLIO - TERMINAL    ║' },
            { class: 't-info', text: '╚══════════════════════════════════════╝' },
            { class: 't-output', text: '' },
            { class: 't-output', text: '<table class="t-table"><tr><td>help</td><td>Show this help menu</td></tr><tr><td>whoami</td><td>About Abhilash</td></tr><tr><td>projects [filter]</td><td>List projects (all/done/ongoing/upcoming)</td></tr><tr><td>skills</td><td>Display skill tree</td></tr><tr><td>status</td><td>Career status overview</td></tr><tr><td>ls</td><td>List directory contents</td></tr><tr><td>cat [file]</td><td>Read a file (try: cat about.txt)</td></tr><tr><td>nmap [target]</td><td>Scan a target (simulated)</td></tr><tr><td>ping [host]</td><td>Ping a host (simulated)</td></tr><tr><td>clear / cls</td><td>Clear terminal</td></tr></table>' },
        ]);
    }

    _cmdWhoami() {
        this._printLines([
            { class: 't-success', text: '┌─────────────────────────────────────────' },
            { class: 't-success', text: '│ USER: Abhilash' },
            { class: 't-output', text: '│ ROLE: B.Tech CSE Student → DevSecOps Engineer' },
            { class: 't-output', text: '│ LOCATION: India' },
            { class: 't-info', text: '│ FIELDS: System Admin | Networking | Cybersecurity | Web Dev | IoT' },
            { class: 't-warning', text: '│ STATUS: Building real-world projects since day one' },
            { class: 't-success', text: '└─────────────────────────────────────────' },
        ]);
    }

    _cmdProjects(args) {
        const filter = args[0] || 'all';
        const allProjects = window.PORTFOLIO_DATA ? window.PORTFOLIO_DATA.projects : [];

        const filtered = filter === 'all' ? allProjects : allProjects.filter(p => p.status === filter);

        if (filtered.length === 0) {
            this._printLine('t-error', `No projects found for filter: ${filter}`);
            return;
        }

        filtered.forEach(p => {
            const statusClass = p.status === 'done' ? 't-success' : p.status === 'ongoing' ? 't-warning' : 't-info';
            const statusIcon = p.status === 'done' ? '✓' : p.status === 'ongoing' ? '⟳' : '◉';
            this._printLines([
                { class: statusClass, text: `${statusIcon} ${p.name}` },
                { class: 't-output', text: `  └─ ${p.desc}` },
                { class: 't-dim', text: `     [${(p.tags || []).join(', ')}]` },
            ]);
        });
    }

    _cmdSkills() {
        this._printLines([
            { class: 't-category', text: '[SYSTEM ADMINISTRATION]' },
            { class: 't-output', text: '  VPS Hosting ████████░░ 80% │ Nginx ███████░░░ 70% │ SSL/TLS ████████░░ 80%' },
            { class: 't-category', text: '[NETWORKING]' },
            { class: 't-output', text: '  DNS ████████░░ 80% │ VPN/WireGuard ███████░░░ 70% │ Wireshark █████░░░░░ 55%' },
            { class: 't-category', text: '[CYBERSECURITY]' },
            { class: 't-output', text: '  PenTest Lab ██████░░░░ 60% │ Network Sec █████░░░░░ 55% │ Ethical Hacking ████░░░░░░ 45%' },
            { class: 't-category', text: '[WEB DEVELOPMENT]' },
            { class: 't-output', text: '  HTML/CSS ████████░░ 80% │ JavaScript ██████░░░░ 60% │ WordPress ███████░░░ 70%' },
            { class: 't-category', text: '[EMBEDDED / IoT]' },
            { class: 't-output', text: '  ESP8266 █████░░░░░ 50% │ IoT Protocols ████░░░░░░ 40%' },
        ]);
    }

    _cmdStatus() {
        this._printLines([
            { class: 't-success', text: '═══ CAREER STATUS REPORT ═══' },
            { class: 't-output', text: 'Level: Intermediate (Beyond beginner, approaching junior professional)' },
            { class: 't-success', text: '✓ Completed: 13+ real-world projects' },
            { class: 't-warning', text: '⟳ Ongoing: 4 advanced projects' },
            { class: 't-info', text: '◉ Upcoming: 6 planned projects' },
            { class: 't-output', text: '' },
            { class: 't-warning', text: 'TARGET: DevSecOps Engineer / Ethical Hacker' },
            { class: 't-output', text: 'ETA: Approx 2 years with consistent effort' },
        ]);
    }

    _cmdLs(args) {
        const files = [
            '<span class="t-info">about.txt</span>',
            '<span class="t-success">projects/</span>',
            '<span class="t-success">skills/</span>',
            '<span class="t-success">certs/</span>',
            '<span class="text-red">secret_labs/</span>',
            '<span class="t-warning">study_plan.md</span>',
            '<span class="t-output">contact.txt</span>',
        ];
        this._printLine('t-output', files.join('  '));
    }

    _cmdCat(args) {
        const file = args[0] || '';
        const files = {
            'about.txt': [
                { class: 't-success', text: 'Name    : Abhilash' },
                { class: 't-output', text: 'Degree  : B.Tech — Computer Science Engineering' },
                { class: 't-output', text: 'Domain  : abhilashkar.tech' },
                { class: 't-info', text: 'Email   : abhilashbpd1234@gmail.com' },
                { class: 't-info', text: 'Phone   : +91 8260349917' },
                { class: 't-warning', text: 'Goal    : Ethical Hacker & DevSecOps Engineer' },
            ],
            'study_plan.md': [
                { class: 't-info', text: '# 30-Day Focus Plan' },
                { class: 't-output', text: '1. Finish Web Chat Application' },
                { class: 't-output', text: '2. Build Python Port Scanner' },
                { class: 't-output', text: '3. Create Vulnerable Login Website' },
                { class: 't-success', text: '→ Then: Bug Bounty Learning' },
            ],
            'contact.txt': [
                { class: 't-output', text: 'Email : abhilashbpd1234@gmail.com' },
                { class: 't-output', text: 'Phone : +91 8260349917' },
                { class: 't-output', text: 'Web   : abhilashkar.tech' },
            ],
        };

        if (files[file]) {
            this._printLines(files[file]);
        } else if (file === '') {
            this._printLine('t-error', 'Usage: cat <filename>');
        } else {
            this._printLine('t-error', `cat: ${this._escHtml(file)}: No such file or directory`);
        }
    }

    _cmdUname() {
        this._printLine('t-output', 'HackerOS 6.6.1-kali1 #1 SMP PREEMPT x86_64 GNU/Linux');
    }

    _cmdPing(args) {
        const host = args[0] || 'abhilashkar.tech';
        this._printLines([
            { class: 't-output', text: `PING ${this._escHtml(host)} (165.22.xx.xx) 56(84) bytes of data.` },
            { class: 't-success', text: `64 bytes from ${this._escHtml(host)}: icmp_seq=1 ttl=57 time=24.3 ms` },
            { class: 't-success', text: `64 bytes from ${this._escHtml(host)}: icmp_seq=2 ttl=57 time=23.8 ms` },
            { class: 't-success', text: `64 bytes from ${this._escHtml(host)}: icmp_seq=3 ttl=57 time=24.1 ms` },
            { class: 't-output', text: `3 packets transmitted, 3 received, 0% packet loss` },
        ]);
    }

    _cmdNmap(args) {
        const target = args[0] || 'abhilashkar.tech';
        this._printLines([
            { class: 't-info', text: `Starting Nmap 7.94 (https://nmap.org)` },
            { class: 't-output', text: `Scanning ${this._escHtml(target)} [1000 ports]` },
            { class: 't-success', text: `PORT     STATE  SERVICE  VERSION` },
            { class: 't-success', text: `22/tcp   open   ssh      OpenSSH 8.9` },
            { class: 't-success', text: `80/tcp   open   http     nginx 1.18` },
            { class: 't-success', text: `443/tcp  open   https    nginx 1.18` },
            { class: 't-warning', text: `Nmap done: 1 host up (0.04s latency)` },
        ]);
    }

    _printLine(cls, text) {
        const line = document.createElement('div');
        line.className = `t-line ${cls}`;
        line.innerHTML = text;
        this.outputEl.appendChild(line);
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.outputEl.scrollTop = this.outputEl.scrollHeight;
    }

    clear() {
        this.outputEl.innerHTML = '';
        const welcome = document.createElement('div');
        welcome.className = 't-line t-dim';
        welcome.textContent = 'Terminal cleared. Type help for commands.';
        this.outputEl.appendChild(welcome);
    }

    _sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    _escHtml(str) {
        const div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }
}

// ============================================
// NAV HIGHLIGHT & HAMBURGER
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Set active nav link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(a => {
        if (a.getAttribute('href') === currentPage) a.classList.add('active');
    });

    // Hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            hamburger.classList.toggle('active');
        });
    }

    // Intersection observer for animations
    const animEls = document.querySelectorAll('[data-anim]');
    if (animEls.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.delay || 0;
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, delay);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animEls.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
            observer.observe(el);
        });
    }

    // Progress bars
    const progressFills = document.querySelectorAll('.progress-fill');
    if (progressFills.length > 0) {
        const progObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target.dataset.width || '0';
                    entry.target.style.width = target + '%';
                    progObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        progressFills.forEach(el => {
            el.style.width = '0';
            progObserver.observe(el);
        });
    }
});
