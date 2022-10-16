import React, { useState, useEffect } from "react";
import "../Components/styles/productCard.css";
import { Container, Row, Col } from "reactstrap";
import { motion } from "framer-motion";
import { IoCartSharp } from "react-icons/io5";
import { Radio, Checkbox, RadioGroup } from "@mui/material";
import "react-loading-skeleton/dist/skeleton.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import { useStateValue } from "../../context/StateProvider";
import { useStateValue } from "../context/StateProvider";
// import { actionType } from "../../context/reducer";
import { actionType } from "../context/reducer";

const ProductCard = ({ data }) => {
  const [modal, setModal] = useState(false);
  const [{ cartItems }, dispatch] = useStateValue([]);
  const [size, setSize] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [sizeIsChecked, setSizeIsChecked] = useState(false);
  // states 
  const [addonsMeat, setAddonsMeat] = useState([]);
  const [meatOption, setMeatOption] = useState(null);
  const [meatOptionPrice, setMeatOptionPrice] = useState(0);
  const [sumMeatAndAddons, setSumMeatAndAddons] = useState();
  const [addonsMeatPrice, setAddonsMeatPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [totalItems, setTotalItems] = useState([]) // total selected items in this state


  const [price, setPrice] = useState(0);
  const [selectedAddonPrice, setSelectedAddonPrice] = useState(0);
  const [arabicVariantDescription, setArabicVariantDescription] = useState();
  const [variantDescription, setVariantDescription] = useState();
  const [meatPrice, setMeatPrice] = useState(0);

  const [addons, setAddons] = useState([]);
  // console.log("addons:", { addons });
  const [modalInfo, setModalInfo] = useState([]);
  const [addonTotal, setAddonTotal] = useState(0);
  const [cartFlag, setCartFlag] = useState(1);
  const [productItems, setProductItems] = useState([]);

  const toggleActiveClass = (event) => {
    event.currentTarget.classList.toggle("active");
  };
  const toggle = () => {
    setModal(!modal);
    setAddonsMeat([])
    setMeatOption([])
  };


  // const cartDispatch = () => {
  //   localStorage.setItem("cartItems", JSON.stringify(productItems));
  //   dispatch({
  //     type: actionType.SET_CARTITEMS,
  //     cartItems: productItems,
  //   });
  // };

  console.log('totalItems', totalItems)

  const addToCart = (item) => {
    // cartItems.map((cartItem) => {
    //   if (cartItem.id === item.id) {
    //     cartItem.qty += 1;
    //     setCartFlag(cartFlag + 1);
    //     console.log(cartItem.qty);
    //   }
    // });
    //To remove duplicate items
    let filteredCartItems = cartItems.filter(
      (eachItem, id) => item.id !== eachItem.id
    );

    dispatch({
      type: actionType.SET_CARTITEMS,
      // cartItems: [...cartItems, item],
      cartItems: [...cartItems,totalItems],
    });
    localStorage.setItem("cartItems", JSON.stringify(totalItems));
  };

  const increase = (item) => {
    cartItems.map((cartItem) => {
      if (cartItem.id === item.id) {
        if (cartItem.qty > 25) {
          cartItem.qty += 1;
          setCartFlag(cartFlag + 1);
          console.log(cartItem.qty);
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
          console.log(cartItem.qty);
          return cartItem.qty;
        }
      }
    });
    item.qty -= 1;
    addToCart(item);
    item.price *= item.qty;
    // {item.qty > 0 ? item.price *= item.qty  : item.price = item.price};
    // localStorage.setItem("cartItems", JSON.stringify(cartItems));
    // dispatch({
    //   type: actionType.SET_CARTITEMS,
    //   cartItems: cartItems,
    // });
    // return item.qty -=1;
    // console.log(item.qty)
    // setproductQty(productQty - 1);
    // return productQty;
  };
  console.log(modalInfo.qty)
  // const handleMeatOptionsChange = (event) => {
  //   const { value, checked } = event.target;
  //   console.log(`${value} is ${checked}`);
  // };

  // const handleRadioClick = (event) => {
  //   const { value, checked } = event.target;
  //   console.log(`${value} is ${checked}`);
  // };

  const [value, setValue] = React.useState("");

  // const handleOnChange = (event, position) => {
  //   setValue(event.target.value);
  //   const updatedCheckedState = isChecked.map((item, index) =>
  //     index === position ? !item : item
  //   );
  //   setIsChecked(updatedCheckedState);
  // };

  const handleChange = (event) => {
    setValue(event.target.value);
    setSizeIsChecked(event.target.checked);
    setIsChecked(!isChecked)
    // setIsChecked(false);
  };

  // let a = modalInfo?.variations[0]?.meatOptions?.map(v => v?.meatOption)
  //   let b = addons?.map(v => v?.meatOption)

  //   // console.log('addons', a)
  //   console.log('addons filtter', option)
  //   console.log('addons =====>', addons)

  const handleAddonsChange = (event, option) => {
    const { value, checked } = event.target;
    // console.log(`${value} is ${checked}`);
    // console.log('option', option)
    // if (checked) {
    //   setAddons([...addons, option]);
    //   setIsChecked(true);
    //   modalInfo.price = parseFloat(modalInfo.price) + parseFloat(option.price)
    // } else {
    //   setAddons(addons.filter((addon) => addon !== option));
    //   setIsChecked(false);
    //   modalInfo.price = parseFloat(modalInfo.price) - parseFloat(option.price)
    // }
  };



  const meat = (e, option) => {
    setMeatOptionPrice(option.price)
    setMeatOption(option)
    setSumMeatAndAddons(option.price)
  }

  const addonsMeatFun = (e, option) => {

    if (e?.target?.checked) {
      setIsChecked(true);
      setAddonsMeat([...addonsMeat, option])
    } else {
      setAddonsMeat(addonsMeat.filter((a) => a !== option))
      setIsChecked(false);
      console.log('runing')
    }
  }

  let sum = 0
  let add = () => {
    addonsMeat?.map((v, i) => {
      sum = sum + (+v?.price || 0)
      setAddonsMeatPrice(sum)
      return sum
    })
    setSumMeatAndAddons((+meatOptionPrice || 0) + (+addonsMeatPrice || 0)) // adding the prices of meatoptions and addon
    // setTotalItems([...totalItems])
    setTotalItems([meatOption, {addons:addonsMeat}]) // combining meatoptions state and addons state to get a final state 

  }

  useEffect(() => {
    add()
  }, [addonsMeat])


  // console.log('addonsMeat', addonsMeatPrice)


  let totalPrice = ((+meatOptionPrice || 0) + (+addonsMeatPrice || 0)) * quantity  // total price that is addition of all the items
  console.log('meatOptionPrice', totalPrice)
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
              // setTotalItems([item]) 

            }}
            style={{ width: "15rem" }}
          >
            <img
              className="card-img-top mt-2"
              src={item.imageURL}
              alt="product image"
              loading="lazy"
            />

            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
              <h6 className="card-arabicTitle">{item?.arabicTitle}</h6>

              <p className="card-text card-description">{item?.description}</p>
            </div>
            {modalInfo.variations ? (
              <Modal size="lg" isOpen={modal} toggle={toggle}>
                <ModalHeader className="modalHeader" toggle={toggle}>
                  <button
                    onClick={toggle}
                    type="button"
                    className="close"
                    data-dismiss="modal"
                  >
                    <span aria-hidden="true" className="modal_button">
                      &times;
                    </span>
                    {/* <span class="sr-only">Close</span> */}
                  </button>
                  {modalInfo?.title}
                  {modalInfo?.arabicTitle}
                </ModalHeader>
                <ModalBody className="modalBody">
                  <Container>
                    <Row>
                      <Col lg="6" md="6">
                        {/* <Col lg="12" md="12"> */}
                        {modalInfo.category ===
                          ("fresh juices" ||
                            "cold coffee" ||
                            "hot drinks" ||
                            "cold drinks" ||
                            "smoothies") && (
                            <div
                              // className="imgContainer"
                              style={{
                                minHeight: "13rem",
                                maxHeight: "28rem",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                overflow: "hidden",
                                transition: "all 0.2s ease",
                              }}
                            >
                              <img src={modalInfo?.imageURL} />
                            </div>
                          )}
                        {modalInfo.category !==
                          ("fresh juices" ||
                            "cold coffee" ||
                            "hot drinks" ||
                            "cold drinks" ||
                            "smoothies") && (
                            <div className="imgContainer">
                              <img
                                src={modalInfo?.imageURL}
                                onClick={() => console.log(modalInfo.category)}
                              />
                            </div>
                          )}

                        <p style={{ marginTop: "0.5rem" }}>
                          {modalInfo?.description || variantDescription}
                        </p>
                        <p style={{}}>
                          {modalInfo?.arabicDescription ||
                            arabicVariantDescription}
                        </p>
                      </Col>
                      <Col
                        lg="6"
                        md="6"
                        style={{ height: "18rem", overflowY: "scroll" }}
                      >
                        <div className="descContainer">
                          <div className="description col-md-12">
                            {modalInfo.variations?.map(
                              (variant) =>
                                // {
                                variant.sizes && (
                                  <div style={{ width: "100%" }}>
                                    <h6
                                      style={{
                                        width: "100%",
                                        color: "green",
                                        margin: 0,
                                      }}
                                    >
                                      Sizes
                                    </h6>
                                    <small
                                      style={{ color: "rgb(184, 179, 179)" }}
                                    >
                                      Select size
                                    </small>
                                    <div className="sizeBtns-container">
                                      <RadioGroup
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="radio-buttons"
                                      // value={variant?.meatOption}
                                      >
                                        {modalInfo.variations?.map((variants) =>
                                          variants.sizes?.map(
                                            (variant, index) => (
                                              <div
                                                className="sizeBtn"
                                                key={index}
                                              >
                                                <Radio
                                                  // {...controlProps(variant?.meatOption)}
                                                  color="success"
                                                  name="radio-buttons"
                                                  value={variant?.size}
                                                  onChange={(e) => {
                                                    meat(e, variant);
                                                    console.log(e.target.value);
                                                    setVariantDescription(
                                                      variant?.variantDescription
                                                    );
                                                    setArabicVariantDescription(
                                                      variant?.variantDescriptionArabic
                                                    );
                                                    {
                                                      e.target.checked
                                                        ? (modalInfo.price =
                                                          variant?.price)
                                                        : (modalInfo.price =
                                                          modalInfo.price);
                                                    }
                                                    // setSelectedAddonPrice(
                                                    //   modalInfo.price
                                                    // );
                                                    handleChange(e);
                                                  }}
                                                />

                                                <div className="sizeDetails">
                                                  <div className="sizeDetails__name">
                                                    {variant?.size}
                                                  </div>
                                                  <div className="sizeDetails__price">
                                                    QAR {variant?.price}
                                                  </div>
                                                </div>
                                              </div>
                                            )
                                          )
                                        )}
                                      </RadioGroup>

                                      <hr
                                        style={{
                                          background: "#139652",
                                          color: "#139652",
                                          borderColor: "#139652",
                                          height: "3px",

                                          width: "50%",
                                        }}
                                      />
                                    </div>
                                  </div>
                                )
                            )}
                            {modalInfo.variations?.map(
                              (variant) =>
                                variant.meatOptions && (
                                  <div style={{ width: "100%" }}>
                                    <h6
                                      style={{
                                        width: "100%",
                                        color: "green",
                                        margin: 0,
                                      }}
                                    >
                                      Meat Options
                                    </h6>
                                    <small
                                      style={{ color: "rgb(184, 179, 179)" }}
                                    >
                                      Choose 1
                                    </small>
                                    <div className="sizeBtns-container">
                                      <RadioGroup
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="radio-buttons"

                                      >
                                        {modalInfo.variations?.map((variants) =>
                                          variants.meatOptions?.map(
                                            (variant, index) => (
                                              <div
                                                className="sizeBtn"
                                                key={index}
                                              >
                                                <Radio
                                                  // {...controlProps(variant?.meatOption)}
                                                  color="success"
                                                  name="radio-buttons"
                                                  // value={index}
                                                  value={variant?.meatOption}
                                                  // checked={isChecked[index]}
                                                  onChange={(e) => {
                                                    meat(e, variant);
                                                    setMeatPrice(0)
                                                    setVariantDescription(
                                                      variant?.variantDescription
                                                    );
                                                    setArabicVariantDescription(
                                                      variant?.variantDescriptionArabic
                                                    );
                                                    {
                                                      e.target.checked
                                                        ? (modalInfo.price = Number(modalInfo?.price || 0) + Number(variant?.price || 0))
                                                        : (modalInfo.price = (
                                                          <small>
                                                            Price on selction
                                                          </small>
                                                        ));
                                                    }
                                                    // changePrice(variant?.price);
                                                    setSelectedAddonPrice(
                                                      modalInfo.price
                                                    );
                                                    handleChange(e);
                                                    setMeatPrice(variant?.price || 0)

                                                    // handleOnChange(e,index);
                                                  }}
                                                />

                                                {/* <RadioButton props={variants.meatOptions}/> */}
                                                <div className="sizeDetails">
                                                  <div className="sizeDetails__name">
                                                    {variant?.meatOption}
                                                    {/* {console.log(variant?.size, variant?.price)} */}
                                                  </div>
                                                  <div className="sizeDetails__price">
                                                    QAR {variant?.price}
                                                  </div>
                                                </div>
                                              </div>
                                            )
                                          )
                                        )}
                                      </RadioGroup>

                                      <hr
                                        style={{
                                          background: "#139652",
                                          color: "#139652",
                                          borderColor: "#139652",
                                          height: "3px",

                                          width: "50%",
                                        }}
                                      />
                                    </div>
                                  </div>
                                )
                            )}
                          </div>
                          {modalInfo.variations?.map(
                            (variant) =>
                              variant.addOns && (
                                <div style={{ width: "100%" }}>
                                  <h6
                                    style={{
                                      width: "100%",
                                      color: "green",
                                      margin: 0,
                                    }}
                                  >
                                    Add Ons
                                  </h6>
                                  <small
                                    style={{ color: "rgb(184, 179, 179)" }}
                                  >
                                    Choose addon items from list
                                  </small>
                                  <div className="addonBtns-container">
                                    {modalInfo.variations?.map((variants) =>
                                      variants.addOns?.map((variant, index) => (
                                        <div className="addonBtn" key={index}>
                                          <Checkbox
                                            type="checkbox"

                                            value={variant?.price}
                                            color="success"
                                            disabled={!modalInfo.price}
                                            onChange={(e) => {
                                              addonsMeatFun(e, variant)
                                              console.log('e===>', variant?.price)
                                              handleAddonsChange(e, variant);
                                              // modalInfo.price &&
                                              // e.target.checked === true
                                              //   ? // isChecked === true
                                              //     setSelectedAddonPrice(
                                              //       (modalInfo.price =
                                              //         parseInt(
                                              //           modalInfo.price
                                              //         ) +
                                              //         parseInt(variant.price))
                                              //     )
                                              //   : setSelectedAddonPrice(
                                              //       (modalInfo.price =
                                              //         parseInt(
                                              //           modalInfo.price
                                              //         ) -
                                              //         parseInt(variant.price))
                                              //     );
                                            }
                                            }
                                          />

                                          <div className="addonDetails">
                                            <div className="addonDetails__name">
                                              {variant?.addOn}
                                            </div>
                                            <div className="addonDetails__price">
                                              Qr <span>{variant?.price}</span>
                                            </div>
                                          </div>
                                        </div>
                                      ))
                                    )}
                                  </div>
                                </div>
                              )
                          )}
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </ModalBody>
                <ModalFooter className="modalFooter border-0 d-flex flex-row justify-content-between">
                  <div className="descrptionFooter d-flex align-items-center justify-content-around">
                    {cartItems.map(
                      (item) =>
                        /* item.id === modalInfo.id && */ modalInfo.qty >= 1 && modalInfo.price && (
                          <div className="increase-decrease-btns d-flex align-items-center justify-content-between">
                            <motion.button
                              disabled={quantity > 1 ? false : true}
                              whileTap={{ scale: 0.75 }}
                              className="decrease__btn"
                              onClick={() => setQuantity((pre) => pre - 1)}
                            >
                              <i className="ri-subtract-line"></i>
                            </motion.button>
                            <span className="counter-quantity">
                              {quantity}
                              {/* {cartItems?.length > 0 &&
                                cartItems?.map((item) => {

                                  if (modalInfo.id === item.id) return item.qty;
                                })} */}
                            </span>
                            <motion.button
                              whileTap={{ scale: 0.75 }}
                              className="increase__btn"
                              onClick={() => setQuantity((pre) => pre + 1)}
                            >
                              <i className="ri-add-line"></i>
                            </motion.button>
                          </div>
                        )
                    )}
                    <div className="product__price-modal">
                      {modalInfo.price ? (
                        <span>QAR {totalPrice}</span>
                      ) : (
                        <small>Price on selction</small>
                      )}

                    </div>
                    {/* </div> */}
                    {modalInfo?.price || price ? (
                      <div>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            // toggleActiveClass();

                            // addToCart(modalInfo);
                            addToCart(totalItems);

                            toggleActiveClass(e);
                          }}
                          className="cart_btn btn btn-primary"
                        >
                          <span className="add_to_cart">Add to cart</span>
                          <span className="added">Added!</span>
                          <IoCartSharp className="cart-shopping" />

                          <div className="dots"></div>
                        </motion.button>
                      </div>
                    ) : (
                      console.log("None")
                    )}
                  </div>
                </ModalFooter>
              </Modal>
            ) : (
              <Modal size="md" isOpen={modal} toggle={toggle}>
                <ModalHeader className="modalHeader" toggle={toggle}>
                  <button
                    onClick={toggle}
                    type="button"
                    className="close"
                    data-dismiss="modal"
                  >
                    <span aria-hidden="true" className="modal_button">
                      &times;
                    </span>
                    {/* <span class="sr-only">Close</span> */}
                  </button>
                  {modalInfo?.title}
                  {modalInfo?.arabicTitle}
                </ModalHeader>
                <ModalBody className="modalBody">
                  <Container>
                    <Row>
                      {/* <Col lg="6" md="6"> */}
                      <Col lg="12" md="12">
                        {modalInfo.category === "fresh juices" && (
                          <div
                            // className="imgContainer"
                            style={{
                              minHeight: "13rem",
                              maxHeight: "28rem",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              overflow: "hidden",
                              transition: "all 0.2s ease",
                            }}
                          >
                            <img src={modalInfo?.imageURL} />
                          </div>
                        )}
                        {modalInfo.category !== "fresh juices" && (
                          <div className="imgContainer">
                            <img
                              src={modalInfo?.imageURL}
                              onClick={() => console.log(modalInfo.category)}
                            />
                          </div>
                        )}

                        <p style={{ marginTop: "0.5rem" }}>
                          {modalInfo?.description}
                        </p>
                        <p style={{ marginTop: "0.5rem" }}>
                          {modalInfo?.arabicDescription}
                        </p>
                      </Col>
                    </Row>
                  </Container>
                </ModalBody>
                <ModalFooter className="modalFooter border-0 d-flex flex-row justify-content-between">
                  <div className="descrptionFooter d-flex align-items-center justify-content-around">
                    {/* <div className="increaseDecreaseBtns__price"> */}
                    {cartItems.map(
                      (item) =>
                        item.id === modalInfo.id && modalInfo.qty >= 1 && modalInfo.price && (
                          <div className="increase-decrease-btns d-flex align-items-center justify-content-between">
                            <motion.button
                              disabled={item.qty <= 0}
                              whileTap={{ scale: 0.75 }}
                              className="decrease__btn"
                              onClick={() => decrease(modalInfo)}
                            >
                              <i className="ri-subtract-line"></i>
                            </motion.button>
                            <span className="counter-quantity">
                              {cartItems?.length > 0 &&
                                cartItems?.map((item) => {
                                  if (modalInfo.id === item.id) return item.qty;
                                })}
                            </span>
                            <motion.button
                              whileTap={{ scale: 0.75 }}
                              className="increase__btn"
                              onClick={() => {
                                // modalInfo.qty += 1;

                                increase(modalInfo);
                              }}
                            >
                              <i className="ri-add-line"></i>
                            </motion.button>
                          </div>
                        )
                    )}
                    <div className="product__price-modal">
                      <span>
                        QAR {modalInfo?.price}
                        {console.log('modalInfo?.price', modalInfo?.price)}
                        {/* QAR{" "}
                      {cartItems.map((item) => {
                        if (modalInfo.id === item.id) return modalInfo?.price * item.qty; 
                       
                      })} */}
                        {/* modalInfo?.price * qty */}
                      </span>
                    </div>
                    {/* </div> */}

                    <div>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          // toggleActiveClass();
                          addToCart(modalInfo);
                          toggleActiveClass(e);
                        }}
                        className="cart_btn btn btn-primary"
                      >
                        <span className="add_to_cart">Add to cart</span>
                        <span className="added">Added!</span>
                        <IoCartSharp className="cart-shopping" />
                        {/* <IoGift className="boxIcon"/> */}
                        <div className="dots"></div>
                      </motion.button>
                    </div>
                  </div>
                </ModalFooter>
              </Modal>
            )}
          </div>
        ))}
    </>
  );
};

export default ProductCard;