import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '../App'

const Home = lazy(() => import('@pages/Home'))
const Login = lazy(() => import('@pages/Login'))
//const Intro = lazy(() => import('@pages/Intro'))

export const router = createBrowserRouter([
  {
    element: <AppLayout />,   // 공통 레이아웃
    children: [
      { path: '/', element: <Suspense fallback="…"><Home /></Suspense> },
      { path: '/login', element: <Suspense fallback="…"><Login /></Suspense> }

    ]
  }
])
