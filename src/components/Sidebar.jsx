import { Link, useLocation } from "react-router-dom";
import { 
  CloseIcon,
  StarIcon,
  FireIcon,
  NextIcon,
  TrophyIcon,
  PopularIcon,
  CrownIcon,
  FavoriteIcon
 } from "./Icons";
import { UserAuth } from "../context/AuthContext";

export function Sidebar({ open, onClose }) {
  const { signout, userProfile } = UserAuth();
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
        ? 'text-bprimary-light dark:text-bprimary font-bold' 
        : 'hover:text-bprimary-light dark:hover:text-bprimary'
    } transition-colors`;
  };

  // Función específica para el item con icono
  const getIconFilterClasses = (filter) => {
    const isActive = isActiveFilter(filter);
    return {
      container: `group text-lg font-medium py-1 flex items-center gap-2 transition-colors ${
        isActive 
          ? 'text-bprimary-light dark:text-bprimary font-bold' 
          : 'hover:text-bprimary-light dark:hover:text-bprimary'
      }`,
      icon: `w-8 h-8 flex items-center justify-center rounded-md transition-colors ${
        isActive 
          ? 'bg-bprimary-light dark:bg-bprimary text-white' 
          : 'bg-surface-light dark:bg-surface text-white group-hover:bg-bprimary-light dark:group-hover:bg-bprimary'
      }`
    };
  };

  return (
    <>
      {/* Overlay para móvil */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
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
            <p className="mb-2 text-xl font-bold text-primary-light dark:text-primary">
              { userProfile?.display_name || "No Name"}
            </p>
            <div className="flex flex-col gap-1 ml-2">
              <Link
                to="/favorites?filter=Favorites"
                className={getIconFilterClasses('Favorites').container}
                onClick={() => window.innerWidth < 1024 && onClose()}
              >
                <span className={getIconFilterClasses('Favorites').icon}>
                  <FavoriteIcon className="w-6 h-6" />
                </span>
                Favorites
              </Link>
            </div>
          </div>

          <div className="mt-6">
            <p className="mb-2 text-2xl font-bold text-primary-light dark:text-primary">
              New Releases
            </p>
            <div className="flex flex-col gap-1 ml-2">
              <Link
                to="/home?filter=Last 30 Days"
                className={getIconFilterClasses('Last 30 Days').container}
                onClick={() => window.innerWidth < 1024 && onClose()}
              >
                <span className={getIconFilterClasses('Last 30 Days').icon}>
                  <StarIcon className="w-4 h-4" />
                </span>
                Last 30 days
              </Link>
              
              <Link
                to="/home?filter=This Week"
                className={getIconFilterClasses('This Week').container}
                onClick={() => window.innerWidth < 1024 && onClose()}
              >
                <span className={getIconFilterClasses('This Week').icon}>
                  <FireIcon className="w-4 h-4" />
                </span>
                This Week
              </Link>

              <Link
                to="/home?filter=Next Week"
                className={getIconFilterClasses('Next Week').container}
                onClick={() => window.innerWidth < 1024 && onClose()}
              >
                <span className={getIconFilterClasses('Next Week').icon}>
                  <NextIcon className="w-4 h-4" />
                </span>
                Next Week
              </Link>
            </div>
          </div>

          <div className="mt-6">
            <p className="mb-2 text-2xl font-bold text-primary-light dark:text-primary">
              Top
            </p>
            <div className="flex flex-col gap-1 ml-2">
              <Link
                to="/home?filter=Best Of The Year"
                className={getIconFilterClasses('Best Of The Year').container}
                onClick={() => window.innerWidth < 1024 && onClose()}
              >
                <span className={getIconFilterClasses('Best Of The Year').icon}>
                  <TrophyIcon className="w-4 h-4" />
                </span>
                Best of the year
              </Link>

              <Link
                to="/home?filter=Popular in 2024"
                className={getIconFilterClasses('Popular in 2024').container}
                onClick={() => window.innerWidth < 1024 && onClose()}
              >
                <span className={getIconFilterClasses('Popular in 2024').icon}>
                  <PopularIcon className="w-4 h-4" />
                </span>
                Popular in 2024
              </Link>

              <Link
                to="/home?filter=All Time Top 250"
                className={getIconFilterClasses('All Time Top 250').container}
                onClick={() => window.innerWidth < 1024 && onClose()}
              >
                <span className={getIconFilterClasses('All Time Top 250').icon}>
                  <CrownIcon className="w-4 h-4" />
                </span>
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
            className="w-full text-white bg-bprimary-light hover:bg-bprimary-light/60 dark:bg-bprimary dark:hover:bg-bprimary/60 px-4 py-2 rounded transition-colors duration-200 font-medium cursor-pointer"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
