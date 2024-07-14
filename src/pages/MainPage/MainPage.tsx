import './style.css'
import { useEffect, useState } from 'react'
import useSearchTerm from '../../hooks/useSearchTerm'
import { IPokemon } from '../../utils/interfaces'
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary'
import Section_one from '../../components/Section_one/Section_one'
import Fallback from '../../components/Fallback/Fallback'
import Section_two from '../../components/Section_two/Section_two'
import { fetchAllPokemons, getPokemon } from '../../utils/API'
import Pagination from '../../components/Pagination/Pagination'
import { Outlet, useLocation } from 'react-router-dom'
import { ITEMS_PER_PAGE } from '../../utils/Constants'

export default function MainPage() {
  const [searchTerm, setSearchTerm] = useSearchTerm('savedSearchTerm')
  const [pokemons, setPokemons] = useState<IPokemon[]>([])
  const [displayedPokemons, setDisplayedPokemons] = useState<IPokemon[]>([])
  const [throwError, setThrowError] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState(1)
  const location = useLocation()

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const pageString = searchParams.get('page')
    const page = pageString ? parseInt(pageString) : 1
    setCurrentPage(page)

    if (searchTerm) {
      loadPokemon(searchTerm)
    } else {
      loadAllPokemons(page)
    }
  }, [location.search])

  useEffect(() => {
    updateDisplayedPokemons(currentPage)
  }, [pokemons, currentPage])

  const handleInputChange = (searchTerm: string) => {
    setSearchTerm(searchTerm)
  }

  const handleSearch = async () => {
    if (searchTerm.trim() === '') {
      loadAllPokemons(1)
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

  const loadAllPokemons = async (page: number) => {
    try {
      const allPokemons = await fetchAllPokemons()
      setPokemons(allPokemons)
      updateDisplayedPokemons(page)
      setThrowError(false)
      localStorage.removeItem('savedSearchTerm')
    } catch (error) {
      console.error('Failed to fetch the Pokemon list:', error)
      setThrowError(true)
    }
  }

  const updateDisplayedPokemons = (page: number) => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE
    const paginatedPokemons = pokemons.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    )
    setDisplayedPokemons(paginatedPokemons)
  }

  const handleClick = () => {
    setThrowError(true)
  }

  return (
    <ErrorBoundary fallback={<Fallback />}>
      <div className="section">
        <div className="container">
          <button onClick={handleClick}>Throw Error</button>
          <Section_one
            onInputChange={handleInputChange}
            onSearch={handleSearch}
          />
          <Section_two pokemons={displayedPokemons} error={throwError} />
          <Pagination
            totalPages={Math.ceil(pokemons.length / ITEMS_PER_PAGE)}
            currentPage={currentPage} /* onPageChange={handlePageChange} */
          />
        </div>
        <div className="right-section">
          <Outlet />
        </div>
      </div>
    </ErrorBoundary>
  )
}
