'use client';

import { useState } from 'react';
import { RSVP_STATUS, submitRsvp, validateRsvp } from '@/lib/rsvp.mjs';

const initialForm = {
  name: '',
  status: '',
  guests: '1',
  message: ''
};

export default function RsvpForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState({ status: 'idle', message: '' });

  function update(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    const result = validateRsvp(form);
    setErrors(result.errors);

    if (!result.valid) {
      setState({ status: 'error', message: 'Please correct the highlighted fields.' });
      return;
    }

    setState({ status: 'submitting', message: 'Submitting…' });

    try {
      const endpoint = process.env.NEXT_PUBLIC_RSVP_ENDPOINT;
      const submission = {
        ...result.value,
        submittedAt: new Date().toISOString(),
        source: 'wedding-microsite'
      };

      const response = await submitRsvp(endpoint, submission);

      if (response.mode === 'demo') {
        localStorage.setItem('sou-diksha-rsvp-demo', JSON.stringify(submission));
        setState({
          status: 'success',
          message: 'Demo RSVP saved on this device. Configure NEXT_PUBLIC_RSVP_ENDPOINT for real guest collection.'
        });
      } else {
        setState({ status: 'success', message: 'Thank you — your RSVP has been received.' });
        setForm(initialForm);
      }
    } catch (error) {
      setState({
        status: 'error',
        message: error instanceof Error ? error.message : 'Could not submit RSVP. Please try again.'
      });
    }
  }

  const attending = form.status === RSVP_STATUS.ATTENDING;

  return (
    <form className="rsvpForm" onSubmit={onSubmit} noValidate>
      <div className="field">
        <label htmlFor="name">Guest name</label>
        <input id="name" name="name" autoComplete="name" value={form.name} onChange={update} maxLength={80} />
        {errors.name && <p className="fieldError">{errors.name}</p>}
      </div>

      <fieldset className="field">
        <legend>Will you join us?</legend>
        <label className="radioLabel">
          <input type="radio" name="status" value={RSVP_STATUS.ATTENDING} checked={attending} onChange={update} />
          Happily attending
        </label>
        <label className="radioLabel">
          <input type="radio" name="status" value={RSVP_STATUS.DECLINED} checked={form.status === RSVP_STATUS.DECLINED} onChange={update} />
          Unable to attend
        </label>
        {errors.status && <p className="fieldError">{errors.status}</p>}
      </fieldset>

      {attending && (
        <div className="field">
          <label htmlFor="guests">Number of guests</label>
          <select id="guests" name="guests" value={form.guests} onChange={update}>
            {[1, 2, 3, 4, 5, 6].map((count) => <option key={count} value={count}>{count}</option>)}
          </select>
          {errors.guests && <p className="fieldError">{errors.guests}</p>}
        </div>
      )}

      <div className="field">
        <label htmlFor="message">Message for Soukarya & Diksha <span>(optional)</span></label>
        <textarea id="message" name="message" value={form.message} onChange={update} maxLength={500} rows={4} />
        <div className="fieldMeta">{form.message.length}/500</div>
        {errors.message && <p className="fieldError">{errors.message}</p>}
      </div>

      <button className="button buttonPrimary fullButton" disabled={state.status === 'submitting'} type="submit">
        {state.status === 'submitting' ? 'Submitting…' : 'Confirm RSVP'}
      </button>

      {state.message && (
        <p className={`formStatus ${state.status === 'error' ? 'formStatusError' : ''}`} role="status" aria-live="polite">
          {state.message}
        </p>
      )}
    </form>
  );
}
