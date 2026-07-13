// ============================================
// PERFORMANCE: Detect mobile and optimize
// ============================================
const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  || window.innerWidth < 768;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Disable heavy animations on mobile / reduced-motion
if (isMobileDevice || prefersReducedMotion) {
  const asciiContainer = document.getElementById('asciiContainer');
  if (asciiContainer) asciiContainer.style.display = 'none';

  const floatingContainer = document.getElementById('floatingText');
  if (floatingContainer) floatingContainer.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // CORE UI — must work even if the GSAP CDN
  // fails to load, so these run unconditionally.
  // ==========================================

  // Custom cursor (desktop only, non-touch, motion allowed)
  if (!isMobileDevice && !prefersReducedMotion) {
    document.body.classList.add('js-ready');

    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    const trail = document.querySelector('.cursor-trail');
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let trailX = 0, trailY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    });

    function animateCursor() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      trailX += (mouseX - trailX) * 0.08;
      trailY += (mouseY - trailY) * 0.08;

      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      trail.style.left = trailX + 'px';
      trail.style.top = trailY + 'px';

      requestAnimationFrame(animateCursor);
    }

    animateCursor();

    document.querySelectorAll('[data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-' + el.dataset.cursor);
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-' + el.dataset.cursor);
      });
    });
  }

  // Dark mode toggle
  const themeToggle = document.querySelector('.theme-toggle');
  const toggleIcon = themeToggle.querySelector('.toggle-icon');
  const html = document.documentElement;

  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    toggleIcon.textContent = next === 'dark' ? '☀' : '☾';
    themeToggle.setAttribute('aria-label', next === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');

    if (typeof gsap !== 'undefined') {
      gsap.to('body', { opacity: 0.8, duration: 0.1, yoyo: true, repeat: 1 });
    }
  });

  // Mobile nav menu toggle
  const navMenuBtn = document.querySelector('.nav-menu');
  const navEl = document.querySelector('.nav');
  const navLinksEl = document.getElementById('navLinks');

  if (navMenuBtn && navLinksEl) {
    navMenuBtn.addEventListener('click', () => {
      const isOpen = navLinksEl.classList.toggle('open');
      navMenuBtn.classList.toggle('active', isOpen);
      navEl.classList.toggle('menu-open', isOpen);
      navMenuBtn.setAttribute('aria-expanded', String(isOpen));
      navMenuBtn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navLinksEl.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinksEl.classList.remove('open');
        navMenuBtn.classList.remove('active');
        navEl.classList.remove('menu-open');
        navMenuBtn.setAttribute('aria-expanded', 'false');
        navMenuBtn.setAttribute('aria-label', 'Open menu');
        document.body.style.overflow = '';
      });
    });
  }

  // Project modal (works without GSAP)
  const modal = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalBody');
  const modalBackdrop = modal.querySelector('.modal-backdrop');
  const modalClose = modal.querySelector('.modal-close');
  let lastFocusedEl = null;

  const projectData = {
    cryxr: {
      title: 'CryXR',
      desc: 'A multi-layered encryption and decryption tool implementing custom cipher stacking. Features dynamic key derivation, file & stream encryption, and configurable cipher pipelines for researchers and security professionals.',
      tags: ['Python', 'Cryptography', 'CLI', 'AES', 'RSA'],
      link: 'https://github.com/fiozxr/CryXR'
    },
    netrecon: {
      title: 'NetRecon',
      desc: 'LAN reconnaissance scanner for active host discovery, port mapping, and service fingerprinting. Supports ARP/ping host discovery, SYN/Connect port scanning, and banner grabbing for penetration testing reconnaissance.',
      tags: ['Python', 'Networking', 'Nmap', 'Reconnaissance'],
      link: 'https://github.com/fiozxr'
    },
    webvuln: {
      title: 'WebVuln',
      desc: 'Proof-of-concept web vulnerability scanner identifying XSS vectors, SQL injection points, and common security misconfigurations. Educational tool for understanding web attack surfaces and defensive coding practices.',
      tags: ['Python', 'Web Security', 'XSS', 'SQLi', 'POC'],
      link: 'https://github.com/fiozxr'
    }
  };

  function openModal(project) {
    lastFocusedEl = document.activeElement;

    modalBody.innerHTML = `
      <h2 id="modal-title" class="modal-title">${project.title}</h2>
      <div class="modal-meta">
        ${project.tags.map(tag => `<span class="modal-tag">${tag}</span>`).join('')}
      </div>
      <p class="modal-desc">${project.desc}</p>
      <a href="${project.link}" class="modal-link" target="_blank" rel="noopener noreferrer">
        <span>View on GitHub</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </a>
    `;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modalClose.focus();
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocusedEl) lastFocusedEl.focus();
  }

  document.querySelectorAll('[data-project]').forEach(card => {
    card.addEventListener('click', () => {
      const project = projectData[card.dataset.project];
      if (project) openModal(project);
    });
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const project = projectData[card.dataset.project];
        if (project) openModal(project);
      }
    });
  });

  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeModal();
      return;
    }

    if (e.key === 'Tab') {
      const focusable = modal.querySelectorAll('button, a[href]');
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  // Smooth scroll for in-page nav links (works without GSAP)
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();

      if (typeof gsap !== 'undefined' && gsap.plugins && gsap.plugins.scrollTo) {
        gsap.to(window, { duration: 1.2, scrollTo: { y: target, offsetY: 80 }, ease: 'power3.inOut' });
      } else {
        target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
      }
    });
  });

  // ==========================================
  // DECORATIVE / GSAP-DEPENDENT ENHANCEMENTS
  // ==========================================
  if (typeof gsap === 'undefined') {
    console.warn('GSAP not loaded — decorative animations skipped, core site still functional.');
    return;
  }

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // ASCII VIDEO BACKGROUND (Desktop Only, motion allowed)
  if (!isMobileDevice && !prefersReducedMotion) {
    const canvas = document.getElementById('asciiVideo');
    const ctx = canvas.getContext('2d');
    const chars = ' .:-=+*#%@';
    const charArray = chars.split('');
    let width, height;
    let time = 0;
    let animationFrameId;
    let lastFrame = 0;
    const frameInterval = 1000 / 30;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    function drawAsciiVideo(now) {
      animationFrameId = requestAnimationFrame(drawAsciiVideo);

      if (now - lastFrame < frameInterval) return;
      lastFrame = now;

      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
      ctx.fillRect(0, 0, width, height);

      const fontSize = 14;
      const cols = Math.floor(width / fontSize);
      const rows = Math.floor(height / fontSize);

      ctx.font = `${fontSize}px 'Space Mono', monospace`;
      ctx.textBaseline = 'top';

      const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const noise = Math.sin(x * 0.05 + time) * Math.cos(y * 0.05 + time * 0.5) * Math.sin((x + y) * 0.02);
          const charIndex = Math.floor(Math.abs(noise) * charArray.length);
          const char = charArray[Math.min(charIndex, charArray.length - 1)];
          const alpha = Math.abs(noise) * 0.5 + 0.1;

          ctx.fillStyle = accent;
          ctx.globalAlpha = alpha;

          if (charIndex > charArray.length * 0.6) {
            ctx.shadowColor = accent;
            ctx.shadowBlur = 10;
          } else {
            ctx.shadowBlur = 0;
          }

          ctx.fillText(char, x * fontSize, y * fontSize);
        }
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      time += 0.02;
    }

    animationFrameId = requestAnimationFrame(drawAsciiVideo);

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        animationFrameId = requestAnimationFrame(drawAsciiVideo);
      }
    });
  }

  // FLOATING RANDOM TYPOGRAPHY (Desktop Only, motion allowed)
  if (!isMobileDevice && !prefersReducedMotion) {
    const floatingContainer = document.getElementById('floatingText');
    const randomTexts = [
      'EXPLOIT', '0x7A3F', 'ENCRYPT', 'PENETRATE',
      'RECON', 'CVE-2025', 'SHELL', 'ROOT',
      'BUFFER', 'OVERFLOW', 'PAYLOAD', 'INJECT',
      'SCAN', 'NMAP', 'CRYPTO', 'AES-256',
      'HASH', 'MD5', 'SHA256', 'BASE64',
      'KALI', 'METASPLOIT', 'WIRESHARK', 'BURP',
      'PYTHON', 'BASH', 'SQL', 'XSS',
      'PRETTY', 'ALIVE', 'FIOZXR', 'RAHMAN'
    ];
    const fonts = ['0.6rem', '0.8rem', '1rem', '1.2rem', '0.5rem', '1.5rem'];
    const weights = ['300', '400', '700', '900'];

    function createFloatingText() {
      const el = document.createElement('div');
      el.className = 'floating-text';
      el.textContent = randomTexts[Math.floor(Math.random() * randomTexts.length)];
      el.style.left = Math.random() * 100 + '%';
      el.style.top = Math.random() * 100 + '%';
      el.style.fontSize = fonts[Math.floor(Math.random() * fonts.length)];
      el.style.fontWeight = weights[Math.floor(Math.random() * weights.length)];
      el.style.animationDuration = (15 + Math.random() * 20) + 's';
      el.style.animationDelay = Math.random() * 5 + 's';
      el.style.opacity = 0.03 + Math.random() * 0.05;

      floatingContainer.appendChild(el);

      setTimeout(() => {
        el.remove();
      }, 35000);
    }

    for (let i = 0; i < 15; i++) {
      setTimeout(createFloatingText, i * 200);
    }

    setInterval(createFloatingText, 5000);
  }

  // GSAP SCROLL ANIMATIONS
  gsap.from('.hero-badge', { y: 30, opacity: 0, duration: 1, delay: 0.3, ease: 'power3.out' });
  gsap.from('.hero-title .title-line', { y: 100, opacity: 0, duration: 1.2, stagger: 0.15, delay: 0.5, ease: 'power3.out' });
  gsap.from('.hero-subtitle', { y: 30, opacity: 0, duration: 1, delay: 0.9, ease: 'power3.out' });
  gsap.from('.hero-actions', { y: 30, opacity: 0, duration: 1, delay: 1.1, ease: 'power3.out' });
  gsap.from('.hero-scroll', { opacity: 0, duration: 1, delay: 1.5 });

  gsap.utils.toArray('[data-scroll-reveal]').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });
  });

  gsap.to('.hero-title', {
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
    y: 150,
    opacity: 0.3
  });

  gsap.from('.project-card', {
    scrollTrigger: { trigger: '.projects-list', start: 'top 80%' },
    y: 80,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out'
  });

  gsap.from('.arsenal-category', {
    scrollTrigger: { trigger: '.arsenal-grid', start: 'top 80%' },
    y: 60,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out'
  });

  gsap.utils.toArray('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(el, { innerText: target, duration: 2, snap: { innerText: 1 }, ease: 'power2.out' });
      }
    });
  });

  // MAGNETIC EFFECT FOR BUTTONS (Desktop Only, motion allowed)
  if (!isMobileDevice && !prefersReducedMotion) {
    document.querySelectorAll('[data-cursor="magnetic"]').forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' });
      });

      el.addEventListener('mouseleave', () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
      });
    });
  }

  // Console signature
  console.log('%c◢◤ FIOZXR ◢◤', 'font-family: monospace; font-size: 24px; color: #00ff88; text-shadow: 0 0 10px #00ff88;');
  console.log('%cPRETTY ALIVE.', 'font-family: monospace; font-size: 14px; color: #888;');
  console.log('%c> Curious minds are welcome here.', 'font-family: monospace; font-size: 11px; color: #444;');
});

