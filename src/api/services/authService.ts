import axiosInstance from '../axios-config'
import { User, OneBigPieUser } from '../../store/slices/authSlice'

export interface LoginResponse {
  message: string
  user: User
  oneBigPieUser: OneBigPieUser
  token: string
}

export interface LoginRequest {
  email: string
  password: string
}

const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await axiosInstance.post<LoginResponse>('/auth/login', credentials)
    return response.data
  },

  logout: () => {
    localStorage.removeItem('authToken')
  },

  verifyToken: async (token: string): Promise<boolean> => {
    try {
      const response = await axiosInstance.post('/auth/verify', { token })
      return response.status === 200
    } catch {
      return false
    }
  },
}

export default authService
