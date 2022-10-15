import {
    fetchCart,
    fetchTotal,
    fetchUser,
    fetchDeliveryZone
  } from "../Utils/fetchLocalStorageData";

  const userInfo = fetchUser();
  const deliveryZone = fetchDeliveryZone();
  const cartInfo = fetchCart();
  const total = fetchTotal();


export const initialState = {
    user: userInfo,
    deliveryZone: deliveryZone,
    menuItems: null,
    cateringMenuItems:null,
    dropoffMenuItems:null,
    total: [],
    cartItems : cartInfo,
    // quantity: 1,
}