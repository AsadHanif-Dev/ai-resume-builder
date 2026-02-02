import React from 'react'

export default function PricingPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold">Pricing</h2>
      <div className="mt-6">
        <div className="p-6 border rounded bg-white dark:bg-zinc-800">
          <h3 className="font-medium">Free</h3>
          <p className="text-sm mt-2">All core features are free: local editing, templates, live preview, save to browser, and PDF export. AI helpers can be used with your own API key (optional).</p>
        </div>
      </div>
    </div>
  )
}
