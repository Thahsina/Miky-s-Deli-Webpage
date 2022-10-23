import React from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Checkbox, } from "@mui/material";
import { When, Switch, Case } from "react-if";
import { motion } from "framer-motion";
import Barista from "../../../images/barista.png";
import Server from "../../../images/server.png";
import StopWatch from "../../../images/stopwatch.png";
import FemaleServer from "../../../images/femaleServer.png";
import { FaClock } from "react-icons/fa";
import { BiMinus, BiPlus } from "react-icons/bi";

function ChoiceItem({ choice, subtitle, quantity, increment, decrement }) {
  return (
    <ul>
      <li className="d-flex justify-content-between">
        <div className="d-flex flex-column">
          <span>{choice}</span>
          <When condition={Boolean(subtitle)}>
            <small
              style={{
                fontSize: "1rem",
                fontWeight: "500",
                color: "#9196AA",
              }}
            >
              <BiPlus />
              {subtitle}QAR
            </small>
          </When>
        </div>
        <div className="counter d-flex">
          <motion.button
            whileTap={{ scale: 0.5 }}
            className="minusBtn"
            onTap={() => decrement()}
          >
            <BiMinus
              style={{ fontSize: "1rem" }}
            />
          </motion.button>
          <input
            class="counterQuantity"
            name="product-qty"
            min="0"
            max="10"
            value={quantity}
          />
          <motion.button
            whileTap={{ scale: 0.5 }}
            className="plusBtn"
            onTap={() => increment()}
          >
            <BiPlus
              style={{ fontSize: "1rem" }}
            />
          </motion.button>
        </div>
      </li>
    </ul>
  )
}

function Category({ options, totalSelectable, selectedOptions, increment, decrement }) {
  return (
    <div className="catering-modal-pastaTypes">
      <div className="mb-4">
        <strong>Burger Choices</strong>
        <span
          style={{
            color: "red",
            fontSize: "12px",
            margin: "1rem",
          }}
        >
          (select {totalSelectable} choices)
        </span>
      </div>
      {
        options?.map((eachType) => (
          <ChoiceItem
            choice={eachType}
            quantity={selectedOptions.find((op) => op.name === eachType)?.quantity || 0}
            increment={() => increment(eachType)}
            decrement={() => decrement(eachType)}
          />
        ))
      }
    </div>
  )
}

function calculatePrice({ addons, isExtraServer, serves, unitPrice }) {
  let val = 0;
  addons?.forEach((a) => {
    val += Number(a.price) * Number(a.quantity);
  });
  if (isExtraServer) val += 150;
  if (serves && unitPrice) val += Number(serves) * Number(unitPrice);
  return val;
}

