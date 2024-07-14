import './stype.css'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getPokemonDetails } from '../../utils/API'
import { IPokemon } from '../../utils/interfaces'

const Details = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const [pokemon, setPokemon] = useState<IPokemon | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await getPokemonDetails(id)
        setPokemon(details)
      } catch (error) {
        console.error('Failed to fetch the Pokemon details:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDetails()
  }, [id])

  const handleClose = () => {
    const searchParams = new URLSearchParams(location.search)
    const pageString = searchParams.get('page')
    const currentPage = pageString ? parseInt(pageString, 10) : 1
    navigate(`/?page=${currentPage}`)
  }

  if (loading) return <div>Loading...</div>
  if (!pokemon) return <div>No details available</div>

  return (
    <div className="details">
      <h2>{pokemon.name}</h2>
      <img src={pokemon.image} alt={pokemon.name} />
      <p>Type: {pokemon.type}</p>
      <button onClick={handleClose}>Close</button>
    </div>
  )
}

export default Details
