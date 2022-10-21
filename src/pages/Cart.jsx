import React, { useState, useEffect } from "react";
import { ListGroup } from "reactstrap";
import { Link } from "react-router-dom";
import CartItem from "../pages/CartItem";
import "../Components/styles/cart.css";
import { motion } from "framer-motion";
import { MdOutlineKeyboardTab } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const Cart = ({ cartMenu, setCartMenu }) => {
  console.log('cart')
  const [{ user, cartItems }, dispatch] = useStateValue();
  const [itemsCart, setItemsCart] = useState(cartItems);
  const [total, setTotal] = useState(0);
  const [flag, setFlag] = useState(1);

  useEffect(() => {
    let totalPrice = cartItems.reduce(function (accumulator, item) {
      return accumulator + item.qty * item.price;
    }, 0);
    setTotal(totalPrice);
    // console.log(total)
  }, [total, flag]);

  const clearCart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: [],
    });
    localStorage.setItem("cartItems", JSON.stringify([]));
    setTotal(0);
    setItemsCart(null);
  };

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
            // onClick={() => setCartMenu(false)}
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
          {cartItems &&
            cartItems?.map((item) => (
              <CartItem
                key={item.id}
                cartItem={item}
                setFlag={setFlag}
                flag={flag}
              />
            ))}
        </div>

        <div className="cartTotalContainer">
          <div className="cartSubTotal">
            <p>Sub Total</p>
            <p>QAR {total}</p>
          </div>
          <div className="cartSubTotal">
            <p>Delivery</p>
            <p>Free</p>
          </div>
          <div className="divider"></div>
          <div className="cartTotal">
            <p>Total</p>
            <p>QAR {total}</p>
          </div>

          {user ? (
            <Link to="/checkout">
              <motion.button
                className="checkoutBtn"
                whileTap={{ scale: 0.8 }}
                onClick={() => setCartMenu(false)}
                disabled={total === 0 ? true : false}

              // disabled={cartItems !== null ? true : false}
              >
                {/* <button type="button" onClick={() => setCartMenu(false)}> */}
                Checkout
                {/* <Link to="/checkout"> Check Out</Link> */}
                {/* </button> */}
              </motion.button>

            </Link>
          ) : (
            // <Link to="/">
              <motion.button
                type="button"
                whileTap={{ scale: 0.8 }}
                className="checkoutBtn"
                onClick={() => setCartMenu(false)}
              >
                Sign In to Check Out
              </motion.button>
            // </Link>
          )}
        </div>

        {/* <div className="cart__bottom d-flex align-items-center justify-content-between">
          <p>Sub Total</p>
          <p>QAR 30</p>

          <h6>
            Delivery: <span>QAR 0</span>
          </h6>
          <h6>
            Subtotal : <span>QAR 37</span>
          </h6>

          <button>
            <Link to="/checkout">Checkout</Link>
          </button>
        </div> */}
      </ListGroup>
    </motion.div>
  );
};

export default Cart;
