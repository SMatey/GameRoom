import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { 
  fetchGameDetails,
  fetchGameScreenshots,
  fetchGameTrailers
 } from "../api/rawg";

const GamePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [trailers, setTrailers] = useState([]);

  // Cargar los detalles del juego al montar el componente
  useEffect(() => {
    const loadGame = async () => {
      const data = await fetchGameDetails(id);
      setGame(data);
    };
    loadGame();
  }, [id]);

  // Cargar los trailers del juego
  useEffect(() => {
    const loadTrailers = async () => {
      const data = await fetchGameTrailers(id);
      setTrailers(data);
    };
    loadTrailers();
  }, [id]);

  // Cargar las capturas de pantalla del juego
  useEffect(() => {
    const loadScreenshots = async () => {
      const data = await fetchGameScreenshots(id);
      setScreenshots(data);
    };
    loadScreenshots();
  }, [id]);

  // Se deshabilita el scroll del body cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  if (!game) return <p>Cargando juego...</p>;

  return (
    <div className="relative min-h-screen bg-base-light dark:bg-base">
      {/* Boton de regreso */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-4 left-4 z-50 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm cursor-pointer"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 h-[70vh] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${game.background_image_additional})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          filter: 'brightness(1) saturate(0.8)',
        }}
      >
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 via-50% to-base-light dark:to-base"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-base-light dark:from-base to-transparent"></div>
      </div>

      {/* Contenido del juego */}
      <div className="relative z-10 pt-[45vh] px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Titulo principal */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
            {game.name}
          </h1>

          {/* Información basica en badges */}
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
              <span className="bg-green-600/50 border border-green-600 text-white px-4 py-2 rounded-lg shadow-lg">
                Metacritic: {game.metacritic}
              </span>
            )}
          </div>

          {/* Generos */}
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

          <div className="lg:grid grid-cols-2 gap-8">
            <div>
              {/* Descripcion */}
              {game.description_raw && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-3 text-primary-light dark:text-primary">About</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl text-lg">
                    {game.description_raw}
                  </p>
                </div>
              )}
            </div>

            {/* Galeria de imagenes y trailers */}
            <div>
              {/* Trailer */}
              <div>
                {trailers.length > 0 && trailers[0].data && (
                  <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-2">Trailer</h2>
                    <video
                      controls
                      className="w-full max-w-3xl rounded-lg shadow-lg"
                      poster={trailers[0].preview}
                    >
                      <source src={trailers[0].data.max} type="video/mp4" />
                      Tu navegador no soporta el video.
                    </video>
                    
                  </div>
                )}
              </div>

              {/* Galeria de imagenes */}
              <div className="py-6 my-6">
                {screenshots && screenshots.length > 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    {screenshots.map((screenshot, index) => (
                      <img
                        key={index}
                        src={screenshot.image}
                        alt={`Screenshot ${index + 1}`}
                        onClick={() => {
                          setSelectedImage(screenshot.image);
                          setIsOpen(true);
                        }}
                        className="rounded-lg shadow-lg  hover:scale-105 transition-transform duration-200 cursor-pointer object-cover"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Modal para imagenes */}
            {isOpen && (
              <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                <div className="flex flex-col gap-5 max-w-4xl w-full px-4">
                  <img
                    src={selectedImage}
                    alt="Screenshot"
                    className="w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                  />
                  <div className="flex justify-center">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="w-10 h-10 font-bold bg-bprimary rounded-full hover:bg-bprimary/70 transition-colors duration-200 cursor-pointer"
                    >
                      X
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Desarrolladores y Publishers */}
            <div className="flex items-center justify-between gap-6">
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

            {/* Carrete de juegos similares */}
            <div>

            </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
