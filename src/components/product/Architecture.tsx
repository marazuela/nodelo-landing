import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "../../lib/animations";

const layers = [
  {
    id: "sources",
    label: "Source Systems",
    sublabel: "HubSpot · Gmail · Salesforce · Slack · Drive · ...",
    detail: "via MCP servers",
    color: "#58a6ff",
    bg: "rgba(88,166,255,0.08)",
  },
  {
    id: "agent",
    label: "Nodelo Agent",
    sublabel: "Discovery · Scanning · Extraction · Deduplication · Graph Writing",
    detail: "",
    color: "#bc8cff",
    bg: "rgba(188,140,255,0.08)",
  },
  {
    id: "graph",
    label: "Knowledge Graph",
    sublabel: "Entities · Relationships · Confidence · Temporal",
    detail: "Neo4j / Postgres / SQLite",
    color: "#3fb950",
    bg: "rgba(63,185,80,0.08)",
  },
  {
    id: "server",
    label: "Nodelo MCP Server",
    sublabel: "7 query tools",
    detail: "",
    color: "#d29922",
    bg: "rgba(210,153,34,0.08)",
  },
  {
    id: "downstream",
    label: "Downstream Agents",
    sublabel: "Sales · Support · Ops · Finance · Custom",
    detail: "",
    color: "#58a6ff",
    bg: "rgba(88,166,255,0.08)",
  },
];

export default function Architecture() {
  const [hovered, setHovered] = useState<string | null>(null);

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
            Architecture
          </h2>
          <p className="mt-4 text-lg text-muted">
            Data flows from your systems through Nodelo into a queryable graph.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 space-y-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          {layers.map((layer, i) => (
            <div key={layer.id}>
              <motion.div
                className="relative cursor-default rounded-xl border p-6 transition-all duration-300"
                style={{
                  borderColor:
                    hovered === null || hovered === layer.id
                      ? layer.color + "40"
                      : "#30363d20",
                  backgroundColor:
                    hovered === null || hovered === layer.id
                      ? layer.bg
                      : "transparent",
                  opacity: hovered === null || hovered === layer.id ? 1 : 0.3,
                }}
                onMouseEnter={() => setHovered(layer.id)}
                onMouseLeave={() => setHovered(null)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold" style={{ color: layer.color }}>
                      {layer.label}
                    </h3>
                    <p className="mt-1 text-sm text-muted">{layer.sublabel}</p>
                  </div>
                  {layer.detail && (
                    <span className="hidden text-xs text-muted sm:block">
                      {layer.detail}
                    </span>
                  )}
                </div>
              </motion.div>

              {i < layers.length - 1 && (
                <div className="flex justify-center py-1">
                  <motion.svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.4 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                  >
                    <path
                      d="M12 4v16m0 0l-4-4m4 4l4-4"
                      stroke="#8b949e"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
