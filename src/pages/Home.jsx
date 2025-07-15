import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { GameCard } from "../components/GameCard";
import {
  fetchNewAndTrending,
  fetchAllGames,
  fetchLast30Days,
  fetchThisWeek,
  fetchNextWeek,
  fetchBestOfTheYear,
  fetchPopularIn2024,
  fetchAllTimeTop250
} from "../api//rawg";

const filterMap = {
  "New Trending": fetchNewAndTrending,
  "All Games": fetchAllGames,
  "Last 30 Days": fetchLast30Days,
  "This Week": fetchThisWeek,
  "Next Week": fetchNextWeek,
  "Best Of The Year": fetchBestOfTheYear,
  "Popular in 2024": fetchPopularIn2024,
  "All Time Top 250": fetchAllTimeTop250,
}


const Home = () => {
  const [params] = useSearchParams();
  const filter = params.get("filter") || "All Games";

  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadGames = useCallback(async () => {
    if (!hasMore) return;
    setLoading(true);
    try {
      const fetchFunction = filterMap[filter] || fetchAllGames;
      const { results, count } = await fetchFunction(page);

      if (filter === "All Time Top 250") {
        setGames((prev) => {
          const combined = page === 1 ? results : [...prev, ...results];
          const uniqueGames = Array.from(new Map(combined.map(g => [g.id, g])).values());
          if (uniqueGames.length >= 250 || results.length === 0) {
            setHasMore(false);
            return uniqueGames.slice(0, 250);
          }
          return uniqueGames;
        });
      } else {
        setGames((prev) => {
          const combined = page === 1 ? results : [...prev, ...results];
          const uniqueGames = Array.from(new Map(combined.map(g => [g.id, g])).values());
          return uniqueGames;
        });
        if (results.length === 0 || games.length + results.length >= count) {
          setHasMore(false); // No hay más juegos disponibles
        }
      }
    } catch (error) {
      console.error("Error fetching games:", error);
    } finally {
      setLoading(false);
    }
  }, [filter, page, hasMore, games.length]);

  useEffect(() => {
    setPage(1);
    setGames([]);
    setHasMore(true);
  }, [filter]);

  useEffect(() => {
    loadGames();
  }, [loadGames]);

  const lastElementRef = useRef();

  useEffect(() => {
    if (loading || !hasMore) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1);
      }
    });

    if (lastElementRef.current) {
      observer.observe(lastElementRef.current);
    }

    return () => {
      if (lastElementRef.current) {
        observer.unobserve(lastElementRef.current);
      }
    };
  }, [loading, hasMore]);

  return (
    <div className="pr-4 pt-4 pb-4">
      <h1 className="text-2xl lg:text-7xl font-bold mb-4 capitalize">
        {filter ? `Games - ${filter}` : "All Games"}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {games.map((game, index) =>
          index === games.length - 1 ? (
            <div ref={lastElementRef} key={game.id}>
              <GameCard game={game} />
            </div>
          ) : (
            <GameCard key={game.id} game={game} />
          )
        )}
      </div>

      {loading && (
        <p className="text-center text-lg font-semibold mt-6">Loading more...</p>
      )}
      {!hasMore && !loading && (
        <p className="text-center text-sm text-gray-500 mt-4">There are no more games to show.</p>
      )}
    </div>
  );
};

export default Home;
