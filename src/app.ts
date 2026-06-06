import express, { type NextFunction, type Request, type Response } from 'express';

import { apiRouter } from './routes';

const app = express();

app.use(express.json());
app.use('/api', apiRouter);

app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

export default app;