// ============================================
// MOBILE SUGGESTION POPUP
// ============================================
const mobileSuggest = document.getElementById('mobileSuggest');

function showMobileSuggest() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    || window.innerWidth < 768;

  let dismissed = null;
  try {
    dismissed = localStorage.getItem('mobileSuggestDismissed');
  } catch (err) {
    // localStorage unavailable — degrade gracefully
  }

  if (isMobile && !dismissed && mobileSuggest) {
    setTimeout(() => {
      mobileSuggest.classList.add('active');
      mobileSuggest.setAttribute('aria-hidden', 'false');
      mobileSuggest.removeAttribute('inert');
    }, 1500);
  }
}

function dismissSuggest() {
  if (!mobileSuggest) return;
  mobileSuggest.classList.remove('active');
  mobileSuggest.setAttribute('aria-hidden', 'true');
  mobileSuggest.setAttribute('inert', '');
  try {
    localStorage.setItem('mobileSuggestDismissed', 'true');
  } catch (err) {
    // ignore if storage is unavailable
  }
}

window.addEventListener('load', showMobileSuggest);

window.addEventListener('resize', () => {
  if (window.innerWidth >= 768 && mobileSuggest) {
    mobileSuggest.classList.remove('active');
    mobileSuggest.setAttribute('aria-hidden', 'true');
    mobileSuggest.setAttribute('inert', '');
  }
});
