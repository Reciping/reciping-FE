import { useState } from 'react'
import { api } from '@services/api'

const Login = () => {
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await api.post('/auth/login', { id, pw })
    alert('Logged in (mock)')
  }
  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <input value={id} onChange={e => setId(e.target.value)} placeholder="id" />
      <input
        type="password"
        value={pw}
        onChange={e => setPw(e.target.value)}
        placeholder="password"
      />
      <button>Submit</button>
    </form>
  )
}
export default Login
