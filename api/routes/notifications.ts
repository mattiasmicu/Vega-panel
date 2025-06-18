import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Get all notifications for the current user
router.get('/', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: {
        userId: req.user!.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Failed to fetch notifications' });
  }
});

// Mark notification as read
router.post('/:id/read', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const notification = await prisma.notification.update({
      where: {
        id: req.params.id,
        userId: req.user!.id
      },
      data: {
        read: true
      }
    });

    res.json(notification);
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ message: 'Failed to mark notification as read' });
  }
});

// Create a new notification (admin only)
router.post('/', authMiddleware, async (req: AuthRequest, res) => {
  try {
    if (req.user!.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const { userId, message, type = 'info' } = req.body;

    const notification = await prisma.notification.create({
      data: {
        userId,
        message,
        type
      }
    });

    res.json(notification);
  } catch (error) {
    console.error('Error creating notification:', error);
    res.status(500).json({ message: 'Failed to create notification' });
  }
});

export default router;
