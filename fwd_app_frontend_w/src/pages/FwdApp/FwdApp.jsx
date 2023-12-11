import { useNavigate } from 'react-router-dom';
import React from 'react';
// import Course from '../Course/Course';
import { getCourses } from '../../api/fwd';
import { useEffect, useState } from 'react';
import './FwdApp.css';
// import Logout from '../../components/User/Logout';

// import { Link } from 'react-router-dom';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import newCourse from '../Course/NewCourse';
// const APi_URL = "http://localhost:3009/course";



function FwdApp({ authenticated, }) {

  const [coursesList, setCoursesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const navigate = useNavigate()

  useEffect(() => {
    console.log(authenticated, "estas?")
    if (authenticated == false) {
      navigate("/login")
    }
  }, [authenticated, navigate])

  useEffect(() => {
    const fetchData = async (e) => {
      // e.preventDefault();
      try {
        const railsData = await getCourses();
        setCoursesList(railsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }

    };

    fetchData();
  }, []); // El array vacío como segundo parámetro asegura que el efecto se ejecute solo una vez al montar el componente

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }









  return (
    <div>
      <ul className='nav' >
        <li className='buttom-nav'>
          <a href="/home" className='link-nav'>Home 🏠</a>
        </li>
        <li className='buttom-nav' >
          <a href="/course" className='link-nav'>course</a>
        </li>
        <li className='buttom-nav' >
          <a href="/group" className='link-nav'>Groups</a>
        </li>
        <li className='buttom-nav' >
          <a href="#" className='link-nav'>Health</a>
        </li>
      </ul>

      

    </div>
  )
}

export default FwdApp;
