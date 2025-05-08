// src/pages/SplashRedirect.tsx
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const SplashRedirect = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const hasSeenSplash = localStorage.getItem('hasSeenSplash') === 'true'
    if (hasSeenSplash) {
      navigate('/home', { replace: true }) // ✅ splash 봤으면 홈으로
    } else {
      navigate('/splash', { replace: true }) // ✅ 처음이면 splash로
    }
  }, [navigate])

  return null // 화면엔 아무것도 안 보여줌
}

export default SplashRedirect
