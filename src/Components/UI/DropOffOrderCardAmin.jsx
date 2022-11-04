import React from "react";
import { Container, Col, Row } from "reactstrap";
// import "../styles/cateringOrderCard.css";
import { actionType } from "../../context/reducer";
import { useStateValue } from "../../context/StateProvider";

const DropOffOrderCardAdmin = ({ data }) => {
  return (
    <>
      {data &&
        data.map((eachCateringOrder) => (
          <div className="cateringOrderCard">
            <Row className="orderCard_header">
              <Col sm="6">
                <div className="orderNumber">
                  <span>Drop-off Order #{eachCateringOrder.orderNumber}</span>
                </div>
              </Col>
              <Col sm="6">
                <div className="orderDate">
                  <b>Date</b> :{" "}
                  <span>
                    {eachCateringOrder.dropOffOrderDate?.substr(3, 18)}
                  </span>
                </div>
              </Col>
            </Row>
            <div>
              {eachCateringOrder.dropoffOrder?.map((orderItem) => (
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
                    {orderItem.selectedAddons?.map((eachSelectedAddon) => (
                      <div style={{ marginLeft: "0.8rem" }}>
                        - {eachSelectedAddon.addOn}{" "}
                      </div>
                    ))}
                  </Col>
                </Row>
              ))}

              <hr
                style={{
                  background: "#139652",
                  color: "#139652",
                  borderColor: "#139652",
                  height: "3px",
                  width: "80%",
                }}
              />

              <div
                className="dropoff__locationContainer"
                style={{ marginLeft: "0.8rem" }}
              >
                <h6 style={{ color: "#139652" }}>Delivery Address</h6>
                <span>
                  <b>Longitude : </b>
                  {eachCateringOrder.location[0]}
                </span>
                <span>
                  <b>Latitude : </b>
                  {eachCateringOrder.location[1]}
                </span>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default DropOffOrderCardAdmin;
