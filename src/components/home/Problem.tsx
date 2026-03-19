import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../../lib/animations";

const cards = [
  {
    title: "Scattered Context",
    text: "Customer history in HubSpot. Contracts in Drive. Conversations in Slack. Support tickets in Zendesk. None of it connected.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="6" cy="8" r="2.5" className="text-accent" />
        <circle cx="26" cy="6" r="2" className="text-purple" />
        <circle cx="16" cy="16" r="2.5" className="text-muted" />
        <circle cx="8" cy="24" r="2" className="text-orange" />
        <circle cx="24" cy="22" r="2.5" className="text-accent" />
        <circle cx="18" cy="28" r="1.5" className="text-muted" />
      </svg>
    ),
  },
  {
    title: "Engineering Bottleneck",
    text: "Building custom data pipelines takes months and breaks with every API change. Your ops team is waiting on engineering.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-orange">
        <circle cx="16" cy="16" r="12" />
        <path d="M16 8v8l5 5" />
      </svg>
    ),
  },
  {
    title: "Blind Agents",
    text: "Without structured context, your AI agents guess. They hallucinate. They give generic answers that don't reflect your business reality.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-purple">
        <circle cx="16" cy="16" r="12" />
        <circle cx="12" cy="14" r="2" />
        <circle cx="20" cy="14" r="2" />
        <path d="M8 14h16" strokeWidth="2.5" />
        <path d="M12 22c1.5-1.5 4.5-1.5 8 0" />
      </svg>
    ),
  },
];

export default function Problem() {
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
            Your business data is a mess.
            <br />
            <span className="text-muted">Your AI agents pay the price.</span>
          </h2>
        </motion.div>

        <motion.div
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {cards.map((card) => (
            <motion.div
              key={card.title}
              className="group rounded-2xl border border-border bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_0_30px_rgba(88,166,255,0.06)]"
              variants={fadeInUp}
            >
              <div className="mb-5">{card.icon}</div>
              <h3 className="mb-3 text-lg font-semibold">{card.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{card.text}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="mt-16 text-center text-xl font-medium text-accent"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          There's a better way.
        </motion.p>
      </div>
    </section>
  );
}
