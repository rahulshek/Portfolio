const menuBtn = document.getElementById('menuBtn');
const siteNav = document.getElementById('siteNav');
const themeToggle = document.getElementById('themeToggle');
const navLinks = document.querySelectorAll('.site-nav a');
const sections = document.querySelectorAll('main section[id]');
const revealItems = document.querySelectorAll('.reveal');

if (menuBtn && siteNav) {
  menuBtn.addEventListener('click', () => {
    const open = siteNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => observer.observe(item));

function setActiveLink() {
  let current = '';
  sections.forEach((section) => {
    const top = section.offsetTop - 100;
    const height = section.offsetHeight;
    if (window.scrollY >= top && window.scrollY < top + height) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${current}`;
    link.classList.toggle('active', isActive);
  });
}

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);

if (themeToggle) {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
  });
}

document.getElementById('year').textContent = new Date().getFullYear();