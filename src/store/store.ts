import { configureStore } from '@reduxjs/toolkit'
import { pokemonReducer } from './slices/pokemonsSlice'
import { myPokemonReducer, myPokemonSlice } from './slices/myPokemonSlice'

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    myPokemon: myPokemonReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
