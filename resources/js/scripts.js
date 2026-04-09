document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    // Sticky nav on scroll
    const onScroll = () => {
        nav.classList.toggle('scrolled', window.scrollY > 80);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
        });
    });

    // Scroll animations with IntersectionObserver
    const animatedElements = document.querySelectorAll('[data-animate]');
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Stagger animation for skill cards
                    const delay = entry.target.closest('.skills-grid')
                        ? index * 50
                        : 0;
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, delay);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        animatedElements.forEach(el => observer.observe(el));
    }

    // Active nav link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = navLinks.querySelectorAll('a');

    const highlightNav = () => {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop - 100;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');

            navAnchors.forEach(a => {
                if (a.getAttribute('href') === `#${id}`) {
                    a.classList.toggle('active', scrollPos >= top && scrollPos < bottom);
                }
            });
        });
    };

    window.addEventListener('scroll', highlightNav, { passive: true });
    highlightNav();
});
