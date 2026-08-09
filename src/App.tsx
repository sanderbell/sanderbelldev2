import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { ChevronDown, Download, Github, Linkedin, Mail, X } from 'lucide-react';

/* ── main ─────────────────────────────────────────── */
function appLink(href: string, label: string, rest: string) {
  return (
    <>
      <a href={href} target="_blank" rel="noopener noreferrer" className="app-link">
        {label}
      </a>{' '}
      — {rest}
    </>
  );
}

function encodeFormData(data: Record<string, string>) {
  return Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
}

function ContactForm() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [botField, setBotField] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (botField) return;
    setStatus('sending');
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeFormData({ 'form-name': 'contact', email, subject, message }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return <p className="p-form-sent">Sent — I'll get back to you soon.</p>;
  }

  return (
    <form name="contact" onSubmit={handleSubmit} className="p-form">
      <label className="p-hp-field" aria-hidden="true">
        Leave this field empty
        <input
          tabIndex={-1}
          autoComplete="off"
          value={botField}
          onChange={e => setBotField(e.target.value)}
        />
      </label>
      <div className="p-form-row">
        <input
          type="email"
          placeholder="Your email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="p-form-input"
        />
        <input
          type="text"
          placeholder="Subject"
          required
          value={subject}
          onChange={e => setSubject(e.target.value)}
          className="p-form-input"
        />
      </div>
      <textarea
        placeholder="Message"
        required
        rows={3}
        value={message}
        onChange={e => setMessage(e.target.value)}
        className="p-form-input p-form-textarea"
      />
      <button type="submit" className="p-btn-primary" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
      {status === 'error' && (
        <p className="p-form-error">
          Something went wrong — email me directly instead.
        </p>
      )}
    </form>
  );
}

function ContactModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div className="p-modal-backdrop" onClick={onClose}>
      <div className="p-modal" onClick={e => e.stopPropagation()}>
        <button
          type="button"
          className="p-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={16} />
        </button>
        <div className="p-modal-title">Say hello</div>
        <ContactForm />
      </div>
    </div>
  );
}

