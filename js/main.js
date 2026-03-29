// ==========================================
// Fortune Fest 2026 - Main JavaScript
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // 1. Scroll Reveal Animations
    // ==========================================
    function reveal() {
        var reveals = document.querySelectorAll('.reveal-up');
        
        for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            var elementVisible = 100;
            
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            }
        }
    }
    window.addEventListener('scroll', reveal);
    reveal();

    // ==========================================
    // 2. Countdown Timer Logic
    // ==========================================
    const countdownDate = new Date("August 16, 2026 06:00:00").getTime();

    const timerTick = setInterval(function() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        if (distance < 0) {
            clearInterval(timerTick);
            document.getElementById("days").innerText = "00";
            document.getElementById("hours").innerText = "00";
            document.getElementById("minutes").innerText = "00";
            document.getElementById("seconds").innerText = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const daysEl = document.getElementById("days");
        if(daysEl) {
            daysEl.innerText = days < 10 ? "0" + days : days;
            document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
            document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
            document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
        }
    }, 1000);

    // ==========================================
    // 3. FAQ Accordion Toggles
    // ==========================================
    window.initFAQs = function() {
        const details = document.querySelectorAll("details.faq-item");
        details.forEach((targetDetail) => {
            // Remove old listener if re-initializing
            const newDetail = targetDetail.cloneNode(true);
            targetDetail.parentNode.replaceChild(newDetail, targetDetail);
            
            newDetail.addEventListener("click", () => {
                document.querySelectorAll("details.faq-item").forEach((detail) => {
                    if (detail !== newDetail) {
                        detail.removeAttribute("open");
                    }
                });
            });
        });
    };
    window.initFAQs();

    // ==========================================
    // 4. Navbar Scroll Effect
    // ==========================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // ==========================================
    // 5. Mobile Menu Toggle
    // ==========================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // ==========================================
    // 6. Back to Top Button
    // ==========================================
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================
    // 7. Stats Counter Animation
    // ==========================================
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            };
            
            // Start animation when element is visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(counter);
        });
    }
    animateCounters();

    // ==========================================
    // 8. Testimonials Slider
    // ==========================================
    window.initTestimonialSlider = function() {
        const testimonialTrack = document.getElementById('testimonialTrack');
        const testimonialPrev = document.getElementById('testimonialPrev');
        const testimonialNext = document.getElementById('testimonialNext');
        
        // Ensure we clean up old interval if re-initialized
        if(window.testimonialInterval) clearInterval(window.testimonialInterval);

        if (testimonialTrack) {
            let currentSlide = 0;
            const slides = testimonialTrack.querySelectorAll('.testimonial-card');
            const slideCount = slides.length;
            
            if (slideCount === 0) return;

            function updateSlider() {
                testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
            }

            if (testimonialPrev) {
                // clone to remove old listeners
                const newPrev = testimonialPrev.cloneNode(true);
                if(testimonialPrev.parentNode) testimonialPrev.parentNode.replaceChild(newPrev, testimonialPrev);
                
                newPrev.addEventListener('click', () => {
                    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
                    updateSlider();
                });
            }

            if (testimonialNext) {
                const newNext = testimonialNext.cloneNode(true);
                if(testimonialNext.parentNode) testimonialNext.parentNode.replaceChild(newNext, testimonialNext);

                newNext.addEventListener('click', () => {
                    currentSlide = (currentSlide + 1) % slideCount;
                    updateSlider();
                });
            }

            // Auto-slide every 5 seconds
            window.testimonialInterval = setInterval(() => {
                currentSlide = (currentSlide + 1) % slideCount;
                updateSlider();
            }, 5000);
        }
    };
    window.initTestimonialSlider();

    // ==========================================
    // 9. Gallery Lightbox
    // ==========================================
    window.initGalleryLightbox = function() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightboxImage');
        const lightboxClose = document.getElementById('lightboxClose');

        // Remove old listeners to prevent duplicates if called multiple times
        galleryItems.forEach(item => {
            const new_element = item.cloneNode(true);
            if (item.parentNode) item.parentNode.replaceChild(new_element, item);
        });

        const newGalleryItems = document.querySelectorAll('.gallery-item');
        newGalleryItems.forEach(item => {
            item.addEventListener('click', () => {
                let imgSrc = item.getAttribute('data-src');
                if (!imgSrc) {
                    const placeholder = item.querySelector('.gallery-placeholder');
                    if (placeholder) {
                        imgSrc = placeholder.style.backgroundImage;
                    }
                }
                
                if (imgSrc) {
                    lightboxImage.src = imgSrc;
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        if (lightboxClose) {
            lightboxClose.replaceWith(lightboxClose.cloneNode(true));
            document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
        }
    };
    
    // Call on load
    window.initGalleryLightbox();

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Close lightbox with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // ==========================================
    // 10. Parallax Effect
    // ==========================================
    const parallaxBg = document.querySelector('.parallax-bg');
    
    if (parallaxBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            parallaxBg.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
    }

    // ==========================================
    // 11. Smooth Scroll for Anchor Links
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ==========================================
    // 12. Newsletter Form
    // ==========================================
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Here you would typically send to your backend
            alert('Terima kasih! Email Anda telah didaftarkan untuk newsletter Fortune Fest.');
            this.reset();
        });
    }

    // ==========================================
    // 13. Particles Effect
    // ==========================================
    createParticles();

    function createParticles() {
        const container = document.getElementById('particles-js');
        if (!container) return;
        
        const colors = ['#4A7C3F', '#D4A017', '#8B7355'];
        const particleCount = 20;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 10 + 5;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const left = Math.random() * 100;
            const animationDuration = Math.random() * 20 + 15;
            const delay = Math.random() * 10;
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: 50%;
                opacity: 0.15;
                left: ${left}%;
                top: -20px;
                animation: particleFall ${animationDuration}s linear ${delay}s infinite;
                pointer-events: none;
            `;
            
            container.appendChild(particle);
        }

        // Add particle animation keyframes if not exists
        if (!document.getElementById('particleStyles')) {
            const style = document.createElement('style');
            style.id = 'particleStyles';
            style.textContent = `
                @keyframes particleFall {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 0;
                    }
                    10% {
                        opacity: 0.15;
                    }
                    90% {
                        opacity: 0.15;
                    }
                    100% {
                        transform: translateY(100vh) rotate(720deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // ==========================================
    // 14. Tilt Effect for Cards
    // ==========================================
    const tiltCards = document.querySelectorAll('.tilt-effect');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });

    // ==========================================
    // 15. Intersection Observer for Animations
    // ==========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.activity-card, .rp-item, .pricing-card, .timeline-item').forEach(el => {
        observer.observe(el);
    });

    // ==========================================
    // 16. Service Worker Registration (PWA)
    // ==========================================
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('sw.js')
                .then(registration => {
                    console.log('SW registered:', registration.scope);
                })
                .catch(error => {
                    console.log('SW registration failed:', error);
                });
        });
    }

});

// ==========================================
// Utility Functions
// ==========================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Lazy loading images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
