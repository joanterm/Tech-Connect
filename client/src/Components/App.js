import Home from "./Home"
import {Routes, Route} from "react-router-dom"
import AllUsers from "./AllUsers"
import MyProfile from "./MyProfile"
import Signup from "./Signup"
import {useNavigate} from "react-router-dom"

function App() {
  const navigate = useNavigate()

  const logout = () => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token")
      navigate("/")      
    }
  }

  return (
    <div>
      <button onClick={logout}>LOGOUT</button>
      <Routes>         
          <Route exact path="/" element={<Home />}/>
          <Route exact path="/allUsers" element={<AllUsers />}/>
          <Route exact path="/myprofile" element={<MyProfile />}/>
          <Route exact path="/signup" element={<Signup />}/>
      </Routes>
    </div>

  );
}

export default App;
