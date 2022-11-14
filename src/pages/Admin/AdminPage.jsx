import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { AnimatePresence, motion } from "framer-motion";

import "../../Components/styles/admin.css";
import { MdKeyboardBackspace } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import { FaBars, FaHome, FaPlus } from "react-icons/fa";
import { BsCartCheck } from "react-icons/bs";


const routes = [
  {
    path: "/",
    name: "Home",
    icon: <FaHome />,
  },
  {
    path: "orderspage/currentOrders",
    name: "Orders",
    icon: <BsCartCheck />,
  },
  {
    path: "cateringOrderspage",
    name: "Catering Orders",
    icon: <BsCartCheck />,
  },
  {
    path: "dropOffOrderspage",
    name: "Drop-Off Orders",
    icon: <BsCartCheck />,
  },
  {
    path: "createItem",
    name: "Add New Product",
    icon: <FaPlus />,
  },
];

const Admin = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  // const showAnimation = {
  //   hidden: {
  //     width: 0,
  //     opacity: 0,
  //     transition: {
  //       duration: 0.3,
  //     },
  //   },
    // show: {
    //   opacity: 1,
    //   width: "auto",
    //   transition: {
    //     duration: 0.3,
    //   },
    // },
  // };

  return (
    <>
      <Helmet>
        <title>Miky's Deli - Admin</title>
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="/admin" />
      </Helmet>
      <div className="d-flex">
        <div className="main-container">
          <motion.div
            animate={{
              width: isOpen ? "200px" : "45px",

              transition: {
                duration: 0.3,
                type: "spring",
                damping: 8,
              },
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
                    activeclassname="activeLink"
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

        <div className="admin_outlet">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Admin;
