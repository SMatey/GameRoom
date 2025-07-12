import { UserAuth } from "../context/AuthContext";

const Home = () => {
  const { signout } = UserAuth();

  const handleLogout = async () => {
    try {
      await signout();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Bienvenido a GameRoom</h1>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default Home;
