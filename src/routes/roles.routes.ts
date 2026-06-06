import { Router } from 'express';
import { create, listAll, getOne, addPermission, removePermission } from '../controllers/roles.controller';
import { validateBody } from '../middlewares/validate';
import { createRoleSchema, permissionCodeSchema } from '../validation/schemas';
import { requireAuth } from '../auth/auth.middleware';

const router = Router();

router.post('/', requireAuth, validateBody(createRoleSchema), create);
router.get('/', requireAuth, listAll);
router.get('/:id', requireAuth, getOne);
router.post('/:id/permissions', requireAuth, validateBody(permissionCodeSchema), addPermission);
router.delete('/:id/permissions', requireAuth, validateBody(permissionCodeSchema), removePermission);

export { router as rolesRouter };
