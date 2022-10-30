import React from "react";
import OrderCardUser from "../../Components/UI/OrderCardUser";
import CateringOrderCardUser from "../../Components/UI/CateringOrderCardUser";


const DropoffOrders = () => {
  return (
    <>
      <div className="orders__page">
        <div className="orders__container mb-4">
          <h2>Previous Drop Off Orders</h2>
          <div className="d-flex justify-content-around flex-wrap m-4">
            <CateringOrderCardUser />
            <CateringOrderCardUser />
            <CateringOrderCardUser />
          </div>
        </div>
      </div>
    </>
  );
};

export default DropoffOrders;
