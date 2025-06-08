import express from 'express';
import reportController from '../controllers/report.controller';

const router = express.Router({ mergeParams: true });

router.get('/:id', reportController.getReportById);

router.put('/:id', reportController.updateReport);

router.delete('/:id', reportController.deleteReport);

router.get('/', reportController.getReportByProjectId);
export default router;
