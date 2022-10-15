import React, { useState } from "react";

import Helmet from "../Components/Helmet";
import { AnimatePresence, motion } from "framer-motion";

import "../Components/styles/admin.css";
import { MdAdd, MdKeyboardBackspace } from "react-icons/md";
import { Link, NavLink, Outlet } from "react-router-dom";
import { FaBars, FaHome, FaPlus } from "react-icons/fa";
import { BsCartCheck } from "react-icons/bs";
import { Col, Container, Row } from "reactstrap";

const routes = [
  {
    path: "/",
    name: "Home",
    icon: <FaHome />,
  },
  {
    path: "createItem",
    name: "Add New Product",
    icon: <FaPlus />,
  },
  {
    path: "orderspage",
    name: "Orders",
    icon: <BsCartCheck />,
  },
];

const Admin = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <Helmet title="Admin">
      <div className="d-flex">
        {/* <Col lg="4"className=""> */}
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

        {/* <section>
        <Container>
          <Row>
            <Col lg="2" md={{ span: 4, offset: 4 }}>
              <div className="addItemContainer">
                <Link to={"/createItem"}>
                  <button className="mt-3 btn newItem">
                    Add New Item to the Menu{" "}
                    <span>
                      <MdAdd />
                    </span>
                  </button>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section> */}
        {/* </Col> */}
        <div className="admin_outlet">
          <Outlet />
        </div>
      </div>
    </Helmet>
  );
};

export default Admin;
