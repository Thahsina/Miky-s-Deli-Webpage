import React from "react";
import { Outlet } from "react-router-dom";
import ServicesHeader from "../../Components/Header/ServicesHeader";
import "../../Components/styles/servicesPage.css";

const servicesPage = () => {
  return (
    <>
      <section>
        <ServicesHeader />
      </section>
      <Outlet />
    </>
  );
};

export default servicesPage;
