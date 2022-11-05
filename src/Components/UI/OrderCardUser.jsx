import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { useStateValue } from "../../context/StateProvider";
import "../styles/orderCardUser.css";
import useCollapse from "react-collapsed";

const OrderCardUser = ({ data }) => {
  const navigate = useNavigate();
  const { addToCart } = useStateValue()[2];
  const [isExpanded, setExpanded] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });
  const [currentOrderId, setCurrentOrderId] = useState();

  // const reOrder = (userCartItems) => {
  //   // userCartItems.map((userCartItem) => addToCart(userCartItem));
  //   userCartItems.forEach((userCartItem) => {
  //     console.log(userCartItem);
  //     const userOrderItems = [];
  //     userOrderItems.push(userCartItem);
  //     console.log(userOrderItems, "array");
  //   });
  // };

  return (
    <>
      {data &&
        data.map((eachUserOrder, index) => (
          <div className="orderCard__user">
            {/* {console.log(eachUserOrder.cartItems)} */}
            <Row className="orderCard_header">
              <div className="orderDate__user">
                Date :<span>{eachUserOrder.orderDate?.substr(3, 12)}</span>
              </div>
            </Row>

            <div className="orderItemsList__user">
              <Row className="mb-2 mt-4">
                <Col md="7" sm="8">
                  <div className="orderItemTitle">
                    <h6 style={{ color: "#231f20" }}>
                      {eachUserOrder.cartItems[0].title}
                    </h6>
                  </div>
                </Col>
                <Col sm="1" md="1" className="pr-0 pl-0">
                  x{eachUserOrder.cartItems[0].qty}
                </Col>
                <Col sm="3" md="4">
                  <div className="orderPrice">
                    <b>QAR&nbsp;&nbsp;</b>
                    {eachUserOrder.cartItems[0].price}
                  </div>
                </Col>
                <Col md="12" sm="12">
                  

                  {eachUserOrder.cartItems[0].selectedSize && (
                    <>
                      <p style={{ color: "green", margin: "0.5rem" }}>
                        Selected Size
                      </p>
                      <div style={{ marginLeft: "0.8rem" }}>
                        - {eachUserOrder.cartItems[0].selectedSize.size}{" "}
                      </div>
                    </>
                  )}
                  {console.log(eachUserOrder.cartItems[0].selectedAddons)}
                  {eachUserOrder.cartItems[0].selectedAddons && (
                    <p style={{ color: "green", margin: "0.5rem" }}>
                      Selected Add-Ons
                    </p>
                  )}
                  {eachUserOrder.cartItems[0].selectedAddons?.map(
                    (eachSelectedAddon) => (
                      <div style={{ marginLeft: "0.8rem" }}>
                        - {eachSelectedAddon.addOn}{" "}
                      </div>
                    )
                  )}

                  {eachUserOrder.cartItems[0].selectedExFlavours &&
                    eachUserOrder.cartItems[0].selectedExFlavours?.map(
                      (eachSelectedExFlavours) => (
                        <div style={{ marginLeft: "0.8rem" }}>
                          - {eachSelectedExFlavours.extraFlavour}{" "}
                        </div>
                      )
                    )}

                  {eachUserOrder.cartItems[0].selectedMeatOption && (
                    <>
                      <p style={{ color: "green", margin: "0.5rem" }}>
                        Selected Meat
                      </p>
                      <div style={{ marginLeft: "0.8rem" }}>
                        -{" "}
                        {
                          eachUserOrder.cartItems[0].selectedMeatOption
                            .meatOption
                        }{" "}
                      </div>
                    </>
                  )}
                  {eachUserOrder.cartItems[0].selectedPastaType && (
                    <>
                      <p style={{ color: "green", margin: "0.5rem" }}>
                        Selected Pasta Type
                      </p>
                      <div style={{ marginLeft: "0.8rem" }}>
                        - {eachUserOrder.cartItems[0].selectedPastaType}{" "}
                      </div>
                    </>
                  )}
                  {eachUserOrder.cartItems[0].selectedFlavour && (
                    <>
                      <p style={{ color: "green", margin: "0.5rem" }}>
                        Selected Flavour
                      </p>
                      <div style={{ marginLeft: "0.8rem" }}>
                        - {eachUserOrder.cartItems[0].selectedFlavour}{" "}
                      </div>
                    </>
                  )}
                </Col>
              </Row>

              <div>
                {eachUserOrder.cartItems?.slice(1).map((userOrderItem) => (
                  <section {...getCollapseProps()}>
                    <Row className="mb-2 mt-4">
                      <Col md="7" sm="8">
                        <div className="orderItemTitle">
                          <h6 style={{ color: "#231f20" }}>
                            {userOrderItem.title}
                          </h6>
                        </div>
                      </Col>
                      {/* {console.log(userOrderItem.id)} */}
                      <Col sm="1" md="1" className="pr-0 pl-0">
                        x{userOrderItem.qty}
                      </Col>
                      <Col sm="3" md="4">
                        <div className="orderPrice">
                          <b>QAR&nbsp;&nbsp;</b>
                          {userOrderItem.price}
                        </div>
                      </Col>

                      <Col md="12" sm="12">
                        <div style={{ marginLeft: "0.8rem" }}>{"  "}</div>
                        <div style={{ marginLeft: "0.8rem" }}>{"  "}</div>
                        <div style={{ marginLeft: "0.8rem" }}>{"  "}</div>
                        {userOrderItem.selectedSize && (
                          <>
                            <p style={{ color: "green", margin: "0.5rem" }}>
                              Selected Size
                            </p>
                            <div style={{ marginLeft: "0.8rem" }}>
                              - {userOrderItem.selectedSize.size}{" "}
                            </div>
                          </>
                        )}
                        {console.log(userOrderItem.selectedAddons)}
                        {userOrderItem.selectedAddons && (
                          <p style={{ color: "green", margin: "0.5rem" }}>
                            Selected Add-Ons
                          </p>
                        )}
                        {userOrderItem.selectedAddons?.map(
                          (eachSelectedAddon) => (
                            <div style={{ marginLeft: "0.8rem" }}>
                              - {eachSelectedAddon.addOn}{" "}
                            </div>
                          )
                        )}

                        {userOrderItem.selectedExFlavours &&
                          userOrderItem.selectedExFlavours?.map(
                            (eachSelectedExFlavours) => (
                              <div style={{ marginLeft: "0.8rem" }}>
                                - {eachSelectedExFlavours.extraFlavour}{" "}
                              </div>
                            )
                          )}

                        {userOrderItem.selectedMeatOption && (
                          <>
                            <p style={{ color: "green", margin: "0.5rem" }}>
                              Selected Meat
                            </p>
                            <div style={{ marginLeft: "0.8rem" }}>
                              - {userOrderItem.selectedMeatOption.meatOption}{" "}
                            </div>
                          </>
                        )}
                        {userOrderItem.selectedPastaType && (
                          <>
                            <p style={{ color: "green", margin: "0.5rem" }}>
                              Selected Pasta Type
                            </p>
                            <div style={{ marginLeft: "0.8rem" }}>
                              - {userOrderItem.selectedPastaType}{" "}
                            </div>
                          </>
                        )}
                        {userOrderItem.selectedFlavour && (
                          <>
                            <p style={{ color: "green", margin: "0.5rem" }}>
                              Selected Flavour
                            </p>
                            <div style={{ marginLeft: "0.8rem" }}>
                              - {userOrderItem.selectedFlavour}{" "}
                            </div>
                          </>
                        )}
                      </Col>
                    </Row>
                  </section>
                ))}
                <button
                  className="showMoreLessBtn"
                  {...getToggleProps({
                    onClick: () => {
                      setExpanded((prevExpanded) => !prevExpanded);
                      setCurrentOrderId(eachUserOrder.id);
                    },
                  })}
                >
                  {isExpanded && eachUserOrder.id === currentOrderId
                    ? "show less"
                    : eachUserOrder.cartItems.length > 1 && "show more"}
                </button>
              </div>
              <Col md="12" sm="12">
                <div className="userOrderTotal">
                  Total :&nbsp;&nbsp;
                  <span>QAR&nbsp;&nbsp;{eachUserOrder.total}</span>
                </div>
              </Col>

              <div className="orderActionButtons">
                <button
                  className="orderAcceptBtn"
                  onClick={
                    () => navigate("/menu")
                    // reOrder(eachUserOrder.cartItems)
                  }
                >
                  ReOrder
                </button>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default OrderCardUser;
