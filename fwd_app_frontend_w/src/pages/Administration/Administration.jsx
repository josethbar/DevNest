import React from 'react'
import { useState, useContext, useEffect } from 'react';
import { getUsers } from '../../api/fwd';
import { AuthContext } from '../PrivateText/AuthContext';
import { useNavigate } from 'react-router-dom';


function Administration() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const { authenticated } = useContext(AuthContext);


    useEffect(() => {
        const fetchData = async () => {
            try {
                // const storedUserData = JSON.parse(localStorage.getItem("userData")) || {};
                // setUserDataFromLocalStorage(storedUserData);
                // console.log("Registros ACTUALES:", storedUserData);

                if (!authenticated) {
                    console.log("¿Estás autenticado?", authenticated);
                    navigate('/login');
                    return;
                }

                const [users] = await Promise.all([
                    getUsers()
                ]);

                setUsers(users)

                console.log("usuarios de usuarios",  users);


                // console.log("userDataFromLocalStorage", userDataFromLocalStorage);
                // console.log("Registros médicos desde la API:", medicalRecords);

            } catch (error) {
                console.error("Error al obtener registros:", error);
                setError(`Error al obtener registros desde la API: ${error.message}`);

            }
        };



        fetchData();
    }, []);


    return (
        <div>
            <h1>holi</h1>
        </div>
    )
}

export default Administration