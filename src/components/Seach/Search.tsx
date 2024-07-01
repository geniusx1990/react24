import { Component, ReactNode } from 'react'
import './style.css'

class Search extends Component {
  state = {
    searchTerm: '',
  }

  componentDidMount() {
    const savedSearchTerm = localStorage.getItem('savedSearchTerm')

    if (savedSearchTerm) {
      this.setState({ searchTerm: savedSearchTerm })
    }
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value })
  }

  handleSearch = () => {
    localStorage.setItem('savedSearchTerm', this.state.searchTerm)
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
