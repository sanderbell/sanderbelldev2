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
    .glow-effect {
      animation: glow 2s infinite alternate;
    }
    @keyframes glow {
      0% {
        filter: drop-shadow(0 0 5px rgba(0, 123, 255, 0.5));
      }
      100% {
        filter: drop-shadow(0 0 10px rgba(0, 123, 255, 0.8));
      }
    }
    .tech-tag {
      transition: transform 0.2s ease, background-color 0.2s ease;
    }
    .tech-tag:hover {
      transform: scale(1.03);
      background-color: #bfdbfe;
    }
    .card-enter {
      animation: cardEnter 0.5s ease-out;
      animation-fill-mode: backwards;
    }
    @keyframes cardEnter {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .fade-in {
      animation: fadeIn 0.7s ease-in;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    html {
      scroll-behavior: smooth;
    }
    .contact-link {
      transition: color 0.2s ease, transform 0.2s ease;
    }
    .contact-link:hover {
      transform: scale(1.03);
    }
  `;

  const stats = [
    { icon: Target, value: '7%', label: 'Freemium Conversion', color: 'green' },
    {
      icon: TrendingUp,
      value: '5.7K+',
      label: 'Organic App Installs',
      color: 'blue',
    },
    {
      icon: Rocket,
      value: '15+',
      label: 'Years Leadership',
      color: 'purple',
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
        "User-centered approach - doesn't simply focus on what the designs or specs say, but their purpose and intention. Made suggestions that were more elegant or user friendly.",
      context: 'Team Lead',
    },
    {
      quote:
        'Once you set clear requirements, he just gets stuff done. Much needed orange in a sea of apples.',
      context: 'Colleague',
    },
    {
      quote:
        'Quick at getting features done and fixing bugs. Always catches small cases others might miss.',
      context: 'Team Member',
    },
    {
      quote:
        'Helped show the team how AI can save time with creating/updating specs. Data-driven approach to documentation.',
      context: 'Developer',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-yellow-50 p-4 sm:p-6">
      <style>{globalStyles}</style>
      <div className="max-w-6xl mx-auto fade-in">
        <div className="text-center my-12">
          <div className="p-6 mb-6">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black bg-gradient-to-r from-blue-600 to-purple-500 text-transparent bg-clip-text leading-tight">
              Technical Product Manager.
              <br />
              Mobile & Growth.
            </h1>
          </div>

          <p className="text-xl text-gray-600 max-w-4xl mx-auto my-4 p-0">
            Bridging engineering constraints with business goals.{' '}
            <br className="hidden sm:block" />
            15+ years of experience in product leadership, content strategy, and
            technical execution.
          </p>

          <a
            href="cv.pdf"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity mt-6 shadow-lg hover:shadow-xl"
          >
            <Download size={20} />
            <span>Download Resume</span>
          </a>
        </div>

        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-2">
            <TechTag name="Product Strategy" size="xl" />
            <TechTag name="Technical PM" size="xl" />
            <TechTag name="Mobile Architecture" size="xl" />
            <TechTag name="Roadmap Ownership" size="lg" />
            <TechTag name="Stakeholder Management" size="lg" />
            <TechTag name="User Psychology" size="lg" />
            <TechTag name="React Native" size="lg" />
            <TechTag name="Unit Economics (LTV/CAC)" size="base" />
            <TechTag name="Feature Prioritization" size="base" />
            <TechTag name="A/B Testing" size="base" />
            <TechTag name="App Store Optimization" size="base" />
            <TechTag name="TypeScript" size="base" />
            <TechTag name="Next.js 14+" size="base" />
            <TechTag name="Retention Loops" size="sm" />
            <TechTag name="Data Analysis" size="sm" />
            <TechTag name="Conversion Optimization" size="sm" />
            <TechTag name="Agile/Scrum" size="sm" />
            <TechTag name="CI/CD Pipelines" size="sm" />
            <TechTag name="Android" size="sm" />
            <TechTag name="Git" size="sm" />
            <TechTag name="Figma" size="sm" />
            <TechTag name="AI Integration" size="sm" />
          </div>
        </div>

        <div className="mb-12">
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:border-blue-300 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Product Lead & Co-Founder
                  </h3>
                  <p className="text-purple-600 font-medium text-lg">
                    100K31D LLC · Jan 2025–Present
                  </p>
                </div>
                <span className="text-xs text-purple-600 bg-purple-100 px-3 py-1 rounded-full flex items-center justify-center font-bold">
                  HealthTech Portfolio
                </span>
              </div>
              <ul className="text-base text-gray-700 space-y-2">
                <li>
                  → <strong>Strategic Leadership:</strong> Lead product roadmap
                  and technical direction for a co-founded studio, aligning 3
                  partners on feature prioritization and delivery timelines.
                </li>
                <li>
                  → <strong>Execution & Growth:</strong> Directed the full
                  product lifecycle for Esse and OAAT, driving 5,700+ organic
                  users through SEO and viral mechanics (zero paid acquisition).
                </li>
                <li>
                  → <strong>Monetization Engine:</strong> Designed a tiered
                  subscription model grounded in behavioral psychology,
                  achieving a <strong>7% freemium conversion rate</strong>{' '}
                  (industry avg 2-3%) and sustainable unit economics.
                </li>
                <li>
                  → <strong>Technical Ownership:</strong> Architected
                  high-fidelity React Native mobile apps, managing the CI/CD
                  pipeline and release cycles across iOS and Android.
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:border-blue-300 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Product Engineer
                  </h3>
                  <p className="text-blue-600 font-medium text-lg">
                    Ling App · Dec 2023–Nov 2025
                  </p>
                </div>
                <span className="text-xs text-blue-600 bg-blue-100 px-3 py-1 rounded-full flex items-center justify-center font-bold">
                  2M+ Users
                </span>
              </div>
              <ul className="text-base text-gray-700 space-y-2">
                <li>
                  → <strong>Product-Led Engineering:</strong> Functioned as the
                  technical bridge between product managers and engineering,
                  translating business requirements into feasible technical
                  specs.
                </li>
                <li>
                  → <strong>Feature Ownership:</strong> Co-led the scoping and
                  delivery of 40+ major features, managing trade-offs between
                  technical debt and user value delivery.
                </li>
                <li>
                  → <strong>UX Optimization:</strong> Proactively identified
                  friction in user flows and implemented technical solutions
                  that directly improved retention and reduced support tickets.
                </li>
                <li>
                  → <strong>Stakeholder Communication:</strong> Translated
                  technical constraints for non-technical leadership, enabling
                  more accurate roadmap planning and risk assessment.
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:border-blue-300 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Technical Product Consultant
                  </h3>
                  <p className="text-gray-600 font-medium text-lg">
                    Freelance / Remote · May 2022–Dec 2023
                  </p>
                </div>
              </div>
              <ul className="text-base text-gray-700 space-y-2">
                <li>
                  → <strong>Stakeholder Management:</strong> Partnered with
                  clients to define MVP requirements and technical scope,
                  translating loose business goals into actionable product
                  roadmaps.
                </li>
                <li>
                  [cite_start]→ <strong>Product Growth:</strong> Developed and
                  launched the <em>Rewords</em> browser extension[cite: 31],
                  growing it to <strong>1,000+ active users</strong> and earning
                  a "Featured" badge on the Chrome Web Store through iterative
                  user feedback loops.
                </li>
                <li>
                  [cite_start]→ <strong>Rapid Prototyping:</strong> Built and
                  deployed multiple web applications using Vue.js and React,
                  focusing on speed-to-market and core feature validation[cite:
                  32].
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:border-blue-300 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Content Product Lead
                  </h3>
                  <p className="text-gray-600 font-medium text-lg">
                    Various Media Orgs · Feb 2008–May 2022
                  </p>
                </div>
              </div>
              <ul className="text-base text-gray-700 space-y-2">
                <li>
                  → <strong>Product Operations:</strong> Managed content supply
                  chains and cross-functional teams of copywriters and editors
                  for 15 years, defining editorial roadmaps aligned with
                  audience growth metrics.
                </li>
                <li>
                  → <strong>Growth Strategy:</strong> Launched 0→1 media
                  verticals, achieving rapid audience scaling through organic
                  search strategy and brand positioning.
                </li>
                <li>
                  → <strong>Crisis Management:</strong> Led communication
                  strategies during high-pressure cycles, maintaining brand
                  integrity and stakeholder trust.
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
                My Master's in Psychology isn't just a degree—it's my
                competitive advantage. I don't just build features; I design{' '}
                <strong>habit loops</strong>. I use cognitive behavioral
                insights to reduce friction, improve onboarding retention, and
                create "sticky" user experiences that drive LTV.
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
