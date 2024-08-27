import { pokeApi } from '@/api/pokeApi'
import { createAsyncThunk } from '@reduxjs/toolkit'
import qs from 'query-string'

export const getPokemonList = createAsyncThunk(
  'pokemon/getPokemonList',
  async (page: number) => {
    const query = qs.stringify({
      limit: 20,
      offset: 20 * (page - 1),
    })

    const response = await pokeApi.get<{
      count: number
      next: string
      previous: string
      results: {
        name: string
        url: string
      }[]
    }>(`/pokemon?${query}`)

    return response.data
  },
)

export const getPokemonDetail = createAsyncThunk(
  'pokemon/getPokemonDetail',
  async (id: number) => {
    const response = await pokeApi.get<{
      id: number
      name: string
      moves: {
        move: {
          name: string
        }
      }[]
      types: {
        type: {
          name: string
        }
      }[]
      sprites: {
        front_default: string
      }
    }>(`/pokemon/${id}`)

    return response.data
  },
)
