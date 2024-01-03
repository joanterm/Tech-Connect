import {useEffect, useState} from "react"
import axios from "axios"
import Users from "./Users"

const Home = () => {
    const URL = "http://localhost:9000/users"
    const [usersData, setUsersData] = useState([])
    const [formData, setFormData] = useState({
      name: "",
      about: "",
      social: ""
    })
    const [userDataId, setUserDataId] = useState()
    
    //GET
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
  
    //POST
    const postUserInfo = (userInfo) => {
      axios
      .post(URL, userInfo)
      .then((response) => {
        setUsersData([
          response.data,
          ...usersData
        ])
        setFormData({
          name: "",
          about: "",
          social: ""
        })
      })
      .catch((error) => {
        console.log("POST ERROR", error)
      })
    }
  
    //DELETE
    const deleteUserInfo = (userId) => {
      axios
      .delete(`${URL}/${userId}`)
      .then((response) => {
        setUsersData(usersData.filter((data) => {
          return data._id !== userId
        }))
      })
      .catch((error) => {
        console.log("DELETE ERROR", error)
      })
    }

    //UPDATE
    const updateUserInfo = () => {

    }

    //UPDATES FORM FIELDS WHEN "UPDATE" BUTTONS IS CLICKED
    useEffect(() => {
      usersData.find((data) => {
        if(data._id === userDataId) {
          setFormData({
            name: data.name,
            about: data.about,
            social: data.social
          })
        }
      })
    }, [userDataId])


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
        <div>
            <h1>THIS IS GOING TO BE A FORM TO LOG IN</h1>
            <button>SOME BUTTON</button>
            <Users/>
            <h1>ALL USERS</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input 
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="off"
                    value={formData.name}
                    onChange={handleChange}
                />
                <label htmlFor="about">About:</label>
                <input 
                    type="text"
                    name="about"
                    id="about"
                    autoComplete="off"
                    value={formData.about}
                    onChange={handleChange}
                />
                <label htmlFor="about">Social:</label>
                <input 
                    type="text"
                    name="social"
                    id="social"
                    autoComplete="off"
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
                <button onClick={() => deleteUserInfo(item._id)}>DELETE</button>
                <button onClick={() => setUserDataId(item._id)}>UPDATE</button>
                <br></br>
                <br></br>
                </div>
            ))}         
        </div>
     );
}
 
export default Home;