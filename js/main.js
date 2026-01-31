document.addEventListener('DOMContentLoaded', () => {
    // GSAP initialization
    gsap.registerPlugin(ScrollTrigger);

    // Hero Parallax
    const heroBg = document.querySelector('.hero-bg-animated');
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        heroBg.style.transform = `translate(${x}px, ${y}px)`;
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Hero Animations
    gsap.from('.hero-content > *', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // Stats Counter Animation
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const countObj = { val: 0 };

        gsap.to(countObj, {
            val: target,
            scrollTrigger: {
                trigger: stat,
                start: 'top 80%',
            },
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => {
                stat.innerText = Math.floor(countObj.val) + (stat.getAttribute('data-target') === '5' ? '' : '+');
            }
        });
    });

    // Scroll Reveal for sections
    const reveals = document.querySelectorAll('.section-header, .services-grid > *, .booking-card');
    // Comparison Slider
    const slider = document.querySelector('.comparison-container');
    const afterImg = document.querySelector('.image-after');
    const handle = document.querySelector('.slider-handle');

    if (slider) {
        const moveSlider = (e) => {
            const rect = slider.getBoundingClientRect();
            const x = (e.pageX || e.touches[0].pageX) - rect.left;
            const pos = Math.max(0, Math.min(x, rect.width));
            const percentage = (pos / rect.width) * 100;

            afterImg.style.width = `${percentage}%`;
            handle.style.left = `${percentage}%`;
        };

        slider.addEventListener('mousemove', moveSlider);
        slider.addEventListener('touchmove', moveSlider);
    }

    // Mobile Menu Toggle
    const burger = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger) {
        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');

            // Animate Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            // Burger Animation
            burger.classList.toggle('toggle');
        });
    }

    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
        });
    });
});
