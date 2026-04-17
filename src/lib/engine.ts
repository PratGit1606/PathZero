import {
  UserInputs,
  Recommendation,
  CourseStep,
  NextStep,
  MajorKey,
} from "@/types";
import { MAJOR_DATA, AID_AWARD } from "./data";

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

export function computeRecommendation(inputs: UserInputs): Recommendation {
  const data = MAJOR_DATA[inputs.major];
  const aidAmount = AID_AWARD[inputs.aidProfile];

  // ─── Cost calculations ───────────────────────────────────────────────────
  const traditionalCost = data.fullCostASU - aidAmount;
  const remainingCredits = Math.max(0, data.totalCredits - inputs.completedCredits);

  // How many of remaining credits can be done at MCC?
  const mccCreditsAvailable = Math.max(0, data.transferableCredits - inputs.completedCredits);
  const mccCreditsTake = clamp(mccCreditsAvailable, 0, remainingCredits);
  const asuCreditsNeeded = remainingCredits - mccCreditsTake;

  const mccCostPerCredit = 90;  // Maricopa rate
  const asuCostPerCredit = data.fullCostASU / data.totalCredits;

  const mccSpend = mccCreditsTake * mccCostPerCredit;
  const asuSpend = asuCreditsNeeded * asuCostPerCredit;
  let optimizedRaw = mccSpend + asuSpend - aidAmount - data.scholarshipEstimate;
  optimizedRaw = Math.max(0, optimizedRaw);

  // Bias: if cost priority, lean harder into MCC
  if (inputs.priority === "cost" && mccCreditsTake > 0) {
    optimizedRaw = Math.max(0, optimizedRaw * 0.92);
  }

  const savings = Math.max(0, traditionalCost - optimizedRaw);
  const savingsPercent = traditionalCost > 0 ? Math.round((savings / traditionalCost) * 100) : 0;

  // ─── Timeline ────────────────────────────────────────────────────────────
  const creditsPerYear = 30;
  const baseYears = remainingCredits / creditsPerYear;

  let yearsToGraduation: number;
  if (inputs.priority === "speed") {
    yearsToGraduation = Math.max(1, baseYears - 0.25); // slightly faster via efficient sequencing
  } else {
    yearsToGraduation = baseYears;
  }
  yearsToGraduation = Math.round(yearsToGraduation * 10) / 10;

  // ─── Path type ───────────────────────────────────────────────────────────
  let pathType: Recommendation["pathType"];
  let pathLabel: string;

  const hasTransferValue = mccCreditsTake >= 18;
  const isHighCredits = inputs.completedCredits >= 60;

  if (inputs.priority === "speed" || isHighCredits) {
    pathType = "stay_asu";
    pathLabel = "ASU Direct Path";
  } else if (inputs.priority === "cost" || inputs.budget < 20000) {
    pathType = hasTransferValue ? "transfer_first" : "hybrid";
    pathLabel = hasTransferValue ? "Transfer-First Path" : "Hybrid Pathway";
  } else {
    pathType = hasTransferValue ? "hybrid" : "stay_asu";
    pathLabel = hasTransferValue ? "Hybrid Pathway" : "ASU Direct Path";
  }

  // ─── Budget fit ──────────────────────────────────────────────────────────
  const budgetFit: Recommendation["budgetFit"] =
    inputs.budget >= optimizedRaw * 1.3
      ? "well_within"
      : inputs.budget >= optimizedRaw
      ? "comfortable"
      : "tight";

  // ─── Confidence score ────────────────────────────────────────────────────
  let confidence = 72;
  if (budgetFit !== "tight") confidence += 10;
  if (savingsPercent >= 30) confidence += 8;
  if (inputs.aidProfile === "pell_merit" || inputs.aidProfile === "full_scholarship") confidence += 7;
  if (inputs.completedCredits > 0) confidence += 3;
  confidence = clamp(confidence, 60, 98);

  // ─── Course sequence ─────────────────────────────────────────────────────
  const sequence = buildCourseSequence(inputs.major, pathType, inputs.completedCredits);

  // ─── Next steps ──────────────────────────────────────────────────────────
  const nextSteps = buildNextSteps(pathType, inputs.aidProfile, inputs.major);

  // ─── Rationale ───────────────────────────────────────────────────────────
  const rationale = buildRationale(
    inputs,
    pathType,
    savings,
    savingsPercent,
    yearsToGraduation
  );

  return {
    pathType,
    pathLabel,
    traditionalCost,
    optimizedCost: optimizedRaw,
    savings,
    savingsPercent,
    yearsToGraduation,
    confidenceScore: confidence,
    suggestedCourseSequence: sequence,
    nextSteps,
    rationale,
    budgetFit,
  };
}

