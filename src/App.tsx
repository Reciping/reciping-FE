import { Outlet } from 'react-router-dom'

export const AppLayout = () => (
  <div className="container mx-auto p-4">
    {/* 전역 Header, Nav 등을 배치할 수 있음 */}
    <Outlet />
  </div>
)
