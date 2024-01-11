import { useEffect, useContext } from "react";
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import FwdApp from "../FwdApp/FwdApp";
// import { useNavigate } from "react-router-dom";
import NewCourse from "../Course/NewCourse";
import User from "../../components/User/User";
import Course from "../Course/Course";
import Group from "../Group/Group";
import NewGroup from "../Group/NewGroup";
import NavigationBar from "../../navbar";
import Health from "../Health/Health";
import DisplayHealth from "../medic records/Clinical_form";
import RecordsComponent from "../Records/Records";
import { AuthContext, AuthProvider } from "./AuthContext";


const PrivateText = () => {
    // const navigate = useNavigate();
    const { currentUser, setCurrentUser, authenticated, setAuthenticated } = useContext(AuthContext);

    const checkTokenValidity = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            setAuthenticated(false);
            setCurrentUser(null);
            return;
        }

        try {
            const response = await fetch("http://localhost:3009/", {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setAuthenticated(true);
                setCurrentUser(data.user);
            } else {
                setAuthenticated(false);
                setCurrentUser(null);
                if (response.status === 401) {
                    // Token expirado, intenta renovar el token
                    const refreshedToken = await refreshAccessToken(); // Función para renovar el token
                    if (refreshedToken) {
                        localStorage.setItem('token', refreshedToken);
                        // Vuelve a verificar la validez del token después de actualizarlo

                        setAuthenticated(true);   // Actualizar el estado de autenticación

                        checkTokenValidity(); // Verificar la validez del nuevo token

                    } else {

                        console.error(Error);
                        // navigate('/login'); // Redirige a la página de inicio de sesión si no se pudo renovar el token
                    }
                }
            }
        } catch (error) {
            console.log("Error:", error);
            setAuthenticated(false);
            setCurrentUser(null);
        }
    };

    const refreshAccessToken = async () => {
        const refreshToken = localStorage.getItem('refreshToken');

        if (!refreshToken) {
            return null;
        }

        try {
            const response = await fetch("http://localhost:3009/refresh_token", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    'Authorization': `Bearer ${refreshToken}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                return data.access_token;
            } else {
                return null;
            }
        } catch (error) {
            console.log("Error refreshing token:", error);
            return null;
        }
    };

    useEffect(() => {
        checkTokenValidity();
    }, []);

    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route
                        path="/*"
                        element={
                            <>
                                <NavigationBar></NavigationBar>
                                <Routes>
                                    <Route path="/home" element={
                                        <FwdApp />
                                    } />
                                    <Route path="/course" element={<Course authenticated={authenticated} />} />
                                    <Route path="/newCourse" element={<NewCourse authenticated={authenticated} />} />
                                    <Route path="/group" element={<Group currentUser={currentUser} authenticated={authenticated} />} />
                                    <Route path="/newGroup" element={<NewGroup />} />
                                    <Route path="/health" element={<Health authenticated={authenticated} />} />
                                    <Route path="/healthyform" element={<DisplayHealth authenticated={authenticated} currentUser={currentUser} />} />
                                    <Route path="/records" element={<RecordsComponent authenticated={authenticated} currentUser={currentUser} />} />
                                </Routes>
                            </>
                        }
                    />

                    <Route path="/login" element={<User />}></Route>

                </Routes>
            </Router>

        </AuthProvider>
    );
};

export default PrivateText;
