'use client';

import { useEffect, useState } from 'react';
import { EVENT } from '@/lib/event.mjs';

function remaining(target) {
  const diff = Math.max(0, new Date(target).getTime() - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1_000) % 60)
  };
}

export default function Countdown() {
  const [time, setTime] = useState(() => remaining(EVENT.start));

  useEffect(() => {
    const id = window.setInterval(() => setTime(remaining(EVENT.start)), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="countdown" aria-label="Countdown to reception">
      {Object.entries(time).map(([label, value]) => (
        <div className="countdownItem" key={label}>
          <strong>{String(value).padStart(2, '0')}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
