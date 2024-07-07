import { Component, ReactNode } from 'react'
import './style.css'

interface SearchProps {
  searchTerm: string
  onSearch: (searchTerm: string) => void
  onInputChange: (searchTerm: string) => void
}

class Search extends Component<SearchProps> {
  state = {
    searchTerm: '',
  }

  componentDidMount() {
    const savedSearchTerm = localStorage.getItem('savedSearchTerm')

    if (savedSearchTerm) {
      this.setState({ searchTerm: savedSearchTerm })
      this.props.onInputChange(savedSearchTerm)
    }
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value
    this.setState({ searchTerm })
    this.props.onInputChange(searchTerm)
  }

  handleSearch = () => {
    const { searchTerm } = this.state
    localStorage.setItem('savedSearchTerm', searchTerm)
    this.props.onSearch(searchTerm)
  }

  render(): ReactNode {
    return (
      <div className="search-component">
        <p>Search</p>
        <input
          placeholder="Enter search ..."
          type="text"
          value={this.state.searchTerm}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleSearch}>Search Button</button>
      </div>
    )
  }
}

export default Search
