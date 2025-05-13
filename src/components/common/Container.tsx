// src/components/Container.tsx
import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="max-w-[1080px] mx-auto px-4">
      {children}
    </div>
  )
}

export default Container
