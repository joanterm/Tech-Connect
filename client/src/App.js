import './App.css'
import {useEffect, useState} from "react"
import axios from "axios"

function App() {
  const URL = "http://localhost:9000/users"
  const [usersData, setUsersData] = useState([])
  
  useEffect(() => {
    axios
    .get(URL)
    .then((response) => {
      console.log(response.data)
      setUsersData(response.data)
    })
    .catch((error) => {
      console.log("GET ERROR", error)
    })
  }, [])

  return (
    <div className="App">
      <h1>TESTING REACT</h1>
      {usersData.map((item) => (
        <div>
          <p>Name: {item.name}</p>
          <p>About: {item.about}</p>
          <p>Social: {item.social}</p>
          <br></br>
        </div>
      ))}
    </div>
  );
}

export default App;
