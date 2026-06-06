import type { Request, Response } from 'express';

import { createPermission, getPermissionById, listPermissions } from '../services/permission.service';

export const create = async (req: Request, res: Response) => {
  try {
    const { code, description } = req.body as { code: string; description?: string };
    const input = description === undefined ? { code } : { code, description };
    const permission = await createPermission(input);
    res.status(201).json({ permission });
  } catch (err) {
    res.status(400).json({ error: err instanceof Error ? err.message : 'Failed to create permission' });
  }
};

export const listAll = async (_req: Request, res: Response) => {
  try {
    const permissions = await listPermissions();
    res.status(200).json({ permissions });
  } catch (err) {
    res.status(500).json({ error: 'Failed to list permissions' });
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'id is required' });
    const permission = await getPermissionById(String(id));
    if (!permission) return res.status(404).json({ error: 'Permission not found' });
    res.status(200).json({ permission });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch permission' });
  }
};
