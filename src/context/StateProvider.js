import React, { createContext, useContext, useReducer } from 'react'

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => {
  const [cartItems, setCartItems] = React.useState([]);

  const clearCart = () => setCartItems([]);
  const deleteItem = (itemId) => setCartItems(
    cartItems.filter((i) => i.id !== itemId)
  )
  const calculateTotalPriceOfItem = (itemId) => {
    const item = cartItems.find((i) => i.id === itemId);
    if (!item) return 0;
    // if item has variations like addons, sizes, meatoptions etc
    if (item.variations) {
      let totalPrice = 0;
      totalPrice += Number(item?.selectedSize?.price || 0) + Number(item?.selectedMeatOption?.price || 0);
      item.selectedAddons?.forEach((a) => totalPrice += Number(a.price));
      return totalPrice * Number(item.qty);
    } else {
      // if item does not have any variations
      return Number(item.price) * Number(item.qty);
    }
  }
  function toggleAddToCart(item) {
    // remove the item from cart if already present in cart
    const itemIndex = cartItems.findIndex((i) => i.id === item.id);
    if (itemIndex !== -1) setCartItems([...cartItems.slice(0, itemIndex), ...cartItems.slice(itemIndex + 1)])
    // while adding to cart, the initial quantity is 1
    else setCartItems([
      ...cartItems,
      { ...item, qty: 1 }
    ]);
  }



  function increase(id) {
    let itemIndex = cartItems.findIndex((i) => i.id === id);
    let item = cartItems[itemIndex];
    item = { ...item, qty: Number(item.qty) + 1 };
    console.log("item", item)

    setCartItems([...cartItems.slice(0, itemIndex), item, ...cartItems.slice(itemIndex + 1)]);
  }

  { console.log(cartItems) }

  function decrease(id) {
    let itemIndex = cartItems.findIndex((i) => i.id === id);
    let item = cartItems[itemIndex];
    if (item.qty <= 1) return; // quantity can not be a negative number or zero
    item = { ...item, qty: Number(item.qty) - 1 };
    setCartItems([...cartItems.slice(0, itemIndex), item, ...cartItems.slice(itemIndex + 1)]);
  }



  function updateItem(id, updatedItem) {
    let itemIndex = cartItems.findIndex((i) => i.id === id);
    let item = cartItems[itemIndex];
    setCartItems(() =>
      [
        ...cartItems.slice(0, itemIndex),
        { ...item, ...updatedItem },
        ...cartItems.slice(itemIndex + 1)
      ]
    );
  }


  console.log({ cartItems });
  const st = {
    cartItems,
    clearCart,
    deleteItem,
    calculateTotalPriceOfItem,
    updateItem,
    toggleAddToCart,
    increase,
    decrease,
  }
  return (
    <StateContext.Provider value={[...useReducer(reducer, initialState), st]}>
      {children}
    </StateContext.Provider>
  )
}

export const useStateValue = () => useContext(StateContext)