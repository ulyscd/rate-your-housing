import React, { useState } from 'react'
import { callOpenRouter } from '../utils/openrouter'

export default function Home() {
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [list, setList] = useState([])

  const addRating = async (e) => {
    e.preventDefault()
    if (!address) return
    const item = { id: Date.now(), address, notes }
    setList([item, ...list])

    // Example: call OpenRouter for a tiny summary/safety check (no key -> no-op)
    try {
      const resp = await callOpenRouter(`Summarize positives for ${address}: ${notes}`)
      if (resp) console.log('OpenRouter response:', resp)
    } catch (err) {
      console.warn('OpenRouter helper error (check .env):', err.message)
    }

    setAddress('')
    setNotes('')
  }

  return (
    <div>
      <form onSubmit={addRating} className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-slate-700">Address</label>
          <input value={address} onChange={e => setAddress(e.target.value)} className="mt-1 block w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Notes</label>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} className="mt-1 block w-full p-2 border rounded" />
        </div>
        <div>
          <button className="px-4 py-2 bg-sky-600 text-white rounded">Add rating</button>
        </div>
      </form>

      <section>
        <h2 className="text-lg font-medium mb-2">Recent ratings</h2>
        {list.length === 0 && <p className="text-sm text-slate-500">No ratings yet — add one above.</p>}
        <ul className="space-y-3">
          {list.map(item => (
            <li key={item.id} className="p-3 border rounded bg-slate-50">
              <div className="font-semibold">{item.address}</div>
              <div className="text-sm text-slate-600">{item.notes}</div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
