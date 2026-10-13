/* ════════════════════════════════════════════════════════════════
   Mohammed Farhaan A — Dark Nature Portfolio JS
   ════════════════════════════════════════════════════════════════ */
(function () {
    'use strict';

    /* ── 1. NAVBAR SCROLL ────────────────────────────────────────── */
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

    /* ── 8. CERTIFICATE IMAGE MODAL ───────────────────────────────── */
    function initCertModal() {
        var modal = document.getElementById('cert-modal');
        var image = document.getElementById('cert-modal-image');
        var titleEl = document.getElementById('cert-modal-title');
        var closeBtn = document.getElementById('cert-modal-close');
        var cards = document.querySelectorAll('.cred-card[data-img]');
        if (!modal || !image || !closeBtn || !cards.length) return;

        var closeTimer = null;

        function openModal(src, title) {
            if (closeTimer) {
                clearTimeout(closeTimer);
                closeTimer = null;
            }
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
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    activate();
                }
            });
        });

        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', function (e) {
            if (e.target === modal) closeModal();
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
        });
    }

    /* ── INIT ────────────────────────────────────────────────────── */
    document.addEventListener('DOMContentLoaded', function () {
        initNavbar();
        initMobileMenu();
        initSmoothScroll();
        initReveal();
        initContactForm();
        initCertModal();
    });
})();
