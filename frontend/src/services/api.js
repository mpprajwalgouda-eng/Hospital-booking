import axios from 'axios';

const api = axios.create({
  baseURL: 'https://hospital-booking-backend-4upp.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;