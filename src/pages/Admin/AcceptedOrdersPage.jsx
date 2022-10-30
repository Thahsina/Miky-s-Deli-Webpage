import React from 'react'
import { useStateValue } from '../../context/StateProvider';
import AcceptedOrderCardAdmin from "../../Components/UI/AcceptedOrderCardAdmin";

const AcceptedOrdersPage = () => {
  const [{ acceptedOrders }] = useStateValue();
  return (
    <>
    {console.log("AcceptedOrders",acceptedOrders)}
    <AcceptedOrderCardAdmin data={acceptedOrders} />
    </>
  )
}

export default AcceptedOrdersPage