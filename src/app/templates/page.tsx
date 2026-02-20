import React from "react";
import Link from "next/link";
import ModernTemplate from "../../components/templates/ModernTemplate";
import MinimalTemplate from "../../components/templates/MinimalTemplate";
import ClassicTemplate from "../../components/templates/ClassicTemplate";
import { DEFAULT_RESUME } from "../../lib/types";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const templates = [
  {
    id: "modern" as const,
    name: "Modern",
    tag: "Popular",
    tagColor: "badge-blue",
    description:
      "Bold left-rule accent, two-column header, inline skill chips. Ideal for product, engineering, and design roles.",
    component: ModernTemplate,
  },
  {
    id: "minimal" as const,
    name: "Minimal",
    tag: "Elegant",
    tagColor: "badge-blue",
    description:
      "Generous white space, restrained typographic hierarchy, dot-separated contact line. Best for senior leadership.",
    component: MinimalTemplate,
  },
  {
    id: "classic" as const,
    name: "Classic",
    tag: "Formal",
    tagColor: "badge-blue",
    description:
      "Serif typeface, centred header, traditional ruled sections. Best for legal, finance, and academic positions.",
    component: ClassicTemplate,
  },
];

const guarantees = [
  "ATS-parsed without layout corruption",
  "PDF-safe fonts and spacing",
  "A4 and US Letter compatible",
];

export default function TemplatesPage() {
  return (
    <div className="bg-[var(--bg)] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-20">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[var(--accent)] mb-3">
            Templates
          </p>
          <h1 className="text-4xl font-semibold text-[var(--text-1)] tracking-tight mb-4">
            Three layouts, zero compromises
          </h1>
          <p className="text-[1.0625rem] text-[var(--text-3)] leading-relaxed max-w-[44ch] mx-auto">
            Each template is crafted for real hiring processes — not just visual appeal.
            Every font, spacing, and section order is intentional.
          </p>
        </div>

        {/* Template grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {templates.map((tmpl) => (
            <div key={tmpl.id} className="group flex flex-col">
              {/* Preview window */}
              <div className="relative overflow-hidden rounded-xl border border-[var(--border)] bg-white transition-all duration-300 group-hover:border-[var(--accent-border)] group-hover:shadow-[var(--shadow-md)] mb-4 flex-1">
                {/* Window chrome */}
                <div className="h-7 bg-[var(--surface-sunken)] border-b border-[var(--border)] flex items-center px-3 gap-1.5 flex-shrink-0">
                  <span className="w-2 h-2 rounded-full bg-slate-300" aria-hidden="true" />
                  <span className="w-2 h-2 rounded-full bg-slate-300" aria-hidden="true" />
                  <span className="w-2 h-2 rounded-full bg-slate-300" aria-hidden="true" />
                  <span className="ml-auto text-[10px] text-slate-400 font-medium">
                    {tmpl.name}
                  </span>
                </div>

                {/* Scaled preview */}
                <div className="h-[360px] overflow-hidden">
                  <div
                    className="origin-top-left pointer-events-none select-none"
                    style={{ transform: "scale(0.38)", width: "263.2%", transformOrigin: "top left" }}
                    aria-hidden="true"
                  >
                    <tmpl.component resume={DEFAULT_RESUME} />
                  </div>
                </div>

                {/* Hover CTA overlay */}
                <div className="absolute inset-0 top-7 bg-gradient-to-b from-transparent via-transparent to-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-5">
                  <Link
                    href={`/builder?template=${tmpl.id}`}
                    className="btn btn-primary btn-sm flex items-center gap-1.5 shadow-md"
                  >
                    Use this template
                    <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                  </Link>
                </div>
              </div>

              {/* Template metadata */}
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <h2 className="text-sm font-semibold text-[var(--text-1)]">{tmpl.name}</h2>
                  <span className={`badge ${tmpl.tagColor}`}>{tmpl.tag}</span>
                </div>
                <p className="text-xs text-[var(--text-3)] leading-relaxed">{tmpl.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quality guarantees */}
        <div className="border-t border-[var(--border)] pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <ul className="flex flex-col md:flex-row gap-4 md:gap-8">
            {guarantees.map((g) => (
              <li key={g} className="flex items-center gap-2 text-sm text-[var(--text-3)]">
                <CheckCircle2 className="w-4 h-4 text-[var(--success)] flex-shrink-0" strokeWidth={2} />
                {g}
              </li>
            ))}
          </ul>
          <Link href="/builder" className="btn btn-primary btn-lg flex items-center gap-2 flex-shrink-0">
            Open Builder
            <ArrowRight className="w-4 h-4" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </div>
  );
}
