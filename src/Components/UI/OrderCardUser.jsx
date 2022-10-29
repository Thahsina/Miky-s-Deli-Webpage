import React from "react";
import { Col, Row } from "reactstrap";
import "../styles/orderCardUser.css";

const OrderCardUser = () => {
  return (
    <>
      <div className="orderCard__user">
        <Row className="orderCard_header">
          <div className="orderDate__user">
            Date :<span>13 Aug 2022</span>
          </div>
        </Row>
        <div className="orderItemsList__user">
          <Row className="mb-2 mt-4">
            {" "}
            {/* row for each cartIem */}
            <Col md="7" sm="8">
              <div className="orderItemTitle">
                <h6 style={{ color: "#231f20" }}>Coffee Station for 20 persons</h6>
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
          </Row>
          <div className="orderActionButtons">
            <button className="orderAcceptBtn">ReOrder</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderCardUser;
