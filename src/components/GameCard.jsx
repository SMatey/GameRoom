import { useState } from "react";
import { FavoriteIcon } from "./Icons";
import { Link } from "react-router-dom";

export function GameCard({ game }) {
  const [favorite, setFavorite] = useState(false);
  

  return (
    <div className="relative group bg-surface-light dark:bg-surface rounded-lg shadow-lg overflow-hidden transition-all duration-300">
      {/* Icono de favorito */}
      <button onClick={() => setFavorite(!favorite)} className="absolute top-2 right-2 z-10 cursor-pointer">
        <FavoriteIcon className={ favorite ? `text-purple-500` : 'text-gray-400'} filled={favorite} />
      </button>

      {/* Imagen */}
      <img
        src={game.background_image}
        alt={game.name}
        className="w-full h-48 object-cover"
      />

      {/* Contenedor para todo el texto */}
      <div className="p-4">
        
        {/* Contenido siempre visible */}
        <h2 className="text-xl font-bold truncate text-text-light dark:text-text-dark">
          {game.name}
        </h2>
        <div className="flex flex-wrap gap-2 my-2">
          {game.genres?.slice(0, 3).map((genre) => (
            <span
              key={genre.id}
              className="text-xs bg-bprimary-light dark:bg-bprimary text-white px-2 py-1 rounded-full"
            >
              {genre.name}
            </span>
          ))}
        </div>

        {/* Contenido expandible */}
        <div
          className="
            transition-all duration-500 ease-in-out 
            max-h-0 opacity-0 
            group-hover:max-h-96 group-hover:opacity-100 group-hover:mt-4"
        >
          {/* Divisor para separar visualmente el contenido */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-3 text-sm text-gray-600 dark:text-gray-300">
            
            <div className="mb-8">
              <div className="relative flex">
                <strong className="absolute left-0">Release Date:</strong> 
                <div className="absolute right-0">
                  {game.released || 'N/A'}
                </div>
              </div>
            </div>

            <div>
              <strong>Platforms:</strong>
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

            <Link to={`/game/${game.id}`} className="w-full">
                <button  className="w-full bg-bprimary-light dark:bg-bprimary text-white font-bold py-2 px-4 rounded hover:bg-opacity-90 transition-colors mt-2 cursor-pointer">
                  Show more details
                </button>
            </Link>

            

          </div>
        </div>
      </div>
    </div>
  );
}