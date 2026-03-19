import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import DataFlowCanvas from "./DataFlowCanvas";
import { fadeInUp, staggerContainer } from "../../lib/animations";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

const stats = [
  { value: 19400, suffix: "+", label: "Connected systems via MCP" },
  { value: 15, suffix: " min", label: "Setup time" },
  { value: 0, suffix: "", label: "Engineering required", display: "Zero" },
];

export default function Solution() {
  return (
    <section id="solution" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.p
            className="text-sm font-semibold uppercase tracking-widest text-accent"
            variants={fadeInUp}
          >
            The Solution
          </motion.p>
          <motion.h2
            className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
            variants={fadeInUp}
          >
            Meet Nodelo
          </motion.h2>
          <motion.p
            className="mx-auto mt-6 max-w-3xl text-lg text-muted"
            variants={fadeInUp}
          >
            An AI agent that connects to your business systems, reads your data,
            and builds a knowledge graph your other agents can query.
            Automatically. No engineering required.
          </motion.p>
        </motion.div>

        <motion.div
          className="relative mx-auto mt-16 h-[320px] max-w-4xl overflow-hidden rounded-2xl border border-border bg-surface sm:h-[400px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          <div className="absolute inset-0 flex items-center justify-between px-8 sm:px-16">
            <div className="flex flex-col gap-3">
              {["HubSpot", "Gmail", "Slack", "Drive"].map((name) => (
                <div
                  key={name}
                  className="rounded-lg border border-border/50 bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted"
                >
                  {name}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {["Sales Agent", "Support Agent", "Ops Agent"].map((name) => (
                <div
                  key={name}
                  className="rounded-lg border border-accent/20 bg-surface-2 px-3 py-1.5 text-xs font-medium text-accent"
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
          <DataFlowCanvas />
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} className="text-center" variants={fadeInUp}>
              <p className="text-4xl font-extrabold tracking-tight text-text sm:text-5xl">
                {stat.display ? (
                  stat.display
                ) : (
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                )}
              </p>
              <p className="mt-2 text-sm text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
