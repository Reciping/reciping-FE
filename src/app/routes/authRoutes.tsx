import LoginSelect from '../../pages/LoginSelect'
import SignIn from '../../pages/SignIn'
import SignUp from '../../pages/SignUp'
import PublicRoute from '../../components/route/PublicRoute'
import AdminLogin from '../../pages/AdminLogin'

export const authRoutes = [
  {
    path: '/login',
    element: <PublicRoute><LoginSelect /></PublicRoute>,
  },
  {
    path: '/signin',
    element: <PublicRoute><SignIn /></PublicRoute>,
  },
  {
    path: '/signup',
    element: <PublicRoute><SignUp /></PublicRoute>,
  },
  {
    path: '/admin-login',
    element: <PublicRoute><AdminLogin /></PublicRoute>
  },
]
