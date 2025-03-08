document.addEventListener("DOMContentLoaded", () => {
    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Active Nav on Scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-link');

        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLinks[index + 1].classList.add('active'); // Offset by 1 due to Home section
            }
        });
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('nav-menu');
    const menuButton = document.querySelector('.menu-btn');

    if (menuButton) {
        menuButton.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
        });
    }
});