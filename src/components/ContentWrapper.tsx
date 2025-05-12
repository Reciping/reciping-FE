// src/components/ContentWrapper.tsx
import React from 'react'

interface ContentWrapperProps {
  className?: string
  children: React.ReactNode
}

const ContentWrapper: React.FC<ContentWrapperProps> = ({
  children,
  className = ''
}) => {
  return (
    <div className={`max-w-[700px] mx-auto mt-8 mb-8 relative ${className}`}>
      {children}
    </div>
  )
}

export default ContentWrapper
