import React, { createContext, useContext, useReducer } from 'react'

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => {
  const [cartItems, setCartItems] = React.useState([]);

  function addToCart(item) {
    setCartItems((prevItems) => [...prevItems, item]);
  }

  const st = {
    cartItems,
    addToCart,
  }

  console.log({ cartItems });
  return (
    <StateContext.Provider value={[...useReducer(reducer, initialState), st]}>
      {children}
    </StateContext.Provider>
  )
}

export const useStateValue = () => useContext(StateContext)