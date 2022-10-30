import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { motion } from 'framer-motion';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { When } from 'react-if';
import { useStateValue } from '../../../context/StateProvider';

function ChoiceItem({ choice, subtitle, quantity, increment, decrement }) {
  return (
    <ul>
      <li className="d-flex justify-content-between">
        <div className="d-flex flex-column">
          <span>{choice}</span>
          <When condition={Boolean(subtitle)}>
            <small
              style={{
                fontSize: '1rem',
                fontWeight: '500',
                color: '#9196AA',
              }}
            >
              <BiPlus />
              {subtitle}QAR
            </small>
          </When>
        </div>
        <div className="counter d-flex">
          <motion.button whileTap={{ scale: 0.5 }} className="minusBtn" onTap={() => decrement()}>
            <BiMinus style={{ fontSize: '1rem' }} />
          </motion.button>
          <input
            class="counterQuantity"
            name="product-qty"
            min="0"
            max="10"
            value={quantity}
            readOnly
          />
          <motion.button whileTap={{ scale: 0.5 }} className="plusBtn" onTap={() => increment()}>
            <BiPlus style={{ fontSize: '1rem' }} />
          </motion.button>
        </div>
      </li>
    </ul>
  );
}

function calculatePrice({ addons, drinkAddons, defaultPrice }) {
  let val = 0;
  addons?.forEach((a) => {
    val += Number(a.price) * Number(a.quantity);
  });
  drinkAddons?.forEach((a) => {
    val += Number(a.price) * Number(a.quantity);
  });
  if (defaultPrice) val += Number(defaultPrice);
  return val;
}

