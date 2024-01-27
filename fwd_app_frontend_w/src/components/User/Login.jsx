import { useRef, useContext, useEffect } from "react";
import './login.css';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../pages/PrivateText/AuthContext";

const Login = ({ setShow }) => {
    const formRef = useRef();
    const { setCurrentUser, setAuthenticated, login, authenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        // Verificar si hay información de autenticación en el almacenamiento local al cargar la aplicación
        const storedToken = localStorage.getItem('token');
        const storedUserData = localStorage.getItem('userData');

        if (storedToken && storedUserData && !authenticated) {
            setCurrentUser(JSON.parse(storedUserData));
            setAuthenticated(true);
        }
    }, [authenticated, setCurrentUser, setAuthenticated]);

    const handleLogin = async (credentials) => {
        const url = "http://localhost:3009/login";

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error);
            }

            const data = await response.json();
            setCurrentUser(data);
            setAuthenticated(true);

            // Actualizar el almacenamiento local al iniciar sesión
            localStorage.setItem('token', response.headers.get('Authorization'));
            console.log("token al entrar", localStorage.setItem('token', response.headers.get('Authorization')));
            localStorage.setItem('userData', JSON.stringify(data));

            navigate("/home");

        } catch (error) {
            console.error("Error during login:", error);
            // Mostrar un mensaje de error al usuario en la interfaz
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        const data = Object.fromEntries(formData);
        const userInfo = {
            "user": { email: data.email, password: data.password }
        };
        handleLogin(userInfo);
        e.target.reset();
    };

   



    return (
        <div className="inputContainer">

            <form className="form_main" action="" ref={formRef} onSubmit={handleSubmit}>
                <p className="heading">Login</p><br />
                <span>Tu correo y contraseña te fueron proporcionados por el administrador</span>

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

                </div>
            </form>
        </div>
    );
};

export default Login;
