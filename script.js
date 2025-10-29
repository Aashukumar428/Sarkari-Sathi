// ==========================
// NAVBAR TOGGLE & ACTIVE LINK
// ==========================
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

const links = Array.from(document.querySelectorAll('#nav-links a'));
links.forEach(link => {
  link.addEventListener('click', () => {
    links.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    if (navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
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
  if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
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

sideMenuToggle.addEventListener('click', () => {
  sideMenu.classList.add('open');
});

closeSideMenu.addEventListener('click', () => {
  sideMenu.classList.remove('open');
});

document.addEventListener('click', e => {
  if (!sideMenu.contains(e.target) && !sideMenuToggle.contains(e.target)) {
    sideMenu.classList.remove('open');
  }
});

// ==========================
// USER LOGIN MODAL
// ==========================
const loginBtn = document.getElementById('login-btn');
const userLoginModal = document.getElementById('login-modal');
const modalCloseBtn = document.getElementById('login-close');
const modalLoginConfirm = document.getElementById('modal-login-confirm');

// ===== Modal open/close =====
loginBtn.addEventListener('click', () => {
  userLoginModal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
});

modalCloseBtn.addEventListener('click', () => {
  userLoginModal.style.display = 'none';
  document.body.style.overflow = 'auto';
});

userLoginModal.addEventListener('click', e => {
  if (e.target === userLoginModal) {
    userLoginModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

// ===== Login confirm =====
modalLoginConfirm.addEventListener('click', () => {
  const usernameInput = document.getElementById('login-username');
  const username = usernameInput ? usernameInput.value.trim() : '';

  if (username.length > 0) {
    // TODO: integrate backend login / OTP verification here later
    console.log(`Login attempted for user: ${username}`);
    userLoginModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  } else {
    alert('Please enter a username before logging in.');
  }
});
