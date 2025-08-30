// Call on page load
// loadArticles();

window.addEventListener("load", () => {
  alert("Welcome to Samachaar Duniya! Stay tuned for the latest news.");
});

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links ul");

menuToggle?.addEventListener('click', () => {
  navLinks?.classList.toggle("active");
});

// Load More News Functionality
const getArticles = () => Array.from(document.querySelectorAll(".news-grid article"));
let visibleCount = 9; // Show first 9 initially

// Hide all articles except first visibleCount (if any exist)
getArticles().forEach((article, index) => {
  if (index >= visibleCount) {
    article.style.display = "none";
  }
});

const loadMoreBtn = document.getElementById("loadMoreBtn");
loadMoreBtn?.addEventListener("click", () => {
  const articles = getArticles();
  const hiddenArticles = articles.filter(article => article.style.display === "none");

  hiddenArticles.slice(0, 3).forEach(article => {
    article.style.display = "block";
  });

  // Hide button if no more articles
  if (hiddenArticles.length <= 3) {
    loadMoreBtn.style.display = "none";
  }
});

// Category Filtering
const tabButtons = document.querySelectorAll(".tab-button");

tabButtons.forEach(button => {
  button.addEventListener("click", () => {
    // Remove active from all buttons
    tabButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const category = button.getAttribute("data-category");

    getArticles().forEach(article => {
      if (category === "all" || article.dataset.category === category) {
        article.style.display = "block";
      } else {
        article.style.display = "none";
      }
    });
  });
});

// Sticky Header Shadow Effect
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header?.classList.add("scrolled");
  } else {
    header?.classList.remove("scrolled");
  }
});

// =========================
// Dark Mode Toggle Script
// =========================
const darkToggle = document.getElementById("darkModeToggle");

// Load saved mode
if (darkToggle && localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  darkToggle.textContent = "☀️";
}

darkToggle?.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    darkToggle.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    darkToggle.textContent = "🌙";
  }
});

// =========================
// Live Date & Time Script
// =========================
function updateDateTime() {
  const now = new Date();

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const liveDate = document.getElementById('liveDate');
  const liveTime = document.getElementById('liveTime');

  if (liveDate) liveDate.textContent = now.toLocaleDateString('en-IN', options);

  const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
  if (liveTime) liveTime.textContent = now.toLocaleTimeString('en-IN', timeOptions);
}

// Update immediately and then every second
updateDateTime();
setInterval(updateDateTime, 1000);

// =========================
// Back to Top Button
// =========================
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (!backToTop) return;
  if (window.scrollY > 300) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
});

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// =========================
// Newsletter Popup Logic
// =========================
const newsletterModal = document.getElementById("newsletterModal");
const closeNewsletter = document.getElementById("closeNewsletter");
const newsletterForm = document.getElementById("newsletterForm");

// Show popup after 5 seconds (only if element exists)
if (newsletterModal) {
  setTimeout(() => {
    newsletterModal.style.display = "flex";
  }, 5000);
}

// Close popup on X click
closeNewsletter?.addEventListener("click", () => {
  if (newsletterModal) newsletterModal.style.display = "none";
});

// Close popup on outside click
window.addEventListener("click", (e) => {
  if (newsletterModal && e.target === newsletterModal) {
    newsletterModal.style.display = "none";
  }
});

// Fake subscription alert (only if form exists)
if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you for subscribing!");
    if (newsletterModal) newsletterModal.style.display = "none";
  });
}

// ===============================
// Dynamic Related Articles
// ===============================

document.addEventListener("DOMContentLoaded", function () {
  const relatedGrid = document.getElementById('relatedGrid');

  // Only run on news-details.html page
  if (relatedGrid) {
    // 1️⃣ Get current article category (from a hidden meta tag or data-attr)
    const currentArticle = document.querySelector('article[data-category]');
    const currentCategory = currentArticle ? currentArticle.dataset.category : null;

    // 2️⃣ Get all articles from homepage (simulate related articles)
    const allArticles = document.querySelectorAll('.news-grid article');

    // 3️⃣ Filter related articles (same category but not the current one)
    const relatedArticles = [];
    allArticles.forEach(article => {
      if (article.dataset.category === currentCategory && relatedArticles.length < 3) {
        const imgEl = article.querySelector('img');
        const titleEl = article.querySelector('.news-title');
        const linkEl = article.querySelector('a');

        const img = imgEl ? imgEl.src : '';
        const title = titleEl ? titleEl.textContent : '';
        const link = linkEl ? linkEl.href : '#';

        relatedArticles.push({ img, title, link });
      }
    });

    // 4️⃣ Render related articles
    relatedGrid.innerHTML = relatedArticles.map(article => `
      <article>
        <a href="${article.link}">
          <img src="${article.img}" alt="${article.title}">
          <h4>${article.title}</h4>
        </a>
      </article>
    `).join('');
  }
});

