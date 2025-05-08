import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      {/* 공통 header나 nav 등을 여기에 */}
      <Outlet />
    </div>
  )
}

export default Layout
