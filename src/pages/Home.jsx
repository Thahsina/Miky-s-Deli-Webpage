import React from "react";
import { useStateValue } from "../context/StateProvider";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Helmet from "../Components/Helmet";
import Category from "../Components/UI/Category";
import TestimonialSlider from "../Components/UI/TestimonialSlider";
import "../Components/styles/home.css";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
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
  const [{ menuItems }, dispatch] = useStateValue();

  return (
    <Helmet title="Home">
      <section className="home__banner">
        <Container>
          <Row>
            <Col lg="12" md="12">
              <div className="hero__content">
                <h5 className="mb-3">Quick Fast Gourmet</h5>
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
