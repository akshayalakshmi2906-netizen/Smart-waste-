import express from "express";
import { getNearbyBins } from "../controllers/binController.js";

const router = express.Router();
router.get("/", getNearbyBins);

export default router;
