// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);

                // Aquí puedes extraer datos específicos del token decodificado
                const userData = {
                    id: decodedToken.userId,
                    name: decodedToken.name,
                    email: decodedToken.email,
                    // ... otros datos del usuario si están presentes en el token
                };

                // Utiliza el método login del AuthProvider para establecer el estado del usuario
                login(userData);
            } catch (error) {
                // Manejo de errores al decodificar el token
                console.error("Error al decodificar el token:", error);
            }
        }
    }, []);



    const login = (userData) => {
    // Lógica de autenticación, obtención de datos del usuario, etc.
    // Una vez que se autentica el usuario, actualiza el estado
    setCurrentUser(userData);
    setAuthenticated(true);
    };

    const logout = () => {
    // Lógica para cerrar sesión
    setCurrentUser(null);
    setAuthenticated(false);
    };

    return (
    <AuthContext.Provider value={{ authenticated, setCurrentUser, currentUser, login, logout, setAuthenticated }}>
        {children}
    </AuthContext.Provider>
    );
};
