// src/components/GameCard.jsx
export function GameCard({ game }) {
  return (
    <div className="relative bg-surface-light dark:bg-surface rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300">
      {/* Parte visible */}
      <img
        src={game.background_image}
        alt={game.name}
        className="w-full h-48 object-cover"
      />

      {/* Contenido fijo */}
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          {game.name}
        </h2>
        <div className="flex flex-wrap gap-1">
          {game.genres?.slice(0, 3).map((genre) => (
            <span
              key={genre.id}
              className="text-xs bg-bprimary-light dark:bg-bprimary text-white px-2 py-1 rounded-full"
            >
              {genre.name}
            </span>
          ))}
        </div>
      </div>

       {/* Contenido oculto que aparece al hacer hover */}
       <div className="">
          
       </div>
    </div>
  );
}
