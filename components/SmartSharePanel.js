'use client';

import { useEffect, useMemo, useState } from 'react';
import { EVENT } from '@/lib/event.mjs';
import { buildInvitationAbsoluteUrl } from '@/lib/deep-link.mjs';

function legacyCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand('copy');
  textarea.remove();
  return copied;
}

export default function SmartSharePanel({ themeId, pageIndex, locationOpen = false }) {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    setCurrentLocation({
      origin: window.location.origin,
      pathname: window.location.pathname,
      search: window.location.search,
      hash: window.location.hash
    });
  }, [themeId, pageIndex, locationOpen]);

  const shareUrl = useMemo(() => {
    if (!currentLocation) return '';
    return buildInvitationAbsoluteUrl(currentLocation, { themeId, pageIndex, locationOpen });
  }, [currentLocation, themeId, pageIndex, locationOpen]);

  async function copyLink() {
    if (!shareUrl) return;
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(shareUrl);
      else if (!legacyCopy(shareUrl)) throw new Error('Copy unavailable');
      setStatus('Invitation link copied');
    } catch {
      setStatus('Unable to copy automatically');
    }
  }

  async function shareInvitation() {
    if (!shareUrl) return;
    const shareData = {
      title: EVENT.title,
      text: `${EVENT.description} ${EVENT.dateLabel} at ${EVENT.venueName}.`,
      url: shareUrl
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setStatus('Invitation shared');
      } else {
        await copyLink();
      }
    } catch (error) {
      if (error?.name !== 'AbortError') setStatus('Sharing cancelled or unavailable');
    }
  }

  return (
    <section className="smartSharePanel" aria-label="Share invitation">
      <div className="smartShareCopy">
        <strong>Share this invitation</strong>
        <span>The link keeps the selected theme and page.</span>
      </div>
      <div className="smartShareActions">
        <button type="button" className="experienceButton experienceButtonPrimary" onClick={shareInvitation}>
          Share
        </button>
        <button type="button" className="experienceButton" onClick={copyLink}>
          Copy link
        </button>
      </div>
      <span className="smartShareStatus" role="status" aria-live="polite">{status}</span>
    </section>
  );
}
