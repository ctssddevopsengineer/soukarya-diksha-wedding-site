'use client';

import { useRef, useState } from 'react';
import CalendarButtons from '@/components/CalendarButtons';
import Countdown from '@/components/Countdown';
import { EVENT } from '@/lib/event.mjs';

const HOVER_CLOSE_DELAY_MS = 180;

export default function InsideRight() {
  const [isPinnedOpen, setIsPinnedOpen] = useState(false);
  const [isHoverOpen, setIsHoverOpen] = useState(false);
  const closeTimerRef = useRef(null);
  const isLocationOpen = isPinnedOpen || isHoverOpen;

  function clearCloseTimer() {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }

  function openOnHover() {
    clearCloseTimer();
    setIsHoverOpen(true);
  }

  function scheduleHoverClose() {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setIsHoverOpen(false);
      closeTimerRef.current = null;
    }, HOVER_CLOSE_DELAY_MS);
  }

  function togglePinnedLocation() {
    clearCloseTimer();
    setIsPinnedOpen((value) => !value);
    setIsHoverOpen(false);
  }

  function closeLocation() {
    clearCloseTimer();
    setIsPinnedOpen(false);
    setIsHoverOpen(false);
  }

  return (
    <article className="invitePage exactInsideRight" aria-label="Inside right — reception details">
      {/* Approved template is preserved as the visual base. */}
      <img
        className="exactInsideRightArtwork"
        src="/images/inside-right-reference.png"
        alt="Ornate Reception Details template with Bengali and Nepali cultural artwork"
      />

      {/* All reception information is rendered from EVENT constants inside the Reception Details area. */}
      <section className="receptionDetailsOverlay" aria-label="Reception details">
        <div className="receptionDetailItem">
          <p className="receptionDetailLabel">Day &amp; Date</p>
          <p className="receptionDetailValue">{EVENT.dateLabel}</p>
        </div>

        <div className="receptionDetailDivider" aria-hidden="true"><span>◆</span></div>
        <br/>

        <div className="receptionDetailItem">
          <p className="receptionDetailLabel">Time</p>
          <p className="receptionDetailValue">{EVENT.timeLabel}</p>
        </div>

        <div className="receptionDetailDivider" aria-hidden="true"><span>◆</span></div>
        <br/>

        <div className="receptionDetailItem">
          <p className="receptionDetailLabel">Venue</p>
          <p className="receptionDetailValue">{EVENT.venueName}</p>
        </div>

        <div className="receptionDetailDivider" aria-hidden="true"><span>◆</span></div>
        <br/>

        <div className="receptionDetailItem receptionAddressItem">
          <p className="receptionDetailLabel">Address</p>
          <p className="receptionDetailValue receptionAddressValue">{EVENT.venueAddress}</p>
        </div>

        <div className="receptionDetailDivider" aria-hidden="true"><span>◆</span></div>
        <br/>

        <div className="receptionDetailItem receptionCalendarItem">
          <p className="receptionDetailLabel">Add to Calendar</p>
          <CalendarButtons />
        </div>

        <div className="receptionDetailDivider" aria-hidden="true"><span>◆</span></div>
        <br/>

        <div className="receptionDetailItem receptionCountdownItem">
          <p className="receptionDetailLabel">Until We Celebrate</p>
          <Countdown target={EVENT.start} />
        </div>
      </section>

      {/* Location / Map medallion: hover/focus on desktop, click/tap on all devices. */}
      <button
        type="button"
        className="exactLocationHotspot"
        onMouseEnter={openOnHover}
        onMouseLeave={scheduleHoverClose}
        onFocus={openOnHover}
        onBlur={scheduleHoverClose}
        onClick={togglePinnedLocation}
        aria-expanded={isLocationOpen}
        aria-controls="location-details-popover"
        aria-label="Show reception location details"
        title="Hover or tap for location details"
      >
        <span className="srOnly">Show location details</span>
      </button>

      <aside
        id="location-details-popover"
        className={`locationDetailsPopover ${isLocationOpen ? 'open' : ''}`}
        aria-hidden={!isLocationOpen}
        onMouseEnter={openOnHover}
        onMouseLeave={scheduleHoverClose}
      >
        <div className="locationPopoverHeader">
          <p>Location / Map</p>
          <button
            type="button"
            className="utilityCloseButton"
            onClick={closeLocation}
            aria-label="Close location details"
          >
            ×
          </button>
        </div>

        <div className="locationPopoverBody">
          <img
            className="locationQr"
            src="/images/location-qr.png"
            alt="QR code that opens the reception venue in Google Maps"
          />
          <div className="locationPopoverCopy">
            <p className="locationVenueName">{EVENT.venueName}</p>
            <p className="locationVenueAddress">{EVENT.venueAddress}</p>
            <a
              className="btn btnGold"
              href={EVENT.mapsUrl}
              target="_blank"
              rel="noreferrer"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </aside>
    </article>
  );
}
