export default function ContactPage() {
  return (
    <div className="grid gap-10 lg:grid-cols-[0.9fr,0.7fr]">
      <div className="glass-card rounded-[2rem] border border-white/10 p-10 shadow-glow">
        <span className="text-sm uppercase tracking-[0.32em] text-secondary">Contact Center</span>
        <h1 className="mt-4 text-4xl font-semibold text-white">Talk to our healthcare operations team.</h1>
        <p className="mt-6 text-muted">Need implementation support or want a live demo? Reach out and we’ll connect you with the right specialist.</p>
        <div className="mt-10 space-y-4">
          <div>
            <p className="text-sm text-secondary">Email</p>
            <p className="text-white">info@smarthospital.io</p>
          </div>
          <div>
            <p className="text-sm text-secondary">Phone</p>
            <p className="text-white">+1 (800) 555-0199</p>
          </div>
          <div>
            <p className="text-sm text-secondary">Office</p>
            <p className="text-white">123 Health Avenue, Suite 400</p>
          </div>
        </div>
      </div>
      <div className="glass-card rounded-[2rem] border border-white/10 p-10 shadow-glow">
        <form className="space-y-6">
          <div>
            <label className="text-sm font-medium text-white">Name</label>
            <input className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none focus:border-primary" placeholder="Jane Doe" />
          </div>
          <div>
            <label className="text-sm font-medium text-white">Email</label>
            <input className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none focus:border-primary" placeholder="jane@example.com" />
          </div>
          <div>
            <label className="text-sm font-medium text-white">Message</label>
            <textarea rows="5" className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none focus:border-primary" placeholder="Tell us about your hospital needs." />
          </div>
          <button className="w-full rounded-full bg-primary px-6 py-3 font-semibold text-white transition hover:bg-blue-500">Send Message</button>
        </form>
      </div>
    </div>
  );
}
