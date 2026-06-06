import type { Request, Response } from 'express';
import { createRole, listRoles, getRoleById, addPermissionToRole, removePermissionFromRole } from '../services/role.service';

export const create = async (req: Request, res: Response) => {
  try {
    const { name, permissions } = req.body as { name: string; permissions?: string[] };
    const input = permissions === undefined ? { name } : { name, permissions };
    const role = await createRole(input);
    res.status(201).json({ role });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create role' });
  }
};

export const listAll = async (_req: Request, res: Response) => {
  try {
    const roles = await listRoles();
    res.status(200).json({ roles });
  } catch (err) {
    res.status(500).json({ error: 'Failed to list roles' });
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'id is required' });
    const role = await getRoleById(String(id));
    if (!role) return res.status(404).json({ error: 'Role not found' });
    res.status(200).json({ role });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch role' });
  }
};

export const addPermission = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { permission } = req.body as { permission?: string };
    if (!id || !permission) return res.status(400).json({ error: 'id and permission are required' });
    const role = await addPermissionToRole(String(id), permission);
    if (!role) return res.status(404).json({ error: 'Role not found' });
    res.status(200).json({ role });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add permission' });
  }
};

export const removePermission = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { permission } = req.body as { permission?: string };
    if (!id || !permission) return res.status(400).json({ error: 'id and permission are required' });
    const role = await removePermissionFromRole(String(id), permission);
    if (!role) return res.status(404).json({ error: 'Role not found' });
    res.status(200).json({ role });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove permission' });
  }
};
