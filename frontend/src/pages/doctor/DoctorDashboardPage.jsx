import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import StatsCard from '../../components/StatsCard';
import api from '../../services/api';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function DoctorDashboardPage() {
  const [queue, setQueue] = useState([]);
  const [stats, setStats] = useState({ today: 0, active: 0, upcoming: 0, completed: 0 });

  async function loadData() {
    try {
      const [queueRes, statsRes] = await Promise.all([
        api.get('/api/tokens/live'),
        api.get('/api/analytics/summary')
      ]);
      setQueue(queueRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.warn('Error fetching doctor dashboard data', error);
    }
  }

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, []);

  async function updateStatus(tokenId, newStatus) {
    try {
      await api.put(`/api/tokens/${tokenId}/status`, { status: newStatus });
      loadData();
    } catch (error) {
      console.error('Failed to update status', error);
      alert(error.response?.data?.message || 'Failed to update status. Please try again.');
    }
  }

  const chartData = {
    labels: ['08:00', '10:00', '12:00', '14:00', '16:00'],
    datasets: [
      {
        label: 'Patients served',
        data: [3, 6, 4, 5, 2],
        backgroundColor: '#3B82F6',
        borderRadius: 12,
      },
    ],
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard title="Today's Patients" value={stats.today} accent="bg-primary/15 text-primary">Today’s active roster</StatsCard>
        <StatsCard title="Active Queue" value={stats.active} accent="bg-secondary/15 text-secondary">Patients waiting now</StatsCard>
        <StatsCard title="Upcoming" value={stats.upcoming} accent="bg-warning/15 text-warning">Scheduled next</StatsCard>
        <StatsCard title="Completed" value={stats.completed} accent="bg-success/15 text-success">Already served</StatsCard>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.35fr,0.65fr]">
        <div className="glass-card rounded-[2rem] border border-white/10 p-8 shadow-glow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-secondary">Performance</p>
              <h2 className="text-2xl font-semibold text-white">Hourly throughput</h2>
            </div>
            <span className="rounded-full bg-secondary/10 px-4 py-2 text-sm text-secondary">Updated</span>
          </div>
          <div className="mt-8">
            <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false }, ticks: { color: '#94A3B8' } }, y: { grid: { color: 'rgba(148,163,184,0.12)' }, ticks: { color: '#94A3B8' } } } }} />
          </div>
        </div>

        <div className="glass-card rounded-[2rem] border border-white/10 p-8 shadow-glow">
          <p className="text-sm uppercase tracking-[0.32em] text-secondary">Patient Queue</p>
          <h3 className="mt-4 text-2xl font-semibold text-white">Next cases</h3>
          <div className="mt-6 space-y-4">
            {queue.length ? queue.map((item) => (
              <div key={item._id} className="rounded-3xl bg-slate-950/70 p-5 border border-white/5 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-semibold text-white text-lg">{item.tokenNumber}</span>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${
                    item.status === 'called' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-muted">Patient Name</p>
                  <p className="font-medium text-white">{item.patient?.name || 'Unknown Patient'}</p>
                </div>
                <div>
                  <p className="text-xs text-muted">Priority</p>
                  <p className={`text-sm font-semibold ${item.priority === 'emergency' ? 'text-danger' : 'text-primary'}`}>
                    {item.priority === 'emergency' ? 'Emergency Priority' : 'Standard Queue'}
                  </p>
                </div>
                <div className="flex gap-2 pt-2">
                  {item.status !== 'called' ? (
                    <button 
                      onClick={() => updateStatus(item._id, 'called')}
                      className="flex-1 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-600"
                    >
                      Call Patient
                    </button>
                  ) : (
                    <>
                      <button 
                        onClick={() => updateStatus(item._id, 'completed')}
                        className="flex-1 rounded-full bg-success px-4 py-2 text-xs font-semibold text-white transition hover:bg-green-600"
                      >
                        Complete
                      </button>
                      <button 
                        onClick={() => updateStatus(item._id, 'cancelled')}
                        className="flex-1 rounded-full bg-danger px-4 py-2 text-xs font-semibold text-white transition hover:bg-red-600"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            )) : <p className="text-muted">No active patients in queue...</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
