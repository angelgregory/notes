import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/react.svg";

const Header = () => {
   return (
      <header>
         <Link to="/" className="logo">
            <img src={logo} alt="ReactJs" />
         </Link>
         <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/About">About</NavLink>
         </nav>
      </header>
   );
};

export default Header;
