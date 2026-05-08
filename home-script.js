// ==================== DOM ELEMENTS ==================== //
const searchInput = document.querySelector('.search-bar input');
const searchClear = document.querySelector('.search-bar i');
const navLinks = document.querySelectorAll('.nav-link');
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
        
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        // Add active class to clicked link
        link.classList.add('active');
        
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

    // Update active nav link based on scroll position
    updateActiveNavLink();
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==================== UPDATE ACTIVE NAV LINK ==================== //
function updateActiveNavLink() {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ==================== HOVER EFFECTS FOR CARDS ==================== //
const trendingCards = document.querySelectorAll('.trending-card');

trendingCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// ==================== READ MORE LINK CLICK ==================== //
const readMoreLinks = document.querySelectorAll('.read-more');

readMoreLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        // You can add navigation logic here
        alert('Article coming soon!');
    });
});

// ==================== BUTTON CLICK HANDLERS ==================== //
const buttons = document.querySelectorAll('.btn');

buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const text = btn.querySelector('span').textContent;
        
        // Scroll to corresponding section
        if (text.includes('World')) {
            const worldSection = document.querySelector('#world-cuisine');
            if (worldSection) {
                worldSection.scrollIntoView({ behavior: 'smooth' });
            }
        } else if (text.includes('Diet')) {
            const dietSection = document.querySelector('#diet');
            if (dietSection) {
                dietSection.scrollIntoView({ behavior: 'smooth' });
            }
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
const elementsToAnimate = document.querySelectorAll('.trending-card');
elementsToAnimate.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ==================== KEYBOARD NAVIGATION ==================== //
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (searchInput) {
            searchInput.value = '';
            searchClear.style.display = 'none';
        }
    }
});

// ==================== PAGE LOAD INITIALIZATION ==================== //
window.addEventListener('load', () => {
    // Set initial active nav link
    updateActiveNavLink();
    
    // Add scroll to top button hover effect
    scrollToTopBtn.addEventListener('mouseenter', () => {
        scrollToTopBtn.style.backgroundColor = '#a67c52';
        scrollToTopBtn.style.transform = 'scale(1.1)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', () => {
        scrollToTopBtn.style.backgroundColor = '#d4a574';
        scrollToTopBtn.style.transform = 'scale(1)';
    });
});

// ==================== INITIALIZE ==================== //
console.log('FryCuisine Homepage - JavaScript Loaded Successfully');
