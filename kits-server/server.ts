import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import adminRoutes from './routes/adminRoutes';

export const app = express();
dotenv.config();

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use(express.json({ limit: "500mb" }));

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

const PORT = process.env.PORT;

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export const closeServer = () => server.close();