import axios from '../axios-config'

export interface SocialNumber {
  id: number
  name: string
  phoneNumber: string
}

export async function createSocialNumber(data: { name: string; phoneNumber: string }) {
  const res = await axios.post<SocialNumber>('/ridera/social-numbers', data)
  return res.data
}

export async function getSocialNumbers() {
  const res = await axios.get<{ data: SocialNumber[] } | SocialNumber[]>('/ridera/social-numbers')
  console.log('Fetched social numbers:', res.data)
  return Array.isArray(res.data) ? res.data : res.data.data || []
}

export async function getSocialNumbersPublic() {
  const res = await axios.get<{ data: SocialNumber[] } | SocialNumber[]>('/ridera/social-numbers-public')
  console.log('Fetched social numbers:', res.data)
  return Array.isArray(res.data) ? res.data : res.data.data || []
}

export async function getSocialNumberById(id: number) {
  const res = await axios.get<SocialNumber>(`/ridera/social-numbers/${id}`)
  return res.data
}

export async function updateSocialNumber(id: number, data: { name: string; phoneNumber: string }) {
  const res = await axios.patch<SocialNumber>(`/ridera/social-numbers/${id}`, data)
  return res.data
}

export async function deleteSocialNumber(id: number) {
  const res = await axios.delete(`/ridera/social-numbers/${id}`)
  return res.data
}

export async function saveSocialNumber(data: { phoneNumber: string }) {
  const res = await axios.post<SocialNumber>('/ridera/saved-social-numbers', data)
  return res.data
}

export async function getSavedSocialNumbers() {
  const res = await axios.get<{ data: SocialNumber[] } | SocialNumber[]>('/ridera/saved-social-numbers')
  console.log('Fetched saved social numbers:', res.data)
  return Array.isArray(res.data) ? res.data : res.data.data || []
}
