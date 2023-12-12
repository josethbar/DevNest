import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Group({ userId, authenticated }) {
    //asignas una variable al api
    const API_URL = "http://localhost:3009/group";

    const navigate = useNavigate();

    useEffect(() => {
        if (authenticated === false) {
            console.log("estas?" , authenticated)
            navigate("/course");
        }
    }, [authenticated, navigate]);


        //Seteas variable de grupos y estado
    const [groups, setGroups] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    //haces un fetch al que le pasas el toquen
    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(API_URL, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            //llamas los datos de los groups 
            const data = await response.json();
            setGroups(data);
            setIsLoading(false);

            //no encuentra datos
        } catch (error) {
            console.log('Error fetching data:', error);
            setIsLoading(false);
        }
    };

    //carga la función
    useEffect(() => {
        fetchData();
    }, []);


    //añadir el usuario a un group
    const addUserToGroup = async (groupId) => {
        
        try {
            // le pasa el token al fetch
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3009/groups/${groupId}/add_user/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            //agrega el usuario
            if (response.ok) {
                console.log('Usuario agregado al grupo');
                // Puedes actualizar la interfaz aquí si es necesario
            } else {
                console.log("No se pudo agregar el usuario al grupo");
            }
        } catch (error) {
            console.log('Error adding user to group:', error);
        }
    };


    const handleAddUser = (groupId) => {
        addUserToGroup(groupId);
        console.log("WHAAAT´S YOUR NAME", userId);
        console.log("WHERE YOU FROOOM", groupId);
    };

    return (
        <div>
            <h1>Grupos</h1>

            {isLoading ? (
                <p>Cargando datos...</p>
            ) : (
                <div>
                    {groups.length > 0 ? (
                        <ul>
                            {groups.map((group) => (
                                <li key={group.id}>
                                    {group.name}
                                    <button onClick={() => handleAddUser(group.id)}>
                                        +
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No hay grupos disponibles.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Group;
