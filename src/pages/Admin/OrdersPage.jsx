import React from "react";
import { Col, Container, Row } from "reactstrap";
import { useStateValue } from "../../context/StateProvider";
import '../../Components/styles/ordersPage.css'

const OrdersPage = () => {
  const [{ user, cart }] = useStateValue();


  return (
    <>
      <Container>
        <Row>
          <Col lg="12">
          <div className="orderCard">

          </div>
          <div className="orderCard">

</div>

            
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default OrdersPage;
