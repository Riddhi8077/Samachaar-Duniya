const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Admin = require("../Models/admin");

// Login (simple, )
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password)
        return res.status(400).json({ message: "Fill all fields" });

    const admin = await Admin.findOne({ username });
    if (!admin)
        return res.status(401).json({ message: "Invalid username or password" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
        return res.status(401).json({ message: "Invalid username or password" });

    // ✅ Just return success
    res.json({ message: "Login successful", adminId: admin._id });
});

// Initialize default admin (run once)
router.get("/create-default", async (req, res) => {
    const existingAdmin = await Admin.findOne({ username: "admin.samachar.com" });
    if (existingAdmin) return res.send("Admin already exists");

    const hashedPassword = await bcrypt.hash("Mkt@8077", 10);
    const admin = new Admin({
        username: "admin.samachar.com",
        password: hashedPassword
    });
    await admin.save();
    res.send("Default admin created!");
});

module.exports = router;
