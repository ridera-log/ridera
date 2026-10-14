import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Rider {
  id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  universityName: string
  matriculationNumber: string
  createdAt: string
  updatedAt: string
}

export interface RiderState {
  riders: Rider[]
  currentRider: Rider | null
  loading: boolean
  error: string | null
  total: number
}

const initialState: RiderState = {
  riders: [],
  currentRider: null,
  loading: false,
  error: null,
  total: 0,
}

const riderSlice = createSlice({
  name: 'rider',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true
      state.error = null
    },
    setRiders: (state, action: PayloadAction<{ riders: Rider[]; total: number }>) => {
      state.riders = action.payload.riders
      state.total = action.payload.total
      state.loading = false
    },
    setCurrentRider: (state, action: PayloadAction<Rider>) => {
      state.currentRider = action.payload
      state.loading = false
    },
    addRider: (state, action: PayloadAction<Rider>) => {
      state.riders.push(action.payload)
      state.total += 1
    },
    updateRider: (state, action: PayloadAction<Rider>) => {
      const index = state.riders.findIndex((r) => r.id === action.payload.id)
      if (index !== -1) {
        state.riders[index] = action.payload
      }
      if (state.currentRider?.id === action.payload.id) {
        state.currentRider = action.payload
      }
    },
    deleteRider: (state, action: PayloadAction<string>) => {
      state.riders = state.riders.filter((r) => r.id !== action.payload)
      state.total -= 1
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },
  },
})

export const { setLoading, setRiders, setCurrentRider, addRider, updateRider, deleteRider, setError } =
  riderSlice.actions
export default riderSlice.reducer
