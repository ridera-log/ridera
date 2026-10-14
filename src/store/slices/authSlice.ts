import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface User {
  id: string
  firstName: string
  lastName: string
  universityName: string
  matriculationNumber: string
  phoneNumber: string
  email: string
}

export interface OneBigPieUser {
  id: number
  firstname: string
  lastname: string
  email: string
  phone: string
  usercode: string
  created_at: string
  role: number
  accounttype: string
  refereecode: string
}

export interface AuthState {
  user: User | null
  oneBigPieUser: OneBigPieUser | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  oneBigPieUser: null,
  token: localStorage.getItem('authToken'),
  isAuthenticated: !!localStorage.getItem('authToken'),
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true
      state.error = null
    },
    setAuthSuccess: (
      state,
      action: PayloadAction<{ user: User; oneBigPieUser: OneBigPieUser; token: string }>
    ) => {
      state.user = action.payload.user
      state.oneBigPieUser = action.payload.oneBigPieUser
      state.token = action.payload.token
      state.isAuthenticated = true
      state.loading = false
      state.error = null
      localStorage.setItem('authToken', action.payload.token)
    },
    setAuthError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },
    logout: (state) => {
      state.user = null
      state.oneBigPieUser = null
      state.token = null
      state.isAuthenticated = false
      state.error = null
      localStorage.removeItem('authToken')
    },
  },
})

export const { setLoading, setAuthSuccess, setAuthError, logout } = authSlice.actions
export default authSlice.reducer
