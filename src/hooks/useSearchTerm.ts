import { useState, useEffect } from 'react'

const useSearchTerm = (key: string) => {
  const [searchTerm, setSearchTerm] = useState<string>(() => {
    const savedSearchTerm = localStorage.getItem(key)
    return savedSearchTerm || ''
  })
  console.log('HOOOOOk')
  useEffect(() => {
    console.log('component mounted')

    return () => {
      localStorage.setItem(key, searchTerm)
      console.log('component UNMOUNTED')
    }
  }, [])

  return [searchTerm, setSearchTerm] as const
}
export default useSearchTerm
