import { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';

export function useRealtimeTicker() {
  const notifications = useAppStore((s) => s.notifications);
  useEffect(() => {
    const id = setInterval(() => {
      localStorage.setItem('shirwal-last-tick', new Date().toISOString());
    }, 10000);
    return () => clearInterval(id);
  }, [notifications.length]);
}
