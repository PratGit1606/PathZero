"use client";
import { ClipboardList, Cpu, BadgeDollarSign } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Tell us your situation",
    description:
      "Enter your intended major, credits completed, estimated budget, financial aid profile, and what matters most to you — cost, speed, or balance.",
    detail: "Takes under 2 minutes",
  },
  {
    number: "02",
    icon: Cpu,
    title: "PathZero optimizes your route",
    description:
      "Our pathway engine maps your inputs against ASU articulation agreements, Maricopa transfer data, and scholarship baselines to find your best path.",
    detail: "Instant results",
  },
  {
    number: "03",
    icon: BadgeDollarSign,
    title: "Save money. Graduate on time.",
    description:
      "Get a personalized course sequence, cost comparison, estimated savings, and a concrete next-steps checklist to start acting today.",
    detail: "Real, actionable plan",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto" id="how-it-works">
      <div className="text-center mb-16">
        <span className="label-tag mb-3 block">How PathZero works</span>
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-text tracking-tight">
          Three steps to{" "}
          <span className="italic text-gradient-accent">your cheapest path.</span>
        </h2>
      </div>

      <div className="relative">
        {/* Connector line (desktop) */}
        <div className="hidden md:block absolute top-14 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map(({ number, icon: Icon, title, description, detail }) => (
            <div key={number} className="flex flex-col items-center text-center">
              {/* Icon ring */}
              <div className="relative mb-6">
                <div className="w-28 h-28 rounded-full border border-border bg-surface flex items-center justify-center relative z-10">
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
                    <Icon size={24} className="text-accent" />
                  </div>
                </div>
                <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-bg border border-border flex items-center justify-center">
                  <span className="font-mono text-[10px] text-accent font-medium">{number}</span>
                </div>
              </div>

              <h3 className="font-display text-xl font-semibold text-text mb-3">{title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-3 max-w-xs">
                {description}
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-accent/70 bg-accent/5 border border-accent/10 rounded-full px-3 py-1">
                <span className="w-1 h-1 rounded-full bg-accent/60" />
                {detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
