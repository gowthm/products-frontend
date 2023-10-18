import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import './home.css';

const Home = () => {
    
    const navigate = useNavigate();
    const logOut = () => {
        sessionStorage.removeItem("fullstack-001");
        navigate("/")
    }
    return (
        <div>
    <div className="landing-page">
      <div className="overlay">
        <div className="content">
          <h1>Cutting-Edge Technology</h1>
          <p>Powered by state-of-the-art technology, our gadget sets new standards in performance and innovation.</p>
        </div>
      </div>
    </div>
  
        </div>
    )
};

export default Home;
