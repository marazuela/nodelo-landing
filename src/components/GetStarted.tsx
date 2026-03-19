import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../lib/animations";
import { supabase } from "../lib/supabase";

type FormState = "idle" | "submitting" | "sent" | "error";

export default function GetStarted() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setState("submitting");
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: `${window.location.origin}/onboard`,
      },
    });

    if (error) {
      setErrorMsg(error.message);
      setState("error");
    } else {
      setState("sent");
    }
  }

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center py-24">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(88,166,255,0.06) 0%, transparent 60%)",
        }}
      />

      <motion.div
        className="mx-auto w-full max-w-lg px-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {state === "sent" ? (
          <motion.div className="text-center" variants={fadeInUp}>
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-green/30 bg-green/10">
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
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Check your inbox
            </h1>
            <p className="mt-4 text-lg text-muted">
              We sent a magic link to{" "}
              <span className="font-medium text-text">{email}</span>. Click it
              to sign in and start configuring your knowledge graph.
            </p>
            <button
              onClick={() => {
                setState("idle");
                setEmail("");
              }}
              className="mt-8 text-sm text-accent transition-colors hover:text-text"
            >
              Use a different email
            </button>
          </motion.div>
        ) : (
          <>
            <motion.div className="text-center" variants={fadeInUp}>
              <h1 className="gradient-text text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Get started with Nodelo
              </h1>
              <p className="mt-4 text-lg text-muted">
                Enter your email to create an account. We'll send you a magic
                link — no password needed.
              </p>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              className="mt-10"
              variants={fadeInUp}
            >
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="flex-1 rounded-xl border border-border bg-surface px-4 py-3.5 text-text placeholder:text-muted/60 outline-none transition-colors focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
                  disabled={state === "submitting"}
                />
                <button
                  type="submit"
                  disabled={state === "submitting"}
                  className="glow-blue rounded-xl bg-accent px-8 py-3.5 text-base font-semibold text-bg transition-all hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {state === "submitting" ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="h-4 w-4 animate-spin"
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
                      Sending…
                    </span>
                  ) : (
                    "Send Magic Link"
                  )}
                </button>
              </div>

              {state === "error" && (
                <p className="mt-3 text-sm text-orange">
                  {errorMsg || "Something went wrong. Please try again."}
                </p>
              )}
            </motion.form>

            <motion.div
              className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3"
              variants={fadeInUp}
            >
              {[
                {
                  icon: "⚡",
                  title: "5 minutes",
                  text: "From sign-up to working knowledge graph",
                },
                {
                  icon: "🔒",
                  title: "No install",
                  text: "Everything runs in the cloud",
                },
                {
                  icon: "💳",
                  title: "Free to start",
                  text: "No credit card required",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-border bg-surface/50 p-4 text-center"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <p className="mt-2 text-sm font-semibold">{item.title}</p>
                  <p className="mt-1 text-xs text-muted">{item.text}</p>
                </div>
              ))}
            </motion.div>

            <motion.p
              className="mt-8 text-center text-xs text-muted"
              variants={fadeInUp}
            >
              By signing up you agree to our terms of service. Already have an
              account?{" "}
              <button
                type="button"
                onClick={() => {
                  /* Phase 2: Supabase login flow */
                }}
                className="text-accent hover:underline"
              >
                Sign in
              </button>
            </motion.p>
          </>
        )}
      </motion.div>
    </section>
  );
}
