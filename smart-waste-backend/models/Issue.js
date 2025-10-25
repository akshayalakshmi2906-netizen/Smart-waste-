// backend/models/Issue.js
import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  location: String,
  issue: String,
  status: { type: String, default: "Pending" }, // ✅ Pending/Accepted/Rejected
  reply: { type: String, default: "" },
}, { timestamps: true });

export default mongoose.model("Issue", issueSchema);
