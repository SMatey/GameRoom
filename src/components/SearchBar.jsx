import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "./Icons";
import { fetchFromRAWG } from "../api/rawg"; 

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Buscar en RAWG
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (query.trim().length > 0) {
        try {
          const res = await fetchFromRAWG("games", { search: query, page_size: 6 });
          setResults(res.results);
          setShowDropdown(true);
        } catch (err) {
          console.error("Error al buscar juegos:", err);
        }
      } else {
        setResults([]);
        setShowDropdown(false);
      }
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [query]);

  // Redirigir a detalles
  const handleSelect = (gameId) => {
    setQuery("");
    setShowDropdown(false);
    navigate(`/game/${gameId}`);
  };

  return (
    <div className="relative w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl" ref={wrapperRef}>
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
        <SearchIcon />
      </div>
      <input
        type="text"
        placeholder="Search games..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full rounded-md bg-surface-light pl-10 pr-4 py-2 placeholder-gray-500 dark:bg-surface focus:border-bprimary outline-none focus:ring-1 focus:ring-bprimary"
      />

      {/* Dropdown */}
      {showDropdown && results.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-base border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-72 overflow-y-auto">
          {results.map((game) => (
            <div
              key={game.id}
              onClick={() => handleSelect(game.id)}
              className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <img
                src={game.background_image}
                alt={game.name}
                className="w-10 h-10 object-cover rounded"
              />
              <span className="text-sm">{game.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
