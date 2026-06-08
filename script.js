/* ---------- Mobile nav ---------- */
const menuIcon = document.getElementById('menu-icon');
const navLinks = document.querySelector('.nav-links');

if (menuIcon && navLinks) {
    let closeTimer;

    const openNav = () => {
        clearTimeout(closeTimer);
        navLinks.classList.add('active');
    };

    const closeNav = () => {
        clearTimeout(closeTimer);
        navLinks.classList.remove('active');
    };

    const scheduleClose = () => {
        closeTimer = setTimeout(closeNav, 150);
    };

    // Hover — mouse devices only (mouseenter doesn't fire on touch)
    menuIcon.addEventListener('mouseenter', openNav);
    navLinks.addEventListener('mouseenter', () => clearTimeout(closeTimer));
    menuIcon.addEventListener('mouseleave', scheduleClose);
    navLinks.addEventListener('mouseleave', closeNav);

    // Click icon — toggle open/closed
    menuIcon.addEventListener('click', () => {
        navLinks.classList.contains('active') ? closeNav() : openNav();
    });

    // Click a nav link — always close
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeNav);
    });
}

/* ---------- Rotating title (simple crossfade) ---------- */
const role = document.querySelector('.role');

if (role) {
    const titles = [
        'Graphic Designer',
        'Motion Graphics Designer',
        'Videographer',
        'UI Designer',
        'Illustrator',
        'Yoga Instructor',
        'Adequate Pianist'
    ];
    const HOLD = 2600;   // how long each title stays
    const FADE = 500;    // matches the CSS transition
    let i = 0;

    setInterval(() => {
        role.classList.add('is-out');            // fade + rise out
        setTimeout(() => {
            i = (i + 1) % titles.length;
            role.textContent = titles[i];
            role.classList.remove('is-out');     // settle back in
        }, FADE);
    }, HOLD);
}

/* ---------- Scroll reveal ---------- */
const revealTargets = document.querySelectorAll(
    '.section-title, .grid-card, .project-card, .project-page-hero, ' +
    '.project-page-hero-img, .project-page-overview, .project-page-section, ' +
    '.project-page-image-single, .project-page-image-row, .project-page-gallery, ' +
    '.footer'
);

if ('IntersectionObserver' in window && revealTargets.length) {
    revealTargets.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // small stagger for groups entering together
                entry.target.style.transitionDelay = `${(index % 4) * 80}ms`;
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach(el => observer.observe(el));
}
