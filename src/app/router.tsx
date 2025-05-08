import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '../App'

const Home = lazy(() => import('@pages/Home'))
const Login = lazy(() => import('@pages/Login'))
const Splash = lazy(() => import('@pages/Splash'))

export const router = createBrowserRouter([
  {
    element: <AppLayout />,   // 공통 레이아웃
    children: [
      { path: '/', element: <Splash /> },
      { path: '/login', element: <Login /> }
    ]
  }
])
