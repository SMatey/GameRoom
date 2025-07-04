import { useEffect, useState } from "react";
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { Auth } from '@supabase/auth-ui-react'
import { supabase } from "../../supabaseClient";

const Login = () => {
  const [session, setSession] = useState(null)
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
  
  if (!session) {      
    return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />)    
  } else {      
    return (<div>Logged in!</div>)    
  }

  return (
    <>
      <h1>Hola</h1>
    </>
  )
};

export default Login;