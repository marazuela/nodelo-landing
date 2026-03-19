import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../../lib/animations";

const steps = [
  {
    number: "01",
    title: "Sign Up",
    text: "Create your account in seconds. No credit card, no install, no terminal. Just your email.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="6" y="8" width="28" height="24" rx="4" stroke="#58a6ff" strokeWidth="1.5" />
        <path d="M6 14l14 8 14-8" stroke="#58a6ff" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="20" cy="22" r="3" fill="#58a6ff" fillOpacity="0.3" stroke="#58a6ff" strokeWidth="1" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Connect",
    text: "Pick your tools — CRM, email, docs, chat. The wizard walks you through connecting each one and builds your knowledge graph automatically.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="10" cy="12" r="4" stroke="#58a6ff" strokeWidth="1.5" />
        <circle cx="30" cy="12" r="4" stroke="#bc8cff" strokeWidth="1.5" />
        <circle cx="10" cy="28" r="4" stroke="#3fb950" strokeWidth="1.5" />
        <circle cx="30" cy="28" r="4" stroke="#d29922" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="5" fill="#58a6ff" fillOpacity="0.2" stroke="#58a6ff" strokeWidth="1.5" />
        <line x1="14" y1="14" x2="16" y2="17" stroke="#30363d" strokeWidth="1" />
        <line x1="26" y1="14" x2="24" y2="17" stroke="#30363d" strokeWidth="1" />
        <line x1="14" y1="26" x2="16" y2="23" stroke="#30363d" strokeWidth="1" />
        <line x1="26" y1="26" x2="24" y2="23" stroke="#30363d" strokeWidth="1" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Open Claude",
    text: "One click installs Nodelo in Claude Desktop. Your business context is ready — ask Claude anything about your customers, deals, or operations.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="14" stroke="#3fb950" strokeWidth="1.5" />
        <path d="M12 20l5 5 11-11" stroke="#3fb950" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-24 sm:py-32">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(22,27,34,0.5) 20%, rgba(22,27,34,0.5) 80%, transparent 100%)",
        }}
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Three steps. Fifteen minutes.
          </h2>
        </motion.div>

        <motion.div
          className="relative mt-20 grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="absolute top-12 right-[33%] left-[33%] hidden h-px bg-gradient-to-r from-border via-accent/30 to-border lg:block" />

          {steps.map((step) => (
            <motion.div
              key={step.number}
              className="relative flex flex-col items-center text-center"
              variants={fadeInUp}
            >
              <div className="relative mb-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-surface">
                  {step.icon}
                </div>
                <span className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-bold text-bg">
                  {step.number}
                </span>
              </div>
              <h3 className="mb-3 text-xl font-bold">{step.title}</h3>
              <p className="max-w-xs text-sm leading-relaxed text-muted">
                {step.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
