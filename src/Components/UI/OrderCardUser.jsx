import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import { useStateValue } from "../../context/StateProvider";
import "../styles/orderCardUser.css";
import useCollapse from "react-collapsed";

const OrderCardUser = ({ data }) => {
  const { toggleAddToCart } = useStateValue()[2];
  const [isExpanded, setExpanded] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

  const reOrder = (userCartItems) => {
    userCartItems.map((userCartItems) => toggleAddToCart(userCartItems));
  };

  return (
    <>
      {data &&
        data.map((eachUserOrder, index) => (
          <div className="orderCard__user">
            <Row className="orderCard_header">
              <div className="orderDate__user">
                Date :<span>{eachUserOrder.orderDate?.substr(3, 12)}</span>
              </div>
            </Row>
            <div className="orderItemsList__user">
              <Row className="mb-2 mt-4">
                {" "}
                {/* row for each cartIem */}
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
                  <div style={{ marginLeft: "0.8rem" }}>- Addons </div>
                  <div style={{ marginLeft: "0.8rem" }}>- Meat Options </div>
                  <div style={{ marginLeft: "0.8rem" }}>- Pasta type </div>
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
                        <div style={{ marginLeft: "0.8rem" }}>- Addons </div>
                        <div style={{ marginLeft: "0.8rem" }}>
                          - Meat Options{" "}
                        </div>
                        <div style={{ marginLeft: "0.8rem" }}>
                          - Pasta type{" "}
                        </div>
                      </Col>
                    </Row>
                  </section>
                ))}
                <button
                  className="showMoreLessBtn"
                  {...getToggleProps({
                    onClick: () => setExpanded((prevExpanded) => !prevExpanded),
                  })}
                >
                  {isExpanded ? "show less" : "show more"}
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
                  onClick={() => reOrder(eachUserOrder.cartItems)}
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
