import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const NavigationBar = () => {
  return (

    <nav className="navbar">
    <div className="nav-links">
    <Link to="/home" className='link-nav'>Home</Link>
    <Link to="/course" className='link-nav'>Course</Link>
    <Link to="/group" className='link-nav'>Groups</Link>
    <Link to="/health" className='link-nav'>Health</Link>
    </div>
    <div className="user-menu">Usuario</div>
  </nav>






    // <div>
    //   <ul className='nav'>
    //     <li className='button-nav'>
    //       <Link to="/home" className='link-nav'>Home 🏠</Link>
    //     </li>
    //     <li className='button-nav'>
    //       <Link to="/course" className='link-nav'>Course</Link>
    //     </li>
    //     <li className='button-nav'>
    //       <Link to="/group" className='link-nav'>Groups</Link>
    //     </li>
    //   </ul>
    // </div>
  );
};

export default NavigationBar;
