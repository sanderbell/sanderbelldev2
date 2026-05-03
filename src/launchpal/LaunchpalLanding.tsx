import { Link } from 'react-router-dom';

const fadeStyle = (delay: number): React.CSSProperties => ({
  opacity: 0,
  animation: `lpFadeUp 0.6s ease-out ${delay}s forwards`,
});

const sprintRows = [
  { day: 'Day 1',     step: 'Discovery', deliverable: 'Structured conversation',        outcome: 'The fog lifts — you know exactly what you\'re building and why' },
  { day: 'Days 2–3', step: 'Blueprint',  deliverable: 'Plain-English product document', outcome: 'Your idea on paper, in language you actually understand' },
  { day: 'Days 3–7', step: 'Build',      deliverable: 'Working beta',                   outcome: 'Something real exists. Your idea is no longer just in your head' },
  { day: 'Day 8',    step: 'Repo',       deliverable: 'Full admin rights to codebase',  outcome: 'It\'s yours. Nobody can take it away or hold it hostage' },
  { day: 'Days 8–10',step: 'Feedback',   deliverable: 'One revision cycle',             outcome: 'It feels like yours now, not like a stranger built it' },
  { day: 'Day 11',   step: 'Landing',    deliverable: 'Presentation for external audience', outcome: 'You can show the world what you\'re building — today' },
  { day: 'Day 12',   step: 'TestFlight', deliverable: 'App on your phone',              outcome: 'Your app. On your phone. That moment when it becomes real' },
  { day: 'Day 14',   step: 'Handoff',    deliverable: 'Next-step playbook + async Q&A', outcome: 'You know exactly what to do tomorrow morning' },
];

const problems = [
  { n: '01', title: 'Blank page paralysis.', body: 'No framework for where to start, what to cut, or how to scope v1.' },
  { n: '02', title: 'The vibe coding trap.', body: 'AI tools feel like magic for an hour. Within days: bugs, broken screens, code they can\'t fix. Structure failure, not discipline failure.' },
  { n: '03', title: 'The agency black box.', body: 'Dev shop hired. Three months pass. Easiest interpretation of the brief delivered.' },
];

const credStats = [
  { value: '10,000+', label: 'Esse users',   sub: '7% paid conversion · no paid acquisition' },
  { value: 'Featured', label: 'Google Chrome', sub: 'Rewords · Burn Before Reading' },
  { value: '2M+',     label: 'Ling users',   sub: 'React Native engineer' },
];

