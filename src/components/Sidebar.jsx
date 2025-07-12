import { CloseIcon } from "./Icons";

export function Sidebar({ open, onClose }) {
  return (
    <aside
      className={`fixed lg:static top-0 left-0 h-full w-64 bg-base-light dark:bg-base  z-40 transform transition-transform duration-300 ${
        open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      {/* Botón de cerrar (solo visible en móvil) */}
      <div className="flex justify-end lg:hidden p-4">
        <button onClick={onClose}>
          <CloseIcon className="h-6 w-6 text-white" />
        </button>
      </div>

      {/* Contenido del sidebar */}
      <div className="p-4 space-y-4">
        <button className="text-2xl font-bold cursor-pointer">Home</button>
        <p className="text-2xl font-bold">New Realeases</p>
        <p className="text-2xl font-bold">Top</p>
        <button className="text-2xl font-bold cursor-pointer">All Games</button>
      </div>
    </aside>
  );
}
