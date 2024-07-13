import React, { useEffect } from 'react'
import './style.css'
import useSearchTerm from '../../hooks/useSearchTerm'

interface SearchProps {
  onSearch: (searchTerm: string) => void
  onInputChange: (searchTerm: string) => void
}

export default function Search({ onSearch, onInputChange }: SearchProps) {
  const [searchTerm, setSearchTerm] = useSearchTerm('savedSearchTerm')

  useEffect(() => {
    onInputChange(searchTerm)
  }, [searchTerm, onInputChange])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value
    setSearchTerm(newSearchTerm)
    onInputChange(newSearchTerm)
  }

  const handleSearch = () => {
    onSearch(searchTerm)
  }

  return (
    <div className="search-component">
      <p>Search</p>
      <input
        placeholder="Enter search ..."
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search Button</button>
    </div>
  )
}
