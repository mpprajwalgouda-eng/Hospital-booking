import { useEffect, useState } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend } from 'chart.js';
import StatsCard from '../../components/StatsCard';
import api from '../../services/api';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend);

export default function AdminDashboardPage() {
  const [summary, setSummary] = useState({ totalPatients: 680, activeDoctors: 32, activeQueues: 16, emergencyCases: 4 });
  const [departmentStats, setDepartmentStats] = useState([30, 20, 15, 35]);
  const [report, setReport] = useState([]);

  useEffect(() => {
    async function loadSummary() {
      try {
        const { data } = await api.get('/api/analytics/summary');
        setSummary(data);
        setDepartmentStats(data.departmentAnalytics.map((item) => item.count).slice(0, 4));
      } catch (error) {
        console.warn(error);
      }
    }
    loadSummary();
  }, []);

  const lineData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Tokens issued',
        data: [45, 68, 52, 80, 72, 88, 96],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.18)',
        tension: 0.35,
        fill: true,
      },
    ],
  };

  const pieData = {
    labels: ['Cardiology', 'Radiology', 'General', 'Emergency'],
    datasets: [{ data: departmentStats, backgroundColor: ['#3B82F6', '#06B6D4', '#22C55E', '#F59E0B'] }],
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard title="Total Patients" value={summary.totalPatients} accent="bg-primary/15 text-primary">Registered visitors</StatsCard>
        <StatsCard title="Active Doctors" value={summary.activeDoctors} accent="bg-secondary/15 text-secondary">Currently online</StatsCard>
        <StatsCard title="Active Queues" value={summary.activeQueues} accent="bg-warning/15 text-warning">Ongoing sessions</StatsCard>
        <StatsCard title="Emergency Cases" value={summary.emergencyCases} accent="bg-danger/15 text-danger">Priority alerts</StatsCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.6fr,1fr]">
        <div className="glass-card rounded-[2rem] border border-white/10 p-8 shadow-glow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-secondary">Hospital Analytics</p>
              <h2 className="text-2xl font-semibold text-white">Token growth</h2>
            </div>
            <span className="rounded-full bg-secondary/10 px-4 py-2 text-sm text-secondary">Last 7 days</span>
          </div>
          <div className="mt-8">
            <Line data={lineData} options={{ responsive: true, plugins: { legend: { display: false } }, scales: { x: { ticks: { color: '#94A3B8' }, grid: { display: false } }, y: { ticks: { color: '#94A3B8' }, grid: { color: 'rgba(148,163,184,0.12)' } } } }} />
          </div>
        </div>
        <div className="glass-card rounded-[2rem] border border-white/10 p-8 shadow-glow">
          <p className="text-sm uppercase tracking-[0.32em] text-secondary">Department breakdown</p>
          <h3 className="mt-4 text-2xl font-semibold text-white">Queue distribution</h3>
          <div className="mt-8">
            <Doughnut data={pieData} options={{ responsive: true, plugins: { legend: { position: 'bottom', labels: { color: '#CBD5E1' } } } }} />
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {['Patient wait time', 'Doctor performance', 'Emergency response'].map((label) => (
          <div key={label} className="glass-card rounded-[2rem] border border-white/10 p-6 shadow-glow">
            <p className="text-sm uppercase tracking-[0.32em] text-secondary">{label}</p>
            <p className="mt-4 text-3xl font-semibold text-white">{label === 'Emergency response' ? '96%' : label === 'Doctor performance' ? '4.9/5' : '18 min'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
