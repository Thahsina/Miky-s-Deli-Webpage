import React from 'react';
import { ListGroupItem } from 'reactstrap';
import { IoCloseSharp } from 'react-icons/io5';
import '../Components/styles/cartItem.css';

import { BiMinus, BiPlus } from 'react-icons/bi';
import { motion } from 'framer-motion';
import { useStateValue } from '../context/StateProvider';

const CartItem = ({ cartItem, setFlag, flag }) => {
  const { deleteItem, increase, decrease, calculateTotalPriceOfItem } = useStateValue()[2];

  const totalPriceOfItem = calculateTotalPriceOfItem(cartItem.cartItemId);

  return (
    <ListGroupItem className="border-0 cart__item">
      <div className="cart__item-info d-flex gap-2">
        <img src={cartItem?.imageURL} alt="product-img" />

        <div className="cart__product-info w-100 d-flex align-items-center gap-4 justify-content-between">
          <div className='cart__product-infoContainer'>
            <h6 className="cart__product-title">{cartItem?.title}</h6>
            <span className="cart__product-price "> QAR {totalPriceOfItem}</span>
          </div>

          <div className="catering__quantityContainer">
            <div className=" d-flex align-items-center justify-content-between cartItem-increase__decrease-btns">
              <div
                whileTap={{ scale: 0.75 }}
                className={`cartItem-decrease__btn ${cartItem.qty <= 1 ? 'disabled' : ''}`}
                onClick={() => {
                  cartItem.qty > 1 && decrease(cartItem?.cartItemId);
                }}
              >
                <BiMinus style={{ fontSize: '0.9rem' }} />
              </div>
              <span className="cartItem-quantity">{cartItem.qty}</span>
              <motion.div
                whileTap={{ scale: 0.75 }}
                className={`cartItem-increase__btn ${cartItem.qty > 25 ? 'disabled' : ''}`}
                onClick={() => increase(cartItem?.cartItemId)}
              >
                <BiPlus style={{ fontSize: '1rem' }} />
              </motion.div>
            </div>
          </div>
          <IoCloseSharp
            style={{ fontSize: '0.9rem', color: '#df2020', cursor: 'pointer' }}
            onClick={() => deleteItem(cartItem?.cartItemId)}
          />
        </div>
      </div>
    </ListGroupItem>
  );
};

export default CartItem;
