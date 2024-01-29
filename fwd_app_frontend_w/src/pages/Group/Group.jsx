import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUsers, getGroups, fetchGroupUsers, getUserRoleUnique } from '../../api/fwd';
import './Group.css';

function Group() {
    const [groups, setGroups] = useState([]);
    const [isLoadingGroups, setIsLoadingGroups] = useState(true);
    const [users, setUsers] = useState([]);
    const [userRole, setUserRole] = useState("")
    const [isLoadingUsers, setIsLoadingUsers] = useState(true);
    const [usersInGroups, setUsersInGroups] = useState({});

    const fetchData = async () => {
        try {
            const groupsData = await getGroups();
            const usersData = await getUsers();

            if (!groupsData.error && !usersData.error) {
                setGroups(groupsData);
                setUsers(usersData);
                setIsLoadingGroups(false);
                setIsLoadingUsers(false);
            } else {
                console.error('Error al obtener datos:', groupsData.error || usersData.error);
                setIsLoadingGroups(false);
                setIsLoadingUsers(false);
            }
        } catch (error) {
            console.error('Error en la llamada a la API:', error.message);
            setIsLoadingGroups(false);
            setIsLoadingUsers(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const addUserToGroup = async (groupId, userId) => {
        try {

            const token = localStorage.getItem("token");
            console.log("Adding user to group. Group ID:", groupId);


            // Check if the user is already in the group
            const userOnGroup = await fetchGroupUsers(groupId);

            if (userOnGroup.error) {
                console.error('Error al obtener usuarios en el grupo:', userOnGroup.error);
                return;
            }

            if (userOnGroup.some(user => user.id === userId)) {
                console.log('El usuario ya está en el grupo');
                return;
            }

            // Add the user to the group by creating a user_group
            const requestData = {
                user_id: userId,
                group_id: groupId
            };

            const response = await fetch('http://localhost:3009/user_groups', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token
                },
                body: JSON.stringify(requestData)
            });

            if (response.ok) {
                console.log('Usuario agregado al grupo');

                // Now fetch the updated list of users in the group
                const updatedGroupUsers = await fetchGroupUsers(groupId);

                // Update the state with the updated list of users
                setUsersInGroups(prevState => ({
                    ...prevState,
                    [groupId]: updatedGroupUsers.map(userGroup => userGroup.user),
                }));

                // Update the state of groups if needed
                // ...

                console.log("Grupos actualizados después de agregar usuario:", groups);
            }
        } catch (error) {
            console.log('Error al agregar usuario al grupo:', error);
        }
    };





    const removeUserFromGroup = async (groupId, userId) => {
        try {
            const token = localStorage.getItem("token");

            // Make an API call to remove the user from the group
            const response = await fetch(`http://localhost:3009/group/${groupId}/remove_user/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token
                },
            });

            if (response.ok) {
                console.log('Usuario eliminado del grupo exitosamente');
            } else if (response.status === 401) {
                console.log('Token no válido o revocado');
            } else {
                console.log('Error al eliminar el usuario del grupo');
            }

            // Update the state to reflect the removed user
            setGroups(groups => groups.map(group => {
                if (group.id === groupId) {
                    const updatedUsersInGroup = group.usersInGroup.filter(user => user.id !== userId);
                    return { ...group, usersInGroup: updatedUsersInGroup };
                }
                return group;
            }));

            setUsersInGroups(prevState => ({
                ...prevState,
                [groupId]: (prevState[groupId] || []).filter(userGroup => userGroup.user && userGroup.user.id !== userId),
            }));

            console.log("Grupos actualizados después de eliminar usuario:", groups);
        } catch (error) {
            console.log('Error al eliminar usuario del grupo:', error);
        }
    };



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
            } else {
                console.log('Error al eliminar el grupo');
                console.log('Error al eliminar el grupo ahhhhhhhhhhhhhhhhhhhhh');
            }
        } catch (error) {
            console.log('Error al eliminar el grupo:', error);
        }
    };

    const handleUserSelect = (groupId, userId) => {
        const updatedGroups = groups.map(group => {
            if (group.id === groupId) {
                const updatedUsersInGroup = Array.isArray(group.usersInGroup) ? group.usersInGroup : [];
                return { ...group, selectedUserId: userId, usersInGroup: [...updatedUsersInGroup, userId] };
            }
            return group;
        });
        setGroups(updatedGroups);
    };

    const handleAddUser = (groupId, userId) => {
        console.log("SON LOS IDS", groupId, userId)
        addUserToGroup(groupId, userId);
    };

    const handleDeleteGroup = (groupId) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este grupo?")) {
            deleteGroup(groupId);
        }
    };


    const fetchUserGroups = async () => {
        try {
            const token = localStorage.getItem('token');
            const userGroupsData = await fetch('http://localhost:3009/user_groups', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
            });

            if (userGroupsData.ok) {
                const userGroups = await userGroupsData.json();
                return userGroups;
            } else {
                console.error('Error al obtener datos de user_groups:', userGroupsData.error);
                return [];
            }
        } catch (error) {
            console.error('Error en la llamada a la API:', error.message);
            return [];
        }
    };

    const getUsersForGroup = async (groupId) => {
        const usersInGroup = await fetchUserGroups(groupId);
        return usersInGroup.map(userGroup => userGroup.user); // Assuming your user data is in the 'user' property
    };

    const handleUsersInGroup = async (groupId) => {
        try {
            const usersInGroup = await getUsersForGroup(groupId);

            // Update the state with the users in the current group
            setUsersInGroups(prevState => ({
                ...prevState,
                [groupId]: usersInGroup,
            }));

            console.log('Users in Group:', usersInGroup);
        } catch (error) {
            console.error('Error al obtener usuarios en el grupo:', error.message);
        }
    };

    useEffect(() => {
        getUserRoleUnique()
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
    }, []);

    return (
        <div>
            {isLoadingGroups || isLoadingUsers ? (
                <div>
                    <div className="loader-container">
                        <div className="loader"></div>
                        <div className="loader-text">cargando grupos...</div>
                    </div>
                </div>
            ) : (
                <div className="dad-group">
                    <nav className="subNav">
                        <div className="sub-nav-links">
                            <Link to="/course" className='sub-links'>Course</Link>
                            <Link to="/home" className='sub-links'>Groups</Link>
                            {groups.length > 0 ? (
                                <ul className='showUsers'>
                                    {groups.map((group) => (
                                        <li key={group.id}>
                                            <h1 className='groupName'>{group.name}</h1>
                                            <p>Usuarios en el grupo:</p>
                                            <ul>
                                                <button onClick={() => handleUsersInGroup(group.id)}>Show Users</button>
                                                {usersInGroups[group.id] && (
                                                    <ul>
                                                        {usersInGroups[group.id].map((user) => (
                                                            <li key={user.id}>
                                                                {user.first_name} {user.last_name}
                                                                {userRole === 'admin' && (
                                                                    <button onClick={() => removeUserFromGroup(group.id, user.id)}>Remove user</button>
                                                                )}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </ul>
                                        </li>
                                    ))}
                                    {userRole === 'admin' && (
                                        <Link to='/newGroup' className='addgroup'>Agregar grupo</Link>
                                    )}
                                </ul>
                            ) : (
                                <div>
                                    <p>No hay grupos disponibles.</p>
                                    {userRole === 'admin' && (
                                        <Link to='/newGroup' className='addgroup'>Agregar grupo</Link>
                                    )}
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
                                        {userRole === 'admin' && (
                                            <div>
                                                <select
                                                    id={`userDropdown_${group.id}`}
                                                    value={group.selectedUserIds || ""}
                                                    onChange={(e) => handleUserSelect(group.id, Array.from(e.target.selectedOptions, option => option.value))}
                                                >
                                                    <option value="">Selecciona Usuario</option>
                                                    {users.map((user) => (
                                                        <option key={user.id} value={user.id}>
                                                            {user.first_name} {user.last_name}
                                                        </option>
                                                    ))}
                                                </select>
                                                <button className='adduser' onClick={() => handleAddUser(group.id, group.selectedUserId)}>add user</button>
                                            </div>
                                        )}
                                        {userRole === 'admin' && (
                                            <button className="button" onClick={() => handleDeleteGroup(group.id)} >
                                                <svg viewBox="0 0 448 512" className="svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
                                            </button>
                                        )}
                                    </li>
                                ))}
                                {userRole === 'admin' && (
                                    <Link to='/newGroup' className='addgroup'>Agregar grupo</Link>
                                )}
                            </ul>
                        ) : (
                            <div>
                                <p>No hay grupos disponibles.</p>
                                {userRole === 'admin' && (
                                    <Link to='/newGroup' className='addgroup'>Agregar grupo</Link>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Group;
