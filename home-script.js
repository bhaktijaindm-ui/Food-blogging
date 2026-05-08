const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id], footer[id]');
const progress = document.querySelector('#scroll-progress');
const searchInput = document.querySelector('.search-bar input');
const searchClear = document.querySelector('.search-clear');
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');
const loveButton = document.querySelector('.love-button');
const newsletter = document.querySelector('.newsletter-form');

function setProgress() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    progress.style.width = `${percent}%`;
}

function setActiveLink() {
    let currentId = 'home';
    sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 170) {
            currentId = section.id;
        }
    });

    navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
}

function closeMenu() {
    navMenu.classList.remove('open');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
}

navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        const href = link.getAttribute('href');
        if (!href.startsWith('#')) return;
        event.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        closeMenu();
    });
});

mobileToggle.addEventListener('click', () => {
    const expanded = mobileToggle.getAttribute('aria-expanded') === 'true';
    mobileToggle.setAttribute('aria-expanded', String(!expanded));
    navMenu.classList.toggle('open', !expanded);
    document.body.classList.toggle('menu-open', !expanded);
});

searchInput.addEventListener('input', () => {
    searchClear.style.visibility = searchInput.value.trim() ? 'visible' : 'hidden';
});

searchClear.addEventListener('click', () => {
    searchInput.value = '';
    searchClear.style.visibility = 'hidden';
    searchInput.focus();
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.14, rootMargin: '0px 0px -70px 0px' });

document.querySelectorAll('.section-animate').forEach((item) => revealObserver.observe(item));

newsletter.addEventListener('submit', (event) => {
    event.preventDefault();
    const toast = document.createElement('div');
    toast.textContent = 'Thank you for joining FryCuisine!';
    toast.style.cssText = 'position:fixed;left:50%;bottom:26px;transform:translateX(-50%);z-index:4000;background:#1f1f1f;color:#fff;padding:13px 22px;border-radius:999px;font-family:Poppins,sans-serif;font-weight:700;box-shadow:0 12px 30px rgba(0,0,0,.25);';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
    newsletter.reset();
});

loveButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeMenu();
        searchInput.value = '';
        searchClear.style.visibility = 'hidden';
    }
});

window.addEventListener('scroll', () => {
    setProgress();
    setActiveLink();
}, { passive: true });

window.addEventListener('load', () => {
    document.querySelector('#home')?.classList.add('visible');
    searchClear.style.visibility = 'hidden';
    setProgress();
    setActiveLink();
});
