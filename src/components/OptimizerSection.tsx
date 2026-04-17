"use client";
import { useState, useEffect, useRef } from "react";
import { UserInputs, Recommendation } from "@/types";
import { computeRecommendation } from "@/lib/engine";
import { OptimizerForm } from "./OptimizerForm";
import { RecommendationResult } from "./RecommendationResult";
import { Loader2, Sparkles } from "lucide-react";

const DEFAULT_INPUTS: UserInputs = {
  major: "cs",
  completedCredits: 0,
  budget: 25000,
  aidProfile: "none",
  priority: "balanced",
};

interface OptimizerProps {
  sectionRef?: React.RefObject<HTMLElement>;
}

export function OptimizerSection({ sectionRef }: OptimizerProps) {
  const [inputs, setInputs] = useState<UserInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<Recommendation | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasComputed, setHasComputed] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced auto-compute on input change
  useEffect(() => {
    if (!hasComputed) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    setLoading(true);
    timerRef.current = setTimeout(() => {
      setResult(computeRecommendation(inputs));
      setLoading(false);
    }, 500);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [inputs, hasComputed]);

  function handleCompute() {
    setLoading(true);
    setHasComputed(true);
    setTimeout(() => {
      setResult(computeRecommendation(inputs));
      setLoading(false);
    }, 700);
  }

  return (
    <section
      id="optimizer"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="label-tag mb-3 block">Degree Path Optimizer</span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-text tracking-tight mb-4">
            Your cheapest path,{" "}
            <span className="italic text-gradient-accent">calculated instantly.</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto text-base">
            Fill in your details below. PathZero will generate a personalized, cost-optimized 
            degree pathway in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Form column */}
          <div className="card-surface p-6 rounded-2xl">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center">
                <Sparkles size={14} className="text-accent" />
              </div>
              <span className="font-medium text-sm text-text">Your Profile</span>
              <span className="ml-auto text-xs text-dim">ASU · In-state tuition</span>
            </div>

            <OptimizerForm inputs={inputs} onChange={setInputs} />

            <button
              onClick={handleCompute}
              disabled={loading}
              className="btn-primary w-full mt-8 justify-center"
              style={{ width: "100%" }}
            >
              {loading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Calculating your path…
                </>
              ) : (
                <>
                  <Sparkles size={15} />
                  {hasComputed ? "Recalculate path" : "Find my cheapest path"}
                </>
              )}
            </button>

            {hasComputed && !loading && (
              <p className="text-center text-xs text-dim mt-3">
                Adjusting sliders updates results automatically
              </p>
            )}
          </div>

          {/* Result column */}
          <div className="min-h-[400px]">
            {!result && !loading && (
              <div className="card-surface h-full min-h-[400px] flex flex-col items-center justify-center gap-4 rounded-2xl border-dashed">
                <div className="w-14 h-14 rounded-2xl bg-accent/5 border border-accent/10 flex items-center justify-center">
                  <Sparkles size={22} className="text-accent/40" />
                </div>
                <div className="text-center">
                  <p className="text-text-secondary text-sm font-medium mb-1">
                    Your pathway will appear here
                  </p>
                  <p className="text-dim text-xs max-w-xs">
                    Complete the form and click "Find my cheapest path" to see your personalized recommendation.
                  </p>
                </div>
              </div>
            )}

            {loading && (
              <div className="card-surface h-full min-h-[400px] flex flex-col items-center justify-center gap-4 rounded-2xl">
                <Loader2 size={24} className="text-accent animate-spin" />
                <div className="text-center">
                  <p className="text-text-secondary text-sm font-medium mb-1">
                    Optimizing your pathway…
                  </p>
                  <p className="text-dim text-xs">
                    Analyzing transfer options, scholarships, and credit sequencing
                  </p>
                </div>
                {/* Shimmer bars */}
                <div className="w-64 space-y-2 mt-2">
                  {[80, 60, 70, 50].map((w, i) => (
                    <div
                      key={i}
                      className="h-2 rounded-full bg-surface"
                      style={{
                        width: `${w}%`,
                        background: "linear-gradient(90deg, #1C2A3A 25%, #2A3B4D 50%, #1C2A3A 75%)",
                        backgroundSize: "200% 100%",
                        animation: `shimmer 1.5s infinite ${i * 0.15}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {result && !loading && (
              <RecommendationResult result={result} major={inputs.major} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
