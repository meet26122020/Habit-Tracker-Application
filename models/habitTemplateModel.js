const mongoose = require("mongoose");

const habitTemplateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    frequency: {
      type: String, // Frequency in days (e.g., every day, every 2 days)
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HabitTemplate", habitTemplateSchema);
