
import LoginSelect from '../../pages/LoginSelect'
import SignIn from '../../pages/SignIn'
import SignUp from '../../pages/SignUp'

export const authRoutes = [
  {
    path: '/login',
    element: <LoginSelect />,
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
]
