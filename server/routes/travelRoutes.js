import express from "express";
import { createPlan, getAllPlans, findMatches } from "../controllers/travelController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createPlan);
router.get("/all", authMiddleware, getAllPlans);
router.get("/match", authMiddleware, findMatches);

export default router;