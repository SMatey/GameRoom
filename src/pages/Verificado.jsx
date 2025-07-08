import { Link } from "react-router-dom";

const Verificado = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-surface-light dark:bg-surface">
      <div className="bg-green-100 dark:bg-green-800/20 border border-green-400 dark:border-green-500 text-green-800 dark:text-green-200 px-6 py-8 rounded-xl shadow-xl animate-fade-in-up max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">¡Verificación exitosa!</h2>
        <p className="text-sm mb-6">
          Tu correo ha sido confirmado correctamente. Ahora puedes iniciar sesión en tu cuenta.
        </p>
        <Link
          to="/login"
          className="inline-block bg-bprimary text-primary-light dark:text-primary px-6 py-2 rounded-md font-semibold hover:bg-bprimary/90 transition-colors"
        >
          Ir a iniciar sesión
        </Link>
      </div>
    </div>
  );
};

export default Verificado;
