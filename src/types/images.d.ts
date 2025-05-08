// 이미지 파일에 대한 타입 선언
declare module '*.png' {
    const value: string
    export default value
  }
  
  declare module '*.jpg' {
    const value: string
    export default value
  }
  
  declare module '*.svg' {
    const value: string
    export default value
  }
  