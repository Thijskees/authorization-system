import { Router, type Request, type Response } from 'express';

import { authRouter } from '../auth/auth.routes';
import { usersRouter } from './users.routes';
import { rolesRouter } from './roles.routes';
import { permissionsRouter } from './permissions.routes';

const apiRouter = Router();

apiRouter.get('/health', (_req: Request, res: Response) => {
	res.status(200).json({ status: 'ok', message: 'API is running' });
});

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/roles', rolesRouter);
apiRouter.use('/permissions', permissionsRouter);

apiRouter.get('/', (_req: Request, res: Response) => {
	res.status(200).json({
		name: 'authorization-system',
		version: '1.0.0',
		message: 'The api is running',
	});
});

export { apiRouter };
