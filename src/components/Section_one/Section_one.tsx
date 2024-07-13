import './style.css'
import Search from '../Seach/Search'

interface SectionOneProps {
  onInputChange: (searchTerm: string) => void
  onSearch: (searchTerm: string) => void
}

export default function Section_one(props: SectionOneProps) {
  const { onSearch, onInputChange } = props

  return (
    <div className="section-one">
      <Search onSearch={onSearch} onInputChange={onInputChange} />
    </div>
  )
}
