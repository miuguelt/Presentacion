/* =========================================
   🌌 MAIN.JS — FUTURISTIC UX ENGINE v4.0
   Particle System • Neon Interactions
   ========================================= */

function showSection(sectionId, cardElement) {
    const sections = document.querySelectorAll('.content-area');
    const navCards = document.querySelectorAll('.nav-card');
    const activeSection = document.getElementById(sectionId);

    if (!activeSection || activeSection.classList.contains('active-content')) return;

    // 1. Desactivar tarjetas
    navCards.forEach(el => el.classList.remove('active'));
    cardElement.classList.add('active');

    // 1.1 Cerrar menú móvil si está abierto
    const navGrid = document.querySelector('.nav-grid');
    const menuToggle = document.getElementById('menuToggle');
    if (navGrid && navGrid.classList.contains('active')) {
        navGrid.classList.remove('active');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    }

    // 2. Transición de salida para la sección actual
    const currentSection = document.querySelector('.content-area.active-content');

    if (currentSection) {
        currentSection.style.opacity = '0';
        currentSection.style.transform = 'translateY(10px)';
        currentSection.style.transition = 'all 0.3s ease';

        setTimeout(() => {
            currentSection.classList.remove('active-content');
            currentSection.style.display = 'none';
            currentSection.style.opacity = '';
            currentSection.style.transform = '';
            currentSection.style.transition = '';

            // 3. Mostrar nueva sección
            revealNewSection(activeSection);
        }, 300);
    } else {
        revealNewSection(activeSection);
    }
}

