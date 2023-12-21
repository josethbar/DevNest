import Signup from "./Signup";
import Login from './Login'
import Logout from './Logout'
import { useState } from "react";
import { useEffect } from "react";
// import PrivateText from "../../pages/PrivateText/PrivateText";
import { useNavigate } from "react-router-dom";
const User = ({ currUser, setCurrUser, authenticated }) => {
    const [show, setShow] = useState(true)
    const navigate = useNavigate()


    useEffect(() => {
        console.log(authenticated, "estas?")
        if (authenticated == true) {
            navigate("/home")
        }
    }, [authenticated, navigate])


    if (currUser)
        return (
            <div>
                {/* Hello {currUser.email} */}
                {/* <PrivateText currUser={currUser} /> */}
                <Logout setCurrUser={setCurrUser} />
            </div>
        )
    return (
        <div>
            {show ?
                <Login setCurrUser={setCurrUser} setShow={setShow} />
                :
                <Signup setCurrUser={setCurrUser} setShow={setShow} />
            }
        </div>
    )
}
export default User





