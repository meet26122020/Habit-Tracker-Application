const User = require("../models/userModel");
const HabitTemplate = require("../models/habitTemplateModel");
const Habit = require("../models/habitModel");

// Get all users and their habit stats (admin only)
exports.getAllUsersWithHabits = async (req, res) => {
  try {
    const users = await User.find();

    const usersWithHabits = await Promise.all(
      users.map(async (user) => {
        const habits = await Habit.find({ user: user._id });
        return {
          user: user.email,
          habits: habits.map((habit) => ({
            title: habit.title,
            streak: habit.streak,
            lastCompleted: habit.lastCompleted,
            progress: habit.progress,
          })),
        };
      })
    );

    res.json(usersWithHabits);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user habit stats." });
  }
};

// Create a habit template (admin only)
exports.createHabitTemplate = async (req, res) => {
  const { title, description, frequency } = req.body;
  try {
    const template = new HabitTemplate({
      title,
      description,
      frequency,
    });
    await template.save();
    res.status(201).json(template);
  } catch (error) {
    res.status(400).json({ message: "Failed to create habit template." });
  }
};

// Get all habit templates (accessible to all users)
exports.getAllHabitTemplates = async (req, res) => {
  try {
    const templates = await HabitTemplate.find();
    res.json(templates);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch habit templates." });
  }
};
