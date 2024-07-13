import { useEffect, useState } from 'react'
import './App.css'
import Section_one from './components/Section_one/Section_one'
import Section_two from './components/Section_two/Section_two'
import { IPokemon } from './utils/interfaces'
import { getPokemon, fetchAllPokemons } from './utils/API'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import Fallback from './components/Fallback/Fallback'

export default function App() {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [pokemons, setPokemons] = useState<IPokemon[]>([])
  const [throwError, setThrowError] = useState<boolean>(false)

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('savedSearchTerm')
    if (savedSearchTerm) {
      loadPokemon(savedSearchTerm)
    } else {
      loadAllPokemons()
    }
  }, [])

  const handleInputChange = (searchTerm: string) => {
    setSearchTerm(searchTerm)
  }

  const handleSearch = async () => {
    if (searchTerm.trim() === '') {
      loadAllPokemons()
    } else {
      loadPokemon(searchTerm)
    }
  }

  const loadPokemon = async (searchTerm: string) => {
    try {
      const searchResult = await getPokemon(searchTerm)
      setPokemons([searchResult])
      setThrowError(false)
      localStorage.setItem('savedSearchTerm', searchTerm)
    } catch (error) {
      console.error('Failed to fetch the Pokemon:', error)
      setPokemons([])
      setThrowError(true)
    }
  }

  const loadAllPokemons = async () => {
    try {
      const pokemons = await fetchAllPokemons()
      setPokemons(pokemons)
      setThrowError(false)
      localStorage.removeItem('savedSearchTerm')
    } catch (error) {
      console.error('Failed to fetch the Pokemon list:', error)
      setThrowError(true)
    }
  }

  const handleClick = () => {
    setThrowError(true)
  }

  return (
    <ErrorBoundary fallback={<Fallback />}>
      <div className="container">
        <button onClick={handleClick}>Throw Error</button>
        <Section_one
          searchTerm={searchTerm}
          onInputChange={handleInputChange}
          onSearch={handleSearch}
        />
        <Section_two pokemons={pokemons} error={throwError} />
      </div>
    </ErrorBoundary>
  )
}
