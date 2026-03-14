import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import usersReducer from './usersSlice'
import vehiclesReducer from './vehiclesSlice'
import { saveState, removeState } from '../utils/sessionStorage'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    vehicles: vehiclesReducer
  }
})

store.subscribe(() => {
  const state = store.getState()
  saveState('users', state.users.list)
  saveState('vehicles', state.vehicles.list)
  if (state.auth.token) {
    saveState('auth-token', state.auth.token)
    saveState('auth-user', state.auth.user)
  } else {
    removeState('auth-token')
    removeState('auth-user')
  }
})

export default store
