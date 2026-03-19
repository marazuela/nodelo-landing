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
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="gradient-text text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          variants={fadeInUp}
        >
          Your AI agents can reason.
          <br />
          They just don't know your business.
        </motion.h1>

        <motion.p
          className="mx-auto mt-6 max-w-2xl text-lg text-muted sm:text-xl"
          variants={fadeInUp}
        >
          Business context lives scattered across your CRM, email, docs, and
          chat. None of it is structured for AI consumption. Nodelo fixes
          that — automatically.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          variants={fadeInUp}
        >
          <a
            href="#contact"
            className="glow-blue rounded-xl bg-accent px-8 py-3.5 text-base font-semibold text-bg transition-all hover:brightness-110"
          >
            Request a Demo
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

        <motion.p className="mt-8 text-sm text-muted" variants={fadeInUp}>
          Open-source &middot; MCP-native &middot; 19,400+ integrations
        </motion.p>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent" />
    </section>
  );
}
