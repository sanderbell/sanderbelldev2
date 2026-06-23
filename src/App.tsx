import { Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

/* ── main ─────────────────────────────────────────── */
function App() {
  const work = [
    {
      role: 'Co-Founder & Product Architect',
      company: '100K31D',
      period: 'Dec 2024 – Present',
      tag: 'AI-native',
      items: [
        <>
          <a
            href="https://comms.at"
            target="_blank"
            rel="noopener noreferrer"
            className="app-link"
          >
            Comms
          </a>{' '}
          — AI-powered pre-publication risk scanner for business communication.
          Four specialist AI reviewers — Legal Risk, Cultural Alignment, Live
          Context, and Claim Verification — catch blind spots before a message
          is sent.
        </>,
        <>
          <span className="highlight">Sofa</span> — a hands-off GTM system that
          scans public press-release feeds, verifies claims with a conservative
          multi-model pipeline, and drafts outreach only when it finds a
          confirmed hard error.
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
          <a
            href="https://bbr.today"
            target="_blank"
            rel="noopener noreferrer"
            className="app-link"
          >
            Burn Before Reading
          </a>{' '}
          — Chrome extension for self-destructing notes. Went viral on first
          day, Google Featured on Chrome Web Store. First-day sales without a
          launch strategy.
        </>,
        <>
          <a
            href="/launchpal"
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
            href="https://rewords.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="app-link"
          >
            Rewords
          </a>{' '}
          — Chrome vocabulary extension. 1,500+ users within months. Google
          Featured.
        </>,
      ],
    },
    {
      role: 'Product Engineer — React Native',
      company: 'Ling App',
      period: 'Dec 2023 – Nov 2025',
      tag: '2M+ Users',
      items: [
        'Shipped inside a 2M+ user language-learning app covering 60+ underserved languages — native-speaker audio, transliteration, pronunciation checks, streaks, and leaderboards.',
        'Worked directly on rendering and data-fetching performance, balancing data freshness, caching, and perceived responsiveness across real-world devices and networks.',
        'Took features end to end — pull requests, GitHub code review, release, and post-release monitoring in JIRA sprints; contributed in technical design as a peer engineer.',
      ],
    },
    {
      role: 'Product Manager — NLP Sentiment',
      company: 'Critical Mention / Onclusive',
      period: 'Jan 2021 – Nov 2023',
      tag: 'B2B Media Intel',
      items: [
        'Recruited as a media/comms subject-matter expert, then took formal product ownership of the NLP sentiment module.',
        'Ran structured interviews with communications pros to map crisis-response workflows; specified a domain-adapted sentiment lexicon, publication-influence scoring, and a coverage-velocity widget.',
        'Shipped within the roadmap window — the module became an enterprise sales differentiator against Meltwater and Cision. Steered feature sunsetting and account retention through the STG/Onclusive acquisition.',
      ],
    },
    {
      role: 'Content Product Lead',
      company: 'UCHI',
      period: 'Feb 2018 – Jan 2021',
      tag: 'Edtech',
      items: [
        'Led a cross-functional team of 10+ at Eastern Europe’s largest school-tech platform through the 2020 remote-learning surge.',
        'Reframed content as a measurable product lever — A/B-tested copy, headlines, and push notifications for retention and conversion.',
        'Found 65% of students dropped after the second screen; added interactive check-ins (+15% time-on-platform) and a drag-and-drop timeline that cut history-unit drop-off by 22%.',
      ],
    },
    {
      role: 'Media, Communications & Editorial',
      company: 'Broadcast · Online · Civic',
      period: '2008 – 2021',
      tag: '13 yrs',
      items: [
        'Editor and anchor → co-founder and Editor-in-Chief of independent outlets; owned editorial standards, staffing, metrics, and the outlet’s survival.',
        'Ran narrative and media strategy for civic campaigns under live attack — claim verification, crisis response, and reputational-risk judgment that later became product requirements.',
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
    {
      quote:
        'Esse comes in extremely handy when long videos take too long to get to a simple point.',
      context: 'Esse App Store review, -engago-',
    },
    {
      quote:
        'Esse works really well, seamless, and fast for getting the gist when time is short.',
      context: 'Esse App Store review, Sharif El Komi',
    },
    {
      quote:
        'Burn Before Reading is easy to install and fun to use, turning on-screen annoyances into relief.',
      context: 'Burn Before Reading Chrome Web Store review, Philip Gegan',
    },
    {
      quote:
        'Burn Before Reading feels simple, fun, and super satisfying after a day on the internet.',
      context: 'Burn Before Reading Chrome Web Store review, Anna Kudinova',
    },
    {
      quote:
        'Rewords is clean, intuitive, and genuinely practical for taking control of what shows up online.',
      context: 'Rewords Chrome Web Store review, Andrea Bassick',
    },
    {
      quote:
        'Rewords is the perfect extension for curating your web experience.',
      context: 'Rewords Chrome Web Store review, Oleg Rosenfeld',
    },
  ];

  const skills = [
    'Technical Product Management',
    'Product Architecture',
    'Multi-Agent AI Systems',
    'LLM Workflow Design',
    'Behavioral Psychology',
    'React Native',
    '0→1 Launches',
    'System Design',
    'Customer Discovery',
    'Psychology-Backed UX',
    'NLP / Media Intelligence',
    'GTM Strategy',
    'A/B Testing',
    'API Contracts',
    'TypeScript',
    'Scope Discipline',
    'Risk Modeling',
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

            <div className="p-overline">
              Technical Product Manager · Product Architect
            </div>
            <h1 className="p-name">Sander Bell</h1>
            <p className="p-bio">
              A product person who deliberately became technical — I design and
              ship products end to end, from architecture down to production
              code. MSc Psychology · 15+ years from high-stakes media and B2B
              media intelligence to a 2M+ user mobile app and AI-native
              products.
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
    background: var(--lp-page-bg);
    color: var(--lp-fg);
    font-family: 'SF Mono', 'SFMono-Regular', ui-monospace, Menlo, Consolas, monospace;
  }

  /* ── layout ─────────────────────────────────────── */
  .p-section { padding: 0; }
  .p-wrap    { max-width: 48rem; margin: 0 auto; padding: 0 1.5rem; }

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
    box-shadow: inset 0 0 0 1px rgba(40, 122, 82, 0.10);
  }
  .p-photo-ring::after {
    content: '';
    position: absolute; inset: 0;
    background:
      radial-gradient(circle at 34% 24%, rgba(248, 251, 243, 0.16), transparent 42%),
      linear-gradient(135deg, rgba(8, 47, 34, 0.28), rgba(46, 134, 93, 0.34));
    mix-blend-mode: color;
    opacity: 0.42;
    pointer-events: none;
  }
  .p-photo-img {
    width: 100%; height: 100%; object-fit: cover;
    position: absolute; top: 0; left: 0;
  }
  .p-photo-fallback {
    font-size: 24px; font-weight: 700; color: var(--lp-fg-3);
    letter-spacing: 0.05em;
  }

  .p-overline {
    font-size: 13px; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--lp-fg-4); margin-bottom: 0.75rem;
  }
  .p-name {
    font-size: 3.5rem; font-weight: 700; color: var(--lp-fg);
    letter-spacing: -0.02em; line-height: 1; margin: 0 0 1.25rem;
  }
  .p-bio {
    font-size: 16px; color: var(--lp-fg-3); line-height: 1.8;
    max-width: 32rem; margin: 0 auto 2.5rem;
  }

  .p-ctas { display: flex; flex-wrap: wrap; gap: 0.75rem; justify-content: center; }
  .p-btn-primary {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: var(--lp-btn-gradient); color: var(--lp-btn-fg);
    border: 1px solid var(--lp-btn-border);
    font-family: inherit; font-size: 13px; letter-spacing: 0.1em;
    text-transform: uppercase; text-decoration: none;
    padding: 0.875rem 1.75rem; cursor: pointer;
    box-shadow: 0 14px 30px rgba(20, 86, 61, 0.14);
    transition: background 0.18s, color 0.18s, border-color 0.18s, box-shadow 0.18s;
  }
  .p-btn-primary:hover {
    background: var(--lp-btn-hover-gradient); color: var(--lp-btn-hover-fg);
    border-color: var(--lp-btn-border);
    box-shadow: 0 16px 34px rgba(20, 86, 61, 0.20);
  }
  .p-btn-secondary {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: transparent; color: var(--lp-fg-3);
    border: 1px solid var(--lp-border-2);
    font-family: inherit; font-size: 13px; letter-spacing: 0.1em;
    text-transform: uppercase; text-decoration: none;
    padding: 0.875rem 1.75rem; cursor: pointer;
    transition: border-color 0.15s, color 0.15s;
  }
  .p-btn-secondary:hover { border-color: var(--lp-fg-3); color: var(--lp-fg); }

  /* ── launchpal band ──────────────────────────────── */
  .lp-band {
    width: 100%;
    background: var(--lp-inverse-bg);
    color: var(--lp-inverse-fg);
    padding: 3.5rem 1.5rem;
  }
  .lp-band-inner {
    display: flex; flex-wrap: wrap;
    align-items: flex-start; justify-content: space-between;
    gap: 1.5rem; margin-bottom: 1.5rem;
  }
  .lp-label {
    font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--lp-inverse-muted);
    margin-bottom: 0.6rem;
  }
  .lp-title { font-size: 3rem; font-weight: 700; line-height: 1; letter-spacing: -0.02em; }
  .lp-sub   { font-size: 15px; opacity: 0.5; margin-top: 0.4rem; }
  .lp-price-col { text-align: right; flex-shrink: 0; }
  .lp-price { font-size: 3rem; font-weight: 700; line-height: 1; }
  .lp-price-note { font-size: 14px; opacity: 0.5; margin-top: 0.4rem; }

  .lp-desc {
    font-size: 16px; line-height: 1.8; opacity: 0.7;
    max-width: 36rem; margin-bottom: 1.5rem;
  }
  .lp-features {
    display: flex; flex-wrap: wrap; gap: 1.5rem;
    font-size: 14px; opacity: 0.72;
    border-top: 1px solid rgba(248,251,243,0.18);
    padding-top: 1.25rem; margin-bottom: 1.75rem;
  }
  .lp-feature { display: flex; align-items: center; gap: 0.5rem; }
  .lp-check   { opacity: 1; }

  .lp-actions { display: flex; flex-wrap: wrap; gap: 0.75rem; }
  .lp-btn-primary {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: var(--lp-inverse-fg); color: var(--lp-fg);
    border: 1px solid var(--lp-inverse-fg);
    font-family: inherit; font-size: 13px; letter-spacing: 0.1em;
    text-transform: uppercase; text-decoration: none;
    padding: 0.875rem 1.75rem;
    transition: opacity 0.15s;
  }
  .lp-btn-primary:hover { opacity: 0.85; }
  .lp-btn-secondary {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: transparent; color: var(--lp-inverse-fg);
    border: 1px solid rgba(248,251,243,0.35);
    font-family: inherit; font-size: 13px; letter-spacing: 0.1em;
    text-transform: uppercase; text-decoration: none;
    padding: 0.875rem 1.75rem;
    transition: border-color 0.15s;
  }
  .lp-btn-secondary:hover { border-color: rgba(248,251,243,0.78); }

  /* ── stats ───────────────────────────────────────── */
  .p-stats {
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 0; border: 1px solid var(--lp-border);
    margin: 3rem 0;
  }
  @media (max-width: 600px) { .p-stats { grid-template-columns: repeat(2, 1fr); } }
  .p-stat {
    padding: 1.75rem 1rem; text-align: center;
    border-right: 1px solid var(--lp-border);
  }
  .p-stat:last-child { border-right: none; }
  @media (max-width: 600px) {
    .p-stat:nth-child(2) { border-right: none; }
    .p-stat:nth-child(3), .p-stat:nth-child(4) { border-top: 1px solid var(--lp-border); }
  }
  .p-stat-value { font-size: 2rem; font-weight: 700; color: var(--lp-fg); }
  .p-stat-label { font-size: 13px; color: var(--lp-fg-4); margin-top: 0.25rem; letter-spacing: 0.05em; }

  /* ── blocks ──────────────────────────────────────── */
  .p-block { margin-bottom: 3.5rem; }
  .p-section-label {
    font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--lp-fg-4); margin-bottom: 1.5rem;
    padding-bottom: 0.75rem; border-bottom: 1px solid var(--lp-border);
  }

  /* ── cards ───────────────────────────────────────── */
  .p-cards { display: flex; flex-direction: column; gap: 1px; background: var(--lp-border); border: 1px solid var(--lp-border); }
  .p-card {
    background: var(--lp-bg); padding: 1.75rem;
  }
  .p-card-head {
    display: flex; justify-content: space-between; align-items: flex-start;
    gap: 1rem; margin-bottom: 1.25rem; flex-wrap: wrap;
  }
  .p-card-role    { font-size: 16px; font-weight: 600; color: var(--lp-fg); }
  .p-card-company { font-size: 13px; color: var(--lp-fg-4); margin-top: 0.3rem; }
  .p-card-body    { font-size: 15px; color: var(--lp-fg-3); line-height: 1.75; margin: 0; }

  .p-tag {
    font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--lp-fg-4); border: 1px solid var(--lp-border-2);
    padding: 0.25rem 0.7rem; white-space: nowrap; flex-shrink: 0;
  }

  .p-card-list {
    list-style: none; padding: 0; margin: 0;
    display: flex; flex-direction: column; gap: 0.75rem;
  }
  .p-card-list li {
    font-size: 15px; color: var(--lp-fg-3); line-height: 1.75;
    padding-left: 1.5rem; position: relative;
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
    font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase;
    color: var(--lp-fg-3); border: 1px solid var(--lp-border);
    padding: 0.4rem 0.875rem;
    transition: border-color 0.15s, color 0.15s;
  }
  .p-skill:hover { border-color: var(--lp-border-2); color: var(--lp-fg); }

  /* ── quote ───────────────────────────────────────── */
  .p-quote {
    font-size: 15px; color: var(--lp-fg-3); line-height: 1.75;
    font-style: italic; margin: 0 0 0.75rem;
  }
  .p-quote-context { font-size: 13px; color: var(--lp-fg-4); }

  /* ── contact ─────────────────────────────────────── */
  .p-contact-block { padding-bottom: 1rem; }
  .p-contact-note { font-size: 15px; color: var(--lp-fg-4); margin-bottom: 1.25rem; line-height: 1.7; }
  .p-inline-link { color: var(--lp-fg-2); text-decoration: underline; text-underline-offset: 3px; }
  .p-inline-link:hover { color: var(--lp-fg); }
  .p-contact-links { display: flex; flex-wrap: wrap; gap: 0.75rem; }
  .p-contact-link {
    display: inline-flex; align-items: center; gap: 0.5rem;
    font-size: 14px; color: var(--lp-fg-3); text-decoration: none;
    border: 1px solid var(--lp-border); padding: 0.6rem 1.25rem;
    transition: border-color 0.15s, color 0.15s;
  }
  .p-contact-link:hover { border-color: var(--lp-border-2); color: var(--lp-fg); }

  /* ── footer ──────────────────────────────────────── */
  .p-footer {
    font-size: 13px; color: var(--lp-fg-5); padding: 2rem 0 4rem; letter-spacing: 0.05em;
  }
`;

export default App;
