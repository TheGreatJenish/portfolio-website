// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme or default to light
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);

if (currentTheme === 'dark') {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
    const theme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    themeToggle.innerHTML = theme === 'dark' 
        ? '<i class="fas fa-sun"></i>' 
        : '<i class="fas fa-moon"></i>';
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop - headerOffset;
            
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll to top functionality
const scrollTopBtn = document.getElementById('scroll-top');
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Show/hide scroll to top button based on scroll position
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.pointerEvents = 'auto';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.pointerEvents = 'none';
    }
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Update year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Add some personality with console message
console.log(`
🎮 Hey there, fellow gamer/developer! 

Thanks for checking out the code behind my portfolio. 
I'm still learning and building stuff, so if you have any 
suggestions about coding, gaming, or just want to chat 
about life, feel free to reach out!

Currently playing: Whatever catches my eye on Steam 😄
Currently learning: Java and Data Science at Lyon College

- Jenish 👨‍💻🎮
`);

// Fun little gaming easter egg - Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    // Keep only the last 10 key presses
    if (konamiCode.length > 10) {
        konamiCode.shift();
    }
    
    // Check if the sequence matches
    if (konamiCode.join('') === konamiSequence.join('')) {
        // Easter egg - show a fun gaming message
        const easterEggMessage = document.createElement('div');
        easterEggMessage.innerHTML = `
            <div style="
                position: fixed; 
                top: 50%; 
                left: 50%; 
                transform: translate(-50%, -50%);
                background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
                color: white;
                padding: 2rem;
                border-radius: 15px;
                text-align: center;
                z-index: 9999;
                font-size: 1.2rem;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            ">
                🎮 Konami Code Activated! 🎮<br>
                <span style="font-size: 0.9rem; opacity: 0.9;">
                    You found the gamer's secret! 30 extra lives granted... in spirit 😄
                </span>
            </div>
        `;
        
        document.body.appendChild(easterEggMessage);
        
        // Remove the message after 3 seconds
        setTimeout(() => {
            document.body.removeChild(easterEggMessage);
        }, 3000);
        
        // Reset the code
        konamiCode = [];
    }
});

// Simple typing effect for the greeting (just for fun)
document.addEventListener('DOMContentLoaded', () => {
    const greeting = document.querySelector('.greeting');
    if (greeting) {
        const text = greeting.textContent;
        greeting.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                greeting.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing after a small delay
        setTimeout(typeWriter, 500);
    }
});