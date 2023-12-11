import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    useEffect(() => {
        const checkTokenValidity = async () => {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                try {

                    const decodedToken = JSON.parse(atob(storedToken.split('.')[1]));
                    const tokenExpirationTime = decodedToken.exp * 1000; // in milliseconds

                    if (tokenExpirationTime < Date.now()) {

                        logout();
                    }
                } catch (error) {
                    console.error('Error checking token validity:', error);
                    logout();
                }
            }
        };

        checkTokenValidity();
    }, [token]);

    const login = (newToken) => {
        setToken(newToken);
        localStorage.setItem('token', newToken);
    };

    const logout = () => {
        setToken('');
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
