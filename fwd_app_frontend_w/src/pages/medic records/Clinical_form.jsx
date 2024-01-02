import React, { useState, useEffect } from "react";
import "./medical_form.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

/**
 * Componente DropdownComponent para el formulario médico.
 * @param {Object} currUser - Objeto de información del usuario actual.
 * @param {boolean} authenticated - Estado de autenticación del usuario.
 */
const DropdownComponent = ({ currUser, authenticated }) => {
  // Estados para gestionar la selección de categoría, descripción y errores.
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  // Navegación para redirigir si el usuario no está autenticado.
  const navigate = useNavigate();

  /**
   * Efecto para redirigir si el usuario no está autenticado.
   */
  useEffect(() => {
    if (!authenticated) {
      console.log("No estás autenticado. Redirigiendo...");
      navigate("/healthyform");
    }
  }, [authenticated, navigate]);

  /**
   * Efecto para obtener las categorías médicas al cargar el componente.
   */
  useEffect(() => {
    // Obtener el token de autenticación almacenado localmente.
    const token = localStorage.getItem("token");

    // Manejar el caso en que no se encuentre el token.
    if (!token) {
      setError("Token de autenticación no encontrado");
      return;
    }

    // Realizar la solicitud para obtener las categorías médicas.
    fetch("http://localhost:3009/health", {
      method: "GET",
      headers: {
        "Authorization": token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        // Manejar errores de la respuesta HTTP.
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        // Almacenar las categorías en el estado.
        setCategories(data);
        console.log("Datos obtenidos con éxito:", data);
      })
      .catch((error) => {
        // Manejar errores de la solicitud.
        console.error("Error al obtener categorías:", error);
        setError("Error al obtener categorías desde la API");
      });
  }, []);

  /**
   * Manejar el cambio de categoría seleccionada.
   * @param {Object} event - Objeto de evento de cambio.
   */
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  /**
   * Manejar el envío del formulario médico.
   */
  const handleSubmit = () => {
    // Obtener el token de autenticación almacenado localmente.
    const token = localStorage.getItem("token");

    // Manejar el caso en que no se encuentre el token.
    if (!token) {
      setError("Token de autenticación no encontrado");
      return;
    }

    // Decodificar el token para obtener el user_id.
    const decodedToken = jwtDecode(token);
    const user_Id = decodedToken.sub; // Obtener el User ID del token.
    console.log("User ID del token:", user_Id);

    // Construir el objeto de datos para la solicitud POST.
    const requestData = {
      category: selectedCategory,
      description: description,
      suffering: selectedCategory, // ¿Es correcto utilizar selectedCategory aquí?
      specifications: description,
      user_id: user_Id,
    };

    // Realizar la solicitud POST para enviar el formulario médico.
    fetch("http://localhost:3009/medical_record", {
      method: "POST",
      headers: {
        "Authorization": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        // Manejar errores de la respuesta HTTP.
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        // Manejar la respuesta exitosa.
        console.log("Datos enviados con éxito:", data);
        setSuccessMessage("¡Datos enviados con éxito!");
        navigate("/records")
      })
      .catch((error) => {
        // Manejar errores de la solicitud.
        console.error("Error al enviar datos:", error);
        setError("Error al enviar datos a la API");
        console.log("Detalles del error:", error); // Imprimir detalles del error.
      });
  };

  // Renderizar el componente de formulario médico.
  return (
    <div>
      {error && <p>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
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

// Exportar el componente DropdownComponent.
export default DropdownComponent;
