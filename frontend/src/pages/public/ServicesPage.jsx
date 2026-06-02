export default function ServicesPage() {
  return (
    <div className="space-y-10">
      <div className="rounded-[2rem] border border-white/10 bg-card/90 p-10 shadow-glow">
        <span className="text-sm uppercase tracking-[0.32em] text-secondary">Our Services</span>
        <h1 className="mt-4 text-4xl font-semibold text-white">Everything hospitals need to run smarter and faster.</h1>
        <p className="mt-6 text-muted">From token booking to emergency queue prioritization, our system supports every interaction required by modern healthcare operations.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[
          { title: 'Token & Appointment Booking', body: 'Patients can reserve slots instantly and receive QR-enabled queue tickets.' },
          { title: 'Real-Time Queue Tracking', body: 'Live updates keep patients informed and reduce congestion in waiting areas.' },
          { title: 'Doctor Availability', body: 'Track physician schedules, set leaves, and respond to emergency demand.' },
          { title: 'Emergency Prioritization', body: 'Critical cases are elevated automatically and routed to the next available specialist.' },
          { title: 'Analytics & Reporting', body: 'Measure average wait time, throughput, and department performance with premium dashboards.' },
          { title: 'Automated Notifications', body: 'Email and SMS alerts keep patients in sync with their queue status and reminders.' },
        ].map((service) => (
          <div key={service.title} className="glass-card rounded-[2rem] border border-white/10 p-8 transition hover:-translate-y-1">
            <h2 className="text-xl font-semibold text-white">{service.title}</h2>
            <p className="mt-3 text-muted">{service.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
