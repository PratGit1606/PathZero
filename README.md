# PathZero

**Find the cheapest path to your ASU degree.**

PathZero is a hackathon MVP that helps Arizona State University students discover the most affordable, fastest route to their degree. It uses hardcoded ASU pathway data and a guided recommendation flow to compute personalized savings, course sequences, and next steps — entirely in the browser with no backend.

---

## Setup

```bash
# 1. Unzip (if you downloaded the zip)
unzip pathzero.zip && cd pathzero

# 2. Install dependencies
npm install

# 3. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Requirements:** Node.js 18+

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, Google Fonts
│   ├── page.tsx            # Main page, wires all sections
│   └── globals.css         # Design system, CSS utilities
├── components/
│   ├── Navbar.tsx          # Fixed nav with scroll effect
│   ├── Hero.tsx            # Hero section + stat cards
│   ├── ProblemSection.tsx  # Problem framing section
│   ├── HowItWorks.tsx      # 3-step explainer
│   ├── OptimizerSection.tsx # Container for form + results
│   ├── OptimizerForm.tsx   # Interactive input form
│   ├── RecommendationResult.tsx # Full result panel
│   └── Footer.tsx          # Footer with links
├── lib/
│   ├── data.ts             # Hardcoded ASU + Maricopa data
│   ├── engine.ts           # Recommendation logic
│   └── utils.ts            # cn() utility
└── types/
    └── index.ts            # TypeScript types
```

---

## How the recommendation engine works

The engine in `src/lib/engine.ts` is deterministic and hardcoded. Given user inputs it:

1. Looks up the major's data (cost, transferable credits, scholarships)
2. Calculates how many remaining credits can be done at Maricopa (~$90/credit) vs ASU (~$369/credit)
3. Subtracts financial aid and scholarship estimates
4. Biases path type based on priority:
   - **cost** → Transfer-First Path (maximize MCC credits)
   - **speed** → ASU Direct Path (skip transfer delays)
   - **balanced** → Hybrid Pathway
5. Computes confidence score based on budget fit and savings magnitude
6. Generates a course sequence and next-steps checklist

---

## Supported majors

| Major | Full ASU Cost | Transfer Savings | Scholarship Estimate |
|-------|--------------|-----------------|---------------------|
| Computer Science | $44,280 | Up to $16,740 | $6,000 |
| Business | $44,280 | Up to $17,640 | $4,500 |
| Psychology | $44,280 | Up to $18,900 | $3,500 |
| Nursing (BSN) | $51,200 | Up to $9,560 | $8,000 |

Data based on 2024–25 ASU in-state tuition and Maricopa Community College rates.

---

## Tech stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (available, used via CSS animations for bundle efficiency)
- **lucide-react** for icons
- **Google Fonts** — Fraunces (display) + DM Sans (body) + JetBrains Mono

---

## Design system

| Token | Value | Usage |
|-------|-------|-------|
| `bg` | `#080C10` | Page background |
| `surface` | `#0F1620` | Card backgrounds |
| `accent` | `#00E5A0` | Primary green — CTAs, savings |
| `gold` | `#F5C842` | Warnings, timeline highlights |
| `blue` | `#3B8BEB` | ASU school label, speed metric |
| `warn` | `#FF6B35` | Tight budget, high-priority steps |

---

## Ideas for after the hackathon

- **More majors** — Expand to all 350+ ASU degree programs with real articulation data
- **ASU catalog API** — Pull live course data instead of hardcoded sequences
- **PDF export** — "Share my pathway" as a downloadable plan
- **Advisor connect** — Book an ASU transfer advisor directly from the result screen
- **GPA-aware recommendations** — Factor in honors programs and accelerated tracks
- **FAFSA integration** — Pre-fill aid profile from StudentAid.gov data
- **Email drip** — Subscribe to deadline reminders for the next-steps checklist
- **Comparison mode** — Side-by-side comparison of two pathways

---

*Built with ♥ at ASU Hackathon 2025*
