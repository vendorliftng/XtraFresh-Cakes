"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Lock, Mail } from 'lucide-react';
import { loginAction, forgotPasswordAction } from '../actions';

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotMsg, setForgotMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const res = await loginAction(password);
    if (res.error) {
      setError(res.error);
      setLoading(false);
    } else {
      router.push('/admin/products');
    }
  };

  const handleForgot = async () => {
    setForgotLoading(true);
    setForgotMsg('');
    const res = await forgotPasswordAction();
    if (res.error) {
      setForgotMsg("Error: " + res.error);
    } else {
      setForgotMsg("Password sent to your email!");
    }
    setForgotLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg)' }}>
      <div className="fun-card" style={{ maxWidth: '400px', width: '100%', padding: '2rem' }}>
        <h1 style={{ textAlign: 'center', color: 'var(--color-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <Lock /> Admin Access
        </h1>
        
        {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="password"
            placeholder="Enter Admin Password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ display: 'flex', justifyContent: 'center' }}>
            {loading ? <Loader2 className="animate-spin" /> : "Login"}
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
          <button onClick={handleForgot} disabled={forgotLoading} style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', textDecoration: 'underline', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', margin: '0 auto' }}>
            {forgotLoading ? <Loader2 className="animate-spin" size={16} /> : <Mail size={16} />}
            Forgot Password?
          </button>
          {forgotMsg && <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: forgotMsg.includes('Error') ? 'red' : 'green' }}>{forgotMsg}</p>}
        </div>
      </div>
    </div>
  );
}
