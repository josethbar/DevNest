import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Group.css';

// import jwtDecode from 'jwt-decode';

function Group({ authenticated }) {
    // Definición de las URLs de la API
    const GROUPS_API_URL = "http://localhost:3009/group";
    const USERS_API_URL = "http://localhost:3009/api/v1/users";

    // Hook de navegación de React Router
    const navigate = useNavigate();

    // Efecto para redirigir si el usuario no está autenticado
    useEffect(() => {
        if (!authenticated) {
            console.log("Estás autenticado. Redirigiendo...");
            navigate("/group");
        }
    }, [authenticated, navigate]);

    // Estados para almacenar grupos y usuarios, y gestionar la carga
    const [groups, setGroups] = useState([]);
    const [isLoadingGroups, setIsLoadingGroups] = useState(true);
    const [users, setUsers] = useState([]);
    const [isLoadingUsers, setIsLoadingUsers] = useState(true);

    // Función para obtener datos de grupos y usuarios desde la API
    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');

            // Obtener grupos
            const groupsResponse = await fetch(GROUPS_API_URL, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const groupsData = await groupsResponse.json();
            setGroups(groupsData);
            setIsLoadingGroups(false);

            // Obtener usuarios
            const usersResponse = await fetch(USERS_API_URL, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            });

            if (usersResponse.ok) {
                const usersData = await usersResponse.json();
                setUsers(usersData);
                setIsLoadingUsers(false);
            } else {
                console.error('Error al obtener usuarios:', usersResponse.status);
                setIsLoadingUsers(false);
            }
        } catch (error) {
            console.error('Error en la llamada a la API:', error.message);
            setIsLoadingGroups(false);
            setIsLoadingUsers(false);
        }
    };

    
    // Efecto para cargar datos al montar el componente
    useEffect(() => {
        fetchData();
    }, []);

    



    // Función para agregar un usuario a un grupo
    const addUserToGroup = async (groupId, userId) => {
        try {
            const token = localStorage.getItem('token');


            const requestData = {
                user_id: userId,
                group_id: groupId
            };

            const response = await fetch
                (`http://localhost:3009/group/${groupId}/add_user`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token
                        },
                        body: JSON.stringify(requestData)
                    });

            // console.log("WHAT'S YOUR NAAAME", userId);
            // console.log("WHEEEEEEEEEEEEEEEEEEERE YOU FROOOM", groupId);

            if (response.ok) {
                console.log('Usuario agregado al grupo');
                const updatedGroups = groups.map(group => {
                    if (group.id === groupId) {
                        return { ...group, selectedUserId: userId };
                    }
                    return group;
                });

                // setGroups([...updatedGroups]);  origin
                setGroups(updatedGroups);
                fetchData();
                console.log("señooooooooor dame paciencia", updatedGroups);
                console.log("Grupos actualizados después de agregar usuario:", updatedGroups);

            } else {
                const errorData = await response.json(); // Obtener el mensaje de error desde el servidor
                console.log('Error al agregar usuario al grupo  FRONTEND:', errorData.error); // Mostrar el mensaje de error en la consola
                console.log("No se pudo agregar el usuario al grupo FRONTEND");
            }
        } catch (error) {
            console.log('Error al agregar usuario al grupo:', error);
        }
    };

    // Función para eliminar un grupo
    const deleteGroup = async (groupId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3009/group/${groupId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            });

            if (response.ok) {
                console.log('Grupo eliminado exitosamente');
                fetchData(); // Actualizar la lista de grupos
            } else {
                console.log('Error al eliminar el grupo');
                console.log('Error al eliminar el grupo ahhhhhhhhhhhhhhhhhhhhh');
            }
        } catch (error) {
            console.log('Error al eliminar el grupo:', error);
        }
    };
    // Manejador de selección de usuario
    const handleUserSelect = (groupId, userId) => {
        const updatedGroups = groups.map(group => {
            if (group.id === groupId) {
                return { ...group, selectedUserId: userId };
            }
            return group;
        });
        setGroups(updatedGroups);
    };

    // Manejador para agregar un usuario a un grupo
    const handleAddUser = (groupId, userId) => {
        addUserToGroup(groupId, userId); // Pasar selectedUserId como argumento
    };

    // Manejador para eliminar un grupo
    const handleDeleteGroup = (groupId) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este grupo?")) {
            deleteGroup(groupId);
        }
    };

    return (
        <div>
            <h1>Grupos</h1>
            {/* Mostrar mensaje de carga si se están cargando grupos o usuarios */}
            {isLoadingGroups || isLoadingUsers ? (
                <div id="container">
                    <label className="loading-title">Cargando</label>
                    <span className="loading-circle sp1">
                        <span className="loading-circle sp2">
                            <span className="loading-circle sp3"></span>
                        </span>
                    </span>
                </div>
            ) : (
                <div>
                    {/* Contenido una vez que se han cargado grupos y usuarios */}
                    {/* <div>¡Hola! Este es el contenido del componente Group.</div> */}
                    {/* Mostrar lista de grupos */}
                    <div>
                        {groups.length > 0 ? (
                            <ul>
                                {groups.map((group) => (
                                    <li key={group.id}>
                                        {group.name}
                                        <select
                                            id={`userDropdown_${group.id}`}
                                            value={group.selectedUserIds || ""}
                                            // onChange={(e) => handleUserSelect(group.id, e.target.value)} origin
                                            onChange={(e) =>handleUserSelect(group.id, Array.from(e.target.selectedOptions, option => option.value))}
                                        >
                                            <option value="">Selecciona Usuario</option>
                                            {users.map((user) => (
                                                <option key={user.id} value={user.id}>
                                                    {user.first_name}
                                                </option>
                                            ))}
                                        </select>

                                        <button onClick={() => handleAddUser(group.id, group.selectedUserId)}>add user</button>

                                        {/* <button onClick={() => handleAddUser(group.id)}>add user</button> no1 */}
                                        {/* <p>Categoría seleccionada: {selectedUserId}</p> */}
                                        <button onClick={() => handleDeleteGroup(group.id)}>eliminar/grupo</button>
                                    </li>
                                ))}
                                <Link to='/newGroup' className='addgroup'>Agregar grupo</Link>
                            </ul>
                        ) : (
                            <p>No hay grupos disponibles.</p>
                        )}
                    </div>
                    {/* Seleccionar un usuario para agregarlo al grupo */}
                    <p>Usuarios disponibles para agregar a un grupo:</p>
                    <ul>
                        {users.map((user) => (
                            <li key={user.id} onClick={() => handleUserSelect(user.id)}>
                                {user.first_name} ----- {user.email}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Group;


