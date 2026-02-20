import React from "react";
import Link from "next/link";
import {
  Sparkles,
  Target,
  FileDown,
  BrainCircuit,
  BarChart3,
  Layers,
  Check,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

/* ── Mock resume preview ───────────────────────────────────────── */
function ResumeMockup() {
  return (
    <div className="relative w-full max-w-[420px] mx-auto lg:ml-auto">
      {/* Browser frame */}
      <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-[0_20px_60px_rgb(0_0_0_/_0.1)]">
        <div className="h-8 bg-slate-50 border-b border-slate-100 flex items-center px-3 gap-1.5 flex-shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          <span className="ml-2 text-[10px] text-slate-400 font-mono tracking-tight">
            resume-preview.pdf
          </span>
        </div>

        <div className="p-6 space-y-4 bg-white">
          {/* Name + title bar */}
          <div className="border-l-[3px] border-blue-600 pl-3.5">
            <div className="h-[14px] w-40 bg-slate-900 rounded-sm mb-1.5" />
            <div className="h-[10px] w-28 bg-blue-500/70 rounded-sm mb-2.5" />
            <div className="flex gap-3">
              <div className="h-[8px] w-24 bg-slate-200 rounded-sm" />
              <div className="h-[8px] w-20 bg-slate-200 rounded-sm" />
            </div>
          </div>

          {/* Summary */}
          <div>
            <div className="h-[9px] w-20 bg-slate-800 rounded-sm mb-2" />
            <div className="space-y-1.5">
              <div className="h-[7px] w-full bg-slate-100 rounded-sm" />
              <div className="h-[7px] w-[92%] bg-slate-100 rounded-sm" />
              <div className="h-[7px] w-[85%] bg-slate-100 rounded-sm" />
            </div>
          </div>

          {/* Experience */}
          <div>
            <div className="h-[9px] w-24 bg-slate-800 rounded-sm mb-2.5" />
            <div className="flex justify-between items-center mb-1.5">
              <div className="h-[10px] w-36 bg-slate-700 rounded-sm" />
              <div className="h-[8px] w-16 bg-slate-200 rounded-sm" />
            </div>
            <div className="h-[8px] w-28 bg-blue-400/60 rounded-sm mb-2" />
            <div className="space-y-1.5 pl-3">
              <div className="h-[7px] w-full bg-slate-100 rounded-sm" />
              <div className="h-[7px] w-[90%] bg-slate-100 rounded-sm" />
              <div className="h-[7px] w-[80%] bg-slate-100 rounded-sm" />
            </div>
          </div>

          {/* Skills */}
          <div>
            <div className="h-[9px] w-12 bg-slate-800 rounded-sm mb-2.5" />
            <div className="flex flex-wrap gap-1.5">
              {[72, 96, 64, 80, 56, 88, 68].map((w, i) => (
                <div
                  key={i}
                  className="h-5 bg-blue-50 border border-blue-100 rounded"
                  style={{ width: w }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI badge */}
      <div className="absolute -top-3.5 -right-3.5 flex items-center gap-1.5 bg-blue-600 text-white text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-lg shadow-blue-600/25 select-none">
        <Sparkles className="w-3 h-3" strokeWidth={2} />
        AI Optimized
      </div>

      {/* ATS Score badge */}
      <div className="absolute -bottom-4 -left-4 bg-white border border-slate-200 shadow-md shadow-slate-900/8 rounded-xl px-4 py-2.5 flex items-center gap-3 select-none">
        <div className="w-9 h-9 rounded-full bg-emerald-50 border-[2.5px] border-emerald-400 flex items-center justify-center flex-shrink-0">
          <span className="text-[11px] font-bold text-emerald-700 leading-none">94</span>
        </div>
        <div>
          <div className="text-[11px] font-semibold text-slate-800 leading-tight">ATS Score</div>
          <div className="text-[10px] text-slate-400 leading-tight">Top 5%</div>
        </div>
      </div>
    </div>
  );
}

/* ── Data ──────────────────────────────────────────────────────── */
const features = [
  {
    icon: Sparkles,
    title: "AI Bullet Rewriting",
    description:
      "Transform generic job duties into quantified, impact-driven achievements with a single click.",
  },
  {
    icon: Target,
    title: "ATS Optimization",
    description:
      "Score your resume against any job description and surface missing keywords instantly.",
  },
  {
    icon: BrainCircuit,
    title: "Smart Summaries",
    description:
      "Generate tailored professional summaries aligned to your target role and seniority level.",
  },
  {
    icon: Layers,
    title: "Professional Templates",
    description:
      "Three pixel-perfect templates — Modern, Minimal, Classic — designed for real hiring managers.",
  },
  {
    icon: FileDown,
    title: "One-Click PDF Export",
    description:
      "Export to PDF without layout shifts or font substitution. Print-ready and ATS-safe every time.",
  },
  {
    icon: BarChart3,
    title: "Job Match Analysis",
    description:
      "Paste any job description and get a detailed keyword match report with actionable suggestions.",
  },
];

const steps = [
  {
    number: "01",
    title: "Add your details",
    description:
      "Fill in your work history, education, and skills using our guided multi-step editor.",
  },
  {
    number: "02",
    title: "Let AI optimize",
    description:
      "Run AI on your bullets and summary to elevate impact and match target job requirements.",
  },
  {
    number: "03",
    title: "Export and apply",
    description:
      "Pick a template, export a pixel-perfect PDF, and submit your application with confidence.",
  },
];

/* ── Page ──────────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <div className="bg-[var(--bg)]">

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-28 grid lg:grid-cols-[1fr_460px] gap-16 items-center">
        <div className="space-y-8">
          <span className="badge badge-blue text-[11px] py-1 px-3">
            <Sparkles className="w-3 h-3" strokeWidth={2} />
            AI-Powered · ATS-Ready · Always Free
          </span>

          <div>
            <h1 className="text-[3.25rem] lg:text-[3.75rem] font-semibold text-[var(--text-1)] leading-[1.08] tracking-[-0.035em]">
              Build a resume<br />
              that gets<br />
              <span className="text-[var(--accent)]">interviews.</span>
            </h1>
            <p className="mt-5 text-[1.0625rem] text-[var(--text-3)] leading-[1.7] max-w-[44ch]">
              AI-powered bullet rewriting, ATS scoring, professional templates,
              and PDF export — all in your browser, no signup required.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/builder" className="btn btn-primary btn-lg">
              Start building free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/templates" className="btn btn-secondary btn-lg">
              View templates
            </Link>
          </div>

          <ul className="space-y-2.5" role="list">
            {[
              "No account required — works instantly",
              "Compatible with any job description",
              "Export to print-ready PDF in one click",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-[var(--text-3)]">
                <span
                  className="w-4 h-4 rounded-full bg-[var(--success-bg)] border border-[#BBF7D0] flex items-center justify-center flex-shrink-0"
                  aria-hidden="true"
                >
                  <Check className="w-2.5 h-2.5 text-[var(--success)]" strokeWidth={2.5} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <ResumeMockup />
      </section>

      {/* ── Stats bar ─────────────────────────────────────── */}
      <div className="border-y border-[var(--border)] bg-white">
        <div className="max-w-7xl mx-auto px-6 py-7 grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-[var(--border)]">
          {[
            { value: "10k+", label: "Resumes created" },
            { value: "94%",  label: "ATS pass rate" },
            { value: "3",    label: "Expert templates" },
            { value: "Free", label: "Always, no catch" },
          ].map((stat) => (
            <div key={stat.label} className="text-center px-4">
              <div className="text-2xl font-semibold text-[var(--text-1)] tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs text-[var(--text-4)] mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── How it works ──────────────────────────────────── */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[var(--accent)] mb-3">
            Process
          </p>
          <h2 className="text-[2rem] font-semibold text-[var(--text-1)] tracking-tight">
            From draft to offer-ready in minutes
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((step, i) => (
            <div key={step.number} className="relative flex items-start gap-4">
              {i < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-[18px] left-[calc(2.25rem+1rem)] right-0 h-px bg-[var(--border)]"
                  aria-hidden="true"
                />
              )}
              <span className="relative z-10 flex-shrink-0 w-9 h-9 rounded-lg bg-[var(--accent-bg)] border border-[var(--accent-border)] flex items-center justify-center text-[11px] font-bold text-[var(--accent)] tracking-wide">
                {step.number}
              </span>
              <div className="pt-1 relative z-10 bg-[var(--bg)] pr-4">
                <h3 className="text-[0.9375rem] font-semibold text-[var(--text-1)] mb-1.5">
                  {step.title}
                </h3>
                <p className="text-sm text-[var(--text-3)] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────── */}
      <section className="bg-white border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-14">
            <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[var(--accent)] mb-3">
              Features
            </p>
            <h2 className="text-[2rem] font-semibold text-[var(--text-1)] tracking-tight">
              Everything you need, nothing you don&apos;t
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl border border-[var(--border)] hover:border-[var(--accent-border)] hover:shadow-[var(--shadow)] transition-all duration-200 bg-white group cursor-default"
              >
                <div className="w-9 h-9 rounded-lg bg-[var(--accent-bg)] border border-[var(--accent-border)] flex items-center justify-center mb-4">
                  <feature.icon
                    className="w-[18px] h-[18px] text-[var(--accent)]"
                    strokeWidth={1.75}
                  />
                </div>
                <h3 className="text-sm font-semibold text-[var(--text-1)] mb-1.5">
                  {feature.title}
                </h3>
                <p className="text-sm text-[var(--text-3)] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-28 text-center">
        <h2 className="text-[2rem] font-semibold text-[var(--text-1)] tracking-tight mb-4">
          Ready to land your next role?
        </h2>
        <p className="text-[var(--text-3)] mb-8 max-w-[44ch] mx-auto text-[1.0625rem] leading-relaxed">
          Join thousands of job seekers who&apos;ve built better resumes with
          Resume.ai.
        </p>
        <Link href="/builder" className="btn btn-primary btn-lg inline-flex">
          Open the builder
          <ChevronRight className="w-4 h-4" />
        </Link>
        <p className="mt-4 text-xs text-[var(--text-4)]">
          No account. No credit card. No catch.
        </p>
      </section>
    </div>
  );
}
