"use client";
import { useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProblemSection } from "@/components/ProblemSection";
import { HowItWorks } from "@/components/HowItWorks";
import { OptimizerSection } from "@/components/OptimizerSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  const optimizerRef = useRef<HTMLElement>(null);

  const scrollToOptimizer = () => {
    optimizerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="relative overflow-x-hidden">
      {/* Subtle noise texture overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
          opacity: 0.5,
        }}
      />

      <div className="relative z-10">
        <Navbar onOptimizerClick={scrollToOptimizer} />
        <Hero onCTAClick={scrollToOptimizer} />
        <ProblemSection />
        <HowItWorks />
        <OptimizerSection sectionRef={optimizerRef} />
        <Footer />
      </div>
    </main>
  );
}
