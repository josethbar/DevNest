import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../PrivateText/AuthContext';

// URL de la API para crear un nuevo curso
const API_URL = "http://localhost:3009/course";

function NewCourse() {
    // Estado para almacenar la información del nuevo curso
    const { authenticated, setAuthenticated } = useContext(AuthContext);
    const [newCourse, setNewCourse] = useState({
        name: '',
        description: '',
        info: ''
    });
    
    // console.log("ATENTICADO DEL CONTE", authenticated);
    // Función para manejar cambios en los campos de entrada del formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCourse({ ...newCourse, [name]: value });
    };

    // Función para crear un nuevo curso al enviar el formulario
    const handleCreateCourse = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ course: newCourse })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Curso creado:', data);
                setAuthenticated(true);
                navigate("/course");
            } else {
                const errorData = await response.json();
                console.log("Token recuperado:", token);
                console.error('Error al crear el curso:', errorData.errors);
            }

        } catch (error) {
            console.error('Error al crear el curso en el catch:', error);
        }
        
        
        if(authenticated){
            console.log("weeeeeeeee");
            navigate("/course");
        }
    };

    // Hook de navegación
    const navigate = useNavigate()

    // Efecto para redirigir a la página de inicio de sesión si no está autenticado
    // useEffect(() => {

    //     console.log(authenticated, "¿estás autenticado?")
    //     if (!authenticated) {
    //         navigate("/login")
    //     }
    // }, [authenticated, navigate])

    // Renderización del componente
    return (
        <div className='container-cage'>
            <h1>Crear Curso</h1>

            <form onSubmit={handleCreateCourse}>
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre del Curso"
                    value={newCourse.name}
                    onChange={handleInputChange}
                /> <br />

                <textarea
                    name="description"
                    placeholder="Descripción del Curso"
                    value={newCourse.description}
                    onChange={handleInputChange}
                ></textarea><br />

                <input
                    type="text"
                    name="info"
                    placeholder="Información Adicional"
                    value={newCourse.info}
                    onChange={handleInputChange}
                /> <br />

                <button type="submit">Crear Curso</button>
                {/* {newCourse && <redirect to="/" />} */}
            </form>
        </div>
    )
}

export default NewCourse;
