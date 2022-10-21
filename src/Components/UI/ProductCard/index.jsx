import React, { useState } from "react";
import "../../styles/productCard.css";
import "react-loading-skeleton/dist/skeleton.css";
import { If, Then, Else } from 'react-if'
import VariationsModal from "./VariationsModal";
import OtherModal from "./OtherModal";

const ProductCard = ({ data }) => {
  const [modal, setModal] = useState(false);
  const [modalInfo, setModalInfo] = useState([]);
  const toggle = () => {
    setModal(!modal);
  };
  return (
    <>
      {data &&
        data.map((item) => (
          <div
            key={item.id}
            className="card mb-4"
            onClick={() => {
              toggle();
              console.log(item);
              setModalInfo(item);
            }}
            style={{ width: "15rem" }}
          >
            <img
              className="card-img-top mt-2"
              src={item.imageURL}
              alt="product-img"
              loading="lazy"
            />
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
              <h6 className="card-arabicTitle">{item?.arabicTitle}</h6>
              <p className="card-text card-description">{item?.description}</p>
            </div>
            <If condition={!Boolean(modalInfo.variations)}>
              <Then>
                <OtherModal
                  modal={modal && modalInfo.id === item.id}
                  toggle={toggle}
                  modalInfo={modalInfo}
                />
              </Then>
              <Else>
                <VariationsModal
                  modal={modal && modalInfo.id === item.id}
                  toggle={toggle}
                  modalInfo={modalInfo}
                />
              </Else>
            </If>
          </div>
        ))}
    </>
  );
};

export default ProductCard;
