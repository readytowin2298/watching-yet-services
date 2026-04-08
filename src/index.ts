// Libraries
import 'dotenv/config';  // Must be FIRST
import express from 'express';
// Routes
import authRoutes from './routes/auth.routes.js';
import watchRoutes from './routes/watch.routes.js';
import feedRoutes from './routes/feed.routes.js';


// Middleware
import { authenticate } from './middleware/auth.middleware.js';


const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/watch', watchRoutes);
app.use('/feed', feedRoutes);

app.get('/', (req, res) => {
  res.send('Watching Yet API is running 🚀');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});