import './App.css'
import {useEffect, useState} from "react"
import axios from "axios"

function App() {
  const URL = "http://localhost:9000/users"
  const [usersData, setUsersData] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    about: "",
    social: ""
  })
  
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

  const postUserInfo = (userInfo) => {
    axios
    .post(URL, userInfo)
    .then((response) => {
      setUsersData([
        ...usersData,
        response.data
      ])
    })
    .catch((error) => {
      console.log("POST ERROR", error)
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    postUserInfo({
      name: formData.name,
      about: formData.about,
      social: formData.social
    })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="App">
      <h1>TESTING REACT</h1>
      <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input 
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <label htmlFor="about">About:</label>
          <input 
            type="text"
            name="about"
            value={formData.about}
            onChange={handleChange}
          />
          <label htmlFor="about">Social:</label>
          <input 
            type="text"
            name="social"
            value={formData.social}
            onChange={handleChange}
          />
          <button className="submit-button">Submit</button>
      </form>
      {usersData.map((item) => (
        <div key={item._id}>
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
