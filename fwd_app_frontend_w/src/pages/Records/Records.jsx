import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, AuthProvider} from "../PrivateText/AuthContext";
import "./Records.css";

const RecordsComponent = () => {
  // Obtener el estado de autenticación del contexto
  const { authenticated } = useContext(AuthContext);
  console.log("Authenticated en records:", authenticated);
  // alert(authenticated)


  // Estados locales para manejar registros, carga, errores, registros filtrados y datos de usuario
  const [records, setRecords] = useState([]);
  const [isLoadingRecords, setIsLoadingRecords] = useState(true);
  const [error, setError] = useState(null);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [userDataFromLocalStorage, setUserDataFromLocalStorage] = useState({});

  // Función de navegación proporcionada por react-router-dom
  const navigate = useNavigate();

  // Efecto para obtener y almacenar datos de usuario desde el almacenamiento local
  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData")) || {};
    setUserDataFromLocalStorage(storedUserData);
    console.log("Registros ACTUALES:", storedUserData);
  }, []);


  // Efecto para redirigir a la página de registros si no está autenticado

  useEffect(() => {
    if (!authenticated) {
      console.log("¿Estás autenticado?", authenticated);
      navigate('/login');
    }
  }, [authenticated, navigate]);



  // Efecto para obtener registros médicos desde la API
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Token de autenticación no encontrado");
      setIsLoadingRecords(false);
      return;
    }

    fetch("http://localhost:3009/medical_record", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
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
        setIsLoadingRecords(false);
      })
      .catch((error) => {
        console.error("Error al obtener registros:", error);
        setError(`Error al obtener registros desde la API: ${error.message}`);
        setIsLoadingRecords(false);
      });
  }, []);

  // Efecto para obtener el rol del usuario desde la API y filtrar registros en consecuencia
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3009/user_role", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token
          },
        });
  
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
  
        const userDataRole = await response.json();
        const userRole = userDataRole.role;
  
        console.log("Datos del rol del usuario", userDataRole);
        console.log("Rol del usuario", userRole);
  
        // Llamar a filterRecords dentro del bloque try
        filterRecords(userRole);

      } catch (error) {
        console.error("Error al obtener el rol del usuario:", error);
        setError(`Error al obtener el rol del usuario: ${error.message}`);
        setIsLoadingRecords(false);
      }
    };
  
    fetchData();
  }, [userDataFromLocalStorage.id, token]);

  useEffect(() => {
    if (records.length > 0 && userDataFromLocalStorage.id) {
      filterRecords();
    }
  }, [records, userDataFromLocalStorage.id]);

  const filterRecords = (userRole) => {
    if (!userRole && !userDataFromLocalStorage.id) {
      return;
    }

    if (userRole === 'student') {
      // Filtrar registros para estudiantes
      const userRecords = records.filter((record) => record.user_id === userDataFromLocalStorage.id);
      setFilteredRecords(userRecords);
    } else {
      // Mostrar todos los registros para otros roles
      setFilteredRecords(records);
    }
  };


  return (
    <div>

        {isLoadingRecords ? (
          // Muestra un mensaje de carga si los registros están siendo cargados
          <div id="container">
            <label className="loading-title">Cargando</label>
            <span className="loading-circle sp1">
              <span className="loading-circle sp2">
                <span className="loading-circle sp3"></span>
              </span>
            </span>
          </div>
        ) : (
          // Muestra la lista de registros filtrados
          <ul>
            {filteredRecords.map((record) => (
              <li key={record.id}>
                <p>Estudiante: {record.user_id}</p>
                <p>Padecimiento: {record.suffering}</p>
                <p>Especificaciones: {record.specifications}</p>
                <hr />
              </li>
            ))}
          </ul>
        )}

    </div>
  );
};

export default RecordsComponent;
