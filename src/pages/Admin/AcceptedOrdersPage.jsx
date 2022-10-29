import React from 'react'
import { useStateValue } from '../../context/StateProvider';
import OrderCardAdmin from "../../Components/UI/OrderCardAdmin";

const AcceptedOrdersPage = () => {
  const [{ acceptedOrders }] = useStateValue();
  return (
    <>
    {console.log("AcceptedOrders",acceptedOrders)}
    <OrderCardAdmin data={acceptedOrders} />
    </>
  )
}

export default AcceptedOrdersPage