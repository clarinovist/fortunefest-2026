/**
 * Fortune Fest - Main JavaScript
 * Handles interactions, navbar states, and scroll reveal animations.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Sticky State Management
    const navbar = document.getElementById('navbar');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    // Attach scroll listener
    window.addEventListener('scroll', handleScroll);
    // Init state
    handleScroll();

    // 2. Scroll Reveal Animations using IntersectionObserver
    const revealElements = document.querySelectorAll('.reveal-up');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // 3. Optional: Dynamic Tilt Effect for Glass Panels
    const tiltElements = document.querySelectorAll('.tilt-effect');

    tiltElements.forEach(el => {
        el.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.
            
            // Calculate rotation values
            const xRot = 10 * ((y - rect.height / 2) / rect.height);
            const yRot = -10 * ((x - rect.width / 2) / rect.width);
            
            this.style.transform = `perspective(1000px) rotateX(${xRot}deg) rotateY(${yRot}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        el.addEventListener('mouseleave', function() {
            this.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });

        el.addEventListener('mouseenter', function() {
            this.style.transition = 'none'; // remove transition for smooth tracking
        });
    });
});
