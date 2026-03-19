import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../lib/supabase";
import StepDeployChoice from "./StepDeployChoice";
import StepApiKey from "./StepApiKey";
import StepAIWizard from "./StepAIWizard";
import StepSelfHosted from "./StepSelfHosted";

type Deployment = "hosted" | "self-hosted" | null;

export interface WizardData {
  deployment: Deployment;
  apiKey: string;
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
  aiWizardState: {
    messages: { role: "user" | "assistant"; content: string }[];
    progress: number;
    complete: boolean;
    finalConfig: Record<string, unknown> | null;
  };
}

const INITIAL_DATA: WizardData = {
  deployment: null,
  apiKey: "",
  selectedSources: [],
  profile: { industry: "", teamSize: "", revenueModel: "", context: "" },
  config: { storage: "cloud" },
  ontology: { entityTypes: [], confirmed: false },
  aiWizardState: {
    messages: [],
    progress: 0,
    complete: false,
    finalConfig: null,
  },
};

function getSteps(deployment: Deployment) {
  if (deployment === "hosted") {
    return [
      { id: "deploy", label: "Deployment" },
      { id: "api-key", label: "API Key" },
      { id: "ai-wizard", label: "Setup" },
    ];
  }
  if (deployment === "self-hosted") {
    return [
      { id: "deploy", label: "Deployment" },
      { id: "self-hosted", label: "Install" },
    ];
  }
  return [{ id: "deploy", label: "Deployment" }];
}

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

type AuthState = "loading" | "authenticated" | "unauthenticated";

export default function OnboardWizard() {
  const [authState, setAuthState] = useState<AuthState>("loading");
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [data, setData] = useState<WizardData>(INITIAL_DATA);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setAuthState("authenticated");
      } else {
        setAuthState("unauthenticated");
        window.location.href = "/get-started";
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setAuthState("unauthenticated");
        window.location.href = "/get-started";
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const steps = getSteps(data.deployment);

  function next() {
    if (step < steps.length - 1) {
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

  function handleDeployNext() {
    setDir(1);
    setStep(1);
  }

  const stepProps = { data, update, next, back };
  const currentStepId = steps[step]?.id;

  if (authState === "loading") {
    return (
      <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center py-24">
        <div className="flex flex-col items-center gap-4">
          <svg className="h-8 w-8 animate-spin text-accent" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4 31.4" strokeLinecap="round" />
          </svg>
          <p className="text-sm text-muted">Checking your session…</p>
        </div>
      </section>
    );
  }

  if (authState === "unauthenticated") {
    return null;
  }

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
        {/* Progress nav */}
        <nav className="mb-12 flex items-center justify-between">
          {steps.map((s, i) => (
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
                      <path
                        d="M3 7l2.5 2.5L11 4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
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
              {i < steps.length - 1 && (
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
            key={currentStepId}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {currentStepId === "deploy" && (
              <StepDeployChoice
                data={data}
                update={update}
                next={handleDeployNext}
              />
            )}
            {currentStepId === "api-key" && (
              <StepApiKey {...stepProps} />
            )}
            {currentStepId === "ai-wizard" && (
              <StepAIWizard data={data} update={update} back={back} />
            )}
            {currentStepId === "self-hosted" && (
              <StepSelfHosted back={back} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
