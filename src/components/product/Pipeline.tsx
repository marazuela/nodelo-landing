import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../../lib/animations";

const steps = [
  {
    number: "01",
    title: "Connect",
    color: "#58a6ff",
    items: [
      "Connects to your business tools via MCP (Model Context Protocol)",
      "Supports 19,400+ MCP servers: HubSpot, Salesforce, Gmail, Slack, Google Drive, Notion, Jira, Zendesk, and thousands more",
      "One-click installation per source system",
      "No custom connectors needed — ever",
    ],
  },
  {
    number: "02",
    title: "Discover",
    color: "#bc8cff",
    items: [
      "15-minute conversational onboarding",
      "The agent interviews you about your business: entities, relationships, terminology",
      "Simultaneously inspects connected MCP sources — reads schemas, object types, field names",
      "Proposes a custom ontology based on conversation + source inspection + industry templates",
    ],
  },
  {
    number: "03",
    title: "Extract",
    color: "#3fb950",
    items: [
      "Reads documents, emails, CRM records, Slack messages, support tickets",
      "LLM-powered entity and relationship extraction using structured output",
      "Handles PDFs, DOCX, PPTX, HTML, plain text",
      "Assigns confidence scores to every extracted fact",
    ],
  },
  {
    number: "04",
    title: "Structure",
    color: "#d29922",
    items: [
      "Entities — typed, with properties, embeddings, and source tracking",
      "Relationships — typed, weighted, with bi-temporal validity tracking",
      "Cross-source deduplication — 3-tier matching: exact → fuzzy embedding → LLM judgment",
      "Conflict detection — flags contradictions across sources",
      "Confidence decay — facts lose confidence over time if not re-confirmed",
    ],
  },
  {
    number: "05",
    title: "Serve",
    color: "#58a6ff",
    items: [
      "Exposes the graph as an MCP server with 7 query tools",
      "get_context, search_entities, get_relationships, get_timeline, get_conflicts, trigger_scan, get_schema",
      "Any downstream AI agent can call these tools",
      "Nightly incremental scans keep the graph current automatically",
    ],
  },
];

export default function Pipeline() {
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
            The Full Pipeline
          </h2>
          <p className="mt-4 text-lg text-muted">
            Five steps from scattered data to structured knowledge.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 space-y-0"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="relative flex gap-8"
              variants={fadeInUp}
            >
              <div className="flex flex-col items-center">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold"
                  style={{ borderColor: step.color, color: step.color }}
                >
                  {step.number}
                </div>
                {i < steps.length - 1 && (
                  <div className="w-px grow bg-border" />
                )}
              </div>

              <div className="pb-16">
                <h3 className="text-xl font-bold" style={{ color: step.color }}>
                  {step.title}
                </h3>
                <ul className="mt-4 space-y-2">
                  {step.items.map((item, j) => (
                    <li key={j} className="flex gap-2 text-sm leading-relaxed text-muted">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: step.color, opacity: 0.5 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
