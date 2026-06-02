import { Outlet, Link } from 'react-router-dom';

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-background text-text">
      <header className="sticky top-0 z-30 border-b border-white/5 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-2xl font-semibold tracking-tight text-white">Smart Hospital</Link>
          <nav className="flex items-center gap-4 text-sm text-muted">
            <Link to="/about" className="hover:text-white">About</Link>
            <Link to="/services" className="hover:text-white">Services</Link>
            <Link to="/contact" className="hover:text-white">Contact</Link>
            <Link to="/login" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white transition hover:bg-white/10">Login</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}
