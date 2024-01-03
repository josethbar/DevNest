import { useState, useEffect } from 'react';
import './App.css';
import PrivateText from './pages/PrivateText/PrivateText';

const App = () => {
  // const navigate = useNavigate();
  const [currUser, setCurrUser] = useState(null);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
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
      <PrivateText currUser={currUser} setCurrUser={setCurrUser} />
    </div>
  );
};

export default App;
