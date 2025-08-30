const backendURL = "http://localhost:5000";

// ✅ Show one section at a time
function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ✅ Logout function
function logoutAdmin() {
  alert("Logged out");
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {
  // ✅ Handle Add News form submit
  const newsForm = document.getElementById("addNewsForm");
  if (newsForm) {
      newsForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("Submit clicked"); // <-- test line
  // existing code here
      

      const title = document.getElementById("title").value;
      const content = document.getElementById("content").value;
      const category = document.getElementById("category").value;

      try {
        const res = await fetch("http://localhost:5000/api/news", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, content, category })
        });

        const data = await res.json();

        if (res.ok) {
          alert("✅ News added successfully!");
          newsForm.reset();
        } else {
          alert(data.message || "❌ Error adding news");
        }
      } catch (err) {
        console.error("Error:", err);
        alert("Something went wrong!");
      }
    });
  }

  newsForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("Submit clicked"); // <-- test line
  // existing code here
});

  // ✅ Logout button
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logoutAdmin);
  }
});

// ✅ Toast function
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  if (!toast) {
    alert(message); // fallback if no toast element
    return;
  }
  toast.innerText = message;
  toast.style.background = type === "success" ? "#28a745" : "#dc3545";
  toast.className = "toast show";
  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 3000);
}

const newsContainer = document.getElementById("news-container");

fetch("http://localhost:5000/api/news")
  .then(res => res.json())
  .then(news => {
    newsContainer.innerHTML = news.map(n => `
      <div class="news-item">
        ${n.image ? `<img src="${n.image}" alt="${n.title}" style="width:100%">` : ""}
        <h3>${n.title}</h3>
        <p>${n.content}</p>
      </div>
    `).join("");
  })
  .catch(err => console.error(err));

  fetch("http://localhost:5000/api/news")
  .then(res => res.json())
  .then(news => {
    newsContainer.innerHTML = news.map(n => `
      <div class="news-item">
        ${n.image ? `<img src="${n.image}" alt="${n.title}">` : ""}
        <h3>${n.title}</h3>
        <p>${n.content}</p>
      </div>
    `).join("");
  })
  .catch(err => console.error(err));
