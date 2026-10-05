document.addEventListener('DOMContentLoaded', () => {
    // Initialize Vanta.js Background
    if (window.VANTA) {
        VANTA.NET({
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x66fcf1,
            backgroundColor: 0x0b0c10,
            points: 12.00,
            maxDistance: 22.00,
            spacing: 18.00
        });
    }

    // Scroll Animation Observer (Fade In)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Form submission handling (Mock up for transmission)
    const form = document.getElementById('contact-form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = "TRANSMITTING...";
            btn.style.opacity = '0.7';
            
            // Simulate network request
            setTimeout(() => {
                btn.textContent = "TRANSMISSION SENT";
                btn.style.background = "var(--laser-cyan)";
                btn.style.color = "var(--void-black)";
                btn.style.opacity = '1';
                form.reset();
                
                // Revert button state
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = "transparent";
                    btn.style.color = "var(--laser-cyan)";
                }, 3000);
            }, 1500);
        });
    }
});
