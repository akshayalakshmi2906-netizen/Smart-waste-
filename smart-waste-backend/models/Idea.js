// models/Idea.js
import mongoose from "mongoose";

const ideaSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    userName: { type: String, required: false },
    points: { type: Number, default: 0 },
    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Idea = mongoose.model("Idea", ideaSchema);
export default Idea;
