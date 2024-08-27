import PokemonList from './PokemonList';
import BottomNavigation from '@/components/BottomNavigation';
import Header from '@/components/Header';
import Pagination from './Pagination';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getPokemonList } from '@/store/slices/pokemonSlice.actions';

const Home = () => {
  const dispatch = useAppDispatch();

  const currentPage = useAppSelector((state) => state.pokemon.currentPage);

  // Fetch pokemon on first render & every time page changes
  useEffect(() => {
    dispatch(getPokemonList(currentPage));
  }, [currentPage]);

  return (
    <div className="container mx-auto grid h-screen grid-rows-[4rem_1fr_2rem_4rem] bg-red-100">
      <Header></Header>

      <main className="grid auto-rows-[4rem] gap-2 overflow-y-scroll bg-blue-100 px-2 py-4">
        <PokemonList></PokemonList>
      </main>

      <Pagination></Pagination>

      <BottomNavigation></BottomNavigation>
    </div>
  );
};

export default Home;
