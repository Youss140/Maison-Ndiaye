// Header: solid background on scroll
const header = document.querySelector('.site-header');
function onScroll() {
  if (!header) return;
  if (window.scrollY > 60) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
}
window.addEventListener('scroll', onScroll);
onScroll();

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    document.body.style.overflow = mainNav.classList.contains('open') ? 'hidden' : '';
  });
  mainNav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}


// Hero two-state: exterior <-> interior
const stateExterior = document.querySelector('.hero-state--exterior');
const stateInterior = document.querySelector('.hero-state--interior');
const enterBtn = document.getElementById('enter-interior');
const backBtn = document.getElementById('back-exterior');

if (enterBtn && stateExterior && stateInterior) {
  enterBtn.addEventListener('click', () => {
    stateExterior.classList.remove('active');
    stateInterior.classList.add('active');
  });
}
if (backBtn && stateExterior && stateInterior) {
  backBtn.addEventListener('click', () => {
    stateInterior.classList.remove('active');
    stateExterior.classList.add('active');
  });
}


// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in'));
}

// Subnav active state on scroll (anchor sections)
const subnavLinks = document.querySelectorAll('.subnav a[href^="#"]');
if (subnavLinks.length) {
  const targets = Array.from(subnavLinks).map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const io2 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = '#' + entry.target.id;
      const link = document.querySelector(`.subnav a[href="${id}"]`);
      if (!link) return;
      if (entry.isIntersecting) {
        subnavLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });
  targets.forEach(t => io2.observe(t));
}

// Contact form: front-end only stub (no backend configured yet)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const feedback = document.getElementById('form-feedback');
    if (feedback) {
      feedback.textContent = "Merci pour votre message. Ce formulaire est en cours de configuration : contactez-nous directement en attendant via les coordonnées ci-contre.";
      feedback.style.display = 'block';
    }
    contactForm.reset();
  });
}
