// src/app/router.tsx
import { createBrowserRouter } from 'react-router-dom'
import { mainRoutes } from './routes/mainRoutes'
import { authRoutes } from './routes/authRoutes'
import { protectedRoutes } from './routes/protectedRoutes'

// ✅ splash 조건은 App.tsx에서 처리하고, router는 구조만 유지
export const router = createBrowserRouter([
//  ...protectedRoutes,
  ...mainRoutes,
  ...authRoutes,
])
