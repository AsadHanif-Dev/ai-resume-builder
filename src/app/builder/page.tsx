import React from 'react'
import EditorLayout from '../../../src/components/EditorLayout'
import ResumeEditor from '../../../src/components/ResumeEditor'
import Preview from '../../../src/components/Preview'

export default function BuilderPage() {
  return (
    <EditorLayout preview={<Preview />}>
      <div>
        <ResumeEditor />
      </div>
    </EditorLayout>
  )
}