function buildCourseSequence(
  major: MajorKey,
  pathType: Recommendation["pathType"],
  completedCredits: number
): CourseStep[] {
  const data = MAJOR_DATA[major];
  const steps: CourseStep[] = [];
  const startSemester = completedCredits > 0 ? "Next Semester" : "Fall 2025";

  if (pathType === "stay_asu") {
    steps.push({
      semester: startSemester,
      school: "ASU",
      courses: data.starterCourses.slice(0, 4),
      cost: Math.round(data.fullCostASU / (data.degreeYears * 2)),
    });
    steps.push({
      semester: "Spring 2026",
      school: "ASU",
      courses: data.transferCourses.slice(0, 4),
      cost: Math.round(data.fullCostASU / (data.degreeYears * 2)),
    });
    steps.push({
      semester: "Fall 2026",
      school: "ASU",
      courses: ["Upper-Division Core Courses", "Major Electives (6 credits)", "Capstone Preparation"],
      cost: Math.round(data.fullCostASU / (data.degreeYears * 2)),
    });
  } else if (pathType === "transfer_first") {
    steps.push({
      semester: startSemester,
      school: "MCC",
      courses: data.starterCourses,
      cost: Math.round(data.maricaopaCost / 4),
    });
    steps.push({
      semester: "Spring 2026",
      school: "MCC",
      courses: data.transferCourses.slice(0, 4),
      cost: Math.round(data.maricaopaCost / 4),
    });
    steps.push({
      semester: "Fall 2026",
      school: "ASU",
      courses: ["Upper-Division Major Core", "Major Electives", "Writing in the Discipline"],
      cost: Math.round(data.remainingASUCost / (data.degreeYears * 2)),
    });
    steps.push({
      semester: "Spring 2027",
      school: "ASU",
      courses: ["Senior Seminar", "Major Specialization (6 credits)", "Internship / Practicum"],
      cost: Math.round(data.remainingASUCost / (data.degreeYears * 2)),
    });
  } else {
    // hybrid
    steps.push({
      semester: startSemester,
      school: "MCC",
      courses: data.starterCourses.slice(0, 3),
      cost: Math.round(data.maricaopaCost / 3),
    });
    steps.push({
      semester: "Spring 2026",
      school: "ASU",
      courses: data.transferCourses.slice(0, 3),
      cost: Math.round(data.remainingASUCost / 4),
    });
    steps.push({
      semester: "Fall 2026",
      school: "ASU",
      courses: ["Upper-Division Core", "Major Electives (3 credits)", "Research Methods"],
      cost: Math.round(data.remainingASUCost / 4),
    });
    steps.push({
      semester: "Spring 2027",
      school: "ASU",
      courses: ["Capstone Project", "Major Electives (6 credits)", "Professional Development"],
      cost: Math.round(data.remainingASUCost / 4),
    });
  }

  return steps;
}

function buildNextSteps(
  pathType: Recommendation["pathType"],
  aidProfile: string,
  major: MajorKey
): NextStep[] {
  const steps: NextStep[] = [];

  if (pathType === "transfer_first" || pathType === "hybrid") {
    steps.push({
      action: "Apply to Maricopa Community Colleges (Rio Salado, Mesa CC, or Chandler-Gilbert)",
      deadline: "Applications open year-round; enroll for next semester",
      priority: "high",
    });
    steps.push({
      action: `Request an ASU Transfer Pathway Guide for ${MAJOR_DATA[major].label}`,
      deadline: "Do this before registering for MCC classes",
      priority: "high",
    });
  }

  steps.push({
    action: "Complete the FAFSA (Free Application for Federal Student Aid)",
    deadline: "ASAP — funds are first-come, first-served",
    priority: aidProfile === "none" ? "high" : "medium",
  });

  if (aidProfile === "none" || aidProfile === "pell") {
    steps.push({
      action: "Explore ASU merit scholarships at scholarships.asu.edu",
      deadline: "Most deadlines in February–March",
      priority: "high",
    });
  }

  steps.push({
    action: "Book a free advising appointment with ASU's Transfer Admission office",
    deadline: "Within the next 2 weeks",
    priority: "medium",
  });

  steps.push({
    action: "Download your unofficial transcript and identify transferable credits",
    deadline: "Before meeting with an advisor",
    priority: "medium",
  });

  if (major === "nursing") {
    steps.push({
      action: "Check ASU Edson College of Nursing's specific pre-requisite requirements",
      deadline: "Before registering for any science courses",
      priority: "high",
    });
  }

  return steps;
}

function buildRationale(
  inputs: UserInputs,
  pathType: Recommendation["pathType"],
  savings: number,
  savingsPercent: number,
  years: number
): string {
  const majorLabel = MAJOR_DATA[inputs.major].label;

  if (pathType === "transfer_first") {
    return `Based on your ${inputs.completedCredits} completed credits and a budget of $${inputs.budget.toLocaleString()}, the Transfer-First path gives you the best value for ${majorLabel}. By completing your first two years at Maricopa Community Colleges — where tuition runs ~$90/credit vs. ASU's ~$369/credit — you can save up to $${savings.toLocaleString()} (${savingsPercent}%) while still graduating with an ASU degree in approximately ${years} years.`;
  } else if (pathType === "hybrid") {
    return `With ${inputs.completedCredits} credits already under your belt and a balanced priority, a Hybrid Pathway makes the most sense for ${majorLabel}. You can knock out key prerequisites at Maricopa's lower rates, then transfer into ASU for the major-specific upper division work — saving $${savings.toLocaleString()} (${savingsPercent}%) and finishing in about ${years} years.`;
  } else {
    return `Given your ${inputs.completedCredits} completed credits and ${inputs.priority === "speed" ? "speed-first priority" : "profile"}, enrolling directly at ASU is the right move for ${majorLabel}. You're already far enough along that the transfer arbitrage window has mostly closed. Focus instead on ASU scholarships and efficient course sequencing to reach graduation in ${years} years at the lowest possible cost.`;
  }
}
