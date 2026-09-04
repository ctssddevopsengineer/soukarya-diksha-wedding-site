'use client';

import { useEffect, useMemo, useState } from 'react';
import { buildInvitationAbsoluteUrl } from '@/lib/deep-link.mjs';
import { buildNfcWriteMessage, buildQrImageUrl, supportsWebNfc } from '@/lib/invitation-entry.mjs';

export default function QrNfcPanel({ themeId }) {
  const [locationLike, setLocationLike] = useState(null);
  const [status, setStatus] = useState('');
  const [nfcSupported, setNfcSupported] = useState(false);

  useEffect(() => {
    setLocationLike({
      origin: window.location.origin,
      pathname: window.location.pathname,
      search: window.location.search,
      hash: ''
    });
    setNfcSupported(supportsWebNfc(window));
  }, [themeId]);

  const invitationUrl = useMemo(() => {
    if (!locationLike) return '';
    return buildInvitationAbsoluteUrl(locationLike, { themeId, pageIndex: 0 });
  }, [locationLike, themeId]);

  const qrImageUrl = useMemo(() => buildQrImageUrl(invitationUrl), [invitationUrl]);

  async function copyNfcLink() {
    if (!invitationUrl) return;
    try {
      await navigator.clipboard.writeText(invitationUrl);
      setStatus('NFC target link copied');
    } catch {
      setStatus('Unable to copy NFC link automatically');
    }
  }

  async function writeNfcTag() {
    if (!nfcSupported || !invitationUrl) return;
    try {
      const writer = new window.NDEFReader();
      await writer.write(buildNfcWriteMessage(invitationUrl));
      setStatus('NFC tag written successfully');
    } catch (error) {
      setStatus(error?.message ? `NFC write failed: ${error.message}` : 'NFC write failed');
    }
  }

  return (
    <details className="qrNfcPanel">
      <summary className="qrNfcSummary">QR + NFC access</summary>
      <div className="qrNfcBody" aria-label="QR and NFC invitation access">
        <p className="qrNfcIntro">Both entry methods open the invitation front cover using the selected theme.</p>

        <div className="qrNfcGrid">
          <div className="qrAccessCard">
            <span className="qrNfcCardLabel">QR</span>
            {qrImageUrl ? (
              <img
                className="invitationQr"
                src={qrImageUrl}
                alt="QR code for this wedding reception invitation"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="invitationQrPlaceholder" aria-hidden="true" />
            )}
            <span className="qrNfcCardHint">Scan to open the invitation</span>
          </div>

          <div className="nfcAccessCard">
            <span className="qrNfcCardLabel">NFC</span>
            <div className="nfcGlyph" aria-hidden="true">)))</div>
            <span className="qrNfcCardHint">Use the same URL when programming a physical NFC tag</span>
            <div className="smartShareActions">
              <button type="button" className="experienceButton" onClick={copyNfcLink}>
                Copy NFC link
              </button>
              {nfcSupported && (
                <button type="button" className="experienceButton experienceButtonPrimary" onClick={writeNfcTag}>
                  Write NFC tag
                </button>
              )}
            </div>
          </div>
        </div>

        <p className="entryUrlPreview" aria-label="Invitation entry URL">{invitationUrl}</p>
        <span className="smartShareStatus" role="status" aria-live="polite">{status}</span>
      </div>
    </details>
  );
}
