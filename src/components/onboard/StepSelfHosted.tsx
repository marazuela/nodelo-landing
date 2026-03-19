import { useState } from "react";
import { supabase } from "../../lib/supabase";

interface Props {
  back: () => void;
}

const CLAUDE_CODE_PROMPT = [
  "Clone the Nodelo repository and guide me through the full self-hosted installation.",
  "Steps: 1) clone https://github.com/solutz/nodelo, 2) create a virtualenv,",
  "3) pip install the package, 4) run `nodelo onboard` to launch the setup wizard,",
  "5) help me configure data sources and generate my knowledge graph.",
  "Be concise and walk me through each step one at a time.",
].join(" ");

export default function StepSelfHosted({ back }: Props) {
  const [launching, setLaunching] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleLaunch() {
    setLaunching(true);

    const { data: session } = await supabase.auth.getSession();
    const token = session?.session?.access_token ?? "";

    const deepLinkUrl = `claude://new?prompt=${encodeURIComponent(CLAUDE_CODE_PROMPT)}&metadata=${encodeURIComponent(JSON.stringify({ nodelo_token: token }))}`;

    window.location.href = deepLinkUrl;

    // If the deep link didn't navigate away, show the fallback after a delay
    setTimeout(() => {
      setLaunching(false);
      setShowFallback(true);
    }, 2500);
  }

  const fallbackCommand =
    "git clone https://github.com/solutz/nodelo.git && cd nodelo && python -m venv .venv && source .venv/bin/activate && pip install -e '.[onboarding]' && nodelo onboard";

  async function handleCopy() {
    await navigator.clipboard.writeText(fallbackCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
        Self-hosted setup
      </h2>
      <p className="mt-2 text-muted">
        Claude Code will guide you through cloning, installing, and configuring
        Nodelo on your machine.
      </p>

      {/* What will happen */}
      <div className="mt-8 rounded-xl border border-border bg-surface p-5">
        <h3 className="text-sm font-semibold">What Claude Code will do</h3>
        <ol className="mt-3 space-y-2 text-sm text-muted">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 shrink-0 text-accent">1.</span>
            Clone the Nodelo repository
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 shrink-0 text-accent">2.</span>
            Set up a Python environment and install dependencies
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 shrink-0 text-accent">3.</span>
            Launch the onboarding wizard to configure your data sources
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 shrink-0 text-accent">4.</span>
            Generate your knowledge graph and start scanning
          </li>
        </ol>
      </div>

      {/* Prerequisites */}
      <div className="mt-4 rounded-xl border border-border bg-surface/50 p-4">
        <p className="text-xs text-muted">
          <span className="font-medium text-text">Prerequisites:</span>{" "}
          Python 3.11+, Git, and{" "}
          <a
            href="https://docs.anthropic.com/en/docs/claude-code"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            Claude Code
          </a>{" "}
          installed on your machine.
        </p>
      </div>

      {/* Launch button */}
      <div className="mt-8 text-center">
        <button
          onClick={handleLaunch}
          disabled={launching}
          className="glow-blue rounded-xl bg-accent px-10 py-4 text-base font-semibold text-bg transition-all hover:brightness-110 disabled:opacity-60"
        >
          {launching ? (
            <span className="flex items-center gap-2">
              <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4 31.4" strokeLinecap="round" />
              </svg>
              Opening Claude Code…
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 17 10 11 4 5" />
                <line x1="12" y1="19" x2="20" y2="19" />
              </svg>
              Open in Claude Code
            </span>
          )}
        </button>
      </div>

      {/* Fallback */}
      {showFallback && (
        <div className="mt-6 rounded-xl border border-orange/30 bg-orange/5 p-5">
          <p className="text-sm text-muted">
            <span className="font-medium text-text">
              Claude Code didn't open?
            </span>{" "}
            Copy and run this command in your terminal instead:
          </p>
          <div className="mt-3 flex items-start gap-2">
            <pre className="flex-1 overflow-x-auto rounded-lg border border-border bg-surface p-3 font-mono text-xs text-text">
              {fallbackCommand}
            </pre>
            <button
              onClick={handleCopy}
              className="shrink-0 rounded-lg border border-border bg-surface px-3 py-2.5 text-xs font-medium text-muted transition-colors hover:border-accent/30 hover:text-text"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}

      <div className="mt-10 flex justify-start">
        <button
          onClick={back}
          className="rounded-xl border border-border px-6 py-3 text-sm font-medium text-muted transition-colors hover:border-accent/30 hover:text-text"
        >
          Back
        </button>
      </div>
    </div>
  );
}
