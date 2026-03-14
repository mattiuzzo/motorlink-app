import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../store/authSlice'

export function useAuth() {
  const dispatch = useDispatch()
  const { isAuthenticated, user, token } = useSelector(state => state.auth)

  return {
    isAuthenticated,
    user,
    token,
    login: (payload) => dispatch(login(payload)),
    logout: () => dispatch(logout())
  }
}
