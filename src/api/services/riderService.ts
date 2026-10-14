import axiosInstance from '../axios-config'
import { Rider } from '../../store/slices/riderSlice'

export interface QuoteRecord {
  id: string
  quoteType: string
  fullName: string
  phone: string
  email: string
  notes: string
  requestData: Record<string, unknown>
  status?: string
  amount?: number | string | null
  createdAt?: string
  updatedAt?: string
}

export interface QuotesListResponse {
  message: string
  data: QuoteRecord[]
  total: number
  page?: number
  pageSize?: number
}

export interface QuoteResponse {
  message: string
  data: QuoteRecord
}

export interface RidersListResponse {
  message: string
  data: Rider[]
  total: number
  page: number
  pageSize: number
}

export interface RiderResponse {
  message: string
  data: Rider
}

export interface CreateRiderRequest {
  quoteType: string
  fullName: string
  phone: string
  email: string
  notes: string
  requestData: Record<string, unknown>
}

export interface CreateSocialLinkRequest {
  name: string
  socialOrigin: string
  whatsappNumber: string
  socialName: string
}

export interface UpdateSocialLinkRequest {
  name?: string
  socialOrigin?: string
  whatsappNumber?: string
  socialName?: string
}

export interface SocialLinkRecord {
  id: number
  userId: string
  name: string
  socialOrigin: string
  whatsappNumber: string
  socialName: string
  socialCode: string
  status: string
  createdAt: string
  updatedAt: string
}

export interface SocialLinkResponse {
  message?: string
  data?: SocialLinkRecord
  id?: number
  userId?: string
  name?: string
  socialOrigin?: string
  whatsappNumber?: string
  socialName?: string
  socialCode?: string
  status?: string
  createdAt?: string
  updatedAt?: string
}

export interface SocialLinksListResponse {
  message?: string
  data?: SocialLinkRecord[]
}

const riderService = {
  getQuotes: async (page: number = 1, pageSize: number = 10): Promise<QuotesListResponse> => {
    const response = await axiosInstance.get<QuotesListResponse>('/ridera/quotes', {
      params: { page, pageSize },
    })
    return response.data
  },

  getQuoteById: async (id: string): Promise<QuoteResponse> => {
    const response = await axiosInstance.get<QuoteResponse>(`/ridera/quotes/${id}`)
    return response.data
  },

  // Get all quotes
  getRiders: async (page: number = 1, pageSize: number = 10): Promise<RidersListResponse> => {
    const response = await axiosInstance.get<RidersListResponse>('/ridera/quotes', {
      params: { page, pageSize },
    })
    return response.data
  },

  // Get a single quote by ID
  getRiderById: async (id: string): Promise<RiderResponse> => {
    const response = await axiosInstance.get<RiderResponse>(`/ridera/quotes/${id}`)
    return response.data
  },

  // Create a new quote
  createRider: async (data: CreateRiderRequest): Promise<RiderResponse> => {
    const response = await axiosInstance.post<RiderResponse>('/ridera/quotes', data)
    return response.data
  },

  // Update a quote
  updateRider: async (id: string, data: Partial<CreateRiderRequest>): Promise<RiderResponse> => {
    const response = await axiosInstance.patch<RiderResponse>(`/ridera/quotes/${id}`, data)
    return response.data
  },

  // Delete a quote
  deleteRider: async (id: string): Promise<{ message: string }> => {
    const response = await axiosInstance.delete<{ message: string }>(`/ridera/quotes/${id}`)
    return response.data
  },

  createSocialLink: async (data: CreateSocialLinkRequest): Promise<SocialLinkResponse> => {
    const response = await axiosInstance.post<SocialLinkResponse>('/ridera/social-links', data)
    return response.data
  },

  getSocialLinks: async (): Promise<SocialLinksListResponse | SocialLinkRecord[]> => {
    const response = await axiosInstance.get<SocialLinksListResponse | SocialLinkRecord[]>('/ridera/social-links')
    return response.data
  },

  getSocialLinkBySocialCode: async (socialCode: string): Promise<SocialLinkResponse> => {
    const encodedSocialCode = encodeURIComponent(socialCode)
    const candidates = [
      `/ridera/social-links/code/${encodedSocialCode}`,
      `/ridera/social-links/social-code/${encodedSocialCode}`,
      `/ridera/social-links/${encodedSocialCode}`,
    ]

    let lastError: unknown

    for (const endpoint of candidates) {
      try {
        const response = await axiosInstance.get<SocialLinkResponse>(endpoint)
        return response.data
      } catch (error) {
        lastError = error
      }
    }

    throw lastError
  },

  updateSocialLink: async (id: number, data: UpdateSocialLinkRequest): Promise<SocialLinkResponse> => {
    const response = await axiosInstance.patch<SocialLinkResponse>(`/ridera/social-links/${id}`, data)
    return response.data
  },

  deleteSocialLink: async (id: number): Promise<{ message?: string }> => {
    const response = await axiosInstance.delete<{ message?: string }>(`/ridera/social-links/${id}`)
    return response.data
  },
}

export default riderService
