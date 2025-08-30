const upload = require("../middleware/upload");
const express = require("express");
const router = express.Router();
const Article = require("../Models/article");

// ✅ Create Article with Image (public for now)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, content, category, author } = req.body;
    const image = req.file ? req.file.filename : null;

    const article = new Article({ title, content, category, author, image });
    await article.save();

    res.json({ message: "✅ Article created successfully", article });
  } catch (err) {
    res.status(500).json({ message: "Error creating article", error: err.message });
  }
});

// ✅ Get All Articles (Public)
router.get("/", async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: "Error fetching articles", error: err.message });
  }
});

// ✅ Get Single Article by ID
router.get("/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: "Error fetching article", error: err.message });
  }
});

// ✅ Update Article (public for now)
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, content, category, author } = req.body;
    const updateData = { title, content, category, author };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedArticle) return res.status(404).json({ message: "Article not found" });

    res.json({ message: "✅ Article updated successfully", updatedArticle });
  } catch (err) {
    res.status(500).json({ message: "Error updating article", error: err.message });
  }
});

// ✅ Delete Article (public for now)
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Article.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Article not found" });
    res.json({ message: "✅ Article deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting article", error: err.message });
  }
});

module.exports = router;
