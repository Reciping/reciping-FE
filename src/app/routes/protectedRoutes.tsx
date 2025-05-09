// src/app/routes/protectedRoutes.tsx
import Write from '../../pages/Write'
import { Navigate } from 'react-router-dom'
// ✅ 로그인 여부를 렌더링 시점에 판단하는 컴포넌트
const UnauthenticatedWrite = () => {
  alert('로그인 후 이용해주세요.')
  return <Navigate to="/login" />
}

export const protectedRoutes = [
  {
    path: '/write',
    element: (() => {
      const token = localStorage.getItem('token')
      return token ? <Write /> : <UnauthenticatedWrite />
    })()
  }
]
