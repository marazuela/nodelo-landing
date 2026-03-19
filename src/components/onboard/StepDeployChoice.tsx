import type { WizardData } from "./OnboardWizard";

interface Props {
  data: WizardData;
  update: (patch: Partial<WizardData>) => void;
  next: () => void;
}

const DEPLOY_OPTIONS: {
  id: WizardData["deployment"];
  name: string;
  description: string;
  details: string[];
  badge: string | null;
  icon: JSX.Element;
}[] = [
  {
    id: "hosted",
    name: "Nodelo Cloud",
    description:
      "Managed hosting with AI-guided setup. Everything runs in the browser — no terminal needed.",
    details: [
      "AI walks you through onboarding",
      "Managed storage, backups, and scaling",
      "Start querying in minutes",
    ],
    badge: "Recommended",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
      </svg>
    ),
  },
  {
    id: "self-hosted",
    name: "Self-hosted",
    description:
      "Open source. Runs on your machine. Claude Code guides you through the install in your terminal.",
    details: [
      "Full control over code and data",
      "One-click launch into Claude Code",
      "Guided install — no manual config",
    ],
    badge: null,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" />
        <circle cx="6" cy="6" r="1" fill="currentColor" />
        <circle cx="6" cy="18" r="1" fill="currentColor" />
      </svg>
    ),
  },
];

export default function StepDeployChoice({ data, update, next }: Props) {
  function select(id: WizardData["deployment"]) {
    update({ deployment: id });
    next();
  }

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
        How do you want to run Nodelo?
      </h2>
      <p className="mt-2 text-muted">
        Choose your deployment model. You can always switch later.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {DEPLOY_OPTIONS.map((opt) => {
          const selected = data.deployment === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => select(opt.id)}
              className={`group flex flex-col rounded-2xl border p-6 text-left transition-all ${
                selected
                  ? "border-accent/50 bg-accent/10 ring-1 ring-accent/20"
                  : "border-border bg-surface hover:border-accent/20 hover:-translate-y-1"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface-2 text-accent transition-colors group-hover:border-accent/30">
                  {opt.icon}
                </div>
                {opt.badge && (
                  <span className="rounded-full bg-accent/20 px-2.5 py-1 text-[10px] font-semibold text-accent">
                    {opt.badge}
                  </span>
                )}
              </div>

              <h3 className="mt-4 text-lg font-semibold">{opt.name}</h3>
              <p className="mt-1.5 text-sm text-muted">{opt.description}</p>

              <ul className="mt-4 space-y-2">
                {opt.details.map((d) => (
                  <li key={d} className="flex items-start gap-2 text-xs text-muted">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="mt-0.5 shrink-0 text-green"
                    >
                      <path
                        d="M3 7l2.5 2.5L11 4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {d}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center gap-1.5 text-sm font-medium text-accent">
                {opt.id === "hosted" ? "Get started" : "Open in Claude Code"}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M5 3l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
