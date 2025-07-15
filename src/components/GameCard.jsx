// src/components/GameCard.jsx
export function GameCard({ game }) {
  return (
    <div className="group bg-surface-light dark:bg-surface rounded-lg shadow-lg overflow-hidden transition-all duration-300">
      
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

        {/* 3. Contenido expandible */}
        {/* Inicialmente tiene altura máxima 0 y opacidad 0. */}
        {/* Al hacer hover en el `group`, se expande a una altura máxima y se vuelve opaco. */}
        <div
          className="
            transition-all duration-500 ease-in-out 
            max-h-0 opacity-0 
            group-hover:max-h-96 group-hover:opacity-100 group-hover:mt-4"
        >
          {/* Divisor para separar visualmente el contenido */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-3 text-sm text-gray-600 dark:text-gray-300">
            
            <p>
              <strong>Release Date:</strong> {game.released || 'N/A'}
            </p>

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

            <button className="w-full bg-bprimary-light dark:bg-bprimary text-white font-bold py-2 px-4 rounded hover:bg-opacity-90 transition-colors mt-2 cursor-pointer">
              Show more details
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}