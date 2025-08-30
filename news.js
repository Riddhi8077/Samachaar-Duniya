
// routes/news.js
const express = require("express");
const router = express.Router();
const News = require("../Models/news");
const multer = require("multer");
const path = require("path");

// ---------- Multer storage (save to /uploads) ----------
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const safeName = Date.now() + "-" + file.originalname.replace(/\s+/g, "-");
    cb(null, safeName);
  }
});

// Optional: file filter & size limit
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) return cb(null, true);
    cb(new Error("Only images (jpg, png, gif) are allowed"));
  }
});


// ---------- GET all news ----------
router.get("/", async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: "Error fetching news", error: err.message });
  }
});

// ---------- JSON POST (kept) - create without file, accepts image URL if provided ----------
router.post("/", async (req, res) => {
  try {
    const { title, content, category, image } = req.body; // image is optional URL
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }
    const news = new News({ title, content, category, image: image || null });
    await news.save();
    res.json({ message: "✅ News added successfully!", news });
  } catch (err) {
    res.status(500).json({ message: "Error adding news", error: err.message });
  }
});

// ---------- Multipart POST (/create) - supports file OR URL ----------
router.post("/create", upload.single("image"), async (req, res) => {
  try {
    const { title, content, category, imageUrl } = req.body; // imageUrl is optional text field
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    // Prefer uploaded file; fallback to URL from imageUrl (if provided)
    const imagePath = req.file
      ? `/uploads/${req.file.filename}`
      : (imageUrl && imageUrl.trim() ? imageUrl.trim() : null);

    const news = new News({ title, content, category, image: imagePath });
    await news.save();

    res.json({ message: "✅ News added successfully!", news });
  } catch (err) {
    res.status(500).json({ message: "Error adding news", error: err.message });
  }
});

// ---------- UPDATE ----------
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, content, category, imageUrl } = req.body;

    const updateData = { };
    if (typeof title    !== "undefined") updateData.title = title;
    if (typeof content  !== "undefined") updateData.content = content;
    if (typeof category !== "undefined") updateData.category = category;

    // If new file uploaded, override image; else if a URL provided, set that
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    } else if (typeof imageUrl !== "undefined") {
      updateData.image = imageUrl && imageUrl.trim() ? imageUrl.trim() : null;
    }

    const updated = await News.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updated) return res.status(404).json({ message: "News not found" });

    res.json({ message: "News updated successfully", updated });
  } catch (err) {
    res.status(500).json({ message: "Error updating news", error: err.message });
  }
});

// ---------- DELETE ----------
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await News.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "News not found" });
    res.json({ message: "News deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting news", error: err.message });
  }
});

router.post("/", async (req, res) => {
  console.log("POST /api/news received:", req.body); // <-- test line
  // existing code
});

module.exports = router;
