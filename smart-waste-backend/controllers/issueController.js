// backend/controllers/IssueController.js
import Issue from "../models/Issue.js";

/**
 * @desc  User reports a new issue
 * @route POST /api/issues
 * @access User
 */
export const reportIssue = async (req, res) => {
  try {
    const { name, location, issue } = req.body;

    if (!name || !location || !issue) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newIssue = await Issue.create({
      user: req.user._id, // from authMiddleware
      name,
      location,
      issue,
    });

    res.status(201).json(newIssue);
  } catch (err) {
    console.error("❌ Error in reportIssue:", err);
    res.status(500).json({ message: "Server error while reporting issue" });
  }
};

/**
 * @desc  Get all issues for the logged-in user
 * @route GET /api/issues/my-issues
 * @access User
 */
export const getMyIssues = async (req, res) => {
  try {
    const issues = await Issue.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(issues);
  } catch (err) {
    console.error("❌ Error in getMyIssues:", err);
    res.status(500).json({ message: "Server error while fetching issues" });
  }
};

/**
 * @desc  Admin: Get all reported issues
 * @route GET /api/issues/all
 * @access Admin
 */
export const getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find()
      .populate("user", "name email") // include reporter details
      .sort({ createdAt: -1 });

    res.json(issues);
  } catch (err) {
    console.error("❌ Error in getAllIssues:", err);
    res.status(500).json({ message: "Server error while fetching all issues" });
  }
};

/**
 * @desc  Admin: Update issue status or reply
 * @route PUT /api/issues/:id
 * @access Admin
 */
export const updateIssue = async (req, res) => {
  try {
    const { status, reply } = req.body;

    const issue = await Issue.findById(req.params.id);
    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    if (status) issue.status = status; // Pending / Accepted / Rejected
    if (reply) issue.reply = reply;

    const updated = await issue.save();
    res.json(updated);
  } catch (err) {
    console.error("❌ Error in updateIssue:", err);
    res.status(500).json({ message: "Server error while updating issue" });
  }
};
