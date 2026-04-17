"use client";
import { ArrowRight, TrendingDown, Clock, ShieldCheck } from "lucide-react";

interface HeroProps {
  onCTAClick: () => void;
}

const stats = [
  { icon: TrendingDown, value: "$28,000+", label: "Average savings found", color: "text-accent" },
  { icon: Clock, value: "0.5–1 yr", label: "Faster graduation", color: "text-blue" },
  { icon: ShieldCheck, value: "100%", label: "Same ASU diploma", color: "text-gold" },
];

export function Hero({ onCTAClick }: HeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background grid + glow */}
      <div
        className="absolute inset-0 bg-grid-pattern bg-grid opacity-100"
        style={{ backgroundSize: "40px 40px" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% 0%, rgba(0,229,160,0.1), transparent 70%)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0,229,160,0.06), transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-24 pb-16">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 text-accent text-sm font-medium mb-8 animate-slide-up stagger-1">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse2" />
          Built for ASU students · Hackathon 2025
        </div>

        {/* Headline */}
        <h1 className="font-display text-5xl md:text-7xl font-semibold leading-[1.05] tracking-tight text-text mb-6 animate-slide-up stagger-2">
          Find the{" "}
          <span className="italic text-gradient-accent">cheapest path</span>
          <br />
          to your ASU degree.
        </h1>

        {/* Sub */}
        <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10 animate-slide-up stagger-3">
          Most students overpay by tens of thousands of dollars without realizing it. 
          PathZero maps out a smarter route — using community college transfer credits, 
          scholarships, and sequencing — so you graduate with less debt.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16 animate-slide-up stagger-4">
          <button onClick={onCTAClick} className="btn-primary text-base px-8 py-4">
            Optimize my path
            <ArrowRight size={16} />
          </button>
          <a href="#how-it-works" className="btn-secondary text-base">
            See how it works
          </a>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto animate-slide-up stagger-5">
          {stats.map(({ icon: Icon, value, label, color }) => (
            <div
              key={label}
              className="card-surface card-hover px-6 py-5 flex flex-col items-center gap-1"
            >
              <Icon size={18} className={`${color} mb-1`} />
              <span className={`font-display text-2xl font-semibold ${color}`}>{value}</span>
              <span className="text-xs text-text-secondary text-center">{label}</span>
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <div className="mt-16 flex flex-col items-center gap-2 text-dim text-xs animate-pulse2">
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-border" />
          <span>Scroll to explore</span>
        </div>
      </div>
    </section>
  );
}
