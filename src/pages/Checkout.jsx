import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Helmet from "../Components/Helmet";
import { Container, Row, Col, Form } from "reactstrap";
import { useStateValue } from "../context/StateProvider";
import { Link } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { IoMdArrowDropdown } from "react-icons/io";
import { motion } from "framer-motion";
import "../Components/styles/checkout.css";
import { Modal, ModalBody } from "reactstrap";
import TickImg from "../images/tick.png";
import Area from "../pages/Area";
import { saveOrder, getAllOrders, fetchAllOrders } from "../firebaseFunctions";
import { actionType } from "../context/reducer";

const Checkout = () => {
  const [{ user, deliveryZone, orders }, dispatch] = useStateValue();
  const { cartItems, calculateTotalPrice, clearCart } = useStateValue()[2];
  const [specialRequest, setSpecialRequest] = useState("");
  const [modalConfirm, setModalConfirm] = useState(false);
  const [areaModal, setAreaModal] = useState(false);

  const navigate = useNavigate();
  let date = new Date();
  const options = { month: "long" };
  let month = new Intl.DateTimeFormat("en-US", options).format(date);
  console.log(new Intl.DateTimeFormat("en-US", options).format(date));
  console.log(date.getDate(), month, date.getFullYear());
  {
    console.log(deliveryZone);
  }
  const [address, setAddress] = useState({
    name: "",
    email: "",
    phoneNumber: user.uid,
    street: "",
    buildingNo: "",
    flatNo: "",
    nearestLandmark: "",
    // deliveryZone: deliveryZone,
    latlng: "",
  });

  const saveOrderDetails = () => {
    const orderData = {
      user_id: `${user.uid}`,
      deliveryZone: deliveryZone,
      orderDate: `${new Date()}`,
      address: address,
      cartItems: cartItems,
      specialRequests: specialRequest,
      id: `${Date.now()}`,
      orderNumber: `${Math.floor(100000 + Math.random() * 900000)}`,
      total: calculateTotalPrice(),
    };

    saveOrder(orderData);
  };

  const toggleConfirm = () => {
    setModalConfirm(!modalConfirm);
  };
  // mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN;
  mapboxgl.accessToken =
    "pk.eyJ1IjoibWlreXNkZWxpIiwiYSI6ImNsN3pzeWlqYzAzdXozeHVpdGdrN2ZyMHcifQ.AxHbECPE8dfa1cpxVV-UuA";

  const [lng, setLng] = useState(51.51253576855366);
  const [lat, setLat] = useState(25.31859760530991);
  const [zoom, setZoom] = useState(11);

  useEffect(() => {
    // const bounds = [
    //   [51.531415650446405, 25.237558639201637], // Southwest coordinates
    //   [51.46894450363408, 25.432925196559935], // Northeast coordinates
    // ];

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      attributionControl: false,
      center: [lng, lat],
      zoom: zoom,
      // maxBounds:bounds
    });

    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    map.on("style.load", () => {
      map.setFog({}); // Set the default atmosphere style
    });

    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        countries: "qa",
        mapboxgl: mapboxgl,
      })
    );

    let geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      // When active the map will receive updates to the device's location as it changes.
      trackUserLocation: true,
      // Draw an arrow next to the location dot to indicate which direction the device is heading.
      showUserHeading: true,
    });

    map.addControl(geolocate);
    geolocate.on("geolocate", locateUser);
    function locateUser(e) {
      setAddress((prevState) => ({
        ...prevState,
        latlng: (prevState.latlng = [
          e.coords.longitude.toFixed(4),
          e.coords.latitude.toFixed(4),
        ]),
      }));
      marker.on("dragend", onDragEnd);
    }

    const marker = new mapboxgl.Marker({ color: "green", draggable: true })
      .setLngLat([lng, lat])
      .addTo(map);

    function onDragEnd() {
      const lngLat = marker.getLngLat();
      console.log(lngLat);
      console.log(lngLat.lng);
      console.log(lngLat.lat);
      setLng(lngLat.lng);
      setLat(lngLat.lat);
      setAddress((prevState) => ({
        ...prevState,
        latlng: (prevState.latlng = [lat, lng]),
      }));
    }

    marker.on("dragend", onDragEnd);
  }, []);

  return (
    <Helmet title="Checkout">
      <section></section>
      <section>
        <Container>
          <Row className="d-flex justify-content-center checkoutRow">
            <Col lg="8" md="12">
              <h3 className="text-center m-4 p-4">Checkout & Payment</h3>
              <Form className="checkout__form">
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="form-control custom-input mt-2"
                    onChange={(e) =>
                      setAddress((prevState) => ({
                        ...prevState,
                        name: (prevState.name = e.target.value),
                      }))
                    }
                  />
                </div>

                <div className="form__group">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    required
                    className="form-control custom-input mt-2"
                    onChange={(e) =>
                      setAddress((prevState) => ({
                        ...prevState,
                        email: (prevState.email = e.target.value),
                      }))
                    }
                  />
                </div>

                <div className="form__group">
                  <input
                    type="text"
                    placeholder={user.phoneNumber}
                    disabled
                    value={user.phoneNumber}
                  />
                </div>

                <h4 className="mt-4 mb-4">Add Address</h4>
                {/* <div> */}
                <div id="map" className="mb-2 checkout__map"></div>
                {/* </div> */}
                <p
                  style={{
                    fontSize: "13px",
                    color: "#df1010",
                    margin: "0.5rem",
                  }}
                >
                  Drag the marker to exact delivery location or click on the top
                  left corner for current location.
                </p>
                {/* <Button>Add your current location</Button> */}

                <div
                  className="form__group"
                  onClick={(e) => {
                    e.preventDefault();
                    setAreaModal(!areaModal);
                  }}
                >
                  <div className=" my-4 deliveryZone">
                    <h4>
                      {deliveryZone ? deliveryZone : "Select delivery Area"}
                    </h4>
                    <button
                      className="btnArea"
                      onClick={(e) => {
                        e.preventDefault();
                        setAreaModal(true);
                      }}
                    >
                      {areaModal === true && <Area data={deliveryZone} />}
                      <IoMdArrowDropdown />
                    </button>
                  </div>
                </div>
                <div className="form-group mb-4">
                  <label className="input-label bold mb-0">
                    Street No. <span className="text-danger">*</span>
                  </label>
                  <input
                    name="address_2"
                    type="text"
                    required=""
                    className="form-control custom-input mt-2"
                    onChange={(e) =>
                      setAddress((prevState) => ({
                        ...prevState,
                        street: (prevState.street = e.target.value),
                      }))
                    }
                  />
                </div>
                <div className="form-group mb-4">
                  <label className="input-label bold mb-0">
                    Building/Villa No. <span className="text-danger">*</span>
                  </label>
                  <input
                    name="address_1"
                    type="text"
                    required=""
                    className="form-control custom-input mt-2"
                    onChange={(e) =>
                      setAddress((prevState) => ({
                        ...prevState,
                        buildingNo: (prevState.buildingNo = e.target.value),
                      }))
                    }
                  />
                </div>
                <div className="form-group mb-4">
                  <label className="input-label bold mb-0">
                    Floor/Flat No. <span>(Optional)</span>
                  </label>
                  <input
                    name="address_3"
                    type="text"
                    className="form-control custom-input mt-2"
                    onChange={(e) =>
                      setAddress((prevState) => ({
                        ...prevState,
                        flatNo: (prevState.flatNo = e.target.value),
                      }))
                    }
                  />
                </div>
                <div className="form-group mb-4">
                  <label className="input-label bold mb-0">
                    Nearest Landmark <span>(Optional)</span>
                  </label>
                  <input
                    name="address_4"
                    type="text"
                    className="form-control custom-input mt-2"
                    onChange={(e) =>
                      setAddress((prevState) => ({
                        ...prevState,
                        nearestLandmark: (prevState.nearestLandmark =
                          e.target.value),
                      }))
                    }
                  />
                </div>

                <div className="form-group specialRequests mb-4">
                  <h6>Order Summary</h6>
                  <div className="specialRequests__tbl-header">
                    <table cellPadding="0" cellSpacing="0" border="0">
                      <thead>
                        <tr>
                          <th style={{ width: "50%" }}>Item (s)</th>

                          <th>Qty</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                    </table>
                  </div>
                  <div className="tbl-content mb-4">
                    <table cellPadding="0" cellSpacing="0" border="0">
                      <tbody>
                        {cartItems.map((cartItem) => (
                          <tr key={cartItem.id}>
                            <td style={{ width: "50%" }}>
                              <b>{cartItem.title}</b>
                              <p>
                                Fries, Fried Onions, Pickles & Mushrooms
                                {/* {cartItem.variations} */}
                              </p>
                            </td>
                            <td className="orderQuantity">{cartItem.qty}</td>
                            <td className="orderPrice">QAR {cartItem.price}</td>
                          </tr>
                        ))}
                        <tr>Total: {calculateTotalPrice()}</tr>
                      </tbody>
                    </table>
                  </div>

                  <label className="input-label bold mb-0">
                    Add Special Requests <span>(Optional)</span>
                  </label>
                  <textarea
                    name="special_requests"
                    type="text"
                    className="form-control custom-input mt-2"
                    placeholder="eg. if you have a food allergy or a request for the driver"
                    onChange={(e) => setSpecialRequest(e.target.value)}
                  />
                  <p>
                    Do not add chargeable items, as this may cause your order to
                    be cancelled.
                  </p>
                </div>
                {/*--------- payment ------ */}
                <div className="paymentSection">
                  <h4>Payment Options</h4>
                  <div className="form-check mb-4 mt-4 mx-1">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                      defaultChecked
                    />
                    <label className="form-check-label">Cash On Delivery</label>
                  </div>
                  <div className="form-check mb-4 mt-4 mx-1">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDisabled"
                      id="flexRadioDisabled"
                      disabled
                    />
                    <label className="form-check-label">
                      Credit/Debit Card
                    </label>
                  </div>
                </div>

                {/* action buttons */}
                <div className="step-actions mb-4 text-center">
                  <Link to="/menu">
                    <motion.button
                      whileTap={{ scale: 0.8 }}
                      className="button btn btn-outline-primary mx-1"
                    >
                      Back
                    </motion.button>
                  </Link>

                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    className="button btn btn-primary mx-1"
                    onClick={(e) => {
                      e.preventDefault();
                      saveOrderDetails();
                      // clearCart();
                      toggleConfirm();
                      fetchAllOrders();
                      // setTimeout(() => {
                      //   navigate("/");
                      //   dispatch({
                      //     type: actionType.SET_USER,
                      //     user: null,
                      //   });
                      // }, 4000);
                    }}
                    disabled={
                      // address.latlng === "" ||
                      address.name === "" ||
                      address.email === "" ||
                      address.street === "" ||
                      address.buildingNo === "" ||
                      calculateTotalPrice() === 0
                        ? true
                        : false || deliveryZone === null
                    }
                  >
                    Place Order
                  </motion.button>
                </div>
              </Form>
              <Modal
                className="checkout__modal"
                isOpen={modalConfirm}
                toggle={toggleConfirm}
              >
                <ModalBody className="checkout__modal-content text-center">
                  <img src={TickImg} alt=" Green Tick" />
                  <h2>Thank You!</h2>
                  <p>Your order is Comfirmed</p>
                  <h3>See you again at another mealtime.</h3>
                </ModalBody>
              </Modal>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;
