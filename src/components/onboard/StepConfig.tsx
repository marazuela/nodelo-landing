import type { WizardData } from "./OnboardWizard";

interface Props {
  data: WizardData;
  update: (patch: Partial<WizardData>) => void;
  next: () => void;
  back: () => void;
}

const STORAGE_OPTIONS = [
  {
    id: "cloud" as const,
    name: "Nodelo Cloud",
    description: "Managed hosting. We handle storage, backups, and scaling.",
    badge: "Recommended",
  },
  {
    id: "sqlite" as const,
    name: "Self-hosted (SQLite)",
    description: "Run locally on your machine. Full control, no cloud dependency.",
    badge: null,
  },
];

export default function StepConfig({ data, update, next, back }: Props) {
  const { config } = data;

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
        Configuration
      </h2>
      <p className="mt-2 text-muted">
        Choose where your knowledge graph lives.
      </p>

      <div className="mt-8 space-y-3">
        {STORAGE_OPTIONS.map((opt) => {
          const selected = config.storage === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => update({ config: { ...config, storage: opt.id } })}
              className={`flex w-full items-start gap-4 rounded-xl border p-5 text-left transition-all ${
                selected
                  ? "border-accent/50 bg-accent/10 ring-1 ring-accent/20"
                  : "border-border bg-surface hover:border-accent/20"
              }`}
            >
              <div
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  selected ? "border-accent bg-accent" : "border-border"
                }`}
              >
                {selected && (
                  <div className="h-2 w-2 rounded-full bg-bg" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold">{opt.name}</p>
                  {opt.badge && (
                    <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-semibold text-accent">
                      {opt.badge}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-muted">{opt.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-8 rounded-xl border border-border bg-surface/50 p-4">
        <p className="text-xs text-muted">
          <span className="font-medium text-text">What about API keys?</span>{" "}
          Credentials for your data sources are stored securely and never leave
          the Nodelo infrastructure. You can revoke access at any time.
        </p>
      </div>

      <div className="mt-10 flex justify-between">
        <button
          onClick={back}
          className="rounded-xl border border-border px-6 py-3 text-sm font-medium text-muted transition-colors hover:border-accent/30 hover:text-text"
        >
          Back
        </button>
        <button
          onClick={next}
          className="rounded-xl bg-accent px-8 py-3 text-sm font-semibold text-bg transition-all hover:brightness-110"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