const CateringModal = ({ modal, toggle, cateringModalInfo }) => {
  const [selectedOptions, setSelectedOptions] = React.useState([]);
  const [selectedAddons, setSelectedAddons] = React.useState([]);
  const [isExtraMaleServer, setExtraMaleServer] = React.useState(false);
  const [isExtraFemaleServer, setExtraFemaleServer] = React.useState(false);
  const [serves, setServes] = React.useState(0);
  const increaseOption = (optionName) => {
    // if already present, increment quantity
    const foundIndex = selectedOptions.findIndex((option) => option.name === optionName);
    if (foundIndex >= 0) {
      const foundOption = selectedOptions[foundIndex];
      setSelectedOptions([
        ...selectedOptions.slice(0, foundIndex),
        { ...foundOption, quantity: foundOption.quantity + 1 },
        ...selectedOptions.slice(foundIndex + 1),
      ])
    }
    // if 4 already selected, do not add new option
    else if (selectedOptions.length === 4) return;
    // if not already present add to array
    else setSelectedOptions([...selectedOptions, { name: optionName, quantity: 1 }]);
  }
  const decreaseOption = (optionName) => {
    // if already present, decrement quantity else do nothing
    const foundIndex = selectedOptions.findIndex((option) => option.name === optionName);
    if (foundIndex >= 0) {
      const foundOption = selectedOptions[foundIndex];
      // if quantity is already 1, remove from array
      if (foundOption.quantity <= 1) {
        setSelectedOptions(selectedOptions.filter((option) => option.name !== optionName))
      } else {
        setSelectedOptions([
          ...selectedOptions.slice(0, foundIndex),
          { ...foundOption, quantity: foundOption.quantity - 1 },
          ...selectedOptions.slice(foundIndex + 1),
        ])
      }
    }
  }
  const increaseAddon = (addon) => {
    // if already present, increment quantity
    const foundIndex = selectedAddons.findIndex((a) => a.addOn === addon.addOn);
    if (foundIndex >= 0) {
      const foundAddon = selectedAddons[foundIndex];
      setSelectedAddons([
        ...selectedAddons.slice(0, foundIndex),
        { ...foundAddon, quantity: foundAddon.quantity + 1 },
        ...selectedAddons.slice(foundIndex + 1),
      ])
    }
    // if not already present add to array
    else setSelectedAddons([...selectedAddons, { ...addon, quantity: 1 }]);
  }
  const decreaseAddon = (addon) => {
    // if already present, decrement quantity
    const foundIndex = selectedAddons.findIndex((a) => a.addOn === addon.addOn);
    if (foundIndex >= 0) {
      const foundAddon = selectedAddons[foundIndex];
      // if quantity is already 1, remove from array
      if (foundAddon.quantity <= 1) {
        setSelectedAddons(selectedAddons.filter((a) => a.addOn !== addon.addOn));
      } else {
        setSelectedAddons([
          ...selectedAddons.slice(0, foundIndex),
          { ...foundAddon, quantity: foundAddon.quantity - 1 },
          ...selectedAddons.slice(foundIndex + 1),
        ])
      }
    }
  }
  console.log({ cateringModalInfo });
  return (
    <Modal
      isOpen={modal}
      size="xl"
      toggle={toggle}
      className="catering-modal"
      style={{ cursor: "pointer" }}
    >
      <ModalHeader
        className="catering-modal-header border-0"
        toggle={toggle}
        close={<button className="close" onClick={toggle} type="button">
          &times;
        </button>}
      >
        <div>
          <h5 className="catering-modal-title">
            {cateringModalInfo.title}
          </h5>
          <small style={{ color: "#139652", fontSize: "14px" }}>
            {cateringModalInfo.category}
          </small>
        </div>
      </ModalHeader>
      <ModalBody className="catering-modal-body pt-0">
        <div className="instruction mb-2">
          <div className="row">
            <div className="col-md-12">
              <div className="catering-modal-icons mb-2">
                {cateringModalInfo.category ===
                  "Hot Coffee . Iced Coffee . Dessert" &&
                  cateringModalInfo.presentation?.map(
                    (eachItem) => (
                      <div className="d-flex flex-column">
                        <img
                          src={Barista}
                          style={{
                            width: "5rem",
                            height: "5rem",
                            margin: "1rem",
                          }}
                          alt="Barista Icon"
                        />
                        <strong className="align-self-center text-center">
                          {eachItem.barista} <span>Barista</span>
                        </strong>
                      </div>
                    )
                  )}
                {cateringModalInfo.presentation?.map((eachItem) => (
                  <div className="d-flex flex-column">
                    <img
                      src={Server}
                      style={{
                        width: "5rem",
                        height: "5rem",
                        margin: "1rem",
                      }}
                      alt="Server Icon"
                    />
                    <strong className="align-self-center text-center">
                      {eachItem.server} <span>Server</span>
                    </strong>
                  </div>
                ))}
                <div className="catering-modal-icons_setTime">
                  <div className="d-flex flex-column">
                    <FaClock
                      style={{
                        color: "#FF0000",
                        width: "4rem",
                        height: "5rem",
                        margin: "1rem",
                        fontSize: "1.3rem",
                      }}
                    />
                    <strong className="align-self-center text-center">
                      <span>Set Up Time :</span>{" "}
                      {cateringModalInfo.setupTime}
                    </strong>
                  </div>
                </div>
                <div className="catering-modal-icons_maxTime">
                  <div className="d-flex flex-column">
                    <img
                      src={StopWatch}
                      style={{
                        width: "5rem",
                        height: "5rem",
                        margin: "1rem",
                      }}
                      alt="StopWatch Icon"
                    />
                    <strong className="align-self-center text-center">
                      <span>Max Time: </span>{" "}
                      {cateringModalInfo.maxTime}
                    </strong>
                  </div>
                </div>
              </div>
              {cateringModalInfo.drinks && (
                <div className="catering-modal-drinks m-2">
                  <strong>Drinks</strong>
                  {cateringModalInfo.drinks?.map((drink) =>
                    drink.hotDrinks?.map((hotDrink) => (
                      <ul>
                        <li>
                          <span>{hotDrink}</span>
                        </li>
                      </ul>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="instruction mb-2">
          <div className="row">
            <div className="col-md-10">
              <div className="catering-modal-drinks m-2">
                <strong>Equipment</strong>
                <ul>
                  <li>
                    <span>{cateringModalInfo.requirements}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="catering-modal-notes m-2">
          <strong>Notes</strong>
          {cateringModalInfo.notesList?.map((note) => (
            <ul>
              <li>
                <span>{note.noteEnglish}</span>
              </li>
            </ul>
          ))}
        </div>
        <div className="catering-modal-options">
          <div className="options-heading d-flex">
            <h5>Options</h5>
            {cateringModalInfo.variations?.map(
              (variant) =>
                <When condition={Boolean(variant.options)}>
                  <span style={{ color: "red", fontSize: "12px" }}>
                    (select 4 choices of Cold Drinks)
                  </span>
                  <Button className="btn btn-danger">
                    Required
                  </Button>
                </When>
            )}
          </div>
          <div className="options-choices">
            {cateringModalInfo.variations?.map((variant) =>
              variant.options?.map((eachOption) => (
                <>
                  <ChoiceItem
                    choice={eachOption}
                    quantity={selectedOptions.find((op) => op.name === eachOption)?.quantity || 0}
                    increment={() => increaseOption(eachOption)}
                    decrement={() => decreaseOption(eachOption)}
                  />
                </>
              ))
            )}
            {cateringModalInfo.variations?.map(
              (variant) =>
                <When condition={Boolean(variant.pastaTypes)}>
                  <div className="catering-modal-pastaTypes">
                    <Switch>
                      <Case condition={variant.pastaTypes}>
                        <div className="mb-4">
                          <strong>Pasta Types</strong>
                          <span
                            style={{
                              color: "red",
                              fontSize: "12px",
                              margin: "1rem",
                            }}
                          >
                            (select 2 choices)
                          </span>
                        </div>
                        {
                          variant.pastaTypes?.map((eachType) => (
                            <ChoiceItem
                              choice={eachType}
                              quantity={selectedOptions.find((op) => op.name === eachType)?.quantity || 0}
                              increment={() => increaseOption(eachType)}
                              decrement={() => decreaseOption(eachType)}
                            />
                          ))
                        }
                      </Case>
                      <Case condition={variant.sauceTypes}>
                        <div className="mb-4">
                          <strong>Sauce Types</strong>
                          <span
                            style={{
                              color: "red",
                              fontSize: "12px",
                              margin: "1rem",
                            }}
                          >
                            (select 2 choices)
                          </span>
                        </div>
                        {
                          variant.sauceTypes?.map((eachType) => (
                            <ChoiceItem
                              choice={eachType}
                              quantity={selectedOptions.find((op) => op.name === eachType)?.quantity || 0}
                              increment={() => increaseOption(eachType)}
                              decrement={() => decreaseOption(eachType)}

                            />
                          ))
                        }
                      </Case>
                      <Case condition={variant.meatChoices}>
                        <div className="mb-4">
                          <strong>Choose One of</strong>
                          <span
                            style={{
                              color: "red",
                              fontSize: "12px",
                              margin: "1rem",
                            }}
                          >
                            (select 1 item)
                          </span>
                          {
                            variant.meatChoices?.map((eachType) => (
                              <ChoiceItem
                                choice={eachType}
                                quantity={selectedOptions.find((op) => op.name === eachType)?.quantity || 0}
                                increment={() => increaseOption(eachType)}
                                decrement={() => decreaseOption(eachType)}
                              />
                            ))
                          }
                        </div>
                      </Case>
                      <Case condition={variant.drinkChoices}>
                        <div className="mb-4">
                          <strong>
                            Soft Drink(7up or Sprite) with choice of
                            Flavours
                          </strong>
                          <span
                            style={{
                              color: "red",
                              fontSize: "12px",
                              margin: "1rem",
                            }}
                          >
                            (select 3 item)
                          </span>
                        </div>
                        {
                          variant.drinkChoices?.map((eachType) => (
                            <ChoiceItem
                              choice={eachType}
                              quantity={selectedOptions.find((op) => op.name === eachType)?.quantity || 0}
                              increment={() => increaseOption(eachType)}
                              decrement={() => decreaseOption(eachType)}
                            />
                          ))
                        }
                      </Case>
                    </Switch>
                  </div>
                </When>
            )}
            <When condition={cateringModalInfo.category === 'Burger Cart'}>
              <Category
                totalSelectable={30}
                options={(() => {
                  // Immediately Invoked Function Expression (IIFE)
                  let allOptions = [];
                  cateringModalInfo.variations?.forEach((variant) => {
                    if (variant.burgerOptions) allOptions = variant.burgerOptions;
                  })
                  return allOptions;
                })()}
                selectedOptions={selectedOptions}
                increment={(op) => increaseOption(op)}
                decrement={(op) => decreaseOption(op)}
              />
            </When>
            <When condition={cateringModalInfo.category === 'Rice Station'}>
              <Category
                totalSelectable={30}
                options={(() => {
                  // Immediately Invoked Function Expression (IIFE)
                  let allOptions = [];
                  cateringModalInfo.variations?.forEach((variant) => {
                    if (variant.riceOptions) allOptions = variant.riceOptions;
                  })
                  return allOptions;
                })()}
                selectedOptions={selectedOptions}
                increment={(op) => increaseOption(op)}
                decrement={(op) => decreaseOption(op)}
              />
            </When>
            <When condition={cateringModalInfo.category === 'Mix Grill'}>
              <Category
                totalSelectable={90}
                options={(() => {
                  // Immediately Invoked Function Expression (IIFE)
                  let allOptions = [];
                  cateringModalInfo.variations?.forEach((variant) => {
                    if (variant.grillOptions) allOptions = variant.grillOptions;
                  })
                  return allOptions;
                })()}
                selectedOptions={selectedOptions}
                increment={(op) => increaseOption(op)}
                decrement={(op) => decreaseOption(op)}
              />
            </When>
          </div>
        </div>
        <div className="catering-modal-addons">
          {cateringModalInfo.variations?.map(
            (variant) =>
              <When condition={Boolean(variant.addOns)}>
                <div className="addons-heading d-flex">
                  <h5>
                    Addons{" "}
                    <span
                      style={{ color: "red", fontSize: "12px" }}
                    >
                      (Add plates per tray)
                    </span>{" "}
                  </h5>
                </div>
                {
                  variant?.addOns?.map((eachAddon) => (
                    <ChoiceItem
                      choice={eachAddon.addOn}
                      subtitle={eachAddon.price}
                      quantity={selectedAddons.find((a) => a.addOn === eachAddon.addOn)?.quantity || 0}
                      increment={() => increaseAddon(eachAddon)}
                      decrement={() => decreaseAddon(eachAddon)}
                    />
                  ))
                }
              </When>
          )}
        </div>
        <div className="extraServices m-4">
          <div>
            <div className="text-center">
              <Checkbox type="checkbox" color="success" checked={isExtraMaleServer} onChange={() => setExtraMaleServer(!isExtraMaleServer)} />
              <img
                src={Server}
                style={{ width: "35px", height: "33px" }}
                alt="Server Icon"
              />
              <p>Request One Extra Server</p>
            </div>
          </div>
          <div>
            <div className="text-center">
              <Checkbox type="checkbox" color="success" checked={isExtraFemaleServer} onChange={() => setExtraFemaleServer(!isExtraFemaleServer)} />
              <img
                src={FemaleServer}
                style={{ width: "35px", height: "33px" }}
                alt="Server Icon"
              />
            </div>
            <p>Request Female Service</p>
          </div>
        </div>
      </ModalBody>
      <ModalFooter className="catering-modal-footer d-flex justify-content-around border-0 text-center">
        <div className="catering__quantityContainer">
          <div className=" d-flex align-items-center justify-content-between catering-increase__decrease-btns">
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="catering-decrease__btn"
              onClick={() => setServes((s) => s <= 0 ? 0 : s - 1)}
            >
              <BiMinus style={{ fontSize: "0.9rem" }} />
            </motion.div>
            <span className="catering-quantity">
              <span>Serves</span>
              {serves}
            </span>
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="catering-increase__btn"
              onClick={() => setServes((s) => s + 1)}
            >
              <BiPlus style={{ fontSize: "1rem" }} />
            </motion.div>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          type="button"
          className="booknowBtn"
          data-dismiss="modal"
        >
          <span>Book Now</span>
          <span>QAR {calculatePrice({
            addons: selectedAddons,
            serves,
            unitPrice: cateringModalInfo.unitPrice,
            isExtraServer: isExtraMaleServer,
          })}</span>
        </motion.button>
      </ModalFooter>
    </Modal>
  )
}

export default CateringModal