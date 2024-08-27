import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { setCurrentPage } from '@/store/slices/pokemonsSlice';

const Pagination = () => {
  const dispatch = useAppDispatch();

  const currentPage = useAppSelector((state) => state.pokemon.currentPage);
  const nextPage = useAppSelector((state) => state.pokemon.nextPage);
  const prevPage = useAppSelector((state) => state.pokemon.prevPage);

  const changePage = (targetPage: number) => () => {
    dispatch(setCurrentPage(targetPage));
  };

  return (
    <div className="flex items-center justify-between gap-2 overflow-y-scroll bg-yellow-100 px-8">
      {prevPage ? (
        <button onClick={changePage(currentPage - 1)}>Previous page</button>
      ) : (
        <div />
      )}
      {nextPage ? (
        <button onClick={changePage(currentPage + 1)}>Next page</button>
      ) : (
        <div />
      )}
    </div>
  );
};

export default Pagination;
