import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import issueRoutes from "./routes/issueRoutes.js";
import rewardRoutes from "./routes/rewardRoutes.js";
import classifierRoutes from "./routes/classifierRoutes.js";
import binRoutes from "./routes/binRoutes.js";

import adminRoutes from "./routes/adminRoutes.js";
import ideaRoutes from "./routes/ideaRoutes.js";


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Smart Waste Backend Running 🚀"));

console.log("🔧 Mounting /api routes...");
app.use("/api/auth", authRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/rewards", rewardRoutes);
app.use("/api/classifier", classifierRoutes);
app.use("/api/bins", binRoutes);
app.use("/api/admin", adminRoutes);   // ✅ moved before listen
app.use("/api/ideas", ideaRoutes); 
   // ✅ moved before listen


if (!process.env.JWT_SECRET) {
  console.error("❌ JWT_SECRET is not set in .env file");
  process.exit(1);
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
