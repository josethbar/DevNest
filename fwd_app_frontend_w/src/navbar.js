import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import Logout from './components/User/Logout';
import { useState, useEffect } from 'react';
import logo from '../src/img/iconcom.png';
import { getUserRoleUnique } from './api/fwd';


const NavigationBar = () => {
  const [ setCurrentUser] = useState(null)
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const storedUserData = JSON.parse(localStorage.getItem("userData")) || {};
        const userId = storedUserData.id;

        const roleData = await getUserRoleUnique(userId);
        setUserRole(roleData.role);
      } catch (error) {
        console.error('Error al obtener el rol del usuario:', error);
      }
    };

    fetchUserRole();
  }, []);


  return (

    <nav className="navbar">
    <img  className="logo" src={logo} alt="Descripción de la imagen" />
    <div className="nav-links">
    <Link to="/home" className='link-nav'>Inicio</Link>
    <Link to="/course" className='link-nav'>Rendimiento</Link> 
    <Link to="/records" className='link-nav'>Expediente medico</Link>
    {userRole !== "student" && (
          <Link to="/administration" className='link-nav'>Usuarios</Link>
        )}
    <div className="logout-button">  <Logout setCurrUser={setCurrentUser} ></Logout>  </div>
    </div>
  </nav>
  );
};

export default NavigationBar;
