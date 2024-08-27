import PokemonList from './PokemonList'
import BottomNavigation from '@/components/BottomNavigation'
import Header from '@/components/Header'
import Pagination from './Pagination'
import { useAppSelector } from '@/hooks/useAppSelector'
import { useEffect } from 'react'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { getPokemonList } from '@/store/slices/pokemonSlice.actions'

const Home = () => {
  const dispatch = useAppDispatch()

  const currentPage = useAppSelector((state) => state.pokemon.currentPage)

  // Fetch pokemon on first render & every time page changes
  useEffect(() => {
    dispatch(getPokemonList(currentPage))
  }, [currentPage, dispatch])

  return (
    <div className="container mx-auto grid h-screen grid-rows-[4rem_1fr_4rem_4rem]">
      <Header />

      <main className="grid auto-rows-[4rem] gap-4 overflow-y-scroll bg-red-50 p-4 md:grid-cols-2 md:px-8 xl:grid-cols-4">
        <PokemonList />
      </main>

      <Pagination />

      <BottomNavigation active="pokedex" />
    </div>
  )
}

export default Home
