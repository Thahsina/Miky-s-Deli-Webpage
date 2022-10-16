import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Col, Container, Row } from "reactstrap";
import { useStateValue } from "../../context/StateProvider";
import { saveReviewFS } from "../../firebaseFunctions";
import "../styles/slider.css";
import Loader from "./Loader";
import { motion } from "framer-motion";

const TestimonialSlider = () => {
  const settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    speed: 1000,
    autoplaySpeed: 3000,
    swipeToSlide: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const [{ user }, dispatch] = useStateValue();
  const [isLoading, setIsLoading] = useState(false);
  const [reviewName, setReviewName] = useState("");
  const [email, setEmail] = useState("");
  const [reviewMessage, setReviewMessage] = useState("");

  //Form validation States
  const [fields, setFields] = useState(false);
  const [msg, setMsg] = useState(null);
  const [alertStatus, setAlertStatus] = useState("danger");

  let mailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const saveReview = () => {
    setFields(true);
    try {
      if (!reviewName || !reviewMessage) {
        setFields(true);
        setMsg("Required fields can't be empty");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
        }, 4000);
      } else if (!email.match(mailRegex)) {
        setFields(true);
        setMsg("Please enter valid Email Address");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
        }, 4000);
      } else {
        const reviewData = {
          user_id: `${user.uid}`,
          name: reviewName,
          email: email,
          reviewMessage: reviewMessage,
        };

        saveReviewFS(reviewData);
        setIsLoading(false);
        setFields(true);
        setMsg("Thank You for your review.😊");
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
        }, 4000);

        clearReviewData();
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg("Error while uploading : Try again 🙇‍♀️");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    }
  };

  const clearReviewData = () => {
    setReviewName("");
    setEmail("");
    setReviewMessage("");
  };

  return (
    <Container>
      <Row>
        <div className="curve"></div>
        <Col lg="6" md="6" className="mt-4 mr-4">
          <div className="testimonial text-center">
            <h5 className="testimonial__subtitle mb-4">Testimonials</h5>
            <h2 className="testimonial__title mb-4">
              What our <span>customers</span> are saying
            </h2>
            <p className="testimonial__desc">
              Find what our customers are talking about us!
            </p>
            <Slider {...settings}>
              <div>
                <p className="review__text">
                  "Delicious fresh omelette and fresh OJ for breakfast. Happy
                  Very friendly team and the menu is Value for Money.Also the
                  only restaurant open Friday morning at that end of the Pearl
                  at 8am. Good job Mikys!"
                </p>
                <div className=" slider__content d-flex align-items-center gap-3 ">
                  <h6>- Sonya Rice</h6>
                </div>
              </div>
              <div>
                <p className="review__text">
                  "We ordered our dinner from their website!! Meat Lover pizza
                  was so good, we chose the medium size and it was big enough
                  for two people to eat. Very tasty!! French fries were amazing,
                  actually. They needed salt but it was good. Chicken stripes
                  was okay, a little bit greasy tho. Amazing packaging, by the
                  way. 📦 👌🏼 We'd love to visit the restaurant in the future 😀
                  Thank you!!!"
                </p>
                <div className="slider__content d-flex align-items-center gap-3 ">
                  <h6>- Mev Martinez</h6>
                </div>
              </div>
              <div>
                <p className="review__text">
                  "المنيو عندهم وايد كبيير ومتنوع😍"
                </p>
                <div className="slider__content d-flex align-items-center gap-3 ">
                  <h6> - Nawari J</h6>
                </div>
              </div>
              <div>
                <p className="review__text">
                  " I love coming to Mickey's Deli, whether it's for a quick
                  bite or a long meal to catch-up with friends on the patio.
                  Their menu selection 😍"
                </p>
                <div className="slider__content d-flex align-items-center gap-3 ">
                  <h6> - Nick J</h6>
                </div>
              </div>
            </Slider>
          </div>
        </Col>
        <Col lg="6" md="6">
          <form className="form">
            <h2>
              Share your <span>Experience</span> with us
            </h2>
            <div className="alertMsgContainer m-0 p-0 w-100">
              {fields && (
                <motion.p
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  // className="alertMsg"
                  className={`alertMsg ${
                    alertStatus === "danger" ? "danger" : "success"
                  }`}
                >
                  {msg}
                </motion.p>
              )}
            </div>
            <label>Name</label>
            <input
              required
              placeholder="Name"
              value={reviewName}
              onChange={(e) => setReviewName(e.target.value)}
            />

            <label for="email">Email</label>
            <input
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Message</label>
            <textarea
              required
              placeholder="Message"
              value={reviewMessage}
              onChange={(e) => setReviewMessage(e.target.value)}
            ></textarea>

            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                saveReview();
              }}
              // style={{ background: loader ? "#ccc" : " rgb(2, 2, 110)" }}
            >
              {isLoading ? <Loader /> : "Submit"}
            </button>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default TestimonialSlider;
