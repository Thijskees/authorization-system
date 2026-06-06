import express, { type NextFunction, type Request, type Response } from 'express';

import { apiRouter } from './routes';

const app = express();

app.use(express.json());
app.use('/api', apiRouter);

import { errorHandler } from './middlewares/errorHandler';

app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use(errorHandler);

export default app;