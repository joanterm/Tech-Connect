import { useState } from "react"
import axios from "axios"

const Signup = () => {
    const [authFormData, setAuthFormData] = useState({
        email: "",
        password: ""
    })
    const [formErrors, setFormErrors] = useState("")
    
    const handleAuthSubmit = (e) => {
        e.preventDefault()
        axios
        .post("/auth/signup", {
            email: authFormData.email,
            password: authFormData.password
        })
        .then((response) => {
            console.log(response.data)
            const clientToken = response.data.jwtToken
            localStorage.setItem("token", clientToken)
            setAuthFormData({
                email: "",
                password: ""
            })    
            setFormErrors("")     
        })
        .catch((error) => {
            setFormErrors(error.response.data.message)
        })
    }
  
    const handleAuthChange = (e) => {
        setAuthFormData({
            ...authFormData,
            [e.target.name]: e.target.value
        })   
    }

    return ( 
        <div>
            <h1>SIGNUP</h1>
            <form onSubmit={handleAuthSubmit}>
                <label htmlFor="email">Email:</label>
                    <input 
                    type="text"
                    name="email"
                    value={authFormData.email}
                    onChange={handleAuthChange}
                    />
                <label htmlFor="password">Password:</label>
                    <input 
                    type="text"
                    name="password"
                    value={authFormData.password}
                    onChange={handleAuthChange}
                    />
                <button>SIGNUP</button>
            </form>
            {formErrors}
        </div>
    )
}
 
export default Signup