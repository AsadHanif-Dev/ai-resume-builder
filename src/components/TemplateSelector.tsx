"use client"
import React from "react";
import { useResumeStore } from "../lib/store";
import { LayoutTemplate } from "lucide-react";

const templates: { id: "modern" | "minimal" | "classic"; label: string }[] = [
  { id: "modern",  label: "Modern" },
  { id: "minimal", label: "Minimal" },
  { id: "classic", label: "Classic" },
];

export default function TemplateSelector() {
  const template = useResumeStore((s) => s.resume.template);
  const setResume = useResumeStore((s) => s.setResume);

  return (
    <div className="flex items-center gap-2" role="group" aria-label="Select resume template">
      <LayoutTemplate
        className="w-3.5 h-3.5 text-[var(--text-4)] flex-shrink-0"
        strokeWidth={1.75}
        aria-hidden="true"
      />
      <div className="flex rounded-lg border border-[var(--border)] overflow-hidden bg-white shadow-[var(--shadow-xs)]">
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => setResume({ template: t.id })}
            aria-pressed={template === t.id}
            className={`px-3 py-1.5 text-xs font-medium border-r border-[var(--border)] last:border-0 transition-all ${
              template === t.id
                ? "bg-[var(--accent)] text-white"
                : "text-[var(--text-3)] hover:bg-[var(--border-muted)] hover:text-[var(--text-1)]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
