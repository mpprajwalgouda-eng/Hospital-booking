import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('hospital-token');
    const userData = localStorage.getItem('hospital-user');
    if (token && userData) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      login: async (token, userInfo) => {
        localStorage.setItem('hospital-token', token);
        localStorage.setItem('hospital-user', JSON.stringify(userInfo));
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
        setUser(userInfo);
      },
      logout: () => {
        localStorage.removeItem('hospital-token');
        localStorage.removeItem('hospital-user');
        delete api.defaults.headers.common.Authorization;
        setUser(null);
      },
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
