import './style.css'
import { IPokemon } from '../../utils/interfaces'
import Card from '../Card/Card'

interface CardListProps {
  pokemons: IPokemon[]
}

export default function CardList(props: CardListProps) {
  const { pokemons } = props

  if (pokemons.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <div className="card-list">
      {pokemons.map((pokemon) => (
        <Card
          key={pokemon.id}
          id={pokemon.id}
          image={pokemon.image}
          name={pokemon.name}
          type={pokemon.type}
        />
      ))}
    </div>
  )
}
