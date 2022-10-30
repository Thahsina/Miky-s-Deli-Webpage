import React from "react";
import { Col, Row } from "reactstrap";
import "../../Components/styles/cateringOrderAdmin.css";
import CateringOrderCard from "../../Components/UI/CateringOrderCard";

const CateringOrdersAdmin = () => {
  return (
    <>
      <div className="cateringOrdersAdmin__page">
        <h2>Catering Orders</h2>
        <div className="cateringOrdersAdmin__container">
          <Row>
            <Col lg="12" md="12">

            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default CateringOrdersAdmin;
