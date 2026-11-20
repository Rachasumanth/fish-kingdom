import { useEffect, useState } from 'react';
import { Bell, BellOff } from 'lucide-react';
import { showToast } from '@devvit/web/client';
import type { NotificationStatusResponse } from '../../shared/engagement';

export const NotificationsToggle = () => {
  const [status, setStatus] = useState<NotificationStatusResponse | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/notifications/status')
      .then((res) => res.json())
      .then((data: NotificationStatusResponse) => {
        if (!cancelled) setStatus(data);
      })
      .catch((err) => console.error('Failed to load notification status', err));
    return () => {
      cancelled = true;
    };
  }, []);

  if (!status || !status.loggedIn) return null;

  const toggle = async () => {
    setBusy(true);
    try {
      const res = await fetch('/api/notifications/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled: !status.optedIn }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: NotificationStatusResponse = await res.json();
      setStatus(data);
      showToast(data.optedIn ? 'Notifications enabled' : 'Notifications turned off');
    } catch (err) {
      console.error('Failed to update notifications', err);
      showToast('Could not update notifications');
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      onClick={() => void toggle()}
      disabled={busy}
      aria-pressed={status.optedIn}
      className="pointer-events-auto flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1.5 text-[11px] font-semibold text-white/90 shadow-lg backdrop-blur-sm transition hover:bg-black/60 disabled:opacity-60"
    >
      {status.optedIn ? (
        <Bell className="w-3.5 h-3.5 text-amber-300" />
      ) : (
        <BellOff className="w-3.5 h-3.5 text-white/60" />
      )}
      <span>{status.optedIn ? 'Notifications on' : 'Notifications off'}</span>
    </button>
  );
};
