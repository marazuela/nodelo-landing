import { useState } from "react";
import { supabase } from "../../lib/supabase";
import type { WizardData } from "./OnboardWizard";

interface Props {
  data: WizardData;
  update: (patch: Partial<WizardData>) => void;
  next: () => void;
  back: () => void;
}

type ValidationState = "idle" | "validating" | "valid" | "invalid";

export default function StepApiKey({ data, update, next, back }: Props) {
  const [key, setKey] = useState(data.apiKey);
  const [showKey, setShowKey] = useState(false);
  const [validation, setValidation] = useState<ValidationState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleValidate() {
    const trimmed = key.trim();
    if (!trimmed) return;

    setValidation("validating");
    setErrorMsg("");

    try {
      const { data: session } = await supabase.auth.getSession();
      const jwt = session?.session?.access_token ?? "";

      const res = await fetch(
        `${import.meta.env.PUBLIC_SUPABASE_URL ?? "https://jjyjmoygxdiqialjuqnc.supabase.co"}/functions/v1/onboard-ai`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({
            api_key: trimmed,
            action: "validate_key",
          }),
        },
      );

      if (res.ok) {
        setValidation("valid");
        update({ apiKey: trimmed });
      } else {
        const body = await res.json().catch(() => ({}));
        setErrorMsg(body.error ?? "Invalid API key. Please check and try again.");
        setValidation("invalid");
      }
    } catch {
      setErrorMsg("Could not reach the server. Please try again.");
      setValidation("invalid");
    }
  }

  function handleContinue() {
    if (validation === "valid") {
      next();
    } else {
      handleValidate();
    }
  }

  const isKeyFormat = key.trim().startsWith("sk-ant-");

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
        Your Anthropic API key
      </h2>
      <p className="mt-2 text-muted">
        Nodelo uses Claude to guide you through setup. Enter your API key to get
        started.
      </p>

      <div className="mt-8">
        <label className="mb-1.5 block text-sm font-medium">API Key</label>
        <div className="relative">
          <input
            type={showKey ? "text" : "password"}
            value={key}
            onChange={(e) => {
              setKey(e.target.value);
              if (validation !== "idle") setValidation("idle");
            }}
            placeholder="sk-ant-api03-..."
            className={`w-full rounded-xl border bg-surface px-4 py-3.5 pr-20 font-mono text-sm text-text placeholder:text-muted/60 outline-none transition-colors focus:ring-1 ${
              validation === "valid"
                ? "border-green/50 focus:border-green/50 focus:ring-green/30"
                : validation === "invalid"
                  ? "border-orange/50 focus:border-orange/50 focus:ring-orange/30"
                  : "border-border focus:border-accent/50 focus:ring-accent/30"
            }`}
            disabled={validation === "validating"}
          />
          <button
            type="button"
            onClick={() => setShowKey(!showKey)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs text-muted transition-colors hover:text-text"
          >
            {showKey ? "Hide" : "Show"}
          </button>
        </div>

        {validation === "valid" && (
          <p className="mt-2 flex items-center gap-1.5 text-sm text-green">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7l2.5 2.5L11 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            API key verified
          </p>
        )}

        {validation === "invalid" && (
          <p className="mt-2 text-sm text-orange">
            {errorMsg}
          </p>
        )}
      </div>

      <div className="mt-6 rounded-xl border border-border bg-surface/50 p-4">
        <p className="text-xs text-muted">
          <span className="font-medium text-text">Your key is never stored.</span>{" "}
          It's used only during this session to power the AI-guided onboarding.
          Get your key at{" "}
          <a
            href="https://console.anthropic.com/settings/keys"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            console.anthropic.com
          </a>
          .
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
          onClick={handleContinue}
          disabled={!isKeyFormat || validation === "validating"}
          className="rounded-xl bg-accent px-8 py-3 text-sm font-semibold text-bg transition-all hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {validation === "validating" ? (
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4 31.4" strokeLinecap="round" />
              </svg>
              Validating…
            </span>
          ) : validation === "valid" ? (
            "Continue"
          ) : (
            "Validate & Continue"
          )}
        </button>
      </div>
    </div>
  );
}
