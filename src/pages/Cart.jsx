import React, { useState } from "react";
import { ListGroup } from "reactstrap";
import { Link } from "react-router-dom";
import CartItem from "../pages/CartItem";
import "../Components/styles/cart.css";
import { motion } from "framer-motion";
import { MdOutlineKeyboardTab } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import { useStateValue } from "../context/StateProvider";
import { If, Else, Then } from "react-if";

const Cart = ({ cartMenu, setCartMenu }) => {
  console.log('cart')
  const { user, cartItems, clearCart, calculateTotalPriceOfItem } = useStateValue()[2];
  const [flag, setFlag] = useState(1);

  const calculateTotalPrice = () => {
    return cartItems.reduce(function (accumulator, item) {
      return accumulator + calculateTotalPriceOfItem(item.id);
    }, 0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="cart__container"
    >
      <ListGroup className="cart">
        <div className="cartHeader">
          <motion.div
            className="cartCloseIcon"
            onClick={() => setCartMenu(false)}
            whileTap={{ scale: 0.75 }}
          >
            <MdOutlineKeyboardTab
              style={{ fontSize: "1.5rem", color: "#686868" }}
            />
          </motion.div>
          <h6 className="cartTitle">Your Cart</h6>
          <motion.p
            whileTap={{ scale: 0.75 }}
            className="clearBtn"
            onClick={clearCart}
          >
            Clear <RiRefreshFill />{" "}
          </motion.p>
        </div>
        <div className="cart__item-list">
          {
            cartItems?.map((item) => (
              <CartItem
                key={item.id}
                cartItem={item}
                setFlag={setFlag}
                flag={flag}
              />
            ))
          }
        </div>
        <div className="cartTotalContainer">
          <div className="cartSubTotal">
            <p>Sub Total</p>
            <p>QAR {calculateTotalPrice()}</p>
          </div>
          <div className="cartSubTotal">
            <p>Delivery</p>
            <p>Free</p>
          </div>
          <div className="divider"></div>
          <div className="cartTotal">
            <p>Total</p>
            <p>QAR {
              calculateTotalPrice()
            }</p>
          </div>
          <If condition={Boolean(user)}>
            <Then>
              <Link to="/checkout">
                <motion.button
                  className="checkoutBtn"
                  whileTap={{ scale: 0.8 }}
                  onClick={() => setCartMenu(false)}
                  disabled={calculateTotalPrice() === 0 ? true : false}
                >
                  Checkout
                </motion.button>

              </Link >
            </Then >
            <Else>
              <Link to="/">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.8 }}
                  className="checkoutBtn"
                  onClick={() => setCartMenu(false)}
                >
                  Sign In to Check Out
                </motion.button>
              </Link>
            </Else>
          </If >
        </div >
      </ListGroup >
    </motion.div >
  );
};

export default Cart;
