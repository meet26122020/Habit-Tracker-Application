const Habit = require("../models/habitModel");


// Create a new habit
exports.createHabit = async (req, res) => {
  const { title, frequency, lastCompleted, streak } = req.body;
  try {
    const habit = new Habit({
      title,
      frequency,
      lastCompleted,
      streak,
      user: req.user.id,
    });
    await habit.save();
    res.status(201).json(habit);
  } catch (error) {
    res.status(400).json({ message: "Failed to create habit" });
  }
};

// Get all habits for the logged-in user
exports.getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user.id });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: "Error fetching habits" });
  }
};

// Update a habit (e.g., mark habit as completed)
exports.updateHabit = async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!habit) return res.status(404).json({ message: "Habit not found" });

    const today = new Date();
    const lastCompletedDate = habit.lastCompleted
      ? new Date(habit.lastCompleted)
      : null;

    // Check if the habit was already completed today
    const isSameDay =
      lastCompletedDate &&
      today.toDateString() === lastCompletedDate.toDateString();

    if (!isSameDay) {
      // Update streak based on frequency and whether the habit was completed on time
      if (
        !lastCompletedDate ||
        (today - lastCompletedDate) / (1000 * 60 * 60 * 24) <= habit.frequency
      ) {
        habit.streak += 1; // Increment streak if done on time
      } else {
        habit.streak = 1; // Reset streak if the habit was missed
      }
    }

    habit.progress = true; // Mark as completed for today
    habit.lastCompleted = today;

    await habit.save();
    res.json(habit);
  } catch (error) {
    res.status(500).json({ message: "Failed to update habit" });
  }
};

// Delete a habit
exports.deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!habit) return res.status(404).json({ message: "Habit not found" });
    res.json({ message: "Habit deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete habit" });
  }
};
