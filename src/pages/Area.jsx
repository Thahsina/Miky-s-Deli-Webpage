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

  const areaOptions = [
    "Al Saad",
    "Al Bidda",
    "The Pearl",
    "Khairayat",
    "Al Duhail North",
    "Al Duhail South",
    "Al Duhail",
    "Al Garafa",
    "Al Markhiya",
    "Katara",
    "Al Mamoura",
    "Abu Hamour",
    "Dafna",
    "Al Shamal",
    "Al Ruwais",
    "Al Zubara",
    "Ain Sinan",
    "Abu Dhalouf",
    "Madinat Al Kaaban",
    "Al Jasrah",
    "Al Luqta",
    "New Al Mirqab",
    "Al Asiri",
    "Al Maamoura",
    "Al Nuaija",
    "Bin Omran",
    "Fereej Bin Mohammed",
    "Ain Khaled",
    "Mesiameer",
    "Al Hilal",
    "Al Nasr",
    "Al Soudan",
    "Al Hitmi",
    "Musheireb",
    "New Al Hitmi",
    "Al Khulaifat",
    "Fereej Al Ali",
    "Old Salata",
    "Wadi Al Banat",
    "Dahl Al Hamam",
    "Onaiza",
    "Qatar University",
    "Wadi Al Sail",
    "West Bay",
    "Legtafiya",
    "Lusail",
    "Al Kheesa",
    "Al Ebb",
    "Al Qassar",
    "Hazm Almarkiyah",
    "Al Rayyan",
  ];

  return (
    <div>
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
              {areaOptions.map((areaOption) => (
                <div className="option" onClick={toggleActive}>
                  <div onClick={selectOption}>
                    {areaOption}
                  </div>
                </div>
              ))}
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
