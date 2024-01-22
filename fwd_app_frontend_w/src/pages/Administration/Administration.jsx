import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { getUsers } from '../../api/fwd';
import { AuthContext } from '../PrivateText/AuthContext';
import { useNavigate } from 'react-router-dom';
import "./Administration.css";
function Administration() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [newUserData, setNewUserData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        age: '',
        state: '',
        // Agrega cualquier otro campo necesario
    });

    const navigate = useNavigate();
    const { authenticated } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!authenticated) {
                    console.log("¿Estás autenticado?", authenticated);
                    navigate('/login');
                    return;
                }

                const [usersData] = await Promise.all([getUsers()]);
                setUsers(usersData);
            } catch (error) {
                console.error("Error al obtener registros:", error);
                setError(`Error al obtener registros desde la API: ${error.message}`);
            }
        };

        fetchData();
    }, [authenticated, navigate]);

    

    return (
        <div className="administration-container">
        <h1>Lista de Usuarios</h1>
        {error && <p className="error-message">{error}</p>}
        {users.length > 0 ? (
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                        <th>Edad</th>
                        <th>Estado</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.email}</td>
                            <td>{user.age}</td>
                            <td>{user.state}</td>
                            <td>{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        ) : (
            <p className="no-users-message">No hay usuarios para mostrar.</p>
        )}
    </div>
    );
}

export default Administration;
