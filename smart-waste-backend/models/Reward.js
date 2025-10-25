import mongoose from "mongoose";

const rewardsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  totalPoints: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model("Rewards", rewardsSchema);
