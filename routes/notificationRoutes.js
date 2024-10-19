const express = require('express');
const { notifyUsersOfPendingHabits } = require('../util/notification');  // Correct import
const { authenticate } = require('../middleware/authenticate ');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: API endpoints for notifications related to user habits
 */

/**
 * @swagger
 * /api/v1/notifications/send-reminders:
 *   post:
 *     summary: Send reminder notifications to users for pending habits
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Reminder notifications sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Reminder notifications sent!
 *       500:
 *         description: Error sending notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error sending notifications
 *                 error:
 *                   type: string
 *                   example: <error message here>
 */
router.post('/send-reminders', authenticate, async (req, res) => {
  try {
    await notifyUsersOfPendingHabits();
    res.json({ message: 'Reminder notifications sent!' });
  } catch (error) {
    console.error('Error sending notifications:', error.message, error.stack);
    res.status(500).json({ message: 'Error sending notifications', error: error.message });
  }
});

module.exports = router;
