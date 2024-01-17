
import React, { createContext,useState } from 'react';


export const AuthContext = createContext({
    authenticated: null, 
    setAuthenticated: ()=>{},
    currentUser: null,
    setCurrentUser: ()=>{},
    login: ()=>{},
    logout: ()=>{}
});

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState([]);


    const login = (userData) => {
        setCurrentUser(userData);
        console.log("Datos del usuario en el contexto:", userData);
        setAuthenticated(true);
        
    };

console.log("autenticación del contexto", authenticated);

    const logout = () => {
    // Lógica para cerrar sesión
    setCurrentUser(null);
    setAuthenticated(false);
    };

    // console.log("USUARIO EN EL CONTEXTO", currentUser);

    return (
    <AuthContext.Provider value={{ authenticated, setCurrentUser, currentUser, login, logout, setAuthenticated }}>
        {children}
    </AuthContext.Provider>
    );
};