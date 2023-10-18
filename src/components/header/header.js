import React, { useState } from "react";
import "./header.css";
import menuItems from "../../constants/menuItems";
import Login from "../login/login";
import Register from "../register/register";
import { SessionStorage } from "../../utils/helper";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [signup, setSignup] = useState(false);
  const auth = SessionStorage();
  const navigate = useNavigate();

  const handleClick = () => {
    setActive(!active);
  };

  const loginClick = () => {
    setOpen(true);
    setSignup(false);
  };

  const handleClose = () => {
    setOpen(false);
    setSignup(false);
  };

  const signupOpen = () => {
    setSignup(true);
    setOpen(false);
  };
  const logOut = () => {
    sessionStorage.removeItem("fullstack-001");
    navigate("/");
  };

  return (
    <nav className="header">
      <h1 className="header-logo" onClick={()=>navigate("/home")}>Product</h1>
      <div className="menu-icon" onClick={handleClick}>
        <i className={active ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      <ul className={active ? "header-menu active" : "header-menu"}>
        {auth ? (menuItems.map((item, index) => {
          return (
            <li key={index}>
              <a href={item.url} className={item.cName}>
                {item.title}
              </a>
            </li>
          );
        })): ''}
      </ul>

      {auth ? (
        <button onClick={logOut}>LogOut</button>
      ) : (
        <>
          <button  onClick={() => setSignup(true)}>Sign Up</button>  &nbsp;
          <button onClick={() => setOpen(true)}>Sign In</button>
        </>
      )}

      <Login open={open} handleClose={handleClose} createNew={signupOpen} />
      <Register
        open={signup}
        handleClose={handleClose}
        createNew={loginClick}
      />
    </nav>
  );
};

export default Navbar;
