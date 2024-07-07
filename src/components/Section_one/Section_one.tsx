import { Component } from 'react'
import './style.css'
import Search from '../Seach/Search'

interface SectionOneProps {
  searchTerm: string
  onInputChange: (searchTerm: string) => void
  onSearch: (searchTerm: string) => void
}

class Section_one extends Component<SectionOneProps> {
  render() {
    const { searchTerm, onSearch, onInputChange } = this.props

    return (
      <div className="red">
        <Search
          searchTerm={searchTerm}
          onSearch={onSearch}
          onInputChange={onInputChange}
        />
      </div>
    )
  }
}

export default Section_one
