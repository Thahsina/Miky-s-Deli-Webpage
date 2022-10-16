import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../Components/Helmet";
import "../Components/styles/createItem.css";
import { AnimatePresence, motion } from "framer-motion";
import Loader from "../Components/UI/Loader";
import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
} from "react-icons/md";
import { storage } from "../firebase.config";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { saveItem, getAllMenuItems  } from "../firebaseFunctions";

const categories = [
  {
    id: 1,
    name: "Breakfast",
    urlParamName: "breakfast",
  },
  {
    id: 2,
    name: "Appetizers",
    urlParamName: "appetizers",
  },
  {
    id: 3,
    name: "Sandwiches",
    urlParamName: "sandwiches",
  },
  {
    id: 4,
    name: "Burgers",
    urlParamName: "burgers",
  },
  {
    id: 5,
    name: "Pizzas",
    urlParamName: "pizzas",
  },
  {
    id: 6,
    name: "Pasta",
    urlParamName: "pasta",
  },
  {
    id: 7,
    name: "Quesadilla",
    urlParamName: "quesadilla",
  },
  {
    id: 8,
    name: "Main Course",
    urlParamName: "maincourse",
  },
  {
    id: 9,
    name: "Soups",
    urlParamName: "soups",
  },
  {
    id: 10,
    name: "salads",
    urlParamName: "salads",
  },
  {
    id: 11,
    name: "Cold Drinks",
    urlParamName: "colddrinks",
  },
  {
    id: 12,
    name: "Cold Coffee",
    urlParamName: "coldcoffee",
  },
  {
    id: 13,
    name: "Hot Drinks",
    urlParamName: "hotdrinks",
  },
  {
    id: 14,
    name: "Dessert",
    urlParamName: "dessert",
  },
  {
    id: 14,
    name: "Fresh Juices",
    urlParamName: "fresh juices",
  },
];

const sizes = [
  {
    id: 1,
    name: "Regular",
    urlParamName: "regular",
  },
  {
    id: 2,
    name: "Medium",
    urlParamName: "medium",
  },
  {
    id: 3,
    name: "Large",
    urlParamName: "large",
  },
  {
    id: 4,
    name: "Jumbo",
    urlParamName: "jumbo",
  },
  {
    id: 5,
    name: "VIP",
    urlParamName: "vip",
  },
];

// const addons = [
//   {
//     id: 1,
//     name:,
//     urlParamName:,
//   },
//   {
//     id:2,
//     name:,
//     urlParamName:,
//   },

// ]

// const meatOptions = [
//   {
//     id: 1,
//     name: "Chicken",
//     urlParamName: "chicken",
//   },
//   {
//     id: 2,
//     name: "beef",
//     urlParamName: "beef",
//   },
//   {
//     id: 3,
//     name: "Shrimp",
//     urlParamName: "shrimp",
//   },
// ];

