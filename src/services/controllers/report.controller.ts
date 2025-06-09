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

const deleteReport = (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const deletedReport = db.run('DELETE from reports WHERE id=:id', { id });

	if (deletedReport.changes === 0) {
		return res.status(404).json({ message: 'Report not found' });
	}

	return res.status(200).json({ message: 'Report deleted successfully' });
};

const getReportByProjectId = (req: Request, res: Response) => {
	const projectId = Number(req.params.projectId);
	console.log(projectId);
	const report = db.query(
		'SELECT * FROM reports WHERE projectid=:projectId',
		{ projectId },
	);
	console.log('DB project:', report);

	if (report.length === 0) {
		return res.status(404).json({ message: 'Report not found' });
	}

	res.json(report);
};

const addReportByProjectId = (req: Request, res: Response) => {
	const projectId = Number(req.params.projectId);

	const { text } = req.body;

	if (!text) {
		return res.status(400).json({ message: 'Text is not found' });
	}

	const addReport = db.run(
		'INSERT INTO reports (text, projectid) VALUES (:text, :projectId)',
		{ text, projectId },
	);

	const createdReport = db.query('SELECT * FROM reports WHERE id=:id', {
		id: Number(addReport.lastInsertRowid),
	});

	res.status(201).json(createdReport[0]);
};

const countWords = async (req: Request, res: Response) => {
	const word = req.query.word as string;
	const filteredReports: { id: number; text: string; projectid: number }[] =
		[];

	if (!word || word.length === 0) {
		return res
			.status(404)
			.json({ message: 'Query param "word" is required' });
	}

	const result = await db.query('SELECT * from reports');
	const reports = result as { id: number; text: string; projectid: number }[];

	function escapeRegex(s: string): string {
		return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	}

	const safeWord = escapeRegex(word);
	const regex = new RegExp(`\\b${safeWord}\\b`, 'gi');

	let count: number;
	for (const report of reports) {
		const matches = report.text.match(regex);
		if (matches) {
			count = matches.length;
		} else {
			count = 0;
		}
		//console.log(`Found ${count} matches in:`, report.text);

		if (count >= 3) {
			filteredReports.push({
				id: report.id,
				text: report.text,
				projectid: report.projectid,
			});
		}
	}

	return res.status(200).json(filteredReports);
};
export default {
	getReportById,
	updateReport,
	deleteReport,
	getReportByProjectId,
	addReportByProjectId,
	countWords,
};
