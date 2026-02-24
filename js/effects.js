// js/effects.js
document.addEventListener('DOMContentLoaded', () => {
    // 1. Custom Cursor
    if (window.matchMedia("(pointer: fine)").matches) {
        const cursorDot = document.createElement('div');
        cursorDot.className = 'cursor-dot';
        const cursorOutline = document.createElement('div');
        cursorOutline.className = 'cursor-outline';
        document.body.appendChild(cursorDot);
        document.body.appendChild(cursorOutline);

        window.addEventListener('mousemove', (e) => {
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;

            cursorOutline.animate({
                left: `${e.clientX}px`,
                top: `${e.clientY}px`
            }, { duration: 500, fill: 'forwards' });
        });

        // Add hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .card, .btn, .filter-btn, .timeline-card, .cert-card, .field-chip, .feature-card, .contact-info-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.width = '50px';
                cursorOutline.style.height = '50px';
                cursorOutline.style.backgroundColor = 'rgba(0, 255, 65, 0.1)';
                cursorOutline.style.borderColor = 'var(--cyan)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.width = '30px';
                cursorOutline.style.height = '30px';
                cursorOutline.style.backgroundColor = 'transparent';
                cursorOutline.style.borderColor = 'var(--green)';
            });
        });
    }

    // 2. Text Decryption Effect (Hacker Scramble)
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";
    const decryptElements = document.querySelectorAll('.nav-links a, .btn');

    decryptElements.forEach(el => {
        // Skip if there are complex children (icons etc)
        if (el.children.length > 1) return;

        el.addEventListener('mouseenter', event => {
            let iterations = 0;
            const target = event.currentTarget;

            // Only scramble the text node part
            const textNode = target.childNodes.length > 0 ? target.childNodes[0] : target;
            if (target.dataset.value === undefined) {
                target.dataset.value = target.innerText.trim();
            }

            const originalText = target.dataset.value;
            clearInterval(target.interval);

            target.interval = setInterval(() => {
                target.innerText = originalText.split("")
                    .map((letter, index) => {
                        if (index < iterations) return originalText[index];
                        return letters[Math.floor(Math.random() * letters.length)];
                    })
                    .join("");

                if (iterations >= originalText.length) {
                    clearInterval(target.interval);
                    target.innerText = originalText;
                }

                iterations += 1 / 3;
            }, 30);
        });
    });

    // 3. Boot Screen Logic
    const bootScreen = document.getElementById('boot-screen');
    if (bootScreen) {
        if (sessionStorage.getItem('booted')) {
            bootScreen.style.display = 'none';
        } else {
            const lines = bootScreen.querySelectorAll('.boot-line');
            let delay = 300;
            lines.forEach((line) => {
                setTimeout(() => {
                    line.classList.add('visible');
                }, delay);
                delay += Math.random() * 400 + 200; // 200-600ms per line
            });

            setTimeout(() => {
                bootScreen.style.opacity = '0';
                setTimeout(() => {
                    bootScreen.style.display = 'none';
                    sessionStorage.setItem('booted', 'true');
                }, 800);
            }, delay + 600);
        }
    }
});
