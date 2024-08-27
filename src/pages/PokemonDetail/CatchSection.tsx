import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { resetPokemonCatch } from '@/store/slices/myPokemonSlice'
import {
  catchPokemon,
  createMyPokemon,
} from '@/store/slices/myPokemonSlice.actions'
import {  FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const CatchSection = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [nickname, setNickname] = useState('')

  const pokemonLoading = useAppSelector((state) => state.pokemon.loading)
  const selectedPokemonDetail = useAppSelector(
    (state) => state.pokemon.selectedPokemonDetail,
  )

  const myPokemonLoading = useAppSelector((state) => state.myPokemon.loading)
  const isCatched = useAppSelector((state) => state.myPokemon.isCatched)
  const creatingPokemonId = useAppSelector(
    (state) => state.myPokemon.creatingPokemonId,
  )

  useEffect(() => {
    if (!creatingPokemonId) {
      return
    }

    if (isCatched) {
      Swal.fire({
        title: 'Catch Pokemon Success!',
        text: `${selectedPokemonDetail?.name} (50% chance)`,
        icon: 'success',
      })

      return
    }

    if (!isCatched) {
      Swal.fire({
        title: 'Catch Pokemon Failed!',
        text: `${selectedPokemonDetail?.name} (50% chance)`,
        icon: 'error',
      })
      dispatch(resetPokemonCatch())

      return
    }
  }, [creatingPokemonId, isCatched])

  useEffect(() => {
    return () => {
      dispatch(resetPokemonCatch())
    }
  }, [])

  const handleClick = () => {
    if (!selectedPokemonDetail?.id) {
      return
    }

    dispatch(catchPokemon(selectedPokemonDetail?.id))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!selectedPokemonDetail) {
      return
    }

    dispatch(
      createMyPokemon({
        pokemonId: selectedPokemonDetail?.id,
        name: selectedPokemonDetail?.name,
        imageUrl: selectedPokemonDetail.imageUrl,
        nickname,
      }),
    )

    navigate('/my-pokemons')
  }

  return (
    <div className="flex items-center justify-between gap-2 overflow-y-scroll bg-red-100 px-2">
      {creatingPokemonId && isCatched ? (
        <form
          className="flex w-full items-center gap-x-4 text-sm"
          onSubmit={handleSubmit}
        >
          <div className="flex-1">
            <input
              type="text"
              name="nickname"
              value={nickname}
              placeholder="Enter a nickname"
              className="size-full rounded-lg px-4 py-1"
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>

          <button className="rounded-lg bg-red-600 px-4 py-1 font-bold text-white">
            Submit
          </button>
        </form>
      ) : (
        <button
          className="block w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white disabled:bg-slate-200"
          onClick={handleClick}
          disabled={pokemonLoading || myPokemonLoading}
        >
          Catch Pokemon
        </button>
      )}
    </div>
  )
}

export default CatchSection
