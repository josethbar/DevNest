import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import Logout from './components/User/Logout';
import { useState } from 'react';
import logo from '../src/img/iconcom.png';


const NavigationBar = () => {
  const [ setCurrentUser] = useState(null)
  return (

    <nav className="navbar">
    <img  className="logo" src={logo} alt="Descripción de la imagen" />
    <div className="nav-links">
    <Link to="/home" className='link-nav'>Inicio</Link>
    <Link to="/course" className='link-nav'>Rendimiento</Link> 
    <Link to="/records" className='link-nav'>Expediente medico</Link>
    <Link to="/administration" className='link-nav'>Usuarios</Link>
    <div className="logout-button">  <Logout setCurrUser={setCurrentUser} ></Logout>  </div>
    </div>
  </nav>
  );
};

export default NavigationBar;
