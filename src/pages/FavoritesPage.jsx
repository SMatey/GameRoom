import { getFavorites } from "../services/favoritesService";

const FavoritesPage = () => {
  const favorites = getFavorites();

  return (
    <div>
      <h1>Favorites</h1>
      <p>Here you can find your favorite items.</p>
      <ul>
      </ul>
    </div>
  );
};

export default FavoritesPage;
