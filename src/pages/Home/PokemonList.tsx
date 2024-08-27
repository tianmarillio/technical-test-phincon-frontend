import { useAppSelector } from '@/hooks/useAppSelector'
import PokemonCard from './PokemonCard'

const PokemonList = () => {
  const pokemonList = useAppSelector((state) => state.pokemon.pokemonList)
  const loading = useAppSelector((state) => state.pokemon.loading)

  if (loading) {
    return <div>Loading...</div>
  }

  return pokemonList.map((elem, i) => <PokemonCard key={i} {...elem} />)
}

export default PokemonList
