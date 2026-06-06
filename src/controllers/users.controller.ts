import type { Request, Response } from 'express';
import { listUsers, getUserById } from '../auth/auth.service';

export const listAll = async (_req: Request, res: Response) => {
  try {
    const users = await listUsers();
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ error: 'Failed to list users' });
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'id is required' });
    const user = await getUserById(String(id));
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};
