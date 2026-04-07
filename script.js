/* ============================================
   FORTUNE FEST — Landing Page Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {


  // ==========================================
  // 3. SMOOTH SCROLL — For anchor links
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
  const registerForm = document.getElementById('register-form');

  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = document.getElementById('reg-name').value;
      const email = document.getElementById('reg-email').value;
      const phone = document.getElementById('reg-phone').value;
      const category = document.getElementById('reg-category').value;

      // Placeholder: Replace this URL with your Google Form URL
      // Format: https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?usp=pp_url&entry.FIELD1=VALUE1&entry.FIELD2=VALUE2
      const googleFormBase = `https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?usp=send_form&entry.NAME=${encodeURIComponent(name)}&entry.EMAIL=${encodeURIComponent(email)}&entry.PHONE=${encodeURIComponent(phone)}&entry.CAT=${encodeURIComponent(category)}`;
      
      // For now, show a success message
      const btn = registerForm.querySelector('.btn-gold');
      const originalText = btn.innerHTML;
      btn.innerHTML = '✓ Terkirim! Redirecting ke Google Form...';
      btn.style.background = 'linear-gradient(135deg, #4A7C59, #2C4A2E)';
      btn.disabled = true;

      setTimeout(() => {
        // Reset the form
        registerForm.reset();
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.disabled = false;

        // Replace 'YOUR_FORM_ID' with the actual ID later
        window.open(googleFormBase, '_blank');
        // alert('Terima kasih telah mendaftar!');
      }, 2000);
    });
  }


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
