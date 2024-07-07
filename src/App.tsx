import { Component, ReactNode } from 'react'
import './App.css'
import Section_one from './components/Section_one/Section_one'
import Section_two from './components/Section_two/Section_two'
import { IPokemon, PokemonType } from './utils/interfaces'
import { getListPokemons, getPokemon } from './utils/API'

interface AppState {
  searchTerm: string
  pokemons: IPokemon[]
}

class App extends Component<AppState> {
  state: AppState = {
    searchTerm: '',
    pokemons: [],
  }
  componentDidMount() {
    const savedSearchTerm = localStorage.getItem('savedSearchTerm')
    if (savedSearchTerm) {
      this.loadPokemon(savedSearchTerm)
    } else {
      this.loadAllPokemons()
    }
  }

  handleInputChange = (searchTerm: string) => {
    this.setState({ searchTerm })
  }

  handleSearch = async () => {
    const { searchTerm } = this.state
    if (searchTerm.trim() === '') {
      this.loadAllPokemons()
    } else {
      this.loadPokemon(searchTerm)
    }
  }

  loadPokemon = async (searchTerm: string) => {
    try {
      const searchResult = await getPokemon(searchTerm)
      this.setState({ pokemons: [searchResult] })
      localStorage.setItem('savedSearchTerm', searchTerm)
    } catch (error) {
      console.error('Failed to fetch the Pokemon:', error)
      this.setState({ pokemons: [] })
    }
  }

  loadAllPokemons = async () => {
    try {
      const pokemonList = await getListPokemons()
      const pokemons: IPokemon[] = await Promise.all(
        pokemonList.map(async (pokemon) => {
          const response = await fetch(pokemon.url)
          const data = await response.json()
          const pokemonType = data.types
            .map((type: PokemonType) => type.type.name)
            .join(', ')
          return {
            id: data.id,
            name: data.name,
            image: data.sprites.front_default,
            type: pokemonType,
          }
        })
      )
      this.setState({ pokemons })
      localStorage.removeItem('savedSearchTerm')
    } catch (error) {
      console.error('Failed to fetch the Pokemon list:', error)
    }
  }

  render(): ReactNode {
    return (
      <div className="container">
        <Section_one
          searchTerm={this.state.searchTerm}
          onInputChange={this.handleInputChange}
          onSearch={this.handleSearch}
        />
        <Section_two pokemons={this.state.pokemons} />
      </div>
    )
  }
}

export default App
