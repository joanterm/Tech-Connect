import {useNavigate} from "react-router-dom"

const Home = () => {
  const navigate = useNavigate()

  return ( 
    <div>
      <h1>HOME</h1>
      <button onClick={() => navigate("/allusers")}>LOGIN</button>
    </div>
   );
}
 
export default Home;