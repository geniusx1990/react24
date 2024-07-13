import { useEffect, useState } from 'react'
import useSearchTerm from '../../hooks/useSearchTerm'
import { IPokemon } from '../../utils/interfaces'
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary'
import Section_one from '../../components/Section_one/Section_one'
import Fallback from '../../components/Fallback/Fallback'
import Section_two from '../../components/Section_two/Section_two'
import { fetchAllPokemons, getPokemon } from '../../utils/API'

export default function MainPage() {
  const [searchTerm, setSearchTerm] = useSearchTerm('savedSearchTerm')
  const [pokemons, setPokemons] = useState<IPokemon[]>([])
  const [throwError, setThrowError] = useState<boolean>(false)
  useEffect(() => {
    if (searchTerm) {
      loadPokemon(searchTerm)
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
          onInputChange={handleInputChange}
          onSearch={handleSearch}
        />
        <Section_two pokemons={pokemons} error={throwError} />
      </div>
    </ErrorBoundary>
  )
}
