"use client"
import React, { useState } from 'react'

export default function EditsModal({ open, onClose, edits, onApply }: { open: boolean; onClose: ()=>void; edits: string[]; onApply: (selected: string[]) => void }) {
  const [checked, setChecked] = useState<boolean[]>(edits.map(()=>false))

  React.useEffect(()=>{
    setChecked(edits.map(()=>false))
  }, [open, edits])

  function toggle(i:number){
    const copy = [...checked]
    copy[i] = !copy[i]
    setChecked(copy)
  }

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-2xl bg-white dark:bg-zinc-800 rounded p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Suggested edits</h3>
          <button onClick={onClose} className="text-sm px-2">Close</button>
        </div>
        <div className="mt-4 space-y-2 max-h-72 overflow-auto">
          {edits.length === 0 && <div className="text-sm text-zinc-500">No edits suggested.</div>}
          {edits.map((e, i) => (
            <label key={i} className="flex items-start gap-2 p-2 border rounded">
              <input type="checkbox" checked={checked[i]} onChange={()=>toggle(i)} />
              <div className="text-sm">{e}</div>
            </label>
          ))}
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 rounded border">Cancel</button>
          <button onClick={()=>{ onApply(edits.filter((_,i)=>checked[i])); onClose() }} className="px-3 py-1 rounded bg-blue-600 text-white">Apply selected</button>
        </div>
      </div>
    </div>
  )
}
