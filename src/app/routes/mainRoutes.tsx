import React from 'react'
import Home from '../../pages/Home'
import Splash from '../../pages/Splash'
import SplashRedirect from '../../pages/SplashRedirect'
import PrivateRoute from '../../components/PrivateRoute'
import Write from '../../pages/Write'
import Profile from '../../pages/Profile'
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
    element: <Home />,
  },
  {
    path: '/write',
    element: <Write />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
]
