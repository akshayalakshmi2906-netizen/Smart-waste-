import express from "express";
import { classifyWaste } from "../controllers/classifierController.js";

const router = express.Router();
router.post("/", classifyWaste);

export default router;
