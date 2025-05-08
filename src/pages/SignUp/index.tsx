// src/pages/SignUp/index.tsx
const SignUp = () => {
    return (
      <div className="h-screen bg-[#FEEFEF] flex flex-col justify-center items-center px-4">
        <p className="text-[#F15A24] font-bold mb-6">가입자의 회원 정보를 입력해주세요 :)</p>
        <input type="text" placeholder="별명(4글자 이내)" className="w-72 px-4 py-3 mb-3 rounded-full bg-[#F28564] text-white placeholder-white" />
        <input type="email" placeholder="Email" className="w-72 px-4 py-3 mb-3 rounded-full bg-[#F28564] text-white placeholder-white" />
        <input type="password" placeholder="Password" className="w-72 px-4 py-3 mb-3 rounded-full bg-[#F28564] text-white placeholder-white" />
  
        <select className="w-72 px-4 py-3 mb-3 rounded-full bg-[#F28564] text-white">
          <option>키워드를 선택하세요</option>
        </select>
        <select className="w-72 px-4 py-3 mb-3 rounded-full bg-[#F28564] text-white">
          <option>성별을 선택하세요</option>
        </select>
        <select className="w-72 px-4 py-3 mb-6 rounded-full bg-[#F28564] text-white">
          <option>나이를 선택하세요</option>
        </select>
  
        <button className="bg-[#F15A24] text-white w-72 py-3 rounded-full font-semibold">Sign up !</button>
  
        <div className="absolute bottom-5 right-5 text-[#F15A24] text-sm text-right font-bold">
          <span className="text-2xl">●</span> reciping.<br />
          <span className="text-xs">AI 기반 통합 레시피 검색 플랫폼</span>
        </div>
      </div>
    )
  }
  
  export default SignUp
  