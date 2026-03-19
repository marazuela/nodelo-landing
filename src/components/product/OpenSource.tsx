import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../../lib/animations";

const stack = [
  { name: "Instructor", desc: "Structured LLM output" },
  { name: "LiteLLM", desc: "Multi-provider LLM access" },
  { name: "pgvector", desc: "Postgres vector search" },
  { name: "sqlite-vec", desc: "SQLite vector search" },
  { name: "MCP Python SDK", desc: "Anthropic's official SDK" },
  { name: "Pydantic", desc: "Data validation" },
  { name: "APScheduler", desc: "Task scheduling" },
  { name: "Docling", desc: "Document parsing" },
];

const nodel = [
  "MCP discovery + orchestration",
  "Conversational ontology builder",
  "Cross-source entity resolution",
  "Postgres/SQLite graph adapter",
  "Nodelo MCP server (7 tools)",
  "Maintenance agent loop",
];

export default function OpenSource() {
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
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Built on giants. Not reinvented from scratch.
          </h2>
          <p className="mt-4 text-lg text-muted">
            80% battle-tested open-source. 20% Nodelo intelligence. Less code
            means fewer bugs, faster delivery, and full auditability.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            <motion.h3
              className="mb-6 text-sm font-semibold uppercase tracking-widest text-muted"
              variants={fadeInUp}
            >
              Open-Source Foundation (80%)
            </motion.h3>
            <div className="grid grid-cols-2 gap-3">
              {stack.map((item) => (
                <motion.div
                  key={item.name}
                  className="rounded-xl border border-border bg-surface p-4 transition-all duration-200 hover:border-accent/20"
                  variants={fadeInUp}
                >
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="mt-1 text-xs text-muted">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            <motion.h3
              className="mb-6 text-sm font-semibold uppercase tracking-widest text-accent"
              variants={fadeInUp}
            >
              Nodelo Intelligence (20%)
            </motion.h3>
            <div className="space-y-3">
              {nodel.map((item) => (
                <motion.div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-accent/20 bg-surface p-4"
                  variants={fadeInUp}
                >
                  <div className="h-2 w-2 shrink-0 rounded-full bg-accent" />
                  <p className="text-sm font-medium">{item}</p>
                </motion.div>
              ))}
            </div>
            <motion.p
              className="mt-6 text-sm text-muted"
              variants={fadeInUp}
            >
              ~3,000 lines of Python. Inspect the code. Fork it. Run it
              yourself.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
