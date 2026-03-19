import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "../../lib/supabase";
import type { WizardData } from "./OnboardWizard";

interface Props {
  data: WizardData;
  update: (patch: Partial<WizardData>) => void;
  back: () => void;
}

export interface AIQuestion {
  id: string;
  type: "text" | "select" | "multiselect" | "confirm";
  label: string;
  options?: string[];
  placeholder?: string;
  required: boolean;
}

interface AIResponse {
  questions: AIQuestion[];
  progress: number;
  complete: boolean;
  summary?: string;
  config?: Record<string, unknown>;
  error?: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUPABASE_URL =
  import.meta.env.PUBLIC_SUPABASE_URL ??
  "https://jjyjmoygxdiqialjuqnc.supabase.co";

export default function StepAIWizard({ data, update, back }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [questions, setQuestions] = useState<AIQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [progress, setProgress] = useState(0);
  const [complete, setComplete] = useState(false);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const initialized = useRef(false);

  const callAI = useCallback(
    async (userMessage?: string) => {
      setLoading(true);
      setError("");

      const newMessages: Message[] = userMessage
        ? [...messages, { role: "user" as const, content: userMessage }]
        : [...messages];

      try {
        const { data: session } = await supabase.auth.getSession();
        const jwt = session?.session?.access_token ?? "";

        const res = await fetch(`${SUPABASE_URL}/functions/v1/onboard-ai`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({
            api_key: data.apiKey,
            action: "wizard_step",
            messages: newMessages,
          }),
        });

        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error ?? `Request failed (${res.status})`);
        }

        const result: AIResponse = await res.json();

        const assistantContent = JSON.stringify({
          questions: result.questions,
          progress: result.progress,
          complete: result.complete,
          summary: result.summary,
        });
        const updatedMessages: Message[] = [
          ...newMessages,
          { role: "assistant", content: assistantContent },
        ];

        setMessages(updatedMessages);
        setQuestions(result.questions ?? []);
        setProgress(result.progress ?? 0);
        setAnswers({});

        if (result.complete) {
          setComplete(true);
          setSummary(result.summary ?? "Your Nodelo instance is configured.");
          update({
            aiWizardState: {
              messages: updatedMessages,
              progress: 100,
              complete: true,
              finalConfig: result.config ?? null,
            },
          });
        } else {
          update({
            aiWizardState: {
              messages: updatedMessages,
              progress: result.progress,
              complete: false,
              finalConfig: null,
            },
          });
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Something went wrong";
        setError(msg);
      } finally {
        setLoading(false);
      }
    },
    [data.apiKey, messages, update],
  );

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      callAI();
    }
  }, [callAI]);

  function handleSubmitAnswers() {
    const parts: string[] = [];
    for (const q of questions) {
      const val = answers[q.id];
      if (!val || (Array.isArray(val) && val.length === 0)) continue;
      const display = Array.isArray(val) ? val.join(", ") : val;
      parts.push(`${q.label}: ${display}`);
    }
    if (parts.length === 0) return;
    callAI(parts.join("\n"));
  }

  function setAnswer(id: string, value: string | string[]) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  function toggleMultiselect(id: string, option: string) {
    setAnswers((prev) => {
      const current = (prev[id] as string[]) ?? [];
      const next = current.includes(option)
        ? current.filter((o) => o !== option)
        : [...current, option];
      return { ...prev, [id]: next };
    });
  }

  const allRequiredAnswered = questions
    .filter((q) => q.required)
    .every((q) => {
      const val = answers[q.id];
      if (!val) return false;
      if (Array.isArray(val)) return val.length > 0;
      return val.trim().length > 0;
    });

  if (complete) {
    return (
      <div>
        <div className="mb-8">
          <ProgressBar progress={100} />
        </div>

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-green/30 bg-green/10">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M8 16l5 5 11-11" stroke="#3fb950" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h2 className="mt-6 text-center text-2xl font-bold tracking-tight sm:text-3xl">
          You're all set!
        </h2>
        <p className="mt-3 text-center text-muted">{summary}</p>

        <div className="mt-8 rounded-xl border border-border bg-surface p-5">
          <h3 className="text-sm font-semibold">What happens next</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-green">1.</span>
              Your knowledge graph is being provisioned
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-green">2.</span>
              Data sources will begin their first scan
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-green">3.</span>
              You'll be able to query your graph within minutes
            </li>
          </ul>
        </div>

        <div className="mt-8 text-center">
          <a
            href="/"
            className="rounded-xl bg-accent px-10 py-4 text-base font-semibold text-bg transition-all hover:brightness-110 inline-block"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <ProgressBar progress={progress} />
      </div>

      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
        Setting up your knowledge graph
      </h2>
      <p className="mt-2 text-muted">
        Answer the questions below. The AI adapts based on your responses.
      </p>

      {error && (
        <div className="mt-4 rounded-xl border border-orange/30 bg-orange/10 p-4">
          <p className="text-sm text-orange">{error}</p>
          <button
            onClick={() => callAI()}
            className="mt-2 text-sm font-medium text-accent hover:underline"
          >
            Retry
          </button>
        </div>
      )}

      {loading && questions.length === 0 ? (
        <div className="mt-12 flex flex-col items-center gap-4">
          <svg className="h-8 w-8 animate-spin text-accent" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4 31.4" strokeLinecap="round" />
          </svg>
          <p className="text-sm text-muted">
            Preparing your onboarding questions…
          </p>
        </div>
      ) : (
        <>
          <div className="mt-8 space-y-6">
            {questions.map((q) => (
              <QuestionField
                key={q.id}
                question={q}
                value={answers[q.id]}
                onChange={(val) => setAnswer(q.id, val)}
                onToggle={(opt) => toggleMultiselect(q.id, opt)}
              />
            ))}
          </div>

          <div className="mt-10 flex justify-between">
            <button
              onClick={back}
              className="rounded-xl border border-border px-6 py-3 text-sm font-medium text-muted transition-colors hover:border-accent/30 hover:text-text"
            >
              Back
            </button>
            <button
              onClick={handleSubmitAnswers}
              disabled={!allRequiredAnswered || loading}
              className="rounded-xl bg-accent px-8 py-3 text-sm font-semibold text-bg transition-all hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4 31.4" strokeLinecap="round" />
                  </svg>
                  Thinking…
                </span>
              ) : (
                "Continue"
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className="text-muted">Onboarding progress</span>
        <span className="font-medium text-accent">{Math.round(progress)}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
        <div
          className="h-full rounded-full bg-accent transition-all duration-700 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  );
}

function QuestionField({
  question,
  value,
  onChange,
  onToggle,
}: {
  question: AIQuestion;
  value: string | string[] | undefined;
  onChange: (val: string | string[]) => void;
  onToggle: (opt: string) => void;
}) {
  const { type, label, options, placeholder, required } = question;

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">
        {label}
        {!required && (
          <span className="ml-1 font-normal text-muted">(optional)</span>
        )}
      </label>

      {type === "text" && (
        <input
          type="text"
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text placeholder:text-muted/60 outline-none transition-colors focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
        />
      )}

      {type === "select" && options && (
        <div className="space-y-2">
          {options.map((opt) => {
            const selected = value === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => onChange(opt)}
                className={`flex w-full items-center gap-3 rounded-xl border p-3.5 text-left text-sm transition-all ${
                  selected
                    ? "border-accent/50 bg-accent/10 ring-1 ring-accent/20"
                    : "border-border bg-surface hover:border-accent/20"
                }`}
              >
                <div
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                    selected ? "border-accent bg-accent" : "border-border"
                  }`}
                >
                  {selected && <div className="h-1.5 w-1.5 rounded-full bg-bg" />}
                </div>
                {opt}
              </button>
            );
          })}
        </div>
      )}

      {type === "multiselect" && options && (
        <div className="flex flex-wrap gap-2">
          {options.map((opt) => {
            const selected = Array.isArray(value) && value.includes(opt);
            return (
              <button
                key={opt}
                type="button"
                onClick={() => onToggle(opt)}
                className={`rounded-lg border px-3 py-1.5 text-sm transition-all ${
                  selected
                    ? "border-accent/50 bg-accent/10 text-accent ring-1 ring-accent/20"
                    : "border-border bg-surface text-muted hover:border-accent/20"
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      )}

      {type === "confirm" && (
        <div className="flex gap-3">
          {["Yes", "No"].map((opt) => {
            const selected = value === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => onChange(opt)}
                className={`flex-1 rounded-xl border py-3 text-sm font-medium transition-all ${
                  selected
                    ? "border-accent/50 bg-accent/10 text-accent ring-1 ring-accent/20"
                    : "border-border bg-surface text-muted hover:border-accent/20"
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
