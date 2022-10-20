import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { motion } from "framer-motion";
import { Container, Row, Col } from "reactstrap";
import { If, Then, Else } from "react-if";
import { Radio, Checkbox, RadioGroup } from "@mui/material";

import { IoCartSharp } from "react-icons/io5";

function VariationsModal({ modal, toggle, modalInfo, cartItems, toggleActiveClass, decrease, increase, addToCart }) {
  const [arabicVariantDescription, setArabicVariantDescription] = useState();
  const [variantDescription, setVariantDescription] = useState();
  const [price, setPrice] = useState(0);
  const [addons, setAddons] = useState([]);

  // const [value, setValue] = React.useState("");
  const [selectedSize, setSelectedSize] = React.useState('');
  // const [isChecked, setIsChecked] = useState(false);
  // const [sizeIsChecked, setSizeIsChecked] = useState(false);

  // useEffect(() => {
  // modal && console.log("modal", modal)
  // }, [modal])

  // console.log("modal", modal)

  const handleChangeSize = (newSize, newPrice) => {
    setSelectedSize(newSize);
    // console.log("newSize", newSize)
    // console.log("newPrice", newPrice)
    setPrice(Number(newPrice));
    setAddons([]);
  }

  // const handleChange = (event) => {
  // setValue(event.target.value);
  // setSizeIsChecked(event.target.checked);
  // setIsChecked(!isChecked)
  // setIsChecked(false);
  // };
  const handleAddonsChange = (option) => {
    const isPresent = addons.find((a) => a.addOn === option.addOn);
    if (!isPresent) { // if already present, remove the addon
      setAddons([...addons, option]);
      setPrice(Number(price) + Number(option.price));
    } else {
      setAddons(addons.filter((a) => a.addOn !== option.addOn));
      setPrice(Number(price) - Number(option.price));
    }
  };
  return (
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
                      alt="info-img"
                      src={modalInfo?.imageURL}
                    // onClick={() => console.log(modalInfo.category)}
                    />
                  </div>
                )}

              <p style={{ marginTop: "0.5rem" }}>
                {modalInfo?.description || variantDescription}
              </p>
              <p style={{}}>
                {modalInfo?.arabicDescription || arabicVariantDescription}
              </p>
            </Col>
            <Col lg="6" md="6" style={{ height: "18rem", overflowY: "scroll" }}>
              <div className="descContainer">
                <div className="description col-md-12">
                  {modalInfo.variations?.map(
                    (variant) =>
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
                          <small style={{ color: "rgb(184, 179, 179)" }}>
                            Select size
                          </small>
                          <div className="sizeBtns-container">
                            <RadioGroup
                              aria-labelledby="demo-controlled-radio-buttons-group"
                              name="radio-buttons"
                              value={selectedSize}
                            >
                              {modalInfo.variations?.map((variants) =>
                                variants.sizes?.map((variant, index) => (
                                  <div className="sizeBtn" key={index}>
                                    <Radio
                                      // {...controlProps(variant?.meatOption)}
                                      color="success"
                                      name="radio-buttons"
                                      value={variant?.size}
                                      onChange={(e) => {
                                        // console.log(
                                        //   "modalInfo.variations",
                                        //   modalInfo.variations
                                        // );
                                        // console.log("variants", variants);
                                        // console.log("variant", variant);
                                        // console.log("index", index);
                                        setVariantDescription(
                                          variant?.variantDescription
                                        );
                                        setArabicVariantDescription(
                                          variant?.variantDescriptionArabic
                                        );
                                        handleChangeSize(variant?.size, variant?.price);
                                        // handleChange(e);
                                      }}
                                    />

                                    <div className="sizeDetails">
                                      <div className="sizeDetails__name">
                                        {variant?.size}
                                      </div>
                                      <div className="sizeDetails__price">
                                        QAR {variant?.price}
                                        {/* {console.log("variant?.price", variant?.price)}
                                        {console.log("selectedSize", selectedSize)} */}
                                      </div>
                                    </div>
                                  </div>
                                ))
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
                          <small style={{ color: "rgb(184, 179, 179)" }}>
                            Choose 1
                          </small>
                          <div className="sizeBtns-container">
                            <RadioGroup
                              aria-labelledby="demo-controlled-radio-buttons-group"
                              name="radio-buttons"

                            // value={variant?.meatOption}
                            >
                              {modalInfo.variations?.map((variants) =>
                                variants.meatOptions?.map((variant, index) => (
                                  <div className="sizeBtn" key={index}>
                                    {/* <input
                                            type='radio'
                                            name='react-radio-btn'
                                            value={variant?.price}
                                            // checked= {isRadioSelected()}
                                            onChange={(e) => handleRadioClick(e)}
                            
                                            /> */}

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
                                            ? (modalInfo.price = variant?.price)
                                            : (modalInfo.price = (
                                              <small>Price on selction</small>
                                            ));
                                        }
                                        // changePrice(variant?.price);
                                        // setSelectedAddonPrice(modalInfo.price);
                                        // handleChange(e);
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
                                ))
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
                        <small style={{ color: "rgb(184, 179, 179)" }}>
                          Choose addon items from list
                        </small>
                        <div className="addonBtns-container">
                          {modalInfo.variations?.map((variants) =>
                            variants.addOns?.map((variant, index) => {

                              {/* console.log(Boolean(addons.findIndex((a) => a.addOn === variant.addOn) + 1)) */ }
                              return <div className="addonBtn" key={index}>
                                <Checkbox
                                  checked={Boolean(addons.findIndex((a) => a.addOn === variant.addOn) + 1)}
                                  color="success"
                                  onChange={() => {
                                    handleAddonsChange(variant);
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
                            })
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
            {price ? (
              <span>QAR {price}</span>
            ) : (
              <small>Price on selction</small>
            )}
          </div>
          {/* </div> */}
          {price || modalInfo?.price ? (
            <div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  // toggleActiveClass();

                  addToCart({ ...modalInfo, price, selectedAddons: addons, selectedSize });
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
  );
}

export default React.memo(VariationsModal);
