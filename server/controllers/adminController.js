import User from "../models/User.js";
import MealQR from "../models/MealQr.js";
import TravelPlan from "../models/TravelPlan.js";

// Get dashboard statistics
export const getDashboardStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Get total users
    const totalUsers = await User.countDocuments();
    
    // Get QRs donated today
    const qrsDonatedToday = await MealQR.countDocuments({
      date: { $gte: today, $lt: tomorrow }
    });

    // Get available QRs today
    const availableQRsToday = await MealQR.countDocuments({
      date: { $gte: today, $lt: tomorrow },
      status: "available"
    });

    // Get travel plans created today
    const travelPlansToday = await TravelPlan.countDocuments({
      createdAt: { $gte: today, $lt: tomorrow }
    });

    // Get active travel plans (future dates)
    const activeTravelPlans = await TravelPlan.countDocuments({
      travelDate: { $gte: today }
    });

    res.json({
      totalUsers,
      qrsDonatedToday,
      availableQRsToday,
      travelPlansToday,
      activeTravelPlans
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch dashboard stats", error: error.message });
  }
};

// Get all users with details
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });
    
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error: error.message });
  }
};

// Get all QR codes with details
export const getAllQRs = async (req, res) => {
  try {
    const qrs = await MealQR.find()
      .populate("userId", "name email")
      .populate("claimedBy", "name email")
      .sort({ date: -1 });
    
    res.json(qrs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch QR codes", error: error.message });
  }
};

// Get all travel plans with details
export const getAllTravelPlans = async (req, res) => {
  try {
    const plans = await TravelPlan.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });
    
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch travel plans", error: error.message });
  }
};

// Clean up old data
export const cleanupOldData = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Delete QR codes older than today
    const deletedQRs = await MealQR.deleteMany({
      date: { $lt: today }
    });

    // Delete travel plans with past dates
    const deletedPlans = await TravelPlan.deleteMany({
      travelDate: { $lt: today }
    });

    res.json({
      message: "Cleanup completed successfully",
      deletedQRs: deletedQRs.deletedCount,
      deletedTravelPlans: deletedPlans.deletedCount
    });
  } catch (error) {
    res.status(500).json({ message: "Cleanup failed", error: error.message });
  }
};