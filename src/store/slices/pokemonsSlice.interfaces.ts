export interface PokemonState {
  pokemonList: PokemonListItem[]
  currentPage: number
  prevPage: number | null
  nextPage: number | null
  loading: boolean
  error: string | null
  selectedPokemonDetail: Pokemon | null
}

// For list API
export interface PokemonListItem {
  id: number
  name: string
  imageUrl: string
}

// For detail API
export interface Pokemon {
  id: number
  name: string
  moves: string[]
  types: string[]
  imageUrl: string
}
