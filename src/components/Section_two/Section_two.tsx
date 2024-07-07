import { Component } from 'react'
import './style.css'
import { IPokemon } from '../../utils/interfaces'
import CardList from '../CardList/CardList'

interface SectionTwoProps {
  pokemons: IPokemon[]
  error: boolean
}

class Section_two extends Component<SectionTwoProps> {
  render() {
    if (this.props.error) {
      throw new Error('Manual error thrown in Section_two!')
    }

    return (
      <div className="section-two">
        <CardList pokemons={this.props.pokemons} />
      </div>
    )
  }
}

export default Section_two
