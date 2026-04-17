"use client";
import { Recommendation } from "@/types";
import {
  TrendingDown,
  Clock,
  MapPin,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  ListChecks,
  Zap,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MAJOR_DATA } from "@/lib/data";
import { MajorKey } from "@/types";

interface ResultProps {
  result: Recommendation;
  major: MajorKey;
}

const pathColors: Record<Recommendation["pathType"], string> = {
  transfer_first: "text-accent",
  hybrid: "text-blue",
  stay_asu: "text-gold",
};

const pathBg: Record<Recommendation["pathType"], string> = {
  transfer_first: "bg-accent/10 border-accent/20",
  hybrid: "bg-blue/10 border-blue/20",
  stay_asu: "bg-gold/10 border-gold/20",
};

const budgetColors: Record<Recommendation["budgetFit"], string> = {
  tight: "text-warn",
  comfortable: "text-gold",
  well_within: "text-accent",
};

const budgetLabels: Record<Recommendation["budgetFit"], string> = {
  tight: "Tight — seek more aid",
  comfortable: "Comfortable fit",
  well_within: "Well within budget",
};

function ConfidenceMeter({ score }: { score: number }) {
  const segments = 10;
  const filled = Math.round((score / 100) * segments);
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5">
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "w-3 h-1.5 rounded-sm transition-all",
              i < filled
                ? i < 5
                  ? "bg-warn"
                  : i < 8
                  ? "bg-gold"
                  : "bg-accent"
                : "bg-muted"
            )}
          />
        ))}
      </div>
      <span className="text-xs font-mono font-medium text-text-secondary">{score}%</span>
    </div>
  );
}

