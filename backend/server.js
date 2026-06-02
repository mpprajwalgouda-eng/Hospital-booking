const express = require('express');
const http = require('http');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const { connectDatabase } = require('./config/db');
const { errorHandler } = require('./middleware/errorHandler');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const doctorRoutes = require('./routes/doctors');
const patientRoutes = require('./routes/patients');
const departmentRoutes = require('./routes/departments');
const tokenRoutes = require('./routes/tokens');
const notificationRoutes = require('./routes/notifications');
const analyticsRoutes = require('./routes/analytics');
const { initSocket } = require('./utils/socket');

dotenv.config();
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

connectDatabase();

app.use(
  cors({
    origin: [
      'https://6a1e720320ecf719f6b0b5a2--reliable-banoffee-5518a4.netlify.app'
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Smart Hospital Queue API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/tokens', tokenRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/analytics', analyticsRoutes);

app.use(errorHandler);

const io = initSocket(server);

server.listen(PORT, () => {
  console.log(`Backend server running on https://hospital-booking-backend-4upp.onrender.com:${PORT}`);
});
