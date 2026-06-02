import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../components/ToastProvider';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await api.post('/api/auth/login', form);
      await login(data.token, data.user);
      showToast('Welcome back!', 'success');
      if (data.user.role === 'admin') navigate('/admin');
      else if (data.user.role === 'doctor') navigate('/doctor');
      else navigate('/patient');
    } catch (error) {
      showToast(error.response?.data?.message || 'Login failed', 'danger');
    }
  };

  return (
    <div className="mx-auto max-w-xl rounded-[2rem] border border-white/10 bg-card/90 p-10 shadow-glow">
      <h1 className="text-3xl font-semibold text-white">Welcome back</h1>
      <p className="mt-3 text-muted">Login to access your hospital dashboard and manage queue assignments.</p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <label className="block text-sm font-medium text-white">
          Email
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none focus:border-primary" />
        </label>
        <label className="block text-sm font-medium text-white">
          Password
          <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none focus:border-primary" />
        </label>
        <div className="flex items-center justify-between text-sm text-muted">
          <Link to="/forgot-password" className="hover:text-white">Forgot Password?</Link>
          <button type="submit" className="rounded-full bg-primary px-6 py-3 font-semibold text-white transition hover:bg-blue-500">Login</button>
        </div>
      </form>
      <p className="mt-6 text-center text-sm text-muted">New to Smart Hospital? <Link to="/register" className="text-white hover:text-primary">Create account</Link></p>
    </div>
  );
}
