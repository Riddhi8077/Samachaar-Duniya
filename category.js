// Get category from URL
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category') || "All";

// Show category title
document.getElementById("categoryName").textContent = category;

// Sample news data (can be replaced with your backend or array)
const newsData = [
  { title: "India Wins Test Series", category: "Sports", img: "images/news1.webp", desc: "Team India makes a historic win..." },
  { title: "New Blockbuster Movie Released", category: "Entertainment", img: "images/news2.webp", desc: "The latest Bollywood release sets records..." },
  { title: "AI Revolution in 2025", category: "Technology", img: "images/news3.webp", desc: "Experts predict AI will change the world..." }
];

// Filter news by category
const filteredNews = category === "All" 
    ? newsData 
    : newsData.filter(news => news.category.toLowerCase() === category.toLowerCase());

// Display news
const newsGrid = document.getElementById("categoryNewsGrid");
filteredNews.forEach(news => {
    const article = document.createElement("article");
    article.innerHTML = `
        <a href="news-details.html">
            <img src="${news.img}" alt="${news.title}">
            <h2>${news.title}</h2>
            <p>${news.desc}</p>
        </a>
    `;
    newsGrid.appendChild(article);
});
