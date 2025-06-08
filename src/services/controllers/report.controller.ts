import { Request, Response } from 'express';
import db from '../db.service';

const getReportById = (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const report = db.query('SELECT * FROM reports WHERE id = :id', { id });
	console.log('DB project:', report);

	if (report.length === 0) {
		return res.status(404).json({ message: 'Report not found' });
	}

	res.json(report[0]);
};

export default getReportById;
