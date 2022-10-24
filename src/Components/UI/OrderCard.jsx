import React from "react";
import { Col, Row } from "reactstrap";
import "../styles/orderCard.css"


const OrderCard = () => {
  return (
    <>
      <div className="orderCard">
        <Row className="orderCard_header">
          <Col sm="6">
            <div className="orderNumber">
              <span>Order #{Math.floor(100000 + Math.random() * 900000)}</span>
            </div>
          </Col>
          <Col sm="6">
            <div className="orderDate">
              Date :<span>13 Aug 2022</span>
            </div>
          </Col>
        </Row>
        <div className="orderItemsList">
          <Row className="mb-2 mt-4">
            {" "}
            {/* row for each cartIem */}
            <Col md="7" sm="8">
              <div className="orderItemTitle">
                <h6 style={{ color: "#231f20" }}>Dynamite Shrimps</h6>
              </div>
            </Col>
            <Col sm="1" md="1" className="pr-0 pl-0">
              x1
            </Col>
            <Col sm="3" md="4">
              <div className="orderPrice">QAR 35</div>
            </Col>
            <Col md="12" sm="12">
              <div style={{ marginLeft: "0.8rem" }}>- Addons </div>
              <div style={{ marginLeft: "0.8rem" }}>- Meat Options </div>
              <div style={{ marginLeft: "0.8rem" }}>- Pasta type </div>
            </Col>
          </Row>
          <Row className="mb-2 mt-4">
            {" "}
            {/* row for each cartIem */}
            <Col md="7" sm="8">
              <div className="orderItemTitle">
                <h6 style={{ color: "#231f20" }}>Halloumi Cheese Sticks</h6>
              </div>
            </Col>
            <Col sm="1" md="1" className="pr-0 pl-0">
              x1
            </Col>
            <Col sm="3" md="4">
              <div className="orderPrice">QAR 35</div>
            </Col>
            <Col md="12" sm="12">
              <div style={{ marginLeft: "0.8rem" }}>- Addons </div>
              <div style={{ marginLeft: "0.8rem" }}>- Meat Options </div>
              <div style={{ marginLeft: "0.8rem" }}>- Pasta type </div>
              <div className="orderTotal">
                Total &nbsp;&nbsp;
                <span>QAR 100</span>
              </div>
            </Col>
            <Col md="12" sm="12">
              <hr
                style={{
                  background: "#139652",
                  color: "#139652",
                  borderColor: "#139652",
                  height: "3px",
                  width: "80%",
                }}
              />
              <div className="orderAddress mt-4">
                <h6 style={{ color: "#139652" }}>Delivery Address</h6>
                <div style={{ marginLeft: "0.8rem" }}>
                  <span>NearestLandmark :</span> Monoprix{" "}
                </div>
                <div style={{ marginLeft: "0.8rem" }}>
                  <span>Delivery Zone :</span>Al Bidda{" "}
                </div>
                <div style={{ marginLeft: "0.8rem" }}>
                  <span>Longitude :</span> 25.1660{" "}
                </div>
                <div style={{ marginLeft: "0.8rem" }}>
                  {" "}
                  <span>Latitude :</span> 51.5495{" "}
                </div>
                <div style={{ marginLeft: "0.8rem" }}>
                  <span>Longitude :</span> 25.1660{" "}
                </div>
                <div style={{ marginLeft: "0.8rem" }}>
                  <span>Street :</span> Al Ebb
                </div>
                <div style={{ marginLeft: "0.8rem" }}>
                  <span>Building No. :</span> 25.1660{" "}
                </div>
                <div style={{ marginLeft: "0.8rem" }}>
                  <span>Flat No. :</span> 25.1660{" "}
                </div>
              </div>
            </Col>
          </Row>
          <div className="orderActionButtons">
            <button className="orderRejectBtn">Reject Order</button>
            <button className="orderAcceptBtn">Accept Order</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderCard;
