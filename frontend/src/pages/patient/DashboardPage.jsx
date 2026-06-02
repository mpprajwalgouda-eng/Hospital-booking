import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import StatsCard from '../../components/StatsCard';
import api from '../../services/api';

const quickActions = [
  { label: 'Book Token', value: 'Book your slot in seconds' },
  { label: 'View Queue', value: 'Track your current position' },
  { label: 'Doctor Availability', value: 'See next available specialist' },
];

export default function PatientDashboard() {
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [bookingDate, setBookingDate] = useState(new Date().toISOString().split('T')[0]);
  const [priority, setPriority] = useState('normal');

  const [activeToken, setActiveToken] = useState(null);
  const [queuePosition, setQueuePosition] = useState(0);
  const [liveQueue, setLiveQueue] = useState([]);

  useEffect(() => {
    async function loadInitial() {
      try {
        const [deptRes, docRes] = await Promise.all([
          api.get('/api/departments'),
          api.get('/api/doctors')
        ]);
        setDepartments(deptRes.data);
        setDoctors(docRes.data);
      } catch (error) {
        console.warn('Unable to fetch departments/doctors', error);
      }
    }
    loadInitial();
    loadActiveToken();
  }, []);

  useEffect(() => {
    loadLiveQueue();
  }, [selectedDepartment]);

  async function loadActiveToken() {
    try {
      const { data } = await api.get('/api/tokens/my-tokens');
      const active = data.find(t => ['waiting', 'called', 'emergency'].includes(t.status));
      if (active) {
        setActiveToken(active);
        const liveQueueRes = await api.get(`/api/tokens/live?departmentId=${active.department._id}`);
        const index = liveQueueRes.data.findIndex(q => q._id === active._id);
        setQueuePosition(index >= 0 ? index : 0);
      } else {
        setActiveToken(null);
        setQueuePosition(0);
      }
    } catch (error) {
      console.warn('Unable to fetch active token', error);
    }
  }

  async function loadLiveQueue() {
    try {
      const url = selectedDepartment 
        ? `/api/tokens/live?departmentId=${selectedDepartment}`
        : '/api/tokens/live';
      const { data } = await api.get(url);
      setLiveQueue(data);
    } catch (error) {
      console.warn('Unable to fetch live queue', error);
    }
  }

  async function handleBookToken() {
    if (!selectedDepartment || !selectedDoctor) {
      alert('Please select both a department and a doctor.');
      return;
    }
    try {
      const response = await api.post('/api/tokens', {
        departmentId: selectedDepartment,
        doctorId: selectedDoctor,
        priority,
        slot: bookingDate ? new Date(bookingDate) : new Date(),
      });
      alert('Token successfully generated: ' + response.data.tokenNumber);
      
      setSelectedDoctor('');
      setPriority('normal');

      loadActiveToken();
      loadLiveQueue();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Failed to generate token. Please try again.');
    }
  }

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
    setSelectedDoctor('');
  };

  const filteredDoctors = doctors.filter(
    (doc) => doc.department && doc.department._id === selectedDepartment
  );

  const currentlyServing = liveQueue.find(t => t.status === 'called');
  const waitingTokens = liveQueue.filter(t => t.status !== 'called');
  const nextInLine = currentlyServing ? waitingTokens[0] : waitingTokens[1];
  const servingDisplay = currentlyServing || waitingTokens[0];

  const stats = {
    token: activeToken ? activeToken.tokenNumber : 'None',
    position: activeToken ? queuePosition : 0,
    wait: activeToken ? activeToken.estimatedWaitMinutes : 0,
    appointment: activeToken 
      ? `${activeToken.doctor?.user?.name || 'Doctor'}, ${new Date(activeToken.date).toLocaleDateString()} ${new Date(activeToken.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
      : 'None booked'
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard title="Active Token" value={stats.token} accent="bg-primary/15 text-primary">Current queue ticket</StatsCard>
        <StatsCard title="Queue Position" value={stats.position} accent="bg-secondary/15 text-secondary">Patients ahead</StatsCard>
        <StatsCard title="Est. Wait" value={`${stats.wait} min`} accent="bg-success/15 text-success">Based on current load</StatsCard>
        <StatsCard title="Upcoming Appointment" value={stats.appointment} accent="bg-warning/15 text-warning">Confirmed today</StatsCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-[2rem] border border-white/10 p-8 shadow-glow">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">Book a new token</h2>
              <p className="mt-2 text-muted">Choose a department, select a doctor, and confirm your slot.</p>
            </div>
            <span className="rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">Fast Booking</span>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <select 
              value={selectedDepartment} 
              onChange={handleDepartmentChange}
              className="rounded-3xl border border-white/10 bg-slate-950/60 px-4 py-4 text-white outline-none focus:border-primary"
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept._id} value={dept._id}>{dept.name}</option>
              ))}
            </select>
            <select 
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="rounded-3xl border border-white/10 bg-slate-950/60 px-4 py-4 text-white outline-none focus:border-primary"
              disabled={!selectedDepartment}
            >
              <option value="">Select Doctor</option>
              {filteredDoctors.map((doc) => (
                <option key={doc._id} value={doc._id}>{doc.user?.name || doc.specialty}</option>
              ))}
            </select>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <input 
              type="date" 
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              className="rounded-3xl border border-white/10 bg-slate-950/60 px-4 py-4 text-white outline-none focus:border-primary" 
            />
            <select 
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="rounded-3xl border border-white/10 bg-slate-950/60 px-4 py-4 text-white outline-none focus:border-primary"
            >
              <option value="normal">Normal Priority</option>
              <option value="emergency">Emergency Priority (Skip Queue)</option>
            </select>
          </div>
          <div className="mt-8">
            <button 
              onClick={handleBookToken}
              className="w-full rounded-full bg-secondary px-6 py-4 font-semibold text-white transition hover:bg-cyan-500"
            >
              Generate Token
            </button>
          </div>
        </motion.div>

        <div className="space-y-6">
          <div className="glass-card rounded-[2rem] border border-white/10 p-6 shadow-glow">
            <h3 className="text-xl font-semibold text-white">Live queue status</h3>
            <p className="mt-2 text-muted">Monitor changes with instant updates.</p>
            <div className="mt-6 space-y-3">
              <div className="rounded-3xl bg-slate-950/70 p-4">
                <p className="text-sm text-muted">Currently Serving</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-2xl font-semibold text-white">
                    {servingDisplay ? servingDisplay.tokenNumber : 'None'}
                  </span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                    {servingDisplay?.department?.name || 'General'}
                  </span>
                </div>
              </div>
              <div className="rounded-3xl bg-slate-950/70 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted">Next in line</p>
                  <span className="text-white">{nextInLine ? nextInLine.tokenNumber : 'None'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-[2rem] border border-white/10 p-6 shadow-glow">
            <h3 className="text-xl font-semibold text-white">Doctor availability</h3>
            <div className="mt-5 space-y-4">
              {doctors.length ? doctors.map((doctor) => (
                <div key={doctor._id} className="rounded-3xl bg-slate-950/70 p-4">
                  <p className="font-semibold text-white">{doctor.user?.name || 'Doctor'}</p>
                  <p className="text-sm text-muted">{doctor.specialty || 'Specialist'} • {doctor.status}</p>
                </div>
              )) : <p className="text-muted">Loading doctors...</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {quickActions.map((action) => (
          <div key={action.label} className="glass-card rounded-[2rem] border border-white/10 p-6">
            <h4 className="text-lg font-semibold text-white">{action.label}</h4>
            <p className="mt-3 text-muted">{action.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

