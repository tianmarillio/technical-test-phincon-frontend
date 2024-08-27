import { FC } from 'react'
import { Link } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

type BottomNavigationActive = 'pokedex' | 'my_pokemon'

interface BottomNavigationProps {
  active?: BottomNavigationActive
}

const BottomNavigation: FC<BottomNavigationProps> = ({ active }) => {
  return (
    <nav className="grid grid-cols-2 overflow-y-scroll">
      <Link
        to={'/'}
        className={twMerge(
          'grid place-content-center border-4 border-red-600 text-lg font-bold text-black',
          active === 'pokedex' ? 'bg-red-600 text-white' : '',
        )}
      >
        Pokedex
      </Link>
      <Link
        to={`/my-pokemons`}
        className={twMerge(
          'grid place-content-center border-4 border-red-600 text-lg font-bold text-black',
          active === 'my_pokemon' ? 'bg-red-600 text-white' : '',
        )}
      >
        My Pokemons
      </Link>
    </nav>
  )
}

export default BottomNavigation
