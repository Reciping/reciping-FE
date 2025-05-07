import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    react(),          // SWC 기반 React ↔ HMR
    tsconfigPaths()   // tsconfig.alias 자동 동기화
  ],
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
