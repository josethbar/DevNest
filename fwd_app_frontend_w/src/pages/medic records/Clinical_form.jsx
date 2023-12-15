import React, { useState, useEffect } from "react";
import "./records.css";

const DropdownComponent = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Token de autenticación no encontrado");
      return;
    }

    fetch("http://localhost:3009/health", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
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
        console.log("whats your name", data);
        console.log("categoriaaaaa", categories);
        setCategories(data);

        console.log("y vos que haces data.category", data.category);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setError("Error al obtener categorías desde la API");
      });
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div>
      {error && <p>Error: {error}</p>}
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
      <p>Categoría seleccionada: {selectedCategory}</p>
    </div>
  );
};

export default DropdownComponent;
