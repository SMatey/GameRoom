import { Outlet, Link } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { ThemeButton } from "./ThemeButton";
import { HamburgerIcon } from "./Icons";
import { SearchIcon } from "./Icons";
import { useState } from "react";

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col ">
      
      {/* Topbar (Header) */}
      <header className="flex w-full items-center justify-between gap-4 px-6 py-4">
        <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
          <HamburgerIcon />
        </button>
        
        <Link to="/home?filter=New Trending" className="text-xl font-bold">
          GameRoom
        </Link>

        <div className="flex-grow flex justify-center">
          <div className="relative w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Buscar juegos..."
              className="w-full rounded-md bg-surface-light pl-10 pr-4 py-2 placeholder-gray-500 dark:bg-surface focus:border-bprimary outline-none focus:ring-1 focus:ring-bprimary"
              onChange={(e) => {
                console.log("Buscar:", e.target.value);
              }}
            />
          </div>
        </div>

        
        <ThemeButton />
      </header>

      {/* Contenedor para Sidebar y Contenido Principal */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Sidebar a la izquierda */}
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        {/* Contenido Principal (Main) a la derecha */}
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>

      </div>
    </div>
  );
}