import { useState } from "react";
import { MCP_CATALOG } from "../../lib/mcp-catalog";
import type { WizardData } from "./OnboardWizard";

interface Props {
  data: WizardData;
  update: (patch: Partial<WizardData>) => void;
  next: () => void;
  back: () => void;
}

function inferEntityTypes(sourceIds: string[], industry: string): string[] {
  const types = new Set<string>();

  for (const id of sourceIds) {
    const source = MCP_CATALOG.find((s) => s.id === id);
    if (!source) continue;
    for (const dt of source.dataTypes) {
      const singular = dt.replace(/s$/, "");
      types.add(singular.charAt(0).toUpperCase() + singular.slice(1));
    }
  }

  types.add("Person");
  types.add("Organization");

  if (industry.toLowerCase().includes("saas")) {
    types.add("Feature");
    types.add("Subscription");
  } else if (industry.toLowerCase().includes("agency")) {
    types.add("Project");
    types.add("Deliverable");
  } else if (industry.toLowerCase().includes("commerce")) {
    types.add("Product");
    types.add("Order");
  }

  return Array.from(types).sort();
}

export default function StepOntology({ data, update, next, back }: Props) {
  const [generating, setGenerating] = useState(false);
  const { ontology } = data;

  const entityTypes =
    ontology.entityTypes.length > 0
      ? ontology.entityTypes
      : inferEntityTypes(data.selectedSources, data.profile.industry);

  async function handleGenerate() {
    setGenerating(true);
    // Phase 2: call Supabase edge function for AI-generated ontology
    await new Promise((r) => setTimeout(r, 1500));
    const types = inferEntityTypes(data.selectedSources, data.profile.industry);
    update({ ontology: { entityTypes: types, confirmed: false } });
    setGenerating(false);
  }

  function confirm() {
    update({ ontology: { entityTypes, confirmed: true } });
    next();
  }

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
        Your knowledge graph structure
      </h2>
      <p className="mt-2 text-muted">
        Based on your tools and business profile, here's the proposed ontology.
        You can refine it later.
      </p>

      {!ontology.entityTypes.length && !generating ? (
        <div className="mt-8 text-center">
          <button
            onClick={handleGenerate}
            className="glow-blue rounded-xl bg-accent px-8 py-3.5 text-sm font-semibold text-bg transition-all hover:brightness-110"
          >
            Generate Ontology
          </button>
          <p className="mt-3 text-xs text-muted">
            AI will propose entity types based on your sources and profile
          </p>
        </div>
      ) : generating ? (
        <div className="mt-12 flex flex-col items-center gap-4">
          <svg
            className="h-8 w-8 animate-spin text-accent"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray="31.4 31.4"
              strokeLinecap="round"
            />
          </svg>
          <p className="text-sm text-muted">
            Analyzing your sources and building ontology…
          </p>
        </div>
      ) : (
        <>
          <div className="mt-8">
            <h3 className="mb-3 text-sm font-semibold text-muted">
              Entity types ({entityTypes.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {entityTypes.map((type) => (
                <span
                  key={type}
                  className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-border bg-surface/50 p-4">
            <p className="text-xs text-muted">
              <span className="font-medium text-text">
                Relationships are inferred automatically.
              </span>{" "}
              Nodelo discovers how entities relate to each other during
              extraction. You don't need to define them upfront.
            </p>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={handleGenerate}
              className="text-sm text-accent transition-colors hover:text-text"
            >
              Regenerate
            </button>
          </div>
        </>
      )}

      <div className="mt-10 flex justify-between">
        <button
          onClick={back}
          className="rounded-xl border border-border px-6 py-3 text-sm font-medium text-muted transition-colors hover:border-accent/30 hover:text-text"
        >
          Back
        </button>
        <button
          onClick={confirm}
          disabled={entityTypes.length === 0}
          className="rounded-xl bg-accent px-8 py-3 text-sm font-semibold text-bg transition-all hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Confirm &amp; Continue
        </button>
      </div>
    </div>
  );
}
