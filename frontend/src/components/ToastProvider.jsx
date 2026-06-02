import { createContext, useContext, useMemo, useState } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [messages, setMessages] = useState([]);

  const showToast = (message, variant = 'info') => {
    const id = Date.now();
    setMessages((current) => [...current, { id, message, variant }]);
    window.setTimeout(() => setMessages((current) => current.filter((toast) => toast.id !== id)), 3500);
  };

  const value = useMemo(() => ({ showToast }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-4 top-4 z-50 flex flex-col gap-3">
        {messages.map((toast) => (
          <div key={toast.id} className={`rounded-2xl border border-white/10 bg-slate-900/95 p-4 shadow-glow text-sm text-white ${toast.variant === 'success' ? 'border-emerald-500/30' : toast.variant === 'danger' ? 'border-rose-500/30' : 'border-sky-500/30'}`}>
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
