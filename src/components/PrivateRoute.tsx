// src/components/PrivateRoute.tsx
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) {
    alert("로그인 후 접근 가능")
    return <Navigate to="/signin" />
  }
  return children
}

export default PrivateRoute