function revealNewSection(activeSection) {
    activeSection.style.display = 'block';
    activeSection.style.opacity = '0';
    activeSection.style.transform = 'translateY(20px)';

    // Forzar reflow
    void activeSection.offsetWidth;

    activeSection.classList.add('active-content');
    activeSection.style.opacity = '1';
    activeSection.style.transform = 'translateY(0)';
    activeSection.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';

    // ⚡ Staggered Animation for Children
    const children = activeSection.querySelectorAll('h3, p, .feature-card, .timeline-item, .info-island');
    children.forEach((child, index) => {
        child.classList.remove('stagger-in');
        void child.offsetWidth; // reset animation
        child.classList.add('stagger-in');

        // Cyclical delays 1-5
        const delayClass = `stagger-delay-${(index % 5) + 1}`;
        child.classList.remove('stagger-delay-1', 'stagger-delay-2', 'stagger-delay-3', 'stagger-delay-4', 'stagger-delay-5');
        child.classList.add(delayClass);
    });

    setTimeout(() => {
        activeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

// 🚦 Global Reading Progress Bar
window.addEventListener('scroll', () => {
    const progressBar = document.getElementById('global-progress');
    if (progressBar) {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${scrollPercent}%`;
    }
});

function toggleCheck(element) {
    element.classList.toggle('checked');
    var svg = element.querySelector('svg');
    if (svg) {
        svg.style.display = element.classList.contains('checked') ? 'block' : 'none';
    }
    // Neon pulse effect on check
    if (element.classList.contains('checked')) {
        element.style.boxShadow = '0 0 20px rgba(57, 255, 20, 0.3)';
        setTimeout(function () { element.style.boxShadow = ''; }, 600);
    }
}

// ========================================
// MAIN INIT
// ========================================
document.addEventListener('DOMContentLoaded', function () {

    // ========================================
    // � MOBILE MENU TOGGLE
    // ========================================
    const menuToggle = document.getElementById('menuToggle');
    const navGrid = document.querySelector('.nav-grid');

    if (menuToggle && navGrid) {
        menuToggle.addEventListener('click', function () {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navGrid.classList.toggle('active');
        });

        // Soporte para teclado en nav-cards
        const navCards = document.querySelectorAll('.nav-card');
        navCards.forEach(card => {
            card.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', function (event) {
            if (!navGrid.contains(event.target) && !menuToggle.contains(event.target) && navGrid.classList.contains('active')) {
                menuToggle.setAttribute('aria-expanded', 'false');
                navGrid.classList.remove('active');
            }
        });
    }

    // ========================================
    // �� FLOATING PARTICLES
    // ========================================
    var particleCanvas = document.createElement('canvas');
    particleCanvas.id = 'particle-bg';
    Object.assign(particleCanvas.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: '0',
        pointerEvents: 'none',
        opacity: '0.5'
    });
    document.body.prepend(particleCanvas);

    var ctx = particleCanvas.getContext('2d');
    var particles = [];
    var particleCount = 40;

    function resizeCanvas() {
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function Particle() {
        this.x = Math.random() * particleCanvas.width;
        this.y = Math.random() * particleCanvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.updateColor();
    }

    Particle.prototype.updateColor = function () {
        var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        var darkColors = ['204, 119, 34', '0, 191, 255', '255, 255, 255']; // Amber, Deep Sky Blue, White
        var lightColors = ['211, 84, 0', '44, 24, 16', '0, 26, 44']; // Burnt Amber, Charcoal, Navy
        var palette = isDark ? darkColors : lightColors;
        this.color = palette[Math.floor(Math.random() * palette.length)];
    };

    window.updateParticles = function () {
        for (var i = 0; i < particles.length; i++) {
            particles[i].updateColor();
        }
    };

    for (var i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function drawParticles() {
        ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0) p.x = particleCanvas.width;
            if (p.x > particleCanvas.width) p.x = 0;
            if (p.y < 0) p.y = particleCanvas.height;
            if (p.y > particleCanvas.height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(' + p.color + ', ' + p.opacity + ')';
            ctx.fill();

            // Draw connections
            for (var j = i + 1; j < particles.length; j++) {
                var p2 = particles[j];
                var dx = p.x - p2.x;
                var dy = p.y - p2.y;
                var dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = 'rgba(' + p.color + ', ' + (0.05 * (1 - dist / 150)) + ')';
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(drawParticles);
    }
    drawParticles();

    // ========================================
    // 🟢 FLOATING ACTION BUTTON (Neon)
    // ========================================
    var fab = document.createElement('button');
    fab.innerHTML = '↑';
    fab.title = 'Volver al inicio';
    fab.setAttribute('aria-label', 'Scroll to top');

    Object.assign(fab.style, {
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        width: '50px',
        height: '50px',
        borderRadius: '14px',
        background: 'linear-gradient(135deg, rgba(57, 169, 0, 0.4), rgba(57, 255, 20, 0.2))',
        color: '#39ff14',
        border: '1px solid rgba(57, 255, 20, 0.4)',
        fontSize: '1.4rem',
        fontWeight: '700',
        cursor: 'pointer',
        zIndex: '1000',
        display: 'none',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.4s ease, box-shadow 0.4s ease, opacity 0.4s ease',
        opacity: '0',
        boxShadow: '0 0 20px rgba(57, 255, 20, 0.15), 0 8px 24px rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        fontFamily: 'inherit'
    });

    fab.onmouseover = function () {
        fab.style.transform = 'translateY(-8px) scale(1.1)';
        fab.style.boxShadow = '0 0 30px rgba(57, 255, 20, 0.4), 0 12px 32px rgba(0, 0, 0, 0.5)';
        fab.style.background = 'linear-gradient(135deg, rgba(57, 255, 20, 0.5), rgba(57, 255, 20, 0.3))';
        fab.style.color = '#fff';
        fab.style.textShadow = '0 0 10px rgba(57, 255, 20, 0.6)';
    };
    fab.onmouseout = function () {
        fab.style.transform = 'translateY(0) scale(1)';
        fab.style.boxShadow = '0 0 20px rgba(57, 255, 20, 0.15), 0 8px 24px rgba(0, 0, 0, 0.4)';
        fab.style.background = 'linear-gradient(135deg, rgba(57, 169, 0, 0.4), rgba(57, 255, 20, 0.2))';
        fab.style.color = '#39ff14';
        fab.style.textShadow = '';
    };

    fab.onclick = function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    document.body.appendChild(fab);

    var fabVisible = false;
    window.addEventListener('scroll', function () {
        if (window.scrollY > 350 && !fabVisible) {
            fab.style.display = 'flex';
            setTimeout(function () { fab.style.opacity = '1'; }, 10);
            fabVisible = true;
        } else if (window.scrollY <= 350 && fabVisible) {
            fab.style.opacity = '0';
            setTimeout(function () { fab.style.display = 'none'; }, 300);
            fabVisible = false;
        }
    });



    // ========================================
    // 👀 SCROLL REVEAL (IntersectionObserver)
    // ========================================
    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

        var targets = document.querySelectorAll(
            '.feature-card, .process-card, .info-island, .stat-card, .format-card, .timeline-item, .tip-box, .member-card, .checklist-item'
        );

        targets.forEach(function (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(24px)';
            el.style.transition = 'opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            observer.observe(el);
        });
    }

    // ========================================
    // ✨ NAV CARD GLOW TRAIL
    // ========================================
    const navCards = document.querySelectorAll('.nav-card');
    navCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });

    // 🚀 Trigger Stagger on Load for Active Section
    const initialSection = document.querySelector('.active-content');
    if (initialSection) {
        const children = initialSection.querySelectorAll('h3, p, .feature-card, .timeline-item, .info-island');
        children.forEach((child, index) => {
            child.classList.add('stagger-in');
            const delayClass = `stagger-delay-${(index % 5) + 1}`;
            child.classList.add(delayClass);
        });
    }

    // ========================================
    // 🏗️ 3D RENDERING ENGINE & PARALLAX
    // ========================================
    const depthLayers = document.querySelectorAll('.depth-layer');
    let ticking = false;

    function update3DEngine(e) {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const x = (e.clientX / window.innerWidth - 0.5);
                const y = (e.clientY / window.innerHeight - 0.5);

                // Update global light source position
                document.documentElement.style.setProperty('--light-x', `${(x + 0.5) * 100}%`);
                document.documentElement.style.setProperty('--light-y', `${(y + 0.5) * 100}%`);

                depthLayers.forEach(layer => {
                    // Differential velocity factors (0.2 - 0.8)
                    const speed = layer.classList.contains('z-far') ? 0.8 :
                        layer.classList.contains('z-mid') ? 0.5 : 0.2;

                    const rotateX = y * 20 * speed;
                    const rotateY = -x * 20 * speed;
                    const translateX = x * 40 * speed;
                    const translateY = y * 40 * speed;

                    // Apply 3D transformation with preserve-3d
                    layer.style.transform = `
                        translate3d(${translateX}px, ${translateY}px, ${layer.dataset.z || '0px'})
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                    `;

                    // Update dynamic shadows based on tilt
                    const shadowX = -x * 20 * speed;
                    const shadowY = -y * 20 * speed;
                    const shadowBlur = Math.abs(x + y) * 30 * speed + 10;
                    layer.style.boxShadow = `${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0,0,0,0.25)`;
                });

                ticking = false;
            });
            ticking = true;
        }
    }

    document.addEventListener('mousemove', update3DEngine);

    // Initial setup for layers
    depthLayers.forEach(layer => {
        if (layer.classList.contains('z-near')) layer.dataset.z = 'var(--depth-z-near)';
        else if (layer.classList.contains('z-mid')) layer.dataset.z = 'var(--depth-z-mid)';
        else if (layer.classList.contains('z-far')) layer.dataset.z = 'var(--depth-z-far)';
        else layer.dataset.z = '0px';
    });
});

// ========================================
// PDF MODAL
// ========================================
const NON_PREVIEWABLE_EXTENSIONS = ['docx', 'xlsx', 'xls']; // Centralized list of non-previewable file extensions

function openPdfModal(fileUrl, title) {
    var modal = document.getElementById('pdfModal');
    var frame = document.getElementById('pdfFrame');
    var modalTitle = document.getElementById('modalTitle');
    var downloadBtn = document.getElementById('downloadBtn');

    if (!modal || !frame) return;

    const fileExtension = fileUrl.split('.').pop().toLowerCase();
    if (NON_PREVIEWABLE_EXTENSIONS.includes(fileExtension)) {
        alert('Este archivo no se puede previsualizar y se descargará automáticamente.');
        window.open(fileUrl, '_blank');
        return;
    }

    if (modalTitle) modalTitle.textContent = title || 'Vista Previa';
    frame.src = fileUrl;
    frame.setAttribute('title', 'Vista previa de ' + (title || 'documento'));
    if (downloadBtn) downloadBtn.href = fileUrl;
    modal.classList.add('active');
}

// Close Modal
document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById('pdfModal');
    var closeBtn = document.querySelector('.close-modal');

    if (modal && closeBtn) {
        closeBtn.onclick = function () {
            modal.classList.remove('active');
            var f = document.getElementById('pdfFrame');
            if (f) f.src = '';
        };

        window.onclick = function (event) {
            if (event.target === modal) {
                modal.classList.remove('active');
                var f = document.getElementById('pdfFrame');
                if (f) f.src = '';
            }
        };

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                modal.style.display = 'none';
                var f = document.getElementById('pdfFrame');
                if (f) f.src = '';
            }
        });
    }
});

// Normative Cards Toggle
function toggleCard(card) {
    document.querySelectorAll('.normative-card').forEach(function (c) {
        if (c !== card) c.classList.remove('active');
    });
    card.classList.toggle('active');
}

// Mobile Timeline Accordion
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.timeline-item').forEach(function (item) {
        item.addEventListener('click', function () {
            if (window.innerWidth <= 768) {
                this.classList.toggle('expanded');
            }
        });
    });
});

/* =========================================
   ⚡ VISUAL ENHANCEMENTS v5.0 LOGIC
   ========================================= */

// ⏳ Timeline Scroll Progress
window.addEventListener('scroll', function () {
    var timelineContainer = document.querySelector('.timeline-container');
    var progressLine = document.querySelector('.timeline-line-progress');
    if (!timelineContainer || !progressLine) return;

    var rect = timelineContainer.getBoundingClientRect();
    var viewportHeight = window.innerHeight;
    var offset = viewportHeight / 2;

    // Actualizar progreso de la línea
    var totalHeight = rect.height;
    var scrolled = Math.max(0, Math.min(1, (offset - rect.top) / totalHeight));
    progressLine.style.height = (scrolled * 100) + '%';

    document.querySelectorAll('.timeline-item').forEach(function (item) {
        var itemRect = item.getBoundingClientRect();
        if (itemRect.top < offset + 100) {
            item.classList.add('visible');
            if (itemRect.top < offset) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        } else {
            item.classList.remove('active');
        }
    });
});

// Tilt Effect (3D) & Mouse Tracker for Timeline
document.querySelectorAll('.timeline-content').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Update mouse position for CSS radial gradient
        card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
        card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);

        if (window.innerWidth <= 768) return;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (centerY - y) / 15;
        const rotateY = (x - centerX) / 15;

        card.style.transform = `perspective(1000px) translateY(-12px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) translateY(0) rotateX(0) rotateY(0) scale(1)';
    });

    // Feedback táctil para móviles
    card.addEventListener('touchstart', function () {
        if (window.innerWidth <= 768) {
            this.style.transform = 'scale(0.98)';
        }
    }, { passive: true });

    card.addEventListener('touchend', function () {
        if (window.innerWidth <= 768) {
            this.style.transform = 'scale(1)';
        }
    }, { passive: true });
});

// ⌨️ Typewriter Trigger
document.addEventListener('DOMContentLoaded', function () {
    // Select the h1 specifically for the main title effect
    var heroTitle = document.querySelector('header h1');
    if (heroTitle) {
        // Compute precise width to avoid layout jumps
        // Temporarily clear animation/width constraints to measure
        heroTitle.style.width = 'auto';
        heroTitle.style.display = 'inline-block';
        var naturalWidth = heroTitle.offsetWidth;

        // Add a small buffer for caret + breathing room (2ch approx)
        var targetWidth = naturalWidth + 20;
        heroTitle.style.setProperty('--target-width', targetWidth + 'px');

        // Reset for animation
        heroTitle.style.width = '0';
        heroTitle.classList.add('typewriter-text');

        // Listen for the end of the typing animation to remove cursor
        heroTitle.addEventListener('animationend', (e) => {
            if (e.animationName === 'typing') {
                heroTitle.classList.add('caret-hidden');
                // Ensure border is gone
                heroTitle.style.borderRight = 'none';
            }
        });
    }
});

/* =========================================
   🌗 THEME TOGGLE — LIGHT/DARK MODE
   ========================================= */
document.addEventListener('DOMContentLoaded', function () {
    var toggleBtn = document.getElementById('themeToggle');
    var html = document.documentElement;
    var savedTheme = localStorage.getItem('theme');

    // Apply saved theme or default to light
    if (savedTheme === 'dark') {
        html.setAttribute('data-theme', 'dark');
    } else {
        html.removeAttribute('data-theme');
    }

    // Actualizar colores si cambia el tema
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            if (html.getAttribute('data-theme') === 'dark') {
                html.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            } else {
                html.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }

            setTimeout(() => {
                const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
                // Assuming 'particles' is a global array or accessible here
                // This part needs 'particles' to be defined in the scope if it's not global
                if (typeof particles !== 'undefined' && particles.forEach) {
                    particles.forEach(p => {
                        p.color = isDark ?
                            `hsla(${Math.random() * 60 + 180}, 70%, 50%, ${Math.random() * 0.3})` :
                            `hsla(${Math.random() * 60 + 200}, 70%, 40%, ${Math.random() * 0.2})`;
                    });
                }
            }, 50);
        });
    }
});


