import Home from "./Home"
import {Routes, Route} from "react-router-dom"
import AllUsers from "./AllUsers"
import MyProfile from "./MyProfile"

function App() {
  return (
    <div>
      <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route exact path="/allUsers" element={<AllUsers />}/>
          <Route exact path="/myprofile" element={<MyProfile />}/>
      </Routes>
    </div>

  );
}

export default App;
