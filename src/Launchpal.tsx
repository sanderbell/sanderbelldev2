import { ArrowRight, CheckCircle, Zap, Clock, MessageCircle, FileText, Package, Compass } from 'lucide-react';

const Step = ({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="flex gap-5">
    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 text-amber-700 font-bold flex items-center justify-center text-sm">
      {number}
    </div>
    <div className="pb-8 border-b border-gray-100 flex-1">
      <h3 className="font-semibold text-gray-900 text-lg mb-1">{title}</h3>
      <div className="text-gray-600 text-base leading-relaxed">{children}</div>
    </div>
  </div>
);

const ForCard = ({ label }: { label: string }) => (
  <div className="bg-white border border-gray-200 rounded-xl px-5 py-4 text-gray-800 font-medium text-base shadow-sm">
    {label}
  </div>
);

const DeliverableItem = ({ text }: { text: string }) => (
  <div className="flex items-start gap-3">
    <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
    <span className="text-gray-700 text-base">{text}</span>
  </div>
);

const CredStat = ({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
}) => (
  <div className="text-center">
    <Icon className="w-6 h-6 text-amber-500 mx-auto mb-2" />
    <div className="text-2xl font-bold text-gray-900">{value}</div>
    <div className="text-sm text-gray-500 mt-0.5">{label}</div>
  </div>
);

export default function Launchpal() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Nav */}
      <nav className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <span className="text-sm font-semibold tracking-wide text-gray-900">
            launchpal
            <span className="text-gray-400 font-normal ml-1">by Sander Bell</span>
          </span>
          <a
            href="mailto:thesanderbell@gmail.com"
            className="text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors"
          >
            Send your idea →
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-slate-950 text-white px-6 py-24 sm:py-32">
        <div className="max-w-2xl mx-auto">
          <p className="text-amber-400 text-sm font-semibold tracking-widest uppercase mb-6">
            For non-technical founders
          </p>
          <h1
            className="text-5xl sm:text-6xl font-black leading-tight mb-6"
            style={{ fontFamily: 'Oxygen, sans-serif' }}
          >
            You have the idea.
            <br />
            <span className="text-amber-400">I'll make it real.</span>
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed mb-10 max-w-xl">
            One week. One price. A working product — not a mockup, not a proposal.
            Something you can open, use, and show people.
          </p>
          <a
            href="mailto:thesanderbell@gmail.com?subject=My Launchpal idea"
            className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-7 py-4 rounded-lg transition-colors text-base"
          >
            Send me your idea
            <ArrowRight size={18} />
          </a>
          <p className="text-slate-500 text-sm mt-4">Two sentences is enough.</p>
        </div>
      </section>

      {/* Who it's for */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-2xl font-bold text-gray-900 mb-3"
            style={{ fontFamily: 'Oxygen, sans-serif' }}
          >
            Who this is for
          </h2>
          <p className="text-gray-600 mb-8 text-base leading-relaxed">
            You understand your domain deeply — and you've had this thought more
            than once:
          </p>
          <blockquote className="border-l-4 border-amber-400 pl-5 mb-10 italic text-gray-800 text-lg leading-relaxed">
            "There should be an app for this."
          </blockquote>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
            {['Doctor', 'Coach', 'Designer', 'Teacher', 'Operator', 'Consultant'].map(
              (label) => (
                <ForCard key={label} label={label} />
              )
            )}
          </div>
          <p className="text-gray-600 text-base leading-relaxed">
            You tried looking into it. You hit a wall of tools, jargon, and
            conflicting advice. No-code. AI. MVP. Tech stack.
          </p>
          <p className="text-gray-900 font-semibold mt-3 text-base">
            You don't need to learn any of that.
          </p>
        </div>
      </section>

      {/* What you need */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-2xl mx-auto">
          <p className="text-gray-700 text-base leading-relaxed mb-4">
            You need someone who can:
          </p>
          <ul className="space-y-3">
            {[
              'Understand your idea quickly',
              'Make the right decisions',
              'Actually build the thing',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-gray-900 font-medium text-base">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-2xl mx-auto px-6">
        <hr className="border-gray-100" />
      </div>

      {/* The Launchpad */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-12">
            <div>
              <p className="text-amber-600 text-sm font-semibold tracking-widest uppercase mb-1">
                The offer
              </p>
              <h2
                className="text-3xl font-bold text-gray-900"
                style={{ fontFamily: 'Oxygen, sans-serif' }}
              >
                The Launchpad
              </h2>
            </div>
            <div className="text-right">
              <span className="text-4xl font-black text-gray-900">$999</span>
              <p className="text-sm text-gray-500">one week · flat rate</p>
            </div>
          </div>

          <div className="space-y-0">
            <Step number="1" title="We clarify your idea">
              We turn your rough idea into something concrete — who it's for,
              what it does, and what actually matters for version one.
            </Step>
            <Step number="2" title="I create your product blueprint">
              A clear plan in plain English: features, flows, priorities.
              Something you can understand — and hand to anyone later.
            </Step>
            <Step number="3" title="I build your first version">
              A real product. Something you can open, use, show people, and get
              feedback on. Not a mockup. Not a "concept."
            </Step>
            <Step number="4" title="You get a clear next step">
              You'll know exactly what to improve, how to get users, and how to
              keep building — with or without me.
            </Step>
            <Step number="5" title="I'm available the whole week">
              You won't get stuck. Questions answered. Decisions guided. No
              disappearing acts.
            </Step>
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="px-6 py-16 bg-amber-50">
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-xl font-bold text-gray-900 mb-6"
            style={{ fontFamily: 'Oxygen, sans-serif' }}
          >
            What you walk away with
          </h2>
          <div className="space-y-4">
            <DeliverableItem text="A working product" />
            <DeliverableItem text="A product blueprint in plain English" />
            <DeliverableItem text="A clear plan for what's next" />
            <DeliverableItem text="Momentum" />
          </div>
        </div>
      </section>

      {/* Ongoing */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-2xl mx-auto border border-gray-200 rounded-xl p-8">
          <p className="text-amber-600 text-sm font-semibold tracking-widest uppercase mb-2">
            Optional
          </p>
          <h2
            className="text-xl font-bold text-gray-900 mb-3"
            style={{ fontFamily: 'Oxygen, sans-serif' }}
          >
            If you want to keep going
          </h2>
          <p className="text-gray-600 text-base leading-relaxed">
            Some products need iteration. If you want a long-term technical
            partner, we can continue working together after the launchpad.
          </p>
          <p className="text-gray-500 text-sm mt-3">
            No pressure. We decide that after you see the result.
          </p>
        </div>
      </section>

      {/* About */}
      <section className="px-6 py-20 bg-slate-950 text-white">
        <div className="max-w-2xl mx-auto">
          <p className="text-amber-400 text-sm font-semibold tracking-widest uppercase mb-4">
            Why me
          </p>
          <h2
            className="text-3xl font-bold mb-6"
            style={{ fontFamily: 'Oxygen, sans-serif' }}
          >
            I'm Sander Bell.
          </h2>
          <p className="text-slate-300 text-base leading-relaxed mb-10">
            I've built products from scratch — alone, without funding, without
            safety nets. I know how to cut scope, move fast, and build things
            people actually use.
          </p>

          <div className="grid grid-cols-3 gap-6 mb-12 border-y border-slate-800 py-10">
            <CredStat icon={Zap} value="5,700" label="AI app users, 7% paid — no ads" />
            <CredStat icon={Package} value="Featured" label="Chrome extension by Google" />
            <CredStat icon={Clock} value="15 yrs" label="Leading digital product teams" />
          </div>

          <ul className="space-y-3">
            {[
              { icon: Compass, text: "I don't overcomplicate things" },
              { icon: FileText, text: 'I translate your idea into a clear, executable plan' },
              { icon: MessageCircle, text: 'I tell you if your idea is viable — or not' },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-slate-300 text-base">
                <Icon className="w-4 h-4 text-amber-400 flex-shrink-0" />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-24 bg-white text-center">
        <div className="max-w-xl mx-auto">
          <h2
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: 'Oxygen, sans-serif' }}
          >
            Start here.
          </h2>
          <p className="text-gray-600 text-base leading-relaxed mb-8">
            Send me your idea. Two sentences is enough.
            <br />
            If it's viable, I'll tell you.
            If it's not, I'll tell you that too.
          </p>
          <a
            href="mailto:thesanderbell@gmail.com?subject=My Launchpal idea"
            className="inline-flex items-center gap-2 bg-slate-950 hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-lg transition-colors text-base"
          >
            thesanderbell@gmail.com
            <ArrowRight size={18} />
          </a>
        </div>
      </section>

      <footer className="text-center text-gray-400 text-xs py-6 border-t border-gray-100">
        © 2026 Sander Bell · <a href="/" className="hover:text-gray-600 transition-colors">sanderbell.dev</a>
      </footer>
    </div>
  );
}
