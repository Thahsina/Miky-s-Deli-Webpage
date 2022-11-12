import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Checkbox } from "@mui/material";
import { When } from "react-if";
import { motion } from "framer-motion";
import Barista from "../../../images/barista.png";
import Server from "../../../images/server.png";
import StopWatch from "../../../images/stopwatch.png";
import FemaleServer from "../../../images/femaleServer.png";
import { FaClock } from "react-icons/fa";
import { BiMinus, BiPlus } from "react-icons/bi";
import { useStateValue } from "../../../context/StateProvider";
import DateTimePicker from "./../DateTimePicker";
import { saveCateringOrder } from "../../../firebaseFunctions";

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
            <BiMinus style={{ fontSize: "1rem" }} />
          </motion.button>
          <input
            className="counterQuantity"
            name="product-qty"
            min="0"
            max="10"
            value={quantity}
            readOnly
          />
          <motion.button
            whileTap={{ scale: 0.5 }}
            className="plusBtn"
            onTap={() => increment()}
          >
            <BiPlus style={{ fontSize: "1rem" }} />
          </motion.button>
        </div>
      </li>
    </ul>
  );
}

function Category({
  options,
  title,
  totalSelectable,
  selectedOptions,
  increment,
  decrement,
}) {
  return (
    <div className="catering-modal-pastaTypes">
      <div className="mb-4">
        <strong>{title}</strong>
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
      {options?.map((eachType, idx) => (
        <ChoiceItem
          key={idx}
          choice={eachType.name}
          quantity={
            (selectedOptions || selectedOptions).find(
              (op) => op.name === eachType.name && op.type === eachType.type
            )?.quantity || 0
          }
          increment={() => increment(eachType)}
          decrement={() => decrement(eachType)}
        />
      ))}
    </div>
  );
}

function calculatePrice({
  addons,
  isExtraServer,
  serves,
  unitPrice,
  defaultPrice,
}) {
  let val = 0;
  addons?.forEach((a) => {
    val += Number(a.price) * Number(a.quantity);
  });
  if (isExtraServer) val += 150;
  if (serves && unitPrice) val += Number(serves) * Number(unitPrice);
  if (defaultPrice) val += Number(defaultPrice);
  return val;
}

