/**
 * @swagger
 * tags:
 *   name: Habits
 *   description: Habit management and CRUD operations
 */

const express = require('express');
const { authenticate } = require('../middleware/authenticate ');
const { createHabit, getHabits, updateHabit, deleteHabit } = require('../controller/habitController');
const router = express.Router();

/**
 * @swagger
 * /habits/add:
 *   post:
 *     summary: Create a new habit
 *     tags: [Habits]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Exercise"
 *               frequency:
 *                 type: number
 *                 example: 7
 *     responses:
 *       201:
 *         description: Habit created successfully
 *       400:
 *         description: Bad request, habit creation failed
 */
router.post('/add', authenticate, createHabit);

/**
 * @swagger
 * /habits/:
 *   get:
 *     summary: Get all habits for the authenticated user
 *     tags: [Habits]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of habits
 *       401:
 *         description: Unauthorized, invalid or missing token
 */
router.get('/', authenticate, getHabits);

/**
 * @swagger
 * /habits/{id}:
 *   put:
 *     summary: Update a habit by its ID
 *     tags: [Habits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The habit ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               frequency:
 *                 type: number
 *     responses:
 *       200:
 *         description: Habit updated successfully
 *       400:
 *         description: Bad request, update failed
 *       404:
 *         description: Habit not found
 */
router.put('/:id', authenticate, updateHabit);

/**
 * @swagger
 * /habits/{id}:
 *   delete:
 *     summary: Delete a habit by its ID
 *     tags: [Habits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The habit ID
 *     responses:
 *       200:
 *         description: Habit deleted successfully
 *       404:
 *         description: Habit not found
 */
router.delete('/:id', authenticate, deleteHabit);

module.exports = router;
