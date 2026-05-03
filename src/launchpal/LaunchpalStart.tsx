import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

type RealityValue = 'yes_scoping' | 'no_platform' | 'no_cheaper' | '';

const realityOptions: { value: RealityValue; label: string }[] = [
  { value: 'yes_scoping', label: 'YES — I want expert scoping and a working build in 2 weeks' },
  { value: 'no_platform', label: "NO — I'm building a massive platform (marketplace, social network, financial product)" },
  { value: 'no_cheaper',  label: "NO — I'm looking for the cheapest option available" },
];

export default function LaunchpalStart() {
  const [name,        setName]        = useState('');
  const [email,       setEmail]       = useState('');
  const [idea,        setIdea]        = useState('');
  const [reality,     setReality]     = useState<RealityValue>('');
  const [recording,   setRecording]   = useState(false);
  const [transcribing,setTranscribing]= useState(false);
  const [submitted,   setSubmitted]   = useState(false);
  const [submitting,  setSubmitting]  = useState(false);
  const [error,       setError]       = useState('');

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef        = useRef<Blob[]>([]);

  const startRecording = async () => {
    setError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      mediaRecorderRef.current = mr;
      chunksRef.current = [];
      mr.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      mr.onstop = async () => {
        stream.getTracks().forEach(t => t.stop());
        await transcribeBlob(new Blob(chunksRef.current, { type: 'audio/webm' }));
      };
      mr.start();
      setRecording(true);
    } catch {
      setError('Microphone access denied. Please type your idea below.');
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
    setTranscribing(true);
  };

  const transcribeBlob = async (blob: Blob) => {
    const fd = new FormData();
    fd.append('audio', blob, 'recording.webm');
    try {
      const res  = await fetch('/api/transcribe', { method: 'POST', body: fd });
      if (!res.ok) throw new Error();
      const data = await res.json();
      if (data.text) setIdea(prev => prev ? `${prev} ${data.text}` : data.text);
    } catch {
      setError('Transcription failed. Please type your idea below.');
    } finally {
      setTranscribing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !idea || !reality) return;
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, idea, reality }),
      });
      if (res.ok) setSubmitted(true);
      else setError('Submission failed. Email go@100k31d.co directly.');
    } catch {
      setError('Submission failed. Email go@100k31d.co directly.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="lp-start">
        <style>{css}</style>
        <div className="lp-success">
          <div className="lp-success-bar" />
          <p className="lp-overline" style={{ marginBottom: '1rem' }}>Received</p>
          <h1 className="lp-success-title">Sprint request logged.</h1>
          <p className="lp-body" style={{ marginBottom: '2.5rem' }}>
            I'll review your idea and reply within 48 hours.
            If it's a fit, we'll schedule a 20-minute scoping call.
          </p>
          <Link to="/launchpal" className="lp-back-link">← Back to Launchpal</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="lp-start">
      <style>{css}</style>
      <div className="lp-form-wrap">

        <Link to="/launchpal" className="lp-back-link" style={{ display: 'block', marginBottom: '4rem' }}>
          ← Launchpal
        </Link>

        <div className="lp-form-header">
          <p className="lp-overline" style={{ marginBottom: '0.75rem' }}>Sprint Intake</p>
          <h1 className="lp-form-title">Start a Sprint.</h1>
          <p className="lp-body">Two minutes. I'll read it today.</p>
        </div>

        <form onSubmit={handleSubmit} className="lp-form">

          {/* 01 — Identity */}
          <fieldset className="lp-fieldset">
            <legend className="lp-legend">01 — Identity</legend>
            <div className="lp-field">
              <label className="lp-label">Name</label>
              <input
                type="text" value={name} onChange={e => setName(e.target.value)}
                required autoComplete="name" placeholder="Your name"
                className="lp-input"
              />
            </div>
            <div className="lp-field">
              <label className="lp-label">Email</label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                required autoComplete="email" placeholder="you@example.com"
                className="lp-input"
              />
            </div>
          </fieldset>

          {/* 02 — The Idea */}
          <fieldset className="lp-fieldset">
            <legend className="lp-legend">02 — The Idea</legend>
            <p className="lp-body" style={{ marginBottom: '1rem' }}>
              Describe your idea as if explaining it to a smart friend.
              What does it do? Who's it for? What problem does it solve?
            </p>
            <textarea
              value={idea} onChange={e => setIdea(e.target.value)}
              required rows={6} placeholder="Describe your idea…"
              className="lp-textarea"
            />
            <div className="lp-record-row">
              <button
                type="button"
                onClick={recording ? stopRecording : startRecording}
                disabled={transcribing}
                className={`lp-record-btn ${recording ? 'lp-record-btn--active' : ''}`}
              >
                <span className={`lp-record-dot ${recording ? 'lp-record-dot--active' : ''}`} />
                {transcribing ? 'Transcribing…' : recording ? 'Stop recording' : 'Speak your idea'}
              </button>
              {transcribing && <span className="lp-caption">Processing audio…</span>}
            </div>
          </fieldset>

          {/* 03 — Reality Check */}
          <fieldset className="lp-fieldset">
            <legend className="lp-legend">03 — The Reality Check</legend>
            <p className="lp-body" style={{ marginBottom: '1.25rem' }}>
              Be honest. This determines if we're a fit.
            </p>
            <div className="lp-radio-group">
              {realityOptions.map(({ value, label }) => (
                <label key={value} className="lp-radio-label">
                  <input
                    type="radio" name="reality" value={value}
                    checked={reality === value} onChange={() => setReality(value)}
                    required className="sr-only"
                  />
                  <div className={`lp-radio-box ${reality === value ? 'lp-radio-box--checked' : ''}`}>
                    {reality === value && <div className="lp-radio-dot" />}
                  </div>
                  <span className={`lp-body lp-radio-text ${reality === value ? 'lp-radio-text--checked' : ''}`}>
                    {label}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Submit */}
          <div className="lp-submit-area">
            {error && <p className="lp-error">{error}</p>}
            <p className="lp-caption" style={{ marginBottom: '1.25rem', lineHeight: 1.7 }}>
              By submitting, you agree to the{' '}
              <Link to="/launchpal/tos" className="lp-tos-link">Terms of Service</Link>.
              Note: 14 days of unresponsiveness results in project abandonment and a $350 rescheduling fee.
            </p>
            <button
              type="submit"
              disabled={submitting || !name || !email || !idea || !reality}
              className="lp-submit-btn"
            >
              {submitting ? 'Sending…' : 'Submit Sprint Request'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

const css = `
  .lp-start {
    min-height: 100vh;
    background: var(--lp-bg);
    color: var(--lp-fg);
    font-family: 'SF Mono', 'SFMono-Regular', ui-monospace, Menlo, Consolas, monospace;
  }

  @keyframes lpFadeIn {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes lpPulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.5; }
  }

  /* Layout */
  .lp-form-wrap { max-width: 42rem; margin: 0 auto; padding: 4rem 1.5rem 6rem; }

  /* Header */
  .lp-form-header { margin-bottom: 3.5rem; animation: lpFadeIn 0.5s ease-out forwards; }
  .lp-form-title  { font-size: 2.25rem; font-weight: 700; color: var(--lp-fg); margin: 0.75rem 0 0.5rem; }

  /* Success screen */
  .lp-success {
    max-width: 32rem; margin: 0 auto; padding: 6rem 1.5rem;
    text-align: center;
    animation: lpFadeIn 0.5s ease-out forwards;
  }
  .lp-success-bar { width: 2px; height: 3rem; background: var(--lp-fg); margin: 0 auto 2.5rem; }
  .lp-success-title { font-size: 1.8rem; font-weight: 700; color: var(--lp-fg); margin: 0 0 1rem; }

  /* Typography */
  .lp-overline { font-size: 13px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--lp-fg-4); }
  .lp-body     { font-size: 16px; color: var(--lp-fg-3); line-height: 1.8; margin: 0; }
  .lp-caption  { font-size: 14px; color: var(--lp-fg-4); }
  .lp-error    { font-size: 14px; color: #e03030; margin-bottom: 0.75rem; }
  .lp-back-link  { font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--lp-fg-4); text-decoration: none; transition: color 0.15s; }
  .lp-back-link:hover { color: var(--lp-fg); }
  .lp-tos-link   { color: var(--lp-fg-2); text-decoration: underline; text-underline-offset: 3px; transition: color 0.15s; }
  .lp-tos-link:hover { color: var(--lp-fg); }

  /* Form */
  .lp-form { display: flex; flex-direction: column; gap: 3.5rem; }
  .lp-fieldset { border: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 1.75rem; }
  .lp-legend {
    font-size: 13px; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--lp-fg-4); width: 100%;
    border-bottom: 1px solid var(--lp-border); padding-bottom: 0.75rem;
    margin-bottom: 0.5rem;
  }
  .lp-field { display: flex; flex-direction: column; gap: 0.5rem; }
  .lp-label { font-size: 13px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--lp-fg-4); }

  .lp-input {
    background: transparent;
    border: none;
    border-bottom: 1px solid var(--lp-border-2);
    color: var(--lp-fg);
    font-family: inherit;
    font-size: 17px;
    padding: 0.7rem 0;
    outline: none;
    width: 100%;
    transition: border-color 0.2s;
  }
  .lp-input:focus { border-bottom-color: var(--lp-fg-2); }
  .lp-input::placeholder { color: var(--lp-fg-5); }

  .lp-textarea {
    background: var(--lp-bg-alt);
    border: 1px solid var(--lp-border);
    color: var(--lp-fg);
    font-family: inherit;
    font-size: 16px;
    line-height: 1.8;
    padding: 1.125rem;
    outline: none;
    width: 100%;
    resize: vertical;
    transition: border-color 0.2s;
    box-sizing: border-box;
  }
  .lp-textarea:focus { border-color: var(--lp-border-2); }
  .lp-textarea::placeholder { color: var(--lp-fg-5); }

  /* Voice recording */
  .lp-record-row { display: flex; align-items: center; gap: 1rem; }
  .lp-record-btn {
    display: inline-flex; align-items: center; gap: 0.6rem;
    font-family: inherit; font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase;
    border: 1px solid var(--lp-border-2); background: transparent;
    color: var(--lp-fg-3); padding: 0.7rem 1.125rem; cursor: pointer;
    transition: border-color 0.15s, color 0.15s;
  }
  .lp-record-btn:hover:not(:disabled) { border-color: var(--lp-fg-3); color: var(--lp-fg); }
  .lp-record-btn:disabled { opacity: 0.4; cursor: not-allowed; }
  .lp-record-btn--active {
    border-color: #e03030; color: #e03030;
    animation: lpPulse 1.4s ease-in-out infinite;
  }
  .lp-record-dot { width: 9px; height: 9px; border-radius: 50%; background: var(--lp-fg-4); flex-shrink: 0; }
  .lp-record-dot--active { background: #e03030; }

  /* Radio group */
  .lp-radio-group { display: flex; flex-direction: column; gap: 1rem; }
  .lp-radio-label { display: flex; align-items: flex-start; gap: 1rem; cursor: pointer; }
  .lp-radio-box {
    margin-top: 3px; width: 16px; height: 16px; flex-shrink: 0;
    border: 1px solid var(--lp-border-2);
    display: flex; align-items: center; justify-content: center;
    transition: border-color 0.15s;
  }
  .lp-radio-label:hover .lp-radio-box { border-color: var(--lp-fg-3); }
  .lp-radio-box--checked { border-color: var(--lp-fg); }
  .lp-radio-dot { width: 7px; height: 7px; background: var(--lp-fg); }
  .lp-radio-text { transition: color 0.15s; }
  .lp-radio-text--checked { color: var(--lp-fg) !important; }

  /* Submit */
  .lp-submit-area { border-top: 1px solid var(--lp-border); padding-top: 2rem; display: flex; flex-direction: column; }
  .lp-submit-btn {
    width: 100%; border: 1px solid var(--lp-btn-bg); background: var(--lp-btn-bg);
    color: var(--lp-btn-fg); font-family: inherit;
    font-size: 14px; letter-spacing: 0.14em; text-transform: uppercase;
    padding: 1.125rem; cursor: pointer; transition: background 0.18s, color 0.18s, border-color 0.18s;
  }
  .lp-submit-btn:hover:not(:disabled) {
    background: var(--lp-btn-hover-bg);
    color: var(--lp-btn-hover-fg);
    border-color: var(--lp-btn-bg);
  }
  .lp-submit-btn:disabled { opacity: 0.25; cursor: not-allowed; }
`;
