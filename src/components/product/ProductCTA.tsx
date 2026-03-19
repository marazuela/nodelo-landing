import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../../lib/animations";

export default function ProductCTA() {
  return (
    <section className="relative py-24 sm:py-32">
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
          className="text-3xl font-bold tracking-tight sm:text-4xl"
          variants={fadeInUp}
        >
          See it in action
        </motion.h2>

        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          variants={fadeInUp}
        >
          <a
            href="#"
            className="glow-blue rounded-xl bg-accent px-8 py-3.5 text-base font-semibold text-bg transition-all hover:brightness-110"
          >
            Request a Demo
          </a>
          <a
            href="#pricing"
            className="rounded-xl border border-border px-8 py-3.5 text-base font-semibold text-text transition-all hover:border-accent/30 hover:bg-surface"
          >
            View Pricing
          </a>
          <a
            href="#"
            className="group flex items-center gap-1 text-base font-medium text-accent transition-colors hover:text-text"
          >
            Read the Docs
            <span className="inline-block transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
