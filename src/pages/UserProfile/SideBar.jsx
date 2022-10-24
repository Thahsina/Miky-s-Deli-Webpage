import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink, Link } from "react-router-dom";
import { FaBars, FaHome, FaUser } from "react-icons/fa";
import { BsCartCheck } from "react-icons/bs";
import { useState } from "react";
import { MdKeyboardBackspace,MdLocationOn,MdFoodBank } from "react-icons/md";

import "../../Components/styles/sideBar.css";

const routes = [
  {
    path: "/",
    name: "Home",
    icon: <FaHome />,
  },
  {
    path: "profileInfo",
    name: "My Profile",
    icon: <FaUser />,
  },
  {
    path: "myorders",
    name: "Past Orders",
    icon: <BsCartCheck />,
  },
  {
    path: "cateringorders",
    name: "Catering Order",
    icon: <MdFoodBank />,
  },
  {
    path: "dropofforders",
    name: "Drop Off Order",
    icon: <MdFoodBank />,
  },
];

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  // const showAnimation = {
  //   hidden: {
  //     width: 0,
  //     opacity: 0,
  //     transition: {
  //       duration: 0.3,
  //     },
  //   },
  //   show: {
  //     opacity: 1,
  //     width: "auto",
  //     transition: {
  //       duration: 0.3,
  //     },
  //   },
  // };

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",

            // transition: {
            //   duration: 0.1,
            //   type: "spring",
            //   damping: 8,
            // },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            {!isOpen ? (
              <div className="bars">
                <FaBars onClick={toggle} />
              </div>
            ) : (
              <div className="bars">
                <MdKeyboardBackspace onClick={toggle} />
              </div>
            )}
          </div>
          

          <section className="routes">
            {routes.map((route, index) => {
              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeclassname="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        // variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>
      </div>
    </>
  );
};

export default SideBar;
