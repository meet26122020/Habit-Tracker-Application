const express = require('express');
const { authenticate, IsAdmin } = require('../middleware/authenticate ');
const { getAllUsersWithHabits, createHabitTemplate, getAllHabitTemplates } = require('../controller/adminController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin functionality for managing users and habit templates
 */

/**
 * @swagger
 * /admin/users-habits:
 *   get:
 *     summary: Get all users with their habit stats (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched users and their habit stats
 *       401:
 *         description: Unauthorized (Admin access required)
 *       403:
 *         description: Forbidden (User not an admin)
 */
router.get('/users-habits', authenticate, IsAdmin, getAllUsersWithHabits);

/**
 * @swagger
 * /admin/habit-templates:
 *   post:
 *     summary: Create a new habit template (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - frequency
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the habit template
 *               description:
 *                 type: string
 *                 description: Description of the habit template
 *               frequency:
 *                 type: string
 *                 enum: [daily, weekly, monthly]
 *                 description: Frequency of the habit
 *     responses:
 *       201:
 *         description: Successfully created habit template
 *       400:
 *         description: Bad request (Validation error)
 *       401:
 *         description: Unauthorized (Admin access required)
 *       403:
 *         description: Forbidden (User not an admin)
 */
router.post('/habit-templates', authenticate, IsAdmin, createHabitTemplate);

/**
 * @swagger
 * /admin/habit-templates:
 *   get:
 *     summary: Get all habit templates
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched habit templates
 *       401:
 *         description: Unauthorized (Token expired or invalid)
 */
router.get('/habit-templates', authenticate, getAllHabitTemplates);

module.exports = router;
