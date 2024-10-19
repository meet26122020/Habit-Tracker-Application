const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    streak: {
      type: Number,
      default: 0,
    },
    progress: {
      type: Boolean,
      default: false, // True if the habit was completed today
    },
    frequency: {
      type: String,
      required: true, // Frequency in days (e.g., every day, every 2 days)
    },
    lastCompleted: {
      type: Date, // Tracks when the habit was last completed
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Habit", habitSchema);
