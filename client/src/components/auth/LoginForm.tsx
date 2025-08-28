import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';

export default function LoginForm() {
  const [email, setEmail] = useState(''), [password, setPassword] = useState(''), [err, setErr] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setErr(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // ex: redirecționezi sau doar confirmi
    } catch (e: any) { setErr(e.message); }
  };

  return (
    <form onSubmit={onSubmit}>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Parola" type="password" />
      <button type="submit">Login</button>
      {err && <p>{err}</p>}
    </form>
  );
}
