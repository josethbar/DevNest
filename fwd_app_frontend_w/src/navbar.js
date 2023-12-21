import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import Logout from './components/User/Logout';

const NavigationBar = () => {
  return (

    <nav className="navbar">
    <div className="nav-links">
    <Link to="/home" className='link-nav'>Home</Link>
    <Link to="/course" className='link-nav'>Course</Link>
    <Link to="/group" className='link-nav'>Groups</Link>
    <Link to="/healthyform" className='link-nav'>Health</Link>
    </div>
    {/* <div className="user-menu">log aout</div> */}
    <Logout className="user-menu"></Logout>
  </nav>
  );
};

export default NavigationBar;
