import { FC, HTMLAttributes } from 'react'

interface PokemonImage extends HTMLAttributes<HTMLImageElement> {
  pokemonId: number
}

const PokemonImage: FC<PokemonImage> = ({ pokemonId, ...props }) => {
  return (
    <img
      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
      alt="sprite"
      height={96}
      width={96}
      {...props}
    />
  )
}

export default PokemonImage
