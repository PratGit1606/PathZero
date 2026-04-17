"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface NavbarProps {
  onOptimizerClick?: () => void;
}

export function Navbar({ onOptimizerClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-bg/90 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center transition-transform group-hover:scale-105">
            <span className="text-bg font-bold text-xs">PZ</span>
          </div>
          <span className="font-display font-semibold text-lg text-text tracking-tight">
            PathZero
          </span>
        </a>

        <div className="hidden md:flex items-center gap-6 text-sm text-text-secondary">
          <a href="#how-it-works" className="hover:text-text transition-colors">
            How it works
          </a>
          <a href="#problem" className="hover:text-text transition-colors">
            The problem
          </a>
          <button
            onClick={onOptimizerClick}
            className="flex items-center gap-1.5 bg-accent text-bg font-semibold rounded-lg px-4 py-2 text-sm hover:bg-[#00f5ac] transition-all hover:-translate-y-px hover:shadow-lg hover:shadow-accent/20"
          >
            Get my path
            <ArrowRight size={13} />
          </button>
        </div>

        <button
          onClick={onOptimizerClick}
          className="md:hidden flex items-center gap-1.5 bg-accent text-bg font-semibold rounded-lg px-3 py-1.5 text-xs"
        >
          Get started
        </button>
      </div>
    </nav>
  );
}
