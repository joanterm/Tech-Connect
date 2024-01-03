import Home from "./Home"
import {Routes, Route} from "react-router-dom"
import Dashboard from "./Dashboard"

function App() {
  return (
    <div>
      <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route exact path="/dashboard" element={<Dashboard />}/>
      </Routes>
    </div>

  );
}

export default App;
