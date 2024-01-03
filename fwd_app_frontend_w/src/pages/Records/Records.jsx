import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import jwtDecode from 'jwt-decode';
import "./Records.css";
import { AuthContext } from '../PrivateText/AuthContext';

const RecordsComponent = ({ currUser }) => {
  const [records, setRecords] = useState([]);
  const [isLoadingRecords, setIsLoadingRecords] = useState(true);
  const [error, setError] = useState([]);
  const { authenticated, currentUser } = useContext(AuthContext);

  const navigate = useNavigate();
  useEffect(() => {
    const checkAuthentication = () => {
      if (!authenticated) {
        navigate('/records');
      }
    };

    checkAuthentication();
  }, [authenticated, navigate]);

  // Verifica si el usuario está autenticado y si currentUser está disponible
  const user = authenticated ? (currUser || currentUser) : null;

  // Asegúrate de que los datos del usuario estén disponibles antes de intentar acceder a sus propiedades
  const name = user ? user.first_name : 'Unknown';

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log('este es el token',token)
    if (!token) {
      setError("Token de autenticación no encontrado");
      return;
    }

    fetch("http://localhost:3009/medical_record", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setRecords(data);
        // console.log("Datos obtenidos con éxito:", data);
        setIsLoadingRecords(false);
      })
      .catch((error) => {
        console.error("Error al obtener registros:", error);
        setError("Error al obtener registros desde la API");
        setIsLoadingRecords(false);
      });
  }, [authenticated]);



  

  useEffect(() => {
    // Aquí puedes acceder a currentUser para obtener sus detalles
    if (currentUser) {
    const { user_id, first_name, email } = currentUser;
    // Realiza acciones con los datos del usuario (id, name, email)
    console.log("User ID:", user_id);
    console.log("User Name:", first_name);
    console.log("User Email:", email);
    
    // También puedes verificar su rol y realizar acciones específicas
    if (currentUser.roles && currentUser.roles.includes('student')) {
        // Si el usuario es estudiante, realiza ciertas acciones
        console.log("User is a student");
    }else{
      console.log("ALGO NO ESTA PASANDO");
    }
    }
}, [currentUser]);



  // Filtrar los registros según el rol del usuario
  const filteredRecords = () => {
    // Verificar si el usuario tiene el rol de estudiante
    if (currentUser?.roles && currentUser.roles.includes('student')) {
      const studentRecords = records.filter(records => records.user_id === currentUser.id);
      return studentRecords;
    }


    console.log("records", records);
    // console.log("role", currentUser.roles);
    console.log("WHAT'S YOUR NAMEEE", currentUser);
    console.log("AUTENTICA?", authenticated);
  console.log('currentUser:', currentUser);
    // Si el usuario tiene el rol de profesor o administrador, mostrar todos los registros
    return records;
  };

  return (
    <div>
      <p>User is authenticated: {authenticated ? 'Yes' : 'No'}</p>
      <p>User Name: {name ? name : 'Unknown'}</p>

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
          {filteredRecords().map((record) => (
            <li key={record.id}>
              <p>Student: {record.user_id}</p>
              <p>Suffering: {record.suffering}</p>
              <p>Specifications: {record.specifications}</p>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecordsComponent;
