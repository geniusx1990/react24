import './style.css'
import Search from '../Seach/Search'

interface SectionOneProps {
  searchTerm: string
  onInputChange: (searchTerm: string) => void
  onSearch: (searchTerm: string) => void
}

export default function Section_one(props: SectionOneProps) {
  const { searchTerm, onSearch, onInputChange } = props

  return (
    <div className="section-one">
      <Search
        searchTerm={searchTerm}
        onSearch={onSearch}
        onInputChange={onInputChange}
      />
    </div>
  )
}
