import React from "react";
import { Col, Row } from "reactstrap";
import "../styles/cateringOrderCardUser.css";

const DropOffOrderCardUser = ({ data }) => {
  return (
    <>
      {data &&
        data.map((eachDropOffOrder) => (
          <div className="cateringOrderCard__user">
            <Row className="cateringOrderCard__userHeader">
              {/* <Col sm="6">
                <div className="cateringOrderCard__userTime">
                  <span>Time : 4:30pm</span>
                </div>
              </Col> */}
              <Col sm="12">
                <div className="cateringOrderCard__userDate">
                  Date : <span>{eachDropOffOrder.dropOffOrderDate.substr(0, 16)}</span>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <h4>Rice Station for 10</h4>
                <div className="cateringOrderCard__userPrice">
                  QAR&nbsp;&nbsp;<b>1200</b>{" "}
                </div>
              </Col>
              <div className="cateringOrderCard__userDetails">
                <Col md="12" sm="12">
                  <div style={{ marginLeft: "0.8rem" }}>- Options </div>
                  <div style={{ marginLeft: "0.8rem" }}>- Add Ons </div>
                  <div style={{ marginLeft: "0.8rem" }}>- Serves </div>
                  <div style={{ marginLeft: "0.8rem" }}>- Extra Services </div>
                </Col>
              </div>
            </Row>
          </div>
        ))}
    </>
  );
};

export default DropOffOrderCardUser;
