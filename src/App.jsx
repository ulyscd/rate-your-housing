import React from 'react'
import Home from './pages/Home'

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow p-6">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">Quack — Rate your housing</h1>
          <p className="text-sm text-slate-500">Hackathon starter — collaborative React + Tailwind (CDN)</p>
        </header>
        <main>
          <Home />
        </main>
      </div>
    </div>
  )
}
