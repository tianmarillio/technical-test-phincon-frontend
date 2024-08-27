export interface MyPokemonState {
  myPokemons: MyPokemon[]
  loading: boolean
  error: string | null
  creatingPokemonId: number | null
  isCatched: boolean
  isReleasing: boolean
  releaseNumber: number | null
  isPrimeNumber: boolean
}

export interface MyPokemon {
  id: number
  pokemonId: number
  name: string
  imageUrl: string
  nickname: string
  renameCount: number
  createdAt: string
  updatedAt: string
}
