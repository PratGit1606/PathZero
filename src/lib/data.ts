import { MajorData, MajorKey } from "@/types";

export const MAJOR_DATA: Record<MajorKey, MajorData> = {
  cs: {
    label: "Computer Science",
    totalCredits: 120,
    fullCostASU: 44280,        // ~$11,070/yr × 4 in-state
    degreeYears: 4,
    transferableCredits: 60,
    maricaopaCost: 5400,       // ~$90/credit × 60
    remainingASUCost: 22140,   // ~2 years at ASU
    scholarshipEstimate: 6000,
    starterCourses: [
      "MAT 151 – College Algebra",
      "CSC 100 – Intro to Computer Science",
      "ENG 101 – First-Year Composition",
      "MAT 182 – Plane Trigonometry",
    ],
    transferCourses: [
      "CSC 110 – Intro to Programming (Python)",
      "MAT 220 – Calculus I",
      "MAT 221 – Calculus II",
      "PHY 111 – General Physics I",
      "ENG 102 – First-Year Composition II",
      "General Education Requirements (12 credits)",
    ],
    majorNotes:
      "Computer Science has strong articulation agreements between Maricopa Community Colleges and ASU. The first two years are heavily math and gen-ed, making community college transfer ideal for cost savings without sacrificing progression.",
  },
  business: {
    label: "Business",
    totalCredits: 120,
    fullCostASU: 44280,
    degreeYears: 4,
    transferableCredits: 64,
    maricaopaCost: 5760,
    remainingASUCost: 20880,
    scholarshipEstimate: 4500,
    starterCourses: [
      "ACC 111 – Accounting Principles I",
      "BUS 100 – Introduction to Business",
      "ENG 101 – First-Year Composition",
      "ECN 211 – Macroeconomic Principles",
    ],
    transferCourses: [
      "ACC 112 – Accounting Principles II",
      "ECN 212 – Microeconomic Principles",
      "MAT 142 – College Mathematics",
      "BUS 230 – Business Statistics",
      "COM 100 – Intro to Communication",
      "General Education Requirements (18 credits)",
    ],
    majorNotes:
      "ASU's W. P. Carey School of Business accepts up to 64 transfer credits. Core business foundations like accounting, economics, and statistics transfer cleanly from Maricopa, letting you enter ASU as a junior ready for upper-division coursework.",
  },
  psychology: {
    label: "Psychology",
    totalCredits: 120,
    fullCostASU: 44280,
    degreeYears: 4,
    transferableCredits: 62,
    maricaopaCost: 5580,
    remainingASUCost: 19800,
    scholarshipEstimate: 3500,
    starterCourses: [
      "PSY 101 – Introduction to Psychology",
      "ENG 101 – First-Year Composition",
      "BIO 100 – Biology Concepts",
      "SOC 101 – Introduction to Sociology",
    ],
    transferCourses: [
      "PSY 230 – Developmental Psychology",
      "PSY 240 – Abnormal Psychology",
      "MAT 142 – College Mathematics",
      "STA 270 – Applied Statistics",
      "BIO 181 – General Biology I",
      "General Education Requirements (18 credits)",
    ],
    majorNotes:
      "Psychology has extensive gen-ed overlap with Maricopa's offerings. The key prerequisite courses like Developmental and Abnormal Psychology transfer directly, and a strong transfer GPA can open doors to ASU's honors psychology programs.",
  },
  nursing: {
    label: "Nursing (BSN)",
    totalCredits: 128,
    fullCostASU: 51200,
    degreeYears: 4,
    transferableCredits: 36,   // Nursing is more restricted
    maricaopaCost: 3240,
    remainingASUCost: 38400,
    scholarshipEstimate: 8000, // Health sciences scholarships are strong
    starterCourses: [
      "BIO 156 – Introduction to Biology",
      "CHM 130 – Fundamental Chemistry",
      "ENG 101 – First-Year Composition",
      "PSY 101 – Introduction to Psychology",
    ],
    transferCourses: [
      "BIO 181 – General Biology I",
      "BIO 182 – General Biology II",
      "CHM 151 – General Chemistry I",
      "MAT 142 – College Mathematics",
      "SOC 101 – Introduction to Sociology",
      "COM 100 – Intro to Communication",
    ],
    majorNotes:
      "Nursing clinical requirements are mostly ASU-specific, so transfer savings are more limited. However, completing pre-requisite science courses at Maricopa is substantially cheaper. Focus on completing all pre-nursing science requirements via community college before applying to ASU's competitive nursing program.",
  },
};

export const AID_LABELS: Record<string, string> = {
  none: "No financial aid",
  pell: "Pell Grant eligible",
  pell_merit: "Pell Grant + Merit scholarship",
  full_scholarship: "Full scholarship / full ride",
};

export const AID_AWARD: Record<string, number> = {
  none: 0,
  pell: 7395,       // Max annual Pell Grant (2024)
  pell_merit: 12000,
  full_scholarship: 44280,
};

export const PRIORITY_LABELS: Record<string, string> = {
  cost: "Lowest total cost",
  speed: "Fastest graduation",
  balanced: "Best of both",
};
