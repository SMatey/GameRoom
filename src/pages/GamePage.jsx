import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchGameDetails } from "../api/rawg";

const GamePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);

  useEffect(() => {
    const loadGame = async () => {
      const data = await fetchGameDetails(id);
      setGame(data);
    };
    loadGame();
  }, [id]);

  if (!game) return <p>Cargando juego...</p>;

  return (
    <div className="relative min-h-screen bg-base-light dark:bg-base">
      {/* Botón de regreso */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-4 left-4 z-50 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm cursor-pointer"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Imagen de fondo mejorada */}
      <div
        className="absolute inset-0 h-[70vh] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${game.background_image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          filter: 'brightness(0.7)',
        }}
      >
        {/* Gradiente mucho más pronunciado al final */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 via-50% to-base-light dark:to-base"></div>
        {/* Gradiente adicional para transición más suave */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-base-light dark:from-base to-transparent"></div>
      </div>

      {/* Contenido del juego */}
      <div className="relative z-10 pt-[45vh] px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Título principal */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
            {game.name}
          </h1>

          {/* Información básica en badges */}
          <div className="flex flex-wrap gap-3 mb-8">
            <span className="bg-bprimary-light dark:bg-bprimary text-white px-4 py-2 rounded-lg font-semibold shadow-lg">
              Released: {game.released || 'TBA'}
            </span>
            {game.rating && (
              <span className="bg-white/90 text-gray-800 px-4 py-2 rounded-lg shadow-lg">
                ⭐ Rating: {game.rating}/5
              </span>
            )}
            {game.metacritic && (
              <span className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg">
                Metacritic: {game.metacritic}
              </span>
            )}
          </div>

          {/* Géneros */}
          {game.genres && game.genres.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-3 text-primary-light dark:text-primary">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {game.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-bprimary-light/20 dark:bg-bprimary/20 text-bprimary-light dark:text-bprimary px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Plataformas */}
          {game.platforms && game.platforms.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-3 text-primary-light dark:text-primary">Platforms</h3>
              <div className="flex flex-wrap gap-2">
                {game.platforms.map(({ platform }) => (
                  <span
                    key={platform.id}
                    className="bg-surface-light dark:bg-surface text-primary-light dark:text-primary px-3 py-1 rounded-lg text-sm"
                  >
                    {platform.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Descripción */}
          {game.description_raw && (
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-3 text-primary-light dark:text-primary">About</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl text-lg">
                {game.description_raw}
              </p>
            </div>
          )}

          {/* Desarrolladores y Publishers */}
          <div className="grid md:grid-cols-2 gap-6">
            {game.developers && game.developers.length > 0 && (
              <div>
                <h3 className="text-lg font-bold mb-2 text-primary-light dark:text-primary">Developers</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {game.developers.map(dev => dev.name).join(', ')}
                </p>
              </div>
            )}

            {game.publishers && game.publishers.length > 0 && (
              <div>
                <h3 className="text-lg font-bold mb-2 text-primary-light dark:text-primary">Publishers</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {game.publishers.map(pub => pub.name).join(', ')}
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default GamePage;
