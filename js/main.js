/* ============================================
   MAIN JAVASCRIPT
   Particles.js, Typewriter, Scroll, Navigation
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ---- Loading screen ----
  const loader = document.querySelector('.loader-wrapper');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('loaded');
    }, 600);
  });

  // ---- Particles.js config ----
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: {
          value: 60,
          density: { enable: true, value_area: 900 }
        },
        color: { value: '#64ffda' },
        shape: {
          type: 'circle',
          stroke: { width: 0, color: '#000000' }
        },
        opacity: {
          value: 0.3,
          random: true,
          anim: { enable: true, speed: 0.8, opacity_min: 0.1, sync: false }
        },
        size: {
          value: 3,
          random: true,
          anim: { enable: true, speed: 2, size_min: 0.5, sync: false }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#64ffda',
          opacity: 0.15,
          width: 1
        },
        move: {
          enable: true,
          speed: 1.2,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: { enable: false, rotateX: 600, rotateY: 1200 }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'grab' },
          onclick: { enable: true, mode: 'push' },
          resize: true
        },
        modes: {
          grab: { distance: 140, line_linked: { opacity: 0.4 } },
          push: { particles_nb: 3 }
        }
      },
      retina_detect: true
    });
  }

  // ---- Typewriter Effect ----
  const typewriterEl = document.querySelector('.typewriter');
  if (typewriterEl) {
    const phrases = [
      'AI & ML Engineer',
      'LLM & RAG Specialist',
      'MLOps Practitioner',
      'Data Scientist',
      'Full-Stack AI Builder'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typewrite() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
      } else {
        typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500; // Pause before next phrase
      }

      setTimeout(typewrite, typeSpeed);
    }

    setTimeout(typewrite, 1500);
  }

  // ---- Navbar scroll behavior ----
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('.section, .hero, .contact-section');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  function handleScroll() {
    // Add scrolled class
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Highlight active nav link
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  // ---- Mobile navigation ----
  const hamburger = document.querySelector('.hamburger');
  const navLinksContainer = document.querySelector('.nav-links');
  const navOverlay = document.querySelector('.nav-overlay');

  function toggleNav() {
    hamburger.classList.toggle('active');
    navLinksContainer.classList.toggle('active');
    navOverlay.classList.toggle('active');
    document.body.style.overflow = navLinksContainer.classList.contains('active') ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleNav);
  navOverlay.addEventListener('click', toggleNav);

  // Close nav on link click (mobile)
  navLinksContainer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinksContainer.classList.contains('active')) {
        toggleNav();
      }
    });
  });

  // ---- Theme toggle ----
  const themeToggle = document.querySelector('.theme-toggle');
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);

    // Update particles color for light theme
    if (typeof pJSDom !== 'undefined' && pJSDom.length > 0) {
      const newColor = next === 'light' ? '#0d9488' : '#64ffda';
      pJSDom[0].pJS.particles.color.value = newColor;
      pJSDom[0].pJS.particles.line_linked.color = newColor;
      pJSDom[0].pJS.fn.particlesRefresh();
    }
  });

  function updateThemeIcon(theme) {
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  // ---- AOS (Animate on Scroll) - Custom lightweight implementation ----
  const aosElements = document.querySelectorAll('[data-aos]');

  function handleAOS() {
    aosElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const offset = parseInt(el.getAttribute('data-aos-offset')) || 100;
      const delay = parseInt(el.getAttribute('data-aos-delay')) || 0;

      if (rect.top < window.innerHeight - offset) {
        setTimeout(() => {
          el.classList.add('aos-animate');
        }, delay);
      }
    });
  }

  // Set transition durations from data attributes
  aosElements.forEach(el => {
    const duration = el.getAttribute('data-aos-duration') || '600';
    el.style.transitionDuration = duration + 'ms';
  });

  window.addEventListener('scroll', handleAOS, { passive: true });
  handleAOS(); // Run on load

  // ---- Skill bar animation ----
  const skillBars = document.querySelectorAll('.skill-bar-fill');

  function animateSkillBars() {
    skillBars.forEach(bar => {
      const rect = bar.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50) {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
      }
    });
  }

  window.addEventListener('scroll', animateSkillBars, { passive: true });
  animateSkillBars();

  // ---- Smooth scroll for nav links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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
});
