import React from "react";
import { Col, Row } from "reactstrap";
import "../styles/cateringOrderCardUser.css";

const CateringOrderCardUser = ({ data }) => {
  return (
    <>
      {data &&
        data.map((eachCateringOrder) => (
          <div className="cateringOrderCard__user" key={eachCateringOrder.id}>
            <Row className="cateringOrderCard__userHeader">
              <Col sm="6">
                <div className="cateringOrderCard__userTime">
                  <span>
                    Time : {eachCateringOrder.orderDateTime?.substr(16, 5)}
                  </span>
                </div>
              </Col>
              <Col sm="6">
                <div className="cateringOrderCard__userDate">
                  Date :{" "}
                  <span>{eachCateringOrder.orderDateTime?.substr(0, 15)}</span>
                </div>
              </Col>
            </Row>
            {eachCateringOrder.cateringOrder?.map((orderItem) => (
              <Row>
                <Col md="12">
                  <h4>{orderItem.title}</h4>
                  <div className="cateringOrderCard__userPrice">
                    QAR&nbsp;&nbsp;<b>{orderItem.price}</b>{" "}
                  </div>
                </Col>
                <div className="cateringOrderCard__userDetails">
                  <Col md="4" sm="6">
                  <h6 style={{ color: "red", margin: "0.5rem" }}>Options</h6>
                  {orderItem.selectedOptions.map((eachSelectedOption) => (
                    <div style={{ marginLeft: "0.8rem" }}>
                    - {eachSelectedOption.name}{" "}
                    
                  </div>
                  ))}
                  {orderItem.selectedAddons && (
                      <h6 style={{ color: "green", margin: "0.5rem" }}>
                        Add-Ons
                      </h6>
                    )}
                    {orderItem.selectedAddons?.map((eachSelectedAddon) => (
                      <div style={{ marginLeft: "0.8rem" }}>
                        - {eachSelectedAddon.addOn}{" "}
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

export default CateringOrderCardUser;
