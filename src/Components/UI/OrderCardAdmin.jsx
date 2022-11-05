import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import "../styles/orderCardAdmin.css";
import {
  acceptOrders,
  getAllOrders,
  fetchAllOrders,
  fetchAcceptedOrders,
  getAcceptedOrders,
} from "../../firebaseFunctions";
import { actionType } from "../../context/reducer";
import { useStateValue } from "../../context/StateProvider";

const OrderCard = ({ data }) => {
  const [{ user, deliveryZone, orders }, dispatch] = useStateValue();
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
                  Date : <span>{eachOrder.orderDate?.substr(3, 12)}</span>
                </div>
              </Col>
            </Row>
            {console.log(eachOrder)}
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
                    <div className="orderPrice">
                      QAR&nbsp;&nbsp;{orderItem.calcPrice}
                    </div>
                    {/* {console.log(orderItem.selectedAddons)} */}
                    {/* {console.log(orderItem.selectedSize)} */}
                  </Col>
                  <Col md="12" sm="12">
                    {orderItem.selectedSize && (
                      <>
                        <h6 style={{ color: "green", margin: "0.5rem" }}>
                          Selected Size
                        </h6>
                        <div style={{ marginLeft: "0.8rem" }}>
                          - {orderItem.selectedSize.size}{" "}
                        </div>
                      </>
                    )}
                    {orderItem.selectedAddons && (
                      <h6 style={{ color: "green", margin: "0.5rem" }}>
                        Selected Add-Ons
                      </h6>
                    )}
                    {orderItem.selectedAddons?.map((eachSelectedAddon) => (
                      <div style={{ marginLeft: "0.8rem" }}>
                        - {eachSelectedAddon.addOn}{" "}
                      </div>
                    ))}
                    {orderItem.selectedExFlavours && (
                      <h6 style={{ color: "green", margin: "0.5rem" }}>
                        Selected Extra Flavours
                      </h6>
                    )}
                    {orderItem.selectedExFlavours?.map((eachSelectedExFlavours) => (
                      <div style={{ marginLeft: "0.8rem" }}>
                        - {eachSelectedExFlavours.extraFlavour}{" "}
                      </div>
                    ))}
                    
                    {orderItem.selectedMeatOption && (
                      <>
                        <h6 style={{ color: "green", margin: "0.5rem" }}>
                          Selected Meat
                        </h6>
                        <div style={{ marginLeft: "0.8rem" }}>
                          - {orderItem.selectedMeatOption.meatOption}{" "}
                        </div>
                      </>
                    )}
                    {orderItem.selectedPastaType && (
                      <>
                        <h6 style={{ color: "green", margin: "0.5rem" }}>
                          Selected Pasta Type
                        </h6>
                        <div style={{ marginLeft: "0.8rem" }}>
                          - {orderItem.selectedPastaType}{" "}
                        </div>
                      </>
                    )}
                    {orderItem.selectedFlavour && (
                      <>
                        <h6 style={{ color: "green", margin: "0.5rem" }}>
                          Selected Flavour
                        </h6>
                        <div style={{ marginLeft: "0.8rem" }}>
                          - {orderItem.selectedFlavour}{" "}
                        </div>
                      </>
                    )}
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
                onClick={async () => {
                  acceptOrders(eachOrder);
                  await getAllOrders().then((orderData) => {
                    dispatch({
                      type: actionType.SET_ORDERS,
                      orders: orderData,
                    });
                  });
                  await getAcceptedOrders().then((acceptedOrderData) => {
                    dispatch({
                      type: actionType.SET_ACCEPTEDORDERS,
                      acceptedOrders: acceptedOrderData,
                    });
                  });
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
