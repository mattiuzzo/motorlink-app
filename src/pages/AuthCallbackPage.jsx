import { useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { exchangeCodeForToken } from '../utils/githubOAuth'

export default function AuthCallbackPage() {
  const [params] = useSearchParams()
  const { login } = useAuth()
  const navigate = useNavigate()
  const called = useRef(false)

  useEffect(() => {
    if (called.current) return
    called.current = true

    const code = params.get('code')
    const state = params.get('state')

    if (!code) { navigate('/login'); return }

    exchangeCodeForToken(code, state)
      .then(payload => { login(payload); navigate('/dashboard') })
      .catch(() => navigate('/login'))
  }, [])

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'system-ui' }}>
      <p>Autenticando com GitHub...</p>
    </div>
  )
}
