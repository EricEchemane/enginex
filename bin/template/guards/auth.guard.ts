import {
	createMiddlewareDecorator,
	NextFunction,
	UnauthorizedException,
} from 'next-api-decorators';

import { NextApiRequest, NextApiResponse } from 'next/types';

export const AuthGuard = createMiddlewareDecorator(
	(req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
		const sessionId = req.cookies['sessionId'];

		if (!sessionId) throw new UnauthorizedException();

		next();
	}
);
