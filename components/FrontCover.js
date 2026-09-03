import { EVENT } from '@/lib/event.mjs';

export default function FrontCover({ onOpen }) {
  return (
    <article className="invitePage frontCover" aria-label="Front cover">
      <img className="coverArtwork" src="/images/reception-card.png" alt="Soukarya and Diksha reception invitation artwork" />
      <div className="coverShade" />
      <div className="coverAction">
        <button className="openButton" type="button" onClick={onOpen}>
          <span>Open Invitation</span>
          <span aria-hidden="true">↓</span>
        </button>
      </div>
      <span className="srOnly">{EVENT.title}</span>
    </article>
  );
}
