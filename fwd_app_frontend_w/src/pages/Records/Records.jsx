import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../PrivateText/AuthContext";
import { getMedicalRecord, getUserRole } from "../../api/fwd"; // Adjust the path as needed
import "./Records.css";

const RecordsComponent = () => {
  const { authenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const [records, setRecords] = useState([]);
  const [isLoadingRecords, setIsLoadingRecords] = useState(true);
  const [error, setError] = useState(null);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [userDataFromLocalStorage, setUserDataFromLocalStorage] = useState({});
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUserData = JSON.parse(localStorage.getItem("userData")) || {};
        setUserDataFromLocalStorage(storedUserData);
        console.log("Registros ACTUALES:", storedUserData);

        if (!authenticated) {
          console.log("¿Estás autenticado?", authenticated);
          navigate('/login');
          return;
        }

        const [medicalRecords, userRoleData] = await Promise.all([
          getMedicalRecord(),
          getUserRole(),
        ]);

        setRecords(medicalRecords);
        setUserRole(userRoleData.role);
        setIsLoadingRecords(false);

      // console.log("userDataFromLocalStorage", userDataFromLocalStorage);
      // console.log("Registros médicos desde la API:", medicalRecords);

      } catch (error) {
        console.error("Error al obtener registros:", error);
        setError(`Error al obtener registros desde la API: ${error.message}`);
        setIsLoadingRecords(false);
      }
    };

    fetchData();
  }, [authenticated, navigate]);

  useEffect(() => {
    if (records.length > 0 && userRole) {
      filterRecords(userRole);
    }
  }, [records, userRole]);

  const filterRecords = (role) => {
    if (!role) {
      return;
    }

    if (role === 'student') {
      const userRecords = records.filter((record) => record.user_id === userDataFromLocalStorage.id);
      setFilteredRecords(userRecords);
      // console.log("Registros para estudiante", userRecords);
    } else {
      setFilteredRecords(records);
      // console.log("Todos los registros", records);
    }
  };

  const formNavigate = () => {
    navigate('/healthyForm')
  }

  // const getUserName = () => {
  //   const user = userDataFromLocalStorage;
  //   console.log("User data from localStorage:", user);
  //   return user ? `${user.first_name} ${user.last_name}` : 'Desconocido';
  // };

  return (
    <div>
      {isLoadingRecords ? (
        <div id="container">
          <label className="loading-title">Cargando</label>
          <span className="loading-circle sp1">
            <span className="loading-circle sp2">
              <span className="loading-circle sp3"></span>
            </span>
          </span>
        </div>
      ) : (
        <ul> 
          <div className="recordsHeader" >
            <h1>{userDataFromLocalStorage.first_name} {userDataFromLocalStorage.last_name}</h1>
            <button className="newForm" onClick={formNavigate}>Llenar un nuevo formulario</button>
          </div>
          {filteredRecords.map((record) => (
            <li key={record.id}>
              {userRole === 'student' ? (
                <>
                  <p>Estudiante: {record.user_id}</p>
                  <p>Padecimiento: {record.suffering}</p>
                  <p>Especificaciones: {record.specifications}</p>
                </>
              ) : (
                <>
                  <p>Usuario: {record.user_id}</p>
                  <p>Padecimiento: {record.suffering}</p>
                  <p>Especificaciones: {record.specifications}</p>
                </>
              )}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecordsComponent;
