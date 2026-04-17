"use client";
import { ExternalLink, Github, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border mt-16">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-bg font-bold text-xs">PZ</span>
              </div>
              <span className="font-display font-semibold text-lg text-text tracking-tight">
                PathZero
              </span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              Helping ASU students find the most affordable, fastest route to their degree
              through intelligent pathway optimization.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <span className="label-tag block mb-4">Quick links</span>
            <ul className="space-y-2.5 text-sm text-text-secondary">
              {[
                { label: "Degree Optimizer", href: "#optimizer" },
                { label: "How It Works", href: "#how-it-works" },
                { label: "The Problem", href: "#problem" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="hover:text-accent transition-colors flex items-center gap-1.5 w-fit"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <span className="label-tag block mb-4">External resources</span>
            <ul className="space-y-2.5 text-sm text-text-secondary">
              {[
                { label: "ASU Transfer Admissions", href: "https://transfer.asu.edu" },
                { label: "Maricopa Community Colleges", href: "https://www.maricopa.edu" },
                { label: "ASU Scholarships", href: "https://scholarships.asu.edu" },
                { label: "FAFSA Application", href: "https://studentaid.gov/h/apply-for-aid/fafsa" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors flex items-center gap-1.5 w-fit"
                  >
                    {label}
                    <ExternalLink size={11} className="opacity-50" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-dim text-xs text-center sm:text-left">
            Cost data based on 2024–25 ASU in-state tuition &amp; Maricopa Community College rates.
            Always verify with an official advisor before making enrollment decisions.
          </p>
          <div className="flex items-center gap-1.5 text-dim text-xs flex-shrink-0">
            <span>Built with</span>
            <Heart size={11} className="text-warn fill-warn" />
            <span>at ASU Hackathon 2025</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
