import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import { IoCartSharp } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { useStateValue } from '../../../context/StateProvider';
import { If, Then, Else, When } from 'react-if';

function calculatePrice({ price, quantity }) {
  return Number(price || 0) * Number(quantity || 0);
}

function OtherModal({ modal, toggle, modalInfo }) {
  const { cartItems, addToCart, deleteItem, increase, decrease } = useStateValue()[2];
  console.log({ modalInfo })
  // find this item in cartItems
  const [cartItemId, setCartItemId] = React.useState();
  const currentItem = cartItems.find((i) => i.cartItemId === cartItemId);
  console.log({ currentItem })
  return (
    <Modal size="md" isOpen={modal} toggle={toggle}>
      <ModalHeader className="modalHeader" toggle={toggle}>
        <button onClick={toggle} type="button" className="close" data-dismiss="modal">
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
            <Col lg="12" md="12">
              <If condition={modalInfo?.category === 'fresh juices'}>
                <Then>
                  <div
                    style={{
                      minHeight: '13rem',
                      maxHeight: '28rem',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      overflow: 'hidden',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <img alt="" src={modalInfo?.imageURL} />
                  </div>
                </Then>
                <Else>
                  <div className="imgContainer">
                    <img alt="" src={modalInfo?.imageURL} />
                  </div>
                </Else>
              </If>
              <p style={{ marginTop: '0.5rem' }}>{modalInfo?.description}</p>
              <p style={{ marginTop: '0.5rem' }}>{modalInfo?.arabicDescription}</p>
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
                onClick={() => decrease(currentItem?.cartItemId)}
              >
                <i className="ri-subtract-line"></i>
              </motion.button>
              <span className="counter-quantity">{currentItem?.qty}</span>
              <motion.button
                whileTap={{ scale: 0.75 }}
                className="increase__btn"
                onClick={() => {
                  increase(currentItem?.cartItemId);
                }}
              >
                <i className="ri-add-line"></i>
              </motion.button>
            </div>
          </When>
          <div className="product__price-modal">
            <span>
              QAR&nbsp;
              {calculatePrice({
                price: currentItem?.price || modalInfo.price,
                quantity: currentItem?.qty || 1,
              })}
            </span>
          </div>
          <div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                // if already present, remove from cart
                if (currentItem) {
                  deleteItem(currentItem.cartItemId);
                  setCartItemId(undefined);
                } else {
                  // when added to cart, returns cartItemId
                  const cartItemId = addToCart(modalInfo);
                  // set current item to cart item currently handled
                  setCartItemId(cartItemId);
                }
              }}
              className={`cart_btn btn btn-primary ${currentItem ? 'active' : ''}`}
            >
              <span className="add_to_cart">Add to cart</span>
              <span className="added">Added!</span>
              <IoCartSharp className="cart-shopping" />
              <div className="dots"></div>
            </motion.button>
          </div>
        </div>
      </ModalFooter>
    </Modal>
  );
}

export default React.memo(OtherModal);
