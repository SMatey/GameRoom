import { Link } from "react-router-dom";
import { CloseIcon } from "./Icons";
import { UserAuth } from "../context/AuthContext";

export function Sidebar({ open, onClose }) {
  const { signout } = UserAuth();

  const handleLogout = async () => {
    try {
      await signout();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <aside
      className={`lg:mt-7 fixed lg:static top-0 left-0 h-full w-64 z-40 transform transition-transform duration-300 
      ${open ? "translate-x-0 bg-base-light dark:bg-base" : "-translate-x-full lg:translate-x-0"} 
      flex flex-col justify-between`}
    >
      {/* Botón cerrar (solo móvil) */}
      <div className="flex justify-end lg:hidden p-4">
        <button onClick={onClose}>
          <CloseIcon className="h-6 w-6 text-white" />
        </button>
      </div>

      {/* Navegación */}
      <nav className="flex flex-col gap-2 px-6">
        <Link to="/home?filter=newTrending" className="text-2xl font-bold hover:text-purple-500">Home</Link>

        <p className="mt-6 mb-2 text-2xl font-bold">New Releases</p>
        <Link to="/home?filter=allGames" className="text-lg font-medium hover:text-purple-500">Last 30 days</Link>
        <Link to="/home?filter=allGames" className="text-lg font-medium hover:text-purple-500">This Week</Link>
        <Link to="/home?filter=allGames" className="text-lg font-medium hover:text-purple-500">Next Week</Link>

        <p className="mt-6 mb-2 text-2xl font-bold">Top</p>
        <Link to="/home?filter=allGames" className="text-lg font-medium hover:text-purple-500">Best of the year</Link>
        <Link to="/home?filter=allGames" className="text-lg font-medium hover:text-purple-500">Popular in 2024</Link>
        <Link to="/home?filter=allGames" className="text-lg font-medium hover:text-purple-500">All Time Top 250</Link>

        <Link to="/home?filter=allGame" className="mt-6 mb-2 text-2xl font-bold hover:text-purple-500">All Games</Link>
      </nav>

      {/* Botón logout */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer transition"
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
