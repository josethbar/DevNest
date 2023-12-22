import React, { useState, useEffect } from "react";
import "./medical_form.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';


const DropdownComponent = ({ currUser, authenticated }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState([])

  const navigate = useNavigate();

  // Efecto para redirigir si el usuario no está autenticado
  useEffect(() => {
    if (!authenticated) {
      console.log("Estás autenticado. Redirigiendo...");
      navigate("/healthyform");
    }
  }, [authenticated, navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // Resto del código para enviar la solicitud


    if (!token) {
      setError("Token de autenticación no encontrado");
      return;
    }

    fetch("http://localhost:3009/health", {
      method: "GET",
      headers: {
        "Authorization": token,
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
        setCategories(data);
        console.log("Datos enviados con éxito:", data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setError("Error al obtener categorías desde la API");
      });
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSubmit = () => {
    const token = localStorage.getItem("token");


    if (!token) {
      setError("Token de autenticación no encontrado");
      return;
    }
    //decodiic el token para obtener el user_id
    const decodedToken = jwtDecode(token);
    const user_Id = decodedToken.sub; // Obtener el User ID del token
    console.log("User ID del en o lo que sea  token:", user_Id);


    const requestData = {
      category: selectedCategory,  
      description: description,    
      suffering: selectedCategory,
      specifications: description,
      user_id: user_Id,
    };

    const userId = sessionStorage.getItem("user_id");
    console.log("User IDyyyyyyyyyyyyyyyyyyyyy:", userId);

    fetch("http://localhost:3009/medical_record", {
      method: "POST",
      headers: {
        "Authorization": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Datos enviados con éxito:", data);
        // Puedes hacer algo con la respuesta si es necesario
      })
      .catch((error) => {
        console.error("Error al enviar datos:", error);
        setError("Error al enviar datos a la API");
        console.log("Detalles del error:", error); // Imprimir detalles del error
      });
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <label htmlFor="categoryDropdown">Selecciona una categoría:</label>
      <select
        id="categoryDropdown"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="">Selecciona...</option>
        {categories &&
          categories.map((category) => (
            <option key={category.id} value={category.category}>
              {category.category}
            </option>
          ))}
      </select>

      <label htmlFor="descriptionInput">Descripción:</label>
      <input
        type="text"
        id="descriptionInput"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <p>Categoría seleccionada: {selectedCategory}</p>

      <button onClick={handleSubmit}>Enviar</button>
    </div>
  );
};

export default DropdownComponent;
