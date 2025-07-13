import TravelPlan from "../models/TravelPlan.js";

// Post a travel plan
export const createPlan = async (req, res) => {
  try {
    const { source, destination, travelDate, additionalInfo } = req.body;
    const plan = await TravelPlan.create({
      userId: req.userId,
      source,
      destination,
      travelDate,
      additionalInfo
    });
    res.status(201).json({ message: "Plan created", plan });
  } catch (err) {
    res.status(500).json({ message: "Failed to create plan", error: err.message });
  }
};

// Get all plans except your own
export const getAllPlans = async (req, res) => {
  try {
    const plans = await TravelPlan.find({ userId: { $ne: req.userId } }).populate("userId", "name email");
    res.status(200).json(plans);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch plans", error: err.message });
  }
};

// Find matching plans (by destination and date)
export const findMatches = async (req, res) => {
  try {
    const { destination, travelDate } = req.query;
    const date = new Date(travelDate);
    date.setHours(0, 0, 0, 0);

    const plans = await TravelPlan.find({
      userId: { $ne: req.userId },
      destination: destination,
      travelDate: date
    }).populate("userId", "name email");

    res.status(200).json(plans);
  } catch (err) {
    res.status(500).json({ message: "Match search failed", error: err.message });
  }
};