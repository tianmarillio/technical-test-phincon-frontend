import BottomNavigation from '@/components/BottomNavigation';
import Header from '@/components/Header';
import PokemonImage from '@/components/PokemonImage';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { getPokemonDetail } from '@/store/slices/pokemonSlice.actions';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CatchSection from './CatchSection';

const PokemonDetail = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id: idStr } = useParams();

  const id = Number(idStr);

  const selectedPokemonDetail = useAppSelector(
    (state) => state.pokemon.selectedPokemonDetail,
  );
  const loading = useAppSelector((state) => state.pokemon.loading);

  useEffect(() => {
    if (!id) {
      return navigate('/');
    }

    dispatch(getPokemonDetail(id));
  }, [id]);

  return (
    <div className="container mx-auto grid h-screen grid-rows-[4rem_1fr_4rem_4rem]">
      <Header></Header>

      <main className="gap-2 space-y-8 overflow-y-scroll px-2 py-4">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="size-24 p-1">
              <PokemonImage pokemonId={id} />
            </div>

            <div className="grid grid-cols-[5rem_1fr] gap-x-4 gap-y-2">
              <div className="font-bold text-red-600">ID</div>
              <div>{selectedPokemonDetail?.id}</div>
              <div className="font-bold text-red-600">Name</div>
              <div className="">{selectedPokemonDetail?.name}</div>
              <div className="font-bold text-red-600">Moves</div>
              <div>{selectedPokemonDetail?.moves.slice(0, 10).join(' | ')}</div>
              <div className="font-bold text-red-600">Types</div>
              <div>{selectedPokemonDetail?.types.slice(0, 10).join(' | ')}</div>
            </div>
          </>
        )}
      </main>

      <CatchSection></CatchSection>

      <BottomNavigation></BottomNavigation>
    </div>
  );
};

export default PokemonDetail;
