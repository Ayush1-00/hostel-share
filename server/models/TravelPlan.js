import mongoose from "mongoose";

const travelPlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  source: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  travelDate: {
    type: Date,
    required: true
  },
  additionalInfo: {
    type: String
  }
}, { timestamps: true });

const TravelPlan = mongoose.model("TravelPlan", travelPlanSchema);
export default TravelPlan;