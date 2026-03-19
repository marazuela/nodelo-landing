import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer } from "../../lib/animations";

const faqs = [
  {
    q: "Does it work with our systems?",
    a: "If there's an MCP server for it — yes. That's 19,400+ systems and counting: HubSpot, Salesforce, Gmail, Slack, Google Drive, Notion, Jira, Zendesk, Shopify, GitHub, and thousands more. If your system doesn't have an MCP server yet, we can build a custom one during Phase 2.",
  },
  {
    q: "Where does our data live?",
    a: "In YOUR database. Neo4j, PostgreSQL, or SQLite — you choose based on your existing infrastructure. Nodelo never stores your data. The knowledge graph runs entirely in your environment. Full data sovereignty.",
  },
  {
    q: "What about security?",
    a: "Nodelo runs locally on your machine or self-hosted in your infrastructure. Text chunks are sent to the Claude API for extraction — same trust boundary as using Claude for anything else. Anthropic's API is SOC2, HIPAA, and ISO27001 compliant. For maximum privacy, use a local LLM.",
  },
  {
    q: "How much does it cost to run after implementation?",
    a: "Claude API usage for extraction (typically $500-2,000/month) plus your database costs. No per-query fees. No licensing fees. No subscription. You own the graph.",
  },
  {
    q: "What if we add new systems later?",
    a: "Install the MCP server for that system. Nodelo auto-discovers it on the next scan. No re-implementation. No re-architecture. 15 minutes.",
  },
  {
    q: "Can we run it on-premise?",
    a: "Yes. Nodelo ships as a pip package, Docker image, or Claude Desktop Extension. Runs anywhere: your laptop, your VPC, Kubernetes, bare metal.",
  },
  {
    q: "Is the code really open source?",
    a: "The core is open source (~3,000 lines of Python). Deploy it. Self-host it. Modify it. The $70K engagement covers implementation, integration, custom connectors, training, and 4 weeks of on-site field engineering.",
  },
  {
    q: "How long until we see results?",
    a: "First knowledge graph within 48 hours of kickoff. Full implementation in 4 weeks (remote). On-site field engineering and training in weeks 5-8.",
  },
  {
    q: "What's the ROI?",
    a: "The comparable in-house build costs $240K+ before accounting for opportunity cost. Nodelo delivers in 8 weeks at $70K. Most clients report 3-5x return within the first quarter.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="pr-4 text-base font-medium">{q}</span>
        <motion.span
          className="shrink-0 text-muted"
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="10" y1="4" x2="10" y2="16" />
            <line x1="4" y1="10" x2="16" y2="10" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-muted">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <motion.div
          className="mt-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {faqs.map((faq) => (
            <motion.div key={faq.q} variants={fadeInUp}>
              <FAQItem q={faq.q} a={faq.a} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
