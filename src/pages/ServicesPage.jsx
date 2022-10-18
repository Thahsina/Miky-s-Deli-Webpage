import React from "react";
import { Link, Outlet } from "react-router-dom";
import ServicesHeader from "../Components/Header/ServicesHeader";
import "../Components/styles/servicesPage.css";
import CateringPage from "./CateringPage";

const servicesPage = () => {
  return (
    <>
      <section ><ServicesHeader /></section>
      
      {/* <div className="servicesNav">
        <div className="nav__Links">
          <Link to="/services/catering">Catering Page</Link>
        </div>
        <div className="nav__Links active">
          <Link to="/services/dropoff">Drop off Page</Link>
        </div>
      </div> */}
      <Outlet />
    </>
  );
};

export default servicesPage;