export default function LaunchpalLanding() {
  return (
    <div className="lp-root">
      <style>{css}</style>

      {/* Nav */}
      <nav className="lp-nav">
        <div className="lp-container lp-nav-inner">
          <span className="lp-overline" style={{ color: 'var(--lp-fg)' }}>Launchpal</span>
          <Link to="/launchpal/start" className="lp-nav-link">Start a Sprint →</Link>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="lp-section lp-section-border">
        <div className="lp-container">
          <p className="lp-overline" style={fadeStyle(0)}>The Judgment Layer</p>
          <h1 className="lp-hero-title" style={fadeStyle(0.08)}>
            $1,490.<br />
            <span className="lp-muted">2 weeks.</span><br />
            A working product.
          </h1>
          <p className="lp-body lp-body-wide" style={{ ...fadeStyle(0.16), maxWidth: '36rem' }}>
            One person. One client. Blueprint, build, and handoff in 14 days flat.
            Not a mockup. Not a proposal. Something you can open, use, and show people.
          </p>
          <div style={fadeStyle(0.24)}>
            <Link to="/launchpal/start" className="lp-btn">Start a Sprint</Link>
          </div>
        </div>
      </section>

      {/* ── The Problem ──────────────────────────────── */}
      <section className="lp-section lp-section-border">
        <div className="lp-container">
          <p className="lp-overline lp-section-label">The Problem</p>
          {problems.map(({ n, title, body }, i) => (
            <div key={n} className="lp-problem-row lp-item-border" style={fadeStyle(0.06 * i)}>
              <span className="lp-num">{n}</span>
              <div>
                <h3 className="lp-item-title">{title}</h3>
                <p className="lp-body">{body}</p>
              </div>
            </div>
          ))}
          <p className="lp-body" style={{ marginTop: '2rem', maxWidth: '38rem' }}>
            The root problem is never the code. It's knowing what to build, in what order,
            and why — before anything gets written.
          </p>
        </div>
      </section>

      {/* ── Idea Boundary ────────────────────────────── */}
      <section className="lp-section lp-section-border">
        <div className="lp-container">
          <p className="lp-overline lp-section-label">The Idea Boundary</p>
          <div className="lp-grid-2 lp-grid-gap">
            <div className="lp-card">
              <p className="lp-overline" style={{ color: 'var(--lp-red)', marginBottom: '1.25rem' }}>
                Absolute No-Go
              </p>
              <ul className="lp-list">
                {[
                  'Uber/Airbnb for X — two-sided logistics or marketplaces',
                  'PayPal/Crypto — regulatory compliance, financial infrastructure',
                  'The next Instagram — useless without massive scale',
                ].map(item => (
                  <li key={item} className="lp-list-item">
                    <span className="lp-list-icon" style={{ color: 'var(--lp-red)' }}>×</span>
                    <span className="lp-body">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lp-card">
              <p className="lp-overline" style={{ color: 'var(--lp-green)', marginBottom: '1.25rem' }}>
                Green Light
              </p>
              <ul className="lp-list">
                {[
                  'AI tracker customized for a specific framework',
                  'Scheduling or calculator tool for a specific team',
                  'Custom CRM or habit tracker for a specific methodology',
                  'Single-purpose utility apps',
                ].map(item => (
                  <li key={item} className="lp-list-item">
                    <span className="lp-list-icon" style={{ color: 'var(--lp-green)' }}>→</span>
                    <span className="lp-body">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── The Sprint SOP ───────────────────────────── */}
      <section className="lp-section lp-section-border">
        <div className="lp-container">
          <div className="lp-sprint-header">
            <p className="lp-overline lp-section-label" style={{ margin: 0 }}>The Sprint</p>
            <p className="lp-caption">14 days · $1,490 flat</p>
          </div>
          {sprintRows.map(({ day, step, deliverable, outcome }, i) => (
            <div key={step} className="lp-sprint-row lp-item-border" style={fadeStyle(0.05 * i)}>
              <span className="lp-caption lp-sprint-day">{day}</span>
              <div className="lp-sprint-content">
                <span className="lp-item-title">{step}</span>
                <p className="lp-caption" style={{ marginTop: '0.2rem' }}>{deliverable}</p>
                <p className="lp-small lp-outcome">{outcome}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Founder Credentials ──────────────────────── */}
      <section className="lp-section lp-section-border">
        <div className="lp-container">
          <p className="lp-overline lp-section-label">Founder</p>
          <div style={{ marginBottom: '2rem' }}>
            <h2 className="lp-founder-name">Sander Bell</h2>
            <p className="lp-caption">MSc Psychology · Technical Product Strategist · React Native Engineer</p>
          </div>
          <div className="lp-grid-3 lp-grid-gap" style={{ marginBottom: '2.5rem' }}>
            {credStats.map(({ value, label, sub }) => (
              <div key={label} className="lp-stat-card">
                <div className="lp-stat-value">{value}</div>
                <div className="lp-stat-label">{label}</div>
                <div className="lp-small" style={{ marginTop: '0.2rem' }}>{sub}</div>
              </div>
            ))}
          </div>
          <p className="lp-body" style={{ maxWidth: '38rem' }}>
            15 years leading cross-functional teams across platforms with 20M+ users.
            Built products people use without funding, without safety nets.
            Former Editorial Director at the largest national online education platform.
            Now building what I wish existed for domain experts with ideas stuck in their heads.
          </p>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="lp-section">
        <div className="lp-container">
          <p className="lp-overline lp-section-label">One client at a time.</p>
          <h2 className="lp-cta-title">
            Ready to scope<br />your sprint?
          </h2>
          <Link to="/launchpal/start" className="lp-btn">Start a Sprint</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="lp-footer">
        <div className="lp-container lp-footer-inner">
          <span className="lp-small">© 2026 Sander Bell · 100K31D D.O.O.</span>
          <Link to="/launchpal/tos" className="lp-footer-link">Terms of Service</Link>
        </div>
      </footer>
    </div>
  );
}

const css = `
  .lp-root {
    min-height: 100vh;
    background: var(--lp-bg);
    color: var(--lp-fg);
    font-family: 'SF Mono', 'SFMono-Regular', ui-monospace, Menlo, Consolas, monospace;
  }

  @keyframes lpFadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Layout */
  .lp-container { max-width: 48rem; margin: 0 auto; padding: 0 1.5rem; }
  .lp-section { padding: 5rem 0; }
  .lp-section-border { border-bottom: 1px solid var(--lp-border); }

  /* Nav */
  .lp-nav { border-bottom: 1px solid var(--lp-border); padding: 1.25rem 0; }
  .lp-nav-inner { display: flex; align-items: center; justify-content: space-between; }
  .lp-nav-link { font-size: 15px; color: var(--lp-fg-3); text-decoration: none; transition: color 0.15s; }
  .lp-nav-link:hover { color: var(--lp-fg); }

  /* Typography */
  .lp-overline {
    font-size: 13px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--lp-fg-4);
  }
  .lp-section-label { margin-bottom: 3rem; }
  .lp-hero-title {
    font-size: clamp(2.8rem, 8vw, 5.5rem);
    font-weight: 700;
    line-height: 1.05;
    letter-spacing: -0.02em;
    color: var(--lp-fg);
    margin: 1.5rem 0 1.75rem;
  }
  .lp-body {
    font-size: 16px;
    color: var(--lp-fg-3);
    line-height: 1.8;
  }
  .lp-body-wide { margin-bottom: 2.5rem; }
  .lp-caption {
    font-size: 14px;
    color: var(--lp-fg-4);
    line-height: 1.6;
  }
  .lp-small {
    font-size: 13px;
    color: var(--lp-fg-4);
    line-height: 1.6;
  }
  .lp-muted { color: var(--lp-fg-3); }
  .lp-num { font-size: 13px; color: var(--lp-fg-5); width: 1.5rem; flex-shrink: 0; padding-top: 2px; }

  /* Button */
  .lp-btn {
    display: inline-block;
    border: 1px solid var(--lp-btn-bg);
    background: var(--lp-btn-bg);
    color: var(--lp-btn-fg);
    font-family: inherit;
    font-size: 14px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 16px 36px;
    text-decoration: none;
    transition: background 0.18s, color 0.18s, border-color 0.18s;
  }
  .lp-btn:hover {
    background: var(--lp-btn-hover-bg);
    color: var(--lp-btn-hover-fg);
    border-color: var(--lp-btn-bg);
  }

  /* Problem rows */
  .lp-problem-row {
    display: flex;
    gap: 2rem;
    padding: 1.75rem 0;
  }
  .lp-item-border { border-bottom: 1px solid var(--lp-border); }
  .lp-item-title {
    display: block;
    font-size: 16px;
    font-weight: 600;
    color: var(--lp-fg);
    margin-bottom: 0.5rem;
  }

  /* Grid */
  .lp-grid-2 { display: grid; grid-template-columns: 1fr; gap: 1px; }
  .lp-grid-3 { display: grid; grid-template-columns: 1fr; }
  .lp-grid-gap { background: var(--lp-border); }
  @media (min-width: 600px) {
    .lp-grid-2 { grid-template-columns: 1fr 1fr; }
    .lp-grid-3 { grid-template-columns: repeat(3, 1fr); }
  }

  /* Cards */
  .lp-card { background: var(--lp-bg); padding: 2rem; }

  /* List */
  .lp-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 1rem; }
  .lp-list-item { display: flex; gap: 0.75rem; align-items: flex-start; }
  .lp-list-icon { flex-shrink: 0; margin-top: 2px; font-size: 15px; }

  /* Sprint table */
  .lp-sprint-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 2.5rem;
  }
  .lp-sprint-row {
    display: grid;
    grid-template-columns: 6rem 1fr;
    gap: 1.5rem;
    padding: 1.25rem 0;
    align-items: start;
  }
  .lp-sprint-day { padding-top: 2px; white-space: nowrap; }
  .lp-sprint-content { display: flex; flex-direction: column; }
  .lp-outcome { display: none; }
  @media (min-width: 640px) {
    .lp-sprint-row { grid-template-columns: 7rem 11rem 1fr; }
    .lp-outcome { display: block; margin-top: 0.25rem; color: var(--lp-fg-4); font-size: 13px; }
  }

  /* Founder */
  .lp-founder-name {
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--lp-fg);
    margin-bottom: 0.4rem;
  }
  .lp-stat-card { background: var(--lp-bg); padding: 1.75rem; }
  .lp-stat-value { font-size: 1.75rem; font-weight: 700; color: var(--lp-fg); margin-bottom: 0.25rem; }
  .lp-stat-label { font-size: 14px; color: var(--lp-fg-2); }

  /* CTA */
  .lp-cta-title {
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 700;
    line-height: 1.1;
    color: var(--lp-fg);
    margin: 1.5rem 0 2.5rem;
  }

  /* Footer */
  .lp-footer { border-top: 1px solid var(--lp-border); padding: 1.75rem 0; }
  .lp-footer-inner { display: flex; align-items: center; justify-content: space-between; }
  .lp-footer-link { font-size: 14px; color: var(--lp-fg-4); text-decoration: none; transition: color 0.15s; }
  .lp-footer-link:hover { color: var(--lp-fg); }
`;
