import mongoose from "mongoose";

const mealQRSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  claimedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  status: {
    type: String,
    enum: ["available", "claimed"],
    default: "available",
  }
}, { timestamps: true });

const MealQR = mongoose.model("MealQR", mealQRSchema);
export default MealQR;