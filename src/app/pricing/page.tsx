import React from "react";
import Link from "next/link";
import { Check, Zap } from "lucide-react";

type Tier = {
  name: string;
  price: string;
  period: string;
  description: string;
  cta: string;
  href: string;
  featured: boolean;
  features: string[];
};

const tiers: Tier[] = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    description:
      "All core features included. Bring your own API key for AI features.",
    cta: "Get started free",
    href: "/builder",
    featured: false,
    features: [
      "Unlimited resume builds",
      "All 3 professional templates",
      "PDF export",
      "Browser-local storage",
      "ATS keyword scoring",
      "AI features (BYO API key)",
    ],
  },
  {
    name: "Pro",
    price: "$12",
    period: "/ month",
    description:
      "Managed AI with no API key required, version history, and cover letter generation.",
    cta: "Start free trial",
    href: "/builder",
    featured: true,
    features: [
      "Everything in Starter",
      "Managed AI — no API key needed",
      "Unlimited AI bullet rewrites",
      "Resume version history",
      "Cover letter generator",
      "Priority support",
    ],
  },
  {
    name: "Teams",
    price: "$29",
    period: "/ seat / month",
    description:
      "For career coaches and recruiting teams who manage multiple candidates.",
    cta: "Contact sales",
    href: "mailto:hello@resume.ai",
    featured: false,
    features: [
      "Everything in Pro",
      "Up to 20 team seats",
      "Team management dashboard",
      "Bulk PDF export",
      "Custom branded templates",
      "Dedicated account manager",
    ],
  },
];

const faqs = [
  {
    q: "Do I need a credit card for Starter?",
    a: "No. Starter is permanently free — no card, no trial period, no expiry.",
  },
  {
    q: "What does 'BYO API key' mean?",
    a: "You can use your own OpenAI or Anthropic API key to unlock AI features at no extra cost beyond your API usage.",
  },
  {
    q: "Is my resume data stored on your servers?",
    a: "On Starter, everything stays in your browser's local storage. Pro plans optionally sync to our servers for cross-device access.",
  },
  {
    q: "Can I cancel Pro at any time?",
    a: "Yes, cancel anytime — no lock-in. You keep access until the end of your billing period.",
  },
];

export default function PricingPage() {
  return (
    <div className="bg-[var(--bg)] min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-20">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[var(--accent)] mb-3">
            Pricing
          </p>
          <h1 className="text-4xl font-semibold text-[var(--text-1)] tracking-tight mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-[1.0625rem] text-[var(--text-3)] leading-relaxed max-w-[44ch] mx-auto">
            Start free. Upgrade when you need managed AI and advanced
            collaboration — no surprises.
          </p>
        </div>

        {/* Pricing grid */}
        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-xl border p-7 bg-white transition-all ${
                tier.featured
                  ? "border-[var(--accent)] shadow-[0_0_0_1px_var(--accent),0_8px_32px_rgb(37_99_235_/_0.12)] scale-[1.02]"
                  : "border-[var(--border)] shadow-[var(--shadow-xs)]"
              }`}
            >
              {/* Most popular badge */}
              {tier.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 bg-[var(--accent)] text-white text-[11px] font-semibold px-3 py-1 rounded-full shadow-md shadow-blue-600/30">
                    <Zap className="w-3 h-3" strokeWidth={2.5} />
                    Most Popular
                  </span>
                </div>
              )}

              {/* Tier info */}
              <div className="mb-7">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-3)] mb-2">
                  {tier.name}
                </h2>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-[2.25rem] font-semibold tracking-tight text-[var(--text-1)] leading-none">
                    {tier.price}
                  </span>
                  <span className="text-sm text-[var(--text-4)]">{tier.period}</span>
                </div>
                <p className="text-sm text-[var(--text-3)] leading-relaxed">
                  {tier.description}
                </p>
              </div>

              {/* Feature list */}
              <ul className="space-y-2.5 mb-8 flex-1" role="list">
                {tier.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-sm text-[var(--text-2)]">
                    <span
                      className="mt-0.5 w-4 h-4 rounded-full bg-[var(--success-bg)] border border-[#BBF7D0] flex items-center justify-center flex-shrink-0"
                      aria-hidden="true"
                    >
                      <Check className="w-2.5 h-2.5 text-[var(--success)]" strokeWidth={2.5} />
                    </span>
                    {feat}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={tier.href}
                className={`btn btn-lg w-full justify-center ${
                  tier.featured ? "btn-primary" : "btn-secondary"
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-xs text-[var(--text-4)] mb-20">
          Pro and Teams pricing is indicative — the application is currently
          free.{" "}
          <span className="font-medium text-[var(--text-3)]">
            Bring your own OpenAI or Anthropic API key for AI features at no
            extra cost.
          </span>
        </p>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold text-[var(--text-1)] tracking-tight mb-8 text-center">
            Frequently asked questions
          </h2>
          <div className="space-y-0 divide-y divide-[var(--border)]">
            {faqs.map((faq) => (
              <div key={faq.q} className="py-5">
                <h3 className="text-sm font-semibold text-[var(--text-1)] mb-1.5">
                  {faq.q}
                </h3>
                <p className="text-sm text-[var(--text-3)] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
