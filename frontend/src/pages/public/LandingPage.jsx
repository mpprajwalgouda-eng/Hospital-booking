import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const features = [
  { title: 'Token Booking', description: 'Book your appointment and skip long queues with seamless token generation.' },
  { title: 'Live Queue', description: 'Track live queue status in real-time for the fastest patient flow.' },
  { title: 'Doctor Availability', description: 'See available specialists and manage appointments instantly.' },
  { title: 'Emergency Priority', description: 'Emergency cases are prioritized automatically for rapid response.' },
];

export default function LandingPage() {
  return (
    <div className="space-y-20">
      <section className="grid gap-10 lg:grid-cols-[1.3fr,0.9fr] items-center">
        <div className="space-y-6">
          <span className="inline-flex rounded-full bg-secondary/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-secondary">Hospital Intelligence</span>
          <h1 className="max-w-3xl text-5xl font-semibold leading-tight text-white">Smart Hospital Queue Management System for next-gen patient flow.</h1>
          <p className="max-w-2xl text-lg text-muted">Reduce waiting times with online token booking, live updates, doctor availability, and emergency prioritization.</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/register" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500">Start Free Trial</Link>
            <Link to="/about" className="rounded-full border border-white/10 px-6 py-3 text-sm text-white transition hover:bg-white/5">Learn More</Link>
          </div>
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-[2rem] p-8 shadow-glow border border-white/10">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-secondary">Live Queue</p>
                <h2 className="text-3xl font-semibold text-white">24 Patients in queue</h2>
              </div>
              <div className="rounded-3xl bg-slate-900/70 px-4 py-3 text-sm text-white">Emergency</div>
            </div>
            <div className="space-y-4">
              <div className="rounded-3xl bg-slate-950/70 p-5">
                <p className="text-sm text-muted">Current Token</p>
                <h3 className="text-4xl font-semibold text-white">A-102</h3>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl bg-slate-950/70 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-secondary">Wait</p>
                  <p className="mt-2 text-2xl font-semibold text-white">12m</p>
                </div>
                <div className="rounded-3xl bg-slate-950/70 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-secondary">Doctors</p>
                  <p className="mt-2 text-2xl font-semibold text-white">27</p>
                </div>
                <div className="rounded-3xl bg-slate-950/70 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-secondary">Patients</p>
                  <p className="mt-2 text-2xl font-semibold text-white">124</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => (
          <div key={feature.title} className="glass-card rounded-[2rem] border border-white/10 p-6">
            <p className="text-sm uppercase tracking-[0.28em] text-secondary">{feature.title}</p>
            <p className="mt-4 text-white">{feature.description}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-10 lg:grid-cols-[0.9fr,1.1fr] items-center rounded-[2rem] border border-white/10 bg-card/90 p-10">
        <div className="space-y-4">
          <h2 className="text-4xl font-semibold text-white">How it works</h2>
          <p className="text-muted">Patients book tokens online, doctors manage live queues, and administrators monitor the entire hospital in one intelligent dashboard.</p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
              <p className="text-white">Register, verify, and book a token in seconds.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 h-2.5 w-2.5 rounded-full bg-secondary" />
              <p className="text-white">Receive live queue updates and estimated wait times.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 h-2.5 w-2.5 rounded-full bg-success" />
              <p className="text-white">Doctors call patients instantly and manage emergencies with priority routing.</p>
            </div>
          </div>
        </div>
        <div className="rounded-[2rem] bg-slate-950/60 p-8">
          <div className="rounded-3xl bg-primary/10 p-6 text-white">
            <p className="uppercase tracking-[0.28em] text-secondary">Efficiency</p>
            <h3 className="mt-4 text-3xl font-semibold">+40% faster patient flow</h3>
            <p className="mt-3 text-muted">Smart automation unlocks measurable reductions in wait time and operational cost.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
