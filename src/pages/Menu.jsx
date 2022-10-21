import React, { useState, useEffect } from "react";
import { MdSearch, MdClose } from "react-icons/md";
import "../Components/styles/menu.css";
import Helmet from "../Components/Helmet";
import { Container, Row, Col } from "reactstrap";
import Slider from "react-slick";
import ProductCard from "../Components/UI/ProductCard";
// import ProductCard from "./ProductCCard.jsx";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";
import { useStateValue } from "../context/StateProvider";
import CardSkeleton from "../Components/UI/CardSkeleton";

const PreviousBtn = (props) => {
  // console.log(props);
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <BsFillArrowLeftCircleFill
        style={{
          color: "#fff",
          fontSize: "20px",
          position: "absolute",
          left: "0",
        }}
      />
    </div>
  );
};
const NextBtn = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <BsFillArrowRightCircleFill
        style={{
          color: "#fff",
          fontSize: "20px",
          position: "absolute",
          right: "0",
        }}
      />
    </div>
  );
};

const settings = {
  dots: true,
  focusOnSelect: true,
  infinite: false,
  speed: 500,
  swipeToSlide: true,
  slidesToShow: 8,
  slidesToScroll: 1,
  prevArrow: <PreviousBtn />,
  nextArrow: <NextBtn />,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        dots: true,
      },
    },
  ],
};

const Menu = () => {
  // const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [searchItems, setSearchItems] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [{ menuItems }, dispatch] = useStateValue();
  const [items, setItems] = useState(menuItems);

  const keys = ["title", "category"];

  const [appState, changeAppstate] = useState({
    activeObject: null,
    objects: [
      { id: 1, name: "Breakfast" },
      { id: 2, name: "Appetizers" },
      { id: 3, name: "Salads" },
      { id: 4, name: "Soups" },
      { id: 5, name: "Sandwiches" },
      { id: 6, name: "Pastas" },
      { id: 7, name: "Pizzas" },
      { id: 8, name: "Main Course" },
      { id: 9, name: "Quesadilla" },
      { id: 10, name: "Burgers" },
      { id: 11, name: "Cold Coffee" },
      { id: 12, name: "Hot Drinks" },
      { id: 13, name: "Cold Drinks" },
      { id: 14, name: "Smoothies" },
      { id: 15, name: "Fresh Juices" },
      { id: 16, name: "Dessert" },
    ],
  });

  const toggleActive = (index) => {
    changeAppstate({ ...appState, activeObject: appState.objects[index] });
  };

  const toggleActivestyle = (index) => {
    if (appState.objects[index] === appState.activeObject) {
      return "menuBtnActive";
    } else {
      return " ";
    }
  };

  const filterMenu = (category) => {
    console.log(category);
    const updatedItems = menuItems.filter((curElem) => {
      if (curElem.category === category) {
        return curElem;
      }
    });

    setItems(updatedItems);
  };

  const searchedItem = () => {
    if (wordEntered.length === 0 || wordEntered.length > 2)
      setSearchItems(
        menuItems?.filter(
          (item) =>
            keys.some((key) => item[key].toLowerCase().includes(wordEntered))
          // item.title.toLowerCase().includes(wordEntered)
        )
      );
  };

  

  const clearInput = () => {
    
    setWordEntered("");
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 8000);
  }, [changeAppstate]);

  return (
    <Helmet title="Menu">
      <section className="menu__banner">
        <Container>
          <Row>
            <Col lg="12" md="12" className="text-center">
              <div className="menuHead ">
                {" "}
                <h1 className="text-white m-4">Our Menu</h1>
              </div>
            </Col>
          </Row>
          <Row className="d-flex align-items-center justify-content-between">
            <Col lg="12" md="12" className="text-center p-4">
              <div className="search__widget d-flex align-items-center justify-content-between ">
                <input
                  type="text"
                  placeholder="I'm looking for...."
                  value={wordEntered}
                  onChange={(e) => {
                    setWordEntered(e.target.value);
                    searchedItem();
                  }}
                />
                <span>
                  {wordEntered.length === 0 ? (
                    <MdSearch size={23} style={{ color: "#139652" }} />
                  ) : (
                    <MdClose
                      size={23}
                      style={{ color: " #df2020" }}
                      onClick={clearInput}
                    />
                  )}
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Container>
        <Row className="mb-4">
          {/* <Col lg="12" className="text-center">
            <div className="menuHead"> <h2>Our Menu</h2></div>
           
          </Col> */}
          {wordEntered === "" && (
            <Col lg="14">
              <div className="menuCategory__carousel">
                <Slider
                  {...settings}
                  className="menu__category d-flex align-items-center justify-content-center "
                >
                  {appState.objects.map((elements, index) => (
                    <div key={index}>
                      <button
                        className={toggleActivestyle(index)}
                        // activeclassname="menuBtnActive"
                        onClick={() => {
                          toggleActive(index);
                          // console.log(elements.name.toLocaleLowerCase());
                          filterMenu(elements.name.toLocaleLowerCase());
                        }}
                      >
                        {elements.name}
                      </button>
                    </div>
                  ))}
                  {/*
                  <button className={`category === "quesadilla" ? "menuBtnActive" : ""`} onClick={setCategory("Quesadilla")}>Quesadilla</button>
                </div> */}
                  {/* <div>
                  <button className={isActive?"menuBtnActive": " " } onClick={()=>handleClick()}>Burgers</button>
                </div>
                
                
               
              
                
                <div>
                  <button onClick={()=>handleClick()}>Hot Tea</button>
                </div> */}
                </Slider>
              </div>
            </Col>
          )}
        </Row>
      </Container>

      <Container className="d-flex flex-wrap justify-content-center">
        <Row
          lg="6"
          md="4"
          sm="6"
          xs="6"
          className="my-4 mx-auto justify-content-around"
        >
          {/* {<ProductCard data={items} /> || <CardSkeleton cards={items.length}/>} */}
          {/* {isLoading && <CardSkeleton cards={items?.length} />} */}
          {/* <CardSkeleton cards={items?.length}/> */}
          {wordEntered === "" ? (
            <ProductCard data={items} />
          ) : (
            <ProductCard data={searchItems} />
          )}
          {/* <ProductCard data={items} /> */}
          {/* {wordEntered === "" && <ProductCard data={items} />} */}
        </Row>
      </Container>
    </Helmet>
  );
};

export default Menu;
