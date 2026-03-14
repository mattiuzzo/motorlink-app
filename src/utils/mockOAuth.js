export function initiateOAuthFlow() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'mock-jwt-token-' + Date.now(),
        user: {
          id: 'u0',
          nome: 'Usuário OAuth',
          email: 'oauth@mock.com',
          role: 'admin'
        }
      })
    }, 800)
  })
}
