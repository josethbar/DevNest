import { useState, useEffect, useContext } from "react";
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import FwdApp from "../FwdApp/FwdApp";
import NewCourse from "../Course/NewCourse";
import User from "../../components/User/User";
// import jwtDecode from 'jwt-decode';
import Course from "../Course/Course";
import Group from "../Group/Group";
import NewGroup from "../Group/NewGroup";
import NavigationBar from "../../navbar";
import Health from "../Health/Health";
import DisplayHealth from "../medic records/Clinical_form";
import RecordsComponent from "../Records/Records";
import { AuthContext } from "./AuthContext";

const PrivateText = () => {
    // debugger;

    const { currentUser, setCurrentUser, authenticated, setAuthenticated, login } = useContext(AuthContext);

    const [message, setMessage] = useState(null);
    // const [authenticated, setAuthenticated] = useState(false)

    const checkTokenValidity = async () => {
        const token = localStorage.getItem('token');

        if (token) {
            try {
                const response = await fetch("http://localhost:3009/", {
                    method: "GET",
                    headers: {
                        "content-type": "application/json",
                        "authorization": token
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    // console.log('Authenticated:', token);
                    // console.log('data:', data);
                    // console.log('user', User);
                    console.log('data.user', data.user);

                    login(data.user)
                    setAuthenticated(true);
                    setMessage(data.message);
                    setCurrentUser(data.user);

                    console.log(data.user);

                } else {
                    setAuthenticated(false);
                    setMessage(null);

                }
            } catch (error) {
                console.log("Error:", error);
                setAuthenticated(false);
                setMessage(null);

            }
        }
    };



    useEffect(() => {
        checkTokenValidity();
    }, []);


    useEffect(() => {
        if (currentUser) {
            setAuthenticated(true)
        }
    }, [currentUser]);



    return (
        <Router>
            {/* <NavigationBar></NavigationBar> */}
            {/* <AuthProvider> */}
            <Routes>
                <Route
                    path="/*"
                    element={
                        <>
                            <NavigationBar></NavigationBar>
                            <Routes>
                                <Route path="/home" element={<FwdApp currentUser={currentUser} authenticated={authenticated} />} />
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

                <Route path="/login" element={<User currUser={currentUser} setCurrUser={setCurrentUser} authenticated={authenticated} />}></Route>

            </Routes>

        </Router>
    );
};

export default PrivateText;
