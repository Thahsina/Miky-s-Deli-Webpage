import React, { useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import { Button } from "reactstrap";
import "../Components/styles/area.css";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const Area = () => {
  const [{ deliveryZone }, dispatch] = useStateValue();
  const [modal, setModal] = useState(true);
  const toggle = (e) => {
    setModal(!modal);
  };
  const [value, setValue] = useState("Select area for delivery");

  const setDeliveryZone = () => {
    dispatch({
      type: actionType.SET_DELIVERYZONE,
      deliveryZone: value,
    });

    localStorage.setItem("deliveryZone", JSON.stringify(value));
  };
  const toggleActive = (event) => {
    event.currentTarget.classList.toggle("active");
  };

  const selectOption = (e) => {
    setValue(e.target.textContent);
    e.currentTarget.parent.classList.remove("active");
  };

  const options = [
    "Al Saad",
    "Al Bidda",
    "The Pearl",
    "Khairayat",
    "Al Duhail",
    "Al Garafa",
    "Al Markhiya",
    "Katara",
    "Al Mamoura",
    "Abu Hamour",
    "Dafna",
  ];

  return (
    <div>
      {/* {!deliveryZone &&  */}
      <Modal
        className="select__area-modal"
        isOpen={modal}
        toggle={toggle}
        keyboard="false"
        backdrop="static"
      >
        <ModalBody className="select__area-content text-center">
          <h2>Select your delivery area</h2>
          <div className="select-box" onClick={toggleActive}>
            <button className="options-container">
              <div className="option" onClick={toggleActive}>
                <div for="Al Saad" onClick={selectOption}>
                  Al Saad
                </div>
              </div>

              <div className="option" onClick={toggleActive}>
                <div for="Al Bidda" onClick={selectOption}>
                  Al Bidda
                </div>
              </div>

              <div className="option" onClick={toggleActive}>
                <div for="The Pearl" onClick={selectOption}>
                  The Pearl
                </div>
              </div>

              <div className="option" onClick={toggleActive}>
                <div for="Khairatyat" onClick={selectOption}>
                  Khairatyat
                </div>
              </div>

              <div className="option" onClick={toggleActive}>
                <div for="Al Duhail" onClick={selectOption}>
                  Al Duhail
                </div>
              </div>

              <div className="option" onClick={toggleActive}>
                <div for="Al Garafa" onClick={selectOption}>
                  Al Garafa
                </div>
              </div>

              <div className="option" onClick={toggleActive}>
                <div for="news">Al Markhiya</div>
              </div>

              <div className="option" onClick={toggleActive}>
                <div for="Katara" onClick={selectOption}>
                  Katara
                </div>
              </div>
              <div className="option" onClick={toggleActive}>
                <div for="Al Mamoura">Al Mamoura</div>
              </div>
              <div className="option" onClick={toggleActive}>
                <div for="Abu Hamour" onClick={selectOption}>
                  Abu Hamour
                </div>
              </div>
              <div className="option" onClick={toggleActive}>
                <div for="Dafna" onClick={selectOption}>
                  Dafna
                </div>
              </div>
            </button>

            <div className="selected" onChange={selectOption}>
              {value}
            </div>
          </div>
          <Button
            className="select__area-btn"
            disabled={value === "Select area for delivery" ? true : false}
            color="primary"
            onClick={() => {
              toggle();
              // deliveryZone==="null"
              setDeliveryZone();
            }}
          >
            OK
          </Button>{" "}
        </ModalBody>
      </Modal>
      {/* } */}
    </div>
  );
};

export default Area;
