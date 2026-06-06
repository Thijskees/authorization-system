import { Router } from 'express';
import { listAll, getOne } from '../controllers/users.controller';
import { requireAuth } from '../auth/auth.middleware';

const usersRouter = Router();

usersRouter.get('/', requireAuth, listAll);
usersRouter.get('/:id', requireAuth, getOne);

export { usersRouter };
