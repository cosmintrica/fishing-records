import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../lib/firebase';

export default function SignUpForm() {
  const [email, setEmail] = useState(''), [password, setPassword] = useState(''), [displayName, setDisplayName] = useState('');
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setErr(null);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName) await updateProfile(cred.user, { displayName });
      // opțional: creezi doc inițial în Firestore via API /api/profile
    } catch (e: any) { setErr(e.message); }
  };

  return (
    <form onSubmit={onSubmit}>
      <input value={displayName} onChange={e=>setDisplayName(e.target.value)} placeholder="Nume afișat" />
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Parola" type="password" />
      <button type="submit">Creează cont</button>
      {err && <p>{err}</p>}
    </form>
  );
}
