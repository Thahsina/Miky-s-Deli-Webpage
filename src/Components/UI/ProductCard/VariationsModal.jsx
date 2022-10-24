import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { motion } from "framer-motion";
import { Container, Row, Col } from "reactstrap";
import { If, Then, Else, When, Switch, Case } from "react-if";
import { Radio, Checkbox, RadioGroup } from "@mui/material";

import { IoCartSharp } from "react-icons/io5";
import { useStateValue } from "../../../context/StateProvider";

function Sizes({ selectedSize, sizes, handleChangeSize, setVariantDescription, setArabicVariantDescription }) {
  return (
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
          value={selectedSize?.size}
        >
          {sizes?.map((variant, index) => (
            <div className="sizeBtn" key={index}>
              <Radio
                color="success"
                name="radio-buttons"
                value={variant?.size}
                onChange={(e) => {
                  setVariantDescription(
                    variant?.variantDescription
                  );
                  setArabicVariantDescription(
                    variant?.variantDescriptionArabic
                  );
                  handleChangeSize(variant);
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
          ))}
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
}

function MeatOptions({ meatOptions, selectedMeatOption, handleMeatOptionChange, setArabicVariantDescription, setVariantDescription }) {
  return (
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
        >
          {meatOptions?.map((variant, index) => (
            <div className="sizeBtn" key={index}>
              <Radio
                color="success"
                name="radio-buttons"
                value={variant?.meatOption}
                checked={selectedMeatOption?.meatOption === variant.meatOption}
                onChange={(e) => {
                  setVariantDescription(
                    variant?.variantDescription
                  );
                  setArabicVariantDescription(
                    variant?.variantDescriptionArabic
                  );
                  handleMeatOptionChange(variant);
                }}
              />

              <div className="sizeDetails">
                <div className="sizeDetails__name">
                  {variant?.meatOption}
                </div>
                <div className="sizeDetails__price">
                  QAR {variant?.price}
                </div>
              </div>
            </div>
          ))
          }
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
}

function Addons({ addOns, selectedAddons, handleAddonsChange }) {
  return (
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
        {addOns?.map((variant, index) => {
          return (
            <div className="addonBtn" key={index}>
              <Checkbox
                checked={Boolean(
                  selectedAddons.findIndex(
                    (a) => a.addOn === variant.addOn
                  ) + 1
                )}
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
          );
        })
        }
      </div>
    </div>
  )
}

function calculatePrice({ sizePrice, addons, meatOptionPrice, quantity }) {
  let val = Number(sizePrice || 0) + Number(meatOptionPrice || 0);
  addons?.forEach((a) => val += Number(a.price));
  return val * Number(quantity);
}

function VariationsModal({
  modal,
  toggle,
  modalInfo
}) {
  const { cartItems, updateItem, toggleAddToCart, increase, decrease } = useStateValue()[2];
  // find this item in cartItems
  // if item is already present in cart, display values from cart
  const currentItem = cartItems.find((i) => i.id === modalInfo.id);
  const [arabicVariantDescription, setArabicVariantDescription] = useState();
  const [variantDescription, setVariantDescription] = useState();
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [selectedMeatOption, setSelectedMeatOption] = useState();
  const [selectedSize, setSelectedSize] = React.useState();
  const handleChangeSize = (newSize) => {
    // if item is present in cart, update the values in cart
    if (currentItem) updateItem(currentItem.id, { ...currentItem, selectedSize: newSize, selectedAddons: [] });
    setSelectedSize(newSize);
    setSelectedAddons([]);
  };
  const handleMeatOptionChange = (option) => {
    if (currentItem) updateItem(currentItem.id, { ...currentItem, selectedMeatOption: option });
    setSelectedMeatOption(option);
  }
  const handleAddonsChange = (option) => {
    if (currentItem) { // if item is present in cart, update the values in cart also
      const isPresent = currentItem.selectedAddons.find((a) => a.addOn === option.addOn);
      if (!isPresent) {
        updateItem(currentItem.id, { ...currentItem, selectedAddons: [...currentItem.selectedAddons, option] })
      } else {
        updateItem(currentItem.id, { ...currentItem, selectedAddons: currentItem.selectedAddons.filter((a) => a.addOn !== option.addOn) })
      }
    }
    // update local variables values
    const isPresent = selectedAddons.find((a) => a.addOn === option.addOn);
    if (!isPresent) {
      setSelectedAddons([...selectedAddons, option]);
    } else {
      // if already present, remove the addon
      setSelectedAddons(selectedAddons.filter((a) => a.addOn !== option.addOn));
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
        </button>
        {modalInfo?.title}
        {modalInfo?.arabicTitle}
      </ModalHeader>
      <ModalBody className="modalBody">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="imgContainer">
                <img alt="info-img" src={modalInfo?.imageURL} />
              </div>
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
                  {
                    modalInfo.variations?.map((variation) => (
                      <Switch>
                        <Case condition={Boolean(variation.sizes)}>
                          <Sizes
                            sizes={variation?.sizes || []}
                            selectedSize={currentItem?.selectedSize || selectedSize}
                            handleChangeSize={(sz) => handleChangeSize(sz)}
                            setArabicVariantDescription={setArabicVariantDescription}
                            setVariantDescription={setVariantDescription}
                          />
                        </Case>
                        <Case condition={Boolean(variation.meatOptions)}>
                          <MeatOptions
                            meatOptions={variation?.meatOptions || []}
                            selectedMeatOption={currentItem?.selectedMeatOption || selectedMeatOption}
                            handleMeatOptionChange={(op) => handleMeatOptionChange(op)}
                            setArabicVariantDescription={setArabicVariantDescription}
                            setVariantDescription={setVariantDescription}
                          />
                        </Case>
                      </Switch>
                    ))
                  }
                </div>
                {
                  modalInfo.variations?.map((variation) => (
                    variation.addOns && (
                      <Addons
                        addOns={variation?.addOns}
                        selectedAddons={currentItem?.selectedAddons || selectedAddons}
                        handleAddonsChange={handleAddonsChange}
                      />
                    )
                  ))
                }
              </div>
            </Col>
          </Row>
        </Container>
      </ModalBody>
      <ModalFooter className="modalFooter border-0 d-flex flex-row justify-content-between">
        <div className="descrptionFooter d-flex align-items-center justify-content-around">
          <When condition={Boolean(currentItem)}>
            <div className="increase-decrease-btns d-flex align-items-center justify-content-between">
              <motion.button
                whileTap={{ scale: 0.75 }}
                className="decrease__btn"
                onClick={() => decrease(currentItem?.id)}
              >
                <i className="ri-subtract-line"></i>
              </motion.button>
              <span className="counter-quantity">
                {currentItem?.qty}
              </span>
              <motion.button
                whileTap={{ scale: 0.75 }}
                className="increase__btn"
                onClick={() => {
                  increase(currentItem?.id);
                }}
              >
                <i className="ri-add-line"></i>
              </motion.button>
            </div>
          </When>
          <div className="product__price-modal">
            <If condition={currentItem?.selectedSize?.price || selectedSize?.price || selectedMeatOption?.price || currentItem?.selectedMeatOption?.price}>
              <Then>
                <span>QAR&nbsp;
                  <If condition={!currentItem}>
                    {/* If item is not present in cart show local state calculation, else show calculation according to cart */}
                    <Then>
                      {calculatePrice({
                        sizePrice: selectedSize?.price,
                        addons: selectedAddons,
                        quantity: 1,
                        meatOptionPrice: selectedMeatOption?.price
                      })}
                    </Then>
                    <Else>
                      {calculatePrice({
                        sizePrice: currentItem?.selectedSize?.price,
                        addons: currentItem?.selectedAddons,
                        meatOptionPrice: currentItem?.selectedMeatOption?.price,
                        quantity: currentItem?.qty
                      })}
                    </Else>
                  </If>
                </span>
              </Then>
              <Else>
                <small>Price on selection</small>
              </Else>
            </If>
          </div>
          <When condition={currentItem?.selectedSize?.price || selectedSize?.price || selectedMeatOption?.price || currentItem?.selectedMeatOption?.price}>
            <div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  toggleAddToCart({
                    ...modalInfo,
                    selectedAddons,
                    selectedSize,
                    selectedMeatOption,
                  });
                }}
                className={`cart_btn btn btn-primary ${currentItem ? 'active' : ''}`}
              >
                <span className="add_to_cart">Add to cart</span>
                <span className="added">Added!</span>
                <IoCartSharp className="cart-shopping" />
                <div className="dots"></div>
              </motion.button>
            </div>
          </When>
        </div>
      </ModalFooter>
    </Modal>
  );
}

export default React.memo(VariationsModal);
