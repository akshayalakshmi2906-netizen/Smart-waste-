import express from "express";
import Rewards from "../models/Reward.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET: Get current user's rewards
router.get("/", authMiddleware, async (req, res) => {
  try {
    let rewards = await Rewards.findOne({ userId: req.user.id });

    if (!rewards) {
      // If no rewards yet, create default 0
      rewards = new Rewards({ userId: req.user.id, totalPoints: 0 });
      await rewards.save();
    }

    res.status(200).json({ totalPoints: rewards.totalPoints });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
