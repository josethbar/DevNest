import React from "react";
import { useState, useContext, useEffect } from "react";
import { getUsers, getUserRole, updateUserState, updateUserRole } from "../../api/fwd";
import { AuthContext } from "../PrivateText/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Administration.css";



function Administration() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [userRoles, setUserRoles] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState({});
    const [selectedStates, setSelectedStates] = useState({});
    const [newUserData, setNewUserData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        age: "",
        state: "",
        // Agrega cualquier otro campo necesario
    });

    const navigate = useNavigate();
    const { authenticated } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!authenticated) {
                    console.log("¿Estás autenticado?", authenticated);
                    navigate("/login");
                    return;
                }

                const [usersData, userRolesData] = await Promise.all([
                    getUsers(),
                    getUserRole(),
                ]);

                setUsers(usersData);
                setUserRoles(userRolesData);
                console.log("Estos son los roles:", userRolesData);

                const initialSelectedRoles = {};
                const initialSelectedStates = {};

                usersData.forEach((user) => {
                    // Busca el rol actual en el array userRoles
                    const userRole = userRolesData.find((role) => role.id === user.id)?.role;

                    initialSelectedRoles[user.id] = userRole || ""; // Si no se encuentra, establece como cadena vacía
                    initialSelectedStates[user.id] = user.state || "";
                });

                setSelectedRoles(initialSelectedRoles);
                setSelectedStates(initialSelectedStates);

                console.log("Estos son los roles:", userRolesData);
            } catch (error) {
                console.error("Error al obtener registros:", error);
                setError(`Error al obtener registros desde la API: ${error.message}`);
            }
        };

        fetchData();
    }, [authenticated, navigate]);

    function getUserRoleById(userId) {
        const userRoleData = userRoles.find((userData) => userData.id === userId);


    }

    const handleUpdateRole = async (userId, newRole) => {
        try {
            const response = await updateUserRole(userId, newRole);
            console.log(
                "Respuesta de actualización de rol en el componente:",
                response
            );

            // Actualizar el estado local con los roles actualizados
            setUsers((prevUsers) => {
                return prevUsers.map((user) => {
                    if (user.id === userId) {
                        // Actualizar el rol del usuario específico
                        return { ...user, role: response.role };
                    }
                    getUserRoleById();
                    return user;
                });
            });
            setUserRoles((prevUserRoles) => {
                return prevUserRoles.map((userRole) => {
                    if (userRole.id === userId) {
                        return { id: userId, role: newRole };
                    } else {
                        return userRole;
                    }
                });
            });
        } catch (error) {
            console.error(
                "Error al actualizar el rol desde el componente:",
                error.message
            );
            // Manejar el error, mostrar un mensaje, etc.
        }
    };

    const handleUpdateState = async (userId, newState) => {
        try {
            const response = await updateUserState(userId, newState);
            console.log("Respuesta de actualización de estado en el componente:", response);

            // Actualizar el estado local con los estados actualizados
            setUsers((prevUsers) => {
                return prevUsers.map((user) => {
                    if (user.id === userId) {
                        // Actualizar el estado del usuario específico
                        return { ...user, state: newState };
                    }
                    return user;
                });
            });
            setSelectedStates((prevSelectedStates) => ({
                ...prevSelectedStates,
                [userId]: newState,
            }));
        } catch (error) {
            console.error("Error al actualizar el estado desde el componente:", error.message);
            // Manejar el error, mostrar un mensaje, etc.
        }
    };

    function getUserStateById(user) {
        return user.state || 'Sin Estado';
    }
   
    const handleClick = e => {
        navigate('/signup');
    };



    return (
        <div className="administration-container">
            <h1>Lista de Usuarios</h1>
            {error && <p className="error-message">{error}</p>}
            {users.length > 0 ? (
                <div>
                <button onClick={handleClick} className="newUser">
                  Crear nuevo usuario
                </button>
            <table className="user-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Email</th>
                            <th>Edad</th>
                            <th>Role</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.email}</td>
                                <td>{2024 - user.age}</td>
                                <td>
                                    <select
                                        value={selectedRoles[user.id]}
                                        onChange={(e) => {
                                            setSelectedRoles((prevRoles) => ({
                                                ...prevRoles,
                                                [user.id]: e.target.value,
                                            }));
                                            handleUpdateRole(user.id, e.target.value);
                                        }}
                                    >
                                        <option value="student">Student</option>
                                        <option value="professor">Professor</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                                <td>
                                    <select
                                        value={selectedStates[user.id]}
                                        onChange={(e) => {
                                            setSelectedStates((prevStates) => ({
                                                ...prevStates,
                                                [user.id]: e.target.value,
                                            }));
                                            handleUpdateState(user.id, e.target.value);
                                        }}
                                    >
                                        <option value="aprobado">Aprobado</option>
                                        <option value="en_curso">En Curso</option>
                                        <option value="expulsado">Expulsado</option>
                                        <option value="retirado">Retirado</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

           </div>
                
            ) : (
                <div>
                <div className="loader-container">
                    <div className="loader"></div>
                    <div className="loader-text">cargando usuarios, esto puede tardar un poco</div>
                </div>
            </div>
            )}
        </div>
    );
}

export default Administration;
