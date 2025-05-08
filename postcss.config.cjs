/* postcss.config.cjs */
module.exports = {
  plugins: [
    require('@tailwindcss/postcss')(),  // ← ()를 붙여 플러그인 함수 실행
    require('autoprefixer'),
  ],
}
