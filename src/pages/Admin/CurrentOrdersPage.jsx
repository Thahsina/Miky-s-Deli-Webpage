import React from "react";
import { useStateValue } from "../../context/StateProvider";
import OrderCardAdmin from "../../Components/UI/OrderCardAdmin";
import NoOrderImg from "../../images/NoOrders.svg";


const CurrentOrdersPage = () => {
  const [{ orders }] = useStateValue();


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
