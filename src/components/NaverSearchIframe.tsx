import React from 'react'

interface Props {
  query: string
}

const NaverSearchIframe: React.FC<Props> = ({ query }) => (
  <div className="mt-6">
    <iframe
      src={`https://search.naver.com/search.naver?where=view&query=${encodeURIComponent(query)}`}
      className="w-full h-[600px] border rounded-lg"
      title="네이버 레시피 검색 결과"
    />
  </div>
)

export default NaverSearchIframe
