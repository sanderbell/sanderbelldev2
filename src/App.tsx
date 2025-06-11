import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Globe, Star, Code, Zap, Users, Brain, Rocket } from 'lucide-react';

const RotatingProfile = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-32 h-32 mx-auto mb-6">
      <div 
        className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-2xl"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <div className="w-28 h-28 rounded-full bg-gray-800 flex items-center justify-center text-4xl font-bold text-white">
          SB
        </div>
      </div>
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
    <span className={`inline-flex items-center gap-1 bg-blue-100 text-blue-800 rounded-full font-medium ${sizeClasses[size]} hover:bg-blue-200 transition-colors`}>
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

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, value, label, color = "blue" }) => (
  <div className={`bg-${color}-50 border border-${color}-200 rounded-lg p-4 text-center`}>
    <Icon className={`w-6 h-6 text-${color}-600 mx-auto mb-2`} />
    <div className={`text-2xl font-bold text-${color}-700`}>{value}</div>
    <div className={`text-sm text-${color}-600`}>{label}</div>
  </div>
);

interface TestimonialCardProps {
  quote: string;
  context: string;
  rating?: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, context, rating = 5 }) => (
  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
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
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
<div className="text-center mb-8">
 <RotatingProfile />
 <div className="mb-4">
    <h1 className="text-8xl font-bold text-gray-900">
     I speak <span className="text-blue-600">fluent AI</span>. 
     Yet still know what's <span className="text-purple-600">under the hood</span>.
   </h1>
 </div>
 <p className="text-xl text-gray-400 max-w-2xl mx-auto">
    Sander Bell, a React Developer trained on fundamentals, fluent in modern tools—shipping lightning fast with both worlds

 </p>
</div>

        {/* Tech Stack Cloud */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Technology Stack</h2>
          <div className="flex flex-wrap justify-center gap-2">
            <TechTag name="React" size="xl" icon={Code} />
            <TechTag name="React Native" size="xl" />
            <TechTag name="AI Tools" size="xl" icon={Brain} />
            <TechTag name="TypeScript" size="lg" />
            <TechTag name="Next.js 14+" size="lg" />
            <TechTag name="GitHub Copilot" size="lg" />
            <TechTag name="Redux Toolkit" size="base" />
            <TechTag name="Node.js" size="base" />
            <TechTag name="AWS" size="base" />
            <TechTag name="iOS Development" size="base" />
            <TechTag name="Android" size="base" />
            <TechTag name="Performance Optimization" size="base" />
            <TechTag name="Jotai" size="sm" />
            <TechTag name="Zustand" size="sm" />
            <TechTag name="Jest" size="sm" />
            <TechTag name="Figma" size="sm" />
            <TechTag name="Git" size="sm" />
          </div>
        </div>

        {/* Work History */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Proven Track Record</h2>
          <div className="space-y-4">
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Mobile & Web Developer</h3>
                  <p className="text-blue-600 font-medium">Ling App • 2023–Present</p>
                </div>
                <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">8M+ Users</span>
              </div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Delivered 120+ features with &lt;1% bug rate across 17 months</li>
                <li>• Led Review Tab system serving 8M+ language learners globally</li>
                <li>• Achieved 40% faster delivery using AI-enhanced workflows</li>
                <li>• Built cross-platform features for iOS/Android + web platforms</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Founder & Developer</h3>
                  <p className="text-purple-600 font-medium">100K31D (Wellness Tech) • 2024–Present</p>
                </div>
                <span className="text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded-full">2 Apps Launched</span>
              </div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• <strong>Nocturna:</strong> Social mindfulness app with complex algorithms & privacy-first design</li>
                <li>• <strong>One at a Time:</strong> Typing meditation app with advanced animations</li>
                <li>• Applied psychology insights to create behavior-changing digital experiences</li>
                <li>• Full ownership: concept → development → App Store → revenue</li>
              </ul>
            </div>

          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Zap} value="40%" label="Faster Delivery" color="green" />
          <StatCard icon={Code} value="532" label="Code Pushes" color="blue" />
          <StatCard icon={Rocket} value="2" label="Apps Launched" color="purple" />
          <StatCard icon={Users} value="15+" label="Years Leadership" color="orange" />
        </div>

        {/* Personal Facts */}
        <div className="mb-8">
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

        {/* Testimonials */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What Colleagues Say</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <TestimonialCard 
              quote="Only bug from his cards last sprint (16) was from main (pre-existing). User-centered approach - doesn't just follow specs but understands their purpose."
              context="Ling App Team Lead"
            />
            <TestimonialCard 
              quote="Once you set clear requirements, he just gets stuff done. Much needed orange in a sea of apples."
              context="Ling App Colleague"
            />
            <TestimonialCard 
              quote="Quick at getting features done and fixing bugs. Always catches small cases others might miss."
              context="Ling App Team Member"
            />
            <TestimonialCard 
              quote="Helped show the team how AI can save time with creating/updating specs. Data-driven approach to documentation."
              context="Ling App Developer"
            />
          </div>
        </div>

        {/* Contact */}
        <div className="text-center bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Let's Build Something Great</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="mailto:thesanderbell@gmail.com" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors">
              <Mail size={20} />
              <span>thesanderbell@gmail.com</span>
            </a>
            <a href="https://linkedin.com/in/sanderbell" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors">
              <Linkedin size={20} />
              <span>LinkedIn</span>
            </a>
            <a href="https://github.com/sanderbell" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors">
              <Github size={20} />
              <span>GitHub</span>
            </a>
            <a href="https://sanderbell.dev" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors">
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
