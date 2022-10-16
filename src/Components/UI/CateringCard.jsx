import React, { useState } from "react";
import "../styles/cateringCard.css";
import {
  Row,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Radio, Checkbox, RadioGroup } from "@mui/material";
import { motion } from "framer-motion";
import Barista from "../../images/barista.png";
import Server from "../../images/server.png";
import StopWatch from "../../images/stopwatch.png";
import Location from "../../images/location.png";
import BookNow from "../../images/bookNow.png";
import BulletArrow from "../../images/bulletarrow.png";
import FemaleServer from "../../images/femaleServer.png";
import image from "../../images/crispy-sandwiches.png";
import { FaClock } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { BiMinus, BiPlus } from "react-icons/bi";

const CateringCard = ({ data }) => {
  const [modal, setModal] = useState(false);
  const [cateringModalInfo, setCateringModalInfo] = useState([]);

  const toggle = () => setModal(!modal);
  const closeBtn = (
    <button className="close" onClick={toggle} type="button">
      &times;
    </button>
  );

  return (
    <>
      {data &&
        data.map((item) => (
          <div>
            <div key={item.id} className="article__postcard">
              <article
                key={item.id}
                className="postcard light green"
                onClick={() => {
                  toggle();
                  setCateringModalInfo(item);
                }}
              >
                <img
                  className="postcard__img"
                  src={image}
                  alt="Image Title"
                  onClick={toggle}
                />

                <div className="postcard__text">
                  <div className="d-flex justify-content-between">
                    <h1 className="postcard__title green m-2" onClick={toggle}>
                      {item.title}
                    </h1>
                    <motion.span whileTap={{ scale: 0.5 }}>
                      <img src={BookNow} alt="bookNow icon" onClick={toggle} />
                    </motion.span>
                  </div>
                  <div
                    className="postcard__subtitle small m-2"
                    style={{ color: "#139652" }}
                  >
                    <b>{item.category}</b>
                  </div>

                  <div className="postcard__subtitle small">
                    {item.arabicTitle}
                  </div>
                  <div className="postcard__bar" />
                  <div>
                    {item.descriptions?.map((i) => (
                      <div className="postcard__preview-txt">{i}</div>
                    ))}
                  </div>

                  <ul className="postcard__tagbox">
                    {item.category === "Hot Coffee . Iced Coffee . Dessert" &&
                      item.presentation?.map((eachItem) => (
                        <li className="tag__item">
                          <strong className="align-self-center text-center">
                            {eachItem.barista}
                          </strong>
                          <IoCloseOutline />
                          <img
                            src={Barista}
                            style={{ width: "35px", height: "33px" }}
                            alt="Barista Icon"
                          />
                        </li>
                      ))}
                    {item.presentation?.map((eachItem) => (
                      <li className="tag__item">
                        <strong>{eachItem.server}</strong>
                        <IoCloseOutline />
                        <img
                          src={Server}
                          style={{ width: "35px", height: "33px" }}
                          alt="Server Icon"
                        />
                      </li>
                    ))}
                    {item.highlights?.map((eachHighlight) => (
                      <li className="tag__item highlight">
                        <span>{eachHighlight}</span>
                      </li>
                    ))}

                    {item.location === "Doha Only" && (
                      <li className="tag__item notice d-flex justify-content-between">
                        <img src={Location} alt="Location Icon" />
                        <strong>{item.location}</strong>
                      </li>
                    )}

                    <li className="tag__item play green" onClick={toggle}>
                      <span>QAR {item.price}</span>
                    </li>
                  </ul>
                </div>
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
                    close={closeBtn}
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
                            {/* <div className="catering-modal-icons_server"> */}
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
                            {/* </div> */}
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
                        {/* <div className="col-md-4">
                        <div className="picture">
                         <img
                            src="https://images.unsplash.com/photo-1519668167916-f522d6031d68?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c8568f5a200bf21a8209528bae85b022&auto=format&fit=crop&w=400&q=80"
                             alt="Thumbnail Image"
                             className="rounded img-fluid"
                            />
                             </div>
                         </div> */}
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
                            variant.options && (
                              <>
                                <span
                                  style={{ color: "red", fontSize: "12px" }}
                                >
                                  (select 4 choices of Cold Drinks)
                                </span>
                                <Button className="btn btn-danger">
                                  Requried
                                </Button>
                              </>
                            )
                        )}
                      </div>
                      <div className="options-choices">
                        {cateringModalInfo.variations?.map((variant) =>
                          variant.options?.map((eachOption) => (
                            <ul>
                              <li className="d-flex justify-content-between">
                                <span>{eachOption}</span>
                                <div className="counter d-flex">
                                  <motion.button
                                    whileTap={{ scale: 0.5 }}
                                    className="minusBtn"
                                    // onClick={(e)=> {e.preventDefault()}}
                                  >
                                    <BiMinus style={{ fontSize: "1rem" }} />
                                  </motion.button>
                                  {/* <div className="counterQuantity">1</div> */}
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
                                    // onClick={()=> {e.preventDefault()}}
                                  >
                                    <BiPlus style={{ fontSize: "1rem" }} />
                                  </motion.button>
                                </div>
                              </li>
                            </ul>
                          ))
                        )}

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
                                    <ul>
                                      <li className="d-flex justify-content-between">
                                        <span>{eachType}</span>
                                        <div className="counter d-flex">
                                          <motion.button
                                            whileTap={{ scale: 0.5 }}
                                            className="minusBtn"
                                            // onClick={(e)=> {e.preventDefault()}}
                                          >
                                            <BiMinus
                                              style={{ fontSize: "1rem" }}
                                            />
                                          </motion.button>
                                          {/* <div className="counterQuantity">1</div> */}
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
                                            // onClick={()=> {e.preventDefault()}}
                                          >
                                            <BiPlus
                                              style={{ fontSize: "1rem" }}
                                            />
                                          </motion.button>
                                        </div>
                                      </li>
                                    </ul>
                                  ))
                                )}

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
                                {cateringModalInfo.variations?.map((variant) =>
                                  variant.sauceTypes?.map((eachType) => (
                                    <ul>
                                      <li className="d-flex justify-content-between">
                                        <span>{eachType}</span>
                                        <div className="counter d-flex">
                                          <motion.button
                                            whileTap={{ scale: 0.5 }}
                                            className="minusBtn"
                                            // onClick={(e)=> {e.preventDefault()}}
                                          >
                                            <BiMinus
                                              style={{ fontSize: "1rem" }}
                                            />
                                          </motion.button>
                                          {/* <div className="counterQuantity">1</div> */}
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
                                            // onClick={()=> {e.preventDefault()}}
                                          >
                                            <BiPlus
                                              style={{ fontSize: "1rem" }}
                                            />
                                          </motion.button>
                                        </div>
                                      </li>
                                    </ul>
                                  ))
                                )}
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
                                </div>
                                {cateringModalInfo.variations?.map((variant) =>
                                  variant.meatChoices?.map((eachType) => (
                                    <ul>
                                      <li className="d-flex justify-content-between">
                                        <span>{eachType}</span>
                                        <div className="counter d-flex">
                                          <motion.button
                                            whileTap={{ scale: 0.5 }}
                                            className="minusBtn"
                                            // onClick={(e)=> {e.preventDefault()}}
                                          >
                                            <BiMinus
                                              style={{ fontSize: "1rem" }}
                                            />
                                          </motion.button>
                                          {/* <div className="counterQuantity">1</div> */}
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
                                            // onClick={()=> {e.preventDefault()}}
                                          >
                                            <BiPlus
                                              style={{ fontSize: "1rem" }}
                                            />
                                          </motion.button>
                                        </div>
                                      </li>
                                    </ul>
                                  ))
                                )}
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
                                {cateringModalInfo.variations?.map((variant) =>
                                  variant.drinkChoices?.map((eachType) => (
                                    <ul>
                                      <li className="d-flex justify-content-between">
                                        <span>{eachType}</span>
                                        <div className="counter d-flex">
                                          <motion.button
                                            whileTap={{ scale: 0.5 }}
                                            className="minusBtn"
                                            // onClick={(e)=> {e.preventDefault()}}
                                          >
                                            <BiMinus
                                              style={{ fontSize: "1rem" }}
                                            />
                                          </motion.button>
                                          {/* <div className="counterQuantity">1</div> */}
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
                                            // onClick={()=> {e.preventDefault()}}
                                          >
                                            <BiPlus
                                              style={{ fontSize: "1rem" }}
                                            />
                                          </motion.button>
                                        </div>
                                      </li>
                                    </ul>
                                  ))
                                )}
                              </div>
                            )
                        )}

                        {cateringModalInfo.category === "Burger Cart" && (
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
                                (select 30 choices)
                              </span>
                            </div>
                            {cateringModalInfo.variations?.map((variant) =>
                              variant.burgerOptions?.map((eachType) => (
                                <ul>
                                  <li className="d-flex justify-content-between">
                                    <span>{eachType}</span>
                                    <div className="counter d-flex">
                                      <motion.button
                                        whileTap={{ scale: 0.5 }}
                                        className="minusBtn"
                                        // onClick={(e)=> {e.preventDefault()}}
                                      >
                                        <BiMinus style={{ fontSize: "1rem" }} />
                                      </motion.button>
                                      {/* <div className="counterQuantity">1</div> */}
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
                                        // onClick={()=> {e.preventDefault()}}
                                      >
                                        <BiPlus style={{ fontSize: "1rem" }} />
                                      </motion.button>
                                    </div>
                                  </li>
                                </ul>
                              ))
                            )}
                          </div>
                        )}

                        {cateringModalInfo.category === "Rice Station" && (
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
                              variant.riceOptions?.map((eachType) => (
                                <ul>
                                  <li className="d-flex justify-content-between">
                                    <span>{eachType}</span>
                                    <div className="counter d-flex">
                                      <motion.button
                                        whileTap={{ scale: 0.5 }}
                                        className="minusBtn"
                                        // onClick={(e)=> {e.preventDefault()}}
                                      >
                                        <BiMinus style={{ fontSize: "1rem" }} />
                                      </motion.button>
                                      {/* <div className="counterQuantity">1</div> */}
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
                                        // onClick={()=> {e.preventDefault()}}
                                      >
                                        <BiPlus style={{ fontSize: "1rem" }} />
                                      </motion.button>
                                    </div>
                                  </li>
                                </ul>
                              ))
                            )}
                          </div>
                        )}

                        {cateringModalInfo.category === "Mix Grill" && (
                          <div className="catering-modal-pastaTypes">
                            <div className="mb-4">
                              <strong>Grill Options</strong>
                              <span
                                style={{
                                  color: "red",
                                  fontSize: "12px",
                                  margin: "1rem",
                                }}
                              >
                                (select 90 choices)
                              </span>
                            </div>
                            {cateringModalInfo.variations?.map((variant) =>
                              variant.grillOptions?.map((eachType) => (
                                <ul>
                                  <li className="d-flex justify-content-between">
                                    <span>{eachType}</span>
                                    <div className="counter d-flex">
                                      <motion.button
                                        whileTap={{ scale: 0.5 }}
                                        className="minusBtn"
                                        // onClick={(e)=> {e.preventDefault()}}
                                      >
                                        <BiMinus style={{ fontSize: "1rem" }} />
                                      </motion.button>
                                      {/* <div className="counterQuantity">1</div> */}
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
                                        // onClick={()=> {e.preventDefault()}}
                                      >
                                        <BiPlus style={{ fontSize: "1rem" }} />
                                      </motion.button>
                                    </div>
                                  </li>
                                </ul>
                              ))
                            )}
                          </div>
                        )}
                      </div>
                    </div>

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
                            <ul>
                              <li className="d-flex justify-content-between">
                                <div className="d-flex flex-column">
                                  <span>{eachAddon.addOn}</span>
                                  <small
                                    style={{
                                      fontSize: "1rem",
                                      fontWeight: "500",
                                      color: "#9196AA",
                                    }}
                                  >
                                    <BiPlus />
                                    {eachAddon.price}QAR
                                  </small>
                                </div>

                                <div className="counter d-flex">
                                  <motion.button
                                    whileTap={{ scale: 0.5 }}
                                    className="minusBtn"
                                    // onClick={(e)=> {e.preventDefault()}}
                                  >
                                    <BiMinus style={{ fontSize: "1rem" }} />
                                  </motion.button>
                                  {/* <div className="counterQuantity">1</div> */}
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
                                    // onClick={()=> {e.preventDefault()}}
                                  >
                                    <BiPlus style={{ fontSize: "1rem" }} />
                                  </motion.button>
                                </div>
                              </li>
                            </ul>
                          ))
                        )}
                      </div>
                    </div>
                    <div className="extraServices m-4">
                      <div>
                        <div className="text-center">
                          <Checkbox type="checkbox" color="success" />
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
                          <Checkbox type="checkbox" color="success" />
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
                        {/* {qty > 1 &&  */}
                        <motion.div
                          whileTap={{ scale: 0.75 }}
                          className="catering-decrease__btn"
                        >
                          <BiMinus style={{ fontSize: "0.9rem" }} />
                        </motion.div>
                        {/* }  */}
                        <span className="catering-quantity">
                          <span>Serves</span>

                          {cateringModalInfo.serveQty}
                        </span>
                        <motion.div
                          whileTap={{ scale: 0.75 }}
                          // className="cartItem-increase__btn"
                          className="catering-increase__btn"
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
                      <span>QAR {cateringModalInfo.price}</span>
                    </motion.button>
                  </ModalFooter>
                </Modal>
              </article>
            </div>
          </div>
        ))}
    </>
  );
};

export default CateringCard;
