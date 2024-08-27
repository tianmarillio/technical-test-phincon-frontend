import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  Pokemon,
  PokemonListItem,
  PokemonState,
} from './pokemonsSlice.interfaces'
import { getPokemonDetail, getPokemonList } from './pokemonSlice.actions'

const initialState: PokemonState = {
  pokemonList: [],
  currentPage: 1,
  nextPage: null,
  prevPage: null,
  loading: false,
  error: null,
  selectedPokemonDetail: null,
}

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPokemonList: (state, action: PayloadAction<PokemonListItem[]>) => {
      state.pokemonList = action.payload
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // action: pokemon/getPokemonList
      .addCase(getPokemonList.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getPokemonList.fulfilled, (state, action) => {
        const pokemonList: PokemonListItem[] = action?.payload?.results?.map(
          (elem) => {
            const { url } = elem
            const splitted = url.split('/').filter((elem) => !!elem)
            const id = parseInt(splitted[splitted.length - 1])

            return {
              id,
              name: elem.name,
              imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
            }
          },
        )

        state.loading = false
        state.pokemonList = pokemonList
        state.nextPage = action.payload.next ? state.currentPage + 1 : null
        state.prevPage = action.payload.previous ? state.currentPage - 1 : null
      })
      .addCase(getPokemonList.rejected, (state) => {
        state.loading = false
        state.error = 'Failed to fetch pokemon list'
      })

      // action: pokemon/getPokemonDetail
      .addCase(getPokemonDetail.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getPokemonDetail.fulfilled, (state, action) => {
        const { payload } = action

        const pokemonDetail: Pokemon = {
          id: payload.id,
          name: payload.name,
          moves: payload.moves.map((elem) => elem.move.name),
          types: payload.types.map((elem) => elem.type.name),
          imageUrl: payload.sprites.front_default,
        }

        state.loading = false
        state.selectedPokemonDetail = pokemonDetail
      })
      .addCase(getPokemonDetail.rejected, (state) => {
        state.loading = false
        state.error = 'Failed to fetch pokemon details'
      })
  },
})

export const { setPokemonList, setCurrentPage } = pokemonSlice.actions

export const pokemonReducer = pokemonSlice.reducer
