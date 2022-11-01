import React, { useEffect, useState } from "react";
// import CateringOrderCardUser from "../../Components/UI/CateringOrderCardUser";
import DropOffOrderCardUser from "../../Components/UI/DropOffOrderCardUser";
import { useStateValue } from "../../context/StateProvider";

const DropoffOrders = () => {
  const [{ dropOffOrders,user }] = useStateValue();
  const [userDropOffOrder, setUserDropOffOrder] = useState();

  const fetchUserDropOffOrders = async (user) => {
    const filteredUserDropOffOrders = await dropOffOrders?.filter((currOrder) => {
      if (currOrder.user_id === user.uid) return currOrder;
    });

    setUserDropOffOrder(filteredUserDropOffOrders);
    console.log(userDropOffOrder);
    console.log(user.uid)
  };

  useEffect(() => {
    fetchUserDropOffOrders(user);
  }, []);


  return (
    <>
      <div className="orders__page">
        <div className="orders__container mb-4">
          <h2 onClick={() => fetchUserDropOffOrders(user)}>Previous Drop Off Orders</h2>
          <div className="d-flex justify-content-around flex-wrap m-4">
            <DropOffOrderCardUser data={userDropOffOrder}/>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default DropoffOrders;
