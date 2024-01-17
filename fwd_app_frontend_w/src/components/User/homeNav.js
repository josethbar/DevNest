import React from 'react';
import { Link } from 'react-router-dom';
import './homeNav.css';

const HomeNav = () => {

    return (
  
      <nav className="homeNav">
      <div className="Home-links">
    
      <Link to="/course" className='link-nav'>Course</Link>
      <Link to="/group" className='link-nav'>Groups</Link>
    

      </div>
    </nav>
    );
  };



  export default HomeNav;