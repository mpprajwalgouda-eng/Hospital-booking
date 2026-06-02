export default function AboutPage() {
  return (
    <div className="space-y-10">
      <div className="rounded-[2rem] border border-white/10 bg-card/90 p-10 shadow-glow">
        <span className="text-sm uppercase tracking-[0.32em] text-secondary">About Smart Hospital</span>
        <h1 className="mt-4 text-4xl font-semibold text-white">Delivering intelligent healthcare experiences with premium design.</h1>
        <p className="mt-6 text-muted">Our queue management suite transforms patient and staff interactions by combining modern dashboard analytics, real-time notifications, and secure access for every hospital role.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {[
          { title: 'Patient-centric', detail: 'Patients can book tokens, monitor queues, and access their appointments in one intuitive interface.' },
          { title: 'Doctor-first', detail: 'Doctors can manage active queues, update availability, and handle urgent cases with ease.' },
          { title: 'Admin-ready', detail: 'Admins oversee performance metrics, doctor workflows, and emergency triage from a single command center.' },
        ].map((item) => (
          <div key={item.title} className="glass-card rounded-[2rem] border border-white/10 p-8">
            <h2 className="text-xl font-semibold text-white">{item.title}</h2>
            <p className="mt-3 text-muted">{item.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
