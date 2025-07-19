import { meta } from "@eslint/js";
import { useState } from "react"

const BASE_URL = `https://api.rawg.io/api`;
const API_KEY = import.meta.env.VITE_RAWG_API_KEY;


// Funcion Generica
export async function fetchFromRAWG(endpoint, params) {
    const urlParams = new URLSearchParams({key: API_KEY, ...params});
    const res = await fetch(`${BASE_URL}/${endpoint}?${urlParams}`);
    if (!res.ok) {
        throw new Error(`Error fetching data from RAWG: ${res.statusText}`);
    }
    const data = await res.json();
    return {
        results: data.results,
        count: data.count,
    };
}

// Filtro New and Trending - Home
export const fetchNewAndTrending = (page = 1) => {
    const today = new Date();
    const lastMonth = new Date();
    lastMonth.setMonth(today.getMonth() - 1);

    const format = (date) => date.toISOString().split("T")[0]; // YYYY-MM-DD

    return fetchFromRAWG("games", {
        ordering: "-added",
        dates: `${format(lastMonth)},${format(today)}`, 
        page: page,
        page_size: 20
    });
}

// Filtro All Games
export const fetchAllGames = (page = 1) => {
    return fetchFromRAWG("games", {
        page: page,
        page_size: 20,
    });
}

//---------- Filtros New Realeases ----------//
// Funcion para calcular la fecha de manera dinamica
function getDateRange(period) {
  const end = new Date();
  const start = new Date();

  switch (period) {
    case "year":
      start.setFullYear(end.getFullYear() - 1);
      break;
    case "month":
      start.setMonth(end.getMonth() - 1);
      break;
    case "week":
      start.setDate(end.getDate() - 7);
      break;
    case "nextWeek":
      start.setDate(end.getDate() + 7); 
      end.setDate(end.getDate() + 14); 
      break;
    case "today":
      // Mismo día, no cambia start
      break;
    default:
      throw new Error("Periodo no válido");
  }

  const format = (date) => date.toISOString().split("T")[0]; // YYYY-MM-DD

  return {
    start: format(start),
    end: format(end),
  };
}

// Filtro Last 30 Days
export const fetchLast30Days = (page = 1) => {
    const { start, end } = getDateRange("month");
    return fetchFromRAWG("games", {
        page: page,
        page_size: 20,
        dates: `${start},${end}`,
        ordering: "-added", 
    });
}

// Filtro This Week
export const fetchThisWeek = (page = 1) => {
    const { start, end } = getDateRange("week");
    return fetchFromRAWG("games", {
        page: page,
        page_size: 20,
        dates: `${start},${end}`,
    });
}

// Filtro Next Week
export const fetchNextWeek = (page = 1) => {
    const { start, end } = getDateRange("nextWeek");
    return fetchFromRAWG("games", {
        page: page,
        page_size: 20,
        dates: `${start},${end}`,
        ordering: "-relevance",
    });
}

// ------- Filtros Top Games ------- //
export const fetchBestOfTheYear =  (page = 1) => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const end = new Date(now.getFullYear(), 11, 31);

    const format = (date) => date.toISOString().split("T")[0];

    return fetchFromRAWG("games", {
        dates: `${format(start)},${format(end)}`,
        ordering: "-relevance",
        metacritic: "0,100",
        page: page,
        page_size: 20,
    });
}

export const fetchPopularIn2024 = (page = 1) => {
    const { start, end } = getDateRange("year");
    return fetchFromRAWG("games", {
        page: page,
        page_size: 20,
        dates: `${start},${end}`,
        metacritic: "0,100", 
    });
}

export const fetchAllTimeTop250 = (page = 1) => {
  return fetchFromRAWG("games", {
    ordering: "-rating",               
    page_size: 20,                     
    page: page,
    "ratings_count": "1000,1000000",   
  });
};

// ------------- Traer Detalles de un Juego por ID ------------- //
export const fetchGameDetails = async (gameId) => {
  const urlParams = new URLSearchParams({ key: API_KEY });
  const res = await fetch(`${BASE_URL}/games/${gameId}?${urlParams}`);
  if (!res.ok) {
    throw new Error(`Error fetching game details: ${res.statusText}`);
  }
  const data = await res.json();
  return data; 
};
