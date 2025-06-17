import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Globe, Star, Code, Zap, Users, Brain, Rocket } from 'lucide-react';

const RotatingProfile = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 38);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-[15rem] h-[15rem] mx-auto mb-6">
      <img
        src="/src/assets/react.svg"
        alt="React Logo"
        className="w-full h-full absolute top-0 left-0"
        style={{ transform: `rotate(${rotation}deg)`, zIndex: 5 }}
      />
      <img
        src="/src/assets/photo.jpeg"
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

const TechTag: React.FC<TechTagProps> = ({ name, size = 'base', icon: Icon }) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    base: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2',
    xl: 'text-lg px-5 py-2.5',
    '2xl': 'text-xl px-6 py-3'
  };

  return (
    <span className={`tech-tag inline-flex items-center gap-1 bg-blue-100 text-blue-800 rounded-full font-medium ${sizeClasses[size]} hover:bg-blue-200 transition-all duration-200 hover:scale-105`}>
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

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, value, label, color = "blue" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const end = parseInt(value.replace(/[^0-9]/g, ''));
          const duration = 1000;
          const stepTime = Math.abs(Math.floor(duration / end));
          const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start === end) {
              clearInterval(timer);
            }
          }, stepTime);
          observer.unobserve(ref.current!);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className={`bg-${color}-50 border border-${color}-200 rounded-lg p-4 text-center card-enter`}>
      <Icon className={`w-6 h-6 text-${color}-600 mx-auto mb-2`} />
      <div className={`text-2xl font-bold text-${color}-700`}>{count}{value.replace(/[0-9]/g, '')}</div>
      <div className={`text-sm text-${color}-600`}>{label}</div>
    </div>
  );
};

