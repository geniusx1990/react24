import React, { useState, useEffect } from 'react'
import './style.css'

interface SearchProps {
  searchTerm: string
  onSearch: (searchTerm: string) => void
  onInputChange: (searchTerm: string) => void
}

export default function Search({ onSearch, onInputChange }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('savedSearchTerm')
    if (savedSearchTerm) {
      setSearchTerm(savedSearchTerm)
      onInputChange(savedSearchTerm)
    }
  }, [onInputChange])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value
    setSearchTerm(newSearchTerm)
    onInputChange(newSearchTerm)
  }

  const handleSearch = () => {
    localStorage.setItem('savedSearchTerm', searchTerm)
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
