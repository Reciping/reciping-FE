import React, { ChangeEvent } from 'react'

interface Props {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSearch?: () => void
  placeholder?: string
  disabled?: boolean
}

const SearchInput: React.FC<Props> = ({
  value,
  onChange,
  onSearch,
  placeholder = '검색어를 입력하세요',
  disabled = false
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch()
    }
  }

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full px-4 py-2 rounded-full border-2
          ${disabled
            ? 'bg-gray-100 border-gray-200 text-gray-500'
            : 'border-[#F15A24] focus:outline-none focus:border-[#F15A24]'
          }
        `}
      />
      {!disabled && onSearch && (
        <button
          onClick={onSearch}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1 bg-[#F15A24] text-white rounded-full text-sm"
        >
          검색
        </button>
      )}
    </div>
  )
}

export default SearchInput
