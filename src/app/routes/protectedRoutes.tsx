// src/app/routes/protectedRoutes.tsx
import Write from '../../pages/Write'
import Profile from '../../pages/Profile'
import PrivateRoute from '../../components/PrivateRoute'
import { Navigate } from 'react-router-dom'


export const protectedRoutes = [
  {
    path: '/write',
    element: <PrivateRoute><Write /></PrivateRoute>
  },
  {
    path: '/profile',
    element: <PrivateRoute><Profile /></PrivateRoute>
  }
]
