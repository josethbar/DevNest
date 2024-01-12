import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import Logout from './components/User/Logout';
import { useState } from 'react';

const NavigationBar = () => {
  const [currentUser, setCurrentUser] = useState(null)
  return (

    <nav className="navbar">
    <div className="nav-links">
    <Link to="/home" className='link-nav'>Inicio</Link>
    <Link to="/course" className='link-nav'>Rendimiento</Link> 
     <Link to="/group" className='link-nav'>Usuarios</Link>
    <Link to="/healthyform" className='link-nav'>Expediente medico</Link>
    <div className="logout-button">  <Logout setCurrUser={setCurrentUser} ></Logout>  </div>
    </div>
  </nav>
  );
};

export default NavigationBar;
