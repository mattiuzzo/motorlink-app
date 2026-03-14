import { store } from '../store'

export function autenticarLocal(email, senha) {
  const users = store.getState().users.list
  const user = users.find(u => u.email === email && u.senha === senha)
  if (!user) return null
  return {
    token: 'local-token-' + crypto.randomUUID(),
    user: { id: user.id, nome: user.nome, email: user.email, role: user.role }
  }
}
