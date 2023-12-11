


import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
    const [authState, setAuthState] = useState({
        _id: '',
        email: '',
        firstName: '',
        lastName: '',
        age: '',
        state: '',
        role: ''
    });

    return (
        <AuthContext.Provider value={{ authState, setAuthState }}>
            {props.children}
        </AuthContext.Provider>
    );
}







//first one
// import { createContext, useState } from "react";
// import React from "react";

// export const AuthContext = createContext();

// export const AuthProvider = props=>{

//     const [authState, setauthState] = useState({
//     _id:'',
//     email:'',
//     firstName:'',
//     lastName:'',
//     age:'',
//     state: '',
//     role:''
//     });

//     return(
//     <AuthContext.Provider value={[authState, setauthState]}>{props.children}</AuthContext.Provider>
//     )
// }












// // GlobalStates.js

// import React, { createContext, useState, useEffect } from 'react';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [authState, setAuthState] = useState({
//         isAuthenticated: false,
//         userData: null,
//     });

//     useEffect(() => {
//         // Function to check if the user is authenticated
//         const checkAuthStatus = async () => {
//             try {
//                 const response = await fetch('/isAuth', {
//                     method: 'GET',
//                     credentials: 'include', // Ensure to send cookies with request
//                 });
//                 const data = await response.json();
//                 setAuthState({
//                     isAuthenticated: data.isAuthenticated,
//                     userData: data.userData,
//                 });
//             } catch (error) {
//                 console.error(error);
//             }
//         };

//         checkAuthStatus();
//     }, []); // Run once on component mount

//     // Function to handle user login
//     const login = async (credentials) => {
//         try {
//             const response = await fetch('/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 credentials: 'include', // Send cookies with request
//                 body: JSON.stringify(credentials),
//             });
//             const data = await response.json();
//             setAuthState({
//                 isAuthenticated: true,
//                 userData: data.userData,
//             });
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     // Function to handle user logout
//     const logout = async () => {
//         try {
//             await fetch('/logout', {
//                 method: 'POST',
//                 credentials: 'include', // Send cookies with request
//             });
//             setAuthState({
//                 isAuthenticated: false,
//                 userData: null,
//             });
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         <AuthContext.Provider value={{ authState, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };
