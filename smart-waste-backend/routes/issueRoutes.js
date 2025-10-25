// backend/routes/issueRoutes.js
import express from "express";
import {
  reportIssue,
  getMyIssues,
  getAllIssues,
  updateIssue,
} from "../controllers/issueController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

// 🔎 Debug route
router.get("/test", (req, res) => {
  res.json({ ok: true, message: "Issue routes are mounted ✅" });
});

// 📝 User reports issue
router.post("/", authMiddleware, reportIssue);

// 👤 User views only their issues
router.get("/my-issues", authMiddleware, getMyIssues);

// 👑 Admin views all issues
router.get("/all", adminMiddleware, getAllIssues);

// 👑 Admin updates issue status or reply
router.put("/:id", adminMiddleware, updateIssue);

export default router;
