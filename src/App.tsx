import {
  Github,
  Linkedin,
  Mail,
  Rocket,
  Star,
  Target,
  TrendingUp,
  Download,
  MapPin,
} from 'lucide-react';
import React, { useRef } from 'react';

interface TechTagProps {
  name: string;
  size?: 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  icon?: React.ComponentType<{ size?: number }>;
}

const TechTag: React.FC<TechTagProps> = ({
  name,
  size = 'base',
  icon: Icon,
}) => {
  const sizeClasses = {
    'sm': 'text-xs px-2 py-1',
    'base': 'text-sm px-3 py-1.5',
    'lg': 'text-base px-4 py-2',
    'xl': 'text-lg px-5 py-2.5',
    '2xl': 'text-xl px-6 py-3',
  };

  return (
    <span
      className={`tech-tag inline-flex items-center gap-1 bg-blue-100 text-blue-800 rounded-full font-medium ${sizeClasses[size]} hover:bg-blue-200 transition-all duration-200 hover:scale-105`}
    >
      {Icon && <Icon size={size === 'sm' ? 12 : size === 'base' ? 14 : 16} />}
      {name}
    </span>
  );
};

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  value,
  label,
  color = 'blue',
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const colorClasses = {
    green: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: 'text-green-600',
      value: 'text-green-700',
      label: 'text-green-600',
    },
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: 'text-blue-600',
      value: 'text-blue-700',
      label: 'text-blue-600',
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      icon: 'text-purple-600',
      value: 'text-purple-700',
      label: 'text-purple-600',
    },
    orange: {
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      icon: 'text-orange-600',
      value: 'text-orange-700',
      label: 'text-orange-600',
    },
  };

  const selectedColor =
    colorClasses[color as keyof typeof colorClasses] || colorClasses.blue;

  return (
    <div
      ref={ref}
      className={`${selectedColor.bg} ${selectedColor.border} border rounded-lg p-4 text-center card-enter`}
    >
      <Icon className={`w-6 h-6 ${selectedColor.icon} mx-auto mb-2`} />
      <div className={`text-2xl font-bold ${selectedColor.value}`}>{value}</div>
      <div className={`text-sm ${selectedColor.label}`}>{label}</div>
    </div>
  );
};

interface TestimonialCardProps {
  quote: string;
  context: string;
  rating?: number;
  delay?: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  context,
  rating = 5,
  delay = 0,
}) => (
  <div
    className="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
    style={{ animationDelay: `${delay}s` }}
  >
    <div className="flex mb-2">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
      ))}
    </div>
    <p className="text-gray-800 text-sm mb-2 italic">"{quote}"</p>
    <p className="text-xs text-gray-500">{context}</p>
  </div>
);

