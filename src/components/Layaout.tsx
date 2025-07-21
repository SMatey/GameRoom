import { Outlet, Link } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { ThemeButton } from "./ThemeButton";
import { SearchBar } from "./SearchBar";
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
        
        <Link to="/home?filter=New Trending" className="text-3xl font-bold">
          GameRoom
        </Link>

        <div className="flex-grow flex justify-center">
          <SearchBar />
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