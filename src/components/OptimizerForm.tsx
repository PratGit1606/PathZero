"use client";
import { UserInputs, MajorKey, Priority, AidProfile } from "@/types";
import { MAJOR_DATA, AID_LABELS, PRIORITY_LABELS } from "@/lib/data";
import { cn } from "@/lib/utils";

interface OptimizerFormProps {
  inputs: UserInputs;
  onChange: (inputs: UserInputs) => void;
}

const priorityIcons: Record<Priority, string> = {
  cost: "💰",
  speed: "⚡",
  balanced: "⚖️",
};

export function OptimizerForm({ inputs, onChange }: OptimizerFormProps) {
  function update<K extends keyof UserInputs>(key: K, value: UserInputs[K]) {
    onChange({ ...inputs, [key]: value });
  }

  return (
    <div className="space-y-6">
      {/* Major */}
      <div>
        <label className="label-tag block mb-2">Intended Major</label>
        <select
          className="input-field"
          value={inputs.major}
          onChange={(e) => update("major", e.target.value as MajorKey)}
        >
          {Object.entries(MAJOR_DATA).map(([key, data]) => (
            <option key={key} value={key}>
              {data.label}
            </option>
          ))}
        </select>
      </div>

      {/* Completed credits */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="label-tag">Credits Already Completed</label>
          <span className="font-mono text-accent text-sm font-medium">
            {inputs.completedCredits} credits
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={90}
          step={3}
          value={inputs.completedCredits}
          onChange={(e) => update("completedCredits", Number(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-dim mt-1">
          <span>0 (Freshman)</span>
          <span>30 (Sophomore)</span>
          <span>60 (Junior)</span>
          <span>90 (Senior)</span>
        </div>
      </div>

      {/* Budget */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="label-tag">Total Degree Budget</label>
          <span className="font-mono text-accent text-sm font-medium">
            ${inputs.budget.toLocaleString()}
          </span>
        </div>
        <input
          type="range"
          min={5000}
          max={60000}
          step={1000}
          value={inputs.budget}
          onChange={(e) => update("budget", Number(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-dim mt-1">
          <span>$5k</span>
          <span>$20k</span>
          <span>$40k</span>
          <span>$60k</span>
        </div>
      </div>

      {/* Aid profile */}
      <div>
        <label className="label-tag block mb-2">Financial Aid Profile</label>
        <select
          className="input-field"
          value={inputs.aidProfile}
          onChange={(e) => update("aidProfile", e.target.value as AidProfile)}
        >
          {Object.entries(AID_LABELS).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Priority */}
      <div>
        <label className="label-tag block mb-3">Your Priority</label>
        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(PRIORITY_LABELS) as Priority[]).map((p) => (
            <button
              key={p}
              onClick={() => update("priority", p)}
              className={cn(
                "flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-medium transition-all",
                inputs.priority === p
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border bg-bg text-text-secondary hover:border-muted"
              )}
            >
              <span className="text-xl">{priorityIcons[p]}</span>
              <span className="leading-tight text-center">{PRIORITY_LABELS[p]}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
