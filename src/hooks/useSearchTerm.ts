import { useState, useEffect } from 'react'

const useSearchTerm = (key: string) => {
  const [searchTerm, setSearchTerm] = useState<string>(() => {
    const savedSearchTerm = localStorage.getItem(key)
    return savedSearchTerm || ''
  })
  useEffect(() => {
    return () => {
      localStorage.setItem(key, searchTerm)
    }
  }, [])

  return [searchTerm, setSearchTerm] as const
}
export default useSearchTerm
