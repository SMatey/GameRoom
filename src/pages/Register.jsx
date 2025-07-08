import { useState } from "react";
import { supabase } from "../../supabaseClient";
import { ThemeButton } from "../components/ThemeButton";

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: 'http://localhost:5173/verificado',
      }
    });

    if (error) {
      alert("Hubo un error al crear la cuenta: " + error.message);
    } else {
      alert("Cuenta creada correctamente. Revisa tu correo para confirmar.");
    }

    setLoading(false);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen p-4">
      <div className="absolute top-4 right-4">
        <ThemeButton />
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-surface-light dark:bg-surface p-6 rounded-xl shadow-2xl">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-center">Crear una cuenta</h2>
          <p className="text-primary-light/70 dark:text-primary/70 text-center">
            Ingresa tu correo y contraseña
          </p>
        </div>

        <form onSubmit={handleRegister} className="grid gap-4 px-4">
          <div>
            <label
            className="text-sm font-semibold"
            >Correo electrónico</label>
            <input
              type="email"
              className="w-full border border-bprimary/70 py-3 px-4 mt-2 rounded-lg focus:ring-1 focus:ring-bprimary outline-none"
              placeholder="ejemplo@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label
            className="text-sm font-semibold"
            >Contraseña</label>
            <input
              type="password"
              className="w-full border border-bprimary/70 py-3 px-4 mt-2 rounded-lg focus:ring-1 focus:ring-bprimary outline-none"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full h-12 mt-2 ${
              loading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
            } bg-bprimary-light/80 dark:bg-bprimary font-bold text-primary-light dark:text-primary rounded-lg hover:bg-bprimary-light dark:hover:bg-bprimary/90 transition-colors`}
          >
            {loading ? 'Cargando...' : 'Crear Cuenta'}
          </button>
          {error && (
            <p className="text-red-500 text-sm mt-2">
              {error.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
