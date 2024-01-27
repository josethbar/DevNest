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

const fetchGroups = async () => {
  try {
    const groupsList = await getGroups();
    if (groupsList.length > 0) {
      setGroupsData(groupsList);
      console.log("datos de grupos desde la API AHHHHHHHHHHHHHHHHHHHHHH", groupsList);
    } else {
      console.log("La API no devolvió ningún grupo.");
    }
  } catch (error) {
    console.error("Error al obtener registros:", error);
  }
};

  

    useEffect(() => {
      fetchGroups();
  }, []);

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
            {groupsData.map((group) => (
              <Link to="/group" className="sub-links">{group.name}</Link>
                                    ))}
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
