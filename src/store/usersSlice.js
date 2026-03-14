import { createSlice } from '@reduxjs/toolkit'
import { loadState } from '../utils/sessionStorage'

const mockUsers = [
  { id: 'u1', nome: 'Adelvan', email: 'adelvan@email.com', role: 'admin', senha: '123456' },
  { id: 'u2', nome: 'Fernando', email: 'fernando@email.com', role: 'user', senha: '123456' },
  { id: 'u3', nome: 'Thomas', email: 'thomas@email.com', role: 'user', senha: '123456' },
  { id: 'u4', nome: 'Rafael', email: 'rafael@email.com', role: 'admin', senha: '123456' }
]

const persistedUsers = loadState('users')

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: Array.isArray(persistedUsers) ? persistedUsers : mockUsers
  },
  reducers: {
    addUser(state, action) {
      state.list.push(action.payload)
    },
    updateUser(state, action) {
      const idx = state.list.findIndex(u => u.id === action.payload.id)
      if (idx !== -1) state.list[idx] = action.payload
    },
    deleteUser(state, action) {
      state.list = state.list.filter(u => u.id !== action.payload)
    }
  }
})

export const { addUser, updateUser, deleteUser } = usersSlice.actions
export default usersSlice.reducer