const CreateContainer = () => {
  const [{menuItems}, dispatch] = useStateValue();


  const [title, setTitle] = useState("");
  const [arabicTitle, setArabicTitle] = useState("")
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [varaitions, setVaraitions] = useState([]);

  const [category, setCategory] = useState(null);
  const [size, setSize] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageAsset, setImageAsset] = useState(null);
  const [addon, setAddon] = useState(null);
  const [meatOption, setMeatOption] = useState(null);

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        setFields(true);
        setMsg("Error while uploading : Try again 🙇");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageAsset(downloadURL);
          setIsLoading(false);
          setFields(true);
          setMsg("Image uploaded to successfully 😊");
          setAlertStatus("success");
          setTimeout(() => {
            setFields(false);
          }, 4000);
        });
      }
    );
  };

  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef)
      .then(() => {
        setImageAsset(null);
        setIsLoading(false);
        setFields(true);
        setMsg("Image deleted  successfully 😊");
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
        }, 4000);
      })
      .catch((error) => {
        console.log(error);
        setFields(true);
        setMsg("Error while deleting : Try again 🙇");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      });
  };

  const saveDetails = () => {
    setIsLoading(true);
    try {
      if (!title || !price || !imageAsset || !description || !category) {
        setFields(true);
        setMsg("Required fields can't be empty");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          arabicTitle: arabicTitle,
          imageURL: imageAsset,
          category: category,
          // varaitions:varaitions,
          description: description,
          qty: 1,
          price: price,
          // size: size,
          // addon: addon,
          // meatOption: meatOption,
        };
        saveItem(data);
        setIsLoading(false);
        setFields(true);
        setMsg("Data uploaded successfully 😊");
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
          
        }, 4000);

        clearData();
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg("Error while uploading : Try again 🙇‍♀️");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }

    fetchMenuItems();
  };

  const clearData = () => {
    setTitle("");
    setArabicTitle('');
    setImageAsset(null);
    setPrice("");
    setDescription("");
    setCategory("Select Category");
    setAddon("Select Category");
    setSize("Select Category");
    // setMeatOption("Select Category")
  };

  const fetchMenuItems = async () => {
    await getAllMenuItems().then(data => {
      console.log(data);
      dispatch({
        type: actionType.SET_MENU_ITEMS,
        menuItems: data,
      })
    });
  };


  return (
    <Helmet tittle="CreateContainer">
      <section className="d-flex flex-column align-items-center">
        <h3>Add new items to the Menu</h3>
        {/* <Container> */}
          {/* <Row> */}
            <Col lg="6" md="6" sm="12" className="m-auto text-center">
              <AnimatePresence>
                <form>
                  <div className="formContainer">
                    <div className="alertMsgContainer">
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

                      <div className="titleContainer">
                        <MdFastfood />
                        <input
                          type="text"
                          required
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Give me a title..."
                          className="titleInput"
                        />
                      </div>
                      <div className="titleContainer">
                        <MdFastfood />
                        <input
                          type="text"
                          required
                          value={arabicTitle}
                          onChange={(e) => setArabicTitle(e.target.value)}
                          placeholder="Give me a Arabic title..."
                          className="titleInput"
                        />
                      </div>
                      <div className="categoryContainer">
                        <select
                          className="categorySelect"
                          onChange={(e) => setCategory(e.target.value) }
                        >
                          <option value="other" className="bg-white">
                            Select Category
                          </option>
                          {categories.map((category) => (
                            <option
                              key={category.id}
                              className="categoryOptions"
                              value={category.urlParamName}
                            >
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* box to upload image */}
                      <div className="uploadBox">
                        {isLoading ? (
                          <Loader />
                        ) : (
                          <>
                            {!imageAsset ? (
                              <label className="uploadLabel">
                                <div className="uploadContainer">
                                  <MdCloudUpload />
                                  <p>Click here to upload</p>
                                </div>
                                <input
                                  type="file"
                                  name="upload-image"
                                  accept="image/*"
                                  onChange={uploadImage}
                                  className="uploadInput"
                                />
                              </label>
                            ) : (
                              <div className="uploadImage">
                                <img src={imageAsset} alt="" className="" />
                                <button
                                  type="button"
                                  className="deleteButton"
                                  style={{ color: "#ffff" }}
                                  onClick={deleteImage}
                                >
                                  <MdDelete />
                                </button>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                      <div className="descriptionContainer">
                        <div className="description">
                          <MdFoodBank />
                          <input
                            type="text"
                            requried
                            placeholder="Give me a description...."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* sizes, addons , meatoptions */}

                      <div
                        className="optionsContainer"
                        style={{ width: "100%", display: "flex" }}
                      >
                        <div className="sizeContainer">
                          <select
                            // className="sizeSelect"
                            onChange={(e) => setSize(e.target.value)}
                          >
                            <option value="other">Size</option>
                            {sizes.map((size) => (
                              <option
                                key={size.id}
                                className="sizeOptions"
                                value={size.urlParamName}
                              >
                                {size.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="addon">
                          <select onChange={(e) => setAddon(e.target.value)}>
                            <option>Add Ons</option>
                          </select>
                        </div>

                        <div className="meatOptions">
                          <select
                            onChange={(e) => setMeatOption(e.target.value)}
                          >
                            <option>Meat Options</option>
                          </select>
                        </div>
                      </div>

                      <div className="priceContainer">
                        <MdAttachMoney />
                        <input
                          type="text"
                          required
                          placeholder="Add the price..."
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>

                      <div className="saveBtn">
                        <button
                          type="button"
                          onClick={() => {
                            alert("are you sure, you want to add this to the menu?");
                            saveDetails();
                          }}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </AnimatePresence>
            </Col>
          {/* </Row> */}
        {/* </Container> */}
      </section>
    </Helmet>
  );
};

export default CreateContainer;
