import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../PrivateText/AuthContext';
import { Link } from 'react-router-dom';
import './FwdApp.css'; 
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
      <nav className="homeNav">
      <div className="Home-links">
    
      <Link to="/course" className='home-nav'>Course</Link>
      <Link to="/group" className='home-nav'>Groups</Link>
  
      </div>
    </nav>

      {/* <span>{currentUser}</span> */}
    </div>
  );
}

export default FwdApp;
