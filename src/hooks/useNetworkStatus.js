import React from 'react';
// from https://raw.githubusercontent.com/jaredpalmer/the-platform/master/src/useNetworkStatus.tsx
export const useNetworkStatus = () => {
  const [status, setStatus] = React.useState(navigator.onLine);
  const [offlineAt, setOfflineAt] = React.useState(undefined);

  React.useEffect(() => {
    const handleOnline = () => {
      setStatus(true);
      setOfflineAt(undefined);
    };

    const handleOffline = () => {
      setStatus(false);
      setOfflineAt(new Date());
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return {
    isOnline: status,
    offlineAt,
  };
};
