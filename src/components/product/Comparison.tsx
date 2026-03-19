import { motion } from "framer-motion";
import { fadeInUp } from "../../lib/animations";

const headers = ["", "Nodelo", "Custom ETL", "RAG / Vector", "Manual KB", "Build In-House"];

const rows = [
  {
    label: "Setup time",
    values: ["15 minutes", "3-6 months", "1-2 weeks", "1-2 weeks", "6+ months"],
  },
  {
    label: "Maintenance",
    values: ["Automated", "Constant", "Moderate", "Very high", "Very high"],
  },
  {
    label: "Output structure",
    values: [
      "Entities + relationships + temporal",
      "Custom",
      "Text chunks",
      "Unstructured text",
      "Custom",
    ],
  },
  {
    label: "Freshness",
    values: [
      "Nightly + confidence decay",
      "Reactive",
      "Manual refresh",
      "Stale immediately",
      "Reactive",
    ],
  },
  {
    label: "Cost",
    values: ["$70K", "$240K+", "$20-50K", "$15-30K + FTE", "$500K+"],
  },
  {
    label: "Engineering required",
    values: ["Zero", "3-4 FTE", "1-2 FTE", "1 FTE", "3-4 FTE"],
  },
  {
    label: "Cross-source dedup",
    values: ["Built-in (3-tier)", "Custom build", "None", "None", "Custom build"],
  },
  {
    label: "Conflict detection",
    values: ["Built-in", "Custom build", "None", "None", "Custom build"],
  },
];

export default function Comparison() {
  return (
    <section className="relative py-24 sm:py-32">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, transparent, rgba(22,27,34,0.5) 20%, rgba(22,27,34,0.5) 80%, transparent)",
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
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How Nodelo Compares
          </h2>
        </motion.div>

        <motion.div
          className="mt-12 overflow-x-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                {headers.map((h, i) => (
                  <th
                    key={h || "label"}
                    className={`px-4 py-3 text-xs font-semibold uppercase tracking-wider ${
                      i === 1 ? "text-accent" : "text-muted"
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-border/50">
                  <td className="px-4 py-3 font-medium text-text">{row.label}</td>
                  {row.values.map((val, i) => (
                    <td
                      key={i}
                      className={`px-4 py-3 ${
                        i === 0 ? "font-medium text-accent" : "text-muted"
                      }`}
                    >
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
