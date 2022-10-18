import React from "react";
import { useState, useEffect } from "react";
import { useStateValue } from "../context/StateProvider";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Helmet from "../Components/Helmet";
import Category from "../Components/UI/Category";
import TestimonialSlider from "../Components/UI/TestimonialSlider";
import ProductCard from "../Components/UI/ProductCard";
import "../Components/styles/home.css";
import Offers from "../Components/UI/Offers";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";

import { GiChemicalDrop } from "react-icons/gi";
import { SiLeaflet } from "react-icons/si";

import { MdKeyboardArrowRight } from "react-icons/md";
import { AiOutlinePhone } from "react-icons/ai";

import heroImg from "../images/hero-min1.jpg";
import dynamiteShrimp from "../images/dynamite-shrimp-min.jpg";
import familyTexMix from "../images/family-texmix-min.jpg";
import ribbonPotato from "../images/ribbon-potato-min.jpg";
import shrimpRice from "../images/risotto-shrimp-rice-min.jpg";
import veggieGrapeLeaves from "../images/veggie-grape-leaves-min.jpg";

import featureImg01 from "../images/quickDelivery.png";
import featureImg02 from "../images/24_7 icon.png";
import featureImg03 from "../images/cateringIcon.png";
import Menu from "./Menu";

import RedBullDrink from "../images/redbull-removebg.png";
import Salad from "../images/salad-removebg.png";
import Pizza from "../images/pizza-removebg.png";
import Circle from "../images/circle.svg";
import GreenCircle from "../images/circleGreen.svg";
import Ring from "../images/ring.svg";

const sliderData = [
  {
    image: dynamiteShrimp,
  },
  {
    image: familyTexMix,
  },
  {
    image: ribbonPotato,
  },
  {
    image: shrimpRice,
  },
  {
    image: veggieGrapeLeaves,
  },
  {
    image: heroImg,
  },
];

