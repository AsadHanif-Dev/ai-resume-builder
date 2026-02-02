import React from 'react'
import ModernTemplate from '../../../src/components/templates/ModernTemplate'
import { DEFAULT_RESUME } from '../../../src/lib/types'

export default function TemplatesPage() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-semibold">Templates</h2>
      <div className="mt-6 grid md:grid-cols-3 gap-6">
        <div className="p-4 border rounded bg-white dark:bg-zinc-800"><ModernTemplate resume={DEFAULT_RESUME} /></div>
        <div className="p-4 border rounded bg-white dark:bg-zinc-800"><ModernTemplate resume={DEFAULT_RESUME} /></div>
        <div className="p-4 border rounded bg-white dark:bg-zinc-800"><ModernTemplate resume={DEFAULT_RESUME} /></div>
      </div>
    </div>
  )
}
