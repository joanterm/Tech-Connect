import { useState } from "react"

const Signup = () => {
    const [authData, setAuthData] = useState({
        email: "",
        password: ""
    })
    
    const handleAuthSubmit = (e) => {
        e.preventDefault()
        console.log(authData.email, authData.password)
    }

    const handleAuthChange = (e) => {
        setAuthData({
            ...authData,
            [e.target.name]: e.target.value
        })   
    }
    console.log(authData)

    return ( 
        <div>
            <h1>SIGNUP</h1>
            <form onSubmit={handleAuthSubmit}>
                <label htmlFor="email">Email:</label>
                    <input 
                    type="text"
                    name="email"
                    value={authData.email}
                    onChange={handleAuthChange}
                    />
                <label htmlFor="password">Password:</label>
                    <input 
                    type="text"
                    name="password"
                    value={authData.password}
                    onChange={handleAuthChange}
                    />
                <button>SIGNUP</button>
            </form>
        </div>
    )
}
 
export default Signup