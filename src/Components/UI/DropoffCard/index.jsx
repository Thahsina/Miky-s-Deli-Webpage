import React, { useState } from "react";
import { motion } from "framer-motion";
import Location from "../../../images/location.png";
import BookNow from "../../../images/bookNow.png";
import image from "../../../images/crispy-sandwiches.png";
import { When } from "react-if";

import DropoffModal from "./DropoffModal";

const DropoffCard = ({ data }) => {
  const [modal, setModal] = useState(false);
  const [cateringModalInfo, setCateringModalInfo] = useState([]);

  const toggle = () => setModal(!modal);
  return (
    <>
      {data &&
        data?.map((item) => (
          <div>
            <div className="article__postcard">
              <article
                key={item.id}
                className="postcard light red"
                onClick={() => {
                  toggle();
                  setCateringModalInfo(item);
                }}
              >
                <img
                  className="postcard__img"
                  src={image}
                  onClick={toggle}
                  alt="Title"
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
                    {item.highlights?.map((eachHighlight) => (
                      <li className="tag__item highlight">
                        <span>{eachHighlight}</span>
                      </li>
                    ))}
                    {/* {item.location === "Doha Only" && (
                      <li className="tag__item notice d-flex justify-content-between">
                        <img src={Location} alt="Location Icon" />
                        <strong>{item.location}</strong>
                      </li>
                    )} */}
                    <li className="tag__item play green" onClick={toggle}>
                      <span>QAR {item.price}</span>
                    </li>
                  </ul>
                </div>
              </article>
            </div>
          </div>
        ))}
      <When condition={modal && cateringModalInfo}>
        <DropoffModal modal={modal} toggle={toggle} cateringModalInfo={cateringModalInfo} />
      </When>
    </>
  );
};

export default DropoffCard;
