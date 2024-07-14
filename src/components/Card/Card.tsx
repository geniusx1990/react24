import { useNavigate, useLocation } from 'react-router-dom'
import './style.css'

interface CardProps {
  id: number
  image: string
  name: string
  type: string
}

export default function Card(props: CardProps) {
  const { id, image, name, type } = props
  const navigate = useNavigate()
  const location = useLocation()

  const handleClick = () => {
    const searchParams = new URLSearchParams(location.search)
    const pageString = searchParams.get('page')
    const page = pageString ? parseInt(pageString, 10) : 1
    navigate(`/details/${id}?page=${page}`)
  }

  return (
    <div className="card" onClick={handleClick}>
      <div className="card-image">
        <img src={image} alt={name} />
      </div>
      <div className="card-content">
        <h2 className="card-name">{name}</h2>
        <p className="card-type">Type: {type}</p>
        <p className="card-id">ID: {id}</p>
      </div>
    </div>
  )
}
