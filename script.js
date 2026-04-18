/* ============================================
   FORTUNE FEST — Landing Page Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. NAVBAR & BACK TO TOP SCROLL EFFECT
  // ==========================================
  const navbar = document.querySelector('.navbar');
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      if (navbar) navbar.classList.add('scrolled');
      if (backToTopBtn) backToTopBtn.classList.add('visible');
    } else {
      if (navbar) navbar.classList.remove('scrolled');
      if (backToTopBtn) backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================
  // 2. COUNTDOWN TIMER (Aug 16, 2026)
  // ==========================================
  const eventDate = new Date("Aug 16, 2026 06:00:00").getTime();
  
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-minutes');
  const secsEl = document.getElementById('cd-seconds');
  
  if (daysEl && hoursEl && minsEl) {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = eventDate - now;
      
      if (distance < 0) {
        clearInterval(countdownInterval);
        return;
      }
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      daysEl.textContent = days.toString().padStart(2, '0');
      hoursEl.textContent = hours.toString().padStart(2, '0');
      minsEl.textContent = minutes.toString().padStart(2, '0');
      if (secsEl) secsEl.textContent = seconds.toString().padStart(2, '0');
    };
    
    // Initial call
    updateCountdown();
    // Update every second
    const countdownInterval = setInterval(updateCountdown, 1000);
  }
  
  // ==========================================
  // 3. AMBIENT PARTICLES HERO
  // ==========================================
  const heroSection = document.getElementById('hero');
  if (heroSection) {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'ambient-particles';
    heroSection.prepend(particlesContainer);

    for (let i = 0; i < 20; i++) {
      const p = document.createElement('div');
      p.className = 'ambient-particle';
      const size = Math.random() * 6 + 2; // 2px to 8px
      const left = Math.random() * 100; // 0 to 100%
      const duration = Math.random() * 10 + 10; // 10s to 20s
      const delay = Math.random() * 5; // 0s to 5s
      
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.left = `${left}%`;
      p.style.animationDuration = `${duration}s`;
      p.style.animationDelay = `${delay}s`;
      
      particlesContainer.appendChild(p);
    }
  }


  // ==========================================
  // 4. SMOOTH SCROLL — For anchor links
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        const targetPos = targetEl.getBoundingClientRect().top + window.scrollY - 10;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });


  // ==========================================
  // 4. SCROLL REVEAL — Intersection Observer
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Don't unobserve — keep the animation trigger
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });


  // ==========================================
  // 5. HERO PARALLAX — Subtle background move
  // ==========================================
  const heroImg = document.getElementById('hero-parallax');

  function handleParallax() {
    if (!heroImg) return;
    const heroSection = document.getElementById('hero');
    const scrolled = window.scrollY;
    const heroHeight = heroSection ? heroSection.offsetHeight : 0;

    if (scrolled <= heroHeight) {
      const parallaxVal = scrolled * 0.35;
      heroImg.style.transform = `translateY(${parallaxVal}px) scale(1.05)`;
    }
  }

  window.addEventListener('scroll', handleParallax, { passive: true });


  // ==========================================
  // 6. COUNTER ANIMATION — Fun Run stats
  // ==========================================
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  let countersStarted = false;

  function animateCounters() {
    statNumbers.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000; // 2 seconds
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);

        counter.textContent = current.toLocaleString('id-ID');

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toLocaleString('id-ID');
        }
      }

      requestAnimationFrame(updateCounter);
    });
  }

  // Trigger counters when Fun Run section is visible
  const funrunSection = document.getElementById('funrun');
  if (funrunSection) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersStarted) {
          countersStarted = true;
          animateCounters();
        }
      });
    }, { threshold: 0.3 });

    counterObserver.observe(funrunSection);
  }



  // ==========================================
  // 8. FORM — Redirect to Google Form
  // ==========================================
  // (Form logic has been replaced with direct links in HTML)


  // ==========================================
  // 9. ARTSCAPE CARDS — Tilt micro-interaction
  // ==========================================
  const artscapeCards = document.querySelectorAll('.artscape-card');

  artscapeCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 25;
      const rotateY = (centerX - x) / 25;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

});
