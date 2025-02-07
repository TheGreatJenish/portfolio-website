// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Update Active Class on Scroll
window.addEventListener('scroll', () => {
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('#nav-menu a');

    sections.forEach((section, index) => {
        let rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLinks[index].classList.add('active');
        }
    });
});

// Mobile Menu Toggle (Optional - if you add a mobile menu button in HTML)
const menuToggle = document.getElementById('nav-menu');
const menuButton = document.querySelector('.menu-btn'); // Example: hamburger icon

menuButton.addEventListener('click', () => {
    menuToggle.classList.toggle('active');  // Toggle the navigation menu visibility
});
