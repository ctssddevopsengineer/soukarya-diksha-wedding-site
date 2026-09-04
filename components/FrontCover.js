import { EVENT } from '@/lib/event.mjs';
import { getTheme, getThemeAsset } from '@/lib/theme.mjs';

export default function FrontCover({ onOpen, themeId }) {
  const theme = getTheme(themeId);
  const frontMonogram = getThemeAsset(themeId, 'insideLeftMonogram');

  return (
    <article className="invitePage frontCover" aria-label="Front cover">
      <img
        className="coverArtwork"
        src={getThemeAsset(themeId, 'front')}
        alt={`${EVENT.couple} reception invitation artwork`}
      />

      {theme.dynamicFront && (
        <section className="dynamicFrontCopy" aria-label="Reception invitation cover text">
          {frontMonogram && (
            <img
              className="dynamicFrontMonogram"
              src={frontMonogram}
              alt={`${EVENT.couple} monogram`}
            />
          )}
          <h1 className="dynamicFrontHeading">
            <span>{EVENT.frontCover.heading}</span>
            <em>{EVENT.frontCover.subheading}</em>
          </h1>
          <div className="dynamicFrontRule" aria-hidden="true"><span>✥</span></div>
          <p className="dynamicFrontTagline">{EVENT.tagline}</p>
          <div className="dynamicFrontRule dynamicFrontNamesRule" aria-hidden="true"><span>✥</span></div>
          <p className="dynamicFrontNames">
            <span>{EVENT.groomName}</span>
            <b>&amp;</b>
            <span>{EVENT.brideName}</span>
          </p>
          <div className="dynamicFrontRule dynamicFrontClosingRule" aria-hidden="true"><span>✥</span></div>
          <p className="dynamicFrontClosing">
            {EVENT.frontCover.closingLines.map((line, index) => (
              <span key={`${line}-${index}`}>{line}</span>
            ))}
          </p>
        </section>
      )}

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
