import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../../lib/animations";

export default function FinalCTA() {
  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(88,166,255,0.06) 0%, transparent 60%)",
        }}
      />
      <motion.div
        className="mx-auto max-w-3xl px-6 text-center lg:px-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2
          className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          variants={fadeInUp}
        >
          Ready to make your AI agents
          <br />
          <span className="gradient-text">actually useful?</span>
        </motion.h2>

        <motion.p className="mt-6 text-lg text-muted" variants={fadeInUp}>
          Sign up in seconds. Connect your tools. Open Claude. Your business
          knowledge graph is ready — no terminal, no engineering, no waiting.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          variants={fadeInUp}
        >
          <a
            href="/get-started"
            className="glow-blue rounded-xl bg-accent px-10 py-4 text-base font-semibold text-bg transition-all hover:brightness-110"
          >
            Get Started Free
          </a>
          <a
            href="/product"
            className="group flex items-center gap-1 text-base font-medium text-accent transition-colors hover:text-text"
          >
            Explore the Product
            <span className="inline-block transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </a>
        </motion.div>

        <motion.p className="mt-6 text-sm text-muted" variants={fadeInUp}>
          Open-source &middot; Free tier available &middot; No credit card required
        </motion.p>
      </motion.div>
    </section>
  );
}
