import { Navigate } from 'react-router-dom'
import Write from '../../pages/Write'

const token = localStorage.getItem('token')

export const protectedRoutes = [
  {
    // path: '/write',
    // element: token
    //   ? <Write />
    //   : (() => {
    //       alert('로그인 후 이용해주세요.')
    //       return <Navigate to="/login" />
    //     })()
  }
]
