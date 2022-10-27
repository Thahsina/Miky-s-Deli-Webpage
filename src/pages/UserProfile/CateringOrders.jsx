import React from "react";
import OrderCardUser from "../../Components/UI/OrderCardUser";

const CateringOrders = () => {
  return (
    <>
      <div className="orders__page">
        <div className="orders__container mb-4">
          <h2>CateringOrders</h2>
          <div className="d-flex">
            <OrderCardUser />
          </div>
        </div>
      </div>
    </>
  );
};

export default CateringOrders;
