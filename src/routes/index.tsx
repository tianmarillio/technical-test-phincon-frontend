import Home from '@/pages/Home';
import MyPokemons from '@/pages/MyPokemons';
import PokemonDetail from '@/pages/PokemonDetail';

export const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/details/:id',
    element: <PokemonDetail />,
  },
  {
    path: '/my-pokemons',
    element: <MyPokemons />,
  },
];
