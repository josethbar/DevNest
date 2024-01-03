import { useRef } from "react"
import './login.css';
import { useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import {useHistory} from "react-router-dom"
// import { AuthContext } from "../../pages/Course/GlobalStates";
// import jwtDecode from 'jwt-decode';

const Login = ({ setCurrUser, setShow }) => {
    // debugger;
    const formRef = useRef()
    const navigate = useNavigate()
    // const token = response.headers.get("Authorization");

    const handleLogin = async (credentials) => {
        const url = "http://localhost:3009/login";
        try {
            const response = await fetch(url, {
                method: "post",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(credentials)
            });
            console.log("Response from server:", response)
    
            const data = await response.json()

            localStorage.setItem('token', data.token);

            if (!response.ok)
                throw data.error
            
            localStorage.setItem("token", response.headers.get("Authorization"))
            setCurrUser(data)
            
            navigate("/home")

        } catch (error) {
            console.log("error", error)
        }
    }
    
    const handleSubmit = e => {
        e.preventDefault()
        const formData = new FormData(formRef.current)
        const data = Object.fromEntries(formData)
        const userInfo = {
            "user": { email: data.email, password: data.password }
        }
        handleLogin(userInfo, setCurrUser)
        e.target.reset()
    }
    const handleClick = e => {
        e.preventDefault()
        setShow(false)

    }


    return (

        <div className="inputContainer">

            <form className="form_main" action="" ref={formRef} onSubmit={handleSubmit}>
                <p className="heading">Login</p>

                <div className="inputContainer">
                    <input className="inputField" id="username" type="email" name='email' placeholder="email" />

                    <svg className="inputIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2e2e2e" viewBox="0 0 16 16">
                        <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
                    </svg>
                </div>

                <div className="inputContainer">
                    <input type="password" className="inputField" name="password" id="password" placeholder="Password" />

                    {/* <svg className="inputIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2e2e2e" viewBox="0 0 16 16">
                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
                    </svg> */}
                    <svg viewBox="0 0 16 16" fill="#2e2e2e" height="16" width="16" xmlns="http://www.w3.org/2000/svg" className="inputIcon">
                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
                    </svg>
                </div>

                <button id="button" ype='submit' value="Login">Submit</button>
                {/* <button id="button" type='submit' value="Login"/> */}



                <div className="signupContainer">
                    <p>Not registered yet,</p>
                    <a className="forgotLink" href="#signup" onClick={handleClick} >Signup</a>

                </div>
            </form>
        </div>
    )
}
export default Login




