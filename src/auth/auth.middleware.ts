import type { NextFunction, Request, Response } from 'express';

import { getUserFromToken } from './auth.service';

const bearerPrefix = 'Bearer ';

export type AuthedRequest = Request & {
  user?: {
    id: string;
    email: string;
    name: string;
    createdAt: string;
  };
};

export const requireAuth = async (req: AuthedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith(bearerPrefix)) {
    res.status(401).json({ error: 'Missing or invalid authorization header' });
    return;
  }

  const token = authHeader.slice(bearerPrefix.length).trim();
  const user = await getUserFromToken(token);

  if (!user) {
    res.status(401).json({ error: 'Invalid or expired token' });
    return;
  }

  req.user = user;
  next();
};
