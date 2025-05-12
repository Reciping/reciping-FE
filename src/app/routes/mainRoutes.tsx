import React from 'react'
import Home from '../../pages/Home'
import Splash from '../../pages/Splash'
import SplashRedirect from '../../pages/SplashRedirect'
import Write from '../../pages/Write'
import Profile from '../../pages/Profile'
import SearchResults from '../../pages/SearchResults'
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
    path: '/search',
    element: <SearchResults />,
  },
  {
    path: '/write',
    element: <Write />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },{
    path: '*',
    element: <div className="p-8 text-center text-red-500">페이지를 찾을 수 없습니다.</div>
  },
]
