// ==================== DOM ELEMENTS ==================== //
const searchInput = document.querySelector('.search-bar input');
const searchClear = document.querySelector('.search-bar i');
const navLinks = document.querySelectorAll('.nav-menu a');
const scrollToTopBtn = document.createElement('button');

// ==================== SEARCH FUNCTIONALITY ==================== //
if (searchInput && searchClear) {
    searchClear.addEventListener('click', () => {
        searchInput.value = '';
        searchInput.focus();
    });

    searchInput.addEventListener('input', (e) => {
        if (e.target.value.length > 0) {
            searchClear.style.display = 'block';
        } else {
            searchClear.style.display = 'none';
        }
    });
}

// ==================== SMOOTH SCROLL NAVIGATION ==================== //
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        if (targetId.startsWith('#')) {
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// ==================== SCROLL TO TOP BUTTON ==================== //
scrollToTopBtn.innerHTML = '<i class="fas fa-heart"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    left: 2rem;
    width: 50px;
    height: 50px;
    background-color: #d4a574;
    color: #1a1a1a;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    z-index: 99;
    transition: all 0.3s ease;
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.display = 'flex';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==================== HOVER EFFECTS FOR CARDS ==================== //
const trendingCards = document.querySelectorAll('.trending-card');
const foodItems = document.querySelectorAll('.food-item');
const recipeItems = document.querySelectorAll('.recipe-item');

trendingCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.boxShadow = '0 10px 30px rgba(212, 165, 116, 0.2)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = 'none';
    });
});

foodItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.boxShadow = '0 10px 30px rgba(212, 165, 116, 0.2)';
    });
    item.addEventListener('mouseleave', () => {
        item.style.boxShadow = 'none';
    });
});

// ==================== NEWSLETTER FORM ==================== //
const newsletterForm = document.querySelector('.newsletter-form');
const emailInput = document.querySelector('.form-group input');
const emailClear = document.querySelector('.form-group i');
const subscribeBtn = document.querySelector('.btn-subscribe');

if (emailInput && emailClear) {
    emailClear.addEventListener('click', () => {
        emailInput.value = '';
        emailInput.focus();
    });

    emailInput.addEventListener('input', (e) => {
        if (e.target.value.length > 0) {
            emailClear.style.display = 'block';
        } else {
            emailClear.style.display = 'none';
        }
    });
}

if (subscribeBtn) {
    subscribeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (emailInput && emailInput.value) {
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(emailInput.value)) {
                alert('Thank you for subscribing to FryCuisine!');
                emailInput.value = '';
                emailClear.style.display = 'none';
            } else {
                alert('Please enter a valid email address.');
            }
        }
    });
}

// ==================== LAZY LOADING FOR IMAGES ==================== //
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[src*="placeholder"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });

    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        imageObserver.observe(img);
    });
}

// ==================== ACTIVE NAVIGATION LINK ==================== //
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = '#d4a574';
        } else {
            link.style.color = '';
        }
    });
});

// ==================== ANIMATION ON SCROLL ==================== //
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add animation to elements
const elementsToAnimate = document.querySelectorAll('.trending-card, .recipe-item, .food-item, .guideline-card');
elementsToAnimate.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Add keyframe animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .scroll-to-top:hover {
        background-color: #a67c52 !important;
        transform: scale(1.1);
    }

    .nav-menu a.active {
        color: #d4a574;
    }
`;
document.head.appendChild(style);

// ==================== MOBILE MENU TOGGLE ==================== //
const createMobileMenu = () => {
    const navbar = document.querySelector('.navbar');
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile && !document.querySelector('.mobile-menu-toggle')) {
        const toggle = document.createElement('button');
        toggle.className = 'mobile-menu-toggle';
        toggle.innerHTML = '<i class="fas fa-bars"></i>';
        toggle.style.cssText = `
            background: none;
            border: none;
            color: #f5f5f5;
            font-size: 1.5rem;
            cursor: pointer;
            display: flex;
        `;
        
        const navMenu = document.querySelector('.nav-menu');
        navMenu.style.display = 'none';
        
        toggle.addEventListener('click', () => {
            if (navMenu.style.display === 'none') {
                navMenu.style.display = 'flex';
            } else {
                navMenu.style.display = 'none';
            }
        });
        
        navbar.appendChild(toggle);
    }
};

window.addEventListener('load', createMobileMenu);
window.addEventListener('resize', createMobileMenu);

// ==================== KEYBOARD NAVIGATION ==================== //
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (searchInput) {
            searchInput.value = '';
        }
        if (emailInput) {
            emailInput.value = '';
        }
    }
});

// ==================== INITIALIZE ==================== //
console.log('FryCuisine Website - JavaScript Loaded Successfully');
