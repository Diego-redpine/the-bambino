/* =============================================
   THE BAMBINO - JavaScript
   Editorial Vintage Experience
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initLoader();
    initNavigation();
    initScrollReveal();
    initSmoothScroll();
    initParallax();
});

/* =============================================
   LOADER
   ============================================= */
function initLoader() {
    const loader = document.getElementById('loader');

    // Hide loader after content loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.style.overflow = '';

            // Trigger entrance animations
            triggerEntranceAnimations();
        }, 800);
    });

    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';
}

function triggerEntranceAnimations() {
    // Add staggered reveal to elements
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('active');
        }, index * 100);
    });
}

/* =============================================
   NAVIGATION
   ============================================= */
function initNavigation() {
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    let lastScroll = 0;
    let ticking = false;

    // Scroll behavior
    function updateNav() {
        const currentScroll = window.pageYOffset;

        // Add scrolled class for background
        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNav);
            ticking = true;
        }
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/* =============================================
   SCROLL REVEAL ANIMATIONS
   ============================================= */
function initScrollReveal() {
    // Add reveal class to elements that should animate
    const revealElements = [
        '.intro-col',
        '.story-quote',
        '.story-content',
        '.story-image-wrapper',
        '.gallery-item',
        '.food-feature-item',
        '.food-feature-header',
        '.menu-column',
        '.visit-info-block',
        '.pullquote-text'
    ];

    revealElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('reveal');
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Add staggered delay for grid items
                if (entry.target.closest('.gallery-grid') ||
                    entry.target.closest('.food-feature-grid') ||
                    entry.target.closest('.menu-content') ||
                    entry.target.closest('.visit-info')) {
                    const siblings = entry.target.parentElement.children;
                    const index = Array.from(siblings).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
}

/* =============================================
   SMOOTH SCROLL
   ============================================= */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            const navHeight = document.getElementById('nav').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

/* =============================================
   PARALLAX EFFECTS
   ============================================= */
function initParallax() {
    const heroImg = document.querySelector('.hero-img');

    // Only apply parallax on desktop
    if (window.innerWidth < 1024) return;

    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;

        // Hero parallax only
        if (heroImg && scrolled < window.innerHeight) {
            const parallaxValue = scrolled * 0.3;
            heroImg.style.transform = `scale(1.1) translateY(${parallaxValue}px)`;
        }

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

/* =============================================
   CURSOR EFFECTS (Optional Enhancement)
   ============================================= */
function initCustomCursor() {
    // Only on desktop
    if (window.innerWidth < 1024) return;

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const cursorDot = document.createElement('div');
    cursorDot.className = 'custom-cursor-dot';
    document.body.appendChild(cursorDot);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Dot follows immediately
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    // Smooth cursor follow
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;

        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effects
    const interactiveElements = document.querySelectorAll('a, button, .gallery-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
        });
    });
}

/* =============================================
   IMAGE LAZY LOADING
   ============================================= */
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

/* =============================================
   UTILITY FUNCTIONS
   ============================================= */

// Debounce function for performance
function debounce(func, wait = 100) {
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
function throttle(func, limit = 100) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/* =============================================
   RESIZE HANDLER
   ============================================= */
window.addEventListener('resize', debounce(() => {
    // Reset mobile menu on resize
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');

    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
}, 250));
