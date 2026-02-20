"use client"
import React, { useEffect, useState } from "react";
import { useResumeStore } from "../lib/store";
import {
  rewriteBullets,
  generateSummary,
  extractKeywordsFromJob,
  improveKeywords,
} from "../lib/ai";
import { scoreResume, suggestKeywordsFromJD } from "../lib/ats";
import EditsModal from "./EditsModal";
import { exportToPdf } from "../lib/export";
import {
  Sparkles,
  Save,
  Download,
  Copy,
  Plus,
  Trash2,
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderOpen,
  Award,
  Target,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Info,
  Globe,
  BookOpen,
  HeartHandshake,
  FileText,
  Loader2,
} from "lucide-react";

/* â”€â”€ Utilities â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function uid(prefix = "id") {
  return `${prefix}_${Date.now().toString(36)}_${Math.random()
    .toString(36)
    .slice(2, 6)}`;
}

/* â”€â”€ Tab types â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
type Tab =
  | "personal"
  | "summary"
  | "experience"
  | "education"
  | "skills"
  | "projects"
  | "more"
  | "ats";

const TABS: {
  id: Tab;
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}[] = [
  { id: "personal",   label: "Personal",   icon: User },
  { id: "summary",    label: "Summary",    icon: FileText },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education",  label: "Education",  icon: GraduationCap },
  { id: "skills",     label: "Skills",     icon: Wrench },
  { id: "projects",   label: "Projects",   icon: FolderOpen },
  { id: "more",       label: "More",       icon: Award },
  { id: "ats",        label: "ATS Match",  icon: Target },
];

/* â”€â”€ Small UI helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function FieldLabel({
  htmlFor,
  children,
  hint,
}: {
  htmlFor?: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--text-3)] mb-1.5"
    >
      {children}
      {hint && (
        <span className="ml-1.5 normal-case font-normal tracking-normal text-[var(--text-4)]">
          {hint}
        </span>
      )}
    </label>
  );
}

function SectionCard({
  title,
  children,
  action,
}: {
  title?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="editor-section mb-4 last:mb-0">
      {(title || action) && (
        <div className="flex items-center justify-between mb-4">
          {title && (
            <h3 className="editor-section-title">{title}</h3>
          )}
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

function EntryCard({
  children,
  onRemove,
}: {
  children: React.ReactNode;
  onRemove: () => void;
}) {
  return (
    <div className="relative pl-3 py-4 border border-[var(--border)] rounded-lg bg-[var(--surface)] mb-3 last:mb-0">
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[var(--accent-border)] rounded-l-lg" />
      <div className="px-3 space-y-3">{children}</div>
      <div className="px-3 mt-3 pt-3 border-t border-[var(--border-muted)]">
        <button
          onClick={onRemove}
          aria-label="Remove this entry"
          className="btn btn-danger btn-sm flex items-center gap-1.5"
        >
          <Trash2 className="w-3.5 h-3.5" strokeWidth={1.75} />
          Remove
        </button>
      </div>
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <p className="text-center text-sm text-[var(--text-4)] py-8 border border-dashed border-[var(--border)] rounded-lg">
      {label}
    </p>
  );
}

function AiCard({ children }: { children: React.ReactNode }) {
  return <div className="ai-card mt-3">{children}</div>;
}

/* â”€â”€ Main component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export default function ResumeEditor() {
  const resume              = useResumeStore((s) => s.resume);
  const setResume           = useResumeStore((s) => s.setResume);
  const addExperience       = useResumeStore((s) => s.addExperience);
  const updateExperience    = useResumeStore((s) => s.updateExperience);
  const removeExperience    = useResumeStore((s) => s.removeExperience);
  const addEducation        = useResumeStore((s) => s.addEducation);
  const updateEducation     = useResumeStore((s) => s.updateEducation);
  const removeEducation     = useResumeStore((s) => s.removeEducation);
  const addProject          = useResumeStore((s) => s.addProject);
  const updateProject       = useResumeStore((s) => s.updateProject);
  const removeProject       = useResumeStore((s) => s.removeProject);
  const addCertification    = useResumeStore((s) => s.addCertification);
  const updateCertification = useResumeStore((s) => s.updateCertification);
  const removeCertification = useResumeStore((s) => s.removeCertification);
  const addAchievement      = useResumeStore((s) => s.addAchievement);
  const updateAchievement   = useResumeStore((s) => s.updateAchievement);
  const removeAchievement   = useResumeStore((s) => s.removeAchievement);
  const addLanguage         = useResumeStore((s) => s.addLanguage);
  const updateLanguage      = useResumeStore((s) => s.updateLanguage);
  const removeLanguage      = useResumeStore((s) => s.removeLanguage);
  const addPublication      = useResumeStore((s) => s.addPublication);
  const updatePublication   = useResumeStore((s) => s.updatePublication);
  const removePublication   = useResumeStore((s) => s.removePublication);
  const addVolunteerExperience    = useResumeStore((s) => s.addVolunteerExperience);
  const updateVolunteerExperience = useResumeStore((s) => s.updateVolunteerExperience);
  const removeVolunteerExperience = useResumeStore((s) => s.removeVolunteerExperience);
  const saveToLocal  = useResumeStore((s) => s.saveToLocal);
  const loadFromLocal = useResumeStore((s) => s.loadFromLocal);

  useEffect(() => { loadFromLocal(); }, [loadFromLocal]);

  const [activeTab, setActiveTab] = useState<Tab>("personal");
  const [loadingAI, setLoadingAI] = useState(false);

  const hasAnthropic = Boolean(process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY);
  const hasOpenAI    = Boolean(process.env.NEXT_PUBLIC_OPENAI_API_KEY);
  const aiProvider   = hasAnthropic
    ? "Anthropic (Claude)"
    : hasOpenAI
    ? "OpenAI"
    : null;

  /* â”€â”€ AI actions â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  async function onGenerateSummary() {
    if (!aiProvider)
      return alert(
        "AI is disabled. Add NEXT_PUBLIC_ANTHROPIC_API_KEY or NEXT_PUBLIC_OPENAI_API_KEY to enable AI helpers."
      );
    setLoadingAI(true);
    try {
      const out = await generateSummary(
        [resume.name, resume.summary, resume.skills.join(", ")].join("\n")
      );
      setResume({ summary: out });
    } catch (e) {
      console.error(e);
    }
    setLoadingAI(false);
  }

  async function onRewriteBullets(expId: string) {
    const exp = resume.experiences.find((e) => e.id === expId);
    if (!exp) return;
    if (!aiProvider)
      return alert(
        "AI is disabled. Add NEXT_PUBLIC_ANTHROPIC_API_KEY or NEXT_PUBLIC_OPENAI_API_KEY to enable AI helpers."
      );
    setLoadingAI(true);
    try {
      const newBullets = await rewriteBullets(exp.bullets);
      updateExperience(expId, { bullets: newBullets });
    } catch (e) {
      console.error(e);
    }
    setLoadingAI(false);
  }

  /* â”€â”€ ATS analysis â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  const [jobDescription, setJobDescription] = useState("");
  const [analysis, setAnalysis] = useState<{
    score?: number;
    matched?: string[];
    suggestedKeywords?: string[];
    aiKeywords?: string;
    suggestedEdits?: string;
  } | null>(null);
  const [editsOpen, setEditsOpen] = useState(false);

  async function analyzeJob() {
    if (!jobDescription.trim()) return alert("Paste a job description to analyze");
    const localKeywords = suggestKeywordsFromJD(jobDescription, 20);
    const { score, matched } = scoreResume(resume, jobDescription);
    setAnalysis({ score, matched, suggestedKeywords: localKeywords });
    if (!aiProvider) return;
    setLoadingAI(true);
    try {
      const aiKeywords = await extractKeywordsFromJob(jobDescription);
      const edits = await improveKeywords(JSON.stringify(resume), jobDescription);
      setAnalysis({ score, matched, suggestedKeywords: localKeywords, aiKeywords, suggestedEdits: edits });
    } catch (e) {
      console.error(e);
    }
    setLoadingAI(false);
  }

  function applyKeywordsToSkills() {
    if (!analysis?.suggestedKeywords?.length)
      return alert("No suggested keywords to apply");
    const merged = Array.from(
      new Set([...resume.skills, ...(analysis.suggestedKeywords || [])])
    );
    setResume({ skills: merged });
  }

  function applyEditsToResume(selected: string[]) {
    if (!selected?.length) return;
    if (resume.summary?.trim()) {
      setResume({ summary: selected.join("\n\n") });
      return;
    }
    if (!resume.experiences[0]) {
      const id = uid("exp");
      addExperience({ id, title: "Edited Role", company: "", bullets: selected });
      return;
    }
    updateExperience(resume.experiences[0].id, {
      bullets: [...resume.experiences[0].bullets, ...selected],
    });
  }

  const sampleJD = `We are seeking a Senior Frontend Engineer with 5+ years of experience building React applications. Required skills: TypeScript, React, Next.js, Tailwind CSS, accessibility, performance optimization. Experience with state management (Zustand, Redux), testing, and CI/CD. Responsibilities include building features, collaborating with designers, and optimizing for SEO and accessibility.`;

  /* â”€â”€ Score helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  const scoreColor =
    !analysis?.score ? ""
    : analysis.score >= 75 ? "score-ring-good"
    : analysis.score >= 50 ? "score-ring-ok"
    : "score-ring-poor";

  /* â”€â”€ Render â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  return (
    <div>
      {/* AI status notice */}
      <div
        className={`mb-5 flex items-start gap-2.5 text-sm px-3.5 py-2.5 rounded-lg border ${
          aiProvider
            ? "bg-[var(--success-bg)] border-[#BBF7D0] text-[var(--success)]"
            : "bg-[var(--warning-bg)] border-[#FDE68A] text-[var(--warning)]"
        }`}
        role="status"
        aria-live="polite"
      >
        {aiProvider ? (
          <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" strokeWidth={2} />
        ) : (
          <Info className="w-4 h-4 mt-0.5 flex-shrink-0" strokeWidth={2} />
        )}
        <span>
          {aiProvider ? (
            <>
              <strong>{aiProvider}</strong> configured â€” AI helpers active
            </>
          ) : (
            <>
              AI features disabled.{" "}
              <span className="font-mono text-[11px]">
                Add NEXT_PUBLIC_ANTHROPIC_API_KEY or NEXT_PUBLIC_OPENAI_API_KEY
              </span>{" "}
              to enable.
            </>
          )}
        </span>
      </div>

      {/* Tab bar */}
      <div
        className="flex gap-0.5 overflow-x-auto pb-1 mb-5 border-b border-[var(--border)]"
        role="tablist"
        aria-label="Resume sections"
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tab-panel-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={`step-tab flex-shrink-0 ${activeTab === tab.id ? "active" : ""}`}
          >
            <tab.icon className="w-3.5 h-3.5" strokeWidth={1.75} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* â”€â”€â”€ Personal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {activeTab === "personal" && (
        <div id="tab-panel-personal" role="tabpanel">
          <SectionCard title="Personal Information">
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <FieldLabel htmlFor="name">Full Name <span className="text-[var(--accent)]">*</span></FieldLabel>
                <input
                  id="name"
                  className="field"
                  placeholder="e.g. Alex Johnson"
                  value={resume.name}
                  onChange={(e) => setResume({ name: e.target.value })}
                />
              </div>
              <div>
                <FieldLabel htmlFor="title">Professional Title</FieldLabel>
                <input
                  id="title"
                  className="field"
                  placeholder="e.g. Senior Software Engineer"
                  value={resume.professionalTitle || ""}
                  onChange={(e) => setResume({ professionalTitle: e.target.value })}
                />
              </div>
              <div>
                <FieldLabel htmlFor="email">Email <span className="text-[var(--accent)]">*</span></FieldLabel>
                <input
                  id="email"
                  type="email"
                  className="field"
                  placeholder="alex@example.com"
                  value={resume.email || ""}
                  onChange={(e) => setResume({ email: e.target.value })}
                />
              </div>
              <div>
                <FieldLabel htmlFor="phone">Phone</FieldLabel>
                <input
                  id="phone"
                  type="tel"
                  className="field"
                  placeholder="+1 (555) 000-0000"
                  value={resume.phone || ""}
                  onChange={(e) => setResume({ phone: e.target.value })}
                />
              </div>
              <div>
                <FieldLabel htmlFor="location">Location</FieldLabel>
                <input
                  id="location"
                  className="field"
                  placeholder="San Francisco, CA"
                  value={resume.location || ""}
                  onChange={(e) => setResume({ location: e.target.value })}
                />
              </div>
              <div>
                <FieldLabel htmlFor="linkedin">LinkedIn</FieldLabel>
                <input
                  id="linkedin"
                  type="url"
                  className="field"
                  placeholder="linkedin.com/in/yourname"
                  value={resume.linkedin || ""}
                  onChange={(e) => setResume({ linkedin: e.target.value })}
                />
              </div>
              <div>
                <FieldLabel htmlFor="github">GitHub</FieldLabel>
                <input
                  id="github"
                  type="url"
                  className="field"
                  placeholder="github.com/yourhandle"
                  value={resume.github || ""}
                  onChange={(e) => setResume({ github: e.target.value })}
                />
              </div>
              <div>
                <FieldLabel htmlFor="portfolio">Portfolio</FieldLabel>
                <input
                  id="portfolio"
                  type="url"
                  className="field"
                  placeholder="yoursite.com"
                  value={resume.portfolio || ""}
                  onChange={(e) => setResume({ portfolio: e.target.value })}
                />
              </div>
            </div>
          </SectionCard>

          {/* Actions */}
          <div className="mt-5 flex flex-wrap gap-2.5">
            <button onClick={saveToLocal} className="btn btn-success flex items-center gap-1.5">
              <Save className="w-4 h-4" strokeWidth={1.75} />
              Save
            </button>
            <button
              onClick={() => navigator.clipboard?.writeText(JSON.stringify(resume, null, 2))}
              className="btn btn-secondary flex items-center gap-1.5"
            >
              <Copy className="w-4 h-4" strokeWidth={1.75} />
              Copy JSON
            </button>
            <button
              onClick={async () => {
                const el = document.getElementById("resume-preview");
                if (!el) return alert("Preview element not found");
                try {
                  await exportToPdf(el as HTMLElement, `${resume.name || "resume"}.pdf`);
                } catch (err) {
                  console.error(err);
                  alert("Failed to export PDF. See console for details.");
                }
              }}
              className="btn btn-primary flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" strokeWidth={1.75} />
              Export PDF
            </button>
          </div>
        </div>
      )}

      {/* â”€â”€â”€ Summary â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {activeTab === "summary" && (
        <div id="tab-panel-summary" role="tabpanel">
          <SectionCard title="Professional Summary">
            <p className="text-xs text-[var(--text-4)] mb-3 leading-relaxed">
              3â€“4 lines: career focus Â· key skills Â· years of experience Â· target role.
              Keep it specific, avoid buzzwords.
            </p>
            <FieldLabel htmlFor="summary">Summary</FieldLabel>
            <textarea
              id="summary"
              className="field h-28"
              placeholder="Experienced Full-Stack Developer with 5+ years building scalable web applications at high-growth startupsâ€¦"
              value={resume.summary}
              onChange={(e) => setResume({ summary: e.target.value })}
            />
            <div className="mt-3 flex gap-2">
              <button
                onClick={onGenerateSummary}
                disabled={loadingAI}
                className="btn btn-ai flex items-center gap-1.5"
              >
                {loadingAI ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" strokeWidth={2} />
                ) : (
                  <Sparkles className="w-3.5 h-3.5" strokeWidth={1.75} />
                )}
                Generate with AI
              </button>
              <button
                onClick={() => setResume({ summary: "" })}
                className="btn btn-ghost flex items-center gap-1.5"
              >
                Clear
              </button>
            </div>
          </SectionCard>
        </div>
      )}

      {/* â”€â”€â”€ Experience â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {activeTab === "experience" && (
        <div id="tab-panel-experience" role="tabpanel">
          <SectionCard
            title="Work Experience"
            action={
              <button
                onClick={() =>
                  addExperience({
                    id: uid("exp"),
                    title: "",
                    company: "",
                    location: "",
                    startDate: "",
                    endDate: "",
                    bullets: [],
                  })
                }
                className="btn btn-secondary btn-sm flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" strokeWidth={2} />
                Add Role
              </button>
            }
          >
            {resume.experiences.length === 0 ? (
              <EmptyState label="No work experience added yet â€” click Add Role to begin" />
            ) : (
              resume.experiences.map((exp) => (
                <EntryCard key={exp.id} onRemove={() => removeExperience(exp.id)}>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <FieldLabel htmlFor={`exp-title-${exp.id}`}>Job Title *</FieldLabel>
                      <input
                        id={`exp-title-${exp.id}`}
                        className="field"
                        placeholder="Senior Product Designer"
                        value={exp.title}
                        onChange={(e) => updateExperience(exp.id, { title: e.target.value })}
                      />
                    </div>
                    <div>
                      <FieldLabel htmlFor={`exp-company-${exp.id}`}>Company *</FieldLabel>
                      <input
                        id={`exp-company-${exp.id}`}
                        className="field"
                        placeholder="Acme Corp"
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                      />
                    </div>
                    <div>
                      <FieldLabel htmlFor={`exp-loc-${exp.id}`}>Location</FieldLabel>
                      <input
                        id={`exp-loc-${exp.id}`}
                        className="field"
                        placeholder="Remote / New York, NY"
                        value={exp.location || ""}
                        onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <FieldLabel htmlFor={`exp-start-${exp.id}`}>Start</FieldLabel>
                        <input
                          id={`exp-start-${exp.id}`}
                          className="field"
                          placeholder="Jan 2022"
                          value={exp.startDate || ""}
                          onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                        />
                      </div>
                      <div>
                        <FieldLabel htmlFor={`exp-end-${exp.id}`}>End</FieldLabel>
                        <input
                          id={`exp-end-${exp.id}`}
                          className="field"
                          placeholder="Present"
                          value={exp.endDate || ""}
                          onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <FieldLabel htmlFor={`exp-bullets-${exp.id}`}>
                      Bullet points <span className="font-normal normal-case text-[var(--text-4)]">â€” one per line</span>
                    </FieldLabel>
                    <textarea
                      id={`exp-bullets-${exp.id}`}
                      className="field h-32"
                      placeholder={`â€¢ Led migration to TypeScript, reducing runtime errors by 40%\nâ€¢ Shipped redesigned checkout flow that increased conversion by 18%\nâ€¢ Mentored 3 junior engineers through weekly 1:1 sessions`}
                      value={exp.bullets.join("\n")}
                      onChange={(e) =>
                        updateExperience(exp.id, {
                          bullets: e.target.value.split("\n").filter((b) => b.trim()),
                        })
                      }
                    />
                    <div className="mt-2">
                      <button
                        onClick={() => onRewriteBullets(exp.id)}
                        disabled={loadingAI || exp.bullets.length === 0}
                        className="btn btn-ai btn-sm flex items-center gap-1.5"
                      >
                        {loadingAI ? (
                          <Loader2 className="w-3 h-3 animate-spin" strokeWidth={2} />
                        ) : (
                          <Sparkles className="w-3 h-3" strokeWidth={1.75} />
                        )}
                        Rewrite bullets with AI
                      </button>
                    </div>
                  </div>
                </EntryCard>
              ))
            )}
          </SectionCard>
        </div>
      )}

      {/* â”€â”€â”€ Education â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {activeTab === "education" && (
        <div id="tab-panel-education" role="tabpanel">
          <SectionCard
            title="Education"
            action={
              <button
                onClick={() =>
                  addEducation({
                    id: uid("edu"),
                    school: "",
                    degree: "",
                    startDate: "",
                    endDate: "",
                    gpa: "",
                  })
                }
                className="btn btn-secondary btn-sm flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" strokeWidth={2} />
                Add Education
              </button>
            }
          >
            {resume.education.length === 0 ? (
              <EmptyState label="No education added yet" />
            ) : (
              resume.education.map((edu) => (
                <EntryCard key={edu.id} onRemove={() => removeEducation(edu.id)}>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <FieldLabel htmlFor={`edu-school-${edu.id}`}>Institution *</FieldLabel>
                      <input
                        id={`edu-school-${edu.id}`}
                        className="field"
                        placeholder="MIT"
                        value={edu.school}
                        onChange={(e) => updateEducation(edu.id, { school: e.target.value })}
                      />
                    </div>
                    <div>
                      <FieldLabel htmlFor={`edu-degree-${edu.id}`}>Degree</FieldLabel>
                      <input
                        id={`edu-degree-${edu.id}`}
                        className="field"
                        placeholder="BS Computer Science"
                        value={edu.degree || ""}
                        onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                      />
                    </div>
                    <div>
                      <FieldLabel htmlFor={`edu-start-${edu.id}`}>Start Year</FieldLabel>
                      <input
                        id={`edu-start-${edu.id}`}
                        className="field"
                        placeholder="2018"
                        value={edu.startDate || ""}
                        onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                      />
                    </div>
                    <div>
                      <FieldLabel htmlFor={`edu-end-${edu.id}`}>Graduation Year</FieldLabel>
                      <input
                        id={`edu-end-${edu.id}`}
                        className="field"
                        placeholder="2022"
                        value={edu.endDate || ""}
                        onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                      />
                    </div>
                    <div>
                      <FieldLabel htmlFor={`edu-gpa-${edu.id}`}>GPA</FieldLabel>
                      <input
                        id={`edu-gpa-${edu.id}`}
                        className="field"
                        placeholder="3.8 / 4.0 (optional)"
                        value={edu.gpa || ""}
                        onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })}
                      />
                    </div>
                  </div>
                </EntryCard>
              ))
            )}
          </SectionCard>
        </div>
      )}

      {/* â”€â”€â”€ Skills â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {activeTab === "skills" && (
        <div id="tab-panel-skills" role="tabpanel">
          <SectionCard title="Skills">
            <p className="text-xs text-[var(--text-4)] mb-3 leading-relaxed">
              Separate with commas. Group by type:{" "}
              <em>Technical Â· Tools Â· Frameworks Â· Soft Skills</em>
            </p>
            <FieldLabel htmlFor="skills-input">Skills (comma-separated)</FieldLabel>
            <input
              id="skills-input"
              className="field"
              placeholder="TypeScript, React, Next.js, Node.js, System Design, Team Leadership"
              value={resume.skills.join(", ")}
              onChange={(e) =>
                setResume({
                  skills: e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
            />
            {resume.skills.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {resume.skills.map((skill, i) => (
                  <span key={i} className="badge badge-blue">
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </SectionCard>
        </div>
      )}

      {/* â”€â”€â”€ Projects â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {activeTab === "projects" && (
        <div id="tab-panel-projects" role="tabpanel">
          <SectionCard
            title="Projects"
            action={
              <button
                onClick={() =>
                  addProject({
                    id: uid("proj"),
                    name: "",
                    description: "",
                    techStack: "",
                    outcome: "",
                    link: "",
                  })
                }
                className="btn btn-secondary btn-sm flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" strokeWidth={2} />
                Add Project
              </button>
            }
          >
            <p className="text-xs text-[var(--text-4)] mb-3">
              Especially important for early-career candidates and tech roles.
            </p>
            {resume.projects.length === 0 ? (
              <EmptyState label="No projects added yet" />
            ) : (
              resume.projects.map((proj) => (
                <EntryCard key={proj.id} onRemove={() => removeProject(proj.id)}>
                  <div>
                    <FieldLabel htmlFor={`proj-name-${proj.id}`}>Project Name *</FieldLabel>
                    <input
                      id={`proj-name-${proj.id}`}
                      className="field"
                      placeholder="AI Resume Builder"
                      value={proj.name}
                      onChange={(e) => updateProject(proj.id, { name: e.target.value })}
                    />
                  </div>
                  <div>
                    <FieldLabel htmlFor={`proj-desc-${proj.id}`}>Description</FieldLabel>
                    <textarea
                      id={`proj-desc-${proj.id}`}
                      className="field h-20"
                      placeholder="What it does and why it matters"
                      value={proj.description || ""}
                      onChange={(e) => updateProject(proj.id, { description: e.target.value })}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <FieldLabel htmlFor={`proj-tech-${proj.id}`}>Tech Stack</FieldLabel>
                      <input
                        id={`proj-tech-${proj.id}`}
                        className="field"
                        placeholder="React, Node.js, MongoDB"
                        value={proj.techStack || ""}
                        onChange={(e) => updateProject(proj.id, { techStack: e.target.value })}
                      />
                    </div>
                    <div>
                      <FieldLabel htmlFor={`proj-outcome-${proj.id}`}>Outcome</FieldLabel>
                      <input
                        id={`proj-outcome-${proj.id}`}
                        className="field"
                        placeholder="1,000+ users, featured on HN"
                        value={proj.outcome || ""}
                        onChange={(e) => updateProject(proj.id, { outcome: e.target.value })}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <FieldLabel htmlFor={`proj-link-${proj.id}`}>Link</FieldLabel>
                      <input
                        id={`proj-link-${proj.id}`}
                        type="url"
                        className="field"
                        placeholder="github.com/user/project"
                        value={proj.link || ""}
                        onChange={(e) => updateProject(proj.id, { link: e.target.value })}
                      />
                    </div>
                  </div>
                </EntryCard>
              ))
            )}
          </SectionCard>
        </div>
      )}

      {/* â”€â”€â”€ More (optional sections) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {activeTab === "more" && (
        <div id="tab-panel-more" role="tabpanel" className="space-y-4">

          {/* Certifications */}
          <SectionCard
            title="Certifications"
            action={
              <button
                onClick={() =>
                  addCertification({ id: uid("cert"), name: "", issuer: "", year: "", link: "" })
                }
                className="btn btn-secondary btn-sm flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" strokeWidth={2} />
                Add
              </button>
            }
          >
            {resume.certifications.length === 0 ? (
              <EmptyState label="No certifications added yet" />
            ) : (
              resume.certifications.map((cert) => (
                <EntryCard key={cert.id} onRemove={() => removeCertification(cert.id)}>
                  <div className="grid md:grid-cols-3 gap-3">
                    <div className="md:col-span-2">
                      <FieldLabel htmlFor={`cert-name-${cert.id}`}>Certification Name *</FieldLabel>
                      <input
                        id={`cert-name-${cert.id}`}
                        className="field"
                        placeholder="AWS Certified Solutions Architect"
                        value={cert.name}
                        onChange={(e) => updateCertification(cert.id, { name: e.target.value })}
                      />
                    </div>
                    <div>
                      <FieldLabel htmlFor={`cert-year-${cert.id}`}>Year</FieldLabel>
                      <input
                        id={`cert-year-${cert.id}`}
                        className="field"
                        placeholder="2024"
                        value={cert.year || ""}
                        onChange={(e) => updateCertification(cert.id, { year: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3 mt-3">
                    <div>
                      <FieldLabel htmlFor={`cert-issuer-${cert.id}`}>Issuer *</FieldLabel>
                      <input
                        id={`cert-issuer-${cert.id}`}
                        className="field"
                        placeholder="Amazon Web Services"
                        value={cert.issuer}
                        onChange={(e) => updateCertification(cert.id, { issuer: e.target.value })}
                      />
                    </div>
                    <div>
                      <FieldLabel htmlFor={`cert-link-${cert.id}`}>Verify URL</FieldLabel>
                      <input
                        id={`cert-link-${cert.id}`}
                        type="url"
                        className="field"
                        placeholder="credly.com/badges/â€¦"
                        value={cert.link || ""}
                        onChange={(e) => updateCertification(cert.id, { link: e.target.value })}
                      />
                    </div>
                  </div>
                </EntryCard>
              ))
            )}
          </SectionCard>

          {/* Achievements */}
          <SectionCard
            title="Achievements & Awards"
            action={
              <button
                onClick={() =>
                  addAchievement({ id: uid("ach"), title: "", description: "", year: "" })
                }
                className="btn btn-secondary btn-sm flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" strokeWidth={2} />
                Add
              </button>
            }
          >
            {resume.achievements.length === 0 ? (
              <EmptyState label="No achievements added yet" />
            ) : (
              resume.achievements.map((ach) => (
                <EntryCard key={ach.id} onRemove={() => removeAchievement(ach.id)}>
                  <div className="grid md:grid-cols-3 gap-3">
                    <div className="md:col-span-2">
                      <FieldLabel htmlFor={`ach-title-${ach.id}`}>Title *</FieldLabel>
                      <input
                        id={`ach-title-${ach.id}`}
                        className="field"
                        placeholder="1st Place â€” HackMIT 2024"
                        value={ach.title}
                        onChange={(e) => updateAchievement(ach.id, { title: e.target.value })}
                      />
                    </div>
                    <div>
                      <FieldLabel htmlFor={`ach-year-${ach.id}`}>Year</FieldLabel>
                      <input
                        id={`ach-year-${ach.id}`}
                        className="field"
                        placeholder="2024"
                        value={ach.year || ""}
                        onChange={(e) => updateAchievement(ach.id, { year: e.target.value })}
                      />
                    </div>
                    <div className="md:col-span-3">
                      <FieldLabel htmlFor={`ach-desc-${ach.id}`}>Description</FieldLabel>
                      <textarea
                        id={`ach-desc-${ach.id}`}
                        className="field h-16"
                        placeholder="Brief description of the achievement"
                        value={ach.description || ""}
                        onChange={(e) => updateAchievement(ach.id, { description: e.target.value })}
                      />
                    </div>
                  </div>
                </EntryCard>
              ))
            )}
          </SectionCard>

          {/* Languages */}
          <SectionCard
            title="Languages"
            action={
              <button
                onClick={() =>
                  addLanguage({ id: uid("lang"), name: "", proficiency: "Professional" })
                }
                className="btn btn-secondary btn-sm flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" strokeWidth={2} />
                Add
              </button>
            }
          >
            {resume.languages.length === 0 ? (
              <EmptyState label="No languages added yet" />
            ) : (
              resume.languages.map((lang) => (
                <EntryCard key={lang.id} onRemove={() => removeLanguage(lang.id)}>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <FieldLabel htmlFor={`lang-name-${lang.id}`}>Language *</FieldLabel>
                      <input
                        id={`lang-name-${lang.id}`}
                        className="field"
                        placeholder="Spanish"
                        value={lang.name}
                        onChange={(e) => updateLanguage(lang.id, { name: e.target.value })}
                      />
                    </div>
                    <div>
                      <FieldLabel htmlFor={`lang-prof-${lang.id}`}>Proficiency</FieldLabel>
                      <select
                        id={`lang-prof-${lang.id}`}
                        className="field"
                        value={lang.proficiency}
                        onChange={(e) => updateLanguage(lang.id, { proficiency: e.target.value })}
                      >
                        <option>Native</option>
                        <option>Fluent</option>
                        <option>Professional</option>
                        <option>Intermediate</option>
                        <option>Basic</option>
                      </select>
                    </div>
                  </div>
                </EntryCard>
              ))
            )}
          </SectionCard>

          {/* Publications */}
          <SectionCard
            title="Publications"
            action={
              <button
                onClick={() =>
                  addPublication({ id: uid("pub"), title: "", publisher: "", year: "", link: "" })
                }
                className="btn btn-secondary btn-sm flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" strokeWidth={2} />
                Add
              </button>
            }
          >
            {resume.publications.length === 0 ? (
              <EmptyState label="No publications added yet â€” for academic / research roles" />
            ) : (
              resume.publications.map((pub) => (
                <EntryCard key={pub.id} onRemove={() => removePublication(pub.id)}>
                  <div>
                    <FieldLabel htmlFor={`pub-title-${pub.id}`}>Title *</FieldLabel>
                    <input
                      id={`pub-title-${pub.id}`}
                      className="field"
                      placeholder="Deep Learning for RÃ©sumÃ© Parsing"
                      value={pub.title}
                      onChange={(e) => updatePublication(pub.id, { title: e.target.value })}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-3 mt-3">
                    <div>
                      <FieldLabel htmlFor={`pub-publisher-${pub.id}`}>Publisher / Conference</FieldLabel>
                      <input
                        id={`pub-publisher-${pub.id}`}
                        className="field"
                        placeholder="NeurIPS 2024"
                        value={pub.publisher || ""}
                        onChange={(e) => updatePublication(pub.id, { publisher: e.target.value })}
                      />
                    </div>
                    <div>
                      <FieldLabel htmlFor={`pub-year-${pub.id}`}>Year</FieldLabel>
                      <input
                        id={`pub-year-${pub.id}`}
                        className="field"
                        placeholder="2024"
                        value={pub.year || ""}
                        onChange={(e) => updatePublication(pub.id, { year: e.target.value })}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <FieldLabel htmlFor={`pub-link-${pub.id}`}>DOI / Link</FieldLabel>
                      <input
                        id={`pub-link-${pub.id}`}
                        type="url"
                        className="field"
                        placeholder="doi.org/10.48550/â€¦"
                        value={pub.link || ""}
                        onChange={(e) => updatePublication(pub.id, { link: e.target.value })}
                      />
                    </div>
                  </div>
                </EntryCard>
              ))
            )}
          </SectionCard>

          {/* Volunteer Experience */}
          <SectionCard
            title="Volunteer Experience"
            action={
              <button
                onClick={() =>
                  addVolunteerExperience({
                    id: uid("vol"),
                    role: "",
                    organization: "",
                    startDate: "",
                    endDate: "",
                    description: "",
                  })
                }
                className="btn btn-secondary btn-sm flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" strokeWidth={2} />
                Add
              </button>
            }
          >
            {resume.volunteerExperiences.length === 0 ? (
              <EmptyState label="No volunteer experience added yet" />
            ) : (
              resume.volunteerExperiences.map((vol) => (
                <EntryCard key={vol.id} onRemove={() => removeVolunteerExperience(vol.id)}>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <FieldLabel htmlFor={`vol-role-${vol.id}`}>Role *</FieldLabel>
                      <input
                        id={`vol-role-${vol.id}`}
                        className="field"
                        placeholder="Lead Mentor"
                        value={vol.role}
                        onChange={(e) => updateVolunteerExperience(vol.id, { role: e.target.value })}
                      />
                    </div>
                    <div>
                      <FieldLabel htmlFor={`vol-org-${vol.id}`}>Organization *</FieldLabel>
                      <input
                        id={`vol-org-${vol.id}`}
                        className="field"
                        placeholder="Code.org"
                        value={vol.organization}
                        onChange={(e) =>
                          updateVolunteerExperience(vol.id, { organization: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <FieldLabel htmlFor={`vol-start-${vol.id}`}>Start</FieldLabel>
                      <input
                        id={`vol-start-${vol.id}`}
                        className="field"
                        placeholder="Jan 2023"
                        value={vol.startDate || ""}
                        onChange={(e) =>
                          updateVolunteerExperience(vol.id, { startDate: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <FieldLabel htmlFor={`vol-end-${vol.id}`}>End</FieldLabel>
                      <input
                        id={`vol-end-${vol.id}`}
                        className="field"
                        placeholder="Present"
                        value={vol.endDate || ""}
                        onChange={(e) =>
                          updateVolunteerExperience(vol.id, { endDate: e.target.value })
                        }
                      />
                    </div>
                    <div className="md:col-span-2">
                      <FieldLabel htmlFor={`vol-desc-${vol.id}`}>Description</FieldLabel>
                      <textarea
                        id={`vol-desc-${vol.id}`}
                        className="field h-20"
                        placeholder="What you did and the impact you made"
                        value={vol.description || ""}
                        onChange={(e) =>
                          updateVolunteerExperience(vol.id, { description: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </EntryCard>
              ))
            )}
          </SectionCard>
        </div>
      )}

      {/* â”€â”€â”€ ATS Match â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {activeTab === "ats" && (
        <div id="tab-panel-ats" role="tabpanel" className="space-y-4">
          <SectionCard title="Job Description Analysis">
            <p className="text-xs text-[var(--text-4)] mb-3 leading-relaxed">
              Paste a job description to receive keyword gap analysis, an ATS
              match score, and AI-generated suggestions tailored to the role.
            </p>
            <FieldLabel htmlFor="job-description">Job Description</FieldLabel>
            <textarea
              id="job-description"
              className="field h-40"
              placeholder="Paste the full job description hereâ€¦"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />

            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={analyzeJob}
                disabled={loadingAI || !jobDescription.trim()}
                className="btn btn-primary flex items-center gap-1.5"
              >
                {loadingAI ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" strokeWidth={2} />
                ) : (
                  <Target className="w-3.5 h-3.5" strokeWidth={1.75} />
                )}
                Analyze match
              </button>
              <button
                onClick={applyKeywordsToSkills}
                disabled={!analysis?.suggestedKeywords?.length}
                className="btn btn-secondary flex items-center gap-1.5"
              >
                Apply keywords to skills
              </button>
              <button
                onClick={() => setJobDescription(sampleJD)}
                className="btn btn-ghost flex items-center gap-1.5 text-xs"
              >
                Load sample JD
              </button>
              {analysis?.suggestedEdits && (
                <button
                  onClick={() => setEditsOpen(true)}
                  className="btn btn-ai flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" strokeWidth={1.75} />
                  View suggested edits
                </button>
              )}
            </div>
          </SectionCard>

          {/* Analysis results */}
          {analysis && (
            <div className="space-y-3">
              {/* Score */}
              <div className="editor-section flex items-center gap-5">
                <div
                  className={`score-ring flex-shrink-0 ${scoreColor}`}
                  aria-label={`ATS score: ${analysis.score}`}
                >
                  <span className="text-[15px] font-bold text-[var(--text-1)]">
                    {analysis.score}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-[var(--text-1)]">
                    ATS Match Score
                  </div>
                  <div className="text-xs text-[var(--text-4)] mt-0.5">
                    {analysis.score && analysis.score >= 75
                      ? "Strong match â€” keep it up"
                      : analysis.score && analysis.score >= 50
                      ? "Moderate match â€” add more keywords"
                      : "Low match â€” review the suggestions below"}
                  </div>
                </div>
              </div>

              {/* Matched keywords */}
              {analysis.matched && analysis.matched.length > 0 && (
                <div className="editor-section">
                  <div className="editor-section-title flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--success)]" strokeWidth={2} />
                    Matched Keywords
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {analysis.matched.slice(0, 12).map((kw) => (
                      <span key={kw} className="badge badge-green">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggested keywords */}
              {analysis.suggestedKeywords && analysis.suggestedKeywords.length > 0 && (
                <div className="editor-section">
                  <div className="editor-section-title flex items-center gap-2">
                    <AlertCircle className="w-3.5 h-3.5 text-[var(--warning)]" strokeWidth={2} />
                    Missing Keywords to Add
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {analysis.suggestedKeywords.slice(0, 20).map((kw) => (
                      <span key={kw} className="badge badge-amber">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* AI keywords */}
              {analysis.aiKeywords && (
                <AiCard>
                  <div className="ai-card-header">
                    <Sparkles className="w-3.5 h-3.5" strokeWidth={1.75} />
                    AI-Extracted Role Keywords
                  </div>
                  <p className="text-xs text-[var(--accent-text)] leading-relaxed">
                    {analysis.aiKeywords}
                  </p>
                </AiCard>
              )}

              {/* Suggested edits indicator */}
              {analysis.suggestedEdits && (
                <div className="ai-card flex items-center justify-between">
                  <div className="ai-card-header mb-0">
                    <Sparkles className="w-3.5 h-3.5" strokeWidth={1.75} />
                    AI has suggested content edits
                  </div>
                  <button
                    onClick={() => setEditsOpen(true)}
                    className="btn btn-ai btn-sm flex items-center gap-1.5"
                  >
                    Review edits
                    <ChevronRight className="w-3.5 h-3.5" strokeWidth={2} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Edits modal */}
      <EditsModal
        open={editsOpen}
        onClose={() => setEditsOpen(false)}
        edits={(analysis?.suggestedEdits || "")
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean)}
        onApply={applyEditsToResume}
      />
    </div>
  );
}
