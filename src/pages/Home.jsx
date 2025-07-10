import { UserAuth } from "../context/AuthContext";

const Home = () => {
  const {signout} = UserAuth();

  const hadleLogout = async () => {
    try {
      await signout();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-800 text-white">
      {/* Sidebar */}
      

      {/* Main content */}
      <div className="text-center p-8 bg-gray-900 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold">Bienvenido a GameRoom</h1>
        <button onClick={signout} className="bg-blue-800 rounded-xl p-3 cursor-pointer hover:bg-blue-700">Cerrar sesion</button>
      </div>
    </div>
  );
};

export default Home;

