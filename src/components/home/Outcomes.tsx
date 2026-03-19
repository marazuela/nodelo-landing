import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../../lib/animations";

const outcomes = [
  {
    title: "Sales that close themselves",
    text: "Your sales agent knows every customer, every deal, every past conversation. It identifies upsell opportunities you'd miss. It drafts outreach with real context.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#3fb950" strokeWidth="1.5">
        <path d="M4 22L10 14L16 18L24 6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 6H24V12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    accent: "group-hover:border-green/30 group-hover:shadow-[0_0_30px_rgba(63,185,80,0.06)]",
  },
  {
    title: "Support that resolves, not deflects",
    text: "Your support agent has full customer history — tickets, contracts, product usage, billing. It resolves issues on first contact because it understands the relationship.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#58a6ff" strokeWidth="1.5">
        <circle cx="14" cy="14" r="11" />
        <path d="M10 14l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    accent: "group-hover:border-accent/30 group-hover:shadow-[0_0_30px_rgba(88,166,255,0.06)]",
  },
  {
    title: "Operations that run overnight",
    text: "Your ops agent monitors your business in real time. It detects process bottlenecks, flags anomalies, and recommends actions based on actual business structure.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#bc8cff" strokeWidth="1.5">
        <circle cx="14" cy="14" r="11" />
        <path d="M14 8v6l4 4" strokeLinecap="round" />
      </svg>
    ),
    accent: "group-hover:border-purple/30 group-hover:shadow-[0_0_30px_rgba(188,140,255,0.06)]",
  },
  {
    title: "Any agent, any domain",
    text: "Recruiting, finance, legal, product — build domain-specific agents that reason over your actual business graph. Nodelo gives them the context they need.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#d29922" strokeWidth="1.5">
        <rect x="4" y="4" width="8" height="8" rx="2" />
        <rect x="16" y="4" width="8" height="8" rx="2" />
        <rect x="4" y="16" width="8" height="8" rx="2" />
        <rect x="16" y="16" width="8" height="8" rx="2" />
      </svg>
    ),
    accent: "group-hover:border-orange/30 group-hover:shadow-[0_0_30px_rgba(210,153,34,0.06)]",
  },
];

export default function Outcomes() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            When your AI agents actually
            <br />
            <span className="gradient-text">know your business</span>
          </h2>
        </motion.div>

        <motion.div
          className="mt-16 grid gap-6 sm:grid-cols-2"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {outcomes.map((item) => (
            <motion.div
              key={item.title}
              className={`group rounded-2xl border border-border bg-surface p-8 transition-all duration-300 hover:-translate-y-1 ${item.accent}`}
              variants={fadeInUp}
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="mb-3 text-lg font-semibold">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
