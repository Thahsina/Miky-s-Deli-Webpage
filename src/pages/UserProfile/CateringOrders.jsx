import React, { useEffect, useState } from "react";
// import OrderCardUser from "../../Components/UI/OrderCardUser";
import CateringOrderCardUser from "../../Components/UI/CateringOrderCardUser";
import { useStateValue } from "../../context/StateProvider";

const CateringOrders = () => {
  const [{ cateringOrders,user }] = useStateValue();
  const [userCateringOrder, setUserCateringOrder] = useState();

  const fetchUserCateringOrders = async (user) => {
    const filteredUserCateringOrders = await cateringOrders?.filter((currOrder) => {
      if (currOrder.user_id === user.uid) return currOrder;
    });

    setUserCateringOrder(filteredUserCateringOrders);
    console.log(userCateringOrder);
    console.log(user.uid)
  };

  useEffect(() => {
    fetchUserCateringOrders(user);
  }, []);
  
  return (
    <>
      <div className="orders__page">
        <div className="orders__container mb-4">
          <h2 onClick={() => fetchUserCateringOrders(user)}>Previous Catering Orders</h2>
          <div className="d-flex flex-wrap">
            <CateringOrderCardUser data={userCateringOrder}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default CateringOrders;
