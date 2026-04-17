export type MajorKey = "cs" | "business" | "psychology" | "nursing";

export type Priority = "cost" | "speed" | "balanced";

export type AidProfile =
  | "none"
  | "pell"
  | "pell_merit"
  | "full_scholarship";

export interface UserInputs {
  major: MajorKey;
  completedCredits: number;
  budget: number;
  aidProfile: AidProfile;
  priority: Priority;
}

export interface MajorData {
  label: string;
  totalCredits: number;
  fullCostASU: number;          // Full 4-year ASU tuition (in-state)
  degreeYears: number;
  transferableCredits: number;  // Credits earnable at Maricopa
  maricaopaCost: number;        // Cost to complete those credits at MCC
  remainingASUCost: number;     // ASU cost after transfer
  scholarshipEstimate: number;  // Avg scholarship at ASU for this major
  starterCourses: string[];
  transferCourses: string[];
  majorNotes: string;
}

export interface Recommendation {
  pathType: "transfer_first" | "stay_asu" | "hybrid";
  pathLabel: string;
  traditionalCost: number;
  optimizedCost: number;
  savings: number;
  savingsPercent: number;
  yearsToGraduation: number;
  confidenceScore: number;       // 0-100
  suggestedCourseSequence: CourseStep[];
  nextSteps: NextStep[];
  rationale: string;
  budgetFit: "tight" | "comfortable" | "well_within";
}

export interface CourseStep {
  semester: string;
  school: "MCC" | "ASU";
  courses: string[];
  cost: number;
}

export interface NextStep {
  action: string;
  deadline: string;
  priority: "high" | "medium" | "low";
}
