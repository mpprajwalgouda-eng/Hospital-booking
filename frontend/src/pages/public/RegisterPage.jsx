import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../components/ToastProvider';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'patient' });
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await api.post('/api/auth/register', form);
      await login(data.token, data.user);
      showToast('Account created successfully!', 'success');
      navigate('/patient');
    } catch (error) {
      showToast(error.response?.data?.message || 'Registration failed', 'danger');
    }
  };

  return (
    <div className="mx-auto max-w-xl rounded-[2rem] border border-white/10 bg-card/90 p-10 shadow-glow">
      <h1 className="text-3xl font-semibold text-white">Create your account</h1>
      <p className="mt-3 text-muted">Get started with patient, doctor, or admin access in the same platform.</p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <label className="block text-sm font-medium text-white">
          Full Name
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none focus:border-primary" />
        </label>
        <label className="block text-sm font-medium text-white">
          Email
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none focus:border-primary" />
        </label>
        <label className="block text-sm font-medium text-white">
          Password
          <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none focus:border-primary" />
        </label>
        <label className="block text-sm font-medium text-white">
          Role
          <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none focus:border-primary">
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="admin">Admin/Receptionist</option>
          </select>
        </label>
        <button type="submit" className="w-full rounded-full bg-primary px-6 py-3 font-semibold text-white transition hover:bg-blue-500">Register</button>
      </form>
      <p className="mt-6 text-center text-sm text-muted">Already registered? <Link to="/login" className="text-white hover:text-primary">Login</Link></p>
    </div>
  );
}
