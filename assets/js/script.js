// Document Ready Function
document.addEventListener('DOMContentLoaded', function() {
    // Ensure all icons are visible
    document.querySelectorAll('.fa-solid, .fa-brands, .fa-regular').forEach(icon => {
        icon.style.display = 'inline-block';
        icon.style.visibility = 'visible';
        icon.style.opacity = '1';
    });
    
    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        cursorFollower.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });

    // Smooth Scroll for Navigation Links
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

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Animation
    gsap.from('.hero-title', {
        duration: 0.7,
        y: 30,
        opacity: 0,
        ease: 'power2.out'
    });

    gsap.from('.hero-subtitle', {
        duration: 0.7,
        y: 20,
        opacity: 0,
        delay: 0.2,
        ease: 'power2.out'
    });

    gsap.from('.hero-cta', {
        duration: 0.7,
        y: 20,
        opacity: 0,
        delay: 0.3,
        ease: 'power2.out'
    });

    gsap.from('.about-text p', {
        scrollTrigger: {
            trigger: '.about-text',
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        duration: 0.6,
        y: 20,
        opacity: 0,
        stagger: 0.1,
        ease: 'power2.out'
    });

    // Section Animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                end: 'bottom 20%',
                toggleActions: 'play none none none',
                once: true
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out'
        });
    });

    // Skill Cards Animation
    gsap.from('.skill-card', {
        scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true
        },
        duration: 0.5,
        y: 20,
        opacity: 0,
        stagger: 0.1,
        ease: 'power2.out'
    });

    // Project Cards Animation
    gsap.from('.project-card', {
        scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true
        },
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out'
    });

    // Timeline Animation
    gsap.from('.timeline-item', {
        scrollTrigger: {
            trigger: '.timeline',
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true
        },
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out'
    });

    // Navbar Background Change on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
        if (window.scrollY > 50) {
            if (isDarkMode) {
                navbar.style.background = 'rgba(0, 0, 0, 0.8)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        } else {
            if (isDarkMode) {
                navbar.style.background = 'rgba(0, 0, 0, 0.8)';
                navbar.style.boxShadow = 'none';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.8)';
                navbar.style.boxShadow = 'none';
            }
        }
    });

    // Form Input Animation
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');
        
        if (input && label) {
            input.addEventListener('focus', () => {
                label.classList.add('active');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    label.classList.remove('active');
                }
            });
        }
    });

    // Mobile Menu Toggle
    const createMobileMenu = () => {
        const nav = document.querySelector('.nav-content');
        const menuButton = document.createElement('button');
        menuButton.className = 'mobile-menu-btn';
        menuButton.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        
        nav.insertBefore(menuButton, nav.firstChild);
        
        menuButton.addEventListener('click', () => {
            document.querySelector('.nav-links').classList.toggle('active');
            menuButton.classList.toggle('active');
        });
    };

    // Initialize Mobile Menu on Small Screens
    if (window.innerWidth <= 768) {
        createMobileMenu();
    }

    // Handle Window Resize
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            if (!document.querySelector('.mobile-menu-btn')) {
                createMobileMenu();
            }
        } else {
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            if (mobileMenuBtn) {
                mobileMenuBtn.remove();
            }
            document.querySelector('.nav-links').classList.remove('active');
        }
    });

    // Form Handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            try {
                // Here you would typically send the form data to your backend
                // For now, we'll just show a success message
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            } catch (error) {
                alert('There was an error sending your message. Please try again later.');
                console.error('Form submission error:', error);
            }
        });
    }

    // Video Modal Functionality
    const videoLinks = document.querySelectorAll('.video-link');
    const videoModal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    const closeModal = document.querySelector('.close-modal');

    videoLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const videoUrl = link.getAttribute('data-video');
            if (videoUrl) {
                videoFrame.src = videoUrl;
                videoModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    closeModal.addEventListener('click', () => {
        videoModal.classList.remove('active');
        videoFrame.src = '';
        document.body.style.overflow = '';
    });

    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            videoModal.classList.remove('active');
            videoFrame.src = '';
            document.body.style.overflow = '';
        }
    });

    // Theme Toggle Functionality
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Function to set theme
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update navbar background based on theme
        const navbar = document.querySelector('.navbar');
        if (theme === 'dark') {
            navbar.style.background = 'rgba(0, 0, 0, 0.8)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    }

    // Check for saved theme preference or use system preference
    const currentTheme = localStorage.getItem('theme') || 
        (prefersDarkScheme.matches ? 'dark' : 'light');

    // Apply theme on load
    setTheme(currentTheme);

    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    });

    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            setTheme(newTheme);
        }
    });
}); 