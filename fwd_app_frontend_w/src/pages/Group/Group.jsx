import React, { useState } from 'react'
import { useEffect } from 'react';
import { getGroups } from '../../api/fwd';
import { useNavigate } from 'react-router-dom';

function Group(props) {
    const APi_URL = "http://localhost:3009/group"

    const [groups, setGroups] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // const fetchData = async () => {
    //     try {
    //         const token = localStorage.getItem("token");
    //         const response = await fetch(APi_URL, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         });
    //         const json = await response.json();
    //         setGroups(json);
    //     } catch (error) {
    //         console.log("error", error);
    //     }
    // };
    // // fetchData();

    // useEffect(() => {
    //     fetchData();
    // }, []);


    // useEffect(() => {
    //     const getData = async () => {
    //       try {
    //         const groupList = await fetchData(); // Llama a la función fetchData
    //         setGroups(groupList); // Actualiza el estado con los datos obtenidos
    //       } catch (error) {
    //         // Manejo de errores
    //         console.error('Error al obtener datos en el componente:', error);
    //       }
    //     };

    //     getData();
    //   }, []);


    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(APi_URL, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            setGroups(data);
            setIsLoading(false);
        } catch (error) {
            console.log('error', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    const addUserToGroups = async (userId, groupId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`/groups/${groupId}/add_user/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
    
            if (response.ok) {
                console.log('Usuario agregado');
            } else {
                console.log("No se pudo agregar el usuario")
                console.log("usuarioid",userId);
                console.log("grupoid", groupId);
            }
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        const userId = 'group_id'; 
        const groupId = 'user_id'; 
        addUserToGroups(userId, groupId);

    }, []);


    const navigate = useNavigate();

    const irDetalles = (id) => {
        navigate(`/group/${id}`);
    };


    const GroupUsers = ({ groupId }) => {
        const [groupUsers, setGroupUsers] = useState([]);

        useEffect(() => {
            const fetchGroupUsers = async () => {
                try {
                    const response = await fetch(`/api/groups/${groupId}/user`);
                    if (!response.ok) {
                        throw new Error('Error fetching group users');
                    }
                    const data = await response.json();
                    setGroupUsers(data); // Actualizar el estado con los usuarios obtenidos
                } catch (error) {
                    console.error('Error fetching group users:', error);
                }
            };

            fetchGroupUsers();
        }, [groupId]);
        
    




        return (
            <div>
                <h1>groups</h1>

                {isLoading ? (
                    <p>Cargando datos...</p>
                ) : groups ? (
                    <ul>
                        {groupUsers.map((user) => (
                            <li key={user.id}>{user.name}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No se encontraron datos.</p>
                )}
                <a href="/newGroup">new</a>
            </div>
        )
    }
}

    export default Group;