import React, { createContext, useContext, useReducer } from 'react';

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => {
  const [cartItems, setCartItems] = React.useState([]);
  const [bookedItems, setBookedItems] = React.useState([]);

  const bookItem = (item) => {
    // every booked item has a bookingId which is separate from product id
    const bookingId = Date.now() * Math.ceil(Math.random() * 1000);
    setBookedItems([...bookedItems, { ...item, bookingId }]);
  };

  const clearCart = () => setCartItems([]);

  const deleteItem = (cartItemId) =>
    setCartItems(cartItems.filter((i) => i.cartItemId !== cartItemId));

  const calculateTotalPriceOfItem = (cartItemId) => {
    const item = cartItems.find((i) => i.cartItemId === cartItemId);
    if (!item) return 0;
    // if item has variations like addons, sizes, meatoptions etc
    if (item.variations) {
      let totalPrice = 0;
      totalPrice +=
        Number(item?.selectedSize?.price || 0) + Number(item?.selectedMeatOption?.price || 0);
      item.selectedAddons?.forEach((a) => (totalPrice += Number(a.price)));
      return totalPrice * Number(item.qty);
    } else {
      // if item does not have any variations
      return Number(item.price) * Number(item.qty);
    }
  };

  const addToCart = (item) => {
    // every cart item has a cartItemId which is separate from product id
    const cartItemId = Date.now() * Math.ceil(Math.random() * 1000);
    // while adding to cart, the initial quantity is 1
    setCartItems([...cartItems, { ...item, qty: 1, cartItemId }]);
    return cartItemId;
  };

  const increase = (cartItemId) => {
    let itemIndex = cartItems.findIndex((i) => i.cartItemId === cartItemId);
    let item = cartItems[itemIndex];
    item = { ...item, qty: Number(item.qty) + 1 };
    setCartItems([...cartItems.slice(0, itemIndex), item, ...cartItems.slice(itemIndex + 1)]);
  };

  const decrease = (cartItemId) => {
    let itemIndex = cartItems.findIndex((i) => i.cartItemId === cartItemId);
    let item = cartItems[itemIndex];
    if (item.qty <= 1) return; // quantity can not be a negative number or zero
    item = { ...item, qty: Number(item.qty) - 1 };
    setCartItems([...cartItems.slice(0, itemIndex), item, ...cartItems.slice(itemIndex + 1)]);
  };

  const updateItem = (cartItemId, updatedItem) => {
    let itemIndex = cartItems.findIndex((i) => i.cartItemId === cartItemId);
    let item = cartItems[itemIndex];
    setCartItems(() => [
      ...cartItems.slice(0, itemIndex),
      { ...item, ...updatedItem },
      ...cartItems.slice(itemIndex + 1),
    ]);
  };
  const st = {
    cartItems,
    clearCart,
    deleteItem,
    calculateTotalPriceOfItem,
    updateItem,
    addToCart,
    increase,
    decrease,
    bookItem,
  };
  return (
    <StateContext.Provider value={[...useReducer(reducer, initialState), st]}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
