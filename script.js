// ===========================
// Image Fallback & Styling
// ===========================

const profileImage = document.querySelector('.profile-image');
if (profileImage) {
    profileImage.addEventListener('error', function() {
        // If image fails to load, show a fallback
        const photoFrame = document.querySelector('.photo-frame');
        if (photoFrame) {
            photoFrame.innerHTML = `
                <div style="
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(135deg, #6366f1, #ec4899);
                    color: white;
                    font-size: 3rem;
                    border-radius: 50%;
                ">
                    <i class="fas fa-user"></i>
                </div>
            `;
        }
    });

    // Add hover glow effect
    profileImage.addEventListener('mouseenter', function() {
        this.style.filter = 'brightness(1.3) drop-shadow(0 0 30px rgba(236, 72, 153, 0.8))';
    });
    
    profileImage.addEventListener('mouseleave', function() {
        this.style.filter = 'brightness(1.1)';
    });
}

// ===========================
// Particle Effect on Mouse Move (Hero Section)
// ===========================

const hero = document.querySelector('.hero');
if (hero) {
    hero.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        hero.style.backgroundPosition = `${x * 100}% ${y * 100}%`;
    });
}

// ===========================
// Mobile Menu Toggle
// ===========================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        hamburger.classList.toggle('active');
    });
}

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.style.display = 'none';
        hamburger.classList.remove('active');
    });
});

// ===========================
// Smooth Scrolling
// ===========================

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

// ===========================
// Active Navigation Link Highlighting
// ===========================

const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===========================
// Form Submission with Animation
// ===========================

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;

        // Basic validation
        if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Simulate form submission
        const submitButton = this.querySelector('button');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        submitButton.style.opacity = '0.7';

        // Simulate sending email
        setTimeout(() => {
            // Create mailto link
            const mailtoLink = `mailto:premkumar756957@gmail.com?subject=Portfolio Contact: ${encodeURIComponent(name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            window.location.href = mailtoLink;

            // Reset form
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.style.opacity = '1';

            // Show success message
            showNotification('Thank you for your message!', 'success');
        }, 1000);
    });
}

// ===========================
// Notification System
// ===========================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background-color: ${type === 'error' ? '#ff4757' : type === 'success' ? '#2ed573' : '#6366f1'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===========================
// Intersection Observer for Scroll Animations
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skill cards and other elements
const cards = document.querySelectorAll('.skill-card, .project-card, .timeline-content, .soft-skill, .contact-item');
cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.6s ease-out ${index * 0.05}s, transform 0.6s ease-out ${index * 0.05}s`;
    observer.observe(card);
});

// ===========================
// Number Counter Animation
// ===========================

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + '%';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '%';
        }
    };
    
    updateCounter();
}

// ===========================
// Add CSS Animations Dynamically
// ===========================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
    
    .nav-link.active {
        border-bottom: 2px solid #ec4899;
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background-color: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
        }
        
        .nav-menu.active {
            left: 0;
        }
    }
`;
document.head.appendChild(style);

// ===========================
// Parallax Scrolling Effect (Optional)
// ===========================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===========================
// Add Ripple Effect to Buttons
// ===========================

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: rippleAnimation 0.6s ease-out;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes rippleAnimation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ===========================
// Prevent Memory Leaks
// ===========================

window.addEventListener('beforeunload', () => {
    observer.disconnect();
});
