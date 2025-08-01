import { useEffect, useState, useRef } from "react";
import { getFavorites } from "../services/favoritesService";
import { UserAuth } from "../context/AuthContext";
import { GameCard } from "../components/GameCard";
import { fetchGameDetails } from "../api/rawg";

const FavoritesPage = () => {
  const { userProfile } = UserAuth();

  const [favoritesIds, setFavoritesIds] = useState([]);
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sortedBy, setSortedBy] = useState("");
  const [platform, setPlatform] = useState("");

  const lastElementRef = useRef(null);

  useEffect(() => {
    if (!userProfile) return;

    const loadFavorites = async () => {
      try {
        const favIds = await getFavorites(userProfile.id);
        setFavoritesIds(favIds);

        const gamePromises = favIds.map((id) => fetchGameDetails(id));
        const games = await Promise.all(gamePromises);

        setGames(games);
      } catch (error) {
        console.error("Error loading favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [userProfile]);

  useEffect(() => {
    let filtered = [...games];

    // Filtrar por plataforma
    if (platform && platform !== "default") {
      filtered = filtered.filter((game) =>
        game.platforms?.some((p) =>
          p.platform.name.toLowerCase().includes(platform.toLowerCase())
        )
      );
    }

    // Ordenar
    if (sortedBy === "release_date") {
      filtered.sort((a, b) => new Date(b.released) - new Date(a.released));
    } else if (sortedBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortedBy === "popularity") {
      filtered.sort((a, b) => b.added - a.added);
    }

    if (platform === "default") setPlatform("");

    setFilteredGames(filtered);
  }, [games, sortedBy, platform]);

  if (loading) return <div className="text-center mt-6">Loading Favorites...</div>;
  if (favoritesIds.length === 0) return <div className="text-center mt-6">No favorites found.</div>;

  return (
    <div className="pr-4 pt-4 pb-4">
      <h1 className="text-2xl lg:text-7xl font-bold mb-4 capitalize">Games - Favorites</h1>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex items-center gap-2 px-3 py-2 border border-purple-500/60 rounded-md bg-surface-light dark:bg-surface">
          <label className="text-sm">Order by:</label>
          <select
            onChange={(e) => setSortedBy(e.target.value)}
            className="bg-surface-light dark:bg-surface font-semibold"
          >
            <option value="">Default</option>
            <option value="release_date">Release Date</option>
            <option value="popularity">Popularity</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        <div className="flex items-center gap-2 px-3 py-2 border border-purple-500/60 rounded-md bg-surface-light dark:bg-surface">
          <label className="text-sm">Platform:</label>
          <select
            onChange={(e) => setPlatform(e.target.value)}
            className="bg-surface-light dark:bg-surface font-semibold"
          >
            <option value="default">Default</option>
            <option value="pc">PC</option>
            <option value="playstation">PlayStation</option>
            <option value="xbox">Xbox</option>
            <option value="nintendo">Nintendo</option>
            <option value="ios">iOS</option>
            <option value="android">Android</option>
          </select>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredGames.map((game, index) => (
          <div key={game.id} ref={index === filteredGames.length - 1 ? lastElementRef : null}>
            <GameCard game={game} favorites={favoritesIds} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
