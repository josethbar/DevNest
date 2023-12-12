import { useRef } from "react"
import './signup.css';


const Signup = ({ setCurrUser, setShow }) => {
    const formRef = useRef()
    const signup = async (userInfo, setCurrUser) => {
        const url = "http://localhost:3009/signup"
        try {
            const response = await fetch(url, {
                method: 'post',
                headers: {
                    "content-type": 'application/json',
                    "accept": "application/json"
                },
                body: JSON.stringify(userInfo)
            })
            const data = await response.json()
            if (!response.ok) throw data.error
            localStorage.setItem('token', response.headers.get("Authorization"))
            setCurrUser(data)
        } catch (error) {
            console.log("error", error)
        }
    }
    const handleSubmit = e => {
        e.preventDefault()
        const formData = new FormData(formRef.current)
        const data = Object.fromEntries(formData)
        const userInfo = {
            "user": { email: data.email, password: data.password, first_name: data.first_name, last_name: data.last_name, age: data.age }
        }
        signup(userInfo, setCurrUser)
        e.target.reset()
    }
    const handleClick = e => {
        e.preventDefault()
        setShow(true)
    }
    return (
        <div className="box">
            <form className="form" ref={formRef} onSubmit={handleSubmit}>
                <p className="title">Sign Up</p>
                <div className="flex">
                    <label>
                        <input type="text" name='first_name' placeholder="first_name" className="input" />
                        <span>Fisrt Name</span>
                    </label>

                    <label>
                        <input type="text" name='last_name' placeholder="last_name" className="input" />
                        <span>Last Name</span>
                    </label>
                </div>

                <label>
                    <input type="email" name='email' placeholder="email" className="input" />
                    <span>Email</span>
                </label>

                <label>
                    <input type="password" name='password' placeholder="password" className="input" />
                    <span>Password</span>
                </label>

                <label>
                    <input type="date" name='age' placeholder="Date" className="input" />
                    <span>Birth Date</span>
                </label>

                <button type='submit' value="Submit" className="submit">Sign Up</button>


                <p className="signin">Already registered, <a href="#login" onClick={handleClick} >Login</a> here.</p>
            </form>

        </div>
    )
}
export default Signup