/* =========================================
   FIREWORKS ENGINE & CHECKLIST GAMIFICATION
   ========================================= */

class FireworksEngine {
    constructor() {
        this.canvas = document.getElementById('fireworksCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.isActive = false;
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createExplosion(x, y, color) {
        const particleCount = 100;
        for (let i = 0; i < particleCount; i++) {
            this.particles.push(new FireworkParticle(x, y, color));
        }
        if (!this.isActive) {
            this.isActive = true;
            this.animate();
        }
    }

    animate() {
        if (!this.isActive) return;

        this.ctx.globalCompositeOperation = 'destination-out';
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.globalCompositeOperation = 'lighter';

        this.particles.forEach((p, index) => {
            p.update();
            p.draw(this.ctx);
            if (p.alpha <= 0) this.particles.splice(index, 1);
        });

        if (this.particles.length > 0) {
            requestAnimationFrame(() => this.animate());
        } else {
            this.isActive = false;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    launchCelebration() {
        let count = 0;
        const interval = setInterval(() => {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * (this.canvas.height * 0.6);
            const colors = ['#00e5ff', '#39a900', '#ff00ff', '#ffeb3b'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            this.createExplosion(x, y, color);
            count++;
            if (count > 15) clearInterval(interval);
        }, 300);
    }
}

class FireworkParticle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 6 + 2;
        this.vx = Math.cos(angle) * velocity;
        this.vy = Math.sin(angle) * velocity;
        this.gravity = 0.05;
        this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.005;
    }

    update() {
        this.vx *= 0.96;
        this.vy *= 0.96;
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

class ChecklistGame {
    constructor() {
        this.progressFill = document.getElementById('progressBar');
        this.progressText = document.getElementById('progressText');
        this.progressMessage = document.getElementById('progressMessage');
        this.container = document.querySelector('.checklist-progress-container');
        this.fireworks = new FireworksEngine();
        this.totalItems = document.querySelectorAll('.checklist-item').length;
        this.messages = {
            0: "¡Tu camino a la excelencia comienza ahora!",
            25: "¡Excelente inicio! Ya tienes la base.",
            50: "¡Vas por la mitad! Mantén el ritmo.",
            75: "¡Ya casi! La meta está cerca.",
            100: "¡FELICITACIONES! Estás listo para triunfar. 🚀"
        };
        this.init();
    }

    init() {
        this.loadState();
        this.updateProgress(false); // No animation on load
    }

    toggleItem(element) {
        element.classList.toggle('checked');
        const checkbox = element.querySelector('.checkbox-custom svg');
        if (checkbox) checkbox.classList.toggle('d-none');

        // Save state
        const items = document.querySelectorAll('.checklist-item');
        const state = Array.from(items).map(item => item.classList.contains('checked'));
        localStorage.setItem('checklistState', JSON.stringify(state));

        this.updateProgress(true);
    }

    loadState() {
        const saved = JSON.parse(localStorage.getItem('checklistState'));
        if (saved) {
            const items = document.querySelectorAll('.checklist-item');
            items.forEach((item, index) => {
                if (saved[index]) {
                    item.classList.add('checked');
                    const checkbox = item.querySelector('.checkbox-custom svg');
                    if (checkbox) checkbox.classList.remove('d-none');
                }
            });
        }
    }

    updateProgress(animate) {
        const checkedCount = document.querySelectorAll('.checklist-item.checked').length;
        const percentage = Math.round((checkedCount / this.totalItems) * 100);

        // Update UI
        this.progressFill.style.width = `${percentage}%`;
        this.progressText.textContent = `${percentage}%`;

        // Update Message
        if (percentage >= 100) this.progressMessage.textContent = this.messages[100];
        else if (percentage >= 75) this.progressMessage.textContent = this.messages[75];
        else if (percentage >= 50) this.progressMessage.textContent = this.messages[50];
        else if (percentage >= 25) this.progressMessage.textContent = this.messages[25];
        else this.progressMessage.textContent = this.messages[0];

        // Trigger Effects
        if (animate) {
            if (percentage === 100) {
                this.fireworks.launchCelebration();
                this.container.classList.add('milestone-reached');
            } else if ([25, 50, 75].includes(percentage)) {
                this.fireworks.createExplosion(window.innerWidth / 2, window.innerHeight / 2, '#39a900');
                this.container.classList.add('milestone-reached');
                setTimeout(() => this.container.classList.remove('milestone-reached'), 500);
            }
        }
    }
}

// Global instance
let checklistGame;

// Override the global toggleCheck function to use the class
window.toggleCheck = function (element) {
    if (!checklistGame) checklistGame = new ChecklistGame();
    checklistGame.toggleItem(element);
};

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    checklistGame = new ChecklistGame();
});
