import React from "react";
import { Container, Row } from "reactstrap";
import CateringCard from "../../Components/UI/CateringCard";
import "../../Components/styles/cateringPage.css";
import { useStateValue } from "../../context/StateProvider";
import { Helmet } from "react-helmet-async";

const CateringPage = () => {
  const [{ cateringMenuItems }] = useStateValue();

  return (
    <>
      <Helmet>
        <title>Miky's Deli - Catering Services</title>
        <meta
          name="description"
          content="We also offer catering services for your special occasions, with free delivery across Doha."
        />
        <link rel="canonical" href="/services" />
      </Helmet>
      <section>
        <Container className="cateringPage__container d-flex flex-wrap justify-content-around mb-4">
          <div className="cateringCard__title text-center">
            <h1 id="pageHeaderTitle">Catering Menu</h1>
          </div>
          <Row
            lg="12"
            md="12"
            sm="4"
            xs="2"
            className="cateringPage__row mt-4 d-flex flex-column justify-content-md-center"
          >
            <CateringCard data={cateringMenuItems} />
          </Row>
        </Container>
      </section>
    </>
  );
};

export default CateringPage;
