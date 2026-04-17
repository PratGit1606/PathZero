"use client";
import { AlertTriangle, Users, DollarSign } from "lucide-react";

const problems = [
  {
    icon: DollarSign,
    stat: "$44,280",
    title: "Average 4-year ASU tuition",
    description:
      "Arizona resident tuition at ASU runs over $11,000/year. Most students don't realize how much of that is avoidable with smarter credit planning.",
    color: "warn",
  },
  {
    icon: Users,
    stat: "62%",
    title: "First-gen students who transfer",
    description:
      "First-generation college students are more likely to start at community college but less likely to finish — often due to lack of clear transfer guidance.",
    color: "blue",
  },
  {
    icon: AlertTriangle,
    stat: "$28k+",
    title: "Wasted on redundant credits",
    description:
      "Students regularly pay for ASU courses that could have been completed for a fraction of the cost at Maricopa Community Colleges through articulation agreements.",
    color: "gold",
  },
];

export function ProblemSection() {
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto" id="problem">
      <div className="text-center mb-16">
        <span className="label-tag mb-3 block">The problem</span>
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-text tracking-tight mb-4">
          College costs are broken.
          <br />
          <span className="italic text-gradient-gold">Especially for those who can least afford it.</span>
        </h2>
        <p className="text-text-secondary max-w-xl mx-auto text-base leading-relaxed">
          The information gap between "what school costs" and "what it needs to cost" is 
          costing underserved students years of debt. That gap is what PathZero closes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {problems.map(({ icon: Icon, stat, title, description, color }) => (
          <div
            key={title}
            className="card-surface card-hover p-7 flex flex-col gap-4"
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center`}
              style={{
                background:
                  color === "warn"
                    ? "rgba(255,107,53,0.1)"
                    : color === "blue"
                    ? "rgba(59,139,235,0.1)"
                    : "rgba(245,200,66,0.1)",
              }}
            >
              <Icon
                size={18}
                className={
                  color === "warn"
                    ? "text-warn"
                    : color === "blue"
                    ? "text-blue"
                    : "text-gold"
                }
              />
            </div>
            <div>
              <div
                className={`font-display text-3xl font-semibold mb-1 ${
                  color === "warn"
                    ? "text-warn"
                    : color === "blue"
                    ? "text-blue"
                    : "text-gold"
                }`}
              >
                {stat}
              </div>
              <div className="text-text font-medium mb-2 text-sm">{title}</div>
              <p className="text-text-secondary text-sm leading-relaxed">{description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Callout quote */}
      <div className="mt-10 card-surface p-7 border-l-2 border-accent/50 rounded-r-2xl rounded-l-none ml-0">
        <blockquote className="text-text-secondary text-base leading-relaxed italic max-w-3xl">
          "Over 60% of ASU's transferable lower-division credits can be completed at Maricopa 
          Community Colleges for{" "}
          <span className="text-accent not-italic font-semibold">less than $6,000 total</span> — 
          compared to $22,000+ for the same credits at ASU. Most students never hear this."
        </blockquote>
        <div className="mt-3 text-dim text-xs">
          — Based on 2024–25 ASU and Maricopa Community College tuition rates
        </div>
      </div>
    </section>
  );
}
