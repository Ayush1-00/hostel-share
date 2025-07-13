import express from "express";
import { donateQR, getAvailableQRs, claimQR } from "../controllers/qrController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post("/donate", authMiddleware, upload.single("qrImage"), donateQR);
router.get("/available", authMiddleware, getAvailableQRs);
router.post("/claim/:id", authMiddleware, claimQR);

export default router;