import { Component, ReactNode } from 'react'
import './App.css'
import Section_one from './components/Section_one/Section_one'
import Section_two from './components/Section_two/Section_two'
import { IPokemon } from './utils/interfaces'
import { getPokemon, fetchAllPokemons } from './utils/API'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import Fallback from './components/Fallback/Fallback'

interface AppState {
  searchTerm: string
  pokemons: IPokemon[]
  throwError: boolean
}
interface AppProps {}

class App extends Component<AppProps, AppState> {
  state: AppState = {
    searchTerm: '',
    pokemons: [],
    throwError: false,
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
      this.setState({ pokemons: [searchResult], throwError: false })
      localStorage.setItem('savedSearchTerm', searchTerm)
    } catch (error) {
      console.error('Failed to fetch the Pokemon:', error)
      this.setState({ pokemons: [], throwError: true })
    }
  }

  loadAllPokemons = async () => {
    try {
      const pokemons = await fetchAllPokemons()
      this.setState({ pokemons, throwError: false })
      localStorage.removeItem('savedSearchTerm')
    } catch (error) {
      console.error('Failed to fetch the Pokemon list:', error)
      this.setState({ throwError: true })
    }
  }

  handleClick = () => {
    this.setState({ throwError: true })
  }

  render(): ReactNode {
    return (
      <ErrorBoundary fallback={<Fallback />}>
        <div className="container">
          <button onClick={this.handleClick}>Throw Error</button>
          <Section_one
            searchTerm={this.state.searchTerm}
            onInputChange={this.handleInputChange}
            onSearch={this.handleSearch}
          />
          <Section_two
            pokemons={this.state.pokemons}
            error={this.state.throwError}
          />
        </div>
      </ErrorBoundary>
    )
  }
}

export default App
