import React from 'react';
import { Link } from 'react-router-dom';
import './homeNav.css';

const HomeNav = () => {

    return (
  
      <nav className="subNav">
      <div className="sub-nav-links">
    
      <Link to="/course" className='sub-links'>Course</Link>
      <Link to="/group" className='sub-links'>Groups</Link>
    

      </div>
    </nav>
    );
  };



  export default HomeNav;