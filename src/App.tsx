import {
  Github,
  Linkedin,
  Mail,
  Rocket,
  Star,
  Target,
  TrendingUp,
  Download,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

const RotatingProfile = () => {
  const [rotate, setRotate] = useState(false);

  useEffect(() => {
    setRotate(true);
  }, []);

  return (
    <div className="relative w-[10rem] h-[10rem] sm:w-[15rem] sm:h-[15rem] mx-auto mb-6">
      <img
        src="react.svg"
        alt="React Logo"
        className="w-full h-full absolute top-0 left-0 transition-transform duration-1900 ease-in-out"
        style={{
          transform: `rotate(${rotate ? '360deg' : '0deg'})`,
          zIndex: 5,
        }}
      />
      <img
        src="/photo.jpeg"
        alt="Profile Portrait"
        className="w-[3rem] h-[3rem] rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover"
        style={{ zIndex: 10 }}
      />
    </div>
  );
};

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
      value: '4.5K+',
      label: 'Organic App Installs',
      color: 'blue',
    },
    {
      icon: Rocket,
      value: '7',
      label: 'Products Launched 0→1',
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
        {/* Header */}
        <div className="text-center my-12">
          <RotatingProfile />
          <div className="p-6 mb-6">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black bg-gradient-to-r from-blue-600 to-purple-500 text-transparent bg-clip-text">
              Product-Minded. <br />
              Founder & Builder.
            </h1>
          </div>

          <p className="text-xl text-gray-600 max-w-4xl mx-auto my-4 p-0">
            Shipping at scale and solo-founding apps with full product
            ownership. Seeking PM/PO roles in mobile-focused teams.
          </p>

          <a
            href="cv.pdf"
            download
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity mt-4"
          >
            <Download size={20} />
            <span>Download CV</span>
          </a>
        </div>

        <div className="opacity-95 relative w-full max-w-6xl mx-auto mb-14 aspect-video rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
          <iframe
            src="https://www.youtube.com/embed/q3JRGnD-ckE"
            title="Esse AI Video Summarizer Demo"
            allowFullScreen
            loading="lazy"
            className="absolute top-0 left-0 w-full h-full"
          ></iframe>
        </div>

        {/* Product & Tech Skills Cloud */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-2">
            <TechTag name="Product Strategy" size="xl" />
            <TechTag name="0→1 Product Launch" size="xl" />
            <TechTag name="User Research" size="xl" />
            <TechTag name="React Native" size="lg" />
            <TechTag name="React" size="lg" />
            <TechTag name="Mobile Product" size="lg" />
            <TechTag name="AI Integration" size="lg" />
            <TechTag name="Monetization Strategy" size="base" />
            <TechTag name="Feature Prioritization" size="base" />
            <TechTag name="A/B Testing" size="base" />
            <TechTag name="App Store Optimization" size="base" />
            <TechTag name="TypeScript" size="base" />
            <TechTag name="Next.js 14+" size="base" />
            <TechTag name="User Retention" size="sm" />
            <TechTag name="Product Metrics" size="sm" />
            <TechTag name="Conversion Optimization" size="sm" />
            <TechTag name="Go-to-Market" size="sm" />
            <TechTag name="iOS Development" size="sm" />
            <TechTag name="Android" size="sm" />
            <TechTag name="Git" size="sm" />
            <TechTag name="Figma" size="sm" />
            <TechTag name="Redux" size="sm" />
            <TechTag name="Node.js" size="sm" />
            <TechTag name="Performance Optimization" size="sm" />
          </div>
        </div>

        <div className="mb-12">
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Founder & Solo Product Lead
                  </h3>
                  <p className="text-purple-600 font-medium">
                    100k31d (Wellness Tech) · Jan 2025–Present
                  </p>
                </div>
                <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full flex items-center justify-center h-10 w-20">
                  2 Apps
                </span>
              </div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>
                  →{' '}
                  <strong>
                    <a
                      href="https://apps.apple.com/us/app/esse-ai-video-summarizer/id6751778111"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-800 underline"
                    >
                      Esse
                    </a>
                  </strong>
                  {': '}
                  AI video summarizer that achieved 4,500+ installs, $200+ MRR,
                  7% freemium conversion, and Top 3 US App Store paid
                  productivity ranking—all with zero marketing spend
                </li>
                <li>
                  →{' '}
                  <strong>
                    <a
                      href="https://apps.apple.com/us/app/one-at-a-time-mindful-typing/id6748601899"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-800 underline"
                    >
                      One at a Time
                    </a>
                  </strong>
                  {': '}
                  Typing meditation app with advanced animations and haptics,
                  built from psychological insights into behavior change
                </li>
                <li>
                  → <strong>Full product ownership A→Z:</strong> Market
                  research, competitive analysis, user persona development,
                  feature roadmapping, UX wireframes, development, App Store
                  deployment, pricing strategy, subscription setup, user
                  analytics, retention optimization, viral marketing loops
                </li>
                <li>
                  → <strong>PMF validation:</strong> Viral Reddit launch for
                  Esse (#1 post, 2K downloads in 12 hours), 40+ five-star
                  reviews, sustained organic growth, and university partnership
                  inquiries—proving strong product-market fit
                </li>
                <li>
                  → <strong>Monetization expertise:</strong> Designed and
                  implemented freemium model with tiered subscriptions
                  ($1.99/week, $4.99/month, $39.99/year, $59.99 lifetime) to
                  maximize conversion and LTV
                </li>
                <li>
                  → <strong>Data-driven iteration:</strong> Analyzed user
                  behavior, drop-off points, and feature usage to inform product
                  roadmap; shipped updates based on real metrics and feedback
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    React / Next.js Developer
                  </h3>
                  <p className="text-blue-600 font-medium">
                    Ling App · Dec 2023–Nov 2025
                  </p>
                </div>
                <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full flex items-center justify-center h-10 w-20">
                  2M+ Users
                </span>
              </div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>
                  → Maintained React Native application serving 2+ million
                  language learners across iOS and Android
                </li>
                <li>
                  → Developed and maintained Next.js web application, delivering
                  40+ major features with focus on cross-platform consistency
                </li>
                <li>
                  → <strong>Product thinking in practice:</strong> Provided
                  input on UX flows, feature scope trade-offs, technical risk
                  assessment, and edge case handling—incorporated into product
                  decisions and releases
                </li>
                <li>
                  → <strong>User-centered development:</strong> Applied
                  psychology background to wellness modules, using behavioral
                  science principles to boost retention and engagement metrics
                </li>
                <li>
                  → Proactively identified and solved user pain points, going
                  beyond implementation specs to improve overall product
                  experience
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Web Developer
                  </h3>
                  <p className="text-gray-600 font-medium">
                    Freelance · May 2022–Present
                  </p>
                </div>
                <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full flex items-center justify-center h-10 w-20">
                  3+ Years
                </span>
              </div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>
                  → Developed Vue.js application for text analysis (
                  <a
                    href="https://somany.ch"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-800 underline"
                  >
                    somany.ch
                  </a>
                  )
                </li>
                <li>
                  → Built React applications and browser extensions (
                  <a
                    href="https://should.today"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-800 underline"
                  >
                    should.today
                  </a>
                  ,{' '}
                  <a
                    href="https://rewords.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-800 underline"
                  >
                    rewords.app
                  </a>{' '}
                  (1000+ users))
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

        {/* Testimonials */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            What Colleagues Say
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

        {/* Personal Facts */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Beyond the Code
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                Psychology → Communications → Product
              </h3>
              <p className="text-sm text-gray-600">
                Master's in Psychology applied to creating empathetic
                user-centered digital experiences. Career pivot during global
                upheaval brought fresh perspective on where human behavior meets
                tech—now fueling product decisions with cognitive, emotional,
                and behavioral insights to drive retention and engagement.
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                Global Remote Expertise
              </h3>
              <p className="text-sm text-gray-600">
                Lives in Thailand, speaks English and Russian fluently, learning
                Thai. Proven track record of building products for international
                markets across different time zones, with focus on scalable,
                culturally attuned features and multilingual support (Esse
                supports 60+ languages).
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                End-to-End Product Ownership
              </h3>
              <p className="text-sm text-gray-600">
                Focuses on shipping complete products, not just features. From
                initial market research and user interviews through development,
                App Store optimization, pricing strategy, to user acquisition
                and retention metrics—transitioning to full Product Management
                to lead cross-functional teams through these loops at scale.
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                Results-Driven, Metrics-Focused
              </h3>
              <p className="text-sm text-gray-600">
                Thrives in outcome-focused environments with clear communication
                and autonomy. Balances ruthless prioritization (activation,
                retention, revenue, PMF validation) with technical realism and
                user empathy to ship faster and smarter. Tracks what matters:
                conversion rates, LTV, retention curves, viral coefficients.
              </p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="text-center bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">
            📍 Based in Thailand → Remote-Friendly → Open to PM/PO Opportunities
            in Mobile/EdTech
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="mailto:thesanderbell@gmail.com"
              className="contact-link text-sm flex items-center gap-1 text-blue-600 hover:text-blue-800"
            >
              <Mail size={20} />
              <span>thesanderbell@gmail.com</span>
            </a>
            <a
              href="https://linkedin.com/in/sanderbell"
              className="contact-link text-sm flex items-center gap-1 text-blue-600 hover:text-blue-800"
            >
              <Linkedin size={20} />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/sanderbell"
              className="contact-link text-sm flex items-center gap-1 text-blue-600 hover:text-blue-800"
            >
              <Github size={20} />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
