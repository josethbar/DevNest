import React, { useState } from 'react';

function Health() {
    // URL de la API para la creación de registros de salud
    const apiUrl = "http://localhost:3009/health";

    // Estado para almacenar los datos del formulario
    const [formData, setFormData] = useState({
        category: '',
        description: ''
    });

    // Función para manejar cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Obtener el token de autenticación almacenado localmente
            const token = localStorage.getItem("token");

            // Enviar una solicitud POST a la API con los datos del formulario
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            // Verificar si la respuesta de la API es exitosa
            if (response.ok) {
                console.log('Registro creado exitosamente');
                
                // Limpiar el formulario después de un envío exitoso
                setFormData({
                    category: '',
                    description: ''
                });
            } else {
                console.error('Error al crear el registro');
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    // Renderizar el formulario de creación de registros de salud
    return (
        <div>
            <h2>Crear nuevo registro de salud</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="category">Categoría:</label>
                <input
                    type="text"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                />

                <label htmlFor="description">Descripción:</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />

                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default Health;


