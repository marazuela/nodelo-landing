import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../../lib/animations";

const KnowledgeGraph3D = lazy(() => import("./KnowledgeGraph3D"));

function HeroFallback() {
  return (
    <div
      className="absolute inset-0 -z-10"
      style={{
        background:
          "radial-gradient(ellipse at 50% 40%, rgba(88,166,255,0.08) 0%, #0d1117 70%)",
      }}
    />
  );
}

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
      <Suspense fallback={<HeroFallback />}>
        <KnowledgeGraph3D />
      </Suspense>

      <motion.div
        className="relative z-10 mx-auto max-w-3xl px-6 text-center"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          className="mb-4 text-sm font-medium uppercase tracking-widest text-accent"
          variants={fadeInUp}
        >
          Knowledge infrastructure for AI agents
        </motion.p>

        <motion.h1
          className="gradient-text text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl md:text-7xl"
          variants={fadeInUp}
        >
          Give your AI agents
          <br />
          business context
        </motion.h1>

        <motion.p
          className="mx-auto mt-6 max-w-xl text-lg text-muted sm:text-xl"
          variants={fadeInUp}
        >
          Nodelo connects to your tools, structures your data into a knowledge
          graph, and serves it to every agent in your stack.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          variants={fadeInUp}
        >
          <a
            href="/get-started"
            className="glow-blue rounded-xl bg-accent px-8 py-3.5 text-base font-semibold text-bg transition-all hover:brightness-110"
          >
            Get Started Free
          </a>
          <a
            href="#solution"
            className="group flex items-center gap-1 text-base font-medium text-accent transition-colors hover:text-text"
          >
            See How It Works
            <span className="inline-block transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </a>
        </motion.div>

        <motion.div
          className="mt-10 flex items-center justify-center gap-6 text-sm text-muted"
          variants={fadeInUp}
        >
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-green" />
            Open-source
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-green" />
            MCP-native
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-green" />
            19,400+ integrations
          </span>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent" />
    </section>
  );
}
