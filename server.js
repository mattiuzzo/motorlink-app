import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

app.post('/api/auth/github/token', async (req, res) => {
  const { code } = req.body
  if (!code) return res.status(400).json({ error: 'code obrigatório' })

  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      client_id: process.env.VITE_GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code
    })
  })
  const tokenData = await tokenRes.json()
  if (tokenData.error) return res.status(400).json(tokenData)

  const userRes = await fetch('https://api.github.com/user', {
    headers: { Authorization: `Bearer ${tokenData.access_token}`, 'User-Agent': 'crud-app' }
  })
  const user = await userRes.json()

  res.json({
    token: tokenData.access_token,
    user: { id: String(user.id), nome: user.name || user.login, email: user.email || `${user.login}@github`, role: 'user' }
  })
})

app.listen(3001, () => console.log('Auth server: http://localhost:3001'))
