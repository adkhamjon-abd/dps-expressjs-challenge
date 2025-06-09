import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	const authToken = authHeader.split(' ')[1];

	if (authToken !== 'Password123') {
		return res.status(401).json({ message: 'Invalid token' });
	}

	next();
};
