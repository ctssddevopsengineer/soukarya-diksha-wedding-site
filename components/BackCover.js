import ContactDetails from '@/components/ContactDetails';
import { EVENT } from '@/lib/event.mjs';

export default function BackCover() {
  return (
    <article className="invitePage parchmentPage backCover" aria-label="Back cover — contact details">
      <div className="pageContent backContent">
        <div className="monogram large">S <span>&amp;</span> D</div>
        <p className="scriptLine">With love and gratitude</p>
        <h2>Thank you for being part of our journey.</h2>
        <div className="divider"><span>◆</span></div>

        <p className="eyebrow">Contact Details</p>
        <p className="muted centered">
          For venue directions or reception-related assistance, please contact our families.
        </p>
        <ContactDetails contacts={EVENT.contacts} />

        <div className="techSignature">
          <span className="tapGlyph" aria-hidden="true">◉</span>
          <strong>Tap · Scan · Celebrate</strong>
          <p>NFC + QR enabled digital invitation</p>
        </div>

        <p className="closingLine">A Celebration of Two Cultures, One Beautiful Journey</p>
      </div>
    </article>
  );
}
