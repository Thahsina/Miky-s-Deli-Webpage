import React from "react";
import { useStateValue } from "../context/StateProvider";
import { Container, Row } from "reactstrap";
import DropoffCard from "../Components/UI/DropoffCard";

const DropoffPage = () => {
    const [{ dropoffMenuItems }, dispatch] = useStateValue();
  return (
    <>
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
            {console.log(dropoffMenuItems)}
            <DropoffCard data={dropoffMenuItems} />
          </Row>
        </Container>
      </section>
    </>
  );
};

export default DropoffPage;
