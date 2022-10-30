import React from "react";
import SideBar from "../UserProfile/SideBar";
import { Outlet } from "react-router-dom";
import "../../Components/styles/dashboard.css";
import { Container, Row, Col } from "reactstrap";
// import ProfileInfo from "./ProfileInfo";

const Dashboard = () => {
  return (
    <>
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
