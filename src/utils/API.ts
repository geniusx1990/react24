import {
  IPokemon,
  Pokemon,
  PokemonApiResponse,
  PokemonType,
} from './interfaces'

export const APIRoute = {
  route: 'https://pokeapi.co/api/v2/pokemon',
  list: 'limit=100&offset=0',
}

export const getListPokemons = async (): Promise<Pokemon[]> => {
  const response = await fetch(`${APIRoute.route}?${APIRoute.list}`)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data = await response.json()
  return data.results
}

export const getPokemon = async (id: number | string): Promise<IPokemon> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const pokemon: PokemonApiResponse = await response.json()

  const pokemonType: string = pokemon.types
    .map((poke: PokemonType) => poke.type.name)
    .join(', ')

  const transformedPokemon: IPokemon = {
    id: pokemon.id,
    name: pokemon.name,
    image: pokemon.sprites.front_default,
    type: pokemonType,
  }

  return transformedPokemon
}
