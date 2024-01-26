import {useNavigate} from "react-router-dom"
import { useState } from "react"
import { Link} from "react-router-dom"

const Home = () => {
  const navigate = useNavigate()
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
      <h1>HOME</h1>
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
        <button>LOGIN</button>
      </form> 
      <button onClick={() => navigate("/allusers")}>LOGIN TEST</button>
      <Link to="/signup">Sign Up</Link> 
    </div>
   )
}
 
export default Home;