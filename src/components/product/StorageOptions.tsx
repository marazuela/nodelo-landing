import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp } from "../../lib/animations";

const options = [
  {
    id: "neo4j",
    name: "Neo4j",
    best: "Large graphs, complex traversals",
    vector: "Native",
    setup: "Requires Neo4j instance",
    traversal: "Cypher (native, fast)",
    color: "#3fb950",
  },
  {
    id: "postgres",
    name: "PostgreSQL",
    best: "Most businesses, existing infra",
    vector: "pgvector",
    setup: "Use existing Postgres",
    traversal: "Recursive CTEs (good enough)",
    color: "#58a6ff",
  },
  {
    id: "sqlite",
    name: "SQLite",
    best: "Local dev, prototyping, small teams",
    vector: "sqlite-vec",
    setup: "Zero setup, single file",
    traversal: "Recursive CTEs",
    color: "#d29922",
  },
];

export default function StorageOptions() {
  const [active, setActive] = useState("postgres");
  const current = options.find((o) => o.id === active)!;

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Storage Flexibility
          </h2>
          <p className="mt-4 text-lg text-muted">
            Use what you already have. No new infrastructure required.
          </p>
        </motion.div>

        <div className="mt-12 flex justify-center gap-2">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setActive(opt.id)}
              className={`rounded-lg px-5 py-2.5 text-sm font-medium transition-all ${
                active === opt.id
                  ? "bg-surface-2 text-text border border-border"
                  : "text-muted hover:text-text"
              }`}
            >
              {opt.name}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="mt-8 rounded-2xl border border-border bg-surface p-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="grid gap-6 sm:grid-cols-2">
              {[
                { label: "Best for", value: current.best },
                { label: "Vector search", value: current.vector },
                { label: "Setup", value: current.setup },
                { label: "Graph traversal", value: current.traversal },
              ].map((row) => (
                <div key={row.label}>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted">
                    {row.label}
                  </p>
                  <p className="mt-1 text-sm font-medium">{row.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
