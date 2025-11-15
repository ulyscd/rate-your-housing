import express from 'express'
import fetch from 'node-fetch'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())

// Simple proxy endpoint that forwards a prompt to OpenRouter.
// Keep your OPENROUTER_KEY in the server's .env (not in client).
app.post('/api/openrouter', async (req, res) => {
  const key = process.env.OPENROUTER_KEY
  if (!key) {
    return res.status(500).json({ error: 'OPENROUTER_KEY not configured on server' })
  }

  try {
    const response = await fetch('https://openrouter.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      },
      body: JSON.stringify(req.body)
    })

    const data = await response.json()
    res.status(response.status).json(data)
  } catch (err) {
    console.error('proxy error', err)
    res.status(500).json({ error: err.message })
  }
})

app.listen(PORT, () => {
  console.log(`OpenRouter proxy server listening on http://localhost:${PORT}`)
})
