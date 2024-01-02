import React, { useState, useEffect } from 'react';
import './Course.css';
// import { getCourses } from '../../api/fwd';
import { useNavigate } from 'react-router-dom';
import imagen from '../../img/borrar.png';
import editar from '../../img/editar.png';

function Course({ authenticated }) {
    // URL de la API para obtener datos de los cursos
    const APi_URL = "http://localhost:3009/course";

    // Variables de estado
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editCourseId, setEditCourseId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        info: '',
        description: ''
    });

    const [groups, setGroups] = useState([])
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // useEffect para verificar el estado de autenticación y redirigir si no está autenticado
    useEffect(() => {
        if (authenticated == false) {
            console.log("¿Estás autenticado?", authenticated)
            navigate("/course");
        }
    }, [authenticated, navigate]);

    // Función para obtener datos de los cursos desde la API
    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(APi_URL, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            setCourses(data);
            // console.log("couuuuuuuuuuuusrde", data)
            setIsLoading(false);
        } catch (error) {
            setError('Error al cargar datos.');
            setIsLoading(false);
        }
    };

    // useEffect para obtener datos cuando el componente se monta
    useEffect(() => {
        fetchData();
    }, []);

    // Función para manejar la eliminación de un curso
    const handleDeleteCourse = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await fetch(`${APi_URL}/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const updatedCourses = courses.filter(course => course.id !== id);
            setCourses(updatedCourses);
        } catch (error) {
            setError('Error al eliminar el curso.');
        }
    };

    // Función para manejar la edición de un curso
    const handleEditCourse = (course) => {
        setEditCourseId(course.id);
        setFormData({
            name: course.name,
            info: course.info,
            description: course.description
        });
    };

    // URL para editar un curso específico
    const editCourseUrl = `${APi_URL}/${editCourseId}`;

    // Función para guardar las ediciones a un curso
    const handleSaveEdit = async () => {
        try {
            const token = localStorage.getItem("token");
            const updatedCourse = {
                id: editCourseId,
                ...formData
            };
            await fetch(editCourseUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedCourse)
            });

            const updatedCourses = courses.map(course =>
                course.id === editCourseId ? updatedCourse : course
            );
            setCourses(updatedCourses);
            setEditCourseId(null);
        } catch (error) {
            setError('Error al guardar la edición.');
        }
    };

    // Función para manejar cambios en los campos de entrada del formulario de edición
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };



    const handleCourseChange = (e) => {
        setSelectedCourse(e.target.value);
    };

    const handleGroupChange = (e) => {
        setSelectedGroup(e.target.value);
    };



    const assignGroupCourse = async (selectedCourse, selectedGroup) => {
        try {
            if (!selectedCourse || !selectedGroup) {
                setError('Por favor, selecciona un curso y un grupo.');
                return;
                
            }
    
            const token = localStorage.getItem('token');
            const requestData = {
                course_id: selectedCourse,
                group_id: selectedGroup
            };
    
            const response = await fetch(`http://localhost:3009/assign_group/${selectedGroup}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(requestData)
            });
    
            if (response.ok) {
                console.log("Grupo asignado correctamente");
            } else {
                setError('Error al asignar el grupo al curso.');
            }
        } catch (error) {
            setError('Error al realizar la asignación.');
        }
    };
    

    // ======================================="acaaaaaaaaaaaaaaaa"===========================
    const fetchGroups = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3009/group`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            })

            if (!response.ok) {
                throw new Error('Failed to fetch groups.');
            }

            const data = await response.json();
            setGroups(data); // Almacena los grupos en el estado 'groups'
        } catch (error) {
            setError('Error fetching groups.aquí');
        }
    };

    useEffect(() => {
        fetchGroups();
    }, []);






    return (
        <div className='container-cage'>
            <div>
                <div className='top-container'>
                    <h1>Courses</h1>
                    <a href="/newCourse" className="custom-btn btn-2">Nuevo</a>
                </div>
            </div>
            {error && <p>{error}</p>}
            {isLoading ? (
                <div id="container">
                    <label className="loading-title">Cargando</label>
                    <span className="loading-circle sp1">
                        <span className="loading-circle sp2">
                            <span className="loading-circle sp3"></span>
                        </span>
                    </span>
                </div>
            ) : courses.length > 0 ? (
                <ul className='courseBox'>
                    {courses.map((course, index) => (
                        <li key={index}>
                            {editCourseId === course.id ? (
                                // Formulario de edición para el curso seleccionado
                                <div className='carta'>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="text"
                                        name="info"
                                        value={formData.info}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="text"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                    />
                                    <button onClick={handleSaveEdit}>Guardar</button>
                                </div>
                            ) : (
                                // Mostrar detalles del curso
                                <div className='carta'>
                                    <h2 className='courseName'>{course.name}</h2>
                                    <p>{course.info}</p>
                                    <p>{course.description}</p>
                                    <div className='buttonBox' >
                                        {/* Botones de editar y eliminar */}
                                        <button className='editButton' onClick={() => handleEditCourse(course)}> <img src={editar} alt="" className='coursebutton' />  </button>
                                        <button className='deleteButton' onClick={() => handleDeleteCourse(course.id)}> <img src={imagen} alt="" className='coursebutton' /></button>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No se encontraron datos.</p>
            )}
            {/* Enlace para navegar a la página de nuevo curso */}


            <div className='assign-group-form'>
                <h2>Asignar Grupo a Curso</h2>
                <label htmlFor='courses'>Seleccionar Curso:</label>
                <select id='courses' onChange={handleCourseChange}>
                    <option value=''>Selecciona un curso</option>
                    {courses.map((course) => (
                        <option key={course.id} value={course.id}>
                            {course.name}
                        </option>
                    ))}
                </select>
                <label htmlFor='groups'>Seleccionar Curso:</label>
                <label htmlFor='groups'>Seleccionar Grupo:</label>
                <select id='groups' onChange={handleGroupChange}>
                    <option value=''>Selecciona un grupo</option>
                    {groups.map((group) => (
                        <option key={group.id} value={group.id}>
                            {group.name}
                        </option>
                    ))}
                </select>

                {/* <button onClick={assignGroupCourse}>Asignar Grupo</button>   */}
                <button onClick={() => assignGroupCourse(selectedCourse, selectedGroup)}>Asignar Grupo BIG</button>

                {error && <p>{error}</p>}
            </div>

        </div>
    )
}

export default Course;

