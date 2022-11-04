import React, { useState } from "react";
import Dashboard from "./SideBar";
import "../../Components/styles/profileInfo.css";
import {
  Container,
  Row,
  Col,
  FormGroup,
  Form,
  Input,
  Button,
} from "reactstrap";
import { FaCamera } from "react-icons/fa";
import { useStateValue } from "../../context/StateProvider";
import { getAuth, updateProfile } from "firebase/auth";
import NoprofileImg from "../../images/noprofile.jpg";
import { saveUser } from "../../firebaseFunctions";

const ProfileInfo = () => {
  const [{ user }] = useStateValue();
  const [name, setName] = useState(user.displayName);
  const [email, setEmail] = useState(user.email);
  const [img, setImage] = useState(false);
  const [preview, setPreview] = useState(null);
  const auth = getAuth();

  const updateProfileInfo = () => {
    user.displayName = name;
    user.email = email;
    let userRole;
    const createdDate = new Date();
    if (user.uid === "+97430271700") {
      userRole = "admin";
    } else {
      userRole = "user";
    }
    const updatedUser = { ...user, userRole, createdDate };
    saveUser(updatedUser);
  };

  console.log(user);

  const changeProfilePic = () => {
    user.photoUrl = "";
    console.log("img selected");
  };

  return (
    <>
      <Container lg="6" className="profileInfo__update-container">
        <Row className="profileInfo-container">
          <Col lg="4">
            <div className="profileInfo__container">
              <div className="profileImg">
                <img src={preview ? preview : NoprofileImg} />
                <div className="profileImg__round">
                  <input
                    type="file"
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                      const reader = new FileReader();
                      reader.readAsDataURL(e.target.files[0]);
                      reader.onload = () => {
                        setPreview(reader.result);
                      };
                      user.photoUrl = preview;
                    }}
                  />
                  <FaCamera className="fa-camera" style={{ color: "#fff" }} />
                </div>
                {/* <div className="profileImg-pencilIcon">
                <BsPencil size={40} onClick={changeProfilePic} />
                <input type="file"/>
              </div> */}
              </div>
            </div>
          </Col>
          <Col lg="8">
            <div className="profileInfo__info-container">
              <div className="profileInfo__container-name">
                <p>
                  <span>Name:</span>
                  {name}
                </p>
              </div>
              <div className="profileInfo__container-email">
                <p>
                  <span>Email:</span>
                  {email}{" "}
                </p>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="profileInfo__update">
          <h3 className="">Update account details</h3>

          <Row className="d-flex justify-content-around">
            <Col lg="4" md="4">
              <FormGroup>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </FormGroup>
            </Col>
            <Col lg="4" md="4">
              <FormGroup>
                <Input
                  id="email"
                  name="email"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg="12" className="text-center">
              <Button
                className="profileInfo__update-btn"
                onClick={updateProfileInfo}
              >
                Update
              </Button>
            </Col>
          </Row>
        </Row>
      </Container>
    </>
  );
};

export default ProfileInfo;
