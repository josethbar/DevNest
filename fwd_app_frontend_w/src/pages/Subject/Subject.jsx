import React, { useState, useEffect } from "react";
import { getSubject, postSubject, postUserSubject, getUsers, getSubjectTypes, getUserRole, getUserRoleUnique} from "../../api/fwd";
import './Subject.css';

function Subject() {
    const [subjects, setSubjects] = useState([]);
    const [users, setUsers] = useState([]);
    const [userRole, setUserRole] = useState(null); 
    const [userId, setUserId] = useState(null);
    const [subjectTypes, setSubjectTypes] = useState([]);
    const [newSubjectData, setNewSubjectData] = useState({
        name: "",
        type: "",
        description: "",
        grade: 0,
    });
    const [newUserSubjectData, setNewUserSubjectData] = useState({
        state: "pending",
        grade: 0,
        feedback: "",
        user_id: "",
        subject_id: ""
    });

    const fetchSubjects = async () => {
        try {
            const subjectsData = await getSubject();
            if (!subjectsData.error) {
                // Filtrar los subjects por el tipo "material"
                const materialSubjects = subjectsData.filter(subject => subject.type === "material");
                setSubjects(materialSubjects);
            } else {
                console.error("Error al obtener subjects:", subjectsData.error);
            }
        } catch (error) {
            console.error("Error al obtener subjects:", error);
        }
    };

    const createSubjectAndUserAssociation = async () => {
        try {
            if (!newUserSubjectData.user_id) {
                throw new Error("Por favor, selecciona un usuario.");
            }

            const createdSubject = await postSubject(newSubjectData);

            if (!createdSubject.error) {
                const subjectId = createdSubject.id;

                const userSubjectData = {
                    state: newUserSubjectData.state,
                    grade: newUserSubjectData.grade,
                    feedback: newUserSubjectData.feedback,
                    user_id: newUserSubjectData.user_id,
                    subject_id: subjectId
                };

                console.log("user_id que es pa user_subject", newUserSubjectData.user_id);
                console.log("Datos del usuario y subject", userSubjectData);



                const createdUserSubject = await postUserSubject(userSubjectData);

                if (createdUserSubject.error) {
                    throw new Error("Error al crear usuario-subject: " + createdUserSubject.error);
                }

                fetchSubjects();

                setNewSubjectData({
                    name: '',
                    type: '',
                    description: '',
                    grade: 0,
                });

                setNewUserSubjectData({
                    state: "",
                    grade: 0,
                    feedback: "",
                    user_id: "",
                });
            } else {
                throw new Error("Error al crear subject: " + createdSubject.error);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        fetchSubjects();
    }, []);

    const fetchUsers = async () => {
        try {
            const usersData = await getUsers();
            if (!usersData.error) {
                setUsers(usersData);
                console.log("Lista de usuarios:", users);
            } else {
                console.error("Error al obtener usuarios:", usersData.error);
            }
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        // Llama a fetchSubjectTypes al montar el componente para obtener los tipos de sujetos
        getSubjectTypes()
        .then(typesData => {
            if (!typesData.error) {
                setSubjectTypes(typesData);
            } else {
                // console.error("Error al obtener tipos de sujetos:", typesData.error);
            }
        })
        .catch(error => {
            // console.error("Error al obtener tipos de sujetos:", error);
        });

    // Llama a getUserRole para obtener el rol del usuario
    getUserRole()
        .then(roleData => {

            if (!roleData.error) {
                setUserRole(roleData.role);
            } else {
                // console.error("Error al obtener el rol del usuario:", roleData.error);
            }
        })
        .catch(error => {
            // console.error("Error al obtener el rol del usuario:", error);
        });
}, []);



useEffect(() => {

    getUserRoleUnique(userId)
        .then(roleData => {
            if (!roleData.error) {
                setUserRole(roleData.role);
            } else {
                console.error("Error al obtener el rol del usuario:", roleData.error);
            }
        })
        .catch(error => {
            console.error("Error al obtener el rol del usuario:", error);
        });
}, [userId]);  

useEffect(() => {
    fetchUsers();
    

    const authenticatedUserId = localStorage.getItem("userId"); 
    setUserId(authenticatedUserId);
}, []);



    return (
        <div>
            <h1>Subjects</h1>
            <div className="material-container">
                {subjects.length > 0 ? (
                    subjects.map((subject) => (
                        <div key={subject.id} className="subject-card">
                            <h3>{subject.name}</h3>
                            <p>
                                <strong>Type:</strong> {subject.type}
                            </p>
                            <p>
                                <strong>Description:</strong> {subject.description}
                            </p>
                            <p>
                                <strong>Grade:</strong> {subject.grade}
                            </p>
                            {/* Agrega más detalles según sea necesario */}
                        </div>
                    ))
                ) : (
                    <p>No hay subjects disponibles.</p>
                )}
            </div>
                    
            {userRole === "professor" || userRole === "admin" ? (
            <div>
                <h2>Crear Nuevo Subject</h2>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={newSubjectData.name}
                    onChange={(e) =>
                        setNewSubjectData((prevData) => ({ ...prevData, name: e.target.value }))
                    }
                />
            </div>
            <div>
                <label>Type:</label>
                <select
                    value={newSubjectData.type}
                    onChange={(e) =>
                        setNewSubjectData((prevData) => ({ ...prevData, type: e.target.value }))
                    }
                >
                    <option value="">Selecciona un tipo</option>
                    {subjectTypes.map((type) => (  // Utiliza subjectTypes en lugar de Subject.SUBJECT_TYPE_OPTIONS
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>

            </div>
            <div>
                <label>Description:</label>
                <input
                    type="text"
                    value={newSubjectData.description}
                    onChange={(e) =>
                        setNewSubjectData((prevData) => ({ ...prevData, description: e.target.value }))
                    }
                />
            </div>
            <div>
                <label>Grade:</label>
                <input
                    type="number"
                    value={newSubjectData.grade}
                    onChange={(e) =>
                        setNewSubjectData((prevData) => ({ ...prevData, grade: parseInt(e.target.value) }))
                    }
                />
            </div>
            <div>
                <label>Usuario:</label>
                <select
                    value={newUserSubjectData.user_id}
                    onChange={(e) => {
                        console.log("Selected user ID:", e.target.value);
                        setNewUserSubjectData((prevData) => ({ ...prevData, user_id: e.target.value }));
                    }}
                >
                    <option value="">Selecciona un usuario</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.first_name} {user.last_name}
                        </option>
                    ))}
                </select>
            </div>
            
                <button onClick={createSubjectAndUserAssociation}>Crear Subject</button>
            </div>
        ) : null}

        </div>
    );
}

export default Subject;
