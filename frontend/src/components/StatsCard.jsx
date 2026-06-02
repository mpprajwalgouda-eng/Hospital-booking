export default function StatsCard({ title, value, accent, children }) {
  return (
    <div className="glass-card rounded-[2rem] border border-white/10 p-6 shadow-glow">
      <p className="text-sm uppercase tracking-[0.32em] text-secondary">{title}</p>
      <div className="mt-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-3xl font-semibold text-white">{value}</p>
          {children && <p className="mt-2 text-sm text-muted">{children}</p>}
        </div>
        <div className={`rounded-3xl px-4 py-2 text-sm font-semibold ${accent}`}>Live</div>
      </div>
    </div>
  );
}
