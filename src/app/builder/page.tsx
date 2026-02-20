import React from 'react'
import EditorLayout from '../../components/EditorLayout'
import ResumeEditor from '../../components/ResumeEditor'
import Preview from '../../components/Preview'

export default function BuilderPage() {
  return (
    <EditorLayout preview={<Preview />}>
      <div>
        <ResumeEditor />
      </div>
    </EditorLayout>
  )
}
