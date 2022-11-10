import React, { useEffect, useState } from "react";
import { useStateValue } from "../../context/StateProvider";
import OrderCardAdmin from "../../Components/UI/OrderCardAdmin";
import NoOrderImg from "../../images/NoOrders.svg";
import { fetchAllOrders, getAllOrders } from "../../firebaseFunctions";
import { actionType } from "../../context/reducer";
import { useReducer } from "react";

const CurrentOrdersPage = () => {
  const [{ orders }, dispatch] = useStateValue();


  return (
    <>
      {orders ? (
        <OrderCardAdmin data={orders} />
      ) : (
        <div className="noOrdersMsg">
          <img src={NoOrderImg} alt="" />
          <h4>No Orders Yet !</h4>
        </div>
      )}
    </>
  );
};

export default CurrentOrdersPage;
