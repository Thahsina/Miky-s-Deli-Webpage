import React from "react";
import { Container, Col, Row } from "reactstrap";
// import "../styles/cateringOrderCard.css";

const CateringOrderCardAdmin = () => {
  return (
    <>
      <div className="cateringOrderCard">
        <Row className="orderCard_header">
          <Col sm="6">
            <div className="orderNumber">
              <span>Order #34434</span>
            </div>
          </Col>
          <Col sm="6">
            <div className="orderDate">
              Date : <span> 23 Jan 2022</span>
            </div>
          </Col>
        </Row>
        <div>
          <Row className="mb-2 mt-4">
            {" "}
            {/* row for each cartIem */}
            <Col md="7" sm="8">
              <div className="orderItemTitle">
                <h6 style={{ color: "#231f20" }}>Coffee Station for 10</h6>
              </div>
            </Col>
            <Col sm="3" md="5">
              <div className="orderPrice">
                QAR&nbsp;&nbsp;<b>1200</b>{" "}
              </div>
              {/* {console.log(orderItem.selectedAddons)} */}
              {/* {console.log(orderItem.selectedSize)} */}
            </Col>
            <Col md="12" sm="12">
              <div style={{ marginLeft: "0.8rem" }}>- Options </div>
              <div style={{ marginLeft: "0.8rem" }}>- Add Ons </div>
              <div style={{ marginLeft: "0.8rem" }}>- Serves </div>
              <div style={{ marginLeft: "0.8rem" }}>- Extra Services </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default CateringOrderCardAdmin;
