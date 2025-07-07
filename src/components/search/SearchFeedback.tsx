import React from 'react'
import { ASSET_URLS } from '../../constants/assets'

interface Props {
  query: string
}

const SearchFeedback: React.FC<Props> = ({ query }) => (
  <div className="flex items-center mb-6">
    <img src={ASSET_URLS.avatar} alt="레시핑" className="w-8 h-8 mr-2" />
    <div className="bg-[#F15A24] text-white px-4 py-2 rounded-full">
      {query} 검색한 레시피야!
    </div>
  </div>
)

export default SearchFeedback
