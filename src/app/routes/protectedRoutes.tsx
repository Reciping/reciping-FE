// src/app/routes/protectedRoutes.tsx
import Write from '../../pages/Write'
import Profile from '../../pages/Profile'
import ProfileEdit from '../../pages/ProfileEdit'
import PrivateRoute from '../../components/PrivateRoute'


export const protectedRoutes = [
  {
    path: '/write',
    element: <PrivateRoute><Write /></PrivateRoute>
  },
  {
    path: '/profile',
    element: <PrivateRoute><Profile /></PrivateRoute>
  },
  {
    path: '/profile-edit',
    element: <PrivateRoute><ProfileEdit /></PrivateRoute>
  }
]
