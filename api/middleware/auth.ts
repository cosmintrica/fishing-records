// api/middleware/auth.ts
import type { Request, Response, NextFunction } from 'express';
import { adminAuth } from '../firebaseAdmin';

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : undefined;
  if (!token) return res.status(401).json({ error: 'Missing Authorization Bearer token' });
  try {
    const decoded = await adminAuth.verifyIdToken(token);
    (req as any).uid = decoded.uid;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}
