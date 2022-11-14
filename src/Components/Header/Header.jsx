import React from "react";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { PersonOutline } from "@mui/icons-material";
import Cart from "../../pages/Cart";
import adminUser from "../../images/adminUser.png";
import {
  Container,
  Button,
  Collapse,
  DropdownItem,
  DropdownMenu,
  UncontrolledDropdown,
  DropdownToggle,
  NavbarToggler,
} from "reactstrap";
import { IoIosCloseCircle } from "react-icons/io";
import { IoCartSharp } from "react-icons/io5";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
// import Area from "../../pages/Area";
import PhoneInput from "react-phone-number-input/input";
import "react-phone-number-input/style.css";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { app } from "../../firebase.config";

import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";

import logo from "../../images/mikyslogo.png";
import "../styles/header.css";
import { saveUser } from "../../firebaseFunctions";

const nav__links = [
  {
    display: "Home",
    path: "/home",
  },
  {
    display: "Menu",
    path: "/menu",
  },
  {
    display: "Catering Services",
    path: "/services/catering",
  },

  {
    display: "Find Us",
    path: "/map",
  },
];

const Header = () => {
  const menuRef = useRef(null);
  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  // const autoFocusRef = useRef(null);

  const [{ user }, dispatch] = useStateValue();
  const { cartItems } = useStateValue()[2];
  const [isLogoutMenu, setIsLogoutMenu] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("+974 ");
  const [OTP, setOTP] = useState("");
  const [expandForm, setExpandForm] = useState(false);
  const [cartMenu, setCartMenu] = useState(false);
  // const [userRole, setUserRole] = useState();
  const [error, setError] = useState(null);
  const [collapsed, setCollapsed] = useState(true);
  const [loginStatus, setLoginStatus] = useState("");
  const [fields, setFields] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);
  const navigate = useNavigate();
  const saveUserDetails = () => {
    // setIsLoading(true);
    const userData = {
      id: `${Date.now()}`,
      createdUserDate: `${new Date()}`,
      user_id: `${user.uid}`,
      userRole: `${user.uid === "+97430271700" ? "Admin" : "User"}`,
    };
    saveUser(userData);
  };

  const toggleCollapsed = () => setCollapsed(!collapsed);
  // const open = Boolean(anchorEl);

  const firebaseAuth = getAuth(app);

  const requestOTP = (e) => {
    e.preventDefault();
    if (phoneNumber.length >= 11) {
      setExpandForm(true);
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
          },
        },
        firebaseAuth
      );
      let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(firebaseAuth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      console.log("enter phone number");
      setError("enter phone number");
      setLoginStatus("danger");
      setFields(true);
      setTimeout(() => {
        setFields(false);
      }, 4000);
    }
  };

  const toggleModal = () => {
    !user && setIsLogoutMenu(!isLogoutMenu);
  };

  // const handleClose = () => {
  //   setAnchorEl(!anchorEl);
  // };

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  //   setAnchorEl(!anchorEl);
  // };

  const logout = () => {
    setIsLogoutMenu(false);
    setExpandForm(false);
    setPhoneNumber("+974 ");
    setOTP("");
    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  const verifyOTP = (e) => {
    let otp = e.target.value.replace(/[a-zA-Z<>,./!@#$%^&*()_"';:\|?/=-]/, "");
    otp.length <= 6 && setOTP(otp);
    if (otp.length === 6) {
      // console.log(otp)
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otp)
        .then((result) => {
          // User signed in successfully.
          const user = result.user;
          dispatch({
            type: actionType.SET_USER,
            user: user.providerData[0],
          });
          localStorage.setItem("user", JSON.stringify(user.providerData[0]));
          console.log(user);

          setIsLogoutMenu(false);
          setFields(true);
          setError("Signed in successfully");
          saveUserDetails();
          setLoginStatus("success");
          setTimeout(() => {
            setFields(false);
          }, 4000);
          // ...
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
          setFields(true);
          console.log(error);
          setError("Invalid OTP");
          setLoginStatus("danger");
        });
    }
  };

  return (
    <header className="header">
      <Container>
        <div className="nav__wrapper d-flex align-items-center justify-content-between">
          <Link to="/">
            <img className="logo" src={logo} alt="logo" />
          </Link>

          {/* ======= menu ======= */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <div className="menu d-flex align-items-center text-decoration-none gap-5">
              {nav__links.map((item, indx) => (
                <NavLink
                  to={item.path}
                  key={indx}
                  className={(navClass) =>
                    navClass.isActive ? "active__menu" : ""
                  }
                >
                  {item.display}
                </NavLink>
              ))}
              <Button
                direction="row-responsive"
                className="signin"
                onClick={toggleModal}
              >
                Sign In
              </Button>
            </div>
          </div>

          {/* ======== nav right icons ========= */}
          <div className="nav__right relative d-flex align-items-center gap-4">
            <span className="cart__icon">
              {/* <i className="ri-shopping-cart-2-fill" ></i> */}
              <IoCartSharp
                style={{ color: "#38383a", fontSize: "1.5rem" }}
                onClick={() => setCartMenu(!cartMenu)}
              />
              {cartItems && cartItems.length > 0 && (
                <span className="cart__badge">{cartItems.length}</span>
              )}
            </span>

            <div className="signinBtn">
              {!user ? (
                <Button
                  style={{ display: "flex" }}
                  direction="row-responsive"
                  className="signin"
                  onClick={toggleModal}
                >
                  Sign In
                </Button>
              ) : (
                <>
                  <NavbarToggler onClick={toggleCollapsed} className="mr-2" />
                  <Collapse isOpen={toggleCollapsed}>
                    <UncontrolledDropdown>
                      <DropdownToggle nav>
                        <Box
                          component={IconButton}
                          p={1.25}
                          bgcolor="grey.200"
                          onClick={toggleCollapsed}
                        >
                          <PersonOutline aria-haspopup="true" />
                        </Box>
                      </DropdownToggle>
                      <DropdownMenu end className="dropDownMenu">
                        <DropdownItem onClick={toggleCollapsed}>
                          <Link
                            style={{
                              textDecoration: "none",
                              color: "unset",
                              paddingX: "2rem",
                            }}
                            to="/dashboard/profileInfo"
                          >
                            Dashboard
                          </Link>
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => {
                            toggleCollapsed();
                            logout();
                            navigate("/");
                          }}
                        >
                          Sign Out
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </Collapse>
                </>
              )}

              {isLogoutMenu && (
                <div className="overlay">
                  <div className="logoutMenu">
                    <motion.span
                      whileTap={{ scale: 0.5 }}
                      className="modal-close"
                      onClick={toggleModal}
                    >
                      <IoIosCloseCircle size="2rem" />
                    </motion.span>
                    <div className="logoutMenu__header">
                      <h3>Sign in </h3>
                      <h5>with your mobile number</h5>
                    </div>
                    <div>
                      <form action="submit">
                        <div className="select-input-value">
                          <PhoneInput
                            autoFocus
                            defaultCountry="QA"
                            placeholder="Enter phone number"
                            value={phoneNumber}
                            maxLength={9}
                            onChange={setPhoneNumber}
                          />

                          {fields && (
                            <motion.p
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.5 }}
                              // className="alertMsg"
                              className={`alertMsg ${
                                loginStatus === "danger" ? "danger" : "success"
                              }`}
                            >
                              {error}
                            </motion.p>
                          )}
                        </div>

                        {expandForm === false && phoneNumber !== " " ? (
                          <button
                            className="next mt-4 text-center"
                            onClick={requestOTP}
                          >
                            Request OTP
                          </button>
                        ) : null}

                        <div className=" otpContainer mt-4 text-center">
                          {/* Enter OTP */}
                          <input
                            type="password"
                            placeholder=""
                            maxLength={6}
                            value={OTP}
                            onChange={verifyOTP}
                          />
                        </div>

                        <div id="recaptcha-container"></div>
                      </form>
                    </div>

                    {expandForm === true && (
                      <Button
                        className="continue mt-4 text-center"
                        variant="danger"
                        type="submit"
                        disabled={OTP === "" || fields === true ? true : false}
                        onClick={toggleModal}
                      >
                        Continue <BsFillArrowRightCircleFill />{" "}
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* admin panel */}
            {user && user.phoneNumber === "+97430271700" && (
              <span className="adminBtn">
                {/* Admin Panel{" "} */}
                <Link to="/admin/orderspage/currentOrders">
                  <img src={adminUser} alt="Admin User" />
                </Link>
              </span>
            )}

            <span className="mobile__menu" onClick={toggleMenu}>
              <i className="ri-menu-line"></i>
            </span>

            {cartMenu && (
              <motion.div className="cartMenu">
                <Cart cartMenu={cartMenu} setCartMenu={setCartMenu} />
              </motion.div>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
