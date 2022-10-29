import React from 'react'
import { useStateValue } from "../../context/StateProvider";
import OrderCardAdmin from "../../Components/UI/OrderCardAdmin";

const CurrentOrdersPage = () => {
    const [{ user, cart, orders, menuItems }] = useStateValue();
  return (
    <>
     {console.log("Orders", orders)}
    <OrderCardAdmin data={orders} />
    </>
  )
}

export default CurrentOrdersPage