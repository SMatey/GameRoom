import { AuthContextProvider } from './context/AuthContext';
import { AppRoutes } from './routers/routes';

function App() {

  return (
    <AuthContextProvider>
      <AppRoutes />
    </AuthContextProvider>
  );
}

export default App
