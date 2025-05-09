import React from 'react'
import Home from '../../pages/Home'
import Splash from '../../pages/Splash'
import SplashRedirect from '../../pages/SplashRedirect'
import PrivateRoute from '../../components/PrivateRoute'

export const mainRoutes = [
  {
    path: '/',
    element: <SplashRedirect />,
  },
  {
    path: '/splash',
    element: <Splash />,
  },
  {
    path: '/home',
    element: <PrivateRoute><Home /></PrivateRoute>,
  },
]
