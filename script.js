// ==========================
// NAVBAR TOGGLE & ACTIVE LINK
// ==========================
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

const links = Array.from(document.querySelectorAll('#nav-links a'));
links.forEach(link => {
  link.addEventListener('click', () => {
    links.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    if (navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  link.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      link.click();
      link.focus();
    }
  });
});

document.addEventListener('click', e => {
  if (navLinks && menuToggle && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});

window.addEventListener('load', () => {
  const hash = location.hash.slice(1);
  if (hash) {
    const match = links.find(l => l.getAttribute('href').slice(1) === hash);
    if (match) {
      links.forEach(l => l.classList.remove('active'));
      match.classList.add('active');
    }
  }
});

// ==========================
// SIDE MENU TOGGLE
// ==========================
const sideMenuToggle = document.getElementById('side-menu-toggle');
const sideMenu = document.getElementById('side-menu');
const closeSideMenu = document.getElementById('close-side-menu');

if (sideMenuToggle && sideMenu) {
  sideMenuToggle.addEventListener('click', () => {
    sideMenu.classList.add('open');
    sideMenu.setAttribute('aria-hidden', 'false');
    // optional: move focus into side-menu for accessibility
    const first = sideMenu.querySelector('button, a, input');
    if (first) first.focus();
  });
}

if (closeSideMenu && sideMenu) {
  closeSideMenu.addEventListener('click', () => {
    sideMenu.classList.remove('open');
    sideMenu.setAttribute('aria-hidden', 'true');
    if (sideMenuToggle) sideMenuToggle.focus();
  });
}

// close side menu when clicking outside
document.addEventListener('click', e => {
  if (sideMenu && sideMenuToggle && sideMenu.classList.contains('open') &&
      !sideMenu.contains(e.target) && !sideMenuToggle.contains(e.target)) {
    sideMenu.classList.remove('open');
    sideMenu.setAttribute('aria-hidden', 'true');
  }
});

// ==========================
// LOGIN MODAL OPEN/CLOSE (FIX: add/remove body.modal-open)
// ==========================
const loginBtn = document.getElementById('login-btn');       // button inside side menu
const userLoginModal = document.getElementById('login-modal');
const modalCloseBtn = document.getElementById('login-close');
const loginCancel = document.getElementById('login-cancel');
const signupCancel = document.getElementById('signup-cancel');

function openModal() {
  if (!userLoginModal) return;
  userLoginModal.style.display = 'flex';
  userLoginModal.setAttribute('aria-hidden', 'false');

  // crucial: add this class so CSS blurs only background elements
  document.body.classList.add('modal-open');
  document.body.style.overflow = 'hidden';

  // focus first input
  const first = userLoginModal.querySelector('input');
  if (first) first.focus();
}

function closeModal() {
  if (!userLoginModal) return;
  userLoginModal.style.display = 'none';
  userLoginModal.setAttribute('aria-hidden', 'true');

  // remove blur state
  document.body.classList.remove('modal-open');
  document.body.style.overflow = 'auto';
}

// open modal when login button clicked
if (loginBtn) {
  loginBtn.addEventListener('click', () => {
    // ensure side menu closes when opening modal (optional)
    if (sideMenu) {
      sideMenu.classList.remove('open');
      sideMenu.setAttribute('aria-hidden', 'true');
    }
    openModal();
  });
}

// close modal events
if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
if (loginCancel) loginCancel.addEventListener('click', closeModal);
if (signupCancel) signupCancel.addEventListener('click', closeModal);

// click outside modal window => close
if (userLoginModal) {
  userLoginModal.addEventListener('click', (e) => {
    if (e.target === userLoginModal) closeModal();
  });
}

// close modal on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (userLoginModal && userLoginModal.style.display === 'flex') closeModal();
  }
});

// ==========================
// Keep login button visible / avatar behavior left unchanged
// (I purposely did not add localStorage or avatar dropdown logic here because you asked
// not to change other parts. Add your own logic below if/when needed.)
// ==========================
window.addEventListener('DOMContentLoaded', () => {
  // no-op here — keep previous init behavior untouched
});

document.getElementById("login-btn").addEventListener("click", () => {
  document.getElementById("login-modal").classList.add("active");
});

document.getElementById("login-close").addEventListener("click", () => {
  document.getElementById("login-modal").classList.remove("active");
});
