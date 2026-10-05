/* ════════════════════════════════════════════════════════════════
   Mohammed Farhaan A — Dark Nature Portfolio JS
   ════════════════════════════════════════════════════════════════ */
(function () {
    'use strict';

    /* ── 1. VANTA.JS CINEMATIC MIST / FOG ────────────────────────── */
    function initVanta() {
        if (!window.VANTA || !window.VANTA.FOG) return;
        window._vantaEffect = VANTA.FOG({
            el: '#vanta-bg',
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200,
            minWidth: 200,
            highlightColor: 0x3a4a58,
            midtoneColor: 0x161f28,
            lowlightColor: 0x0b1015,
            baseColor: 0x0b1015,
            blurFactor: 0.60,
            speed: 1.50,
            zoom: 0.80
        });
    }

    /* ── 2. NAVBAR SCROLL ────────────────────────────────────────── */
    function initNavbar() {
        var navbar = document.getElementById('navbar');
        window.addEventListener('scroll', function () {
            requestAnimationFrame(function () {
                navbar.classList.toggle('scrolled', window.scrollY > 40);
            });
        }, { passive: true });
    }

    /* ── 3. MOBILE DRAWER ────────────────────────────────────────── */
    function initMobileMenu() {
        var hamburger = document.getElementById('hamburger');
        var drawer = document.getElementById('mobile-drawer');
        var overlay = document.getElementById('mobile-overlay');
        var closeBtn = document.getElementById('drawer-close');
        var links = document.querySelectorAll('.drawer-link');

        function toggleDrawer() {
            var isOpen = drawer.classList.contains('open');
            hamburger.classList.toggle('open', !isOpen);
            drawer.classList.toggle('open', !isOpen);
            overlay.classList.toggle('open', !isOpen);
            document.body.style.overflow = isOpen ? '' : 'hidden';
        }

        if (hamburger) hamburger.addEventListener('click', toggleDrawer);
        if (closeBtn) closeBtn.addEventListener('click', toggleDrawer);
        if (overlay) overlay.addEventListener('click', toggleDrawer);
        links.forEach(function (link) { link.addEventListener('click', toggleDrawer); });
    }

    /* ── 4. SMOOTH SCROLL ────────────────────────────────────────── */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
            anchor.addEventListener('click', function (e) {
                var href = this.getAttribute('href');
                if (href === '#') return;
                var target = document.querySelector(href);
                if (!target) return;
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    }

    /* ── 5. SCROLL REVEAL ────────────────────────────────────────── */
    function initReveal() {
        var elements = document.querySelectorAll('.reveal');
        if (!elements.length) return;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('vis');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -20px 0px' });

        elements.forEach(function (el, i) {
            el.style.transitionDelay = (i % 3) * 0.1 + 's';
            observer.observe(el);
        });
    }

    /* ── 6. CONTACT FORM & TOAST ─────────────────────────────────── */
    function initContactForm() {
        var form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var btn = form.querySelector('button[type="submit"]');
            var original = btn.innerHTML;
            
            btn.disabled = true;
            btn.innerHTML = 'Sending...';

            setTimeout(function () {
                toast('Message sent successfully!');
                form.reset();
                btn.disabled = false;
                btn.innerHTML = original;
            }, 1200);
        });
    }

    function toast(msg) {
        var container = document.getElementById('toast-box');
        if (!container) return;
        var el = document.createElement('div');
        el.className = 'toast';
        el.textContent = msg;
        container.appendChild(el);

        requestAnimationFrame(function () {
            requestAnimationFrame(function () { el.classList.add('visible'); });
        });
        setTimeout(function () {
            el.classList.remove('visible');
            setTimeout(function () { if (el.parentNode) el.remove(); }, 300);
        }, 3000);
    }
    window.showToast = toast;

    /* ── 7. RESUME PDF DOWNLOAD (html2pdf) ───────────────────────── */
    function initResumeDownload() {
        var btn = document.getElementById('resume-btn');
        if (!btn) return;

        btn.addEventListener('click', function () {
            toast('Preparing PDF download...');
            
            var container = document.createElement('div');
            container.innerHTML = [
                '<div style="font-family: Arial, sans-serif; color:#222; padding:40px; line-height:1.6; max-width:800px; background:#fff;">',
                '<h1 style="font-size:24px; color:#0B1015; text-transform:uppercase; letter-spacing:2px; margin-bottom:4px;">Mohammed Farhaan . A</h1>',
                '<h2 style="font-size:14px; color:#555; font-style:italic; font-weight:normal; margin-bottom:12px;">B.Sc. Computer Science (2026 First Class &amp; 0 Backlogs) | AI-Assisted Full-Stack Developer &amp; Data Analyst</h2>',
                '<div style="font-size:11px; color:#666; margin-bottom:20px;">📍 Chennai, TN | 📞 +91 9150141913 | ✉ mohammedfarhaanamf@gmail.com</div>',
                
                '<h3 style="font-size:13px; color:#0B1015; border-bottom:1px solid #ddd; padding-bottom:4px; text-transform:uppercase; margin-bottom:8px;">Education</h3>',
                '<p style="font-size:12px; margin-bottom:16px;"><strong>B.Sc. Computer Science</strong> - Sree Muthukumaraswamy College (University of Madras), 2026<br>First Class, 0 Backlogs</p>',
                
                '<h3 style="font-size:13px; color:#0B1015; border-bottom:1px solid #ddd; padding-bottom:4px; text-transform:uppercase; margin-bottom:8px;">Technical Skills</h3>',
                '<p style="font-size:12px; margin-bottom:4px;"><strong>AI &amp; Prompting:</strong> Prompt Generation, System Context Engineering, Prompt Tuning, AI-assisted web and mobile app development, AI code refactoring, bug identification, and fundamental level debugging.</p>',
                '<p style="font-size:12px; margin-bottom:4px;"><strong>Programming:</strong> Java, Python, HTML, .NET, JavaScript / React.</p>',
                '<p style="font-size:12px; margin-bottom:4px;"><strong>Data Analytics:</strong> Advanced Microsoft Excel, Power BI.</p>',
                '<p style="font-size:12px; margin-bottom:16px;"><strong>Database &amp; DevOps:</strong> SQL, Supabase, Firebase, Git, Vercel, Netlify.</p>',

                '<h3 style="font-size:13px; color:#0B1015; border-bottom:1px solid #ddd; padding-bottom:4px; text-transform:uppercase; margin-bottom:8px;">Projects</h3>',
                '<p style="font-size:12px; margin-bottom:4px;"><strong>Process Recorder Mobile App</strong> (Flutter, Gradle, Antigravity)</p>',
                '<p style="font-size:12px; margin-bottom:16px;"><strong>Commercial Mobile Shop E-Commerce Website</strong> (React, CSS, Vercel/Netlify)</p>',

                '<h3 style="font-size:13px; color:#0B1015; border-bottom:1px solid #ddd; padding-bottom:4px; text-transform:uppercase; margin-bottom:8px;">Certifications</h3>',
                '<p style="font-size:12px; margin-bottom:16px;">Data Analytics Certification (Govt. Certified via Naan Mudhalvan)</p>',

                '</div>'
            ].join('\n');

            var opt = {
                margin: 0.5,
                filename: 'Mohammed_Farhaan_A_Resume.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };

            if (window.html2pdf) {
                html2pdf().set(opt).from(container).save().then(function() {
                    toast('Download complete!');
                });
            } else {
                toast('Error: PDF library not loaded.');
            }
        });
    }

    /* ── INIT ────────────────────────────────────────────────────── */
    document.addEventListener('DOMContentLoaded', function () {
        initVanta();
        initNavbar();
        initMobileMenu();
        initSmoothScroll();
        initReveal();
        initContactForm();
        initResumeDownload();
    });
})();
