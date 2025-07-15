import { Link, useLocation } from "react-router-dom";
import { CloseIcon } from "./Icons";
import { UserAuth } from "../context/AuthContext";

export function Sidebar({ open, onClose }) {
  const { signout } = UserAuth();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await signout();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // Función para verificar si un filtro está activo
  const isActiveFilter = (filter) => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get('filter') === filter;
  };

  // Función para obtener las clases CSS según el estado del filtro
  const getFilterClasses = (filter, baseClasses) => {
    const isActive = isActiveFilter(filter);
    return `${baseClasses} ${
      isActive 
        ? 'text-bprimary-light dark:text-bprimary' 
        : 'hover:text-bprimary-light dark:hover:text-bprimary'
    } transition-colors`;
  };

  return (
    <>
      {/* Overlay para móvil */}
      {open && (
        <div
          className="fixed inset-0  bg-black/60 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static top-0 left-0 h-full w-64 z-40
          bg-base-light dark:bg-base 
          transform transition-colors duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          flex flex-col justify-between
        `}
      >
        {/* Header del sidebar */}
        <div className="flex justify-between items-center p-4 lg:hidden border-b border-gray-200 dark:border-gray-700">
          <span className="text-2xl font-bold">Menú</span>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Navegación */}
        <nav className="flex flex-col gap-2 p-4 overflow-y-auto flex-1">
          <Link
            to="/home?filter=New Trending"
            className={getFilterClasses('New Trending', 'text-2xl font-bold')}
            onClick={() => window.innerWidth < 1024 && onClose()}
          >
            Home
          </Link>

          <div className="mt-6">
            <p className="mb-2 text-2xl font-bold text-primary-light dark:text-primary">
              New Releases
            </p>
            <div className="flex flex-col gap-1 ml-2">
              <Link
                to="/home?filter=Last 30 Days"
                className={getFilterClasses('Last 30 Days', 'text-lg font-medium py-1')}
                onClick={() => window.innerWidth < 1024 && onClose()}
              >
                Last 30 days
              </Link>
              <Link
                to="/home?filter=This Week"
                className={getFilterClasses('This Week', 'text-lg font-medium py-1')}
                onClick={() => window.innerWidth < 1024 && onClose()}
              >
                This Week
              </Link>
              <Link
                to="/home?filter=Next Week"
                className={getFilterClasses('Next Week', 'text-lg font-medium py-1')}
                onClick={() => window.innerWidth < 1024 && onClose()}
              >
                Next Week
              </Link>
            </div>
          </div>

          <div className="mt-6">
            <p className="mb-2 text-2xl font-bold ">
              Top
            </p>
            <div className="flex flex-col gap-1 ml-2">
              <Link
                to="/home?filter=Best Of The Year"
                className={getFilterClasses('Best Of The Year', 'text-lg font-medium py-1')}
                onClick={() => window.innerWidth < 1024 && onClose()}
              >
                Best of the year
              </Link>
              <Link
                to="/home?filter=Popular in 2024"
                className={getFilterClasses('Popular in 2024', 'text-lg font-medium py-1')}
                onClick={() => window.innerWidth < 1024 && onClose()}
              >
                Popular in 2024
              </Link>
              <Link
                to="/home?filter=All Time Top 250"
                className={getFilterClasses('All Time Top 250', 'text-lg font-medium py-1')}
                onClick={() => window.innerWidth < 1024 && onClose()}
              >
                All Time Top 250
              </Link>
            </div>
          </div>

          <Link
            to="/home?filter=All Games"
            className={getFilterClasses('All Games', 'mt-6 text-2xl font-bold')}
            onClick={() => window.innerWidth < 1024 && onClose()}
          >
            All Games
          </Link>
        </nav>

        {/* Botón logout */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full text-white bg-bprimary-light hover:bg-bprimary-light/60 dark:bg-bprimary dark:hover:bg-bprimary/60  px-4 py-2 rounded transition-colors duration-200 font-medium cursor-pointer"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>
    </>
  );
}
