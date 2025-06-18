import express from 'express';
import { prisma } from '../db';
import { authenticateUser } from '../middleware/auth';

const router = express.Router();

// Get all notifications for the current user
router.get('/notifications', authenticateUser, async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: {
        userId: req.user.id,
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 50 // Limit to latest 50 notifications
    });

    return res.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

// Mark a notification as read
router.post('/notifications/:id/read', authenticateUser, async (req, res) => {
  try {
    const notification = await prisma.notification.update({
      where: {
        id: req.params.id,
        userId: req.user.id
      },
      data: {
        read: true
      }
    });

    return res.json(notification);
  } catch (error) {
    console.error('Error marking notification as read:', error);
    return res.status(500).json({ error: 'Failed to update notification' });
  }
});

export default router;
