import PokemonImage from '@/components/PokemonImage'
import { FC } from 'react'
import { Link } from 'react-router-dom'

interface PokemonCardProps {
  id: number
  name: string
  imageUrl: string
}

const PokemonCard: FC<PokemonCardProps> = ({ id, name }) => {
  return (
    <Link to={`/details/${id}`}>
      <div className="grid cursor-pointer grid-cols-[4rem_4rem_1fr] items-center gap-2 rounded-lg border-2 border-red-900 p-2">
        <div className="">#{id}</div>

        <div className="size-12 rounded-full p-1">
          <PokemonImage pokemonId={id} />
        </div>

        <div className="font-bold">{name}</div>
      </div>
    </Link>
  )
}

export default PokemonCard
