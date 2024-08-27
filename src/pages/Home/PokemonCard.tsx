import PokemonImage from '@/components/PokemonImage';
import { FC } from 'react';
import { Link } from 'react-router-dom';

interface PokemonCardProps {
  id: number;
  name: string;
  imageUrl: string;
}

const PokemonCard: FC<PokemonCardProps> = ({ id, name, imageUrl }) => {
  return (
    <Link to={`/details/${id}`}>
      <div className="grid cursor-pointer grid-cols-[4rem_4rem_1fr] gap-2 rounded-lg bg-red-100 p-2">
        <div className="bg-green-100">#{id}</div>

        <div className="size-12 rounded-full bg-blue-100 p-1">
          <PokemonImage pokemonId={id}></PokemonImage>
        </div>

        <div className="text-sm">{name}</div>
      </div>
    </Link>
  );
};

export default PokemonCard;
