import { useEffect, useState } from 'react';
import { Database } from 'lucide-react';
import { api } from '../utils/api';

export function DevModeIndicator() {
  const [show, setShow] = useState(false);
  const [isDev, setIsDev] = useState(false);

  useEffect(() => {
    const devMode = api.isDevelopment();
    setIsDev(devMode);
    setShow(devMode);

    // Auto-hide after 5 seconds
    if (devMode) {
      const timer = setTimeout(() => setShow(false), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-amber-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm animate-in fade-in slide-in-from-bottom-5">
      <Database size={16} />
      <span>Development Mode - Using Mock Data</span>
      <button
        onClick={() => setShow(false)}
        className="ml-2 hover:opacity-80"
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
}