// =========================
// TOP STORIES SLIDER INIT
// =========================
document.addEventListener("DOMContentLoaded", function () {
  try {
    if (typeof Swiper !== "undefined") {
      new Swiper(".topStoriesSlider", {
        loop: true, // Infinite loop
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        effect: "slide",
        grabCursor: true,
      });
    } else {
      // Swiper not loaded; skip initialization
      // console.warn("Swiper not found. Skipping slider init.");
    }
  } catch (e) {
    console.error("Error initializing slider:", e);
  }
});

// sidebar
document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll('.sidebar-tabs button');
  const tabContents = document.querySelectorAll('.sidebar-content');

  if (!tabButtons.length || !tabContents.length) return;

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      tabContents.forEach(content => content.style.display = 'none');

      const target = button.getAttribute('data-target');
      const el = document.getElementById(target);
      if (el) el.style.display = 'block';
    });
  });
});

// =========================
// READING PROGRESS BAR
// =========================
document.addEventListener("scroll", function () {
  const progressBar = document.getElementById("readingProgress");
  if (!progressBar) return; // Only run on article pages

  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  progressBar.style.width = scrollPercent + "%";
});

document.querySelector('.menu-toggle')?.addEventListener('click', function () {
  document.querySelector('.nav-links')?.classList.toggle('active');
});

// ===============================
// GLOBAL + LIVE SEARCH WITH HIGHLIGHT & NO RESULTS MESSAGE
// ===============================
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const noResults = document.getElementById("noResults"); // Ensure <p id="noResults"></p> exists

  // ===============================
  // Highlight function
  // ===============================
  function highlightText(text, search) {
    if (!search) return text;
    const regex = new RegExp(`(${search})`, "gi");
    return text.replace(regex, `<mark>$1</mark>`);
  }

  // ===============================
  // Live search function
  // ===============================
  function handleSearch() {
    if (!searchInput) return;

    const filter = searchInput.value.toLowerCase();
    let matches = 0;

    const articles = getArticles();
    articles.forEach((article) => {
      const titleElement = article.querySelector(".news-title");
      const descElement = article.querySelector("p");

      const titleText = titleElement ? titleElement.textContent : "";
      const descText = descElement ? descElement.textContent : "";

      const isMatch =
        titleText.toLowerCase().includes(filter) ||
        descText.toLowerCase().includes(filter);

      if (isMatch) {
        matches++;
        article.style.display = "";
        if (titleElement) titleElement.innerHTML = highlightText(titleText, filter);
        if (descElement) descElement.innerHTML = highlightText(descText, filter);
      } else {
        article.style.display = "none";
        if (titleElement) titleElement.innerHTML = titleText;
        if (descElement) descElement.innerHTML = descText;
      }
    });

    // Show/hide "No Results Found"
    if (noResults) {
      noResults.style.display = matches === 0 && filter !== "" ? "block" : "none";
    }
  }

  // ===============================
  // Input listeners
  // ===============================
  if (searchInput) {
    // Live search
    searchInput.addEventListener("input", handleSearch);

    // Enter key triggers global search
    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query) {
          localStorage.setItem("searchQuery", query);
          window.location.href = "index.html";
        }
      }
    });

    // Check LocalStorage for cross-page search
    const storedQuery = localStorage.getItem("searchQuery");
    if (storedQuery) {
      searchInput.value = storedQuery;
      localStorage.removeItem("searchQuery");
      handleSearch();
    }
  }

  // Mobile search overlay manager (wrapped and guarded)
  (function () {
    const toggle = document.querySelector(".search-toggle");
    const searchForm = document.querySelector(".search-form");
    const headerWrapper =
      document.querySelector(".header-wrapper") || document.querySelector("header");

    if (!toggle || !searchForm || !headerWrapper) {
      // console.warn("Mobile search overlay: missing required element(s).");
      return;
    }

    const searchInputLocal = document.getElementById("searchInput");

    // Create overlay/panel if not already present
    let overlay = document.getElementById("mobile-search-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "mobile-search-overlay";
      const panel = document.createElement("div");
      panel.className = "mobile-search-panel";

      const closeBtn = document.createElement("button");
      closeBtn.type = "button";
      closeBtn.className = "mobile-search-close";
      closeBtn.setAttribute("aria-label", "Close search");
      closeBtn.innerText = "✕";

      panel.appendChild(closeBtn);
      overlay.appendChild(panel);
      document.body.appendChild(overlay);

      overlay._panel = panel;
      overlay._closeBtn = closeBtn;
    }

    const panel = overlay._panel;
    const closeBtn = overlay._closeBtn;

    const placeholder = document.createElement("div");
    placeholder.className = "search-placeholder";
    searchForm.parentNode.insertBefore(placeholder, searchForm);

    function positionPanelUnderHeader() {
      const rect = headerWrapper.getBoundingClientRect();
      panel.style.top = Math.round(rect.bottom + 6) + "px"; // 6px gap
    }

    function openOverlay() {
      if (searchForm.parentNode !== panel) panel.insertBefore(searchForm, closeBtn);
      positionPanelUnderHeader();
      overlay.classList.add("open");
      if (searchInputLocal) setTimeout(() => searchInputLocal.focus(), 60);
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    }

    function closeOverlay() {
      if (placeholder.parentNode)
        placeholder.parentNode.insertBefore(searchForm, placeholder);
      overlay.classList.remove("open");
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      toggle.focus();
    }

    toggle.addEventListener("click", function (ev) {
      ev.preventDefault();
      ev.stopPropagation();
      if (overlay.classList.contains("open")) closeOverlay();
      else openOverlay();
    });

    closeBtn.addEventListener("click", closeOverlay);

    overlay.addEventListener("click", function (ev) {
      if (ev.target === overlay) closeOverlay();
    });

    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" && overlay.classList.contains("open"))
        closeOverlay();
    });

    window.addEventListener("resize", function () {
      if (overlay.classList.contains("open")) positionPanelUnderHeader();
    });
    window.addEventListener("scroll", function () {
      if (overlay.classList.contains("open")) positionPanelUnderHeader();
    });
  })();
});

