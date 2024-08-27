import { Link } from "react-router-dom";

const BottomNavigation = () => {
  return (
    <nav className="grid grid-cols-2 divide-x-2 overflow-y-scroll bg-green-100 px-2">
      <Link to={'/'} className="grid place-content-center">
        Home
      </Link>
      <Link to={`/my-pokemons`} className="grid place-content-center">
        My Pokemons
      </Link>
    </nav>
  );
};

export default BottomNavigation;
