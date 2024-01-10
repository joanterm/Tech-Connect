import {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"
import axios from "axios"

const MyProfile = () => {
    const URL = "http://localhost:9000/users"
    const [usersData, setUsersData] = useState([])
    const [formData, setFormData] = useState({
        name: "",
        about: "",
        social: ""
      })

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

    const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
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

    return ( 
        <div>
            <h1>MY PROFILE</h1>
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
        </div>
     );
}
 
export default MyProfile;