// Particles.js configuration
particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: '#ffffff' },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: false },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.4, width: 1 },
        move: { enable: true, speed: 6, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
    },
    interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
        modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
    },
    retina_detect: true
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Hero animations
gsap.from('.hero h1', { opacity: 0, y: 50, duration: 1, delay: 0.5 });
gsap.from('.hero p', { opacity: 0, y: 50, duration: 1, delay: 0.8 });
gsap.from('.cta-button', { opacity: 0, y: 50, duration: 1, delay: 1.1 });

// Pricing card animations
gsap.from('.pricing-card', {
    opacity: 0,
    y: 100,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: {
        trigger: '.pricing',
        start: 'top 80%'
    }
});

// Navbar toggle functionality
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

navbarToggler.addEventListener('click', () => {
    if (navbarCollapse.classList.contains('show')) {
        gsap.to(navbarCollapse, { 
            height: 0, 
            opacity: 0, 
            duration: 0.3, 
            onComplete: () => {
                navbarCollapse.classList.remove('show');
                navbarCollapse.style.height = null;
                navbarCollapse.style.opacity = null;
            }
        });
    } else {
        navbarCollapse.classList.add('show');
        gsap.from(navbarCollapse, { height: 0, opacity: 0, duration: 0.3 });
    }
});

// Close navbar when clicking outside
document.addEventListener('click', (event) => {
    const isClickInsideNavbar = navbarCollapse.contains(event.target) || navbarToggler.contains(event.target);
    if (!isClickInsideNavbar && navbarCollapse.classList.contains('show')) {
        gsap.to(navbarCollapse, { 
            height: 0, 
            opacity: 0, 
            duration: 0.3, 
            onComplete: () => {
                navbarCollapse.classList.remove('show');
                navbarCollapse.style.height = null;
                navbarCollapse.style.opacity = null;
            }
        });
    }
});

// Close navbar when clicking on a nav link (for mobile)
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
            gsap.to(navbarCollapse, { 
                height: 0, 
                opacity: 0, 
                duration: 0.3, 
                onComplete: () => {
                    navbarCollapse.classList.remove('show');
                    navbarCollapse.style.height = null;
                    navbarCollapse.style.opacity = null;
                }
            });
        }
    });
});

// Day/Night Mode Toggle
const modeToggle = document.getElementById('mode-toggle');
const body = document.body;

modeToggle.addEventListener('change', () => {
    body.classList.toggle('light-mode');
    updateParticlesColor();
});

function updateParticlesColor() {
    const isLightMode = body.classList.contains('light-mode');
    const color = isLightMode ? '#2d3436' : '#ffffff';
    pJSDom[0].pJS.particles.color.value = color;
    pJSDom[0].pJS.particles.line_linked.color = color;
    pJSDom[0].pJS.fn.particlesRefresh();
}

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        gsap.to(scrollToTopBtn, { opacity: 1, visibility: 'visible', duration: 0.3 });
    } else {
        gsap.to(scrollToTopBtn, { opacity: 0, visibility: 'hidden', duration: 0.3 });
    }
});

scrollToTopBtn.addEventListener('click', () => {
    gsap.to(window, { duration: 1, scrollTo: 0, ease: 'power2.inOut' });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        gsap.to(window, { duration: 1, scrollTo: target, ease: 'power2.inOut' });
    });
});

// Animate pricing cards on hover
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        if (!card.classList.contains('featured')) {
            gsap.to(card, { scale: 1.05, duration: 0.3 });
        }
    });
    card.addEventListener('mouseleave', () => {
        if (!card.classList.contains('featured')) {
            gsap.to(card, { scale: 1, duration: 0.3 });
        }
    });
});

// Initialize Bootstrap tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
});