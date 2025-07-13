import cron from 'node-cron';
import MealQR from '../models/MealQr.js';
import TravelPlan from '../models/TravelPlan.js';

// Auto-cleanup function
const autoCleanup = async () => {
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

    console.log(`🧹 Auto-cleanup completed: ${deletedQRs.deletedCount} QRs, ${deletedPlans.deletedCount} travel plans deleted`);
  } catch (error) {
    console.error('❌ Auto-cleanup failed:', error);
  }
};

// Schedule cleanup to run daily at midnight
export const startScheduler = () => {
  // Run every day at midnight (0 0 * * *)
  cron.schedule('0 0 * * *', autoCleanup, {
    timezone: "Asia/Kolkata"
  });
  
  console.log('⏰ Auto-cleanup scheduler started (runs daily at midnight)');
  
  // Run cleanup immediately on startup
  autoCleanup();
};