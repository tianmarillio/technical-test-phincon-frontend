import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MyPokemon, MyPokemonState } from './myPokemonSlice.interfaces'
import {
  catchPokemon,
  createMyPokemon,
  getMyPokemons,
  releasePokemon,
  renamePokemon,
} from './myPokemonSlice.actions'

const initialState: MyPokemonState = {
  myPokemons: [],
  loading: false,
  error: null,

  // Will get values after success
  // Will reset to null & false after create
  creatingPokemonId: null,
  isCatched: false,

  isReleasing: false,
  releaseNumber: null,
  isPrimeNumber: false,
}

export const myPokemonSlice = createSlice({
  name: 'myPokemon',
  initialState,
  reducers: {
    setMyPokemons: (state, action: PayloadAction<MyPokemon[]>) => {
      state.myPokemons = action.payload
    },
    resetPokemonCatch(state) {
      state.creatingPokemonId = null
      state.isCatched = false
    },
    resetReleasePokemon(state) {
      state.isReleasing = false
      state.releaseNumber = null
      state.isPrimeNumber = false
    },
  },
  extraReducers: (builder) => {
    builder
      // action: myPokemons/catchPokemon
      .addCase(catchPokemon.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(catchPokemon.fulfilled, (state, action) => {
        state.loading = false
        state.creatingPokemonId = action.payload.pokemonId

        // Handle 50% probability
        if (action.payload.isCatched) {
          state.isCatched = true
        }
      })
      .addCase(catchPokemon.rejected, (state) => {
        state.loading = false
        state.error = 'Failed to catch pokemon'
      })

      // action: myPokemons/createMyPokemon
      .addCase(createMyPokemon.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createMyPokemon.fulfilled, (state, action) => {
        state.loading = false
        state.creatingPokemonId = null
        state.isCatched = false
      })
      .addCase(createMyPokemon.rejected, (state) => {
        state.loading = false
        state.error = 'Failed to catch pokemon'
      })

      // action: 'myPokemons/getMyPokemons'
      .addCase(getMyPokemons.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getMyPokemons.fulfilled, (state, action) => {
        state.loading = false
        state.myPokemons = action.payload
      })
      .addCase(getMyPokemons.rejected, (state) => {
        state.loading = false
        state.error = 'Failed to catch pokemon'
      })

      // action: 'myPokemons/releasePokemon'
      .addCase(releasePokemon.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(releasePokemon.fulfilled, (state, action) => {
        state.loading = false
        state.isReleasing = true
        state.releaseNumber = action.payload.randomInteger
        state.isPrimeNumber = action.payload.isPrimeNumber
      })
      .addCase(releasePokemon.rejected, (state) => {
        state.loading = false
        state.error = 'Failed to catch pokemon'
      })

      // action: 'myPokemons/renamePokemon'
      .addCase(renamePokemon.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(renamePokemon.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(renamePokemon.rejected, (state) => {
        state.loading = false
        state.error = 'Failed to catch pokemon'
      })
  },
})

export const { setMyPokemons, resetPokemonCatch, resetReleasePokemon } =
  myPokemonSlice.actions

export const myPokemonReducer = myPokemonSlice.reducer
