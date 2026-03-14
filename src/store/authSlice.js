import { createSlice } from '@reduxjs/toolkit'
import { loadState } from '../utils/sessionStorage'

const persistedToken = loadState('auth-token')
const persistedUser = loadState('auth-user')

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: persistedToken || null,
    user: persistedUser || null,
    isAuthenticated: !!persistedToken
  },
  reducers: {
    login(state, action) {
      state.token = action.payload.token
      state.user = action.payload.user
      state.isAuthenticated = true
    },
    logout(state) {
      state.token = null
      state.user = null
      state.isAuthenticated = false
    }
  }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
