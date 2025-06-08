import express from 'express';
import getReportById from '../controllers/report.controller';

const router = express.Router();

router.get('/:id', getReportById);

export default router;
