export interface ButtonProps {
    children: React.ReactNode
    variant?: 'primary' | 'secondary'
  }
  export const Button = ({ children, variant = 'primary' }: ButtonProps) => (
    <button className={`btn btn-${variant}`}>{children}</button>
  )
  