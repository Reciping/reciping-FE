import React from 'react'
import Home from '../../pages/Home'
import Splash from '../../pages/Splash'
import SplashRedirect from '../../pages/SplashRedirect'

export const mainRoutes = [
  {
    path: '/',
    element: <SplashRedirect />, // ✅ '/'는 리디렉트 전용
  },
  {
    path: '/splash',
    element: <Splash />,
  },
  {
    path: '/home',
    element: <Home />,
  },
]
