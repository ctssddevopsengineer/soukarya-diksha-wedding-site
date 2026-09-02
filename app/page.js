import CalendarButtons from '@/components/CalendarButtons';
import Countdown from '@/components/Countdown';
import RsvpForm from '@/components/RsvpForm';
import { EVENT } from '@/lib/event.mjs';

const basePath = process.env.GITHUB_ACTIONS === 'true' && process.env.GITHUB_REPOSITORY
  ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}`
  : '';

export default function Home() {
  return (
    <main>
      <header className="hero">
        <img
          className="heroArtwork"
          src={`${basePath}/images/reception-card.png`}
          alt="Soukarya and Diksha reception invitation artwork"
        />
        <div className="heroOverlay" />
        <div className="heroContent">
          <p className="eyebrow">Reception Invitation</p>
          <h1>Soukarya <span>&amp;</span> Diksha</h1>
          <p className="tagline">{EVENT.tagline}</p>
          <a className="button buttonLight" href="#rsvp">RSVP</a>
        </div>
      </header>

      <section className="section introSection">
        <div className="ornament">✦</div>
        <p className="kicker">Together with their families</p>
        <h2>Invite you to celebrate their wedding reception</h2>
        <p className="bodyCopy">Your presence and blessings will make our celebration complete.</p>
      </section>

      <section className="section splitSection">
        <article className="panel">
          <p className="kicker">Save the date</p>
          <h2>18 January 2027</h2>
          <p>Monday · 6:30 PM onwards</p>
          <CalendarButtons />
        </article>

        <article className="panel" id="venue">
          <p className="kicker">The venue</p>
          <h2>{EVENT.venueName}</h2>
          <p>{EVENT.venueAddress}</p>
          <a className="button buttonPrimary" href={EVENT.mapsUrl} target="_blank" rel="noreferrer">
            Open in Google Maps
          </a>
        </article>
      </section>

      <section className="section countdownSection">
        <p className="kicker">Until we celebrate</p>
        <Countdown />
      </section>

      <section className="section rsvpSection" id="rsvp">
        <div className="sectionHeading">
          <p className="kicker">We would love to celebrate with you</p>
          <h2>RSVP</h2>
          <p>Kindly confirm your presence.</p>
        </div>
        <RsvpForm />
      </section>

      <footer className="footer">
        <div className="monogram">S <span>&amp;</span> D</div>
        <p>Tap · Scan · Celebrate</p>
        <small>Soukarya &amp; Diksha</small>
      </footer>
    </main>
  );
}
