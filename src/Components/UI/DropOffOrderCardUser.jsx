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
            {eachDropOffOrder.dropoffOrder?.map((orderItem) => (
              <Row>
                <Col md="12">
                  <h4>{orderItem.title}</h4>
                  <div className="cateringOrderCard__userPrice">
                    QAR&nbsp;&nbsp;<b>{orderItem.price}</b>{" "}
                  </div>
                </Col>
                <div className="cateringOrderCard__userDetails">
                  <Col md="8" sm="6">
                  <h6 style={{ color: "red", margin: "0.5rem" }}>Options</h6>
                  {orderItem.selectedOptions.map((eachSelectedOption) => (
                    <div style={{ marginLeft: "0.8rem" }}>
                    - {eachSelectedOption.name}{" "}
                    <span style={{ marginLeft: "2rem" }}>
                          x{eachSelectedOption.quantity}
                        </span>{" "}
                  </div>
                  ))}
                  {orderItem.selectedAddons && (
                      <h6 style={{ color: "green", margin: "0.5rem" }}>
                        Add-Ons
                      </h6>
                    )}
                    {orderItem.selectedAddons?.map((eachSelctedAddon) => (
                      <div style={{ marginLeft: "0.8rem" }}>
                        - {eachSelctedAddon.addOn}{" "}
                      </div>
                    ))}
                  
                    
                  </Col>
                </div>
              </Row>
            ))}
          </div>
        ))}
    </>
  );
};

export default DropOffOrderCardUser;