export function RecommendationResult({ result, major }: ResultProps) {
  const data = MAJOR_DATA[major];
  const schoolColor = (school: "MCC" | "ASU") =>
    school === "MCC" ? "text-gold bg-gold/10" : "text-blue bg-blue/10";

  return (
    <div className="space-y-4 animate-slide-up">
      {/* Header card */}
      <div className={cn("card-surface p-6 border rounded-2xl", pathBg[result.pathType])}>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <span className="label-tag block mb-1">Recommended Pathway</span>
            <h3 className={cn("font-display text-2xl font-semibold", pathColors[result.pathType])}>
              {result.pathLabel}
            </h3>
          </div>
          <div className="text-right">
            <span className="label-tag block mb-1">Confidence</span>
            <ConfidenceMeter score={result.confidenceScore} />
          </div>
        </div>
        <p className="text-text-secondary text-sm leading-relaxed">{result.rationale}</p>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-2 gap-3">
        <div className="card-surface p-5">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown size={14} className="text-accent" />
            <span className="label-tag">Total savings</span>
          </div>
          <div className="font-display text-3xl font-semibold text-accent">
            ${result.savings.toLocaleString()}
          </div>
          <div className="text-xs text-text-secondary mt-1">
            {result.savingsPercent}% less than traditional path
          </div>
        </div>

        <div className="card-surface p-5">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={14} className="text-blue" />
            <span className="label-tag">Time to graduate</span>
          </div>
          <div className="font-display text-3xl font-semibold text-blue">
            {result.yearsToGraduation}
            <span className="text-sm font-body font-normal text-text-secondary ml-1">yrs</span>
          </div>
          <div className="text-xs text-text-secondary mt-1">
            From your current credit standing
          </div>
        </div>

        <div className="card-surface p-5">
          <div className="flex items-center gap-2 mb-2">
            <Target size={14} className="text-gold" />
            <span className="label-tag">Optimized cost</span>
          </div>
          <div className="font-display text-3xl font-semibold text-gold">
            ${result.optimizedCost.toLocaleString()}
          </div>
          <div className="text-xs text-text-secondary mt-1">
            vs ${result.traditionalCost.toLocaleString()} traditional
          </div>
        </div>

        <div className="card-surface p-5">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={14} className={budgetColors[result.budgetFit]} />
            <span className="label-tag">Budget fit</span>
          </div>
          <div
            className={cn(
              "font-display text-lg font-semibold mt-1",
              budgetColors[result.budgetFit]
            )}
          >
            {budgetLabels[result.budgetFit]}
          </div>
        </div>
      </div>

      {/* Cost comparison bar */}
      <div className="card-surface p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingDown size={14} className="text-text-secondary" />
          <span className="label-tag">Cost comparison</span>
        </div>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs text-text-secondary mb-1">
              <span>Traditional ASU path</span>
              <span className="font-mono">${result.traditionalCost.toLocaleString()}</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-warn/50 rounded-full w-full" />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-accent font-medium">PathZero optimized</span>
              <span className="font-mono text-accent">
                ${result.optimizedCost.toLocaleString()}
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all duration-700"
                style={{
                  width: `${(result.optimizedCost / result.traditionalCost) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Course sequence */}
      <div className="card-surface p-5">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen size={14} className="text-text-secondary" />
          <span className="label-tag">Suggested course sequence</span>
        </div>
        <div className="space-y-4">
          {result.suggestedCourseSequence.map((step, i) => (
            <div key={i} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full border border-border bg-surface flex items-center justify-center flex-shrink-0">
                  <span className="text-[10px] font-mono text-dim">{i + 1}</span>
                </div>
                {i < result.suggestedCourseSequence.length - 1 && (
                  <div className="w-px flex-1 bg-border mt-1" />
                )}
              </div>
              <div className="pb-4 flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={cn(
                      "text-[10px] font-semibold px-2 py-0.5 rounded-full",
                      schoolColor(step.school)
                    )}
                  >
                    {step.school}
                  </span>
                  <span className="text-xs text-text-secondary">{step.semester}</span>
                  <span className="ml-auto text-xs font-mono text-dim">
                    ~${step.cost.toLocaleString()}
                  </span>
                </div>
                <ul className="space-y-1">
                  {step.courses.map((course, j) => (
                    <li key={j} className="flex items-start gap-1.5 text-xs text-text-secondary">
                      <ChevronRight size={10} className="mt-0.5 flex-shrink-0 text-dim" />
                      {course}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Major notes */}
        <div className="mt-2 p-3 rounded-xl bg-accent/5 border border-accent/10">
          <p className="text-xs text-text-secondary leading-relaxed">
            <span className="text-accent font-medium">Expert note: </span>
            {data.majorNotes}
          </p>
        </div>
      </div>

      {/* Next steps */}
      <div className="card-surface p-5">
        <div className="flex items-center gap-2 mb-4">
          <ListChecks size={14} className="text-text-secondary" />
          <span className="label-tag">Your next steps</span>
        </div>
        <div className="space-y-3">
          {result.nextSteps.map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <div
                className={cn(
                  "mt-0.5 flex-shrink-0",
                  step.priority === "high"
                    ? "text-warn"
                    : step.priority === "medium"
                    ? "text-gold"
                    : "text-dim"
                )}
              >
                {step.priority === "high" ? (
                  <AlertCircle size={14} />
                ) : (
                  <CheckCircle2 size={14} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text leading-snug">{step.action}</p>
                <p className="text-xs text-dim mt-0.5">{step.deadline}</p>
              </div>
              <span
                className={cn(
                  "text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0",
                  step.priority === "high"
                    ? "text-warn bg-warn/10"
                    : step.priority === "medium"
                    ? "text-gold bg-gold/10"
                    : "text-dim bg-muted"
                )}
              >
                {step.priority}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ASU info footer */}
      <div className="text-center py-2">
        <p className="text-xs text-dim">
          Data based on 2024–25 ASU in-state tuition &amp; Maricopa Community Colleges rates.
          Always verify with an official advisor.
        </p>
      </div>
    </div>
  );
}
