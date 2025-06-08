import express from 'express';
import projectController from '../controllers/project.controller';
import reportRoutes from './report.routes';

const router = express.Router();

router.get('/', projectController.getAllProjects);

router.get('/:id', projectController.getProjectById);

router.post('/', projectController.createProject);

router.put('/:id', projectController.updateProject);

router.delete('/:id', projectController.deleteProject);

//Routing to report controller
router.use('/:projectId/reports', reportRoutes);
router.use('/:projectId/reports', reportRoutes);
export default router;