export default function DropoffModal({ modal, toggle, cateringModalInfo }) {
  const { bookItem } = useStateValue()[2];

  const [selectedAddons, setSelectedAddons] = React.useState([]);
  const [selectedDrinkAddons, setSelectedDrinkAddons] = React.useState([]);
  const [selectedOptions, setSelectedOptions] = React.useState([]);

  const increaseOption = ({ name, type }) => {
    // getting maxChoice of option type
    const typeMaxChoices =
      cateringModalInfo.variations.find((variant) => variant[type])?.maxChoice || 10;
    const totalSelectedQuantityOfCurrentType = selectedOptions
      .filter((op) => op.type === type) // filtering out current type options
      .map((op) => op.quantity) // getting only selected quantities
      .reduce((sum, current) => (sum += current), 0); // summing up all the quantities
    // if already present, increment quantity
    const foundIndex = selectedOptions.findIndex(
      (option) => option.name === name && option.type === type,
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
    // if already present, decrement quantity else do nothing
    const foundIndex = selectedOptions.findIndex(
      (option) => option.name === name && option.type === type,
    );
    if (foundIndex >= 0) {
      const foundOption = selectedOptions[foundIndex];
      // if quantity is already 1, remove from array
      if (foundOption.quantity <= 1) {
        setSelectedOptions(
          selectedOptions.filter((option) => !(option.name === name && option.type === type)),
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

  const increaseAddon = (addon) => {
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
        ]);
      }
    }
  };

  const increaseDrinkAddon = (addon) => {
    // if 10 already selected, do nothing
    if (selectedDrinkAddons.length > 0) {
      const totalQty = selectedDrinkAddons
        .map((a) => a.quantity)
        .reduce((sum, current) => (sum += current));
      if (totalQty >= 10) return;
    }
    // if already present, increment quantity
    const foundIndex = selectedDrinkAddons.findIndex((a) => a.drinkAddon === addon.drinkAddon);
    if (foundIndex >= 0) {
      const foundAddon = selectedDrinkAddons[foundIndex];
      setSelectedDrinkAddons([
        ...selectedDrinkAddons.slice(0, foundIndex),
        { ...foundAddon, quantity: foundAddon.quantity + 1 },
        ...selectedDrinkAddons.slice(foundIndex + 1),
      ]);
    }
    // if not already present add to array
    else setSelectedDrinkAddons([...selectedDrinkAddons, { ...addon, quantity: 1 }]);
  };
  const decreaseDrinkAddon = (addon) => {
    // if already present, decrement quantity
    const foundIndex = selectedDrinkAddons.findIndex((a) => a.drinkAddon === addon.drinkAddon);
    if (foundIndex >= 0) {
      const foundAddon = selectedDrinkAddons[foundIndex];
      // if quantity is already 1, remove from array
      if (foundAddon.quantity <= 1) {
        setSelectedDrinkAddons(
          selectedDrinkAddons.filter((a) => a.drinkAddon !== addon.drinkAddon),
        );
      } else {
        setSelectedDrinkAddons([
          ...selectedDrinkAddons.slice(0, foundIndex),
          { ...foundAddon, quantity: foundAddon.quantity - 1 },
          ...selectedDrinkAddons.slice(foundIndex + 1),
        ]);
      }
    }
  };
  return (
    <Modal
      isOpen={modal}
      size="xl"
      toggle={toggle}
      className="catering-modal"
      style={{ cursor: 'pointer' }}
    >
      <ModalHeader
        className="border-0"
        toggle={toggle}
        close={
          <button className="close" onClick={toggle} type="button">
            &times;
          </button>
        }
      >
        <div>
          <h5 className="catering-modal-title">{cateringModalInfo.title}</h5>
          <small style={{ color: '#139652', fontSize: '14px' }}>{cateringModalInfo.category}</small>
        </div>
      </ModalHeader>
      <ModalBody className="catering-modal-body pt-0">
        <div className="instruction mb-2">
          <div className="row">
            <div className="col-md-12">
              {cateringModalInfo.foodTypes && (
                <div className="catering-modal-drinks m-2">
                  <strong>Drinks</strong>
                  {cateringModalInfo.foodTypes?.map((foodType, idx) => (
                    <ul key={idx}>
                      <li>
                        <span>{foodType}</span>
                      </li>
                    </ul>
                  ))}
                </div>
              )}
              {cateringModalInfo.drinkFlavours && (
                <div className="catering-modal-drinks m-2">
                  <strong>Drinks</strong>
                  {cateringModalInfo.drinkFlavours?.map((drinkFlavour, idx) => (
                    <ul key={idx}>
                      <li>
                        <span>{drinkFlavour}</span>
                      </li>
                    </ul>
                  ))}
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
              (variant, idx) =>
                variant.pastaTypes && (
                  <div key={idx} className="catering-modal-pastaTypes">
                    <div className="mb-4">
                      <strong>Pasta Types</strong>
                      <span
                        style={{
                          color: 'red',
                          fontSize: '12px',
                          margin: '1rem',
                        }}
                      >
                        (select 10 choices)
                      </span>
                    </div>
                    {cateringModalInfo.variations?.map((variant) =>
                      variant.pastaTypes?.map((eachType) => (
                        <ChoiceItem
                          choice={eachType}
                          quantity={
                            selectedOptions.find(
                              (op) => op.name === eachType && op.type === 'pastaTypes',
                            )?.quantity || 0
                          }
                          increment={() => increaseOption({ name: eachType, type: 'pastaTypes' })}
                          decrement={() => decreaseOption({ name: eachType, type: 'pastaTypes' })}
                        />
                      )),
                    )}
                    <div className="mb-4">
                      <strong>Choose one of</strong>
                      <span
                        style={{
                          color: 'red',
                          fontSize: '12px',
                          margin: '1rem',
                        }}
                      >
                        (select 1 choices)
                      </span>
                    </div>
                    {cateringModalInfo.variations?.map((variant) =>
                      variant.meatChoices?.map((eachChoice) => (
                        <ChoiceItem
                          choice={eachChoice}
                          quantity={
                            selectedOptions.find(
                              (op) => op.name === eachChoice && op.type === 'meatOptions',
                            )?.quantity || 0
                          }
                          increment={() =>
                            increaseOption({ name: eachChoice, type: 'meatOptions' })
                          }
                          decrement={() =>
                            decreaseOption({ name: eachChoice, type: 'meatOptions' })
                          }
                        />
                      )),
                    )}
                  </div>
                ),
            )}
            {cateringModalInfo.variations?.map(
              (variant, idx) =>
                variant.burgerOptions && (
                  <div key={idx} className="catering-modal-pastaTypes">
                    <div className="mb-4">
                      <strong>Burger Choices</strong>
                      <span
                        style={{
                          color: 'red',
                          fontSize: '12px',
                          margin: '1rem',
                        }}
                      >
                        (select 10 choices)
                      </span>
                    </div>
                    {cateringModalInfo.variations?.map((variant) =>
                      variant.burgerOptions?.map((eachType) => (
                        <ChoiceItem
                          choice={eachType}
                          quantity={
                            selectedOptions.find(
                              (op) => op.name === eachType && op.type === 'burgerOptions',
                            )?.quantity || 0
                          }
                          increment={() =>
                            increaseOption({ name: eachType, type: 'burgerOptions' })
                          }
                          decrement={() =>
                            decreaseOption({ name: eachType, type: 'burgerOptions' })
                          }
                        />
                      )),
                    )}
                  </div>
                ),
            )}
            {cateringModalInfo.variations?.map(
              (variant, idx) =>
                variant.pizzaTypes && (
                  <div key={idx} className="catering-modal-pastaTypes">
                    <div className="mb-4">
                      <strong>Pizza Types</strong>
                      <span
                        style={{
                          color: 'red',
                          fontSize: '12px',
                          margin: '1rem',
                        }}
                      >
                        (select 10 choices)
                      </span>
                    </div>
                    {cateringModalInfo.variations?.map((variant) =>
                      variant.pizzaTypes?.map((eachType) => (
                        <ChoiceItem
                          choice={eachType}
                          quantity={
                            selectedOptions.find(
                              (op) => op.name === eachType && op.type === 'pizzaTypes',
                            )?.quantity || 0
                          }
                          increment={() => increaseOption({ name: eachType, type: 'pizzaTypes' })}
                          decrement={() => decreaseOption({ name: eachType, type: 'pizzaTypes' })}
                        />
                      )),
                    )}
                  </div>
                ),
            )}
            {cateringModalInfo.variations?.map(
              (variant, idx) =>
                variant.riceTypes && (
                  <div key={idx} className="catering-modal-pastaTypes">
                    <div className="mb-4">
                      <strong>Rice Choices</strong>
                      <span
                        style={{
                          color: 'red',
                          fontSize: '12px',
                          margin: '1rem',
                        }}
                      >
                        (select 3 choices)
                      </span>
                    </div>
                    {cateringModalInfo.variations?.map((variant) =>
                      variant.riceTypes?.map((eachType) => (
                        <ChoiceItem
                          choice={eachType}
                          quantity={
                            selectedOptions.find(
                              (op) => op.name === eachType && op.type === 'riceTypes',
                            )?.quantity || 0
                          }
                          increment={() => increaseOption({ name: eachType, type: 'riceTypes' })}
                          decrement={() => decreaseOption({ name: eachType, type: 'riceTypes' })}
                        />
                      )),
                    )}
                  </div>
                ),
            )}
          </div>
        </div>
        {/* Addons Section */}
        <div className="catering-modal-addons">
          {cateringModalInfo.variations?.map(
            (variant, idx) =>
              variant.addOns && (
                <div key={idx} className="addons-heading d-flex">
                  <h5>
                    Addons{' '}
                    <span style={{ color: 'red', fontSize: '12px' }}>(Add plates per tray)</span>{' '}
                  </h5>
                </div>
              ),
          )}
          <div className="addons-choices">
            {cateringModalInfo.variations?.map((variant) =>
              variant.addOns?.map((eachAddon, idx) => (
                <ChoiceItem
                  key={idx}
                  choice={eachAddon.addOn}
                  subtitle={eachAddon.price}
                  quantity={selectedAddons.find((a) => a.addOn === eachAddon.addOn)?.quantity || 0}
                  increment={() => increaseAddon(eachAddon)}
                  decrement={() => decreaseAddon(eachAddon)}
                />
              )),
            )}
            {cateringModalInfo.variations?.map(
              (variant, idx) =>
                variant.drinkAddons && (
                  <div key={idx} className="catering-modal-pastaTypes mt-4">
                    <div className="mb-4">
                      <h6 style={{ color: '#139652' }}>Reb Bull with Falvours</h6>
                    </div>
                    {cateringModalInfo.variations?.map((variant) =>
                      variant.drinkAddons?.map((eachAddon, idx) => (
                        <ChoiceItem
                          key={idx}
                          choice={eachAddon.drinkAddon}
                          subtitle={eachAddon.price}
                          quantity={
                            selectedDrinkAddons.find((a) => a.drinkAddon === eachAddon.drinkAddon)
                              ?.quantity || 0
                          }
                          increment={() => increaseDrinkAddon(eachAddon)}
                          decrement={() => decreaseDrinkAddon(eachAddon)}
                        />
                      )),
                    )}
                  </div>
                ),
            )}
          </div>
        </div>
        <ModalFooter className="catering-modal-footer d-flex justify-content-around border-0 text-center">
          <motion.button
            whileTap={{ scale: 0.9 }}
            type="button"
            className="booknowBtn"
            data-dismiss="modal"
            onClick={() =>
              bookItem({
                ...cateringModalInfo,
                selectedAddons,
                selectedDrinkAddons,
                selectedOptions,
              })
            }
          >
            <span>Book Now</span>
            <span>
              QAR{' '}
              {calculatePrice({
                addons: selectedAddons,
                drinkAddons: selectedDrinkAddons,
                defaultPrice: Number(cateringModalInfo.price),
              })}
            </span>
          </motion.button>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
}
