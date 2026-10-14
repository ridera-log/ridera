import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAppDispatch } from '../store/store'
import { setAuthSuccess, setAuthError, setLoading, logout } from '../store/slices/authSlice'
import {
  setRiders,
  setCurrentRider,
  addRider,
  updateRider,
  deleteRider,
  setError as setRiderError,
} from '../store/slices/riderSlice'
import authService, { LoginRequest, LoginResponse } from '../api/services/authService'
import riderService, {
  CreateRiderRequest,
  CreateSocialLinkRequest,
  RidersListResponse,
  RiderResponse,
  UpdateSocialLinkRequest,
} from '../api/services/riderService'

// Auth Hooks
export const useLoginMutation = () => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),
    onMutate: () => {
      dispatch(setLoading())
    },
    onSuccess: (data: LoginResponse) => {
      dispatch(
        setAuthSuccess({
          user: data.user,
          oneBigPieUser: data.oneBigPieUser,
          token: data.token,
        })
      )
      queryClient.invalidateQueries({ queryKey: ['quotes'] })
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || error.message || 'Login failed'
      dispatch(setAuthError(errorMessage))
    },
  })
}

export const useLogoutMutation = () => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      authService.logout()
    },
    onSuccess: () => {
      dispatch(logout())
      queryClient.removeQueries()
    },
  })
}

// Quote Hooks
export const useQuotesQuery = (page: number = 1, pageSize: number = 10) =>
  useQuery({
    queryKey: ['quotes', { page, pageSize }],
    queryFn: () => riderService.getQuotes(page, pageSize),
  })

export const useQuoteQuery = (id: string) =>
  useQuery({
    queryKey: ['quote', id],
    queryFn: () => riderService.getQuoteById(id),
    enabled: !!id,
  })

export const useRidersQuery = (page: number = 1, pageSize: number = 10) => {
  const dispatch = useAppDispatch()

  return useQuery({
    queryKey: ['quotes', { page, pageSize }],
    queryFn: () => riderService.getRiders(page, pageSize),
    select: (data: RidersListResponse) => {
      dispatch(
        setRiders({
          riders: data.data,
          total: data.total,
        })
      )
      return data
    },
    throwOnError: (error: any) => {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch quotes'
      dispatch(setRiderError(errorMessage))
      return false
    },
  })
}

export const useRiderQuery = (id: string) => {
  const dispatch = useAppDispatch()

  return useQuery({
    queryKey: ['quote', id],
    queryFn: () => riderService.getRiderById(id),
    select: (data: RiderResponse) => {
      dispatch(setCurrentRider(data.data))
      return data
    },
    throwOnError: (error: any) => {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch quote'
      dispatch(setRiderError(errorMessage))
      return false
    },
    enabled: !!id,
  })
}

export const useCreateRiderMutation = () => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateRiderRequest) => riderService.createRider(data),
    onSuccess: (data: RiderResponse) => {
      dispatch(addRider(data.data))
      queryClient.invalidateQueries({ queryKey: ['quotes'] })
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to create quote'
      dispatch(setRiderError(errorMessage))
    },
  })
}

export const useCreateQuoteMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateRiderRequest) => riderService.createRider(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quotes'] })
    },
  })
}

export const useCreateSocialLinkMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateSocialLinkRequest) => riderService.createSocialLink(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['social-links'] })
    },
  })
}

export const useSocialLinksQuery = () =>
  useQuery({
    queryKey: ['social-links'],
    queryFn: () => riderService.getSocialLinks(),
  })

export const useSocialLinkByCodeQuery = (socialCode: string) =>
  useQuery({
    queryKey: ['social-link', socialCode],
    queryFn: () => riderService.getSocialLinkBySocialCode(socialCode),
    enabled: !!socialCode,
  })

export const useUpdateSocialLinkMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateSocialLinkRequest }) =>
      riderService.updateSocialLink(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['social-links'] })
    },
  })
}

export const useDeleteSocialLinkMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => riderService.deleteSocialLink(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['social-links'] })
    },
  })
}

export const useUpdateRiderMutation = () => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateRiderRequest> }) =>
      riderService.updateRider(id, data),
    onSuccess: (data: RiderResponse) => {
      dispatch(updateRider(data.data))
      queryClient.invalidateQueries({ queryKey: ['quotes'] })
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update quote'
      dispatch(setRiderError(errorMessage))
    },
  })
}

export const useDeleteRiderMutation = () => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => riderService.deleteRider(id),
    onSuccess: (_data: any, id: string) => {
      dispatch(deleteRider(id))
      queryClient.invalidateQueries({ queryKey: ['quotes'] })
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to delete quote'
      dispatch(setRiderError(errorMessage))
    },
  })
}
