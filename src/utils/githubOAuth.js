const CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID

export function redirectToGitHub() {
  const state = crypto.randomUUID()
  sessionStorage.setItem('oauth_state', state)
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: 'http://localhost:5173/auth/callback',
    scope: 'read:user user:email',
    state
  })
  window.location.href = `https://github.com/login/oauth/authorize?${params}`
}

export async function exchangeCodeForToken(code, state) {
  const savedState = sessionStorage.getItem('oauth_state')
  if (state !== savedState) throw new Error('State inválido — possível CSRF')
  sessionStorage.removeItem('oauth_state')

  const res = await fetch('/api/auth/github/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code })
  })
  if (!res.ok) throw new Error('Falha ao trocar code por token')
  return res.json()
}
