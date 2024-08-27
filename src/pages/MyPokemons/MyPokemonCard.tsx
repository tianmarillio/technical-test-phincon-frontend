import PokemonImage from '@/components/PokemonImage'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import {
  releasePokemon,
  renamePokemon,
} from '@/store/slices/myPokemonSlice.actions'
import { FC, FormEvent, useState } from 'react'

interface MyPokemonCardProps {
  id: number
  pokemonId: number
  name: string
  nickname: string
}

const MyPokemonCard: FC<MyPokemonCardProps> = ({
  id,
  pokemonId,
  name,
  nickname,
}) => {
  const dispatch = useAppDispatch()

  const [isRenaming, setIsRenaming] = useState(false)
  const [newNickname, setNewNickname] = useState('')

  const handleRelease = () => {
    dispatch(releasePokemon(id))
  }

  const handleSubmitRename = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch(
      renamePokemon({
        id,
        nickname: newNickname,
      }),
    )

    setIsRenaming(false)
  }

  return (
    <div className="grid grid-cols-[6rem_1fr] gap-4 rounded-lg border-4 border-red-600 bg-white p-4">
      <div className="flex flex-col">
        <div>#{pokemonId}</div>
        <div className="mb-4 mt-auto">
          <PokemonImage pokemonId={pokemonId} />
        </div>
      </div>

      <form className="flex flex-col gap-y-1" onSubmit={handleSubmitRename}>
        <div className="text-xs font-bold">Original name</div>
        <div>{name}</div>
        <div className="text-xs font-bold">Nickname</div>

        {isRenaming ? (
          <input
            type="text"
            placeholder="Enter new name"
            className="w-full px-2 py-1"
            onChange={(e) => setNewNickname(e.target.value)}
          />
        ) : (
          <div>{nickname ? nickname : '-'}</div>
        )}

        <div className="mt-auto flex flex-wrap content-end items-start gap-2 self-end text-xs font-bold">
          {isRenaming ? (
            <button
              className="rounded border-2 border-red-600 px-2 py-1"
              type="submit"
            >
              Submit Rename
            </button>
          ) : null}

          {!isRenaming ? (
            <button
              className="rounded border-2 border-red-600 px-2 py-1"
              onClick={() => setIsRenaming(true)}
              type="button"
            >
              Rename
            </button>
          ) : null}

          <button
            className="rounded border-2 border-red-600 bg-red-600  px-2 py-1 text-white"
            onClick={handleRelease}
            type="button"
          >
            Release
          </button>
        </div>
      </form>
    </div>
  )
}

export default MyPokemonCard
