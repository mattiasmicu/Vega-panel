import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth';
import notificationRoutes from './routes/notifications';

const app = express();

app.use(express.json());
app.use(cookieParser());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/notifications', notificationRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
