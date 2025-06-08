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

const updateReport = (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const { text, projectId } = req.body;

	if (!text || !projectId) {
		return res
			.status(400)
			.json({ message: 'Text or projectId are not found' });
	}

	const updatedReport = db.run(
		'UPDATE reports SET text=:text, projectid=:projectId WHERE id=:id',
		{ text, projectId, id },
	);

	if (updatedReport.changes === 0) {
		return res.status(404).json({ message: 'Report not found' });
	}

	const responseReport = db.query('SELECT * FROM reports WHERE id=:id', {
		id,
	});

	res.json(responseReport[0]);
};

export default { getReportById, updateReport };
