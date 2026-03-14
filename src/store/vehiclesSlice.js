import { createSlice } from '@reduxjs/toolkit'
import { loadState } from '../utils/sessionStorage'

const mockVehicles = [
  { id: 'v1', placa: 'ABC-1234', marca: 'Toyota', modelo: 'Corolla', ano: 2020, proprietarioId: 'u1' },
  { id: 'v2', placa: 'DEF-5678', marca: 'Honda', modelo: 'Civic', ano: 2019, proprietarioId: 'u2' },
  { id: 'v3', placa: 'GHI-9012', marca: 'Chevrolet', modelo: 'Onix', ano: 2022, proprietarioId: 'u3' },
  { id: 'v4', placa: 'JKL-3456', marca: 'Volkswagen', modelo: 'Gol', ano: 2021, proprietarioId: 'u1' }
]

const persistedVehicles = loadState('vehicles')

const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState: {
    list: Array.isArray(persistedVehicles) ? persistedVehicles : mockVehicles
  },
  reducers: {
    addVehicle(state, action) {
      state.list.push(action.payload)
    },
    updateVehicle(state, action) {
      const idx = state.list.findIndex(v => v.id === action.payload.id)
      if (idx !== -1) state.list[idx] = action.payload
    },
    deleteVehicle(state, action) {
      state.list = state.list.filter(v => v.id !== action.payload)
    }
  }
})

export const { addVehicle, updateVehicle, deleteVehicle } = vehiclesSlice.actions
export default vehiclesSlice.reducer
