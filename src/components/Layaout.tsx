import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { ThemeButton } from "./ThemeButton";
import { HamburgerIcon } from "./Icons";
import { useEffect, useState } from "react";

export function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {

    }, []);
  return (
    <div className="min-h-screen flex flex-col">
      {/* Topbar arriba del todo */}
      <header className="w-full  flex items-center justify-between px-6 py-4 gap-4">
        <button onClick={() => setSidebarOpen(true)} className=" lg:hidden">
            <HamburgerIcon />
        </button>
    
            {/* Logo o título */}
        <a href="../pages/Home.jsx" className="text-xl font-bold pointer-cursor">GameRoom</a>

        <div className="flex-grow flex justify-center">
            <input
            type="text"
            placeholder="Buscar juegos..."
            className="px-4 py-2 rounded-md 
                        w-full max-w-xs
                        sm:max-w-md
                        md:max-w-lg
                        lg:max-w-xl
                        xl:max-w-2xl bg-surface-light dark:bg-surface  placeholder-gray-500"
            onChange={(e) => {
                // lógica de búsqueda opcional
                console.log("Buscar:", e.target.value);
            }}
            />
        </div>
        

        <ThemeButton />
      </header>

      {/* 👇 Debajo: sidebar + contenido */}
      <div className="flex flex-1">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
