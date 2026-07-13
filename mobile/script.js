// ============================================
// MOBILE PORTFOLIO — fiozxr
// Smooth transitions, scroll animations, SEO
// ============================================

// ===== PROJECT DATA =====
const projectData = {
    cryxr: {
        title: 'CryXR',
        desc: 'A multi-layered encryption and decryption tool implementing custom cipher stacking. Features dynamic key derivation, file & stream encryption, and configurable cipher pipelines for researchers and security professionals. Built with Python for cross-platform deployment.',
        tags: ['Python', 'Cryptography', 'CLI', 'AES', 'RSA'],
        link: 'https://github.com/fiozxr/CryXR'
    },
    netrecon: {
        title: 'NetRecon',
        desc: 'LAN reconnaissance scanner for active host discovery, port mapping, and service fingerprinting. Supports ARP/ping host discovery, SYN/Connect port scanning, and banner grabbing for penetration testing reconnaissance phases.',
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

// ===== PAGE TRANSITION =====
const transition = document.getElementById('pageTransition');

function showTransition(callback) {
    transition.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        callback();
        setTimeout(() => {
            transition.classList.remove('active');
            document.body.style.overflow = '';
        }, 400);
    }, 300);
}

function navigateTo(event, targetId) {
    if (event) event.preventDefault();
    
    const target = document.getElementById(targetId);
    if (!target) return;
    
    closeMenu();
    
    showTransition(() => {
        target.scrollIntoView({ behavior: 'instant', block: 'start' });
        
        setTimeout(() => {
            target.querySelectorAll('[data-animate]').forEach(el => {
                el.classList.add('animated');
            });
        }, 100);
    });
}

// ===== MENU =====
function toggleMenu() {
    const overlay = document.getElementById('menuOverlay');
    const btn = document.getElementById('menuBtn');
    const isOpen = overlay.classList.contains('active');
    
    if (isOpen) {
        closeMenu();
    } else {
        overlay.classList.add('active');
        btn.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }
}

function closeMenu() {
    const overlay = document.getElementById('menuOverlay');
    const btn = document.getElementById('menuBtn');
    overlay.classList.remove('active');
    btn.classList.remove('active');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            
            const counters = entry.target.querySelectorAll('[data-count]');
            counters.forEach(counter => {
                const target = parseInt(counter.dataset.count);
                animateCounter(counter, target);
            });
            
            scrollObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('[data-animate]').forEach(el => {
    scrollObserver.observe(el);
});

// ===== COUNTER ANIMATION =====
function animateCounter(el, target) {
    let current = 0;
    const increment = target / 30;
    const duration = 1500;
    const stepTime = duration / 30;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            el.textContent = target + '+';
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current);
        }
    }, stepTime);
}

// ===== MODAL =====
function openModal(projectKey) {
    const project = projectData[projectKey];
    if (!project) return;
    
    const modal = document.getElementById('mModal');
    const body = document.getElementById('mModalBody');
    
    body.innerHTML = `
        <h3 class="m-modal-title" id="modal-title">${project.title}</h3>
        <div class="m-modal-meta">
            ${project.tags.map(tag => `<span class="m-modal-tag">${tag}</span>`).join('')}
        </div>
        <p class="m-modal-desc">${project.desc}</p>
        <a href="${project.link}" class="m-modal-link" target="_blank" rel="noopener noreferrer">
            <span>View on GitHub</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
        </a>
    `;
    
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modal.querySelector('.m-modal-close').focus();
}

function closeModal() {
    const modal = document.getElementById('mModal');
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

// Modal swipe to close
let touchStartY = 0;
let touchStartX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
    touchStartX = e.touches[0].clientX;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    const modal = document.getElementById('mModal');
    if (!modal.classList.contains('active')) return;
    
    const touchEndY = e.changedTouches[0].clientY;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaY = touchEndY - touchStartY;
    const deltaX = Math.abs(touchEndX - touchStartX);
    
    const modalContent = modal.querySelector('.m-modal-content');
    if (deltaY > 80 && deltaX < 50 && modalContent.scrollTop <= 0) {
        closeModal();
    }
}, { passive: true });

document.querySelector('.m-modal-backdrop').addEventListener('click', closeModal);

// ===== HEADER SHOW/HIDE =====
let lastScrollY = 0;
const header = document.querySelector('.m-header');

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        header.classList.add('hidden');
    } else {
        header.classList.remove('hidden');
    }
    
    lastScrollY = currentScrollY;
}, { passive: true });

// ===== KEYBOARD ACCESSIBILITY =====
document.querySelectorAll('.m-project').forEach(card => {
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            card.click();
        }
    });
});

// ===== INITIAL LOAD =====
window.addEventListener('load', () => {
    document.querySelectorAll('.m-hero [data-animate]').forEach((el, i) => {
        setTimeout(() => {
            el.classList.add('animated');
        }, i * 100);
    });
});

// ===== CONSOLE =====
console.log('%c◢◤ MOBILE ◢◤', 'font-size: 20px; color: #00ff88;');
console.log('%cfiozxr — PRETTY ALIVE', 'font-size: 12px; color: #888;');
