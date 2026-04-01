// Libraries
import express from 'express';
import dotenv from 'dotenv';
// Routes
import authRoutes from './routes/auth.routes';
import watchRoutes from './routes/watch.routes';


// Middleware
import { authenticate } from './middleware/auth.middleware';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/watch', watchRoutes);

app.get('/', (req, res) => {
  res.send('Watching Yet API is running 🚀');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});