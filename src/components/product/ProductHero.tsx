import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../../lib/animations";

export default function ProductHero() {
  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-24">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 20%, rgba(88,166,255,0.05) 0%, transparent 60%)",
        }}
      />
      <motion.div
        className="mx-auto max-w-4xl px-6 text-center lg:px-8"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          className="text-sm font-semibold uppercase tracking-widest text-accent"
          variants={fadeInUp}
        >
          Product
        </motion.p>
        <motion.h1
          className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl"
          variants={fadeInUp}
        >
          How Nodelo Works
        </motion.h1>
        <motion.p
          className="mx-auto mt-6 max-w-2xl text-lg text-muted"
          variants={fadeInUp}
        >
          The knowledge structuring agent that gives your AI real business
          context. From scattered data to a queryable knowledge graph — fully
          automated.
        </motion.p>
      </motion.div>
    </section>
  );
}
