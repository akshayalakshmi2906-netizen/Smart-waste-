import express from "express";
import Idea from "../models/Idea.js";
import Rewards from "../models/Reward.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

// POST: Create new idea
router.post("/", authMiddleware, async (req, res) => {
  try {
    const newIdea = new Idea({
      text: req.body.text,
      userId: req.user.id,
      userName: req.user.name,
    });
    const savedIdea = await newIdea.save();
    res.status(201).json({ message: "Idea submitted", idea: savedIdea });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: User ideas
router.get("/", authMiddleware, async (req, res) => {
  try {
    const ideas = await Idea.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(ideas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: All ideas (admin)
router.get("/all", adminMiddleware, async (req, res) => {
  try {
    const ideas = await Idea.find().sort({ createdAt: -1 });
    res.status(200).json(ideas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH: Update idea status and points (admin)
router.patch("/:id", adminMiddleware, async (req, res) => {
  const { status, points } = req.body;

  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) return res.status(404).json({ error: "Idea not found" });

    idea.status = status || idea.status;
    idea.points = points || idea.points;

    await idea.save();

    // Update rewards
    if (status === "accepted" && points) {
      const rewards = await Rewards.findOne({ userId: idea.userId }) || new Rewards({ userId: idea.userId });
      rewards.totalPoints = (rewards.totalPoints || 0) + points;
      await rewards.save();
    }

    res.status(200).json({ message: "Idea updated", idea });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
