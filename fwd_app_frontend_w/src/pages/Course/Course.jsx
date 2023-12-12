import React, { useState, useEffect } from 'react';
import './Course.css';
import { getCourses } from '../../api/fwd';
import { useNavigate } from 'react-router-dom';
import imagen from '../../img/descarga.png';



function Course({ authenticated }) {
    const APi_URL = "http://localhost:3009/course";
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editCourseId, setEditCourseId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        info: '',
        description: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (authenticated === false) {
            console.log("estas?" , authenticated)
            navigate("/course");
        }
    }, [authenticated, navigate]);

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
            setIsLoading(false);
        } catch (error) {
            setError('Error al cargar datos.');
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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

    const handleEditCourse = (course) => {
        setEditCourseId(course.id);
        setFormData({
            name: course.name,
            info: course.info,
            description: course.description
        });
    };

    const editCourseUrl = `${APi_URL}/${editCourseId}`;

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

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className='container-cage'>
           
            <div>
            
            <h1>Courses</h1>
            <img src={imagen} alt="" />
            </div>
            {error && <p>{error}</p>}
            {isLoading ? (
                <p>Cargando datos...</p>
            ) : courses.length > 0 ? (
                <ul className='courseBox'>
                    {courses.map((course, index) => (
                        <li key={index}>
                            {editCourseId === course.id ? (
                                <div>
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
                                    <button onClick={handleSaveEdit}>Save</button>
                                </div>
                            ) : (
                                <div>
                                    <h2>{course.name}</h2>
                                    <p>{course.info}</p>
                                    <p>{course.description}</p>
                                    <button className='editButton' onClick={() => handleEditCourse(course)}>Edit</button>
                                    <button className='deleteButton' onClick={() => handleDeleteCourse(course.id)}>Delete</button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No se encontraron datos.</p>
            )}
            {/* <Link to="/newCourse">New</Link> */}
            <a href="/newCourse">new</a>
        </div>
    )
}

export default Course;
