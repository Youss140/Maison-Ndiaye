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
  const subnavEl = document.querySelector('.subnav');
  const updateActive = () => {
    const refLine = (subnavEl?.getBoundingClientRect().bottom || 0) + 20;
    let current = targets[0];
    for (const t of targets) {
      if (t.getBoundingClientRect().top - refLine <= 0) current = t;
    }
    subnavLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current.id));
  };
  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();
}

// Contact form: envoi via Formspree (https://formspree.io)
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xyeygazq';

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const feedback = document.getElementById('form-feedback');
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    if (submitBtn) submitBtn.disabled = true;

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });

      if (feedback) {
        feedback.style.display = 'block';
        if (response.ok) {
          feedback.textContent = "Merci pour votre message, nous revenons vers vous rapidement.";
          contactForm.reset();
        } else {
          feedback.textContent = "Une erreur est survenue. Contactez-nous directement via les coordonnées ci-contre.";
        }
      }
    } catch (err) {
      if (feedback) {
        feedback.style.display = 'block';
        feedback.textContent = "Une erreur est survenue. Contactez-nous directement via les coordonnées ci-contre.";
      }
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
}
