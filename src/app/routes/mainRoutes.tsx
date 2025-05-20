import React from 'react'
import Home from '../../pages/Home'
import Splash from '../../pages/Splash'
import SplashRedirect from '../../pages/SplashRedirect'
import Write from '../../pages/Write'
import Profile from '../../pages/Profile'
import SearchResults from '../../pages/SearchResults'
import Detail from '../../pages/RecipeDetail'
import Event from '../../pages/Event'
import AdminAd from '../../pages/AdminAd'
import AdminEventWrite from '../../pages/AdminEventWrite'
import AdminAdWrite from '../../pages/AdminAdWrite'
import AdminEvent from '../../pages/AdminEvent'

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
    path: '/search/:mode',
    element: <SearchResults />,
  },
  {
    path: '/write',
    element: <Write />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/event',
    element: <Event />,
  },
  {
    path: '/recipe/:id',
    element: <Detail />,
  },
  {
    path: '/admin/event',
    element: <AdminEvent/>,
  },
  {
    path: '/admin/ad',
    element: <AdminAd />,
  },
  {
    path: '/admin/event/write',
    element: <AdminEventWrite/>,
  },
  {
    path: '/admin/ad/write',
    element: <AdminAdWrite />,
  },
  {
    path: '*',
    element: <div className="p-8 text-center text-red-500">페이지를 찾을 수 없습니다.</div>
  },
]
