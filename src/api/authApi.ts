import { api } from './axiosInstance'

export const signUp = async (data: {
  nickname: string
  email: string
  password: string
  interestKeyword: string 
  sex: string             
  age: string             
}) => {
  return api.post('/api/v1/users/signup', data)
}

export const signIn = async (data: {
  email: string
  password: string
}) => {
  return api.post('/login', data)
}
