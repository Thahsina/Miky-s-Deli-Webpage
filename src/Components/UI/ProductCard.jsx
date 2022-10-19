import React, { useState, useEffect } from "react";
import "../styles/productCard.css";
import { Container, Row, Col } from "reactstrap";
import { motion } from "framer-motion";
import { IoCartSharp } from "react-icons/io5";
import { Radio, Checkbox, RadioGroup } from "@mui/material";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Modal, ModalHeader, ModalBody, ModalFooter, Card } from "reactstrap";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import { Troubleshoot } from "@mui/icons-material";
import { connectStorageEmulator } from "firebase/storage";

const ProductCard = ({ data }) => {
  const [modal, setModal] = useState(false);
  const [{ cartItems }, dispatch] = useStateValue();
  const [size, setSize] = useState([]);
  // const [boxChecked, setBoxChecked] = useState(false);
  // const [modalInfoPrice, setModalInfoPrice] = useState(0);
  // const [selectedAddon, setSelectedAddon] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [sizeIsChecked, setSizeIsChecked] = useState(false);
  const [price, setPrice] = useState(0);
  const [selectedAddonPrice, setSelectedAddonPrice] = useState(0);
  const [arabicVariantDescription, setArabicVariantDescription] = useState();
  const [variantDescription, setVariantDescription] = useState();
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
  };

  const cartDispatch = () => {
    localStorage.setItem("cartItems", JSON.stringify(productItems));
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: productItems,
    });
  };

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
  // console.log(modalInfo.qty)
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
    setIsChecked(!isChecked);
    // setIsChecked(false);
  };

  const handleAddonsChange = (event, option) => {
    const { value, checked } = event.target;
    // console.log(`${value} is ${checked}`);
    if (checked) {
      setAddons([...addons, option]);
      setIsChecked(true);
      modalInfo.price = parseFloat(modalInfo.price) + parseFloat(option.price);
    } else {
      setAddons(addons.filter((addon) => addon !== option));
      setIsChecked(false);
      modalInfo.price = parseFloat(modalInfo.price) - parseFloat(option.price);
    }

    addAddons(modalInfo);
  };
  const addAddons = (selectedItem) => {
    console.log(selectedItem.variations?.map((item) => item.addOns));
  };
  console.log(addons);
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
              // console.log(item.title);
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
                    <Row style={{height:"23rem", overflowY: "auto"}}>
                      <Col lg="6" md="6">
                        {/* <Col lg="12" md="12"> */}

                        <div className="imgContainer">
                          <img
                            src={modalInfo?.imageURL}
                            onClick={() => console.log(modalInfo.category)}
                          />
                        </div>

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
                        style={{ height: "18rem", overflowY: "auto" }}
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

                                        // value={variant?.meatOption}
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
                                                    // console.log(e.target.value);

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
                            {modalInfo.variations?.map(
                              (variant) =>
                                variant.extraFlavours && (
                                  <div style={{ width: "100%" }}>
                                    <h6
                                      style={{
                                        width: "100%",
                                        color: "green",
                                        margin: 0,
                                      }}
                                    >
                                      Extra Flavours
                                    </h6>
                                    <small
                                      style={{ color: "rgb(184, 179, 179)" }}
                                    >
                                      Choose items from the list
                                    </small>
                                    <div className="sizeBtns-container">
                                      <RadioGroup
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="radio-buttons"

                                        // value={variant?.meatOption}
                                      >
                                        {modalInfo.variations?.map((variants) =>
                                          variants.extraFlavours?.map(
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
                                                  value={variant?.extraFlavour}
                                                  // checked={isChecked[index]}
                                                  onChange={(e) => {
                                                    // console.log(e.target.value);
                                                  }}
                                                />

                                                <div className="sizeDetails">
                                                  <div className="sizeDetails__name">
                                                    {variant?.extraFlavour}
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
                            {modalInfo.variations?.map(
                              (variant) =>
                                variant.pastaTypes && (
                                  <div style={{ width: "100%" }}>
                                    <h6
                                      style={{
                                        width: "100%",
                                        color: "green",
                                        margin: 0,
                                      }}
                                    >
                                      Pasta Types
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

                                        // value={variant?.meatOption}
                                      >
                                        {modalInfo.variations?.map((variants) =>
                                          variants.pastaTypes?.map(
                                            (variant, index) => (
                                              <div
                                                className="sizeBtn"
                                                key={index}
                                              >
                                                <Radio
                                                  color="success"
                                                  name="radio-buttons"
                                                  // value={index}
                                                  value={variant}
                                                  // checked={isChecked[index]}
                                                  onChange={(e) => {
                                                    // e.target.checked
                                                    //   ? (modalInfo.price =
                                                    //       variant?.price)
                                                    //   : (modalInfo.price = (
                                                    //       <small>
                                                    //         Price on selction
                                                    //       </small>
                                                    //     ));
                                                    // handleChange(e);
                                                    // handleOnChange(e,index);
                                                  }}
                                                />

                                                <div className="sizeDetails">
                                                  <div className="sizeDetails__name">
                                                    {variant}
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
                                variant.flavours && (
                                  <div style={{ width: "100%" }}>
                                    <h6
                                      style={{
                                        width: "100%",
                                        color: "green",
                                        margin: 0,
                                      }}
                                    >
                                      Your Choice of Flavour
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

                                        // value={variant?.meatOption}
                                      >
                                        {modalInfo.variations?.map((variants) =>
                                          variants.flavours?.map(
                                            (variant, index) => (
                                              <div
                                                className="sizeBtn"
                                                key={index}
                                              >
                                                <Radio
                                                  color="success"
                                                  name="radio-buttons"
                                                  // value={index}
                                                  value={variant}
                                                  // checked={isChecked[index]}
                                                  onChange={(e) => {}}
                                                />

                                                <div className="sizeDetails">
                                                  <div className="sizeDetails__name">
                                                    {variant}
                                                  </div>
                                                </div>
                                              </div>
                                            )
                                          )
                                        )}
                                      </RadioGroup>
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
                                            }}
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
                        item.id === modalInfo.id &&
                        modalInfo.qty >= 1 &&
                        modalInfo.price && (
                          <div className="increase-decrease-btns d-flex align-items-center justify-content-between">
                            <motion.button
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
                      {modalInfo.price ? (
                        <span>QAR {modalInfo?.price}</span>
                      ) : (
                        <small>Price on selction</small>
                      )}

                      {/* {console.log(
                          parseFloat(modalInfo?.price) +
                            parseFloat(selectedAddonPrice)
                        )} */}
                      {/* QAR{" "}
                                  {cartItems.map((item) => {
                                    if (modalInfo.id === item.id) return modalInfo?.price * item.qty; 
                                   
                                  })} */}
                      {/* modalInfo?.price * qty */}
                    </div>
                    {/* </div> */}
                    {modalInfo?.price || price ? (
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
                        item.id === modalInfo.id &&
                        modalInfo.qty >= 1 &&
                        modalInfo.price && (
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
