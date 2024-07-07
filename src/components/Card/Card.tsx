import { Component } from 'react'
import './style.css'

interface CardProps {
  id: number
  image: string
  name: string
  type: string
}

class Card extends Component<CardProps> {
  render() {
    const { id, image, name, type } = this.props

    return (
      <div className="card">
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
}

export default Card
