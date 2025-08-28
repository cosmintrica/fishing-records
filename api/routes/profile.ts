// api/routes/profile.ts
import { Router } from 'express';
import { adminDb } from '../firebaseAdmin';
import { requireAuth } from '../middleware/auth';

const router = Router();
router.use(requireAuth);

router.get('/', async (req, res) => {
  const uid = (req as any).uid as string;
  const doc = await adminDb.collection('users').doc(uid).get();
  res.json({ uid, profile: doc.exists ? doc.data() : null });
});

router.put('/', async (req, res) => {
  const uid = (req as any).uid as string;
  const data = req.body ?? {};
  await adminDb.collection('users').doc(uid).set(data, { merge: true });
  res.json({ ok: true });
});

export default router;
