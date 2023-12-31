import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import "./Records.css";


const RecordsComponent = ({ currUser, authenticated }) => {
  const [records, setRecords] = useState([]);
  const [isLoadingRecords, setIsLoadingRecords] = useState(true);
  const [error, setError] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      console.log("No estás autenticado. Redirigiendo...");
      navigate("/records");
    }
  }, [authenticated, navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");

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
        console.log("Datos obtenidos con éxito:", data);
        setIsLoadingRecords(false);
      })
      .catch((error) => {
        console.error("Error al obtener registros:", error);
        setError("Error al obtener registros desde la API");
        setIsLoadingRecords(false);
      });
  }, [authenticated]);

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
          {records.map((record) => (
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
