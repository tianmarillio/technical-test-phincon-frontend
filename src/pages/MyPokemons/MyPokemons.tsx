import BottomNavigation from '@/components/BottomNavigation'
import Header from '@/components/Header'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { getMyPokemons } from '@/store/slices/myPokemonSlice.actions'
import { useEffect } from 'react'
import MyPokemonCard from './MyPokemonCard'
import { resetReleasePokemon } from '@/store/slices/myPokemonSlice'
import Swal from 'sweetalert2'

const MyPokemons = () => {
  const dispatch = useAppDispatch()

  const myPokemons = useAppSelector((state) => state.myPokemon.myPokemons)
  const isReleasing = useAppSelector((state) => state.myPokemon.isReleasing)
  const releaseNumber = useAppSelector((state) => state.myPokemon.releaseNumber)
  const isPrimeNumber = useAppSelector((state) => state.myPokemon.isPrimeNumber)

  useEffect(() => {
    dispatch(getMyPokemons())

    return () => {
      dispatch(resetReleasePokemon())
    }
  }, [])

  useEffect(() => {
    if (!isReleasing) {
      return
    }

    if (isPrimeNumber) {
      Swal.fire({
        title: 'Release Pokemon Success!',
        text: `${releaseNumber} is a prime number`,
        icon: 'success',
      })
    }

    if (!isPrimeNumber) {
      Swal.fire({
        title: 'Release Pokemon Failed!',
        text: `${releaseNumber} is not a prime number`,
        icon: 'error',
      })
    }

    dispatch(resetReleasePokemon())
  }, [isReleasing, isPrimeNumber])

  return (
    <div className="container mx-auto grid h-screen grid-rows-[4rem_1fr_4rem]">
      <Header></Header>

      <main className="grid auto-rows-[12rem] gap-2 overflow-y-scroll px-4 py-4 md:grid-cols-2 md:px-8 2xl:grid-cols-4">
        {myPokemons
          .map((myPokemon) => {
            return {
              id: myPokemon.id,
              pokemonId: myPokemon.pokemonId,
              name: myPokemon.name,
              nickname: myPokemon.nickname,
            }
          })

          .map((myPokemon, i) => {
            return <MyPokemonCard key={i} {...myPokemon}></MyPokemonCard>
          })}
      </main>

      <BottomNavigation active='my_pokemon'></BottomNavigation>
      </div>
  )
}

export default MyPokemons