interface TestimonialCardProps {
  quote: string;
  context: string;
  rating?: number;
  delay?: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, context, rating = 5, delay = 0 }) => (
  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 card-enter" style={{ animationDelay: `${delay}s` }}>
    <div className="flex mb-2">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
      ))}
    </div>
    <p className="text-gray-700 text-sm mb-2 italic">"{quote}"</p>
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
      transform: scale(1.05);
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
      animation: fadeIn 1s ease-in;
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
      transform: scale(1.05);
    }
  `;

  const stats = [
    { icon: Zap, value: "70%", label: "Faster Delivery", color: "green" },
    { icon: Code, value: "532", label: "Code Pushes", color: "blue" },
    { icon: Rocket, value: "5", label: "Projects Launched", color: "purple" },
    { icon: Users, value: "15+", label: "Years Leadership", color: "orange" },
  ];

  const testimonials = [
    {
      quote: "Only bug from his cards last sprint (16) was from main (pre-existing). User-centered approach - doesn't just follow specs but understands their purpose.",
      context: "Ling App Team Lead",
    },
    {
      quote: "Once you set clear requirements, he just gets stuff done. Much needed orange in a sea of apples.",
      context: "Ling App Colleague",
    },
    {
      quote: "Quick at getting features done and fixing bugs. Always catches small cases others might miss.",
      context: "Ling App Team Member",
    },
    {
      quote: "Helped show the team how AI can save time with creating/updating specs. Data-driven approach to documentation.",
      context: "Ling App Developer",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-100 p-6">
      <style>{globalStyles}</style>
      <div className="max-w-5xl mx-auto fade-in">
        {/* Header */}
        <div className="text-center my-12">
          <RotatingProfile />
          <div className="p-6 mb-6">
            <h1 className="text-8xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 text-transparent bg-clip-text">
              AI-fluent. <br/>Old-school trained.
            </h1>
          </div>
         <p className="text-xl text-gray-600 max-w-2xl mx-auto">
  Sander Bell, React Developer who mastered fundamentals when Stack Overflow was our only assistant. Now wielding modern tools to ship lightning fast with both worlds.
</p>
        </div>

        {/* Tech Stack Cloud */}
        <div className="mb-12">
          {/* <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">My Focus</h2> */}
          <div className="flex flex-wrap justify-center gap-2">
            <TechTag name="React" size="xl"  />
            <TechTag name="React Native" size="xl" />
            <TechTag name="AI Tools" size="xl" />
            <TechTag name="TypeScript" size="lg" />
            <TechTag name="Next.js 14+" size="lg" />
            <TechTag name="Gitlab" size="lg" />
            <TechTag name="Redux" size="base" />
            <TechTag name="Node.js" size="base" />
             <TechTag name="iOS Development" size="base" />
            <TechTag name="Android" size="base" />
            <TechTag name="Performance Optimization" size="base" />
            <TechTag name="Jotai" size="sm" />
            <TechTag name="Zustand" size="sm" />
            <TechTag name="Jest" size="sm" />
            <TechTag name="Figma" size="sm" />
            <TechTag name="Tailwind CSS" size="sm" />
            <TechTag name="Xcode" size="sm" />
            <TechTag name="Python" size="sm" />
            <TechTag name="Git" size="sm" />
            <TechTag name="CI/CD" size="sm" />
           </div>
        </div>
        <div className="mb-12">
          {/* <h2 className="text-2xl font-bold text-gray-900 mb-4">Proven Track Record</h2> */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Founder</h3>
                  <p className="text-purple-600 font-medium">100K31D (Wellness Tech) • 2025–Present</p>
                </div>
                <span className="text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded-full">2 Apps</span>
              </div>
              <ul className="text-sm text-gray-700 space-y-1">
                    <li>•  <strong><a href="https://oneatati.me" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-800 underline">One at a Time β :</a></strong> Typing meditation app with advanced animations</li>

                <li>• <strong>Nocturna:</strong> Social mindfulness app with complex algorithms & privacy-first design</li>
                <li>• Applied psychology insights to create behavior-changing digital experiences</li>
                <li>• Full ownership: concept → development → App Store → revenue</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Mobile & Web Developer</h3>
                  <p className="text-blue-600 font-medium">Ling App • 2023–Present</p>
                </div>
                <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">8M+ Users</span>
              </div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Delivered 120+ bug fixes or features with 10% bug rate</li>
                <li>• Implemented the entire lesson review system</li>
                <li>• Achieved 70% faster delivery using AI-enhanced workflows</li>
                <li>• Built cross-platform features for iOS/Android/Web</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What Colleagues Say</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} delay={index * 0.2} />
            ))}
          </div>
        </div>

        {/* Personal Facts */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Beyond the Code</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">🧠 Psychology → Communications → Tech Pivot</h3>
              <p className="text-sm text-gray-700">Master's in Psychology applied to creating user-centered digital experiences. Career pivot during global upheaval led to unique intersection of human behavior and technology.</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">🌍 Global Perspective</h3>
              <p className="text-sm text-gray-700">Based in Thailand, speaks 4 languages (English, Russian, Thai, Hebrew). Building location-based London app remotely after visa denial.</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">🎯 $100K Vision</h3>
              <p className="text-sm text-gray-700">Company name "100K31D" encodes ambitious revenue goal by Dec 31, blending numeric precision with symbolic drive for meaningful products.</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">🧘 Wellness Tech Focus</h3>
              <p className="text-sm text-gray-700">Building apps that genuinely improve mental health and mindfulness, combining technical excellence with psychological insights.</p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="text-center bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Let's Build Something Great</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="mailto:thesanderbell@gmail.com" className="contact-link flex items-center gap-2 text-blue-600 hover:text-blue-800">
              <Mail size={20} />
              <span>thesanderbell@gmail.com</span>
            </a>
            <a href="https://linkedin.com/in/sanderbell" className="contact-link flex items-center gap-2 text-blue-600 hover:text-blue-800">
              <Linkedin size={20} />
              <span>LinkedIn</span>
            </a>
            <a href="https://github.com/sanderbell" className="contact-link flex items-center gap-2 text-blue-600 hover:text-blue-800">
              <Github size={20} />
              <span>GitHub</span>
            </a>
            <a href="https://sanderbell.dev" className="contact-link flex items-center gap-2 text-blue-600 hover:text-blue-800">
              <Globe size={20} />
              <span>Portfolio</span>
            </a>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            📍 Based in Thailand • Remote-friendly • Available for full-time or contract work
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;