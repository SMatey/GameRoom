// src/components/GameCard.jsx
export function GameCard({ game }) {
  return (
    <div className="bg-surface-light dark:bg-surface rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform duration-300">
      <img
        src={game.background_image}
        alt={game.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          {game.name}
        </h2>

        <p className="text-sm text-gray-600 dark:text-gray-300">
          ⭐ {game.rating} | 🗓️ {game.released}
        </p>

        {/* Opcional: mostrar plataformas */}
        {game.platforms && (
          <p className="text-xs mt-2 text-gray-500 dark:text-gray-400">
            {game.platforms.map((p) => p.platform.name).join(", ")}
          </p>
        )}
      </div>
    </div>
  );
}
