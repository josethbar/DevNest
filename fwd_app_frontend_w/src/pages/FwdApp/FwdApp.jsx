import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../PrivateText/AuthContext';
// import { Link } from 'react-router-dom';
import './FwdApp.css'; 
import HomeNav from '../../components/User/homeNav';

function FwdApp() {
  const { authenticated } = useContext(AuthContext);
  const navigate = useNavigate();


  useEffect(() => {
    // Verifica si el usuario no está autenticado antes de redirigir
    if (!authenticated) {
      navigate("/login");
      console.log("autenticadoooos" , authenticated);
    }
  }, [authenticated, navigate]);


  return (
    
    <div>
      <HomeNav/>
      {/* <span>{cur
        rentUser}</span> */}
       
    </div>
  );
}

export default FwdApp;
