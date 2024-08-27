import { backendApi } from '@/api/backendApi'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { MyPokemon } from './myPokemonSlice.interfaces'

export const catchPokemon = createAsyncThunk(
  'myPokemons/catchPokemon',
  async (id: number) => {
    const response = await backendApi.post<{
      pokemonId: number
      isCatched: boolean
    }>(`/my-pokemons/catch/${id}`)

    return response.data
  },
)

export const createMyPokemon = createAsyncThunk(
  'myPokemons/createMyPokemon',
  async (
    {
      pokemonId,
      name,
      imageUrl,
      nickname = '',
    }: {
      pokemonId: number
      name: string
      imageUrl: string
      nickname?: string
    },
    { dispatch },
  ) => {
    const response = await backendApi.post<{
      id: number
    }>(`/my-pokemons`, {
      pokemonId,
      name,
      imageUrl,
      nickname,
    })

    dispatch(getMyPokemons())

    return response.data
  },
)

export const getMyPokemons = createAsyncThunk(
  'myPokemons/getMyPokemons',
  async () => {
    const response = await backendApi.get<MyPokemon[]>(`/my-pokemons`)

    return response.data
  },
)

export const releasePokemon = createAsyncThunk(
  'myPokemons/releasePokemon',
  async (id: number, { dispatch }) => {
    const response = await backendApi.delete<{
      id: number
      randomInteger: number
      isPrimeNumber: boolean
      isReleased: boolean
    }>(`/my-pokemons/${id}`)

    if (response.data.isReleased) {
      dispatch(getMyPokemons())
    }

    return response.data
  },
)

export const renamePokemon = createAsyncThunk(
  'myPokemons/renamePokemon',
  async (
    {
      id,
      nickname,
    }: {
      id: number
      nickname: string
    },
    { dispatch },
  ) => {
    const response = await backendApi.patch<{
      id: number
      nickname: string
    }>(`/my-pokemons/${id}`, {
      nickname,
    })

    dispatch(getMyPokemons())

    return response.data
  },
)
