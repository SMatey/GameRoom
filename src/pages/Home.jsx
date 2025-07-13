import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import {
  fetchNewAndTrending,
  fetchAllGames
} from "../api//rawg";
import { GameCard } from "../components/GameCard";


const Home = () => {
  const [params] = useSearchParams();
  const filter = params.get("filter");
  const [games, setGame] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        let results = [];

        switch (filter) {
          case "newTrending":
            results = await fetchNewAndTrending();
            break;
          case "allGames":
            results = await fetchAllGames();
            break;
          default:
            results = await fetchAllGames(); //fallback
        }

        setGame(results);
      }catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [filter]);


  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 capitalize">
        {filter ? `Juegos - ${filter}` : "Todos los Juegos"}
      </h1>

      {loading ? (
        <p className="text-xl font-bold">Cargando...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
      
    </div>
  );
};

export default Home;
