import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: ['src/**/*.{ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['"Pretendard", sans-serif']
    },
    colors: {
      brand: {
        50: '#FFF0EC',
        300: '#F2895C',
        500: '#E85C28',      // 메인 오렌지
        700: '#9F2C0B'       // 화살표 버튼
      }
    },
    borderRadius: {
      DEFAULT: '1.5rem'     // 24px → pill 형태
    }
  }
}
