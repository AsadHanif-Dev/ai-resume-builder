import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { FileText } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Resume.ai — AI-Powered Resume Builder",
  description:
    "Build an ATS-optimized Resume in minutes with AI-powered writing assistance, professional templates, and one-click PDF export. Free, no signup required.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* ── Navigation ──────────────────────────────────── */}
        <header className="sticky top-0 z-50 h-14 bg-white/[0.97] backdrop-blur-sm border-b border-[var(--border)]">
          <div className="max-w-7xl w-full mx-auto px-6 h-full flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-[var(--text-1)] hover:opacity-80 transition-opacity"
              aria-label="Resume.ai home"
            >
              <FileText className="w-[1.125rem] h-[1.125rem] text-[var(--accent)]" strokeWidth={1.75} />
              <span className="text-[0.9375rem] font-semibold tracking-tight leading-none">
                Resume<span className="text-[var(--accent)]">.</span>ai
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-0.5" aria-label="Main navigation">
              <Link href="/builder"   className="step-tab">Builder</Link>
              <Link href="/templates" className="step-tab">Templates</Link>
              <Link href="/pricing"   className="step-tab">Pricing</Link>
            </nav>

            <Link href="/builder" className="btn btn-primary btn-sm">
              Start Building
            </Link>
          </div>
        </header>

        {/* ── Page content ────────────────────────────────── */}
        <main>{children}</main>

        {/* ── Footer ──────────────────────────────────────── */}
        <footer className="border-t border-[var(--border)] bg-white">
          <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2 text-[var(--text-2)]">
              <FileText className="w-4 h-4 text-[var(--accent)]" strokeWidth={1.75} />
              <span className="text-sm font-semibold tracking-tight">
                Resume<span className="text-[var(--accent)]">.</span>ai
              </span>
            </Link>

            <p className="text-xs text-[var(--text-4)] order-last md:order-none">
              © {new Date().getFullYear()} Resume.ai · Built with Next.js, Tailwind CSS &amp; OpenAI
            </p>

            <nav className="flex items-center gap-5" aria-label="Footer navigation">
              <Link href="/builder"   className="text-xs text-[var(--text-3)] hover:text-[var(--text-1)] transition-colors">Builder</Link>
              <Link href="/templates" className="text-xs text-[var(--text-3)] hover:text-[var(--text-1)] transition-colors">Templates</Link>
              <Link href="/pricing"   className="text-xs text-[var(--text-3)] hover:text-[var(--text-1)] transition-colors">Pricing</Link>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
