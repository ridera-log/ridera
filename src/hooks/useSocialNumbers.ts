import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  createSocialNumber,
  getSocialNumbers,
  updateSocialNumber,
  deleteSocialNumber,
  saveSocialNumber,
  getSavedSocialNumbers,
  getSocialNumbersPublic,
  SocialNumber,
} from '../api/services/socialNumberService'

export function useSocialNumbers() {
  return useQuery<SocialNumber[], Error>({
    queryKey: ['socialNumbers'],
    queryFn: getSocialNumbers,
  })
}

export function useSocialNumbersPublic() {
  return useQuery<SocialNumber[], Error>({
    queryKey: ['socialNumbersPublic'],
    queryFn: getSocialNumbersPublic,
  })
}

export function useCreateSocialNumber() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createSocialNumber,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['socialNumbers'] }),
  })
}

export function useUpdateSocialNumber() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: { name: string; phoneNumber: string } }) => updateSocialNumber(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['socialNumbers'] }),
  })
}

export function useDeleteSocialNumber() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deleteSocialNumber(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['socialNumbers'] }),
  })
}

export function useSavedSocialNumbers() {
  return useQuery<SocialNumber[], Error>({
    queryKey: ['savedSocialNumbers'],
    queryFn: getSavedSocialNumbers,
  })
}

export function useSaveSocialNumber() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: saveSocialNumber,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['savedSocialNumbers'] }),
  })
}
