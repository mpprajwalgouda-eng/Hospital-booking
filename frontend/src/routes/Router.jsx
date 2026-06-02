import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../pages/public/LandingPage';
import AboutPage from '../pages/public/AboutPage';
import ServicesPage from '../pages/public/ServicesPage';
import ContactPage from '../pages/public/ContactPage';
import LoginPage from '../pages/public/LoginPage';
import RegisterPage from '../pages/public/RegisterPage';
import ForgotPasswordPage from '../pages/public/ForgotPasswordPage';
import PatientDashboard from '../pages/patient/DashboardPage';
import DoctorDashboard from '../pages/doctor/DoctorDashboardPage';
import AdminDashboard from '../pages/admin/AdminDashboardPage';
import ProtectedRoute from '../components/ProtectedRoute';
import RoleRoute from '../components/RoleRoute';
import PublicLayout from '../layouts/PublicLayout';
import DashboardLayout from '../layouts/DashboardLayout';

function Router() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}> 
          <Route path="/patient/*" element={<RoleRoute allowedRoles={[ 'patient' ]}><PatientDashboard /></RoleRoute>} />
          <Route path="/doctor/*" element={<RoleRoute allowedRoles={[ 'doctor' ]}><DoctorDashboard /></RoleRoute>} />
          <Route path="/admin/*" element={<RoleRoute allowedRoles={[ 'admin' ]}><AdminDashboard /></RoleRoute>} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default Router;
