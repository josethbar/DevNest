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
      console.log("autenticadoooos", authenticated);
    }
  }, [authenticated, navigate]);


  return (

    <div>

      <div className="Home-container">
        <HomeNav />

        {/* <span>{cur
      rentUser}</span> */}
        {/* <iframe className="fwdvideo" width="360" height="315" src="https://www.youtube.com/embed/wx0yE5gRUDU?si=Hc-deROp8jps4qC9" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}


      </div>

    </div>
  );
}

export default FwdApp;
