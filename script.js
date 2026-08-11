/* ---------- Mobile nav ---------- */
const menuIcon = document.getElementById('menu-icon');
const navLinks = document.querySelector('.nav-links');

if (menuIcon && navLinks) {
    const openNav = () => {
        navLinks.classList.add('active');
        menuIcon.classList.add('active');
        menuIcon.setAttribute('aria-expanded', 'true');
    };

    const closeNav = () => {
        navLinks.classList.remove('active');
        menuIcon.classList.remove('active');
        menuIcon.setAttribute('aria-expanded', 'false');
    };

    // Click icon — toggle open/closed
    menuIcon.addEventListener('click', () => {
        navLinks.classList.contains('active') ? closeNav() : openNav();
    });

    // Click a nav link — always close
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeNav);
    });

    // Click outside the nav — close
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') &&
            !navLinks.contains(e.target) &&
            !menuIcon.contains(e.target)) {
            closeNav();
        }
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
    '.scroll-card, .project-page-summary, .project-page-section, ' +
    '.project-page-image-single, .project-page-image-row, .project-page-gallery'
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

/* ---------- Vertical video reel ---------- */
const reelItems = document.querySelectorAll('.reel-item');

if (reelItems.length) {
    reelItems.forEach(item => {
        const video = item.querySelector('.reel-video');
        const toggle = item.querySelector('.reel-toggle');
        if (!video || !toggle) return;

        toggle.addEventListener('click', () => {
            video.paused ? video.play() : video.pause();
        });

        video.addEventListener('play', () => toggle.setAttribute('data-state', 'playing'));
        video.addEventListener('pause', () => toggle.setAttribute('data-state', 'paused'));
        video.addEventListener('ended', () => { video.currentTime = 0; });
    });

    const reelObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const item = entry.target;
            const video = item.querySelector('.reel-video');
            item.classList.toggle('is-active', entry.isIntersecting);
            if (!entry.isIntersecting && video && !video.paused) {
                video.pause();
            }
        });
    }, { threshold: 0.6 });

    reelItems.forEach(item => reelObserver.observe(item));
}
