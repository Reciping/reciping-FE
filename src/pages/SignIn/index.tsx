// src/pages/SignIn/index.tsx
const SignIn = () => {
    return (
      <div className="h-screen bg-[#FEEFEF] flex flex-col justify-center items-center px-4">
        <p className="text-[#F15A24] font-bold mb-6">회원 정보를 입력하세요 :)</p>
        <input type="email" placeholder="Email" className="w-72 px-4 py-3 mb-3 rounded-full bg-[#F28564] text-white placeholder-white" />
        <input type="password" placeholder="Password" className="w-72 px-4 py-3 mb-6 rounded-full bg-[#F28564] text-white placeholder-white" />
        <button className="bg-[#F15A24] text-white w-72 py-3 rounded-full font-semibold">Sign in !</button>
  
        <div className="absolute bottom-5 right-5 text-[#F15A24] text-sm text-right font-bold">
          <span className="text-2xl">●</span> reciping.<br />
          <span className="text-xs">AI 기반 통합 레시피 검색 플랫폼</span>
        </div>
      </div>
    )
  }
  
  export default SignIn
  