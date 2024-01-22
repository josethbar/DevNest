import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Group.css';
import { AuthContext } from '../PrivateText/AuthContext';
// import jwtDecode from 'jwt-decode';

function Group() {
    // Definición de las URLs de la API
    const GROUPS_API_URL = "http://localhost:3009/group";
    const USERS_API_URL = "http://localhost:3009/api/v1/users";
    const USER_GROUPS = "http://localhost:3009/user_groups";

    // Hook de navegación de React Router
    const navigate = useNavigate();

    const { authenticated } = useContext(AuthContext);

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

            const token = localStorage.getItem("token");

            // Obtener grupos
            const groupsResponse = await fetch(GROUPS_API_URL, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token
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


            const userGroupsResponse = await fetch(USER_GROUPS, {

                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }


            });
            

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
            const token = localStorage.getItem("token");
            console.log("Token de group:", token);

            console.log("SON LOS IDS EN LA FUNCION DEL FETCH", groupId, userId)

            if (!token) {
                console.log("No se encontró un token");
                // Implementa la lógica para redirigir a la página de inicio de sesión, por ejemplo.
                return;
            }


            //pasar de array a entero
            const requestData = {
                user_id: userId,
                group_id: groupId
            };

            console.log("SOY EL REQUEST", requestData)

            const response = await fetch
                (`http://localhost:3009/group/:groupId/add_user`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: token
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
            } else if (response.status === 401) {
                console.log('Token no válido o revocado');
                // Implementa la lógica para manejar el error relacionado con el token no válido o revocado
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

        console.log("SON LOS IDS", groupId, userId)
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

            {/* Mostrar mensaje de carga si se están cargando grupos o usuarios */}
            {isLoadingGroups || isLoadingUsers ? (
                <div>
                    <div className="loader-container">
                        <div className="loader"></div>
                        <div className="loader-text">cargando grupos...</div>
                    </div>
                </div>
            ) : (
                <div className="dad-group"  >
                    <nav className="subNav">
                        <div className="sub-nav-links">
                            <Link to="/course" className='sub-links'>Course</Link>
                            <Link to="/home" className='sub-links'>Groups</Link>
                            {groups.length > 0 ? (
                                <ul className='dadGroups'>
                                    {groups.map((group) => (
                                        <li className='groupsList' key={group.id}>
                                            <Link to="/home" className='sub-links'>{group.name}</Link>
                                        </li>
                                    ))}
                                    <Link to='/newGroup' className='addgroup'>Agregar grupo</Link>
                                </ul>
                            ) : (
                                <div>
                                    <p>No hay grupos disponibles.</p>
                                    <Link to='/newGroup' className='addgroup'>Agregar grupo</Link>
                                </div>
                            )}
                        </div>
                    </nav>
                    <div>
                        {groups.length > 0 ? (
                            <ul className='dadList'>
                                {groups.map((group) => (
                                    <li className='list' key={group.id}>
                                        <h1 className='groupName'> {group.name} </h1>
                                        <select
                                            id={`userDropdown_${group.id}`}
                                            value={group.selectedUserIds || ""}
                                            // onChange={(e) => handleUserSelect(group.id, e.target.value)} origin
                                            onChange={(e) => handleUserSelect(group.id, Array.from(e.target.selectedOptions, option => option.value))}
                                        >
                                            <option value="">Selecciona Usuario</option>
                                            {users.map((user) => (
                                                <option key={user.id} value={user.id}>
                                                    {user.first_name}
                                                    {user.id}
                                                </option>
                                            ))}
                                        </select>
                                        <button className='adduser' onClick={() => handleAddUser(group.id, group.selectedUserId)}>add user</button>
                                        <button className="button" onClick={() => handleDeleteGroup(group.id)} >
                                            <svg viewBox="0 0 448 512" className="svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
                                        </button>
                                        {/* <button onClick={() => handleAddUser(group.id)}>add user</button> no1 */}
                                        {/* <p>Categoría seleccionada: {selectedUserId}</p> */}
                                    </li>
                                ))}
                                <Link to='/newGroup' className='addgroup'>Agregar grupo</Link>
                            </ul>
                        ) : (
                            <div>
                                <p>No hay grupos disponibles.</p>
                                <Link to='/newGroup' className='addgroup'>Agregar grupo</Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Group;


