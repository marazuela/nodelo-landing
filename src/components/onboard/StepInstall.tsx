import { useState } from "react";
import { MCP_CATALOG } from "../../lib/mcp-catalog";
import type { WizardData } from "./OnboardWizard";

interface Props {
  data: WizardData;
  back: () => void;
}

export default function StepInstall({ data, back }: Props) {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const sourceNames = data.selectedSources
    .map((id) => MCP_CATALOG.find((s) => s.id === id)?.name)
    .filter(Boolean);

  async function handleDownload() {
    setDownloading(true);
    // Phase 2: generate real .mcpb from Supabase edge function
    await new Promise((r) => setTimeout(r, 2000));
    setDownloading(false);
    setDownloaded(true);
  }

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
        Install Nodelo in Claude
      </h2>
      <p className="mt-2 text-muted">
        Download the extension and double-click to install. That's it.
      </p>

      {/* Summary */}
      <div className="mt-8 rounded-xl border border-border bg-surface p-5">
        <h3 className="text-sm font-semibold">Configuration summary</h3>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted">Data sources</dt>
            <dd className="font-medium">{sourceNames.join(", ")}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Industry</dt>
            <dd className="font-medium">{data.profile.industry}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Team size</dt>
            <dd className="font-medium">{data.profile.teamSize}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Storage</dt>
            <dd className="font-medium">
              {data.config.storage === "cloud"
                ? "Nodelo Cloud"
                : "Self-hosted (SQLite)"}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Entity types</dt>
            <dd className="font-medium">
              {data.ontology.entityTypes.length} types
            </dd>
          </div>
        </dl>
      </div>

      {/* Download */}
      <div className="mt-8 text-center">
        {!downloaded ? (
          <>
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="glow-blue rounded-xl bg-accent px-10 py-4 text-base font-semibold text-bg transition-all hover:brightness-110 disabled:opacity-60"
            >
              {downloading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5 animate-spin"
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
                  Generating extension…
                </span>
              ) : (
                <>
                  <span className="mr-2">↓</span>
                  Download Nodelo.mcpb
                </>
              )}
            </button>
            <p className="mt-3 text-xs text-muted">
              Claude Desktop Extension — one-click install
            </p>
          </>
        ) : (
          <div className="space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-green/30 bg-green/10">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path
                  d="M8 16l5 5 11-11"
                  stroke="#3fb950"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div>
              <h3 className="text-xl font-bold">You're all set!</h3>
              <p className="mt-2 text-muted">
                Double-click <code className="rounded bg-surface-2 px-1.5 py-0.5 text-xs text-accent">Nodelo.mcpb</code> to
                install it in Claude Desktop. Then open Claude and start asking
                about your business.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-surface p-4 text-left">
              <p className="mb-2 text-xs font-semibold text-muted">
                Try asking Claude:
              </p>
              <ul className="space-y-2 text-sm text-muted">
                <li>
                  <span className="text-accent">"</span>What are our top 10
                  deals by value this quarter?
                  <span className="text-accent">"</span>
                </li>
                <li>
                  <span className="text-accent">"</span>Summarize all
                  interactions with Acme Corp in the last 30 days
                  <span className="text-accent">"</span>
                </li>
                <li>
                  <span className="text-accent">"</span>Which customers haven't
                  been contacted in over 2 weeks?
                  <span className="text-accent">"</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="mt-10 flex justify-between">
        <button
          onClick={back}
          className="rounded-xl border border-border px-6 py-3 text-sm font-medium text-muted transition-colors hover:border-accent/30 hover:text-text"
        >
          Back
        </button>
        {downloaded && (
          <a
            href="/"
            className="rounded-xl border border-border px-6 py-3 text-sm font-medium text-muted transition-colors hover:border-accent/30 hover:text-text"
          >
            Back to Home
          </a>
        )}
      </div>
    </div>
  );
}
