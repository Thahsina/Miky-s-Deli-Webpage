import React from "react";
import SideBar from "../UserProfile/SideBar";
import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import "../../Components/styles/dashboard.css";
import { Container, Col } from "reactstrap";
// import ProfileInfo from "./ProfileInfo";

const Dashboard = () => {
  return (
    <>
    <Helmet>
        <title>Miky's Deli - User Dashboard</title>
        <meta
          name="description"
          content="Mikys Deli Qatar."
        />
        <link rel="canonical" href="/dashboard" />
      </Helmet>
      <header>
        <Container className="dashboard__banner banner py-8">
          <h3>My Dashboard</h3>
        </Container>
      </header>
      <section className="mt-4">
        <main>
          <Col lg='2' md='2' className="mt-4">
            <SideBar />
            
          </Col>
          <Outlet />
          
        </main>
      </section>
    </>
  );
};

export default Dashboard;
