import './style.css'
import { IPokemon } from '../../utils/interfaces'
import CardList from '../CardList/CardList'

interface SectionTwoProps {
  pokemons: IPokemon[]
  error: boolean
}

export default function Section_two(props: SectionTwoProps) {
  if (props.error) {
    throw new Error('Manual error thrown in Section_two!')
  }

  return (
    <div className="section-two">
      <CardList pokemons={props.pokemons} />
    </div>
  )
}
