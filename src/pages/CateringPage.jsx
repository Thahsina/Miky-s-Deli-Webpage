import React from "react";
import { Container, Row} from "reactstrap";
import CateringCard from "../Components/UI/CateringCard";
import "../Components/styles/cateringPage.css";

import { useStateValue } from "../context/StateProvider";
import CateringImage1 from "../images/cateringImage(1).JPG";
import CateringImage2 from "../images/cateringImage(2).jpeg";
import CateringImage3 from "../images/cateringImage(3).JPG";

import { Link } from "react-router-dom";

const CateringPage = () => {
  const [{ cateringMenuItems }, dispatch] = useStateValue();

  return (
    <>
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
