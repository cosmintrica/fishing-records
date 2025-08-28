import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import { registerRoutes } from '../server/routes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register API routes (no static file serving here)
registerRoutes(app);

export default (req: VercelRequest, res: VercelResponse) => {
  // Let Express handle the request
  return (app as any)(req, res);
};
