import React from "react";
import { Col, Row } from "reactstrap";
import "../../Components/styles/cateringOrderAdmin.css";
import CateringOrderCardAdmin from "../../Components/UI/CateringOrderCardAdmin";

const CateringOrdersAdmin = () => {
  return (
    <>
      <div className="cateringOrdersAdmin__page">
        <h2 className="text-center mb-4">Catering Orders</h2>
        <Row>
          <div className="cateringOrdersAdmin__container">
            <Col lg="12" md="12">
              <CateringOrderCardAdmin />
              <CateringOrderCardAdmin />
              <CateringOrderCardAdmin />
            </Col>
          </div>
        </Row>
      </div>
    </>
  );
};

export default CateringOrdersAdmin;
