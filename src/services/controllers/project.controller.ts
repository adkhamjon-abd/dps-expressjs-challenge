import { Request, Response } from 'express';

const getAllProjects = (req: Request, res: Response) => {
	res.send('Some data');
	res;
};

export default getAllProjects;
