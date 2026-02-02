"use client"
import React from 'react'
import { useResumeStore } from '../lib/store'
import ModernTemplate from './templates/ModernTemplate'
import MinimalTemplate from './templates/MinimalTemplate'
import ClassicTemplate from './templates/ClassicTemplate'

export default function Preview() {
  const resume = useResumeStore(s => s.resume)
  return (
    <div id="resume-preview">
      {resume.template === 'minimal' ? (
        <MinimalTemplate resume={resume} />
      ) : resume.template === 'classic' ? (
        <ClassicTemplate resume={resume} />
      ) : (
        <ModernTemplate resume={resume} />
      )}
    </div>
  )
}
