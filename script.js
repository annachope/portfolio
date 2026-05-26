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
