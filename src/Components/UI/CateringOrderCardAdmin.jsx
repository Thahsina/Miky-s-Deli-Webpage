import React from "react";
import { Container, Col, Row } from "reactstrap";
// import "../styles/cateringOrderCard.css";
import { actionType } from "../../context/reducer";
import { useStateValue } from "../../context/StateProvider";

const CateringOrderCardAdmin = ({ data }) => {
  
  return (
    <>
      {data &&
        data.map((eachCateringOrder) => (
          <div className="cateringOrderCard">
            <Row className="orderCard_header">
              <Col sm="6">
                <div className="orderNumber">
                  <span>Catering Order #{eachCateringOrder.orderNumber}</span>
                </div>
              </Col>
              <Col sm="6">
                <div className="orderDate">
                  <b>Date & Time</b> :{" "}
                  <span>{eachCateringOrder.orderDateTime?.substr(0, 21)}</span>
                </div>
              </Col>
            </Row>
            <div>
              {eachCateringOrder.cateringOrder?.map((orderItem) => (
                <Row className="mb-2 mt-4">
                  {" "}
                  {/* row for each cartIem */}
                  <Col md="7" sm="8">
                    <div className="orderItemTitle">
                      <h6 style={{ color: "#231f20" }}>{orderItem.title}</h6>
                    </div>
                  </Col>
                  <Col sm="3" md="5">
                    <div className="orderPrice">
                      QAR&nbsp;&nbsp;<b>{orderItem.price}</b>{" "}
                    </div>
                  </Col>
                  <Col md="12" sm="12">
                    <h6 style={{ color: "red", margin: "0.5rem" }}>Options</h6>
                    {orderItem.selectedOptions.map((eachSelctedOption) => (
                      <div style={{ marginLeft: "0.8rem" }}>
                        - {eachSelctedOption.name}{" "}
                        <span style={{ marginLeft: "2rem" }}>
                          x{eachSelctedOption.quantity}
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

                    {orderItem.extraServes && (
                      <h6 style={{ color: "green", margin: "0.5rem" }}>
                        Extra Services
                      </h6>
                    )}
                    {orderItem.extraServes && (
                      <div style={{ margin: "0.5rem" }}>
                        <span>&nbsp;-{orderItem.extraServes}</span> Extra Serves
                        Requested
                      </div>
                    )}

                    <div style={{ marginLeft: "0.8rem" }}>
                      {orderItem.isExtraFemaleServer === true && (
                        <span>- Requested Female Server</span>
                      )}
                    </div>
                    <div style={{ marginLeft: "0.8rem" }}>
                      {orderItem.isExtraMaleServer === true && (
                        <span>- Requested 1 Extra Server</span>
                      )}
                    </div>
                  </Col>
                </Row>
              ))}
            </div>
          </div>
        ))}
    </>
  );
};

export default CateringOrderCardAdmin;
