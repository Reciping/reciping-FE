import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Splash from '../pages/Splash'
import LoginSelect from '../pages/LoginSelect'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
export const router = createBrowserRouter([
  { path: '/', element: <Splash /> },
  { path: '/login', element: <LoginSelect /> },
  { path: '/signin', element: <SignIn /> },
  { path: '/signup', element: <SignUp /> }
])
