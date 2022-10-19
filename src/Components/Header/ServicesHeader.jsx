import React from "react";
import { NavLink, Link } from "react-router-dom";
import "../styles/servicesHeader.css";
import logo from "../../images/mikyslogo.png";

const nav__links = [
  {
    display: "Home",
    path: "/home",
  },
  {
    display: "Catering Menu",
    path: "/menu",
  },
  {
    display: "Drop Off Menu",
    path: "/services/catering",
  },
];

const ServicesHeader = () => {
  return (
    <header id="header">
      <nav className="links">
        <Link to="/">
          <img className="logo" style={{}} src={logo} alt="logo" />
        </Link>
        <NavLink activeclassname="active" to="/home">Home</NavLink>
        <NavLink activeclassname="active" to="/services/catering">Catering Menu</NavLink>
        <NavLink activeclassname="active" to="/services/dropoff">Drop Off Menu</NavLink>
      </nav>
    </header>
  );
};

export default ServicesHeader;

