import React, { createContext, useContext, useReducer } from 'react'

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => {
  const [cartItems, setCartItems] = React.useState([]);
  function toggleAddToCart(item) {
    // remove the item from cart if already present in cart
    const itemIndex = cartItems.findIndex((i) => i.id === item.id);
    if (itemIndex !== -1) setCartItems([...cartItems.slice(0, itemIndex), ...cartItems.slice(itemIndex + 1)])
    // while adding to cart, the initial quantity is 1
    else setCartItems([...cartItems, { ...item, qty: 1 }]);
  }
  function increase(id) {
    let itemIndex = cartItems.findIndex((i) => i.id === id);
    let item = cartItems[itemIndex];
    item = { ...item, qty: Number(item.qty) + 1 };
    setCartItems([...cartItems.slice(0, itemIndex), item, ...cartItems.slice(itemIndex + 1)]);
  }
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