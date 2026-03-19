import type { WizardData } from "./OnboardWizard";

interface Props {
  data: WizardData;
  update: (patch: Partial<WizardData>) => void;
  next: () => void;
  back: () => void;
}

const INDUSTRIES = [
  "SaaS / Software",
  "Agency / Consulting",
  "E-commerce",
  "Financial Services",
  "Healthcare",
  "Education",
  "Real Estate",
  "Manufacturing",
  "Other",
];

const TEAM_SIZES = ["1-10", "11-50", "51-200", "201-1000", "1000+"];

const REVENUE_MODELS = [
  "Subscription / Recurring",
  "One-time sales",
  "Marketplace / Platform",
  "Services / Consulting",
  "Advertising",
  "Other",
];

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text outline-none transition-colors focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
      >
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function StepProfile({ data, update, next, back }: Props) {
  const { profile } = data;

  function set(field: keyof typeof profile, value: string) {
    update({ profile: { ...profile, [field]: value } });
  }

  const canContinue = profile.industry && profile.teamSize;

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
        Tell us about your business
      </h2>
      <p className="mt-2 text-muted">
        This helps Nodelo build the right knowledge structure for your data.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <SelectField
          label="Industry"
          value={profile.industry}
          options={INDUSTRIES}
          onChange={(v) => set("industry", v)}
        />
        <SelectField
          label="Team size"
          value={profile.teamSize}
          options={TEAM_SIZES}
          onChange={(v) => set("teamSize", v)}
        />
        <div className="sm:col-span-2">
          <SelectField
            label="Revenue model"
            value={profile.revenueModel}
            options={REVENUE_MODELS}
            onChange={(v) => set("revenueModel", v)}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium">
            Anything else we should know?{" "}
            <span className="text-muted font-normal">(optional)</span>
          </label>
          <textarea
            value={profile.context}
            onChange={(e) => set("context", e.target.value)}
            rows={3}
            placeholder="E.g. key entities, important relationships, specific use cases…"
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text placeholder:text-muted/60 outline-none transition-colors focus:border-accent/50 focus:ring-1 focus:ring-accent/30 resize-none"
          />
        </div>
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
          disabled={!canContinue}
          className="rounded-xl bg-accent px-8 py-3 text-sm font-semibold text-bg transition-all hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
