import React, { createContext, useContext, useReducer } from 'react';
import { getAllOrders } from '../firebaseFunctions';
import { actionType } from './reducer';
export const StateContext = createContext();
export const StateProvider = ({ reducer, initialState, children }) => {
  const [cartItems, setCartItems] = React.useState([]);
  const [bookedItems, setBookedItems] = React.useState([]);
  console.log({ bookedItems });

  console.log({ cartItems, bookedItems });

  const bookItem = (item) => {
    // do not add to bookedItems when no option is selected
    if (item.selectedOptions?.length === 0) return;
    // every booked item has a bookingId which is separate from product id
    const bookingId = Date.now() * Math.ceil(Math.random() * 1000);
    setBookedItems([...bookedItems, { ...item, bookingId }]);
    return bookingId;
  };
  const deleteBookedItem = (bookingId) =>
    setBookedItems(bookedItems.filter((i) => i.bookingId !== bookingId));
  const clearCart = () => setCartItems([]);
  const deleteItem = (cartItemId) =>
    setCartItems(cartItems.filter((i) => i.cartItemId !== cartItemId));
  const updateBookedItem = (bookingId, updatedItem) => {
    let itemIndex = bookedItems.findIndex((i) => i.bookingId === bookingId);
    let item = bookedItems[itemIndex];
    setBookedItems(() => [
      ...bookedItems.slice(0, itemIndex),
      { ...item, ...updatedItem },
      ...bookedItems.slice(itemIndex + 1),
    ]);
  };
  const calculateTotalPriceOfItem = (cartItemId) => {
    const item = cartItems.find((i) => i.cartItemId === cartItemId);
    if (!item) return 0;
    // if item has variations like addons, sizes, meatoptions etc
    if (item.variations) {
      let totalPrice = 0;
      totalPrice +=
        Number(item?.selectedSize?.price || 0) +
        Number(item?.selectedMeatOption?.price || 0) +
        Number(item?.price || 0);
      item.selectedAddons?.forEach((a) => (totalPrice += Number(a.price)));
      item.extraFlavours?.forEach((f) => (totalPrice += Number(f.price)));
      return totalPrice * Number(item.qty);
    } else {
      // if item does not have any variations
      return Number(item.price) * Number(item.qty);
    }
  };
  const addToCart = (item) => {
    // if no size or meatOption is selected for an item with variations, do not add to cart
    const isItemWithVariations =
      Boolean(item?.variations?.find((i) => i.sizes)) ||
      Boolean(item?.variations?.find((i) => i.meatOptions)) ||
      Boolean(item?.variations?.find((i) => i.pastaTypes));
    if (
      !item.selectedSize &&
      !item.selectedMeatOption &&
      !item.selectedPastaType &&
      isItemWithVariations
    )
      return;
    // every cart item has a cartItemId which is separate from product id
    const cartItemId = Date.now() * Math.ceil(Math.random() * 1000);
    // while adding to cart, the initial quantity is 1
    setCartItems([...cartItems, { ...item, qty: 1, cartItemId }]);
    return cartItemId;
  };

  const increase = (cartItemId) => {
    console.log('increase');
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
    console.log({ item });
    setCartItems(() => [
      ...cartItems.slice(0, itemIndex),
      { ...item, ...updatedItem },
      ...cartItems.slice(itemIndex + 1),
    ]);
  };
  // const fetchAllOrders = async () => {
  //   await getAllOrders().then((orderData) => {
  //     // console.log(data);
  //     dispatchEvent({
  //       type: actionType.SET_ORDERS,
  //       orders: orderData,
  //     });
  //   });
  // };
  // console.log({ cartItems }, calculateTotalPrice());
  const st = {
    cartItems,
    bookedItems,
    clearCart,
    setCartItems,
    deleteItem,
    calculateTotalPriceOfItem,
    updateItem,
    addToCart,
    increase,
    decrease,
    // fetchAllOrders,
    bookItem,
    deleteBookedItem,
    updateBookedItem,
  };
  return (
    <StateContext.Provider value={[...useReducer(reducer, initialState), st]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);
