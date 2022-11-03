import React from "react";
import { useStateValue } from "../context/StateProvider";
import { Container, Row } from "reactstrap";
import DropoffCard from "../Components/UI/DropoffCard";
import {  Helmet } from "react-helmet-async";


const DropoffPage = () => {
    const [{ dropoffMenuItems }, dispatch] = useStateValue();
  return (
    <>
    {/* <Helmet title="Drop-off Services"> */}
    <Helmet title="Services">
        <title>Miky's Deli - Drop-off Services</title>
        <meta name='description' content="Order now for free home delivery for 20 - 50 persons"/>
        <link rel="canonical" href="/services"/>
      </Helmet>
      <section className="dropoff__banner"></section>
      <section>
        <Container className="cateringPage__container d-flex flex-wrap justify-content-around mb-4">
          <div className="cateringCard__title text-center">
            <h1 id="pageHeaderTitle">Drop-Off Menu</h1>
          </div>
          <Row
            lg="12"
            md="12"
            sm="4"
            xs="2"
            className="cateringPage__row mt-4 d-flex flex-column justify-content-md-center"
          >
            {/* {console.log("dropoffMenuItems",dropoffMenuItems)} */}
            <DropoffCard data={dropoffMenuItems} />
          </Row>
        </Container>
      </section>
      {/* </Helmet> */}
    </>
  );
};

export default DropoffPage;
