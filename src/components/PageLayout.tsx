// src/components/PageLayout.tsx
import React from 'react'

interface PageLayoutProps {
  children: React.ReactNode
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="bg-[#FFF5F0] min-h-screen">
      {children}
    </div>
  )
}

export default PageLayout
