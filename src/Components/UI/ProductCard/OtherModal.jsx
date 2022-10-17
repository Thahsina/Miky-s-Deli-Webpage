import React from 'react';

import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Container, Row, Col } from "reactstrap";

import { IoCartSharp } from "react-icons/io5";

import { motion } from "framer-motion";

function OtherModal({ modal, toggle, modalInfo, cartItems, addToCart, toggleActiveClass, decrease, increase }) {
    return (
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
                            item.id === modalInfo.id && modalInfo.qty >= 1 && modalInfo.price && (
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
    )
}

export default React.memo(OtherModal);