import { supabase } from "../../supabaseClient";

// Metodos para manejar los favoritos de los usuarios
export const getFavorites = async (userId) => {
  const { data, error } = await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching favorites:", error.message);
    return [];
  }

  return data.map((fav) => fav.game_id); //devolvemos los ID's de los juegos favoritos
};

export const addFavorite = async (userId, gameId) => {
  const { data, error } = await supabase
    .from("favorites")
    .insert([{ user_id: userId, game_id: gameId }]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const removeFavorite = async (userId, gameId) => {
  const { data, error } = await supabase
    .from("favorites")
    .delete()
    .eq("user_id", userId)
    .eq("game_id", gameId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};