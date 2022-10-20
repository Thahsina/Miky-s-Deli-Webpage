import React, { useState } from "react";
import "../../styles/productCard.css";
import "react-loading-skeleton/dist/skeleton.css";
import { useStateValue } from "../../../context/StateProvider";
import { actionType } from "../../../context/reducer";
import { connectStorageEmulator } from "firebase/storage";

import { If, Then, Else } from 'react-if';

import VariationsModal from "./VariationsModal";
import OtherModal from "./OtherModal";

const ProductCard = ({ data }) => {
  const [modal, setModal] = useState(false);
  const [{ cartItems }, dispatch, st] = useStateValue();
  const [size, setSize] = useState([]);
  // const [boxChecked, setBoxChecked] = useState(false);
  // const [modalInfoPrice, setModalInfoPrice] = useState(0);
  const [selectedAddonPrice, setSelectedAddonPrice] = useState(0);
  // console.log("addons:", { addons });
  const [modalInfo, setModalInfo] = useState([]);
  const [addonTotal, setAddonTotal] = useState(0);
  const [cartFlag, setCartFlag] = useState(1);
  const [productItems, setProductItems] = useState([]);

  // console.log("data", data)
  // console.log("modalInfo variations", modalInfo?.variations)
  const toggleActiveClass = (event) => {
    event.currentTarget.classList.toggle("active");
  };
  const toggle = () => {
    setModal(!modal);
  };

  const cartDispatch = () => {
    localStorage.setItem("cartItems", JSON.stringify(productItems));
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: productItems,
    });
  };

  const addToCart = (item) => {
    let filteredCartItems = cartItems.filter(
      (eachItem, id) => item.id !== eachItem.id
    );

    dispatch({
      type: actionType.SET_CARTITEMS,
      // cartItems: [...cartItems, item],
      cartItems: [...filteredCartItems, item],
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  const increase = (item) => {
    cartItems.map((cartItem) => {
      if (cartItem.id === item.id) {
        if (cartItem.qty > 25) {
          cartItem.qty += 1;
          setCartFlag(cartFlag + 1);
          // console.log(cartItem.qty);
        }
      }
    });
    item.qty += 1;
    addToCart(item);
    item.price *= item.qty;
  };

  const decrease = (item) => {
    cartItems.map((cartItem) => {
      if (cartItem.id === item.id) {
        if (cartItem.qty > 1) {
          cartItem.qty -= 1;
          setCartFlag(cartFlag + 1);
          // console.log(cartItem.qty);
          return cartItem.qty;
        }
      }
    });
    item.qty -= 1;
    addToCart(item);
    item.price *= item.qty;
  };
  return (
    <>
      {data &&
        data.map((item) => (
          <div
            key={item.id}
            className="card mb-4"
            onClick={() => {
              toggle();
              setModalInfo(item);
              console.log(item)
            }}
            style={{ width: "15rem" }}
          >
            <img
              className="card-img-top mt-2"
              src={item.imageURL}
              alt="product-img"
              loading="lazy"
            />

            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
              <h6 className="card-arabicTitle">{item?.arabicTitle}</h6>

              <p className="card-text card-description">{item?.description}</p>
            </div>
            {/* {modalInfo.variations && item.id === modalInfo?.id ? (
              <VariationsModal modal={modal} toggle={toggle} modalInfo={modalInfo} cartItems={cartItems} decrease={decrease} increase={increase} addToCart={st.addToCart} toggleActiveClass={toggleActiveClass} />
            ) : (
              <OtherModal modal={modal} toggle={toggle} modalInfo={modalInfo} cartItems={cartItems} addToCart={addToCart} decrease={decrease} increase={increase} toggleActiveClass />
            )} */}
            <If condition={!(modalInfo.variations && item.id === modalInfo?.id)}>
              <Then>
                <OtherModal
                  modal={modal}
                  toggle={toggle}
                  modalInfo={modalInfo}
                  cartItems={cartItems}
                  addToCart={addToCart}
                  decrease={decrease}
                  increase={increase}
                  toggleActiveClass={toggleActiveClass}
                />
              </Then>
              <Else>
                <VariationsModal
                  modal={modal}
                  toggle={toggle}
                  modalInfo={modalInfo}
                  cartItems={cartItems}
                  addToCart={addToCart}
                  decrease={decrease}
                  increase={increase}
                  toggleActiveClass={toggleActiveClass}
                />
              </Else>
            </If>
          </div>
        ))}
    </>
  );
};

export default ProductCard;
