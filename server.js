const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const newsRoutes = require("./routes/news");

const app = express(); // ✅ must be created first

// ✅ CORS middleware
app.use(cors({
  origin: "http://127.0.0.1:5500", // frontend origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ✅ Middleware
app.use(express.json()); // parse JSON
app.use(express.urlencoded({ extended: true })); // parse URL-encoded
app.use(express.static("public"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Debug logs
console.log("✅ Loading routes:");
console.log(" - Auth routes from ./routes/auth.js");
console.log(" - News routes from ./routes/news.js");

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);
console.log("✅ Routes registered: /api/auth, /api/news");

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.log("❌ MongoDB error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
