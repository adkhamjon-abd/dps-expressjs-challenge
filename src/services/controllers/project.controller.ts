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

const createProject = (req: Request, res: Response) => {
	const { name, description } = req.body;

	if (!name || !description) {
		return res
			.status(400)
			.json({ message: 'Name or description are not found' });
	}

	const addNewProject = db.run(
		'INSERT INTO projects (name, description) VALUES (:name, :description)',
		{ name, description },
	);

	const newProject = db.query('SELECT * FROM projects WHERE id = :id', {
		id: Number(addNewProject.lastInsertRowid),
	});

	res.status(201).json(newProject[0]);
};
export default { getAllProjects, getProjectById, createProject };
