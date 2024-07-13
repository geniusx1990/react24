import { useState, useEffect } from 'react'

const useSearchTerm = (key: string) => {
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem(key)
    if (savedSearchTerm) {
      setSearchTerm(savedSearchTerm)
    }

    return () => {
      localStorage.setItem(key, searchTerm)
    }
  }, [key, searchTerm])

  return [searchTerm, setSearchTerm] as const
}

export default useSearchTerm
