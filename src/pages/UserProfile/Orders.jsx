import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "reactstrap";
import "../../Components/styles/orders.css";
import OrderCardUser from "../../Components/UI/OrderCardUser";
import { useStateValue } from "../../context/StateProvider";

const Orders = () => {
  const [{ acceptedOrders, user }] = useStateValue();
  const [userOrder, setUserOrder] = useState();

  const fetchUserOrders = async (user) => {
    const filteredUserOrders = await acceptedOrders?.filter((currOrder) => {
      if (currOrder.user_id === user.uid) return currOrder;
    });

    setUserOrder(filteredUserOrders);
    console.log(userOrder);
  };

  useEffect(() => {
    fetchUserOrders(user);
  }, []);

  return (
    <>
      <Container>
        <Row>
          <Col lg="12">
            <h2
              className="myOrders__title"
              onClick={() => fetchUserOrders(user)}
            >
              Order Again !!
            </h2>
            <div className="orderCards">
              <OrderCardUser data={userOrder} />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Orders;