const featureData = [
  {
    title: "Free Delivery",
    imgUrl: featureImg01,
    desc: "Enjoy our free, quick and safe delivery.Delivering our handmade deliciousness with our hands safely.",
  },

  {
    title: "Available 24/7",
    imgUrl: featureImg02,
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus, doloremque.",
  },

  {
    title: "Catering Services",
    imgUrl: featureImg03,
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus, doloremque.",
  },
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = sliderData.length;

  const [{ menuItems }, dispatch] = useStateValue();
 

  const autoScroll = true;
  let slideInterval;
  let intervalTime = 5000;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };

  // const prevSlide = () => {
  //   setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
  //   console.log("prev");
  // };

  function auto() {
    slideInterval = setInterval(nextSlide, intervalTime);
  }


  

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [currentSlide]);

  return (
    <Helmet title="Home">
      <section className="home__banner">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content  ">
                <h5 className="mb-3">Easy way to order</h5>
                <h1 className="mb-4 hero__title">
                  <span>Serving </span>lip-smacking <br /> food
                  <span> is our passion.</span>
                </h1>

                <p>
                  Simple cusine with an array of homemade delicacies using the
                  best seasonal products and mouth-watering selection of deli
                  sandwiches and salads.
                </p>

                <div className="hero__btns d-flex align-items-center gap-5 mt-4">
                  <button className="order__btn d-flex align-items-center justify-content-between">
                    <Link to="/menu">
                      Order now{" "}
                      <MdKeyboardArrowRight
                        style={{
                          fontSize: "20px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      />
                    </Link>
                  </button>

                  <button className="call__btn">
                    <AiOutlinePhone size="1.5rem" />
                    <a href="tel:+97455251120">Call Us Now</a>
                  </button>
                </div>

                <div className=" hero__service  d-flex align-items-center gap-5 mt-5 ">
                  <p className=" d-flex align-items-center gap-2 ">
                    <span className="shipping__icon">
                      <GiChemicalDrop />
                    </span>{" "}
                    No Perservatives
                  </p>

                  <p className=" d-flex align-items-center gap-2 ">
                    <span className="shipping__icon">
                      <SiLeaflet />
                    </span>{" "}
                    100% Fresh and Clean
                  </p>
                </div>
              </div>
            </Col>

            <Col lg="6" md="6">
              {/* <div className="slider">
                
                {sliderData.map((slide, index) => {
                  return (
                    <div
                      className={
                        index === currentSlide ? "slide current" : "slide"
                      }
                      key={index}
                    >
                      {index === currentSlide && (
                        <img src={slide.image} alt="hero-img" />
                      )}
                    </div>
                  );
                })}
              </div> */}

              <div className="home-right">
                <img
                  src={RedBullDrink}
                  alt="food image"
                  className="food-img food-1"
                  width="200"
                  loading="lazy"
                />
                <img
                  src={Ring}
                  alt="ring shape"
                  className="shape shape-6"
                  width="30"
                />
                <img
                  src={Circle}
                  alt="circle shape"
                  className="shape shape-7"
                  width="30"
                />
                <img
                  src={Salad}
                  alt="food image"
                  className="food-img food-2"
                  width="200"
                  loading="lazy"
                />
                <img
                  src={Pizza}
                  alt="food image"
                  className="food-img food-3"
                  width="200"
                  loading="lazy"
                />

                <img
                  src={Circle}
                  alt="circle shape"
                  className="shape shape-1"
                  width="25"
                />
                <img
                  src={Circle}
                  alt="circle shape"
                  className="shape shape-2"
                  width="15"
                />
                <img
                  src={Circle}
                  alt="circle shape"
                  className="shape shape-3"
                  width="30"
                />
                <img
                  src={GreenCircle}
                  alt="circle shape"
                  className="shape shape-8"
                  width="15"
                />
                <img
                  src={Ring}
                  alt="ring shape"
                  className="shape shape-4"
                  width="60"
                />
                <img
                  src={Ring}
                  alt="ring shape"
                  className="shape shape-5"
                  width="40"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="pt-4">
        <Category />
      </section>
      {/* <section>
        <div className="curved-div upper">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1240 309">
            <path
              fill="#E01F25"
              fillOpacity="1"
              d="M0,224L48,197.3C96,171,192,117,288,96C384,75,480,85,576,106.7C672,128,768,160,864,192C960,224,1056,256,1152,240C1248,224,1344,160,1392,128L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
        <div className="curved-div">
          <h1>Try Our Most Popular Dishes</h1>
          <Container>
            <Row lg="6" md="4" sm="6" xs="6" className="justify-content-around">
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </Row>
          </Container>

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1238 308">
            <path
              fill="#fff"
              fillOpacity="1"
              d="M0,224L48,197.3C96,171,192,117,288,96C384,75,480,85,576,106.7C672,128,768,160,864,192C960,224,1056,256,1152,240C1248,224,1344,160,1392,128L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section> */}
      <section className="serviceSection">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h5 className="feature__subtitle mb-4">Services we offer</h5>
              <h2 className="feature__title">Just sit back at home</h2>
              <h2 className="feature__title">
                we will <span>take care</span>
              </h2>
              <p className="mb-1 mt-4 feature__text">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor,
                officiis?
              </p>
              <p className="feature__text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aperiam, eius.{" "}
              </p>
            </Col>

            {featureData.map((item, index) => (
              <Col lg="4" md="6" sm="6" key={index} className="mt-5">
                <div className="feature__item-container">
                  <Link to="/services">
                    <div className="feature__item text-center px-5 py-3">
                      {/* <a href="https://wa.me/97455251120"></a> */}
                      <motion.img
                        whileHover={{ scale: 1.2 }}
                        src={item.imgUrl}
                        alt="feature-img"
                        className="icon w-25 mb-3"
                      />
                      <h5 className=" fw-bold mb-3">{item.title}</h5>{" "}
                      <p>{item.desc}</p>
                    </div>
                  </Link>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      {/* <Menu /> */}

      <section className="testimonial__section">
      <TestimonialSlider />
        {/* <Container>
          <Row>
            <div className="curve"></div>
            <Col lg="6" md="6" className="mt-4">
              <div className="testimonial text-center">
                <h5 className="testimonial__subtitle mb-4">Testimonials</h5>
                <h2 className="testimonial__title mb-4">
                  What our <span>customers</span> are saying
                </h2>
                <p className="testimonial__desc">
                  Find what our customers are talking about us!
                </p>

                <TestimonialSlider />
              </div>
            </Col>

            <Col lg="6" md="6">
              <form className="form">
                <h2>
                  Share your <span>Experience</span> with us
                </h2>

                <label>Name</label>
                <input
                  placeholder="Name"
                  // value={name}
                  // onChange={(e) => setName(e.target.value)}
                />

                <label>Email</label>
                <input
                  placeholder="Email"
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                />

                <label>Message</label>
                <textarea
                  placeholder="Message"

                  // value={message}
                  // onChange={(e) => setMessage(e.target.value)}
                ></textarea>

                <button
                  type="submit"
                  // style={{ background: loader ? "#ccc" : " rgb(2, 2, 110)" }}
                >
                  Submit
                </button>
              </form>
            </Col>
          </Row>
        </Container> */}
      </section>
    </Helmet>
  );
};

export default Home;
