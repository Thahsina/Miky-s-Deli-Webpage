import React from "react";
import { Col, Container, Row } from "reactstrap";
import { useStateValue } from "../../context/StateProvider";
import "../../Components/styles/ordersPage.css";
import OrderCard from "../../Components/UI/OrderCard";
import { NavLink, Link } from "react-router-dom";

const OrdersPage = () => {
  const [{ user, cart }] = useStateValue();

  return (
    <>
      <Container>
        <Row>
          <Col lg="12">
            {/* <h2>Customer Orders</h2> */}
            <div class="orderMenu__container">
              <div class="orderMenu">
                <a href="/">Current Orders</a>
                <a href="/">Accepted Orders</a>
              </div>
            </div>
            <div className="orderCards">
              <OrderCard />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default OrdersPage;
