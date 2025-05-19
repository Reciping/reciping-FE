import { authApiClient } from '../api/authApiClient'

export const signUp = async (data: {
  nickname: string
  email: string
  password: string
  interestKeyword: string 
  sex: string             
  age: string             
}) => {
  return authApiClient.post('/api/v1/users/signup', data)
}

export const signIn = async (data: {
  email: string
  password: string
}) => {
  return authApiClient.post('/login', data)
}