// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const typingText = document.getElementById('typing-text');
const contactForm = document.getElementById('contact-form');
const skillProgressBars = document.querySelectorAll('.skill-progress');

// Mobile Navigation
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const headerOffset = 70; // Height of fixed navigation
            const elementPosition = targetElement.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Typing Effect Animation
const titles = [
    'JUNIOR CYBERSECURITY STUDENT',
    'WEB PEN-TESTER',
    'SECURITY ENTHUSIAST',
    'PENETRATION TESTER'
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function typeTitle() {
    const currentTitle = titles[titleIndex];
    
    if (isDeleting) {
        typingText.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 50;
    } else {
        typingText.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 100;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
        typingDelay = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typingDelay = 500; // Pause before next title
    }

    setTimeout(typeTitle, typingDelay);
}

// Start typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeTitle, 1000);
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add fade-in animation
            entry.target.classList.add('fade-in');
            
            // Trigger skills animation
            if (entry.target.classList.contains('skills')) {
                animateSkillBars();
            }
        }
    });
}, observerOptions);

// Observe sections for animations
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    observer.observe(section);
});

// Skills Progress Bar Animation
function animateSkillBars() {
    skillProgressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width + '%';
        }, 300);
    });
}

// Form Validation and Handling
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const subject = formData.get('subject').trim();
    const message = formData.get('message').trim();
    
    // Validation
    const errors = [];
    
    if (!name) {
        errors.push('Name is required');
    }
    
    if (!email) {
        errors.push('Email is required');
    } else if (!isValidEmail(email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!subject) {
        errors.push('Subject is required');
    }
    
    if (!message) {
        errors.push('Message is required');
    } else if (message.length < 10) {
        errors.push('Message must be at least 10 characters long');
    }
    
    // Display errors or success
    if (errors.length > 0) {
        showNotification('Please fix the following errors:\n' + errors.join('\n'), 'error');
    } else {
        // Simulate form submission
        showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
        contactForm.reset();
    }
});

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${type === 'error' ? '#ff4444' : '#00ff88'};
        color: ${type === 'error' ? '#fff' : '#000'};
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1001;
        max-width: 400px;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        white-space: pre-line;
    `;
    
    const notificationContent = notification.querySelector('.notification-content');
    notificationContent.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 16px;
    `;
    
    const closeButton = notification.querySelector('.notification-close');
    closeButton.style.cssText = `
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        color: inherit;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    closeButton.addEventListener('click', () => {
        removeNotification(notification);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
}

// Remove notification with animation
function removeNotification(notification) {
    if (notification && notification.parentNode) {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }
}

// Navbar scroll effect
let lastScrollY = window.scrollY;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    // Update active navigation link
    updateActiveNavLink();
    
    lastScrollY = currentScrollY;
});

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Smooth reveal animations for elements
const revealElements = document.querySelectorAll('.project-card, .skill-item, .about-content > *');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Set initial state and observe elements
revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(element);
});

// Floating animation for hero icons
function startFloatingAnimation() {
    const floatingIcons = document.querySelectorAll('.floating-icons i');
    
    floatingIcons.forEach((icon, index) => {
        // Random floating movement
        setInterval(() => {
            const randomX = (Math.random() - 0.5) * 20;
            const randomY = (Math.random() - 0.5) * 20;
            
            icon.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${Math.random() * 10 - 5}deg)`;
        }, 3000 + index * 500);
    });
}

// Initialize floating animation
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(startFloatingAnimation, 2000);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-visual');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add loading animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 300);
    }
    
    // Trigger initial animations
    document.body.classList.add('loaded');
});

// Handle form input focus states
const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentNode.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value.trim()) {
            input.parentNode.classList.remove('focused');
        }
    });
    
    // Check if input has value on load
    if (input.value.trim()) {
        input.parentNode.classList.add('focused');
    }
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Project card hover effects
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        // Add subtle glow effect
        card.style.boxShadow = '0 20px 40px rgba(0, 255, 136, 0.2)';
    });
    
    card.addEventListener('mouseleave', () => {
        // Remove glow effect
        card.style.boxShadow = '0 10px 30px rgba(0, 255, 136, 0.1)';
    });
});

// Add active state styles for navigation
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--cyber-primary) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    .form-group.focused input,
    .form-group.focused textarea {
        border-color: var(--cyber-primary);
        box-shadow: 0 0 10px var(--cyber-glow);
    }
    
    @media (max-width: 768px) {
        .notification {
            right: 10px !important;
            left: 10px !important;
            max-width: none !important;
        }
    }
`;
document.head.appendChild(style);

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scrolling behavior to html
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Set initial active nav link
    setTimeout(updateActiveNavLink, 100);
    
    console.log('Portfolio website initialized successfully!');
});

// Performance optimization: throttle scroll events
function throttle(func, wait) {
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

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    updateActiveNavLink();
}, 100);

window.removeEventListener('scroll', updateActiveNavLink);
window.addEventListener('scroll', throttledScrollHandler);