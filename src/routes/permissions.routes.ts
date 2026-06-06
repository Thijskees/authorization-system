import { Router } from 'express';

import { requireAuth } from '../auth/auth.middleware';
import { create, listAll, getOne } from '../controllers/permissions.controller';
import { validateBody } from '../middlewares/validate';
import { createPermissionSchema } from '../validation/schemas';

const permissionsRouter = Router();

permissionsRouter.post('/', requireAuth, validateBody(createPermissionSchema), create);
permissionsRouter.get('/', requireAuth, listAll);
permissionsRouter.get('/:id', requireAuth, getOne);

export { permissionsRouter };
