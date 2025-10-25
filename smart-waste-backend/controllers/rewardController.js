import Reward from "../models/Reward.js";
import User from "../models/User.js";

export const redeemReward = async (req, res) => {
  try {
    const { userId, reward, cost } = req.body;
    const user = await User.findById(userId);

    if (user.points < cost) return res.status(400).json({ error: "Not enough points" });

    user.points -= cost;
    await user.save();

    const newReward = new Reward({ userId, reward, cost });
    await newReward.save();

    res.json({ message: "✅ Reward redeemed successfully", user });
  } catch (err) {
    res.status(500).json({ error: "Error redeeming reward" });
  }
};
