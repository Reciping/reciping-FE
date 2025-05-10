import React from 'react'

interface Props {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSearch: () => void
}

const SearchInput: React.FC<Props> = ({ value, onChange, onSearch }) => (
  <form
    onSubmit={e => {
      e.preventDefault()
      onSearch()
    }}
    className="relative w-full mb-6"
  >
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Search"
      className="w-full bg-[#F8CBA6] text-white px-4 py-3 pr-12 rounded-full placeholder-white"
    />
    <button
      type="submit"
      className="absolute right-4 top-1/2 -translate-y-1/2"
      aria-label="검색"
    >
      {/* 흰색 돋보기 아이콘 */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
      </svg>
    </button>
  </form>
)

export default SearchInput
