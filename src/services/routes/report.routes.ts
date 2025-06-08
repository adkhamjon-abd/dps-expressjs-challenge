import express from 'express';
import reportController from '../controllers/report.controller';

const router = express.Router();

router.get('/:id', reportController.getReportById);

router.put('/:id', reportController.updateReport);

export default router;
