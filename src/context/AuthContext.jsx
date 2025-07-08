import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ( {children} ) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    // Iniciar sesion con Google
    async function signInWithGoogle() {
        try {
            const {data, error} = await supabase.auth.signInWithOAuth({
                provider: 'google',
            })
            if(error) throw new Error("A ocurrido un errorr durante la autenticacion");
            return data;
        } catch (error) {}
    }

    // iniciar sesion con Email y Contraseña
    async function signInWithEmail(email, password) {
        try {
            const {data, error} = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if(error) throw new Error(error.message);
        return data;

        } catch (error) {
            throw error;
        }
    }

    // Cerrar sesion
    async function singout() {
        const {error} = await supabase.auth.signOut();
        if(error) throw new Error("A ocurrido un errorr durante el cierre de sesion");
            return data;
    }

    // Listener de sesion
    useEffect(() => {
        const {data:authListener} = supabase.auth.
        onAuthStateChange(async (event, session) => {
            const location = window.location.pathname;
            if (session === null) {
            setUser(null);
            if (location !== '/register') {
                navigate('/login', { replace: true });
            }
            } else {
            setUser(session.user);
            if (location !== '/home') {
                navigate('/home', { replace: true });
            }
            }
        });
        return () => {
            authListener.subscription;
        }
    }, []);

    return (
        <AuthContext.Provider value={{signInWithGoogle, signInWithEmail, singout, user}}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
}