import {useNavigate} from "react-router-dom"
import { useState, useEffect } from "react"
import { Link} from "react-router-dom"
import axios from "axios"

const Home = () => {
  const navigate = useNavigate()
  const [authFormData, setAuthFormData] = useState({
    email: "",
    password: ""
  })
  const [formErrors, setFormErrors] = useState("")
  const [user, setUser] = useState(null)

  //IF TOKEN EXISTS -> KEEPS USER'S EMAIL AVAILABE ON PAGE RERENDED
  useEffect(() => {
    const parsedToken = JSON.parse(localStorage.getItem("token")) 
    if (parsedToken) {
      setUser({
        email: parsedToken.email
      })
    } else {
      setUser(null)
    }
  }, [])

  const logout = () => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token")
      navigate("/")  
      setUser(null)    
    }
  }

  const handleAuthSubmit = (e) => {
    e.preventDefault()
    console.log(authFormData.email, authFormData.password)
    axios
    .post("/auth/login", {
        email: authFormData.email,
        password: authFormData.password
    })
    .then((response) => {
        console.log(response.data)
        localStorage.setItem("token", JSON.stringify(response.data))
        setAuthFormData({
            email: "",
            password: ""
        }) 
        setUser({
          email: response.data.email,
          jwtToken: response.data.jwtToken
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
  console.log(user)

  return ( 
    <div>
      <h1>HOME</h1>
      {user && <div>{user.email}</div>}
      <button onClick={logout}>LOGOUT</button>
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
        <button>LOGIN</button>
        {formErrors}
      </form> 
      <button onClick={() => navigate("/allusers")}>LOGIN TEST</button>
      <Link to="/signup">Sign Up</Link> 
    </div>
   )
}
 
export default Home;