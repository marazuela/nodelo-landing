import { MCP_CATALOG, getCategories } from "../../lib/mcp-catalog";
import type { WizardData } from "./OnboardWizard";

interface Props {
  data: WizardData;
  update: (patch: Partial<WizardData>) => void;
  next: () => void;
}

export default function StepSources({ data, update, next }: Props) {
  const categories = getCategories();

  function toggle(id: string) {
    const current = data.selectedSources;
    const updated = current.includes(id)
      ? current.filter((s) => s !== id)
      : [...current, id];
    update({ selectedSources: updated });
  }

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
        Connect your tools
      </h2>
      <p className="mt-2 text-muted">
        Select the systems Nodelo should pull data from. You can add more later.
      </p>

      <div className="mt-8 space-y-8">
        {categories.map((cat) => (
          <div key={cat}>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
              {cat}
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {MCP_CATALOG.filter((s) => s.category === cat).map((source) => {
                const selected = data.selectedSources.includes(source.id);
                return (
                  <button
                    key={source.id}
                    type="button"
                    onClick={() => toggle(source.id)}
                    className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-all ${
                      selected
                        ? "border-accent/50 bg-accent/10 ring-1 ring-accent/20"
                        : "border-border bg-surface hover:border-accent/20 hover:bg-surface-2"
                    }`}
                  >
                    <span className="text-xl">{source.icon}</span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{source.name}</p>
                      <p className="text-[11px] text-muted truncate">
                        {source.dataTypes.join(", ")}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-end">
        <button
          onClick={next}
          disabled={data.selectedSources.length === 0}
          className="rounded-xl bg-accent px-8 py-3 text-sm font-semibold text-bg transition-all hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
