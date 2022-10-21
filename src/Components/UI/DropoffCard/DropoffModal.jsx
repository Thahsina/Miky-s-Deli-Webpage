import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { motion } from "framer-motion";
import { BiMinus, BiPlus } from "react-icons/bi";
import { When } from "react-if";

function ChoiceItem({ choice, subtitle }) {
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
            value="0"
          />
          <motion.button
            whileTap={{ scale: 0.5 }}
            className="plusBtn"
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

export default function DropoffModal({ modal, toggle, cateringModalInfo }) {
  console.log({ cateringModalInfo })
  return (
    <Modal
      isOpen={modal}
      size="xl"
      toggle={toggle}
      className="catering-modal"
      style={{ cursor: "pointer" }}
    >
      <ModalHeader
        className="border-0"
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
              {cateringModalInfo.foodTypes && (
                <div className="catering-modal-drinks m-2">
                  <strong>Drinks</strong>
                  {cateringModalInfo.foodTypes?.map(
                    (foodType) => (
                      <ul>
                        <li>
                          <span>{foodType}</span>
                        </li>
                      </ul>
                    )
                  )}
                </div>
              )}
              {cateringModalInfo.drinkFlavours && (
                <div className="catering-modal-drinks m-2">
                  <strong>Drinks</strong>
                  {cateringModalInfo.drinkFlavours?.map(
                    (drinkFlavour) => (
                      <ul>
                        <li>
                          <span>{drinkFlavour}</span>
                        </li>
                      </ul>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="catering-modal-options">
          <div className="options-heading d-flex">
            <h5>Options</h5>
          </div>
          <div className="options-choices">
            {cateringModalInfo.variations?.map(
              (variant) =>
                variant.pastaTypes && (
                  <div className="catering-modal-pastaTypes">
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
                    {cateringModalInfo.variations?.map((variant) =>
                      variant.pastaTypes?.map((eachType) => (
                        <ChoiceItem choice={eachType} />
                      ))
                    )}
                    <div className="mb-4">
                      <strong>Choose one of</strong>
                      <span
                        style={{
                          color: "red",
                          fontSize: "12px",
                          margin: "1rem",
                        }}
                      >
                        (select 1 choices)
                      </span>
                    </div>
                    {cateringModalInfo.variations?.map((variant) =>
                      variant.meatChoices?.map((eachChoice) => (
                        <ChoiceItem choice={eachChoice} />
                      ))
                    )}
                  </div>
                )
            )}
            {cateringModalInfo.variations?.map(
              (variant) =>
                variant.burgerOptions && (
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
                        (select 10 choices)
                      </span>
                    </div>
                    {cateringModalInfo.variations?.map((variant) =>
                      variant.burgerOptions?.map((eachType) => (
                        <ChoiceItem choice={eachType} />
                      ))
                    )}
                  </div>
                )
            )}
            {cateringModalInfo.variations?.map(
              (variant) =>
                variant.pizzaTypes && (
                  <div className="catering-modal-pastaTypes">
                    <div className="mb-4">
                      <strong>Pizza Types</strong>
                      <span
                        style={{
                          color: "red",
                          fontSize: "12px",
                          margin: "1rem",
                        }}
                      >
                        (select 10 choices)
                      </span>
                    </div>
                    {cateringModalInfo.variations?.map((variant) =>
                      variant.pizzaTypes?.map((eachType) => (
                        <ChoiceItem choice={eachType} />
                      ))
                    )}
                  </div>
                )
            )}
            {cateringModalInfo.variations?.map(
              (variant) =>
                variant.riceTypes && (
                  <div className="catering-modal-pastaTypes">
                    <div className="mb-4">
                      <strong>Rice Choices</strong>
                      <span
                        style={{
                          color: "red",
                          fontSize: "12px",
                          margin: "1rem",
                        }}
                      >
                        (select 30 choices)
                      </span>
                    </div>
                    {cateringModalInfo.variations?.map((variant) =>
                      variant.riceTypes?.map((eachType) => (
                        <ChoiceItem choice={eachType} />
                      ))
                    )}
                  </div>
                )
            )}
          </div>
        </div>
        {/* Addons Section */}
        <div className="catering-modal-addons">
          {cateringModalInfo.variations?.map(
            (variant) =>
              variant.addOns && (
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
              )
          )}
          <div className="addons-choices">
            {cateringModalInfo.variations?.map((variant) =>
              variant.addOns?.map((eachAddon) => (
                <ChoiceItem choice={eachAddon.addOn} subtitle={eachAddon.price} />
              ))
            )}
            {cateringModalInfo.variations?.map(
              (variant) =>
                variant.drinkAddons && (
                  <div className="catering-modal-pastaTypes mt-4">
                    <div className="mb-4">
                      <h6 style={{ color: "#139652" }}>
                        Reb Bull with Falvours
                      </h6>
                    </div>
                    {cateringModalInfo.variations?.map((variant) =>
                      variant.drinkAddons?.map((eachAddon) => (
                        <ChoiceItem choice={eachAddon.drinkAddon} subtitle={eachAddon.price} />
                      ))
                    )}
                  </div>
                )
            )}
          </div>
        </div>
        <ModalFooter className="catering-modal-footer d-flex justify-content-around border-0 text-center">
          <motion.button
            whileTap={{ scale: 0.9 }}
            type="button"
            className="booknowBtn"
            data-dismiss="modal"
          >
            <span>Book Now</span>
            <span>QAR {cateringModalInfo.price}</span>
          </motion.button>
        </ModalFooter>
      </ModalBody>
    </Modal>
  )
}