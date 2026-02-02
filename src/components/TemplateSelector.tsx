"use client"
import React from 'react'
import { useResumeStore } from '../lib/store'

const templates = [
  {
    id: 'modern' as const,
    name: 'Modern',
    description: 'Clean design with blue accents',
    preview: '🎨'
  },
  {
    id: 'minimal' as const,
    name: 'Minimal',
    description: 'Elegant simplicity',
    preview: '✨'
  },
  {
    id: 'classic' as const,
    name: 'Classic',
    description: 'Traditional professional',
    preview: '📋'
  }
]

export default function TemplateSelector() {
  const template = useResumeStore(s => s.resume.template)
  const setResume = useResumeStore(s => s.setResume)

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Template:</label>
      <div className="grid grid-cols-3 gap-2">
        {templates.map(t => (
          <button
            key={t.id}
            onClick={() => setResume({ template: t.id })}
            className={`p-3 rounded-lg border-2 text-center transition-all ${
              template === t.id
                ? 'border-blue-600 bg-blue-50 dark:bg-blue-950'
                : 'border-zinc-200 hover:border-zinc-300'
            }`}
          >
            <div className="text-2xl mb-1">{t.preview}</div>
            <div className="font-medium text-xs">{t.name}</div>
            <div className="text-[10px] text-zinc-600 dark:text-zinc-400">{t.description}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
