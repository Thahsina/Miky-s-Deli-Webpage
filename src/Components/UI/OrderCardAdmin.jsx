import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import "../styles/orderCardAdmin.css";
import {
  acceptOrders,
  removeAcceptedOrders,
  getAllOrders,
} from "../../firebaseFunctions";
import { actionType } from "../../context/reducer";
import { useStateValue } from "../../context/StateProvider";

const OrderCard = ({ data }) => {
  return (
    <>
      {data &&
        data.map((eachOrder) => (
          <div className="orderCard">
            <Row className="orderCard_header">
              <Col sm="6">
                <div className="orderNumber">
                  <span>Order #{eachOrder.orderNumber}</span>
                </div>
              </Col>
              <Col sm="6">
                <div className="orderDate">
                  Date :<span>13 Aug 2022</span>
                </div>
              </Col>
            </Row>
            <div className="orderItemsList">
              {eachOrder.cartItems?.map((orderItem) => (
                <Row className="mb-2 mt-4">
                  {" "}
                  {/* row for each cartIem */}
                  <Col md="7" sm="8">
                    <div className="orderItemTitle">
                      <h6 style={{ color: "#231f20" }}>{orderItem.title}</h6>
                    </div>
                  </Col>
                  <Col sm="1" md="1" className="pr-0 pl-0">
                    x{orderItem.qty}
                  </Col>
                  <Col sm="3" md="4">
                    <div className="orderPrice">{orderItem.price}</div>
                  </Col>
                  <Col md="12" sm="12">
                    <div style={{ marginLeft: "0.8rem" }}>- Addons </div>
                    <div style={{ marginLeft: "0.8rem" }}>- Meat Options </div>
                    <div style={{ marginLeft: "0.8rem" }}>- Pasta type </div>
                  </Col>
                </Row>
              ))}

              <Col md="12" sm="12">
                <div className="orderTotal">
                  Total &nbsp;&nbsp;
                  <span>{eachOrder.total}</span>
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
                    <span>Delivery Zone :</span>
                    &nbsp;&nbsp;{eachOrder.deliveryZone}{" "}
                  </div>
                  <div style={{ marginLeft: "0.8rem" }}>
                    {" "}
                    <span>Latitude :</span>
                    {eachOrder.address.latlng[0]}{" "}
                  </div>
                  <div style={{ marginLeft: "0.8rem" }}>
                    <span>Longitude :</span> {eachOrder.address.latlng[1]}{" "}
                  </div>
                  <div style={{ marginLeft: "0.8rem" }}>
                    <span>Street :</span> {eachOrder.address.street}
                  </div>
                  <div style={{ marginLeft: "0.8rem" }}>
                    <span>Building No. :</span> {eachOrder.address.buildingNo}{" "}
                  </div>
                  <div style={{ marginLeft: "0.8rem" }}>
                    <span>Flat No. :</span>
                    {eachOrder.address.flatNo}{" "}
                  </div>
                  <div style={{ marginLeft: "0.8rem" }}>
                    <span>NearestLandmark :</span>{" "}
                    {eachOrder.address.nearestLandmark}{" "}
                  </div>
                </div>
              </Col>
            </div>
            <div className="orderActionButtons">
              <button
                className="orderRejectBtn"
                onClick={() => console.log("clicked")}
              >
                Reject Order
              </button>
              <button
                className="orderAcceptBtn"
                onClick={() => {
                  acceptOrders(eachOrder);
                  // removeAcceptedOrders(eachOrder.id);
                }}
              >
                Accept Order
              </button>
            </div>
          </div>
        ))}
    </>
  );
};

export default OrderCard;
