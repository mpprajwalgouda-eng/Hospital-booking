import { useState } from 'react';
import { useToast } from '../../components/ToastProvider';
import api from '../../services/api';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const { showToast } = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.post('/api/auth/forgot-password', { email });
      showToast('Reset instructions sent to your email!', 'success');
      setEmail('');
    } catch (error) {
      showToast(error.response?.data?.message || 'Unable to send reset link', 'danger');
    }
  };

  return (
    <div className="mx-auto max-w-xl rounded-[2rem] border border-white/10 bg-card/90 p-10 shadow-glow">
      <h1 className="text-3xl font-semibold text-white">Forgot password?</h1>
      <p className="mt-3 text-muted">Enter your email and we’ll send a secure reset link instantly.</p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <label className="block text-sm font-medium text-white">
          Email address
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none focus:border-primary" />
        </label>
        <button type="submit" className="w-full rounded-full bg-primary px-6 py-3 font-semibold text-white transition hover:bg-blue-500">Send Reset Link</button>
      </form>
    </div>
  );
}
