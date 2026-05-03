import { Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

/* ── main ─────────────────────────────────────────── */
function App() {
  const work = [
    {
      role: 'Founder & Product Architect',
      company: '100K31D',
      period: 'May 2022 – Present',
      tag: 'Independent',
      items: [
        <>
          <span className="highlight">Comms</span> — B2B tool that converts
          high-stakes raw input into corporate communications, audited for
          cultural nuances, legal liabilities, and the live news cycle in
          seconds. One wrong word in a layoff notice, a vendor termination, or a
          media response can cost the company dearly. Comms is the layer between
          what you mean and what gets published.
        </>,
        <>
          <a
            href="https://esse.today"
            target="_blank"
            rel="noopener noreferrer"
            className="app-link"
          >
            Esse
          </a>{' '}
          — AI summarizer iOS app. 10,000+ organic users, 7% freemium conversion
          (industry avg: 2%). No paid acquisition. Behavioral onboarding
          designed from scratch.
        </>,
        <>
          <span className="highlight">Burn Before Reading</span> — Chrome
          extension for self-destructing notes. Went viral on first day, Google
          Featured on Chrome Web Store. First-day sales without a launch
          strategy.
        </>,
        <>
          <a
            href="https://launchpal.co"
            target="_blank"
            rel="noopener noreferrer"
            className="app-link"
          >
            Launchpal
          </a>{' '}
          — productized sprint service turning non-technical ideas into working
          digital products in 14 days.
        </>,
        <>
          <a
            href="https://rewords.app"
            target="_blank"
            rel="noopener noreferrer"
            className="app-link"
          >
            Rewords
          </a>{' '}
          — Chrome vocabulary extension. 1,500+ users within months. Google
          Featured.
        </>,
        <>
          <a
            href="https://somany.ch"
            target="_blank"
            rel="noopener noreferrer"
            className="app-link"
          >
            So Many Characters
          </a>
          ,{' '}
          <a
            href="https://should.today"
            target="_blank"
            rel="noopener noreferrer"
            className="app-link"
          >
            Should Today
          </a>{' '}
          — client products in Vue.js and React. Idea → deployed in days, not
          months.
        </>,
      ],
    },
    {
      role: 'Product Engineer — React Native',
      company: 'Ling App',
      period: 'Dec 2023 – Nov 2025',
      tag: '2M+ Users',
      items: [
        'Owned architecture decisions and delivery for 40+ major features on a live app with 2M+ active users.',
        'Translated business requirements into precise tech specs — reduced dev rework by ~15%.',
        'Diagnosed drop-off points in the core user flow; implemented fixes that measurably improved session time and retention.',
      ],
    },
    {
      role: 'Editorial Director & Team Builder',
      company: 'Media & Education',
      period: '2008 – 2022',
      tag: '15 yrs',
      items: [
        'Led cross-functional teams of 15+ across editorial and product. Co-founded independent news outlets.',
        'Built data-driven feedback loops: tracked reader retention, session depth, and distribution. Applied the same logic I now apply to product.',
      ],
    },
  ];

  const principles = [
    {
      title: 'Psychology is the product',
      body: "MSc in Psychology isn't decoration. I design habit loops from behavioral theory — reducing friction, improving onboarding, making UX that retains. The 7% conversion rate on Esse exists because of this.",
    },
    {
      title: 'I build what I spec',
      body: "I don't hand off to someone else. I write the blueprint and I write the code. That closes the gap between what was designed and what ships — permanently.",
    },
    {
      title: 'Scope kills more products than bugs',
      body: "The most valuable thing in a sprint isn't the code. It's the decision of what not to build. I've killed more bad features before they shipped than I can count.",
    },
    {
      title: 'Outcomes over output',
      body: 'Tickets closed and lines of code are vanity metrics. I measure by conversion rates, retention curves, and whether the thing actually gets used.',
    },
  ];

  const testimonials = [
    {
      quote:
        "A high-impact builder. Consistently a top performer, he ships stable, thoughtful features and isn't afraid to flag when complexity outweighs value.",
      context: 'Piyawasin P., Senior Software Engineer, Ling',
    },
    {
      quote:
        'Showed traits not commonly found in developers. Practiced due diligence, asked clear questions to understand core issues, and was easy to communicate with.',
      context: 'Dennis B., Engineering Lead, Ling',
    },
    {
      quote:
        "User-centered approach — doesn't simply focus on what designs say, but on their purpose and intention. Made suggestions that were more elegant and user-friendly.",
      context: 'Product Manager, Ling',
    },
    {
      quote:
        'Kept teams aligned and effectively managed, presented a company-wide editorial policy that solidified our brand voice.',
      context: 'Anna Artukh, PR Director, Uchi',
    },
  ];

  const skills = [
    'Product Architecture',
    'Behavioral Psychology',
    'React Native',
    '0→1 Launches',
    'System Design',
    'Psychology-Backed UX',
    'Unit Economics',
    'GTM Strategy',
    'A/B Testing',
    'ASO',
    'TypeScript',
    'Mobile Architecture',
    'Scope Discipline',
    'Risk Modeling',
    'AI Integration',
  ];

  const stats = [
    { value: '15+', label: 'years shipping' },
    { value: '7%', label: 'freemium conversion' },
    { value: '10K+', label: 'organic users' },
    { value: '4.9', label: 'App Store rating' },
  ];

  return (
    <div className="portfolio-root">
      <style>{css}</style>

      {/* ── HERO ─────────────────────────────────────── */}
      <div className="p-section">
        <div className="p-wrap">
          <div className="p-hero">
            {/* Photo */}
            <div className="p-photo-ring">
              <img
                src="/new.jpeg"
                alt="Sander Bell"
                className="p-photo-img"
                onError={e => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <span className="p-photo-fallback">SB</span>
            </div>

            <div className="p-overline">Product Architect</div>
            <h1 className="p-name">Sander Bell</h1>
            <p className="p-bio">
              I design systems, build products, and ship things that get used.
              MSc Psychology · React Native · 15 years across platforms with
              20M+ users.
            </p>

            <div className="p-ctas">
              <Link to="/launchpal" className="p-btn-primary">
                Launchpal — I'll build your product in 14 days
              </Link>
              <a
                href="mailto:thesanderbell@gmail.com"
                className="p-btn-secondary"
              >
                <Mail size={14} /> Say hello
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── REST ─────────────────────────────────────── */}
      <div className="p-section">
        <div className="p-wrap">
          {/* Stats */}
          <div className="p-stats">
            {stats.map(({ value, label }) => (
              <div key={label} className="p-stat">
                <div className="p-stat-value">{value}</div>
                <div className="p-stat-label">{label}</div>
              </div>
            ))}
          </div>

          {/* Work */}
          <div className="p-block">
            <div className="p-section-label">Work history</div>
            <div className="p-cards">
              {work.map(({ role, company, period, tag, items }) => (
                <div key={role} className="p-card">
                  <div className="p-card-head">
                    <div>
                      <div className="p-card-role">{role}</div>
                      <div className="p-card-company">
                        {company} · {period}
                      </div>
                    </div>
                    <span className="p-tag">{tag}</span>
                  </div>
                  <ul className="p-card-list">
                    {items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="p-block">
            <div className="p-section-label">Skills</div>
            <div className="p-skills">
              {skills.map(s => (
                <span key={s} className="p-skill">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Principles */}
          <div className="p-block">
            <div className="p-section-label">How I work</div>
            <div className="p-grid-2">
              {principles.map(({ title, body }) => (
                <div key={title} className="p-card">
                  <div
                    className="p-card-role"
                    style={{ marginBottom: '0.5rem' }}
                  >
                    {title}
                  </div>
                  <p className="p-card-body">{body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="p-block">
            <div className="p-section-label">What people say</div>
            <div className="p-grid-2">
              {testimonials.map(({ quote, context }) => (
                <div key={context} className="p-card">
                  <p className="p-quote">"{quote}"</p>
                  <p className="p-quote-context">{context}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="p-block p-contact-block">
            <div className="p-section-label">Contact</div>
            <p className="p-contact-note">
              For a sprint engagement, use{' '}
              <Link to="/launchpal/start" className="p-inline-link">
                Launchpal
              </Link>
              . For everything else — say hello.
            </p>
            <div className="p-contact-links">
              <a
                href="mailto:thesanderbell@gmail.com"
                className="p-contact-link"
              >
                <Mail size={14} /> thesanderbell@gmail.com
              </a>
              <a
                href="https://linkedin.com/in/sanderbell"
                target="_blank"
                rel="noopener noreferrer"
                className="p-contact-link"
              >
                <Linkedin size={14} /> LinkedIn
              </a>
              <a
                href="https://github.com/sanderbell"
                target="_blank"
                rel="noopener noreferrer"
                className="p-contact-link"
              >
                <Github size={14} /> GitHub
              </a>
            </div>
          </div>

          <div className="p-footer">© 2026 Sander Bell</div>
        </div>
      </div>
    </div>
  );
}

const css = `
  /* ── root ──────────────────────────────────────── */
  .portfolio-root {
    min-height: 100vh;
    background: var(--lp-bg);
    color: var(--lp-fg);
    font-family: 'SF Mono', 'SFMono-Regular', ui-monospace, Menlo, Consolas, monospace;
  }

  /* ── layout ─────────────────────────────────────── */
  .p-section { padding: 0; }
  .p-wrap    { max-width: 44rem; margin: 0 auto; padding: 0 1.5rem; }

  /* ── hero ───────────────────────────────────────── */
  .p-hero {
    display: flex; flex-direction: column; align-items: center;
    text-align: center;
    padding: 2rem 0 2rem;
   }

  .p-photo-ring {
    width: 180px; height: 180px; border-radius: 50%;
    border: 1px solid var(--lp-border-2);
    overflow: hidden; position: relative;
    background: var(--lp-bg-alt);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 2rem;
    flex-shrink: 0;
  }
  .p-photo-img {
    width: 100%; height: 100%; object-fit: cover;
    position: absolute; top: 0; left: 0;
  }
  .p-photo-fallback {
    font-size: 20px; font-weight: 700; color: var(--lp-fg-3);
    letter-spacing: 0.05em;
  }

  .p-overline {
    font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--lp-fg-4); margin-bottom: 0.75rem;
  }
  .p-name {
    font-size: 3rem; font-weight: 700; color: var(--lp-fg);
    letter-spacing: -0.02em; line-height: 1; margin: 0 0 1.25rem;
  }
  .p-bio {
    font-size: 14px; color: var(--lp-fg-3); line-height: 1.8;
    max-width: 30rem; margin: 0 auto 2.5rem;
  }

  .p-ctas { display: flex; flex-wrap: wrap; gap: 0.75rem; justify-content: center; }
  .p-btn-primary {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: var(--lp-btn-bg); color: var(--lp-btn-fg);
    border: 1px solid var(--lp-btn-bg);
    font-family: inherit; font-size: 12px; letter-spacing: 0.1em;
    text-transform: uppercase; text-decoration: none;
    padding: 0.75rem 1.5rem; cursor: pointer;
    transition: background 0.18s, color 0.18s, border-color 0.18s;
  }
  .p-btn-primary:hover {
    background: var(--lp-btn-hover-bg); color: var(--lp-btn-hover-fg);
    border-color: var(--lp-btn-bg);
  }
  .p-btn-secondary {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: transparent; color: var(--lp-fg-3);
    border: 1px solid var(--lp-border-2);
    font-family: inherit; font-size: 12px; letter-spacing: 0.1em;
    text-transform: uppercase; text-decoration: none;
    padding: 0.75rem 1.5rem; cursor: pointer;
    transition: border-color 0.15s, color 0.15s;
  }
  .p-btn-secondary:hover { border-color: var(--lp-fg-3); color: var(--lp-fg); }

  /* ── launchpal band ──────────────────────────────── */
  .lp-band {
    width: 100%;
    background: var(--lp-fg);
    color: var(--lp-bg);
    padding: 3.5rem 1.5rem;
  }
  .lp-band-inner {
    display: flex; flex-wrap: wrap;
    align-items: flex-start; justify-content: space-between;
    gap: 1.5rem; margin-bottom: 1.5rem;
  }
  .lp-label {
    font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--lp-bg-alt); opacity: 0.5;
    margin-bottom: 0.6rem;
  }
  .lp-title { font-size: 3rem; font-weight: 700; line-height: 1; letter-spacing: -0.02em; }
  .lp-sub   { font-size: 13px; opacity: 0.5; margin-top: 0.4rem; }
  .lp-price-col { text-align: right; flex-shrink: 0; }
  .lp-price { font-size: 3rem; font-weight: 700; line-height: 1; }
  .lp-price-note { font-size: 12px; opacity: 0.5; margin-top: 0.4rem; }

  .lp-desc {
    font-size: 14px; line-height: 1.8; opacity: 0.7;
    max-width: 36rem; margin-bottom: 1.5rem;
  }
  .lp-features {
    display: flex; flex-wrap: wrap; gap: 1.5rem;
    font-size: 12px; opacity: 0.6;
    border-top: 1px solid rgba(255,255,255,0.12);
    padding-top: 1.25rem; margin-bottom: 1.75rem;
  }
  .lp-feature { display: flex; align-items: center; gap: 0.5rem; }
  .lp-check   { opacity: 1; }

  .lp-actions { display: flex; flex-wrap: wrap; gap: 0.75rem; }
  .lp-btn-primary {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: var(--lp-bg); color: var(--lp-fg);
    border: 1px solid var(--lp-bg);
    font-family: inherit; font-size: 12px; letter-spacing: 0.1em;
    text-transform: uppercase; text-decoration: none;
    padding: 0.75rem 1.5rem;
    transition: opacity 0.15s;
  }
  .lp-btn-primary:hover { opacity: 0.85; }
  .lp-btn-secondary {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: transparent; color: var(--lp-bg);
    border: 1px solid rgba(255,255,255,0.25);
    font-family: inherit; font-size: 12px; letter-spacing: 0.1em;
    text-transform: uppercase; text-decoration: none;
    padding: 0.75rem 1.5rem;
    transition: border-color 0.15s;
  }
  .lp-btn-secondary:hover { border-color: rgba(255,255,255,0.7); }

  /* ── stats ───────────────────────────────────────── */
  .p-stats {
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 0; border: 1px solid var(--lp-border);
    margin: 3rem 0;
  }
  @media (max-width: 600px) { .p-stats { grid-template-columns: repeat(2, 1fr); } }
  .p-stat {
    padding: 1.5rem 1rem; text-align: center;
    border-right: 1px solid var(--lp-border);
  }
  .p-stat:last-child { border-right: none; }
  @media (max-width: 600px) {
    .p-stat:nth-child(2) { border-right: none; }
    .p-stat:nth-child(3), .p-stat:nth-child(4) { border-top: 1px solid var(--lp-border); }
  }
  .p-stat-value { font-size: 1.75rem; font-weight: 700; color: var(--lp-fg); }
  .p-stat-label { font-size: 11px; color: var(--lp-fg-4); margin-top: 0.25rem; letter-spacing: 0.05em; }

  /* ── blocks ──────────────────────────────────────── */
  .p-block { margin-bottom: 3.5rem; }
  .p-section-label {
    font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--lp-fg-4); margin-bottom: 1.5rem;
    padding-bottom: 0.75rem; border-bottom: 1px solid var(--lp-border);
  }

  /* ── cards ───────────────────────────────────────── */
  .p-cards { display: flex; flex-direction: column; gap: 1px; background: var(--lp-border); border: 1px solid var(--lp-border); }
  .p-card {
    background: var(--lp-bg); padding: 1.5rem;
  }
  .p-card-head {
    display: flex; justify-content: space-between; align-items: flex-start;
    gap: 1rem; margin-bottom: 1rem; flex-wrap: wrap;
  }
  .p-card-role    { font-size: 14px; font-weight: 600; color: var(--lp-fg); }
  .p-card-company { font-size: 12px; color: var(--lp-fg-4); margin-top: 0.25rem; }
  .p-card-body    { font-size: 13px; color: var(--lp-fg-3); line-height: 1.7; margin: 0; }

  .p-tag {
    font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--lp-fg-4); border: 1px solid var(--lp-border-2);
    padding: 0.2rem 0.6rem; white-space: nowrap; flex-shrink: 0;
  }

  .p-card-list {
    list-style: none; padding: 0; margin: 0;
    display: flex; flex-direction: column; gap: 0.6rem;
  }
  .p-card-list li {
    font-size: 13px; color: var(--lp-fg-3); line-height: 1.7;
    padding-left: 1.25rem; position: relative;
  }
  .p-card-list li::before { content: '→'; position: absolute; left: 0; color: var(--lp-fg-5); }
  .p-card-list strong { color: var(--lp-fg-2); font-weight: 500; }

  .app-link { color: var(--lp-fg-2); text-decoration: underline; text-underline-offset: 3px; }
  .app-link:hover { color: var(--lp-fg); }
  .highlight { color: var(--lp-fg-2); font-weight: 500; }

  /* ── grid ─────────────────────────────────────────── */
  .p-grid-2 {
    display: grid; grid-template-columns: 1fr 1fr; gap: 1px;
    background: var(--lp-border); border: 1px solid var(--lp-border);
  }
  @media (max-width: 640px) { .p-grid-2 { grid-template-columns: 1fr; } }

  /* ── skills ──────────────────────────────────────── */
  .p-skills {
    display: flex; flex-wrap: wrap; gap: 0.5rem;
  }
  .p-skill {
    font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--lp-fg-3); border: 1px solid var(--lp-border);
    padding: 0.35rem 0.75rem;
    transition: border-color 0.15s, color 0.15s;
  }
  .p-skill:hover { border-color: var(--lp-border-2); color: var(--lp-fg); }

  /* ── quote ───────────────────────────────────────── */
  .p-quote {
    font-size: 13px; color: var(--lp-fg-3); line-height: 1.7;
    font-style: italic; margin: 0 0 0.75rem;
  }
  .p-quote-context { font-size: 11px; color: var(--lp-fg-4); }

  /* ── contact ─────────────────────────────────────── */
  .p-contact-block { padding-bottom: 1rem; }
  .p-contact-note { font-size: 13px; color: var(--lp-fg-4); margin-bottom: 1.25rem; line-height: 1.6; }
  .p-inline-link { color: var(--lp-fg-2); text-decoration: underline; text-underline-offset: 3px; }
  .p-inline-link:hover { color: var(--lp-fg); }
  .p-contact-links { display: flex; flex-wrap: wrap; gap: 0.75rem; }
  .p-contact-link {
    display: inline-flex; align-items: center; gap: 0.5rem;
    font-size: 12px; color: var(--lp-fg-3); text-decoration: none;
    border: 1px solid var(--lp-border); padding: 0.5rem 1rem;
    transition: border-color 0.15s, color 0.15s;
  }
  .p-contact-link:hover { border-color: var(--lp-border-2); color: var(--lp-fg); }

  /* ── footer ──────────────────────────────────────── */
  .p-footer {
    font-size: 11px; color: var(--lp-fg-5); padding: 2rem 0 4rem; letter-spacing: 0.05em;
  }
`;

export default App;
