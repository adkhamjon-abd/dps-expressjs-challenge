import { Request, Response } from 'express';
import db from '../db.service';

//GET ALL
const getAllProjects = (req: Request, res: Response) => {
	res.send('Some data');
	res;
};

//GET (id)
const getProjectById = (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const project = db.query('SELECT * FROM projects WHERE id = :id', { id });
	console.log('DB project:', project);

	if (project.length === 0) {
		return res.status(404).json({ message: 'Project not found' });
	}

	res.json(project[0]);
};

//CREATE (POST)
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

//UPDATE (PUT)
const updateProject = (req: Request, res: Response) => {
	const id = Number(req.params.id);
	const { name, description } = req.body;

	if (!name || !description) {
		return res
			.status(400)
			.json({ message: 'Name or description are not found' });
	}

	const updatedProject = db.run(
		'UPDATE projects SET name=:name, description=:description WHERE id=:id',
		{ name, description, id },
	);

	if (updatedProject.changes === 0) {
		return res.status(404).json({ message: 'Project not found' });
	}

	const responseProject = db.query('SELECT * FROM projects WHERE id = :id', {
		id,
	});

	res.status(200).json(responseProject[0]);
};

const deleteProject = (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const deletedProject = db.run('DELETE FROM projects WHERE id = :id', {
		id,
	});

	if (deletedProject.changes === 0) {
		return res.status(404).json({ message: 'Project not found' });
	}

	return res.status(200).json({ message: 'Project deleted successfully' });
};
export default {
	getAllProjects,
	getProjectById,
	createProject,
	updateProject,
	deleteProject,
};
