"use client"
import React, { useEffect } from 'react'
import { useResumeStore } from '@/lib/store'
import { formatDate } from '@/lib/utils'

export default function DashboardPage() {
  const savedResumes = useResumeStore(s => s.savedResumes)
  const loadVersion = useResumeStore(s => s.loadVersion)
  const deleteVersion = useResumeStore(s => s.deleteVersion)
  const loadSavedResumes = useResumeStore(s => s.loadSavedResumes)
  
  useEffect(() => {
    loadSavedResumes()
  }, [loadSavedResumes])

  const handleLoad = (id: string) => {
    loadVersion(id)
    window.location.href = '/builder'
  }

  const handleDelete = (id: string) => {
    if (confirm('Delete this resume version?')) {
      deleteVersion(id)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <header className="border-b bg-white dark:bg-zinc-800">
        <div className="max-w-7xl mx-auto p-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">My Resumes</h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              Manage your saved resume versions
            </p>
          </div>
          <div className="flex gap-3">
            <a href="/builder" className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">
              Create New
            </a>
            <a href="/" className="px-4 py-2 rounded-md border hover:bg-zinc-100 dark:hover:bg-zinc-700">
              Home
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {savedResumes.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📄</div>
            <h3 className="text-xl font-semibold mb-2">No saved resumes yet</h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">
              Create your first resume in the builder and save it to see it here.
            </p>
            <a href="/builder" className="px-6 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700">
              Go to Builder
            </a>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedResumes.map(resume => (
              <div
                key={resume.id}
                className="bg-white dark:bg-zinc-800 border rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{resume.name}</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      {resume.experiences[0]?.title || 'No title'}
                    </p>
                  </div>
                  <span className="px-2 py-1 text-xs rounded-md bg-zinc-100 dark:bg-zinc-700">
                    {resume.template}
                  </span>
                </div>

                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {resume.experiences.length} experience{resume.experiences.length !== 1 ? 's' : ''}
                  </div>
                  <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {resume.skills.length} skills
                  </div>
                  <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Saved {formatDate(resume.savedAt)}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleLoad(resume.id)}
                    className="flex-1 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm"
                  >
                    Open
                  </button>
                  <button
                    onClick={() => handleDelete(resume.id)}
                    className="px-4 py-2 rounded-md border border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-950 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
