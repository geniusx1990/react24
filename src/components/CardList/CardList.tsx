import { Component } from 'react'
import './style.css'
import { IPokemon } from '../../utils/interfaces'
import Card from '../Card/Card'

interface CardListProps {
  pokemons: IPokemon[]
}

class CardList extends Component<CardListProps> {
  render() {
    const { pokemons } = this.props
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
}

export default CardList
