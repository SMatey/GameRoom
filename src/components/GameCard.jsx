import { useEffect, useState } from "react";
import { FavoriteIcon } from "./Icons";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import {
  addFavorite,
  removeFavorite,
} from "../services/favoritesService";

export function GameCard({ game, favorites = [] }) {
  const { userProfile } = UserAuth();
  const [favorite, setFavorite] = useState(false);


  useEffect(() => {
    if (!userProfile || !favorites) return;
    
    setFavorite(favorites.includes(game.id));
  }, [favorites, userProfile]);

  // Manejo del click en el icono de favorito
  const handleFavoriteClick = async () => {
    if (!userProfile) return;
    console.log("Se inicio el manejo del favorito para el juego:", game.id);
    try {
      if (favorite) {
        await removeFavorite(userProfile.id, game.id);
        setFavorite(false);
      } else {
        await addFavorite(userProfile.id, game.id);
        setFavorite(true);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <div className="relative group bg-surface-light dark:bg-surface rounded-lg shadow-lg overflow-hidden transition-all duration-300">
      {/* Icono de favorito */}
      <button onClick={handleFavoriteClick} className="absolute top-2 right-2 z-10 cursor-pointer">
        <FavoriteIcon className={ favorite ? `text-purple-500` : 'text-gray-400'} filled={favorite} />
      </button>

      {/* Imagen */}
      <img
        src={game.background_image}
        alt={game.name}
        className="w-full h-48 object-cover"
      />

      {/* Contenedor para todo el texto */}
      <div className="p-3 sm:p-4">
        
        {/* Contenido siempre visible */}
        <h2 className="text-lg sm:text-xl font-bold truncate text-text-light dark:text-text-dark">
          {game.name}
        </h2>
        <div className="flex flex-wrap gap-1 sm:gap-2 my-2">
          {game.genres?.slice(0, 3).map((genre) => (
            <span
              key={genre.id}
              className="text-xs bg-bprimary-light dark:bg-bprimary text-white px-2 py-1 rounded-full"
            >
              {genre.name}
            </span>
          ))}
        </div>

        {/* Contenido expandible - visible en hover en desktop, siempre visible en móvil */}
        <div
          className="
            md:transition-all md:duration-500 md:ease-in-out 
            md:max-h-0 md:opacity-0 
            md:group-hover:max-h-96 md:group-hover:opacity-100 md:group-hover:mt-4
            max-h-none opacity-100 mt-4 md:mt-0"
        >
          {/* Divisor para separar visualmente el contenido */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-3 sm:pt-4 space-y-2 sm:space-y-3 text-sm text-gray-600 dark:text-gray-300">
            
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <strong className="text-xs sm:text-sm">Release Date:</strong> 
                <span className="text-xs sm:text-sm">
                  {game.released || 'N/A'}
                </span>
              </div>
            </div>

            <div>
              <strong className="text-xs sm:text-sm">Platforms:</strong>
              <div className="flex flex-wrap gap-1 mt-1">
                {game.platforms?.slice(0, 4).map(({ platform }) => (
                  <span
                    key={platform.id}
                    className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded"
                  >
                    {platform.name}
                  </span>
                ))}
              </div>
            </div>

            <Link to={`/game/${game.id}`} className="block w-full">
                <button className="w-full bg-bprimary-light dark:bg-bprimary text-white font-bold py-2 px-3 sm:px-4 rounded hover:bg-opacity-90 transition-colors mt-2 cursor-pointer text-sm">
                  Show more details
                </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}