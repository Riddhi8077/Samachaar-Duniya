// login.js - frontend-only auth (localStorage). Fallback fixed master credentials included.
document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const showLogin = document.getElementById('showLogin');
  const showRegister = document.getElementById('showRegister');
  const loginMsg = document.getElementById('loginMsg');
  const regMsg = document.getElementById('regMsg');
  const backToSite = document.getElementById('backToSite');

  const FIXED_USER = 'admin@samachaar.com';
  const FIXED_PASS = 'Mkt@8077'; // exact fixed fallback

  // Toggle tabs
  function setActiveTab(tab) {
    if (tab === 'login') {
      loginForm.classList.remove('hidden');
      registerForm.classList.add('hidden');
      showLogin.classList.add('active');
      showRegister.classList.remove('active');
    } else {
      loginForm.classList.add('hidden');
      registerForm.classList.remove('hidden');
      showLogin.classList.remove('active');
      showRegister.classList.add('active');
    }
    loginMsg.textContent = regMsg.textContent = '';
  }

  showLogin.addEventListener('click', () => setActiveTab('login'));
  showRegister.addEventListener('click', () => setActiveTab('register'));
  backToSite.addEventListener('click', () => { window.location.href = '../index.html'; });

  // Helpers
  function saveCreds(obj) {
    localStorage.setItem('adminCreds', JSON.stringify(obj));
  }
  function getCreds() {
    try { return JSON.parse(localStorage.getItem('adminCreds') || 'null'); } catch(e){ return null; }
  }

  // ✅ Login submit 
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    // --- First try backend login ---
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok) {
        loginMsg.style.color = '#2a7a2a';
        loginMsg.textContent = 'Login successful — Redirecting to dashboard...';
        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 600);
        return; // success
      }
    } catch (err) {
      console.warn("Backend login failed, falling back:", err);
    }

    // --- Fallback: check stored or fixed creds ---
    const stored = getCreds();
    const okStored = stored && username === stored.username && password === stored.password;
    const okFixed  = username === FIXED_USER && password === FIXED_PASS;

    if (okStored || okFixed) {
      loginMsg.style.color = '#2a7a2a';
      loginMsg.textContent = 'Login successful (fallback) — Redirecting to dashboard...';
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 600);
    } else {
      loginMsg.style.color = '#c0392b';
      loginMsg.textContent = 'Invalid username or password.';
    }
  });

  // Register submit (stores creds to localStorage)
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('regUsername').value.trim();
    const pass = document.getElementById('regPassword').value;
    const confirm = document.getElementById('regConfirm').value;

    if (!username || !pass) {
      regMsg.style.color = '#c0392b'; 
      regMsg.textContent = 'Both fields required.'; 
      return;
    }
    if (pass !== confirm) {
      regMsg.style.color = '#c0392b'; 
      regMsg.textContent = 'Passwords do not match.'; 
      return;
    }
    // Save credentials (demo only)
    saveCreds({ username, password: pass });
    regMsg.style.color = '#2a7a2a';
    regMsg.textContent = 'Registered successfully. You can now login.';
    // switch to login tab
    setTimeout(() => setActiveTab('login'), 900);
  });
});
