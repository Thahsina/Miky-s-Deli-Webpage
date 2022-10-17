import React, { useState } from "react";
import { useStateValue } from "../../context/StateProvider";
import { Container, Row, Col } from "reactstrap";
import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

import categoryImg01 from "../../images/pizza.png";
import categoryImg02 from "../../images/pasta.png";
import categoryImg03 from "../../images/sandwich.png";
import categoryImg04 from "../../images/appetizer.png";

import ProductCard from "./ProductCard";

import "../styles/category.css";
import { useEffect } from "react";
import { useRef } from "react";

const categoryData = [
  {
    display: "Pizzas",
    imgUrl: categoryImg01,
  },
  {
    display: "Pastas",
    imgUrl: categoryImg02,
  },

  {
    display: "Sandwiches",
    imgUrl: categoryImg03,
  },

  {
    display: "Appetizers",
    imgUrl: categoryImg04,
  },
];

const Category = () => {
  const [{ menuItems }, dispatch] = useStateValue();
  const [islandClick, setIslandClick] = useState(false);
  const [scrollValue, setScrollValue] = useState(0);
  const specialitySection = useRef();
  const [catItems, setCatItems] = useState([]);

  const [categoryState, changeCategoryState] = useState({
    activeCategory: null,
    categories: [
      { id: 1, name: "Pizzas", imgUrl: categoryImg01 },
      { id: 2, name: "Pastas", imgUrl: categoryImg02 },
      { id: 3, name: "Sandwiches", imgUrl: categoryImg03 },
      { id: 2, name: "Appetizers", imgUrl: categoryImg04 },
    ],
  });

  const toggleIsalandClick = () => {
    setIslandClick(true)
  }

  const toggleActiveCat = (index) => {
    changeCategoryState({
      ...categoryState,
      activeCategory: categoryState.categories[index],
    });
  };

  const toggleActiveCatStyle = (index) => {
    if (categoryState.categories[index] === categoryState.activeCategory) {
      return "activeCat";
    } else {
      return " ";
    }
  };

  const filterCat = (selectedCat) => {
    const updatedCatItems = menuItems.filter((eachItem) => {
      if (eachItem.category === selectedCat) return eachItem;
    });
    setCatItems(updatedCatItems);
  };
  // const filterPizza = () => {
  //   const pizzaItems = menuItems.filter((i) => {
  //     if (i.category === "salads") {
  //       return i;
  //     }
  //   });
  //   setPizzaItem(pizzaItems);
  // };

  useEffect(() => {
    specialitySection.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  return (
    <Container>
      <Row>
        <h4 className="text-center mb-4">Our Speciality</h4>
        {/* {categoryData.map((item, index) => ( */}
        {categoryState.categories.map((item, index) => (
          <Col lg="3" md="4" sm="6" xs="6" className="mb-4" key={index}>
            <div
              className="category__item  d-flex align-items-center mt-4 gap-3"
              onClick={() => {
                // filterPizza();
                toggleIsalandClick();
                toggleActiveCat(index);
                filterCat(item.name.toLocaleLowerCase());
              }}
            >
              <div className="category__img">
                <img src={item.imgUrl} alt="category__item" />
              </div>
              <h6>{item.name}</h6>
            </div>
          </Col>
        ))}
        <div>

          {/* <div className="col align-self-end chevron-btns"> */}
          <div className={islandClick ? "col align-self-end chevron-btns" : " "}>
            <motion.div
              whileTap={{ scale: 0.75 }}
              className={islandClick ? "arrowBtn left" : " "}
              onClick={() => setScrollValue(scrollValue - 900)}
            >
              <MdChevronLeft size={20} color="white" />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.75 }}
              className={islandClick ? "arrowBtn right" : " "}
              onClick={() => setScrollValue(scrollValue + 900)}
            >
              <MdChevronRight size={20} color="white" />
            </motion.div>
          </div>
          <div className="w-full my-6 specialitySection" ref={specialitySection}>
            <div className="w-full specialitySection__container">
              <ProductCard data={catItems} />
            </div>
          </div>
        </div>


      </Row>
    </Container>
  );
};

export default Category;
