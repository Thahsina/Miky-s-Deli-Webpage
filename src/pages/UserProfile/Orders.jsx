import React from "react";
import { Table } from "reactstrap";
import "../../Components/styles/orders.css";
import OrderCardUser from "../../Components/UI/OrderCardUser";
// import { Pagination, PaginationItem, PaginationLink,Container } from "reactstrap";

const Orders = () => {
  return (
    <div className="orders__page">
      <div className="orders__container mb-4">
        <h2>Order Again !!</h2>
        <div className="d-flex">
          <OrderCardUser />
          <OrderCardUser />
        </div>
      </div>
    </div>
  );
};

export default Orders;
