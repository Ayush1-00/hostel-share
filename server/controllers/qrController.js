import MealQR from "../models/MealQr.js";

export const donateQR = async (req, res) => {
  try {
    console.log("DEBUG: req.userId:", req.userId);
    console.log("DEBUG: req.file:", req.file);

    const newQR = new MealQR({
      userId: req.userId,
      imageUrl: req.file.filename,
      status: "available",
    });

    await newQR.save();

    res.status(201).json({ message: "QR donated successfully!" });
  } catch (err) {
    console.error("ERROR in donateQR:", err);
    res.status(500).json({ message: "Failed to donate QR" });
  }
};

export const getAvailableQRs = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const qrs = await MealQR.find({
      status: "available",
      date: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    }).populate("userId", "name");

    res.status(200).json(qrs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch QRs", error: err.message });
  }
};

export const claimQR = async (req, res) => {
  try {
    const qr = await MealQR.findOne({ _id: req.params.id, status: "available" });
    if (!qr) return res.status(404).json({ message: "QR not found or already claimed" });

    qr.status = "claimed";
    qr.claimedBy = req.userId;
    await qr.save();

    res.status(200).json({ message: "QR claimed successfully", qr });
  } catch (err) {
    res.status(500).json({ message: "Claim failed", error: err.message });
  }
};