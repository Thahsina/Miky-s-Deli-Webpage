export const fetchUser = () => {
    const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

    return userInfo;
}

export const fetchDeliveryZone = () => {
    const deliveryZone = localStorage.getItem('deliveryZone') !== 'undefined' ? JSON.parse(localStorage.getItem('deliveryZone')) : localStorage.clear();
    
    return deliveryZone;
}

export const fetchCart = () => {
    const cartInfo = localStorage.getItem('cartItems') !== 'undefined' 
    ? JSON.parse(localStorage.getItem('cartItems')) 
    : localStorage.clear();

    return cartInfo ? cartInfo : [];
}

export const fetchTotal = () => {
    const total =
      localStorage.getItem("total") !== "undefined"
        ? JSON.parse(localStorage.getItem("total"))
        : localStorage.clear();
  
    return total;
}

