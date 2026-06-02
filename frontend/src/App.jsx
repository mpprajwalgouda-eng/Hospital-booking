import { BrowserRouter } from 'react-router-dom';
import Router from './routes/Router';
import { AuthProvider } from './hooks/useAuth';
import { ToastProvider } from './components/ToastProvider';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Router />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
