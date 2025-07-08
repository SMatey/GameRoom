import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Verificado from "../pages/Verificado";

export const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verificado" element={<Verificado />} />
        <Route path="/home" element={<Home />} />
    </Routes>
  );
}