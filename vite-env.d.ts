/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_AUTH_BASE: string
  // 다른 환경 변수들이 있다면 여기에 추가하세요
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
