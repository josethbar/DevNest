import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "./homeNav.css";
import { getGroups } from "../../api/fwd";
import { AuthContext } from "../../pages/PrivateText/AuthContext";
import { useNavigate } from "react-router-dom";

const HomeNav = () => {
  const [groupsDisplay, setGroupsDisplay] = useState(false);
  const [groupsData, setGroupsData] = useState([]);
  const displayGroups = () => {
    setGroupsDisplay(true);
  };

  console.log("es aqui", groupsDisplay);
  const { authenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!authenticated) {
          console.log("¿Estás autenticado?", authenticated);
          navigate("/login");
          return;
        }

        const [groupsDataFecth] = await Promise.all([getGroups()]);
        setGroupsData(groupsDataFecth);
        console.log("datos de grupos", groupsData);  // Mover esto aquí
      } catch (error) {
        console.error("Error al obtener registros:", error);
      }
    };

    fetchData();
  }, [authenticated, navigate]);

  return (
    <div>
      {groupsDisplay ? (
        // Estructura cuando groupsDisplay es true
        <nav className="subNav">
          <div className="sub-nav-links">
            <Link to="/course" className="sub-links">
              Course
            </Link>
            <span to="" className="sub-links" onClick={displayGroups}>
              Groups
            </span>
            <Link to="/group" className="sub-links">hola</Link>
          </div>
        </nav>
      ) : (
        // Estructura cuando groupsDisplay es false
        <nav className="subNav">
          <div className="sub-nav-links">
            <Link to="/course" className="sub-links">
              Course
            </Link>
            <span to="" className="sub-links" onClick={displayGroups}>
              Groups
            </span>
          </div>
        </nav>
      )}
    </div>
  );
};

export default HomeNav;
