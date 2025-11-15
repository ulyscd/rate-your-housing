// Minimal OpenRouter helper. Reads key from runtime env: import.meta.env.VITE_OPENROUTER_KEY
// This file demonstrates how to call OpenRouter from the frontend. For production
// keep keys server-side. For hackathon quick demo, you can set VITE_OPENROUTER_KEY in .env

export async function callOpenRouter(prompt) {
  // If you prefer to keep your key server-side, run the provided proxy and set
  // VITE_OPENROUTER_PROXY=true in your client .env. That will POST to /api/openrouter.
  const useProxy = import.meta.env.VITE_OPENROUTER_PROXY === 'true'

  const body = {
    model: 'gpt-4o-mini',
    messages: [
      { role: 'user', content: prompt }
    ],
    max_tokens: 200
  }

  if (useProxy) {
    const resp = await fetch('/api/openrouter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })

    if (!resp.ok) {
      const t = await resp.text()
      throw new Error(`OpenRouter proxy error: ${resp.status} ${t}`)
    }
    const data = await resp.json()
    return data?.choices?.[0]?.message?.content || data
  }

  const key = import.meta.env.VITE_OPENROUTER_KEY
  if (!key) return null

  const url = 'https://openrouter.ai/v1/chat/completions'
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`
    },
    body: JSON.stringify(body)
  })

  if (!resp.ok) {
    const t = await resp.text()
    throw new Error(`OpenRouter error: ${resp.status} ${t}`)
  }

  const data = await resp.json()
  return data?.choices?.[0]?.message?.content || data
}
