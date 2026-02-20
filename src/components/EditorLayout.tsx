"use client"
import React from "react";
import TemplateSelector from "./TemplateSelector";

export default function EditorLayout({
  children,
  preview,
}: {
  children: React.ReactNode;
  preview: React.ReactNode;
}) {
  return (
    <div
      className="flex bg-[var(--bg)]"
      style={{ minHeight: "calc(100vh - 3.5rem)" }}
    >
      {/* ── Editor pane ─────────────────────────────────── */}
      <div
        className="flex-1 overflow-y-auto border-r border-[var(--border)]"
        style={{ maxHeight: "calc(100vh - 3.5rem)" }}
      >
        {/* Toolbar */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-[var(--border)] px-6 py-3 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-[0.9375rem] font-semibold text-[var(--text-1)] leading-tight tracking-tight">
              Resume Builder
            </h1>
            <p className="text-[11px] text-[var(--text-4)] leading-tight mt-0.5">
              Changes save automatically to your browser
            </p>
          </div>
          <div className="flex items-center gap-3">
            <TemplateSelector />
          </div>
        </div>

        {/* Form content */}
        <div className="px-6 py-6 max-w-[720px]">{children}</div>
      </div>

      {/* ── Preview pane (sticky) ────────────────────────── */}
      <aside
        className="hidden xl:flex flex-col w-[640px] flex-shrink-0 bg-[var(--surface-sunken)]"
        style={{ height: "calc(100vh - 3.5rem)", position: "sticky", top: "3.5rem" }}
        aria-label="Live resume preview"
      >
        {/* Preview header */}
        <div className="px-5 py-3 border-b border-[var(--border)] bg-white flex items-center justify-between flex-shrink-0">
          <span className="text-xs font-semibold text-[var(--text-2)]">
            Live Preview
          </span>
          <span className="badge badge-green">Real-time</span>
        </div>

        {/* Scaled resume */}
        <div className="flex-1 overflow-hidden p-5">
          <div
            className="bg-white rounded-lg border border-[var(--border)] overflow-hidden shadow-sm"
            style={{ height: "100%" }}
          >
            <div
              className="origin-top-left pointer-events-none select-none"
              style={{
                transform: "scale(0.75)",
                width: "133.5%",
                transformOrigin: "top left",
              }}
            >
              {preview}
            </div>
          </div>
        </div>

        {/* Preview footer note */}
        <p className="text-center text-[10px] text-[var(--text-4)] py-2 flex-shrink-0">
          Preview is scaled · Export PDF for full size
        </p>
      </aside>
    </div>
  );
}
