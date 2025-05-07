import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier' assert { type: 'json' }

export default tseslint.config(
  // ① 무시 폴더
  { ignores: ['dist'] },

  // ② 기본 권장 규칙 (JS, TS)
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // ③ 프로젝트 전용 설정
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },

  // ④ 마지막에 Prettier ― 스타일 규칙 off
  ...prettier
)
