import React, { useState, useEffect } from "react";
import { ListGroupItem } from "reactstrap";
import { IoCloseSharp } from "react-icons/io5";
import "../Components/styles/cartItem.css";

import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const CartItem = ({ cartItem, setFlag, flag }) => {
  const [qty, setQty] = useState(cartItem.qty);
  const [{ cartItems, user }, dispatch] = useStateValue();
  const [items, setItems] = useState([]);

  const cartDispatch = () => {
    localStorage.setItem("cartItems", JSON.stringify(items));
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items,
    });
  };

  //  const quantityDispatch = () => {
  //   dispatch({
  //     type: actionType.SET_QUANTITY,
  //     quantity: qty,
  //   })
  //  }

  const deleteItem = (itemId) => {
    setQty(0);
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: cartItems.filter((item, id) => item.id !== itemId),
    });
  };

  const updateQty = (action, id) => {
    if (action === "add") {
      setQty(qty + 1);
      cartItems.map((item) => {
        if (item.id === id) {
          item.qty += 1;
          setFlag(flag + 1);
        }
      });
      console.log(qty);

      cartDispatch();
    } else {
      if (qty === 1) {
        setItems(cartItems.filter((item) => item.id !== id));

        cartDispatch();
      } else {
        setQty(qty - 1);
        cartItems.map((item) => {
          if (item.id === id) {
            item.qty -= 1;
            setFlag(flag + 1);
          }
        });

        cartDispatch();
      }
    }
  };

  useEffect(() => {
    setItems(cartItems);
  }, [qty]);

  return (
    <ListGroupItem className="border-0 cart__item">
      <div className="cart__item-info d-flex gap-2">
        <img src={cartItem?.imageURL} alt="product-img" />

        <div className="cart__product-info w-100 d-flex align-items-center gap-4 justify-content-between">
          <div>
            <h6 className="cart__product-title">{cartItem?.title}</h6>
            <span className="cart__product-price ">
              {" "}
              QAR {cartItem?.price * qty}
            </span>
          </div>

          <div className="catering__quantityContainer">
            <div className=" d-flex align-items-center justify-content-between cartItem-increase__decrease-btns">
              {/* {qty > 1 &&  */}
              <div
                whileTap={{ scale: 0.75 }}
                className={`cartItem-decrease__btn ${
                  qty <= 1 ? "disabled" : ""
                }`}
                onClick={() => {
                  qty > 1 && updateQty("remove", cartItem?.id);
                }}
              >
                <BiMinus style={{ fontSize: "0.9rem" }} />
              </div>
              {/* }  */}
              <span className="cartItem-quantity">{qty}</span>
              <motion.div
                whileTap={{ scale: 0.75 }}
                // className="cartItem-increase__btn"
                className={`cartItem-increase__btn ${
                  qty > 25 ? "disabled" : ""
                }`}
                onClick={() => updateQty("add", cartItem?.id)}
              >
                <BiPlus style={{ fontSize: "1rem" }} />
              </motion.div>
            </div>
          </div>
          {/* <IoCloseSharp style={{ fontSize: "0.9rem", color: "#df2020",cursor: "pointer" }} onClick={() => updateQty("remove", cartItem?.id)}/> */}
          <IoCloseSharp
            style={{ fontSize: "0.9rem", color: "#df2020", cursor: "pointer" }}
            onClick={() => deleteItem(cartItem?.id)}
          />
        </div>
      </div>
    </ListGroupItem>
  );
};

export default CartItem;
