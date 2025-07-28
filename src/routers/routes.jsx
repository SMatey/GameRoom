import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Verificado from "../pages/Verificado";
import { Layout } from "../components/Layaout";
import GamePage  from "../pages/GamePage";
import FavoritesPage from "../pages/FavoritesPage";

export const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verificado" element={<Verificado />} />

        {/* Rutas proteghidas con Layaut + Sidebar */}
        <Route path="/" element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/favorites" element={<FavoritesPage />} />
        </Route>

        
        <Route path="/game/:id" element={<GamePage />} />
    </Routes>
  );
}