const CateringModal = ({ modal, toggle, cateringModalInfo }) => {
  const { bookItem, bookedItems, deleteBookedItem, updateBookedItem } =
    useStateValue()[2];
  const [bookingId, setBookingId] = React.useState();
  const currentItem = bookedItems.find((i) => i.bookingId === bookingId);

  const [selectedOptions, setSelectedOptions] = React.useState([]);
  const [selectedAddons, setSelectedAddons] = React.useState([]);
  const [isExtraMaleServer, setExtraMaleServer] = React.useState(false);
  const [isExtraFemaleServer, setExtraFemaleServer] = React.useState(false);
  const [extraServes, setExtraServes] = React.useState(0);
  const toggleMaleServer = () => {
    // if item is already booked, update the item in booked items also
    if (currentItem) {
      updateBookedItem(currentItem?.bookingId, {
        ...currentItem,
        isExtraMaleServer: !currentItem?.isExtraMaleServer,
        // claculating total price on update
        calcPrice: calculatePrice({
          isExtraServer: !currentItem?.isExtraMaleServer,
          addons: currentItem?.selectedAddons,
          serves: currentItem?.extraServes,
          unitPrice: Number(cateringModalInfo?.unitPrice),
          defaultPrice: Number(cateringModalInfo?.price),
        }),
      });
    }
    setExtraMaleServer(!isExtraMaleServer);
  };
  const toggleFemaleServer = () => {
    // if item is already booked, update the item in booked items also
    if (currentItem) {
      updateBookedItem(currentItem?.bookingId, {
        ...currentItem,
        isExtraFemaleServer: !currentItem?.isExtraFemaleServer,
      });
    }
    setExtraFemaleServer(!isExtraFemaleServer);
  };
  const increaseExtraServe = () => {
    console.log("increasing");
    // if item is already booked, update the item in booked items also
    if (currentItem) {
      updateBookedItem(currentItem?.bookingId, {
        ...currentItem,
        extraServes:
          currentItem?.extraServes >= 9 ? 9 : currentItem?.extraServes + 1,
        // claculating total price on update
        calcPrice: calculatePrice({
          isExtraServer: currentItem?.isExtraMaleServer,
          addons: currentItem?.selectedAddons,
          serves:
            currentItem?.extraServes >= 9 ? 9 : currentItem?.extraServes + 1,
          unitPrice: Number(cateringModalInfo?.unitPrice),
          defaultPrice: Number(cateringModalInfo?.price),
        }),
      });
    }
    setExtraServes((s) => (s >= 9 ? 9 : s + 1));
  };
  const decreaseExtraServe = () => {
    // if item is already booked, update the item in booked items also
    if (currentItem) {
      updateBookedItem(currentItem?.bookingId, {
        ...currentItem,
        extraServes:
          currentItem?.extraServes <= 0 ? 0 : currentItem?.extraServes - 1,
        // claculating total price on update
        calcPrice: calculatePrice({
          isExtraServer: currentItem?.isExtraMaleServer,
          addons: currentItem?.selectedAddons,
          serves:
            currentItem?.extraServes <= 0 ? 0 : currentItem?.extraServes - 1,
          unitPrice: Number(cateringModalInfo?.unitPrice),
          defaultPrice: Number(cateringModalInfo?.price),
        }),
      });
    }
    setExtraServes((s) => (s <= 0 ? 0 : s - 1));
  };
  const increaseOption = ({ name, type }) => {
    // if item is already booked, update the item in booked items also
    if (currentItem) {
      // getting maxChoice of option type
      const typeMaxChoices =
        currentItem?.variations.find((variant) => variant[type])?.maxChoice ||
        0;
      const totalSelectedQuantityOfCurrentType = currentItem?.selectedOptions
        .filter((op) => op.type === type) // filtering out current type options
        .map((op) => op.quantity) // getting only selected quantities
        .reduce((sum, current) => (sum += current), 0); // summing up all the quantities
      // if already present, increment quantity
      const foundIndex = currentItem?.selectedOptions.findIndex(
        (option) => option.name === name && option.type === type
      );
      if (foundIndex >= 0) {
        const foundOption = currentItem?.selectedOptions[foundIndex];
        // incrementing quantity according to the maxChoice of option type
        // if quantity is greater than max choices, do nothing,
        // or if total selected options of a current type are greater in quantity than typeMaxChoice
        if (
          foundOption.quantity < typeMaxChoices ||
          totalSelectedQuantityOfCurrentType < typeMaxChoices
        ) {
          const newOptions = [
            ...currentItem?.selectedOptions.slice(0, foundIndex),
            { ...foundOption, quantity: foundOption.quantity + 1 },
            ...currentItem?.selectedOptions.slice(foundIndex + 1),
          ];
          updateBookedItem(currentItem?.bookingId, {
            ...currentItem,
            selectedOptions: newOptions,
          });
        }
      }
      // or if total selected options of a current type are less in quantity than typeMaxChoice proceed ahead
      else if (totalSelectedQuantityOfCurrentType < typeMaxChoices) {
        // if not already present add to array
        const newOptions = [
          ...currentItem?.selectedOptions,
          { name, type, quantity: 1 },
        ];
        updateBookedItem(currentItem?.bookingId, {
          ...currentItem,
          selectedOptions: newOptions,
        });
      }
    }
    // getting maxChoice of option type
    const typeMaxChoices =
      cateringModalInfo.variations.find((variant) => variant[type])
        ?.maxChoice || 0;
    const totalSelectedQuantityOfCurrentType = selectedOptions
      .filter((op) => op.type === type) // filtering out current type options
      .map((op) => op.quantity) // getting only selected quantities
      .reduce((sum, current) => (sum += current), 0); // summing up all the quantities
    // if already present, increment quantity
    const foundIndex = selectedOptions.findIndex(
      (option) => option.name === name && option.type === type
    );
    if (foundIndex >= 0) {
      const foundOption = selectedOptions[foundIndex];
      // incrementing quantity according to the maxChoice of option type
      // if quantity is greater than max choices, do nothing,
      // or if total selected options of a current type are greater in quantity than typeMaxChoice
      if (
        foundOption.quantity >= typeMaxChoices ||
        totalSelectedQuantityOfCurrentType >= typeMaxChoices
      )
        return;
      setSelectedOptions([
        ...selectedOptions.slice(0, foundIndex),
        { ...foundOption, quantity: foundOption.quantity + 1 },
        ...selectedOptions.slice(foundIndex + 1),
      ]);
    }
    // or if total selected options of a current type are less in quantity than typeMaxChoice proceed ahead
    else if (totalSelectedQuantityOfCurrentType < typeMaxChoices) {
      // if not already present add to array
      setSelectedOptions([...selectedOptions, { name, type, quantity: 1 }]);
    }
  };
  const decreaseOption = ({ name, type }) => {
    // if item is present in booked items, update it there also
    if (currentItem) {
      // if already present, decrement quantity else do nothing
      const foundIndex = currentItem?.selectedOptions.findIndex(
        (option) => option.name === name && option.type === type
      );
      if (foundIndex >= 0) {
        const foundOption = currentItem?.selectedOptions[foundIndex];
        // if quantity is already 1, remove from array
        if (foundOption.quantity <= 1) {
          updateBookedItem(currentItem?.bookingId, {
            ...currentItem,
            selectedOptions: currentItem?.selectedOptions.filter(
              (option) => !(option.name === name && option.type === type)
            ),
          });
        } else {
          const newOptions = [
            ...currentItem?.selectedOptions.slice(0, foundIndex),
            { ...foundOption, quantity: foundOption.quantity - 1 },
            ...currentItem?.selectedOptions.slice(foundIndex + 1),
          ];
          updateBookedItem(currentItem?.bookingId, {
            ...currentItem,
            selectedOptions: newOptions,
          });
        }
      }
    }
    // if already present, decrement quantity else do nothing
    const foundIndex = selectedOptions.findIndex(
      (option) => option.name === name && option.type === type
    );
    if (foundIndex >= 0) {
      const foundOption = selectedOptions[foundIndex];
      // if quantity is already 1, remove from array
      if (foundOption.quantity <= 1) {
        setSelectedOptions(
          selectedOptions.filter(
            (option) => !(option.name === name && option.type === type)
          )
        );
      } else {
        setSelectedOptions([
          ...selectedOptions.slice(0, foundIndex),
          { ...foundOption, quantity: foundOption.quantity - 1 },
          ...selectedOptions.slice(foundIndex + 1),
        ]);
      }
    }
  };
  if (currentItem?.selectedOptions.length === 0) {
    // if options are decreased to zero, delete the item from booking
    deleteBookedItem(currentItem?.bookingId);
    setBookingId(null);
  }
  const increaseAddon = (addon) => {
    // if item is already is present in bookedItems, update it there also
    if (currentItem) {
      // if 10 already selected, do nothing
      if (currentItem?.selectedAddons.length > 0) {
        const totalQty = currentItem?.selectedAddons
          .map((a) => a.quantity)
          .reduce((sum, current) => (sum += current));
        if (totalQty < 10) {
          // if already present, increment quantity
          const foundIndex = currentItem?.selectedAddons.findIndex(
            (a) => a.addOn === addon.addOn
          );
          if (foundIndex >= 0) {
            const foundAddon = currentItem?.selectedAddons[foundIndex];
            const newAddons = [
              ...currentItem?.selectedAddons.slice(0, foundIndex),
              { ...foundAddon, quantity: foundAddon.quantity + 1 },
              ...currentItem?.selectedAddons.slice(foundIndex + 1),
            ];
            updateBookedItem(currentItem?.bookingId, {
              ...currentItem,
              selectedAddons: newAddons,
              // claculating total price on update
              calcPrice: calculatePrice({
                isExtraServer: currentItem?.isExtraMaleServer,
                addons: newAddons,
                serves: currentItem?.extraServes,
                unitPrice: Number(cateringModalInfo?.unitPrice),
                defaultPrice: Number(cateringModalInfo?.price),
              }),
            });
          }
        }
      }
    }
    // if 10 already selected, do nothing
    if (selectedAddons.length > 0) {
      const totalQty = selectedAddons
        .map((a) => a.quantity)
        .reduce((sum, current) => (sum += current));
      if (totalQty >= 10) return;
    }
    // if already present, increment quantity
    const foundIndex = selectedAddons.findIndex((a) => a.addOn === addon.addOn);
    if (foundIndex >= 0) {
      const foundAddon = selectedAddons[foundIndex];
      setSelectedAddons([
        ...selectedAddons.slice(0, foundIndex),
        { ...foundAddon, quantity: foundAddon.quantity + 1 },
        ...selectedAddons.slice(foundIndex + 1),
      ]);
    }
    // if not already present add to array
    else setSelectedAddons([...selectedAddons, { ...addon, quantity: 1 }]);
  };
  const decreaseAddon = (addon) => {
    // if item is already present in bookedItems, update it there also
    if (currentItem) {
      // if already present, decrement quantity
      const foundIndex = currentItem?.selectedAddons.findIndex(
        (a) => a.addOn === addon.addOn
      );
      if (foundIndex >= 0) {
        const foundAddon = currentItem?.selectedAddons[foundIndex];
        // if quantity is already 1, remove from array
        let newAddons = [];
        if (foundAddon.quantity <= 1) {
          newAddons = currentItem?.selectedAddons.filter(
            (a) => a.addOn !== addon.addOn
          );
        } else {
          newAddons = [
            ...currentItem?.selectedAddons.slice(0, foundIndex),
            { ...foundAddon, quantity: foundAddon.quantity - 1 },
            ...currentItem?.selectedAddons.slice(foundIndex + 1),
          ];
        }
        updateBookedItem(currentItem?.bookingId, {
          ...currentItem,
          selectedAddons: newAddons,
          // claculating total price on update
          calcPrice: calculatePrice({
            isExtraServer: currentItem?.isExtraMaleServer,
            addons: newAddons,
            serves: currentItem?.extraServes,
            unitPrice: Number(cateringModalInfo?.unitPrice),
            defaultPrice: Number(cateringModalInfo?.price),
          }),
        });
      }
    }
    // if already present, decrement quantity
    const foundIndex = selectedAddons.findIndex((a) => a.addOn === addon.addOn);
    if (foundIndex >= 0) {
      const foundAddon = selectedAddons[foundIndex];
      // if quantity is already 1, remove from array
      if (foundAddon.quantity <= 1) {
        setSelectedAddons(
          selectedAddons.filter((a) => a.addOn !== addon.addOn)
        );
      } else {
        setSelectedAddons([
          ...selectedAddons.slice(0, foundIndex),
          { ...foundAddon, quantity: foundAddon.quantity - 1 },
          ...selectedAddons.slice(foundIndex + 1),
        ]);
      }
    }
  };
  // console.log({ cateringModalInfo, currentItem, bookedItems });
  const [{ user }] = useStateValue();
  const [bookNowModal, setBookNowModal] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [dateAndTime, setDateAndTime] = useState({});
  const bookNowToggle = () => setBookNowModal(!bookNowModal);
  const confirmationToggle = () => {
    setConfirmationModal(!confirmationModal);
  };

  const saveCateringOrderDetails = () => {
    const cateringOrderData = {
      user_id: `${user.uid}`,
      orderDateTime: dateAndTime?.toString(),
      cateringOrder: bookedItems,
      id: `${Date.now()}`,
      orderNumber: `${Math.floor(100000 + Math.random() * 900000)}`,
    };

    saveCateringOrder(cateringOrderData);
  };

  return (
    <>
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
          close={
            <button className="close" onClick={toggle} type="button">
              &times;
            </button>
          }
        >
          <div>
            <h5 className="catering-modal-title">{cateringModalInfo.title}</h5>
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
                    cateringModalInfo.presentation?.map((eachItem, idx) => (
                      <div className="d-flex flex-column" key={idx}>
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
                    ))}
                  {cateringModalInfo.presentation?.map((eachItem, idx) => (
                    <div className="d-flex flex-column" key={idx}>
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
                        <span>Set Up Time :</span> {cateringModalInfo.setupTime}
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
                        <span>Max Time: </span> {cateringModalInfo.maxTime}
                      </strong>
                    </div>
                  </div>
                </div>
                {cateringModalInfo.drinks && (
                  <div className="catering-modal-drinks m-2">
                    <strong>Drinks</strong>
                    {cateringModalInfo.drinks?.map((drink) =>
                      drink.hotDrinks?.map((hotDrink, idx) => (
                        <ul key={idx}>
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
            {cateringModalInfo.notesList?.map((note, idx) => (
              <ul key={idx}>
                <li>
                  <span>{note.noteEnglish}</span>
                </li>
              </ul>
            ))}
          </div>
          <div className="catering-modal-options">
            <div className="options-heading d-flex">
              <h5>Options</h5>
              {cateringModalInfo.variations?.map((variant, idx) => (
                <When condition={Boolean(variant.options)} key={idx}>
                  <span style={{ color: "red", fontSize: "12px" }}>
                    (select 4 choices of Cold Drinks)
                  </span>
                </When>
              ))}
              <Button className="btn btn-danger">Required</Button>
            </div>
            <div className="options-choices">
              {cateringModalInfo.variations?.map((variant) =>
                variant.options?.map((eachOption, idx) => (
                  <ChoiceItem
                    key={idx}
                    choice={eachOption}
                    quantity={
                      (currentItem?.selectedOptions || selectedOptions).find(
                        (op) => op.name === eachOption && op.type === "options"
                      )?.quantity || 0
                    }
                    increment={() =>
                      increaseOption({ name: eachOption, type: "options" })
                    }
                    decrement={() =>
                      decreaseOption({ name: eachOption, type: "options" })
                    }
                  />
                ))
              )}
              {cateringModalInfo.variations?.map((variant, idx) => (
                <>
                  <When condition={Boolean(variant.pastaTypes)} key={idx}>
                    {cateringModalInfo.variations?.map((variant, idx) => (
                      <div className="catering-modal-pastaTypes">
                        <When condition={variant.pastaTypes}>
                          <div className="mb-4">
                            <strong>Pasta Types</strong>
                            <span
                              style={{
                                color: "red",
                                fontSize: "12px",
                                margin: "1rem",
                              }}
                            >
                              (select {variant.maxChoice} items)
                            </span>
                          </div>
                          {variant.pastaTypes?.map((eachType, idx) => (
                            <ChoiceItem
                              key={idx}
                              choice={eachType}
                              quantity={
                                (
                                  currentItem?.selectedOptions ||
                                  selectedOptions
                                ).find(
                                  (op) =>
                                    op.name === eachType &&
                                    op.type === "pastaTypes"
                                )?.quantity || 0
                              }
                              increment={() =>
                                increaseOption({
                                  name: eachType,
                                  type: "pastaTypes",
                                })
                              }
                              decrement={() =>
                                decreaseOption({
                                  name: eachType,
                                  type: "pastaTypes",
                                })
                              }
                            />
                          ))}
                        </When>
                        <When condition={variant.sauceTypes}>
                          <div className="mb-4">
                            <strong>Sauce Types</strong>
                            <span
                              style={{
                                color: "red",
                                fontSize: "12px",
                                margin: "1rem",
                              }}
                            >
                              (select {variant.maxChoice} item)
                            </span>
                          </div>
                          {variant.sauceTypes?.map((eachType, idx) => (
                            <ChoiceItem
                              key={idx}
                              choice={eachType}
                              quantity={
                                (
                                  currentItem?.selectedOptions ||
                                  selectedOptions
                                ).find(
                                  (op) =>
                                    op.name === eachType &&
                                    op.type === "sauceTypes"
                                )?.quantity || 0
                              }
                              increment={() =>
                                increaseOption({
                                  name: eachType,
                                  type: "sauceTypes",
                                })
                              }
                              decrement={() =>
                                decreaseOption({
                                  name: eachType,
                                  type: "sauceTypes",
                                })
                              }
                            />
                          ))}
                        </When>
                        <When condition={Boolean(variant.meatChoices)}>
                          <div className="mb-4">
                            <strong>Meat Options</strong>
                            <span
                              style={{
                                color: "red",
                                fontSize: "12px",
                                margin: "1rem",
                              }}
                            >
                              (select {variant.maxChoice} item)
                            </span>
                            {variant.meatChoices?.map((eachType, idx) => (
                              <ChoiceItem
                                key={idx}
                                choice={eachType}
                                quantity={
                                  (
                                    currentItem?.selectedOptions ||
                                    selectedOptions
                                  ).find(
                                    (op) =>
                                      op.name === eachType &&
                                      op.type === "meatChoices"
                                  )?.quantity || 0
                                }
                                increment={() =>
                                  increaseOption({
                                    name: eachType,
                                    type: "meatChoices",
                                  })
                                }
                                decrement={() =>
                                  decreaseOption({
                                    name: eachType,
                                    type: "meatChoices",
                                  })
                                }
                              />
                            ))}
                          </div>
                        </When>
                        <When condition={Boolean(variant.drinkChoices)}>
                          <div className="mb-4">
                            <strong>
                              Soft Drink(7up or Sprite) with choice of Flavours
                            </strong>
                            <span
                              style={{
                                color: "red",
                                fontSize: "12px",
                                margin: "1rem",
                              }}
                            >
                              (select {variant.maxChoice} item)
                            </span>
                          </div>
                          {variant.drinkChoices?.map((eachType, idx) => (
                            <ChoiceItem
                              key={idx}
                              choice={eachType}
                              quantity={
                                (
                                  currentItem?.selectedOptions ||
                                  selectedOptions
                                ).find(
                                  (op) =>
                                    op.name === eachType &&
                                    op.type === "drinkChoices"
                                )?.quantity || 0
                              }
                              increment={() =>
                                increaseOption({
                                  name: eachType,
                                  type: "drinkChoices",
                                })
                              }
                              decrement={() =>
                                decreaseOption({
                                  name: eachType,
                                  type: "drinkChoices",
                                })
                              }
                            />
                          ))}
                        </When>
                      </div>
                    ))}
                  </When>
                </>
              ))}
              <When condition={cateringModalInfo.category === "Burger Cart"}>
                <Category
                  title={"Burger Choices"}
                  totalSelectable={30}
                  options={(() => {
                    // Immediately Invoked Function Expression (IIFE)
                    let allOptions = [];
                    cateringModalInfo.variations?.forEach((variant) => {
                      if (variant.burgerOptions)
                        allOptions = variant.burgerOptions.map((op) => ({
                          name: op,
                          type: "burgerOptions",
                        }));
                    });
                    return allOptions;
                  })()}
                  selectedOptions={
                    currentItem?.selectedOptions || selectedOptions
                  }
                  increment={(op) => increaseOption(op)}
                  decrement={(op) => decreaseOption(op)}
                />
              </When>
              <When condition={cateringModalInfo.category === "Rice Station"}>
                <Category
                  title={"Rice Choices"}
                  totalSelectable={30}
                  options={(() => {
                    // Immediately Invoked Function Expression (IIFE)
                    let allOptions = [];
                    cateringModalInfo.variations?.forEach((variant) => {
                      if (variant.riceOptions)
                        allOptions = variant.riceOptions.map((op) => ({
                          name: op,
                          type: "riceOptions",
                        }));
                    });
                    return allOptions;
                  })()}
                  selectedOptions={
                    currentItem?.selectedOptions || selectedOptions
                  }
                  increment={(op) => increaseOption(op)}
                  decrement={(op) => decreaseOption(op)}
                />
              </When>
              <When condition={cateringModalInfo.category === "Mix Grill"}>
                <Category
                  title={"Mix Grill Choices"}
                  totalSelectable={90}
                  options={(() => {
                    // Immediately Invoked Function Expression (IIFE)
                    let allOptions = [];
                    cateringModalInfo.variations?.forEach((variant) => {
                      if (variant.grillOptions)
                        allOptions = variant.grillOptions.map((op) => ({
                          name: op,
                          type: "grillOptions",
                        }));
                    });
                    return allOptions;
                  })()}
                  selectedOptions={
                    currentItem?.selectedOptions || selectedOptions
                  }
                  increment={(op) => increaseOption(op)}
                  decrement={(op) => decreaseOption(op)}
                />
              </When>
            </div>
          </div>
          <div className="catering-modal-addons">
            {cateringModalInfo.variations?.map((variant, idx) => (
              <When condition={Boolean(variant.addOns)} key={idx}>
                <div className="addons-heading d-flex">
                  <h5>
                    Addons{" "}
                    <span style={{ color: "red", fontSize: "12px" }}>
                      (Add plates per tray)
                    </span>{" "}
                  </h5>
                </div>
                {variant?.addOns?.map((eachAddon, idx) => (
                  <ChoiceItem
                    key={idx}
                    choice={eachAddon.addOn}
                    subtitle={eachAddon.price}
                    quantity={
                      (currentItem?.selectedAddons || selectedAddons).find(
                        (a) => a.addOn === eachAddon.addOn
                      )?.quantity || 0
                    }
                    increment={() => increaseAddon(eachAddon)}
                    decrement={() => decreaseAddon(eachAddon)}
                  />
                ))}
              </When>
            ))}
          </div>
          <div className="extraServices m-4">
            <div>
              <div className="text-center">
                <Checkbox
                  type="checkbox"
                  color="success"
                  checked={currentItem?.isExtraMaleServer || isExtraMaleServer}
                  onChange={() => toggleMaleServer()}
                />
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
                <Checkbox
                  type="checkbox"
                  color="success"
                  checked={
                    currentItem?.isExtraFemaleServer || isExtraFemaleServer
                  }
                  onChange={() => toggleFemaleServer()}
                />
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
                onClick={() => decreaseExtraServe()}
              >
                <BiMinus style={{ fontSize: "0.9rem" }} />
              </motion.div>
              <span className="catering-quantity">
                <span>Serves</span>
                {Number(extraServes) + Number(cateringModalInfo.serveQty)}
              </span>
              <motion.div
                whileTap={{ scale: 0.75 }}
                className="catering-increase__btn"
                onClick={() => increaseExtraServe()}
              >
                <BiPlus style={{ fontSize: "1rem" }} />
              </motion.div>
            </div>
          </div>
          <Button
            color="primary"
            type="button"
            className="booknowBtn"
            data-dismiss="modal"
            // disabled={selectedOptions.length === 0}
            disabled={
              selectedOptions.length === 0 && cateringModalInfo.hasOptions
            }
            onClick={() => {
              if (currentItem) {
                deleteBookedItem(bookingId);
              } else {
                const id = bookItem({
                  ...cateringModalInfo,
                  selectedAddons,
                  selectedOptions,
                  isExtraFemaleServer,
                  isExtraMaleServer,
                  extraServes,
                  // claculating total price on update
                  calcPrice: calculatePrice({
                    addons: selectedAddons,
                    serves: extraServes,
                    unitPrice: cateringModalInfo.unitPrice,
                    isExtraServer: isExtraMaleServer,
                    defaultPrice: cateringModalInfo.price,
                  }),
                });
                setBookingId(id);
              }
              bookNowToggle();
            }}
          >
            <span>Book Now</span>
            <span>
              QAR{" "}
              {calculatePrice({
                addons: currentItem?.selectedAddons || selectedAddons,
                serves: currentItem?.extraServes || extraServes,
                unitPrice: cateringModalInfo.unitPrice,
                isExtraServer:
                  currentItem?.isExtraMaleServer || isExtraMaleServer,
                defaultPrice: cateringModalInfo.price,
              })}
            </span>
          </Button>
        </ModalFooter>
      </Modal>
      <Modal
        isOpen={bookNowModal}
        // size="md"
        toggle={bookNowToggle}
        // keyboard="false"
        // backdrop="static"
        className="bookNowModal"
        style={{ cursor: "pointer", padding: "1rem" }}
      >
        <ModalHeader toggle={bookNowToggle}>
          When do you want to book this order ?
        </ModalHeader>
        <ModalBody className="dateTimePicker__container">
          <DateTimePicker setDateAndTime={setDateAndTime} disablePast />

          <Button
            color="success"
            className="m-4"
            onClick={() => {
              bookNowToggle();
              confirmationToggle();
              saveCateringOrderDetails();
            }}
          >
            Confirm !
          </Button>
        </ModalBody>
      </Modal>

      <Modal
        isOpen={confirmationModal}
        toggle={confirmationToggle}
        style={{ cursor: "pointer", padding: "1rem" }}
      >
        <ModalBody className="dateTimePicker__container">
          Your order for catering service is confirmed on{" "}
          <h4>{dateAndTime?.toString()}</h4>
          {/* <h4>Fri 23 June 2022 4:30pm</h4> */}
        </ModalBody>
      </Modal>
    </>
  );
};

export default CateringModal;
