// backend/routes/adminRoutes.js
import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// POST /api/admin/login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // ✅ Hardcoded admin credentials
  if (email === "admin@gmail.com" && password === "admin") {
    // Sign JWT with role = admin
    const token = jwt.sign(
      { role: "admin", email },
      process.env.JWT_SECRET || "supersecretkey",
      { expiresIn: "1h" }
    );

    return res.json({ success: true, token });
  }

  return res.status(401).json({ error: "Invalid admin credentials" });
});

export default router;