function WorkCard({
  role,
  company,
  period,
  tag,
  items,
  moreItems,
}: {
  role: string;
  company: string;
  period: string;
  tag: string;
  items: ReactNode[];
  moreItems: ReactNode[];
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="p-card">
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
        {expanded && moreItems.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
      {moreItems.length > 0 && (
        <button
          type="button"
          className="p-card-toggle"
          onClick={() => setExpanded(v => !v)}
          aria-expanded={expanded}
        >
          <ChevronDown size={13} className={expanded ? 'p-chevron-up' : ''} />
          {expanded ? 'Show fewer' : `${moreItems.length} more projects`}
        </button>
      )}
    </div>
  );
}

function App() {
  const work = [
    {
      role: 'Co-Founder & Product Architect',
      company: '100K31D',
      period: 'Dec 2024 – Present',
      tag: 'AI-native',
      items: [
        appLink(
          'https://comms.at',
          'Comms',
          'AI pre-publication risk scanner — legal, cultural, context, and claim checks before you hit send.',
        ),
        appLink(
          'https://esse.today',
          'Esse',
          'AI summarizer app, iOS and Android. 10K+ organic users, 7% freemium conversion, zero paid acquisition.',
        ),
      ],
      moreItems: [
        appLink(
          'https://100k31d.co/orbforcodex/',
          'Orb for Codex',
          'macOS menu-bar Codex usage at a glance.',
        ),
        appLink(
          'https://100k31d.co/bloomforclaude/',
          'Bloom for Claude',
          'The same idea for Claude, as a flower above your windows.',
        ),
        appLink(
          'https://100k31d.co/shift-rsvp/',
          'Shift RSVP',
          'Speed-reads selected text, one word at a time.',
        ),
        appLink(
          'https://bbr.today',
          'Burn Before Reading',
          'Shift-click anything on a page to burn it away. Chrome extension, viral on day one, Google Featured.',
        ),
        appLink(
          'https://rewords.xyz',
          'Rewords',
          'Swaps words and phrases as pages load. Chrome extension, 1,500+ users, Google Featured.',
        ),
        appLink(
          'https://100k31d.co/oaat/',
          'One at a Time',
          'iOS app for reflective questions and deliberate typing practice.',
        ),
        appLink(
          'https://100k31d.co/vpnstatus/',
          'VPN Status',
          'macOS menu-bar VPN monitor.',
        ),
        appLink(
          'https://100k31d.co/mono/',
          'mono',
          'Dark mode and grayscale for Google Docs and Sheets.',
        ),
        appLink(
          'https://100k31d.co/numb/',
          'Numb',
          'Calm, predictable pauses for keyboard and pointer input.',
        ),
      ],
    },
    {
      role: 'Product Engineer — React Native',
      company: 'Ling App',
      period: 'Dec 2023 – Nov 2025',
      tag: '2M+ Users',
      items: [
        'Shipped in a 2M+ user language app, 60+ languages — audio, transliteration, pronunciation, streaks.',
        'Tuned rendering and data-fetching performance for real-world devices.',
        'Owned features end to end — PRs, code review, release, monitoring — as a peer engineer.',
      ],
      moreItems: [],
    },
    {
      role: 'Product Manager — NLP Sentiment',
      company: 'Critical Mention / Onclusive',
      period: 'Jan 2021 – Nov 2023',
      tag: 'B2B Media Intel',
      items: [
        'Joined as a media/comms SME, then owned the NLP sentiment module as PM.',
        'Mapped crisis-response workflows in user interviews; specced a sentiment lexicon, influence scoring, and a coverage-velocity widget.',
        'Shipped on time — became a sales differentiator vs. Meltwater and Cision. Held accounts through the STG/Onclusive acquisition.',
      ],
      moreItems: [],
    },
    {
      role: 'Content Product Lead',
      company: 'UCHI',
      period: 'Feb 2018 – Jan 2021',
      tag: 'Edtech',
      items: [
        'Led a 10+ team at Eastern Europe’s largest school-tech platform through the 2020 remote-learning surge.',
        'Turned content into a product lever — A/B-tested copy, headlines, and push for retention.',
        'Lifted time-on-platform 15% with interactive check-ins; cut history-unit drop-off 22% with a drag-and-drop timeline.',
      ],
      moreItems: [],
    },
    {
      role: 'Media, Communications & Editorial',
      company: 'Broadcast · Online · Civic',
      period: '2008 – 2018',
      tag: '10 yrs',
      items: [
        'Editor and anchor → co-founder and Editor-in-Chief of independent outlets.',
        'Ran narrative and crisis strategy for civic campaigns under live attack — the judgment that later became product requirements.',
      ],
      moreItems: [],
    },
  ];

  const principles = [
    {
      title: 'Psychology is the product',
      body: "MSc Psychology isn't decoration — I design habit loops from behavioral theory to cut friction and lift retention. It's why Esse converts at 7%.",
    },
    {
      title: 'I build what I spec',
      body: "I don't hand off. I write the blueprint and the code — closing the gap between what's designed and what ships.",
    },
    {
      title: 'Scope kills more products than bugs',
      body: "The most valuable call in a sprint is what not to build. I've killed more bad features than I can count.",
    },
    {
      title: 'Outcomes over output',
      body: 'Tickets closed and lines of code are vanity metrics. I measure conversion, retention, and whether it gets used.',
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

  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="portfolio-root">
      <style>{css}</style>
      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}

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

            <div className="p-overline">Product Builder</div>
            <h1 className="p-name">Sander Bell</h1>
            <p className="p-bio">
              A product person gone technical — I run{' '}
              <a
                href="https://100k31d.co"
                target="_blank"
                rel="noopener noreferrer"
                className="app-link"
              >
                100k31d.co
              </a>
              , shipping end to end, architecture to code. MSc Psychology ·
              15+ years, from media to a 2M+ user app to AI-native products.
            </p>

            <div className="p-ctas">
              <a
                href="/Sander-Bell-CV.pdf"
                download
                className="p-btn-primary"
              >
                <Download size={14} /> Download CV
              </a>
              <button
                type="button"
                onClick={() => setContactOpen(true)}
                className="p-btn-secondary"
              >
                <Mail size={14} /> Say hello
              </button>
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
              {work.map(w => (
                <WorkCard key={w.role} {...w} />
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
            <p className="p-contact-note">Open to Product Builder roles.</p>
            <div className="p-contact-links">
              <button
                type="button"
                onClick={() => setContactOpen(true)}
                className="p-contact-link p-contact-link-btn"
              >
                <Mail size={14} /> Send a message
              </button>
              <a
                href="mailto:thesanderbell@gmail.com"
                className="p-contact-link"
              >
                <Mail size={14} /> thesanderbell@gmail.com
              </a>
              <a
                href="/Sander-Bell-CV.pdf"
                download
                className="p-contact-link"
              >
                <Download size={14} /> Download CV
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
    box-shadow: inset 0 0 0 1px rgba(60, 70, 62, 0.12);
  }
  .p-photo-ring::after {
    content: '';
    position: absolute; inset: 0;
    background:
      radial-gradient(circle at 34% 24%, rgba(250, 250, 248, 0.16), transparent 42%),
      linear-gradient(135deg, rgba(20, 22, 20, 0.24), rgba(60, 70, 62, 0.28));
    mix-blend-mode: color;
    opacity: 0.32;
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
    box-shadow: 0 14px 30px rgba(20, 22, 20, 0.14);
    transition: background 0.18s, color 0.18s, border-color 0.18s, box-shadow 0.18s;
  }
  .p-btn-primary:hover {
    background: var(--lp-btn-hover-gradient); color: var(--lp-btn-hover-fg);
    border-color: var(--lp-btn-border);
    box-shadow: 0 16px 34px rgba(20, 22, 20, 0.20);
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

  .p-card-toggle {
    display: inline-flex; align-items: center; gap: 0.4rem;
    background: transparent; border: none; cursor: pointer;
    font-family: inherit; font-size: 13px; color: var(--lp-fg-4);
    padding: 0; margin-top: 1.25rem;
    transition: color 0.15s;
  }
  .p-card-toggle:hover { color: var(--lp-fg-2); }
  .p-card-toggle svg { transition: transform 0.15s; }
  .p-card-toggle svg.p-chevron-up { transform: rotate(180deg); }

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

  .p-form { display: flex; flex-direction: column; gap: 0.75rem; max-width: 32rem; margin-bottom: 1.75rem; }
  .p-form-row { display: flex; flex-wrap: wrap; gap: 0.75rem; }
  .p-form-row .p-form-input { flex: 1 1 12rem; }
  .p-form-input {
    box-sizing: border-box;
    font-family: inherit; font-size: 14px; color: var(--lp-fg);
    background: var(--lp-bg); border: 1px solid var(--lp-border-2);
    padding: 0.75rem 1rem; width: 100%;
    transition: border-color 0.15s;
  }
  .p-form-input::placeholder { color: var(--lp-fg-4); }
  .p-form-input:focus { outline: none; border-color: var(--lp-fg-3); }
  .p-form-textarea { resize: vertical; min-height: 4.5rem; }
  .p-form .p-btn-primary { align-self: flex-start; border: none; }
  .p-form .p-btn-primary:disabled { opacity: 0.6; cursor: default; }
  .p-hp-field { position: absolute; left: -9999px; top: -9999px; }
  .p-form-sent { font-size: 15px; color: var(--lp-fg-2); max-width: 32rem; margin-bottom: 1.75rem; }
  .p-form-error { font-size: 13px; color: var(--lp-fg-4); margin: 0; }
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
  .p-contact-link-btn { background: transparent; font-family: inherit; cursor: pointer; }

  /* ── contact modal ───────────────────────────────── */
  .p-modal-backdrop {
    position: fixed; inset: 0; background: rgba(10, 10, 10, 0.55);
    display: flex; align-items: center; justify-content: center;
    padding: 1.5rem; z-index: 50;
  }
  .p-modal {
    position: relative; width: 100%; max-width: 26rem;
    background: var(--lp-bg-alt); border: 1px solid var(--lp-border-2);
    padding: 1.75rem; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  }
  .p-modal .p-form { max-width: none; margin-bottom: 0; gap: 0.6rem; }
  .p-modal-title { font-size: 18px; font-weight: 700; color: var(--lp-fg); margin-bottom: 1rem; }
  .p-modal-close {
    position: absolute; top: 1rem; right: 1rem;
    display: inline-flex; background: transparent; border: none; cursor: pointer;
    color: var(--lp-fg-4); padding: 0.25rem;
    transition: color 0.15s;
  }
  .p-modal-close:hover { color: var(--lp-fg); }

  /* ── footer ──────────────────────────────────────── */
  .p-footer {
    font-size: 13px; color: var(--lp-fg-5); padding: 2rem 0 4rem; letter-spacing: 0.05em;
  }
`;

export default App;
