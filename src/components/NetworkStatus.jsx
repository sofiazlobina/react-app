import { useState, useEffect } from 'react';
import './NetworkStatus.css';

const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="network-status network-status--offline" role="alert">
      <span className="network-status__icon">📡</span>
      <span className="network-status__text">
        Вы в офлайне. Некоторые функции могут быть недоступны.
      </span>
    </div>
  );
};

export default NetworkStatus;
