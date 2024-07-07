export interface Pokemon {
  name: string
  url: string
}

export interface PokemonApiResponse {
  id: number
  name: string
  sprites: {
    front_default: string
  }
  types: PokemonType[]
}

export interface PokemonType {
  type: {
    name: string
  }
}

export interface IPokemon {
  id: number
  name: string
  image: string
  type: string
}
