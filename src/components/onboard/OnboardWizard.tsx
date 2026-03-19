import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StepSources from "./StepSources";
import StepProfile from "./StepProfile";
import StepConfig from "./StepConfig";
import StepOntology from "./StepOntology";
import StepInstall from "./StepInstall";

const STEPS = [
  { id: "sources", label: "Data Sources" },
  { id: "profile", label: "Business Profile" },
  { id: "config", label: "Configuration" },
  { id: "ontology", label: "Ontology" },
  { id: "install", label: "Install" },
] as const;

export interface WizardData {
  selectedSources: string[];
  profile: {
    industry: string;
    teamSize: string;
    revenueModel: string;
    context: string;
  };
  config: {
    storage: "cloud" | "sqlite";
  };
  ontology: {
    entityTypes: string[];
    confirmed: boolean;
  };
}

const INITIAL_DATA: WizardData = {
  selectedSources: [],
  profile: { industry: "", teamSize: "", revenueModel: "", context: "" },
  config: { storage: "cloud" },
  ontology: { entityTypes: [], confirmed: false },
};

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

export default function OnboardWizard() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [data, setData] = useState<WizardData>(INITIAL_DATA);

  function next() {
    if (step < STEPS.length - 1) {
      setDir(1);
      setStep((s) => s + 1);
    }
  }

  function back() {
    if (step > 0) {
      setDir(-1);
      setStep((s) => s - 1);
    }
  }

  function update(patch: Partial<WizardData>) {
    setData((d) => ({ ...d, ...patch }));
  }

  const stepProps = { data, update, next, back };

  return (
    <section className="relative min-h-[calc(100vh-4rem)] py-24">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 20%, rgba(88,166,255,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="mx-auto max-w-3xl px-6">
        {/* Progress bar */}
        <nav className="mb-12 flex items-center justify-between">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                    i < step
                      ? "bg-green text-bg"
                      : i === step
                        ? "bg-accent text-bg"
                        : "border border-border bg-surface text-muted"
                  }`}
                >
                  {i < step ? (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 7l2.5 2.5L11 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                <span
                  className={`mt-1.5 hidden text-[10px] sm:block ${
                    i === step ? "text-accent font-medium" : "text-muted"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`mx-2 h-px w-8 sm:w-16 transition-colors ${
                    i < step ? "bg-green" : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </nav>

        {/* Step content */}
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {step === 0 && <StepSources {...stepProps} />}
            {step === 1 && <StepProfile {...stepProps} />}
            {step === 2 && <StepConfig {...stepProps} />}
            {step === 3 && <StepOntology {...stepProps} />}
            {step === 4 && <StepInstall {...stepProps} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
