import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Splash from '../pages/Splash'
import Login from '../pages/Login'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Splash />,
  },
  {
    path: '/login',
    element: <Login />,
  },
])
