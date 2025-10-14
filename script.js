// Theme toggle with localStorage
const themeBtn = document.getElementById('themeBtn');
const root = document.documentElement;

function setTheme(mode) {
  if (mode === 'light') { document.body.classList.add('light'); themeBtn.textContent = '☀️'; }
  else { document.body.classList.remove('light'); themeBtn.textContent = '🌙'; }
  localStorage.setItem('theme', mode);
}

setTheme(localStorage.getItem('theme') || 'dark');
themeBtn.addEventListener('click', () => {
  const next = document.body.classList.contains('light') ? 'dark' : 'light';
  setTheme(next);
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navList = document.getElementById('navList');
navToggle.addEventListener('click', () => {
  const open = navList.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});

// Active link highlighting on scroll
const links = Array.from(document.querySelectorAll('.nav__list a'));
const sections = links.map(a => document.querySelector(a.getAttribute('href')));
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = '#' + entry.target.id;
    const link = links.find(a => a.getAttribute('href') === id);
    if (entry.isIntersecting) {
      links.forEach(l => l.classList.remove('active'));
      link?.classList.add('active');
    }
  });
}, { threshold: .6 });
sections.forEach(sec => sec && observer.observe(sec));

// Simple reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const revObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('show'); revObs.unobserve(e.target); } });
}, { threshold: .2 });
revels = Array.from(reveals).forEach(el => revObs.observe(el));

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Contact form: use mailto
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const msg = document.getElementById('message').value.trim();
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${msg}`);
  window.location.href = `mailto:mindsetbyaftab@gmail.com?subject=Portfolio Inquiry&body=${body}`;
});
