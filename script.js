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
  // 1b. HAMBURGER MENU TOGGLE (mobile)
  // ==========================================
  const hamburger = document.getElementById('navHamburger');
  const navMenu = document.getElementById('navMenu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a nav link is clicked
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navbar?.contains(e.target)) {
        navMenu.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
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

  // ==========================================
  // 10. TENANT MODAL
  // ==========================================
  const tenantData = {
    vegetarian: {
      title: "Tenant Vegetarian",
      desc: "Makanan dan minuman berbasis nabati",
      tenants: [
        { name: "AR Farm", img: "assets/img/tenants/Vegetarian/ar-farm.jpg" },
        { name: "Assi Korean Food", img: "assets/img/tenants/Vegetarian/assi-korean-food.jpg" },
        { name: "Azra Fit Center", img: "assets/img/tenants/Vegetarian/azra-fit-center.jpg" },
        { name: "Dona Clara", img: "assets/img/tenants/Vegetarian/dona-clara.jpg" },
        { name: "Bages", img: "assets/img/tenants/Vegetarian/Bages.jpg" },
        { name: "Choice", img: "assets/img/tenants/Vegetarian/Choice.jpg" },
        { name: "Damaroti", img: "assets/img/tenants/Vegetarian/Damaroti.jpg" },
        { name: "Lunetta", img: "assets/img/tenants/Vegetarian/Lunetta.jpg" },
        { name: "Meichel", img: "assets/img/tenants/Vegetarian/Meichel.jpg" },
        { name: "Recaff", img: "assets/img/tenants/Vegetarian/Recaff.jpg" },
        { name: "Francoville", img: "assets/img/tenants/Vegetarian/francovvile-logo-hijau.png" },
        { name: "Ina Cookies", img: "assets/img/tenants/Vegetarian/ina-cookies.jpg" },
        { name: "Kampoeng Simo", img: "assets/img/tenants/Vegetarian/kampoeng-simo.jpg" },
        { name: "LK", img: "assets/img/tenants/Vegetarian/lk-.jpg" },
        { name: "LN", img: "assets/img/tenants/Vegetarian/ln-.jpg" },
        { name: "Low Cal", img: "assets/img/tenants/Vegetarian/low-cal.jpg" },
        { name: "Lun's", img: "assets/img/tenants/Vegetarian/lun-s.jpg" },
        { name: "Mie Naga Emas", img: "assets/img/tenants/Vegetarian/mie-naga-emas.jpg" },
        { name: "One Third Cup", img: "assets/img/tenants/Vegetarian/one-third-cup.jpg" },
        { name: "Pagoda", img: "assets/img/tenants/Vegetarian/pagoda-logo-merah.jpg" }
      ]
    },
    umkm: {
      title: "Tenant UMKM",
      desc: "Produk lokal dan kurasi festival",
      tenants: [
        { name: "Hime", img: "assets/img/tenants/UMKM/Hime.jpg" },
        { name: "Snaptic", img: "assets/img/tenants/UMKM/Snaptic.png" }
      ]
    },
    kerajinan: {
      title: "Tenant Kerajinan",
      desc: "Produk craft dan karya tangan",
      tenants: [
        { name: "Boncel Vera", img: "assets/img/tenants/Kerajinan/boncel-vera.jpg" }
      ]
    },
    pet: {
      title: "Pet Lovers",
      desc: "Komunitas dan produk pecinta hewan",
      tenants: []
    },
    wellness: {
      title: "Wellness Community",
      desc: "Kebugaran dan kesehatan holistik",
      tenants: []
    }
  };

  const modal = document.getElementById('tenantModal');
  const modalGrid = document.getElementById('modalGrid');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const closeBtns = document.querySelectorAll('[data-close]');
  const tenantTriggers = document.querySelectorAll('.market-card-tenants');

  if (modal && modalGrid) {
    tenantTriggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const cat = trigger.getAttribute('data-category');
        if (!cat || !tenantData[cat]) return;
        
        const data = tenantData[cat];
        modalTitle.textContent = data.title;
        modalDesc.textContent = data.desc;
        
        modalGrid.innerHTML = ''; // clear
        
        if (data.tenants.length === 0) {
          modalGrid.innerHTML = '<div class="tenant-item"><div class="tenant-item-logo placeholder">?</div><div class="tenant-item-name">Segera Hadir</div></div>';
        } else {
          data.tenants.forEach(t => {
            const item = document.createElement('div');
            item.className = 'tenant-item';
            item.innerHTML = `
              <div class="tenant-item-logo">
                <img src="${t.img}" alt="${t.name}" loading="lazy">
              </div>
              <div class="tenant-item-name">${t.name}</div>
            `;
            modalGrid.appendChild(item);
          });
        }
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // prevent scrolling background
      });
    });

    closeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

});
