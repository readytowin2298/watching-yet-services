// Libraries
import 'dotenv/config';  // Must be FIRST
import express from 'express';
import swaggerUI from 'swagger-ui-express';
import fs from "fs";
import path from "path";
import cors from 'cors';
// // Routes
// import authRoutes from './modules/auth/auth.routes.js';
// import watchRoutes from './modules/watch/watch.routes.js';
// import feedRoutes from './modules/feed/feed.routes.js';
// import mediaRoutes from './modules/media/media.routes.js';
// import postRoutes from './modules/post/post.routes.js';
// import reactionRoutes from './modules/reaction/reaction.routes.js';
// import commentRoutes from './modules/comments/comment.routes.js';
// import bibleRoutes from './modules/bible/bible.routes.js';
import { RegisterRoutes } from './routes.js';

// Middleware
import { authenticate } from './middleware/auth.middleware.js';
import { register } from 'module';

const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "src", "generated", "swagger.json"), "utf-8")
)
const app = express();


app.use(express.json());
app.use(cors());
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
RegisterRoutes(app);
// app.use('/auth', authRoutes);
// app.use('/watch', watchRoutes);
// app.use('/feed', feedRoutes);
// app.use('/media', mediaRoutes);
// app.use('/post', postRoutes);
// app.use('/reaction', reactionRoutes);
// app.use('/comment', commentRoutes);
// app.use("/bible", bibleRoutes);

app.get('/', (req, res) => {
  res.send('Watching Yet API is running 🚀');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});