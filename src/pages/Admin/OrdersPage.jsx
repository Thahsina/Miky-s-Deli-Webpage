import React from "react";
import { Col, Container, Row } from "reactstrap";

import "../../Components/styles/ordersPage.css";

import { NavLink, Outlet } from "react-router-dom";

const OrdersPage = () => {
  const routes = [
    {
      path: "currentOrders",
      name: "Current Orders",
    },
    {
      path: "acceptedOrders",
      name: "Accepted Orders",
    },
  ];

  return (
    <>
      <Container>
        <Row>
          <Col lg="12">
            {/* <h2>Customer Orders</h2> */}
            <div class="orderMenu__container">
              <div class="orderMenu">
                {routes.map((route, index) => {
                  return (
                    <NavLink
                      to={route.path}
                      key={index}
                      className="orderMenuItem"
                      activeclassname="active"
                    >
                      <div className="orderMenuItem_text">{route.name}</div>
                    </NavLink>
                  );
                })}
              </div>
            </div>
            <div className="orderCards">
              <Outlet />
              {/* <OrderCardAdmin data={orders} /> */}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default OrdersPage;
