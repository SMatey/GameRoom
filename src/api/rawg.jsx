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
    return (await res.json()).results;
}

// Filtro New and Trending
export const fetchNewAndTrending = () => {
    return fetchFromRAWG("games", {
        ordering: "-added",
        dates: "2024-01-01,2025-12-31", 
        page_size: 20
    });
}

// Filtro All Games
export const fetchAllGames = () => {
    return fetchFromRAWG("/games", {
        page_size: 20,
        ordering: "-rating"
    });
}