// ===============================
// FETCH NEWS FROM BACKEND & RENDER CARDS
// ===============================
async function loadNews() {
  try {
    const res = await fetch("http://localhost:5000/api/news");
    const newsList = await res.json();

    const container = document.getElementById("news-container");
    if (!container) return;

    container.innerHTML = "";

    newsList.forEach(item => {
      const div = document.createElement("div");
      div.classList.add("news-item");
      div.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.content}</p>
        <small>${item.category || "General"}</small>
      `;
      container.appendChild(div);
    });

    // After rendering news, adjust load-more visibility and hidden items
    const articles = getArticles();
    articles.forEach((article, index) => {
      article.style.display = (index < visibleCount) ? "block" : "none";
    });
    if (articles.filter(a => a.style.display === "none").length === 0) {
      loadMoreBtn?.style.display = "none";
    } else {
      if (loadMoreBtn) loadMoreBtn.style.display = "block";
    }
  } catch (err) {
    console.error("Error loading news:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadNews);


async function loadNews() {
  try {
    const response = await fetch("http://localhost:5000/api/news");
    const data = await response.json();

    const container = document.getElementById("news-container");
    container.innerHTML = ""; // Clear old news

    if (data.length === 0) {
      container.innerHTML = "<p>No news available.</p>";
      return;
    }

    data.forEach(item => {
      const div = document.createElement("div");
      div.classList.add("news-item");
      div.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.content}</p>
        <small>Category: ${item.category} | ${new Date(item.createdAt).toLocaleString()}</small>
      `;
      container.appendChild(div);
    });

  } catch (err) {
    console.error("Error loading news:", err);
  }
}

// Call function on page load
document.addEventListener("DOMContentLoaded", loadNews);

const newsContainer = document.getElementById("news-container");

fetch("http://localhost:5000/api/news")
  .then(res => res.json())
  .then(news => {
    newsContainer.innerHTML = news.map(n => `
      <div class="news-item">
        <img src="${n.image}" alt="${n.title}" style="width:100%; height:auto;">
        <h3>${n.title}</h3>
        <p>${n.description}</p>
      </div>
    `).join("");
  })
  .catch(err => console.error("Error fetching news:", err));

  