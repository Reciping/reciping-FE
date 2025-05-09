// src/app/routes/protectedRoutes.tsx
import Write from '../../pages/Write'
import Profile from '../../pages/Profile'
import { Navigate } from 'react-router-dom'

const withAuth = (Component: JSX.Element) => {
  const token = localStorage.getItem('token')
  return token ? Component : <Navigate to="/login" />
}

export const protectedRoutes = [
  {
    path: '/write',
    element: withAuth(<Write />)
  },
  {
    path: '/profile',
    element: withAuth(<Profile />)
  }
]
