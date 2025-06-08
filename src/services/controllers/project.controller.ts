import { Request, Response } from 'express';
import db from '../db.service';

const getAllProjects = (req: Request, res: Response) => {
	res.send('Some data');
	res;
};

const getProjectById = (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const project = db.query('SELECT * FROM projects WHERE id = :id', { id });
	console.log('DB project:', project);

	if (project.length === 0) {
		return res.status(404).json({ message: 'Project not found' });
	}

	res.json(project[0]);
};

export default { getAllProjects, getProjectById };
