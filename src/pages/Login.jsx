import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { GoogleIcon } from "../components/Icons";

import {ThemeButton} from "../components/ThemeButton";

const Login = () => {
  const [session, setSession] = useState(null)

  // Inicio de sesion con Google
  useEffect(() => {      
    supabase.auth.getSession().then(({ data: { session } }) => {        
      setSession(session)      
    })      
    const {        
      data: { subscription },      
    } = supabase.auth.onAuthStateChange((_event, session) => {        
      setSession(session)      
    })    

    return () => subscription.unsubscribe()    
  }, [])
  
  

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
            <button 
              className="flex items-center justify-center w-full h-12 cursor-pointer hover:shadow-lg rounded-lg border border-bprimary-light/70 hover:border-bprimary-light dark:border-bprimary/70 dark:hover:border-bprimary gap-2">
              <>
                <GoogleIcon className="w-6 h-6 mr-2" />
                Continuar con Google
              </>
            </button>
          </div>
        </div>
      </div>
  )
};

export default Login;