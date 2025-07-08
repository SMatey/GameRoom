import { useState } from "react";
import { GoogleIcon } from "../components/Icons";

import {ThemeButton} from "../components/ThemeButton";
import { UserAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const {signInWithGoogle, signInWithEmail} = UserAuth();

  // Inicio de sesion con Email y Contraseña
  const handleLoginWithPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await signInWithEmail(email, password);
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };
  

  return (
      <div className="relative flex items-center justify-center min-h-screen p-4">
        <div className="absolute top-4 right-4">
          <ThemeButton />
        </div>

        {/* Card */}
        <div 
          className="w-ful max-h-md bg-surface-light dark:bg-surface p-4 rounded-xl shadow-2xl">
          
          {/* Card Header */}
          <div className="p-8">
            <h2 
            className="text-2xl font-bold text-center"
            >
              Bienvenido de vuelta
            </h2>
            <p className="text-primary-light/70 dark:text-primary/70">Inicia sesión en tu cuenta para continuar</p>
          </div>

          {/* Card Body */}
          <div>
            {/* Google Sign In Button */}
            <button onClick={signInWithGoogle}
              className="flex items-center justify-center w-full h-12 cursor-pointer hover:shadow-lg rounded-lg border border-bprimary-light/70 hover:border-bprimary-light dark:border-bprimary/70 dark:hover:border-bprimary gap-2">
              <>
                <GoogleIcon className="w-6 h-6 mr-2" />
                Continuar con Google
              </>
            </button>

            {/* Separador */}
            <div className="flex items-center my-6">
              <hr className="flex-grow border-t border-primary-light/70 dark:border-primary/70"></hr>
              <span className="mx-4 text-sm text-primary-light/70 dark:text-primary/70">O CONTINÚA CON</span>
              <hr className="flex-grow border-t border-primary-light/70 dark:border-primary/70"></hr>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleLoginWithPassword}>
              {/* Campo Del Correo */}
              <div className="grid">
                <label
                htmlFor="email"
                className="text-sm font-semibold"
                >Correo electrónico</label>
                <input
                  className="border border-bprimary/70 pl-3 h-12 mt-2 rounded-lg focus:border-bprimary outline-none focus:ring-1 focus:ring-bprimary"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="ejemplo@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Campo de la Contraseña */}
              <div className="grid">
                <label
                className="text-sm font-semibold"
                >Contraseña</label>
                <input
                  className="border border-bprimary/70 h-12 pl-3 mt-2 rounded-lg focus:border-bprimary outline-none focus:ring-1 focus:ring-bprimary"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Boton Iniciar Sesion */}
              <button
                type="submit"
                className={`w-full h-12 mt-4 ${
                  loading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
                 bg-bprimary-light/80 dark:bg-bprimary font-bold text-primary-light dark:text-primary rounded-lg hover:bg-bprimary-light dark:hover:bg-bprimary/90 transition-colors cursor-pointer`}
              >
                {loading ? 'Cargando...' : 'Iniciar Sesión'}
              </button>

              {/* Mensaje de error al iniciar sesion */}
              {error && (
                <p className="text-red-500 text-sm mt-2">
                  {error.message}
                </p>
              )}

              {/* Link para registrarse */}
              <p className="text-center text-sm mt-4 text-primary-light/70 dark:text-primary/70">
                ¿No tienes una cuenta?
                <a className="ml-2 text-bprimary-light dark:text-bprimary cursor-pointer hover:text-bprimary-light/70 dark:hover:text-bprimary/80" href="/register">Registrate aqui</a>
              </p>
            </form>
          </div>
        </div>
      </div>
  )
};

export default Login;