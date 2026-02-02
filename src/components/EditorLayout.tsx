"use client"
import React from 'react'
import TemplateSelector from './TemplateSelector'

export default function EditorLayout({ children, preview }: { children: React.ReactNode; preview: React.ReactNode }) {
  return (
    <div className="min-h-[70vh] p-8 bg-transparent">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 glass futuristic-shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-2xl text-cyan-400 tracking-wide drop-shadow-lg">Resume Builder</h3>
            <TemplateSelector />
          </div>
          {children}
        </div>
        <aside className="glass futuristic-shadow p-6">
          <h4 className="font-semibold text-lg text-cyan-400 mb-2">Live Preview</h4>
          <div className="mt-2">{preview}</div>
        </aside>
      </div>
    </div>
  )
}
