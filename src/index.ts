import express, { Express } from 'express';
import dotenv from 'dotenv';

import projectRoutes from './services/routes/project.routes';
import reportRoutes from './services/routes/report.routes';

import { authMiddleware } from './services/middlewares/auth.middleware';
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(authMiddleware);

// Routes in use
app.use('/projects', projectRoutes);
app.use('/reports', reportRoutes);

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
