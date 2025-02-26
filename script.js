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
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLinks[index].classList.add('active');
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

// Parallax Effect on Hero Background
const heroBg = document.querySelector('.hero-bg');
window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    heroBg.style.transform = `translateY(${scrollPos * 0.5}px)`;
});

// Animate Skill Bars on Scroll
const skillsSection = document.getElementById('skills');
const skillBars = document.querySelectorAll('.skill-progress');

window.addEventListener('scroll', () => {
    const rect = skillsSection.getBoundingClientRect();
    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.setProperty('--width', width);
        });
    }
});