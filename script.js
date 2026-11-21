/* ════════════════════════════════════════════════════════════════
   Mohammed Farhaan A — Portfolio JS
   ════════════════════════════════════════════════════════════════ */
(function () {
    'use strict';

    /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       CONTACT CONFIG  (email & WhatsApp — read from existing site)
       ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    var CONTACT_EMAIL = 'mohammedfarhaanamf@gmail.com';
    var WHATSAPP_NUMBER = '919150141913'; // international, no + or spaces

    /* Email templates */
    var EMAIL_TEMPLATES = {
        hr: {
            subject: 'Career Opportunity \u2013 Mohammed Farhaan',
            body: [
                'Hi Mohammed Farhaan,',
                '',
                'We came across your portfolio and are interested in discussing a potential employment opportunity with you.',
                '',
                'We would like to connect with you regarding a suitable position in our organisation.',
                '',
                'Company Name:',
                'Position:',
                'Job Location:',
                'Additional Details:',
                '',
                'We look forward to hearing from you.',
                '',
                'Regards,',
                'HR / Recruitment Team'
            ].join('\n')
        },
        freelance: {
            subject: 'Freelance Project Inquiry \u2013 Mohammed Farhaan',
            body: [
                'Hi Mohammed Farhaan,',
                '',
                'I came across your portfolio and would like to discuss a project with you.',
                '',
                'I am looking for assistance with a project and would love to understand your availability and approach.',
                '',
                'Project Name:',
                'Project Type:',
                'Expected Timeline:',
                'Budget Range:',
                'Project Description:',
                '',
                'Please let me know when we can discuss this further.',
                '',
                'Regards,',
                'Potential Client'
            ].join('\n')
        }
    };

    /* WhatsApp templates */
    var WHATSAPP_TEMPLATES = {
        hr: [
            'Hi Mohammed Farhaan!',
            '',
            'I am contacting you from [Company Name].',
            '',
            'We are interested in discussing a potential employment opportunity with you.',
            '',
            'Position:',
            'Company:',
            'Location:',
            '',
            'Can we discuss this further?'
        ].join('\n'),
        freelance: [
            'Hi Mohammed Farhaan!',
            '',
            'I visited your portfolio and am interested in discussing a freelance project with you.',
            '',
            'Project Type:',
            'Project Details:',
            'Expected Timeline:',
            '',
            'Can we discuss this project further?'
        ].join('\n')
    };

    /* ── PUBLIC: openContactIntent ─────────────────────────────────
       Called from onclick attributes in HTML.
       intent: 'hr' | 'freelance'
       channel: 'email' | 'whatsapp'
    ──────────────────────────────────────────────────────────────── */
    window.openContactIntent = function (intent, channel) {
        var template = EMAIL_TEMPLATES[intent];
        var waMsg    = WHATSAPP_TEMPLATES[intent];

        if (channel === 'email') {
            var mailtoUrl =
                'mailto:' + CONTACT_EMAIL +
                '?subject=' + encodeURIComponent(template.subject) +
                '&body='    + encodeURIComponent(template.body);
            window.location.href = mailtoUrl;

        } else if (channel === 'whatsapp') {
            var waUrl = 'https://wa.me/' + WHATSAPP_NUMBER +
                        '?text=' + encodeURIComponent(waMsg);
            window.open(waUrl, '_blank', 'noopener,noreferrer');
        }
    };

    /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       1. NAVBAR SCROLL
       ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    function initNavbar() {
        var navbar = document.getElementById('navbar');
        if (!navbar) return;
        window.addEventListener('scroll', function () {
            requestAnimationFrame(function () {
                navbar.classList.toggle('scrolled', window.scrollY > 40);
            });
        }, { passive: true });
    }

    /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       2. MOBILE DRAWER
       ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    function initMobileMenu() {
        var hamburger = document.getElementById('hamburger');
        var drawer    = document.getElementById('mobile-drawer');
        var overlay   = document.getElementById('mobile-overlay');
        var closeBtn  = document.getElementById('drawer-close');
        var links     = document.querySelectorAll('.drawer-link');

        function toggleDrawer() {
            var isOpen = drawer.classList.contains('open');
            hamburger.classList.toggle('open', !isOpen);
            drawer.classList.toggle('open', !isOpen);
            overlay.classList.toggle('open', !isOpen);
            document.body.style.overflow = isOpen ? '' : 'hidden';
        }

        if (hamburger) hamburger.addEventListener('click', toggleDrawer);
        if (closeBtn)  closeBtn.addEventListener('click', toggleDrawer);
        if (overlay)   overlay.addEventListener('click', toggleDrawer);
        links.forEach(function (link) { link.addEventListener('click', toggleDrawer); });
    }

    /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       3. SMOOTH SCROLL
       ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
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

    /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       4. SCROLL REVEAL
       ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
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

    /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       5. HERO SCROLL-OUT ANIMATION
       When the user scrolls down, hero left & right panels move
       toward the center, scale down, and fade out elegantly.
       ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    function initHeroScrollOut() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        var heroEl    = document.getElementById('hero');
        var heroLeft  = document.getElementById('hero-left');
        var heroRight = document.getElementById('hero-right');
        if (!heroEl || !heroLeft || !heroRight) return;

        /* Apply smooth transition once — JS will drive the values */
        var TRANSITION = 'transform 0.08s linear, opacity 0.08s linear';
        heroLeft.style.transition  = TRANSITION;
        heroRight.style.transition = TRANSITION;

        var ticking = false;

        function update() {
            ticking = false;
            var scrollY   = window.scrollY;
            var heroH     = heroEl.offsetHeight;
            /* Travel zone: 0 → 55% of heroH for full fade-out */
            var travel    = heroH * 0.55;
            var progress  = Math.min(1, Math.max(0, scrollY / travel));

            /* ease progress for smoother feel */
            var eased = progress * progress * (3 - 2 * progress); // smoothstep

            var translateX = eased * 80;   /* px — move toward center */
            var scale      = 1 - eased * 0.06;
            var opacity    = 1 - eased;

            /* Left panel slides right, right panel slides left */
            heroLeft.style.transform  = 'translateX(' + translateX + 'px) scale(' + scale + ')';
            heroLeft.style.opacity    = String(opacity);

            heroRight.style.transform = 'translateX(-' + translateX + 'px) scale(' + scale + ')';
            heroRight.style.opacity   = String(opacity);
        }

        window.addEventListener('scroll', function () {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(update);
            }
        }, { passive: true });

        update(); /* run once at load */
    }

    /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       6. TOAST
       ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
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

    /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       7. CERTIFICATE MODAL
       ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    function initCertModal() {
        var modal    = document.getElementById('cert-modal');
        var image    = document.getElementById('cert-modal-image');
        var titleEl  = document.getElementById('cert-modal-title');
        var closeBtn = document.getElementById('cert-modal-close');
        var cards    = document.querySelectorAll('.cred-card[data-img]');
        if (!modal || !image || !closeBtn || !cards.length) return;

        var closeTimer = null;

        function openModal(src, title) {
            if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
            titleEl.textContent = title || 'Certificate';
            image.alt = title || 'Certificate';
            image.src = encodeURI(src);
            modal.classList.remove('closing');
            modal.classList.remove('open');
            void modal.offsetWidth;
            modal.classList.add('open');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            closeBtn.focus();
        }

        function closeModal() {
            if (!modal.classList.contains('open') || modal.classList.contains('closing')) return;
            modal.classList.remove('open');
            modal.classList.add('closing');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            closeTimer = setTimeout(function () {
                modal.classList.remove('closing');
                if (!modal.classList.contains('open')) image.removeAttribute('src');
                closeTimer = null;
            }, 400);
        }

        cards.forEach(function (card) {
            function activate() {
                openModal(card.getAttribute('data-img'), card.getAttribute('data-cert-title'));
            }
            card.addEventListener('click', activate);
            card.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
            });
        });

        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
        });
    }

    /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       8. ACTIVE NAV LINK HIGHLIGHT
       ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    function initActiveNav() {
        var sections = document.querySelectorAll('section[id]');
        var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
        if (!sections.length || !navLinks.length) return;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    navLinks.forEach(function (l) { l.classList.remove('active'); });
                    var active = document.querySelector('.nav-links a[href="#' + entry.target.id + '"]');
                    if (active) active.classList.add('active');
                }
            });
        }, { rootMargin: '-40% 0px -55% 0px' });

        sections.forEach(function (s) { observer.observe(s); });
    }

    /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       INIT
       ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    document.addEventListener('DOMContentLoaded', function () {
        initNavbar();
        initMobileMenu();
        initSmoothScroll();
        initReveal();
        initHeroScrollOut();
        initCertModal();
        initActiveNav();
    });

})();
