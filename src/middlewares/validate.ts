import type { ZodSchema } from 'zod';
import type { RequestHandler } from 'express';

export const validateBody = (schema: ZodSchema<any>): RequestHandler => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (err) {
    const issues = (err as any).issues || (err as any).errors || err;
    res.status(400).json({ error: 'Validation failed', details: issues });
  }
};
