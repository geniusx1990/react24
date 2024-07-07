import { Component } from 'react'
import './style.css'
import { IPokemon } from '../../utils/interfaces'
import CardList from '../CardList/CardList'

interface SectionTwoProps {
  pokemons: IPokemon[]
}

class Section_two extends Component<SectionTwoProps> {
  render() {
    return (
      <div className="yellow">
        <CardList pokemons={this.props.pokemons} />
      </div>
    )
  }
}

export default Section_two
