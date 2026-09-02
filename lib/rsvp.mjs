export const RSVP_STATUS = Object.freeze({
  ATTENDING: 'attending',
  DECLINED: 'declined'
});

export function normalizeRsvp(input = {}) {
  return {
    name: String(input.name ?? '').trim().replace(/\s+/g, ' '),
    status: String(input.status ?? '').trim(),
    guests: Number.parseInt(String(input.guests ?? '1'), 10),
    message: String(input.message ?? '').trim()
  };
}

export function validateRsvp(input) {
  const value = normalizeRsvp(input);
  const errors = {};

  if (value.name.length < 2 || value.name.length > 80) {
    errors.name = 'Please enter a name between 2 and 80 characters.';
  }

  if (![RSVP_STATUS.ATTENDING, RSVP_STATUS.DECLINED].includes(value.status)) {
    errors.status = 'Please select whether you will attend.';
  }

  if (!Number.isInteger(value.guests) || value.guests < 1 || value.guests > 6) {
    errors.guests = 'Guest count must be between 1 and 6.';
  }

  if (value.status === RSVP_STATUS.DECLINED) {
    value.guests = 1;
  }

  if (value.message.length > 500) {
    errors.message = 'Message must be 500 characters or fewer.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    value
  };
}

export async function submitRsvp(endpoint, payload, fetchImpl = fetch) {
  if (!endpoint) {
    return { mode: 'demo', ok: true };
  }

  const response = await fetchImpl(endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`RSVP submission failed with HTTP ${response.status}`);
  }

  return { mode: 'remote', ok: true };
}
