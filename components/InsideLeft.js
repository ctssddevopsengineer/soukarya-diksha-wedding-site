import { EVENT } from '@/lib/event.mjs';
import { buildTelHref, isConfiguredContact } from '@/lib/contact.mjs';

export default function InsideLeft() {
  return (
    <article className="invitePage exactInsideLeft" aria-label="Inside left — compliments and contact details">
      <img
        className="exactInsideLeftArtwork"
        src="/images/inside-left-reference.png"
        alt="Ornate deep-red, antique-gold and ivory wedding invitation interior with S and D monogram"
      />

      <section className="exactContactOverlay" aria-labelledby="inside-left-contact-title">
        <h2 id="inside-left-contact-title">Contact Details</h2>
        <div className="exactContactRows">
          {EVENT.contacts.map((contact) => {
            const configured = isConfiguredContact(contact);
            return (
              <div className="exactContactRow" key={contact.role}>
                <span>{contact.name}</span>
                <span className="exactContactPipe" aria-hidden="true">|</span>
                {configured ? (
                  <a href={buildTelHref(contact.phone)}>{contact.phone}</a>
                ) : (
                  <span>{contact.phone}</span>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </article>
  );
}
