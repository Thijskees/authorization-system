import { Router } from 'express';
import { create, listAll, getOne, addPermission, removePermission } from '../controllers/roles.controller';
import { validateBody } from '../middlewares/validate';
import { createRoleSchema } from '../validation/schemas';
import { requireAuth } from '../auth/auth.middleware';

const router = Router();

router.post('/', requireAuth, validateBody(createRoleSchema), create);
router.get('/', requireAuth, listAll);
router.get('/:id', requireAuth, getOne);
router.post('/:id/permissions', requireAuth, addPermission);
router.delete('/:id/permissions', requireAuth, removePermission);

export { router as rolesRouter };
