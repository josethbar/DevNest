import { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter as Router} from 'react-router-dom';
import FwdApp from "../FwdApp/FwdApp";
import NewCourse from "../Course/NewCourse";
import User from "../../components/User/User";
 // import jwtDecode from 'jwt-decode';
import Course from "../Course/Course";
import Group from "../Group/Group";
import NewGroup from "../Group/NewGroup";


const PrivateText = ({ currUser, setCurrUser }) => {
    // debugger;


    // const {authState,setAuthState} = useContext(AuthContext);
    const [message, setMessage] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    
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
                    console.log('Authenticated:', token);
                    console.log('Authenticated:', data);

                    setAuthenticated(true);
                    setMessage(data.message);
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
        if (currUser) {
            setAuthenticated(true)
        }
    }, [currUser]);



    return (
        <Router>
            {/* <AuthProvider> */}
            <Routes>
                {/* <User currUser={currUser} setCurrUser={setCurrUser} /> */}
                <Route path="/login" element={<User currUser={currUser} setCurrUser={setCurrUser} authenticated={authenticated} />}></Route>
                {/* <Route path="/" element={<FwdApp message={message} />} /> */}
                <Route path="/" element={<User currUser={currUser} setCurrUser={setCurrUser} authenticated={authenticated}></User>}></Route>
                <Route path="/home" element={<FwdApp authenticated={authenticated} />} />
                <Route path="/course" element={ <Course authenticated={authenticated} /> } />
                <Route path="/newCourse" element={ <NewCourse authenticated={authenticated} /> } />
                <Route path="/group" element={<Group authenticated={authenticated}/>}/>
                <Route path="/newGroup" element={<NewGroup/>}/>
            </Routes>
            {/* </AuthProvider> */}
        </Router>
    );
};

export default PrivateText;
