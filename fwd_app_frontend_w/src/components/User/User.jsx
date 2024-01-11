import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../pages/PrivateText/AuthContext";
import Signup from "./Signup";
import Login from './Login';
import Logout from './Logout';

const User = () => {
    const { currUser, setCurrUser, authenticated } = useContext(AuthContext);
    const [show, setShow] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (authenticated && !currUser) {
            navigate('/home');
        }
    }, [authenticated, currUser, navigate]);

    if (currUser) {
        return (
            <div>
                <Logout setCurrUser={setCurrUser} />
            </div>
        );
    }

    return (
        <div>
            {show ? (
                <Login setCurrUser={setCurrUser} setShow={setShow} />
            ) : (
                <Signup setCurrUser={setCurrUser} setShow={setShow} />
            )}
        </div>
    );
};

export default User;
