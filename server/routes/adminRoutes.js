import express from "express";
import { 
  getDashboardStats, 
  getAllUsers, 
  getAllQRs, 
  getAllTravelPlans, 
  cleanupOldData 
} from "../controllers/adminController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

// Dashboard stats
router.get("/dashboard", authMiddleware, adminMiddleware, getDashboardStats);

// Get all users
router.get("/users", authMiddleware, adminMiddleware, getAllUsers);

// Get all QR codes
router.get("/qrs", authMiddleware, adminMiddleware, getAllQRs);

// Get all travel plans
router.get("/travel-plans", authMiddleware, adminMiddleware, getAllTravelPlans);

// Manual cleanup
router.post("/cleanup", authMiddleware, adminMiddleware, cleanupOldData);

export default router;