import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Category from "../Components/UI/Category";
import "../Components/styles/home.css";
import TestimonialSlider from '../Components/UI/TestimonialSlider'
import { Container, Row, Col} from "reactstrap";
import { GiChemicalDrop } from "react-icons/gi";
import { SiLeaflet } from "react-icons/si";
import { MdKeyboardArrowRight } from "react-icons/md";
import { AiOutlinePhone } from "react-icons/ai";
import featureImg01 from "../images/quickDelivery.png";
import featureImg02 from "../images/24_7 icon.png";
import featureImg03 from "../images/cateringIcon.png";

const featureData = [
  {
    title: "Free Delivery",
    imgUrl: featureImg01,
    desc: "Enjoy our free, quick and safe delivery.Delivering our fresh and handmade deliciousness from our hands to yours safely.",
  },

  {
    title: "24/7 Dine-In",
    imgUrl: featureImg02,
    desc: "We strive to offer fast service in a comfortable environment where customers can relax over dinner, drinks or watch their favorite sporting events.",
  },

  {
    title: "Catering / Drop-Off",
    imgUrl: featureImg03,
    desc: "Do you have a special event coming up that you need catering or drop-off service for? Look no further than our professional catering & drop-off services.",
  },
];

const Home = () => {
  return (
    
      <>
      <Helmet title="Home">
        <title>Miky's Deli - Home</title>
        <meta name='description' content="Visit Mikys Deli website for free delivery !!"/>
        <link rel="canonical" href="/home"/>
      </Helmet>
        <section className="home__banner">
          <Container>
            <Row>
              <Col lg="12" md="12">
                <div className="hero__content">
                  <h5 className="mb-3 d-flex align-items-center">Quick <div className="redDot"></div> Fresh <div className="redDot"></div> Gourmet</h5>
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
            </Row>
          </Container>
        </section>
        <section className="pt-4">
          <Category />
        </section>

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
                Miky's Deli, we are a popular place where you can order Italian deli foods from 
                </p>
                <p className="feature__text">
                salads, sandwiches, wraps, burgers and more at any time of the day !!{" "}
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
        <section className="testimonial__section">
          <TestimonialSlider/>
        </section>
      </>
    
  );
};

export default Home;
