import { useEffect } from 'react';
import './App.css';
import PrivateText from './pages/PrivateText/PrivateText';
import { AuthProvider } from './pages/PrivateText/AuthContext';
// import { AuthContext } from './pages/PrivateText/AuthContext';

const App = () => {
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      console.log("SI HAY",  token);
        // Establecer sesión de usuario o redirigir a la página de inicio de sesión
        // dependiendo de la presencia del token
    } else {
      console.log("NO ESTA ");
        // Redirigir a la página de inicio de sesión si no hay token almacenado
    }
}, []);

  return (
    <div className="App">
      <AuthProvider>
        <PrivateText/>
      </AuthProvider>
    </div>
  );
};

export default App;
