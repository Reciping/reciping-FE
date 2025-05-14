// src/api/user.ts
import { api } from './axiosInstance'

export interface ProfileEditRequest {
  nickname?: string
  password?: string
  interestKeyword?: string
  sex?: string
  age?: string
}

export const updateProfile = async (payload: ProfileEditRequest) => {
  const res = await api.put('/api/v1/users/me', payload)
  console.log(payload)
  return res.data
}
