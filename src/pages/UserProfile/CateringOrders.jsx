import React from "react";
// import OrderCardUser from "../../Components/UI/OrderCardUser";
import CateringOrderCardUser from "../../Components/UI/CateringOrderCardUser";

const CateringOrders = () => {
  return (
    <>
      <div className="orders__page">
        <div className="orders__container mb-4">
          <h2>Previous Catering Orders</h2>
          <div className="d-flex">
            <CateringOrderCardUser />
          </div>
        </div>
      </div>
    </>
  );
};

export default CateringOrders;
