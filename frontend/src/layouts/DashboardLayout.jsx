import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const links = [
  { label: 'Patient Dashboard', path: '/patient' },
  { label: 'Doctor Dashboard', path: '/doctor' },
  { label: 'Admin Dashboard', path: '/admin' },
];

export default function DashboardLayout() {
  const { logout, user } = useAuth();

  return (
    <div className="min-h-screen bg-background text-text">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="w-full border-b border-white/10 bg-card/95 p-6 lg:w-72 lg:border-r lg:border-b-0">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-secondary">Smart Hospital</p>
              <h1 className="text-2xl font-semibold text-white">Control Center</h1>
            </div>
          </div>
          <nav className="space-y-2">
            {links.map((link) => (
              <NavLink key={link.path} to={link.path} className={({ isActive }) => `block rounded-3xl px-4 py-3 text-sm transition ${isActive ? 'bg-primary/15 text-white' : 'text-muted hover:bg-white/5 hover:text-white'}`}>
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-muted">
            <p className="text-xs uppercase tracking-[0.2em] text-secondary">Signed in as</p>
            <p className="mt-2 font-semibold text-white">{user?.name || 'Guest'}</p>
            <p>{user?.role}</p>
          </div>
          <button onClick={logout} className="mt-6 w-full rounded-3xl bg-danger px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-500">
            Logout
          </button>
        </aside>
        <section className="flex-1 p-6">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-secondary">Welcome back</p>
              <h2 className="text-3xl font-semibold text-white">{user?.name || 'Healthcare Professional'}</h2>
            </div>
          </div>
          <div className="space-y-6">
            <Outlet />
          </div>
        </section>
      </div>
    </div>
  );
}
