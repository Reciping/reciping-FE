import { useState } from 'react'
import { Button, TextField } from '@components'
import { useNavigate } from 'react-router-dom'
import { api } from '@services/api'

const Login = () => {
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    await api.post('/auth/login', { email, pw })
    nav('/')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-50 px-4">
      <form
        onSubmit={submit}
        className="mx-auto w-full max-w-sm space-y-6 text-center"
      >
        <h2 className="text-lg font-semibold text-brand-500">
          회원 정보를 입력하세요 : )
        </h2>

        <TextField
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          type="password"
          placeholder="Password"
          value={pw}
          onChange={e => setPw(e.target.value)}
        />

        <Button type="submit">Sign in !</Button>
      </form>

      <footer className="absolute bottom-8 right-8 flex items-center gap-2 text-brand-500">
        <span className="h-8 w-8 rounded-full bg-brand-500" />
        <div>
          <p className="text-2xl font-bold">reciping.</p>
          <p className="text-xs text-brand-500/80">
            AI 기반 통합 레시피 검색 플랫폼
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Login