function App() {
  const globalStyles = `
      .glow-effect { animation: glow 2s infinite alternate; }
      @keyframes glow {
        0% { filter: drop-shadow(0 0 5px rgba(0, 123, 255, 0.5)); }
        100% { filter: drop-shadow(0 0 10px rgba(0, 123, 255, 0.8)); }
      }
      .tech-tag { transition: transform 0.2s ease, background-color 0.2s ease; }
      .tech-tag:hover { transform: scale(1.03); background-color: #bfdbfe; }
      .card-enter { animation: cardEnter 0.5s ease-out; animation-fill-mode: backwards; }
      @keyframes cardEnter {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .fade-in { animation: fadeIn 0.7s ease-in; }
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      html { scroll-behavior: smooth; }
      .contact-link { transition: color 0.2s ease, transform 0.2s ease; }
      .contact-link:hover { transform: scale(1.03); }
    `;

  const stats = [
    {
      icon: Rocket,
      value: '15+',
      label: 'Years Leadership',
      color: 'purple',
    },
    { icon: Target, value: '7%', label: 'Freemium Conversion', color: 'green' },
    {
      icon: TrendingUp,
      value: '10K+',
      label: 'Organic Users',
      color: 'blue',
    },
    {
      icon: Star,
      value: '4.9',
      label: 'App Store Rating',
      color: 'orange',
    },
  ];

  const testimonials = [
    {
      quote:
        'A high-impact builder. Consistently a top performer, he ships stable, thoughtful features and isn’t afraid to flag when complexity outweighs value. A go-to for critical initiatives.',
      context: 'Piyawasin P., Senior Software Engineer, Ling',
    },
    {
      quote:
        'Showed traits not commonly found in developers. Practiced due diligence, asked clear questions to understand core issues, and was easy to communicate with.',
      context: 'Dennis B., Engineering Lead, Ling',
    },
    {
      quote:
        'User-centered approach — doesn’t simply focus on what the designs or specs say, but on their purpose and intention. Made suggestions that were more elegant and user-friendly.',
      context: 'Product Manager, Ling',
    },
    {
      quote:
        'Kept teams aligned and effectively managed, presented a company-wide editorial policy that solidified our brand voice.',
      context: 'Anna Artukh, PR Director, Uchi',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-yellow-50 p-4 sm:p-6">
      <style>{globalStyles}</style>
      <div className="max-w-6xl mx-auto fade-in">
        <div className="text-center my-12">
          <div className="p-6 mb-6">
            <h1 className="text-5xl sm:text-7xl md:text-9xl font-black bg-gradient-to-r from-blue-600 to-purple-500 text-transparent bg-clip-text leading-tight">
              Product Manager.{' '}
            </h1>
            <br />
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black bg-gradient-to-r from-blue-600 to-purple-500 text-transparent bg-clip-text">
              Technical. Mobile & Web.{' '}
            </h2>
          </div>

          <p className="text-xl text-gray-600 max-w-4xl mx-auto my-4 p-0">
            Bridging engineering constraints with business goals.{' '}
            <br className="hidden sm:block" />
            15+ years of experience in leadership, content strategy, and
            technical execution.
          </p>

          <a
            href="resume.pdf"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity mt-6 shadow-lg hover:shadow-xl"
          >
            <Download size={20} />
            <span>Download Resume</span>
          </a>
        </div>

        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-2">
            <TechTag name="Product Strategy" size="xl" />
            <TechTag name="User Empathy" size="xl" />
            <TechTag name="Tech Stack" size="xl" />
            <TechTag name="Roadmapping" size="lg" />
            <TechTag name="Stakeholder Management" size="lg" />
            <TechTag name="Psychology-Backed UX" size="lg" />
            <TechTag name="React Native" size="lg" />
            <TechTag name="Unit Economics (LTV/CAC)" size="base" />
            <TechTag name="GTM Strategy" size="base" />
            <TechTag name="A/B Testing" size="base" />
            <TechTag name="ASO" size="base" />
            <TechTag name="CRO" size="base" />
            <TechTag name="TypeScript" size="base" />
            <TechTag name="Mobile Architecture" size="base" />
            <TechTag name="RICE/MoSCoW" size="sm" />
            <TechTag name="Risk Mitigation" size="sm" />
            <TechTag name="Agile/Scrum" size="sm" />
            <TechTag name="User Journey Analysis" size="sm" />
            <TechTag name="User Research (JTBD)" size="sm" />
            <TechTag name="AI Integration" size="sm" />
          </div>
        </div>

        <div className="mb-12">
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:border-blue-300 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Product Lead, Co-Founder
                  </h3>
                  <p className="text-purple-600 font-medium text-lg">
                    100K31D · Dec 2024–Present
                  </p>
                </div>
                <span className="text-xs text-purple-600 bg-purple-100 px-3 py-1 rounded-full flex items-center justify-center font-bold">
                  2 Products
                </span>
              </div>
              <ul className="text-base text-gray-700 space-y-2">
                <li>
                  → <strong>Strategic Leadership:</strong> Created product
                  roadmap, successfully launched two mobile products (
                  <a
                    href="https://esse.today"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-700 hover:text-purple-800 transition-colors"
                  >
                    <em>Esse </em>
                  </a>
                  ,{' '}
                  <a
                    href="https://oneatati.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-700 hover:text-purple-800 transition-colors"
                  >
                    <em> One at a Time </em>
                  </a>
                  ) 0 → 1.
                </li>
                <li>
                  → <strong>Growth & Impact:</strong> Achieved 10,000+ organic
                  users and a <strong>7% freemium conversion rate</strong> (vs
                  industry avg 2%) by implementing A/B testing and
                  psychology-backed onboarding flows.
                </li>
                <li>
                  → <strong>Technical Execution:</strong> Architected and
                  implemented production-ready React Native apps.
                </li>
                <li>
                  → <strong>Market Validation:</strong> Validated PMF via
                  low-cost MVP testing on Reddit, achieving a #1 subreddit
                  ranking and establishing immediate feedback loops for rapid
                  iteration.
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:border-blue-300 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Product Engineer (React/Next.js)
                  </h3>
                  <p className="text-blue-600 font-medium text-lg">
                    Ling App · Dec 2023–Nov 2025
                  </p>
                </div>
                <span className="text-xs text-blue-600 bg-blue-100 px-3 py-1 rounded-full flex items-center justify-center font-bold">
                  2M+ Users
                </span>
              </div>
              <p className="text-sm text-gray-500 italic mb-2">
                Functioning as the bridge between Product and Engineering for an
                app with 2M+ users (
                <a
                  href="https://ling-app.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Ling-App.com
                </a>
                )
              </p>
              <ul className="text-base text-gray-700 space-y-2">
                <li>
                  → <strong>Product Engineering:</strong> Translated business
                  requirements into feasible tech specs and vice versa, reducing
                  dev rework by <strong>~15%</strong>.
                </li>
                <li>
                  → <strong>Feature Ownership:</strong> Co-led scoping and
                  delivery of 40+ major features, managing trade-offs between
                  technical debt reduction and new user value.
                </li>
                <li>
                  → <strong>Retention Optimization:</strong> Proactively
                  identified friction points in the user journey and implemented
                  UI/UX fixes that directly improved session time and retention.
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:border-blue-300 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Product Consultant / Freelance Engineer
                  </h3>
                  <p className="text-gray-600 font-medium text-lg">
                    Remote · May 2022–Dec 2023
                  </p>
                </div>
                <span className="text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-full flex items-center justify-center font-bold">
                  Strategic Partner
                </span>
              </div>
              <p className="text-sm text-gray-500 italic mb-2">
                Operating as a technical partner for clients, translating
                business requirements into MVPs and complete solutions.
              </p>
              <ul className="text-base text-gray-700 space-y-2">
                <li>
                  → <strong>Stakeholder Management:</strong> Partnered with
                  clients to define MVP requirements and technical scope,
                  translating loose business goals into actionable product
                  roadmaps.
                </li>
                <li>
                  → <strong>Rapid Prototyping:</strong> Built and deployed web
                  apps (
                  <a
                    href="https://somany.ch"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-700 hover:text-purple-800 transition-colors"
                  >
                    <em>So Many Characters</em>
                  </a>
                  ,{' '}
                  <a
                    href="https://should.today"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-700 hover:text-purple-800 transition-colors"
                  >
                    <em>Should Today</em>
                  </a>
                  , etc.) using Vue.js and React, focusing on speed-to-market
                  and core feature validation.
                </li>
                <li>
                  → <strong>Product Growth:</strong> Developed and launched{' '}
                  <a
                    href="https://rewords.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-700 hover:text-purple-800 transition-colors"
                  >
                    <em>Rewords</em>
                  </a>
                  , growing it to <strong>1,000+ active users</strong> within
                  months and earning a "Featured" badge on the Chrome Web Store.
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:border-blue-300 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Content Lead
                  </h3>
                  <p className="text-gray-600 font-medium text-lg">
                    Various Media & Editorial Teams · Feb 2008–May 2022
                  </p>
                </div>
              </div>
              <ul className="text-base text-gray-700 space-y-2">
                <li>
                  → <strong>Startup Operations:</strong> Co-founded and managed
                  independent news outlets, hired and led teams of 15+; managed
                  agency relations and budgets.
                </li>
                <li>
                  → <strong>Retention & Metrics:</strong> Tracked session depth,
                  reader retention, visitor growth. Adjusted content
                  distribution strategy based on behavioral data.
                </li>
                <li>
                  → <strong>Product Quality:</strong> Enforced editorial
                  standards and content QA pipelines, used user research to
                  identify friction points and improve reader retention.
                </li>
                <li>
                  → <strong>System Design:</strong> Developed internal roadmaps
                  and editorial policies to standardize team output and
                  operations.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Peer Feedback
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.quote.slice(0, 20)}
                {...testimonial}
                delay={index * 0.2}
              />
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            The "Why" Behind The Tech
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                Psychology 🤝 Product
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                My Master's in Psychology isn't just a degree — it's my
                competitive advantage. I don't just build stuff; I design{' '}
                <strong>habit loops</strong> using cognitive behavioral insights
                to reduce friction, improve onboarding retention, and create
                "sticky" UX that drives LTV.
              </p>
            </div>
            <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                Bangkok Based, Global Mindset
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Based in <strong>Bangkok, Thailand</strong>. Fluent in English
                and Russian, learning Thai. I bring a global perspective to
                product localization and have a proven track record of managing
                asynchronous workflows across time zones.
              </p>
            </div>
            <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                Technical Authority
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                I speak "Engineer" fluently. Because I can audit code and build
                RN architectures myself, I can accurately estimate feasibility,
                challenge over-engineering, and earn the respect of dev teams
                instantly.
              </p>
            </div>
            <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                Outcome Over Output
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                I don't measure success by lines of code or tickets closed. I
                measure it by{' '}
                <strong>conversion rates, retention curves, and revenue</strong>
                . My goal is always to maximize business impact with the leanest
                possible technical scope.
              </p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="text-center bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-12">
          <div className="flex items-center justify-center gap-2 mb-4 text-gray-900 font-semibold">
            <MapPin className="text-blue-600" size={20} />
            <span>Bangkok, Thailand</span>
          </div>
          <p className="text-sm text-gray-600 mb-6 max-w-2xl mx-auto">
            Ready to lead Mobile Product initiatives. Open to hybrid/onsite
            roles in Bangkok or remote global roles.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:thesanderbell@gmail.com"
              className="contact-link text-base flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium bg-gray-50 px-4 py-2 rounded-full border border-gray-200"
            >
              <Mail size={18} />
              <span>thesanderbell@gmail.com</span>
            </a>
            <a
              href="https://linkedin.com/in/sanderbell"
              className="contact-link text-base flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium bg-gray-50 px-4 py-2 rounded-full border border-gray-200"
            >
              <Linkedin size={18} />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/sanderbell"
              className="contact-link text-base flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium bg-gray-50 px-4 py-2 rounded-full border border-gray-200"
            >
              <Github size={18} />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        <div className="text-center text-gray-400 text-xs pb-8">
          © 2026 Sander Bell
        </div>
      </div>
    </div>
  );
}

export default App;
